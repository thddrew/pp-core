import { useUrlState } from "@/lib/useUrlState";
import { Account } from "@prisma/client";

import { MultiFilter, useMultiFilter } from "./MultiFilter";

type AccountTypesFilterProps = {
  accounts: Account[];
};

export const AccountTypesFilter = ({ accounts }: AccountTypesFilterProps) => {
  const [urlState, setUrlState] = useUrlState();
  const [accountTypeFilters, setAccountTypeFilters] = useMultiFilter(urlState.accountType);

  return (
    <MultiFilter<Account>
      items={[{ items: accounts }]}
      values={accountTypeFilters}
      getKey={(item) => String(item.id)}
      getLabel={(item) => item.display_name}
      onValueChange={(value) => {
        const updatedFilters = setAccountTypeFilters(value);
        setUrlState({
          accountType: [...updatedFilters.keys()],
        });
      }}
    />
  );
};
