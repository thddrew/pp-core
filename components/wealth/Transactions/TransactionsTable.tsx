"use client";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { defaultTodayRange } from "@/lib/defaultDateRanges";
import { SearchParams } from "@/lib/types/SearchParams";
import { useUrlState } from "@/lib/useUrlState";
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
import { Transaction } from "plaid";
import { useMemo, useRef } from "react";

import { useTransactionsQuery } from "./useTransactionsQuery";

type TransactionsTableProps = {
  userId: number;
  searchParams?: SearchParams;
};

export const TransactionsTable = ({ userId, searchParams }: TransactionsTableProps) => {
  const [urlState, setUrlState] = useUrlState(searchParams);
  const tableContainer = useRef<HTMLTableElement>(null);
  const { data } = useTransactionsQuery(userId);
  console.log(data);
  const transactions = useMemo(
    () =>
      data
        ?.flatMap((account) => account.transactions)
        .sort((a, b) => new Date(a.date).getDate() - new Date(b.date).getDate()) ?? [],
    [data]
  );

  const columnHelper = createColumnHelper<Transaction>();

  const columns = [
    columnHelper.accessor("date", {
      cell: (row) => row.getValue(), // TODO: handle localization
      header: "Date",
      size: 120,
    }),
    columnHelper.accessor("name", {
      cell: (row) => row.getValue(), // TODO: handle localization
      header: "Name",
      meta: {
        size: "auto",
      },
    }),
    columnHelper.accessor("personal_finance_category.primary", {
      cell: (row) => {
        return <div className="capitalize">{row.getValue().replaceAll("_", " ").toLowerCase()}</div>;
      },
      header: "Category",
      size: 180,
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
      size: 120,
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

  // Default cell widths are 150px and cannot be overwritten to be auto-sizing
  // Therefore, we must manually set auto-sizing if required
  const getHeaderWidthStyles = (header: Header<Transaction, unknown>) => {
    const { meta } = header.column.columnDef;

    if (meta && "size" in meta) {
      return meta.size === "auto"
        ? { flex: 1, minWidth: header.column.columnDef.minSize }
        : { width: header.getSize() };
    }

    return { width: header.getSize() };
  };

  const getCellWidthStyles = (cell: Cell<Transaction, unknown>) => {
    const { meta } = cell.column.columnDef;

    if (meta && "size" in meta) {
      return meta.size === "auto"
        ? { flex: 1, minWidth: cell.column.columnDef.minSize }
        : { width: cell.column.getSize() };
    }

    return { width: cell.column.getSize() };
  };

  return (
    <Table ref={tableContainer} rootClassName="flex-1 grid max-h-[600px] overscroll-contain">
      <TableHeader className="sticky top-0 z-[1] grid bg-background">
        <TableRow className="flex w-full">
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
                <TableCell key={cell.id} className="flex" style={getCellWidthStyles(cell)}>
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
