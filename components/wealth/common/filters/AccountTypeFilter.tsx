"use client";

import { SearchParams } from "@/lib/types/SearchParams";
import { useUrlState } from "@/lib/useUrlState";
import { AccountSubtype } from "plaid";

import { MultiFilter, useMultiFilter } from "./MultiFilter";

type AccountTypesFilterProps = {
  accounts?: AccountSubtype[];
  searchParams: SearchParams;
};

export const AccountTypesFilter = ({ accounts, searchParams }: AccountTypesFilterProps) => {
  const [urlState, setUrlState] = useUrlState(searchParams);
  const [accountTypeFilters, setAccountTypeFilters] = useMultiFilter(urlState.accountType);

  return (
    <MultiFilter<AccountSubtype>
      items={[{ items: accounts ?? [] }]}
      values={accountTypeFilters}
      getKey={(item) => String(item)}
      getLabel={(item) => item.toUpperCase()}
      onValueChange={(value) => {
        const updatedFilters = setAccountTypeFilters(value);
        setUrlState({
          accountType: [...updatedFilters.keys()],
        });
      }}
    />
  );
};
