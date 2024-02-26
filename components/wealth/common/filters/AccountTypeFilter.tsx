import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AccountBase } from "plaid";

type AccountTypeFilterProps = {
  value?: string | undefined;
  onValueChange?: (value: string) => void;
  accounts?: AccountBase[];
};

export const AccountTypeFilter = ({ value, onValueChange, accounts }: AccountTypeFilterProps) => {
  const allSubtypes = Array.from(new Set(accounts?.map(({ subtype }) => subtype)));

  return (
    <>
      <span className="mb-1 text-sm text-muted-foreground">Account Type</span>
      <div className="h-1" />
      <Select value={value} onValueChange={onValueChange}>
        <SelectTrigger>
          <SelectValue defaultValue="all" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All</SelectItem>
          {allSubtypes.map((subtype) =>
            subtype ? (
              <SelectItem key={subtype} value={subtype}>
                <span className="capitalize">{subtype}</span>
              </SelectItem>
            ) : null
          )}
        </SelectContent>
      </Select>
    </>
  );
};
