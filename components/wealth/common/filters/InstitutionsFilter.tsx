import { useUrlState } from "@/lib/useUrlState";
import { AccountBase, Institution, TransactionsGetResponse } from "plaid";

import { MultiFilter, useMultiFilter } from "./MultiFilter";

type InstitutionsFilterProps = {
  institutions: Institution[];
};

export const InstitutionsFilter = ({ institutions }: InstitutionsFilterProps) => {
  const [urlState, setUrlState] = useUrlState();
  const [institutionFilters, setInstitutionFilters] = useMultiFilter(urlState.institutions);

  return (
    <MultiFilter<Institution>
      items={[{ items: institutions ?? [] }]}
      values={institutionFilters}
      getKey={(item) => item.institution_id}
      getLabel={(item) => item.name}
      onValueChange={(value) => {
        const updatedFilters = setInstitutionFilters(value);
        setUrlState({
          institutions: [...updatedFilters.keys()],
        });
      }}
    />
  );
};
