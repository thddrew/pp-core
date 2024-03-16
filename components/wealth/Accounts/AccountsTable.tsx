"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { startSyncTransactionsJob } from "@/lib/qstash/transactions";
import { SearchParams } from "@/lib/types/SearchParams";
import { AccountBaseWithInst } from "@/lib/types/plaid";
import { cn } from "@/lib/utils";
import { useQueryClient } from "@tanstack/react-query";
import {
  createColumnHelper,
  useReactTable,
  getCoreRowModel,
  flexRender,
  Row,
  Header,
  Cell,
} from "@tanstack/react-table";
import { useVirtualizer } from "@tanstack/react-virtual";
import { MoreVerticalIcon, RefreshCcwIcon, TrashIcon } from "lucide-react";
import { HTMLProps, Suspense, useRef } from "react";

import { AccountTypesFilter } from "../common/filters/AccountTypeFilter";
import { getCellWidthStyles, getHeaderWidthStyles } from "../common/tables/cellSize";
import { LastSyncedDate } from "./LastSyncDate";

type AccountsTableProps = {
  accounts: AccountBaseWithInst[];
  userId: number;
  searchParams: SearchParams;
};

const StyledTableCell = ({ className, ...props }: HTMLProps<HTMLDivElement>) => (
  <div {...props} className={cn("flex w-full items-center", className)} />
);

export const AccountsTable = ({ accounts, userId, searchParams }: AccountsTableProps) => {
  const tableContainer = useRef<HTMLTableElement>(null);
  const columnHelper = createColumnHelper<AccountBaseWithInst>();
  const queryClient = useQueryClient();

  // Important to useMemo here to avoid an infinite re-render
  // const allAccounts = useMemo(() => accounts, [accounts]);
  const columns = [
    columnHelper.accessor("name", {
      cell: (row) => <StyledTableCell>{row.getValue()}</StyledTableCell>, // TODO: handle localization
      header: "Account name",
      // meta: {
      //   size: "auto",
      // },
    }),
    columnHelper.accessor("institution_id", {
      header: "Last Synced",
      cell: (row) => (
        <StyledTableCell>
          <LastSyncedDate instId={row.row.original.institution_id} />
        </StyledTableCell>
      ),
    }),
    columnHelper.accessor("institution_name", {
      cell: (row) => <StyledTableCell>{row.getValue()}</StyledTableCell>, // TODO: handle localization
      header: "Institution",
      // meta: {
      //   size: "auto",
      // },
    }),
    columnHelper.accessor("subtype", {
      cell: (row) => <StyledTableCell className="capitalize">{row.getValue()}</StyledTableCell>, // TODO: handle localization
      header: "Type",
    }),
    columnHelper.accessor("balances.current", {
      cell: (row) => {
        // Format the amount as a dollar amount
        const formatted = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: row.row.original.balances.iso_currency_code ?? "CAD",
          currencyDisplay: "narrowSymbol",
        }).format(row.getValue() ?? 0);

        return <StyledTableCell className="justify-end">{formatted}</StyledTableCell>;
      },
      header: () => <StyledTableCell className="justify-end">Current Balance</StyledTableCell>,
      size: 170,
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
                if (!instId) return;

                await startSyncTransactionsJob({
                  institutionId: instId,
                  userId,
                  fullSync: false,
                });
                queryClient.invalidateQueries({
                  queryKey: ["institution", instId],
                });
                // TODO: do something with the ID?
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
    getCoreRowModel: getCoreRowModel<AccountBaseWithInst>(),
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

  const uniqueAccountTypes = Array.from(
    new Set(accounts.flatMap((account) => (account.subtype ? [account.subtype] : [])))
  );

  return (
    <>
      <div className="flex items-center gap-3">
        <div className="w-full max-w-[200px]">
          <span className="text-sm text-muted-foreground">Account Type</span>
          <div className="h-1" />
          <AccountTypesFilter searchParams={searchParams} accounts={uniqueAccountTypes} />
        </div>
      </div>
      <div className="h-8" />
      <Table ref={tableContainer} rootClassName="flex-1 grid max-h-[600px] overscroll-contain rounded-md">
        <TableHeader className="sticky top-0 z-[1] grid">
          <TableRow className="flex w-full bg-muted hover:bg-muted">
            {table.getFlatHeaders().map((header) => (
              <TableHead
                key={header.id}
                className="flex items-center"
                // @ts-expect-error
                style={getHeaderWidthStyles<AccountBaseWithInst>(header)}>
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
            const row = rows[vRow.index] as Row<AccountBaseWithInst>;

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
                    style={getCellWidthStyles<AccountBaseWithInst>(cell)}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </>
  );
};
