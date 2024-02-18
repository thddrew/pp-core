import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  SelectGroup,
  SelectLabel,
} from "@/components/ui/select";
import { Institution, TransactionsGetResponse } from "plaid";

type AccountsFilterProps = {
  value?: string | undefined;
  onValueChange?: (value: string) => void;
  transactions?: TransactionsGetResponse[];
  institutions?: Institution[];
};

/**
 * Displays list of accounts based on transactions grouped by institutions
 * TODO: use accounts as base, not transactions
 */
export const AccountsFilter = ({
  value,
  onValueChange,
  transactions = [],
  institutions = [],
}: AccountsFilterProps) => {
  return (
    <>
      <span className="mb-1 text-sm text-muted-foreground">Account</span>
      <div className="h-1" />
      <Select value={value} onValueChange={onValueChange}>
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
                {accountGroup.accounts.map((account) => (
                  <SelectItem key={account.account_id} value={account.account_id}>
                    {account.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            );
          })}
        </SelectContent>
      </Select>
    </>
  );
};
