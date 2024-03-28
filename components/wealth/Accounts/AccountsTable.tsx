"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getInstitutionByInstId, updateInstitution } from "@/lib/prisma/queries/institutions";
import {
  removeScheduledSyncJob,
  scheduleDailySyncTransactionsJob,
  startSyncTransactionsJob,
} from "@/lib/qstash/sync";
import { SearchParams } from "@/lib/types/SearchParams";
import { AccountType } from "@/lib/types/prisma";
import { cn } from "@/lib/utils";
import { createColumnHelper, useReactTable, getCoreRowModel, flexRender, Row } from "@tanstack/react-table";
import { useVirtualizer } from "@tanstack/react-virtual";
import { MoreVerticalIcon, RefreshCcwIcon, TrashIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { HTMLProps, useRef } from "react";
import { toast } from "sonner";

import { getCellWidthStyles, getHeaderWidthStyles } from "../common/tables/cellSize";
import { LastSyncedDate } from "./LastSyncDate";
import { ScheduledSyncDate } from "./ScheduledSyncDate";

type AccountTypeWithInst = AccountType & {
  institution_name: string;
};

type AccountsTableProps = {
  accounts: AccountTypeWithInst[];
  userId: number;
  searchParams: SearchParams;
};

const StyledTableCell = ({ className, ...props }: HTMLProps<HTMLDivElement>) => (
  <div {...props} className={cn("flex w-full items-center", className)} />
);

export const AccountsTable = ({ accounts, userId }: AccountsTableProps) => {
  const tableContainer = useRef<HTMLTableElement>(null);
  const columnHelper = createColumnHelper<AccountTypeWithInst>();
  // const queryClient = useQueryClient();
  const router = useRouter();

  const columns = [
    columnHelper.accessor("display_name", {
      cell: (row) => <StyledTableCell>{row.getValue()}</StyledTableCell>, // TODO: handle localization
      header: "Account name",
      meta: {
        size: {
          flex: 2,
          minWidth: 300,
        },
      },
    }),
    columnHelper.accessor("institution_name", {
      cell: (row) => <StyledTableCell>{row.getValue()}</StyledTableCell>, // TODO: handle localization
      header: "Institution",
      meta: {
        size: {
          width: 200,
        },
      },
    }),
    columnHelper.accessor("subtype", {
      cell: (row) => <StyledTableCell className="capitalize">{row.getValue()}</StyledTableCell>, // TODO: handle localization
      header: "Type",
      meta: {
        size: {
          width: 150,
        },
      },
    }),
    columnHelper.accessor("institution_id", {
      header: () => <StyledTableCell className="justify-center">Last Synced</StyledTableCell>,
      cell: (row) => (
        <StyledTableCell className="justify-center">
          <LastSyncedDate instId={row.row.original.institution_id} userId={userId} />
          <ScheduledSyncDate instId={row.row.original.institution_id} userId={userId} />
        </StyledTableCell>
      ),
      meta: {
        size: "auto",
      },
    }),
    columnHelper.accessor("current_balance", {
      cell: (row) => {
        // Format the amount as a dollar amount
        const formatted = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: row.row.original.currency_code ?? "CAD",
          currencyDisplay: "narrowSymbol",
        }).format(row.getValue() ?? 0);

        return <StyledTableCell className="justify-end">{formatted}</StyledTableCell>;
      },
      header: () => <StyledTableCell className="justify-end">Balance</StyledTableCell>,
      meta: {
        size: {
          width: 150,
        },
      },
    }),
    columnHelper.display({
      id: "actions",
      cell: (row) => (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <MoreVerticalIcon />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onClick={async () => {
                const instId = row.row.original.institution_id;
                if (!instId) {
                  toast.error(`Institution ${instId} not found`);
                  return;
                }

                const inst = await getInstitutionByInstId(instId, userId);

                if (!inst) {
                  toast.error(`Institution ${instId} not found`);
                  return;
                }

                const syncJobKey = await startSyncTransactionsJob({
                  institutionId: instId,
                  userId,
                  fullSync: false,
                });

                if (inst.scheduled_sync_key) {
                  await removeScheduledSyncJob(inst.scheduled_sync_key);
                }

                const scheduleSyncKey = await scheduleDailySyncTransactionsJob({
                  institutionId: instId,
                  userId,
                });

                await updateInstitution(inst.id, {
                  sync_job_key: syncJobKey,
                  scheduled_sync_key: scheduleSyncKey,
                });
              }}>
              <div className="flex items-center gap-1">
                <RefreshCcwIcon size={12} />
                <span>Sync</span>
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <div className="flex items-center gap-1">
                <TrashIcon size={12} />
                <span>Remove</span>
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
      meta: {
        size: {
          width: 24 + 32,
        },
      },
    }),
  ];

  const table = useReactTable({
    columns,
    data: accounts,
    getCoreRowModel: getCoreRowModel<AccountTypeWithInst>(),
    defaultColumn: {
      minSize: 72,
    },
  });

  const { rows } = table.getFilteredRowModel();

  const rowVirtualizer = useVirtualizer({
    count: rows.length,
    estimateSize: () => 52, //estimate row height for accurate scrollbar dragging
    getScrollElement: () => tableContainer.current,
    //measure dynamic row height, except in firefox because it measures table border height incorrectly
    measureElement:
      typeof window !== "undefined" && navigator.userAgent.indexOf("Firefox") === -1
        ? (element) => element?.getBoundingClientRect().height
        : undefined,
    overscan: 5,
  });

  return (
    <Table ref={tableContainer} rootClassName="flex-1 grid max-h-[600px] overscroll-contain rounded-md">
      <TableHeader className="sticky top-0 z-[1] grid">
        <TableRow className="flex w-full bg-muted hover:bg-muted">
          {table.getFlatHeaders().map((header) => (
            <TableHead
              key={header.id}
              className="flex items-center"
              // @ts-expect-error
              style={getHeaderWidthStyles<AccountTypeWithInst>(header)}>
              {flexRender(header.column.columnDef.header, header.getContext())}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody
        className="relative grid"
        style={{
          height: rowVirtualizer.getTotalSize(),
        }}>
        {rowVirtualizer.getVirtualItems().map((vRow) => {
          const row = rows[vRow.index] as Row<AccountTypeWithInst>;

          return (
            <TableRow
              key={row.id}
              data-index={vRow.index}
              ref={(node) => rowVirtualizer.measureElement(node)}
              className="absolute flex w-full"
              style={{
                transform: `translateY(${vRow.start}px)`, //this should always be a `style` as it changes on scroll
              }}>
              {row.getVisibleCells().map((cell) => (
                <TableCell
                  key={cell.id}
                  className="flex"
                  // @ts-expect-error
                  style={getCellWidthStyles<AccountTypeWithInst>(cell)}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};
