"use client";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  ColumnDef,
  createColumnHelper,
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import { Transaction } from "plaid";

import { useTransactionsQuery } from "./useTransactionsQuery";

type TransactionsTableProps = {
  plaidAccountId: number;
};

export const TransactionsTable = ({ plaidAccountId }: TransactionsTableProps) => {
  const { data } = useTransactionsQuery(plaidAccountId);
  const transations = data?.transactions ?? [];

  console.log(data);

  const columnHelper = createColumnHelper<Transaction>();

  const columns = [
    columnHelper.accessor("date", {
      cell: (row) => row.getValue(), // TODO: handle localization
    }),
  ];

  const table = useReactTable({
    columns,
    data: transations,
    getCoreRowModel: getCoreRowModel<Transaction>(),
  });

  return (
    <Table>
      <TableHeader>
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
              <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
