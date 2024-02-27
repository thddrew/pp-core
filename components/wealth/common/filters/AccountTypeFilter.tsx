import { useUrlState } from "@/lib/useUrlState";
import { AccountBase, AccountSubtype, TransactionsGetResponse } from "plaid";

import { MultiFilter, useMultiFilter } from "./MultiFilter";

type AccountTypesFilterProps = {
  accounts: AccountSubtype[];
};

export const AccountTypesFilter = ({ accounts }: AccountTypesFilterProps) => {
  const [urlState, setUrlState] = useUrlState();
  const [accountTypeFilters, setAccountTypeFilters] = useMultiFilter(urlState.accountType);

  return (
    <MultiFilter<(typeof accounts)[number]>
      items={[{ items: accounts }]}
      values={accountTypeFilters}
      getKey={(item) => item}
      getLabel={(item) => item}
      onValueChange={(value) => {
        const updatedFilters = setAccountTypeFilters(value);
        setUrlState({
          accountType: [...updatedFilters.keys()],
        });
      }}
    />
  );
};
