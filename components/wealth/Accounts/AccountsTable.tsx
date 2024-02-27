"use client";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { InitialSearchParams } from "@/lib/getInitialSearchParams";
import { AccountBaseWithInst } from "@/lib/types/plaid";
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
import { useMemo, useRef } from "react";

import { AccountTypesFilter } from "../common/filters/AccountTypeFilter";

type AccountsTableProps = {
  accounts: AccountBaseWithInst[];
  userId: number;
  searchParams: InitialSearchParams;
};

export const AccountsTable = ({ accounts, userId, searchParams }: AccountsTableProps) => {
  const tableContainer = useRef<HTMLTableElement>(null);
  const columnHelper = createColumnHelper<AccountBaseWithInst>();

  console.log(accounts);
  // Important to useMemo here to avoid an infinite re-render
  // const allAccounts = useMemo(() => accounts, [accounts]);
  const columns = [
    columnHelper.accessor("name", {
      cell: (row) => row.getValue(), // TODO: handle localization
      header: "Name",
      meta: {
        size: "auto",
      },
    }),
    columnHelper.accessor("institution_name", {
      cell: (row) => {
        console.log(row);

        return row.getValue();
      }, // TODO: handle localization
      header: "Institution",
      meta: {
        size: "auto",
      },
    }),
    columnHelper.accessor("subtype", {
      cell: (row) => <span className="capitalize">{row.getValue()}</span>, // TODO: handle localization
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

        return <div className="w-full text-right">{formatted}</div>;
      },
      header: () => <div className="w-full text-right">Current Balance</div>,
      size: 170,
    }),
  ];

  const table = useReactTable({
    columns,
    data: accounts,
    getCoreRowModel: getCoreRowModel<AccountBaseWithInst>(),
    defaultColumn: {
      minSize: 80,
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

  // Default cell widths are 150px and cannot be overwritten to be auto-sizing
  // Therefore, we must manually set auto-sizing if required
  const getHeaderWidthStyles = (header: Header<AccountBaseWithInst, unknown>) => {
    const { meta } = header.column.columnDef;

    if (meta && "size" in meta) {
      return meta.size === "auto"
        ? { flex: 1, minWidth: header.column.columnDef.minSize }
        : { width: header.getSize() };
    }

    return { width: header.getSize() };
  };

  const getCellWidthStyles = (cell: Cell<AccountBaseWithInst, unknown>) => {
    const { meta } = cell.column.columnDef;

    if (meta && "size" in meta) {
      return meta.size === "auto"
        ? { flex: 1, minWidth: cell.column.columnDef.minSize }
        : { width: cell.column.getSize() };
    }

    return { width: cell.column.getSize() };
  };

  const uniqueAccountTypes = Array.from(
    new Set(accounts.flatMap((account) => (account.subtype ? [account.subtype] : [])))
  );

  return (
    <>
      <div className="flex items-center gap-3">
        <div className="w-full max-w-[200px]">
          <span className="text-sm text-muted-foreground">Account Type</span>
          <div className="h-1" />
          <AccountTypesFilter accounts={uniqueAccountTypes} />
        </div>
      </div>
      <div className="h-8" />
      <Table ref={tableContainer} rootClassName="flex-1 grid max-h-[600px] overscroll-contain rounded-md">
        <TableHeader className="sticky top-0 z-[1] grid">
          <TableRow className="flex w-full bg-muted hover:bg-muted">
            {table.getFlatHeaders().map((header) => (
              <TableHead key={header.id} className="flex items-center" style={getHeaderWidthStyles(header)}>
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
                  <TableCell key={cell.id} className="flex" style={getCellWidthStyles(cell)}>
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
