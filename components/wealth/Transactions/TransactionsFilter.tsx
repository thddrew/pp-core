"use client";

import { DateRangePickerButton } from "@/components/DateRangePickerInput";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  SelectGroup,
  SelectLabel,
  SelectSeparator,
} from "@/components/ui/select";
import { SearchParams } from "@/lib/types/SearchParams";
import { useUrlState } from "@/lib/useUrlState";
import { X } from "lucide-react";
import { AccountBase, Institution, TransactionsGetResponse } from "plaid";
import { useState } from "react";

import { useTransactionsQuery } from "./useTransactionsQuery";

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
  searchParams?: SearchParams;
  institutions?: Institution[];
  transactions?: TransactionsGetResponse[];
};

export const TransactionsFilter = ({
  userId,
  searchParams,
  institutions,
  transactions,
}: TransactionsFilterProps) => {
  const [urlState, setUrlState] = useUrlState(searchParams);
  const [searchTerms, setSearchTerms] = useState(new Set(searchParams?.search?.split(";").filter(Boolean)));

  // const { data } = useTransactionsQuery(userId, urlState.fromDate, urlState.toDate);

  console.log(transactions);

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
          <span className="mb-1 text-sm text-muted-foreground">Institution</span>
          <div className="h-1" />
          <Select
            value={urlState.institution}
            onValueChange={(institution) => {
              setUrlState({ ...urlState, institution });
            }}>
            <SelectTrigger>
              <SelectValue defaultValue="all" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              {institutions?.map((institution) =>
                institution ? (
                  <SelectItem key={institution.institution_id} value={institution.institution_id}>
                    {institution.name}
                  </SelectItem>
                ) : null
              )}
            </SelectContent>
          </Select>
        </div>
        <div className="w-full max-w-[200px]">
          <span className="mb-1 text-sm text-muted-foreground">Account</span>
          <div className="h-1" />
          <Select
            value={urlState.account}
            onValueChange={(account) => {
              setUrlState({ ...urlState, account });
            }}>
            <SelectTrigger>
              <SelectValue defaultValue="all" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              {transactions?.map((accountGroup) => {
                const institution = institutions?.find(
                  (institution) => institution.institution_id === accountGroup.item.institution_id
                );

                return (
                  <SelectGroup key={accountGroup.item.item_id}>
                    <SelectLabel>{institution?.name ?? accountGroup.item.institution_id}</SelectLabel>
                    {accountGroup.accounts.map((account: AccountBase) => (
                      <SelectItem key={account.account_id} value={account.account_id}>
                        {account.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                );
              })}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};
