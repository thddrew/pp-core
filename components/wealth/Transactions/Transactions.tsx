"use client";

import { DateRangePickerButton } from "@/components/DateRangePickerInput";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { defaultTodayRange } from "@/lib/defaultDateRanges";
import { useUrlState } from "@/lib/useUrlState";
import { X } from "lucide-react";
import { useState } from "react";

import { TransactionsTable } from "./TransactionsTable";

type TransactionsProps = {
  plaidAccountId: number;
};

export const SearchBadges = ({ terms, onRemove }: { terms: string[]; onRemove: (term: string) => void }) => (
  <div className="space-x-1">
    {terms.map((term) => (
      <Badge
        key={term}
        className="cursor-pointer gap-1 text-nowrap rounded-sm"
        onClick={() => {
          onRemove(term);
        }}>
        <span>{term}</span>
        <X size={14} />
      </Badge>
    ))}
  </div>
);

export const Transactions = ({ plaidAccountId }: TransactionsProps) => {
  const [urlState, setUrlState] = useUrlState({
    search: "",
    fromDate: defaultTodayRange.fromDate,
    toDate: defaultTodayRange.toDate,
  });
  const [searchTerms, setSearchTerms] = useState(new Set(urlState.search.split(";").filter(Boolean)));

  return (
    <>
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
      <div className="h-8" />
      <TransactionsTable plaidAccountId={plaidAccountId} />
    </>
  );
};
