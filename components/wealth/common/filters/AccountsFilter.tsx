import { useUrlState } from "@/lib/useUrlState";
import { Account, Institution, Transaction } from "@prisma/client";

import { MultiFilter, useMultiFilter } from "./MultiFilter";

type AccountsFilterProps = {
  accounts?: Account[];
  institutions?: Institution[];
};

export const AccountsFilter = ({ accounts, institutions }: AccountsFilterProps) => {
  const [urlState, setUrlState] = useUrlState();
  const [accountFilters, setAccountFilters] = useMultiFilter(urlState.account);

  const accountOptions = accounts?.map((account) => ({
    label:
      institutions?.find((inst) => inst.institution_id === account.institution_id)?.name ??
      account.institution_id ??
      "Unknown",
    items: accounts.filter((acc) => acc.institution_id === account.institution_id),
  }));

  return (
    <MultiFilter<Account>
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
