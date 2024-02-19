import { useUrlState } from "@/lib/useUrlState";
import { AccountBase, TransactionsGetResponse } from "plaid";

import { MultiFilter, useMultiFilter } from "./MultiFilter";

type AccountsFilterProps = {
  transactions: TransactionsGetResponse[];
};

export const AccountsFilter = ({ transactions }: AccountsFilterProps) => {
  const [urlState, setUrlState] = useUrlState();
  const [accountFilters, setAccountFilters] = useMultiFilter(urlState.account);
  const accountOptions = transactions?.map((group) => ({
    label: group.item.institution_id ?? undefined,
    items: group.accounts,
  }));

  return (
    <MultiFilter<AccountBase>
      items={accountOptions}
      values={accountFilters}
      getKey={(item) => item.account_id}
      getLabel={(item) => item.name}
      onValueChange={(value) => {
        const updatedFilters = setAccountFilters(value);
        setUrlState({
          account: [...updatedFilters.keys()],
        });
      }}
    />
  );
};
