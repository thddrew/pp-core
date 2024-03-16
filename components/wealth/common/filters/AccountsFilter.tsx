import { SearchParams } from "@/lib/types/SearchParams";
import { useUrlState } from "@/lib/useUrlState";
import { Account, Institution } from "@prisma/client";

import { MultiFilter, useMultiFilter } from "./MultiFilter";

type AccountsFilterProps = {
  accounts?: Account[];
  institutions?: Institution[];
  searchParams: SearchParams;
};

export const AccountsFilter = ({ accounts, institutions, searchParams }: AccountsFilterProps) => {
  const [urlState, setUrlState] = useUrlState(searchParams);
  const [accountFilters, setAccountFilters] = useMultiFilter(urlState.account);

  const groupedAccounts =
    accounts?.reduce<Record<string, { label: string; items: Account[] }>>((groups, account) => {
      const key = account.institution_id;

      if (!key) {
        groups.unknown = {
          label: "Unknown",
          items: groups.unknown ? [...groups.unknown.items, account] : [account],
        };

        return groups;
      }

      if (groups[key]) {
        groups[key].items.push(account);
      } else {
        groups[key] = {
          label:
            institutions?.find((inst) => inst.institution_id === account.institution_id)?.name ??
            account.institution_id ??
            "Unknown",
          items: [account],
        };
      }

      return groups;
    }, {}) ?? {};

  const groupedAccountsList = Object.values(groupedAccounts);

  return (
    <MultiFilter<Account>
      items={groupedAccountsList}
      values={accountFilters}
      getKey={(item) => String(item.id)}
      getLabel={(item) => item.display_name}
      onValueChange={(value) => {
        const updatedFilters = setAccountFilters(value);
        setUrlState({
          account: [...updatedFilters.keys()],
        });
      }}
    />
  );
};
