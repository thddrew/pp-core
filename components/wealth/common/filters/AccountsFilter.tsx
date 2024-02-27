import { useUrlState } from "@/lib/useUrlState";
import { AccountBase, Institution, TransactionsGetResponse } from "plaid";

import { MultiFilter, useMultiFilter } from "./MultiFilter";

type AccountsFilterProps = {
  transactions: TransactionsGetResponse[];
  institutions?: Institution[];
};

export const AccountsFilter = ({ transactions, institutions }: AccountsFilterProps) => {
  const [urlState, setUrlState] = useUrlState();
  const [accountFilters, setAccountFilters] = useMultiFilter(urlState.account);
  const accountOptions = transactions?.map((group) => ({
    label:
      institutions?.find((inst) => inst.institution_id === group.item.institution_id)?.name ??
      group.item.institution_id ??
      "Unknown",
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
