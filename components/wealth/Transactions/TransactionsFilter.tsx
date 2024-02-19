"use client";

import { DateRangePickerButton } from "@/components/DateRangePickerInput";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { InitialSearchParams } from "@/lib/getInitialSearchParams";
import { useUrlState } from "@/lib/useUrlState";
import { X } from "lucide-react";
import { AccountBase, Institution, TransactionsGetResponse } from "plaid";
import { useState } from "react";

import { AccountTypeFilter } from "../common/filters/AccountTypeFilter";
import { AccountsFilter } from "../common/filters/AccountsFilter";
import { MultiFilter, useMultiFilter } from "../common/filters/MultiFilter";

export const SearchBadges = ({ terms, onRemove }: { terms: string[]; onRemove: (term: string) => void }) => (
  <div className="space-x-1">
    {terms.map((term) => (
      <Badge
        key={term}
        className="cursor-pointer gap-1 text-nowrap rounded-sm"
        onClick={() => {
          onRemove(term);
        }}>
        <span>&quot;{term}&quot;</span>
        <X size={14} />
      </Badge>
    ))}
  </div>
);

type TransactionsFilterProps = {
  userId: number;
  searchParams: InitialSearchParams;
  institutions?: Institution[];
  transactions?: TransactionsGetResponse[];
  accounts?: AccountBase[];
};

export const TransactionsFilter = ({
  userId,
  searchParams,
  institutions,
  transactions,
  accounts,
}: TransactionsFilterProps) => {
  const [urlState, setUrlState] = useUrlState(searchParams);
  const [searchTerms, setSearchTerms] = useState(new Set(searchParams?.search?.split(";").filter(Boolean)));
  const [institutionFilters, setInstitutionFilters] = useMultiFilter(urlState.institutions);

  // const { data } = useTransactionsQuery(userId, urlState.fromDate, urlState.toDate);

  return (
    <div>
      <Input
        name="search"
        placeholder="Search your transactions and press enter."
        onKeyDown={(e) => {
          const value = e.currentTarget.value.trim();

          if (e.key === "Enter" && value) {
            const newTerms = searchTerms.add(value);
            setUrlState({ ...urlState, search: [...newTerms].join(";") });
            setSearchTerms(new Set(newTerms));
            e.currentTarget.value = "";
          }
        }}
      />
      <div className="h-2" />
      <SearchBadges
        terms={[...searchTerms]}
        onRemove={(term) => {
          const filteredTerms = searchTerms;
          filteredTerms.delete(term);

          setSearchTerms(new Set(filteredTerms));
          setUrlState({
            ...urlState,
            search: [...filteredTerms].join(";"),
          });
        }}
      />
      <div className="h-4" />
      <div className="flex items-center gap-4">
        <div>
          <span className="mb-1 text-sm text-muted-foreground">Between</span>
          <DateRangePickerButton
            range={{
              fromDate: urlState.fromDate,
              toDate: urlState.toDate,
            }}
            onChange={(range) => {
              setUrlState({
                ...urlState,
                // TODO: handle undefined
                fromDate: range.fromDate ?? "",
                toDate: range.toDate ?? "",
              });
            }}
          />
        </div>
        <div className="w-full max-w-[200px]">
          <span className="mb-1 text-sm text-muted-foreground">Institutions</span>
          <MultiFilter<Institution>
            label="Institutions"
            items={institutions ?? []}
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
        </div>
        <div className="w-full max-w-[200px]">
          <AccountsFilter
            value={urlState.account}
            onValueChange={(account) => {
              setUrlState({ ...urlState, account });
            }}
            transactions={transactions}
            institutions={institutions}
          />
        </div>
        <div className="w-full max-w-[200px]">
          <AccountTypeFilter
            value={urlState.accountType}
            onValueChange={(accountType) => setUrlState({ ...urlState, accountType })}
            accounts={accounts}
          />
        </div>
      </div>
    </div>
  );
};
