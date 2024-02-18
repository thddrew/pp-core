import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Institution } from "plaid";

type InstitutionsFilterProps = {
  value?: string | undefined;
  onValueChange?: (value: string) => void;
  institutions?: Institution[];
};

export const InstitutionsFilter = ({ institutions = [], value, onValueChange }: InstitutionsFilterProps) => {
  return (
    <>
      <span className="mb-1 text-sm text-muted-foreground">Institution</span>
      <div className="h-1" />
      <Select value={value} onValueChange={onValueChange}>
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
    </>
  );
};
