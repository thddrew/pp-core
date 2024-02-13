"use client";

import { Select, SelectItem, SelectContent, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
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
import { AccountBase, Institution, InstitutionsGetByIdResponse } from "plaid";
import { useMemo, useRef } from "react";

import { useAccountsQuery } from "./useAccountsQuery";

type AccountsTableProps = {
  userId: number;
  institutions: Institution[];
};

export const AccountsTable = ({ userId, institutions }: AccountsTableProps) => {
  const [urlState, setUrlState] = useUrlState({
    institution: "all",
    type: "all",
  });
  const tableContainer = useRef<HTMLTableElement>(null);
  const columnHelper = createColumnHelper<
    AccountBase & {
      institutionName?: string;
    }
  >();

  const { data } = useAccountsQuery(userId);

  // Important to useMemo here to avoid an infinite re-render
  const allAccounts = useMemo(() => data?.flatMap((account) => account.accounts) ?? [], [data]);

  const allSubtypes = useMemo(
    () => Array.from(new Set(allAccounts.map((account) => account.subtype))),
    [allAccounts]
  );

  console.log(data);

  const columns = [
    columnHelper.accessor("name", {
      cell: (row) => row.getValue(), // TODO: handle localization
      header: "Name",
      meta: {
        size: "auto",
      },
    }),
    columnHelper.accessor("institutionName", {
      cell: (row) => row.getValue(), // TODO: handle localization
      header: "Institution",
      meta: {
        size: "auto",
      },
    }),
    columnHelper.accessor("subtype", {
      cell: (row) => <span className="capitalize">{row.getValue()}</span>, // TODO: handle localization
      header: "Type",
    }),
    columnHelper.accessor("balances", {
      cell: (row) => {
        // Format the amount as a dollar amount
        const formatted = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: row.getValue().iso_currency_code ?? "CAD",
          currencyDisplay: "narrowSymbol",
        }).format(row.getValue().current ?? 0);

        return <div className="w-full text-right">{formatted}</div>;
      },
      header: () => <div className="w-full text-right">Current Balance</div>,
      size: 170,
    }),
  ];

  const table = useReactTable({
    columns,
    data: allAccounts,
    getCoreRowModel: getCoreRowModel<AccountBase>(),
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
  const getHeaderWidthStyles = (header: Header<AccountBase, unknown>) => {
    const { meta } = header.column.columnDef;

    if (meta && "size" in meta) {
      return meta.size === "auto"
        ? { flex: 1, minWidth: header.column.columnDef.minSize }
        : { width: header.getSize() };
    }

    return { width: header.getSize() };
  };

  const getCellWidthStyles = (cell: Cell<AccountBase, unknown>) => {
    const { meta } = cell.column.columnDef;

    if (meta && "size" in meta) {
      return meta.size === "auto"
        ? { flex: 1, minWidth: cell.column.columnDef.minSize }
        : { width: cell.column.getSize() };
    }

    return { width: cell.column.getSize() };
  };

  return (
    <>
      <div className="flex items-center gap-3">
        <div className="w-full max-w-[200px]">
          <span className="text-sm">Institution</span>
          <div className="h-1" />
          <Select
            value={urlState.institution}
            onValueChange={(institution) => {
              setUrlState({ ...urlState, institution });
            }}>
            <SelectTrigger>
              <SelectValue defaultValue="all" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              {institutions.map((institution) =>
                institution ? (
                  <SelectItem key={institution.institution_id} value={institution.institution_id}>
                    {institution.name}
                  </SelectItem>
                ) : null
              )}
            </SelectContent>
          </Select>
        </div>
        <div className="w-full max-w-[200px]">
          <span className="text-sm">Type</span>
          <div className="h-1" />
          <Select
            value={urlState.type}
            onValueChange={(type) => {
              setUrlState({ ...urlState, type });
            }}>
            <SelectTrigger>
              <SelectValue defaultValue="all" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              {allSubtypes.map((subtype) =>
                subtype ? (
                  <SelectItem key={subtype} value={subtype}>
                    <span className="capitalize">{subtype}</span>
                  </SelectItem>
                ) : null
              )}
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="h-8" />
      <Table
        ref={tableContainer}
        rootClassName="flex-1 grid max-h-[600px] overscroll-contain border rounded-md">
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
            const row = rows[vRow.index] as Row<AccountBase>;

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
