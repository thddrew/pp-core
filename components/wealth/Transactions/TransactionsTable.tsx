"use client";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { InitialSearchParams } from "@/lib/getInitialSearchParams";
import { Account, Transaction } from "@prisma/client";
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
import { useRef } from "react";

import { getCellWidthStyles, getHeaderWidthStyles } from "../common/tables/cellSize";

type TransactionsTableProps = {
  userId: number;
  searchParams: InitialSearchParams;
  transactions: Transaction[];
  mappedAccountIds: Record<string, Account>;
};

export const TransactionsTable = ({ transactions, mappedAccountIds }: TransactionsTableProps) => {
  const tableContainer = useRef<HTMLTableElement>(null);

  const columnHelper = createColumnHelper<Transaction>();

  const columns = [
    columnHelper.accessor("date", {
      cell: (row) => row.getValue(), // TODO: handle localization
      header: "Date",
      meta: {
        size: {
          width: 120,
        },
      },
    }),
    columnHelper.accessor("name", {
      cell: (row) => row.getValue(), // TODO: handle localization
      header: "Name",
      meta: {
        size: {
          flex: 2,
        },
      },
    }),
    columnHelper.accessor("account_id", {
      cell: (row) => mappedAccountIds[row.getValue()].display_name, // TODO: handle localization
      header: "Account",
      meta: {
        size: "auto",
      },
    }),
    columnHelper.accessor("category", {
      cell: (row) => {
        return <div className="capitalize">{row?.getValue()?.replaceAll("_", " ").toLowerCase()}</div>;
      },
      header: "Category",
      meta: {
        size: {
          flex: 0.5,
        },
      },
    }),
    columnHelper.accessor("amount", {
      cell: (row) => {
        // Format the amount as a dollar amount
        const formatted = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "CAD",
          currencyDisplay: "narrowSymbol",
        }).format(row.getValue());

        return <div className="w-full text-right">{formatted}</div>;
      },
      header: () => <div className="w-full text-right">Amount</div>,
      meta: {
        size: {
          width: 120,
        },
      },
    }),
  ];

  const table = useReactTable({
    columns,
    data: transactions,
    getCoreRowModel: getCoreRowModel<Transaction>(),
    defaultColumn: {
      minSize: 80,
    },
  });

  const { rows } = table.getRowModel();

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
    <div className="w-full overflow-x-auto">
      <Table ref={tableContainer} rootClassName="flex-1 grid rounded-md max-h-[1000px]">
        <TableHeader className="sticky top-0 z-[1] grid bg-background">
          <TableRow className="flex w-full bg-muted hover:bg-muted">
            {table.getFlatHeaders().map((header) => (
              <TableHead
                key={header.id}
                className="flex items-center"
                // @ts-expect-error
                style={getHeaderWidthStyles<Transaction>(header)}>
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
            const row = rows[vRow.index] as Row<Transaction>;
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
                  // @ts-expect-error
                  <TableCell key={cell.id} className="flex" style={getCellWidthStyles<Transaction>(cell)}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};
