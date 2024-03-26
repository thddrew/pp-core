"use client";

import { SearchParams } from "@/lib/types/SearchParams";
import { useUrlState } from "@/lib/useUrlState";

import { MultiFilter, useMultiFilter } from "./MultiFilter";

type AccountTypesFilterProps = {
  accountTypes?: string[];
  searchParams: SearchParams;
};

export const AccountTypesFilter = ({ accountTypes, searchParams }: AccountTypesFilterProps) => {
  const [urlState, setUrlState] = useUrlState(searchParams);
  const [accountTypeFilters, setAccountTypeFilters] = useMultiFilter(urlState.accountType);

  return (
    <MultiFilter<string>
      items={[{ items: accountTypes ?? [] }]}
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
