import { useUrlState } from "@/lib/useUrlState";
import { Account } from "@prisma/client";
import { AccountSubtype } from "plaid";

import { MultiFilter, useMultiFilter } from "./MultiFilter";

type AccountTypesFilterProps = {
  accounts?: AccountSubtype[];
};

export const AccountTypesFilter = ({ accounts }: AccountTypesFilterProps) => {
  const [urlState, setUrlState] = useUrlState();
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
