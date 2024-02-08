"use client";

import { Select, SelectItem, SelectTrigger, SelectValue, SelectContent } from "@/components/ui/select";
import { useUrlState } from "@/lib/useUrlState";
import { createColumnHelper, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { LiabilitiesObject } from "plaid";
import { useEffect } from "react";

import { useLiabilitiesQuery } from "./useLiabilitiesQuery";

type LiabilitiesTableProps = {
  plaidAccountId: number;
};

type LiabilitiesObjectKey = keyof LiabilitiesObject | "all";

export const LiabilitiesTable = ({ plaidAccountId }: LiabilitiesTableProps) => {
  const [urlState, setUrlState] = useUrlState({
    liabilities: "all",
  });
  const { data } = useLiabilitiesQuery(plaidAccountId);

  console.log(urlState);

  const liabilities = data?.liabilities
    ? {
        ...data.liabilities,
        all: Object.values(data.liabilities).flat(),
      }
    : {};

  const categories = Object.keys(liabilities).sort((a, b) => a.localeCompare(b));

  const currentLiability = (
    categories.includes(urlState.liabilities) ? urlState.liabilities : "all"
  ) as LiabilitiesObjectKey;

  console.log(liabilities);

  // const columnHelper = createColumnHelper<LiabilitiesObject>();

  // const columns = [
  //   columnHelper.accessor(`${currentLiability}.name`, {
  //     cell: (row) => row.getValue(),
  //   }),
  // ];

  // const table = useReactTable({
  //   columns,
  //   data: transations,
  //   getCoreRowModel: getCoreRowModel<LiabilitiesObject>(),
  // });

  return (
    <div>
      <Select
        defaultValue={currentLiability}
        onValueChange={(value) => {
          setUrlState({
            liabilities: value,
          });
        }}>
        <SelectTrigger className="w-[200px] capitalize">
          <SelectValue placeholder="Select a category" />
        </SelectTrigger>
        <SelectContent>
          {categories.map((category) => (
            <SelectItem key={category} value={category} className="capitalize">
              {category}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
