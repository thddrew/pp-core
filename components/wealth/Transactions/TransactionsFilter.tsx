"use client";

import { Input } from "@/components/ui/input";
import { useUrlState } from "@/lib/useUrlState";

export const TransactionsFilter = () => {
  const [urlState, setUrlState] = useUrlState({
    search: "",
  });

  return (
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
  );
};
