"use client";

import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useUrlState } from "@/lib/useUrlState";
import {
  ColumnDef,
  createColumnHelper,
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import { useVirtualizer } from "@tanstack/react-virtual";
import { Transaction } from "plaid";
import { MutableRefObject, useRef } from "react";

import { useTransactionsQuery } from "./useTransactionsQuery";

type TransactionsTableProps = {
  plaidAccountId: number;
};

export const TransactionsTable = ({ plaidAccountId }: TransactionsTableProps) => {
  const tableContainer = useRef<HTMLTableElement>(null);
  const [urlState, setUrlState] = useUrlState({
    search: "",
  });
  const { data } = useTransactionsQuery(plaidAccountId);
  const transations = data?.transactions ?? [];

  console.log(data);

  const columnHelper = createColumnHelper<Transaction>();

  const columns = [
    columnHelper.accessor("date", {
      cell: (row) => row.getValue(), // TODO: handle localization
      header: "Date",
    }),
    columnHelper.accessor("name", {
      cell: (row) => row.getValue(), // TODO: handle localization
      header: "Name",
    }),
    columnHelper.accessor("personal_finance_category.primary", {
      cell: (row) => {
        return <div className="capitalize">{row.getValue().replaceAll("_", " ").toLowerCase()}</div>;
      },
      header: "Category",
    }),
    columnHelper.accessor("amount", {
      cell: (row) => {
        // Format the amount as a dollar amount
        const formatted = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "CAD",
          currencyDisplay: "narrowSymbol",
        }).format(row.getValue());

        return <div className="text-right">{formatted}</div>;
      },
      header: () => <div className="text-right">Amount</div>,
    }),
  ];

  const table = useReactTable({
    columns,
    data: transations,
    getCoreRowModel: getCoreRowModel<Transaction>(),
  });

  const rowVirtualizer = useVirtualizer({
    count: table.getRowModel().rows.length,
    estimateSize: () => 33, //estimate row height for accurate scrollbar dragging
    getScrollElement: () => tableContainer.current,
    //measure dynamic row height, except in firefox because it measures table border height incorrectly
    measureElement:
      typeof window !== "undefined" && navigator.userAgent.indexOf("Firefox") === -1
        ? (element) => element?.getBoundingClientRect().height
        : undefined,
    overscan: 5,
  });

  return (
    <div>
      <Input
        name="search"
        placeholder="Filter transactions..."
        defaultValue={urlState.search}
        onChange={(e) => {
          setUrlState({
            search: e.target.value,
          });
        }}
      />
      <div className="h-8" />
      <Table ref={tableContainer} rootClassName="h-[400px]">
        <TableHeader className="sticky top-0 bg-background">
          <TableRow>
            {table.getFlatHeaders().map((header) => (
              <TableHead key={header.id}>
                {flexRender(header.column.columnDef.header, header.getContext())}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.map((row) => (
            <TableRow key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
