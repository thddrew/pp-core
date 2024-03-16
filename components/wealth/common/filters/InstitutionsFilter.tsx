import { SearchParams } from "@/lib/types/SearchParams";
import { useUrlState } from "@/lib/useUrlState";
import { Institution } from "@prisma/client";

import { MultiFilter, useMultiFilter } from "./MultiFilter";

type InstitutionsFilterProps = {
  institutions: Institution[];
  searchParams: SearchParams;
};

export const InstitutionsFilter = ({ institutions, searchParams }: InstitutionsFilterProps) => {
  const [urlState, setUrlState] = useUrlState(searchParams);
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
