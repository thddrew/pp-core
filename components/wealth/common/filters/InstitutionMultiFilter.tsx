"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu";
import { Institution } from "plaid";
import { useState } from "react";
import * as React from "react";

type Checked = DropdownMenuCheckboxItemProps["checked"];

export const useMultiFilter = (initialValues: string[] = []) => {
  const [values, setValues] = useState(new Map(initialValues.map((value) => [value, true])));

  const onValueChange = (value: string) => {
    let updatedChecked = new Map(values);

    if (value === "all") {
      updatedChecked = new Map([["all", true]]);
      setValues(updatedChecked);
      return updatedChecked;
    }

    try {
      updatedChecked.delete("all");
      const wasChecked = updatedChecked.get(value);

      if (wasChecked) {
        updatedChecked.delete(value);
      } else {
        updatedChecked.set(value, true);
      }

      if (updatedChecked.size === 0) {
        updatedChecked.set("all", true);
      }

      setValues(updatedChecked);
      return updatedChecked;
    } catch (err) {
      return values;
    }
  };

  return [values, onValueChange] as const;
};

type InstitutionsFilterProps = {
  values: Map<string, boolean>;
  onValueChange?: (value: string) => void;
  institutions?: Institution[];
};

export function InstitutionMultiFilter({
  values,
  onValueChange,
  institutions = [],
}: InstitutionsFilterProps) {
  const displayValue = () => {
    if (values?.size === 1 && values.has("all")) {
      return "All";
    }

    if (values?.size === 1) {
      return [...values.keys()][0];
    }

    return `${values.size} selected`;
  };

  return (
    <>
      <span className="mb-1 text-sm text-muted-foreground">Institutions</span>
      <div className="h-1" />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="w-full" variant="outline">
            {displayValue()}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>Institutions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuCheckboxItem
            checked={values.get("all") as Checked}
            onClick={(e) => {
              e.preventDefault();
              onValueChange?.("all");
            }}>
            All
          </DropdownMenuCheckboxItem>
          {institutions.map((institution) => {
            const id = institution.institution_id;
            const name = institution.name;
            const checked = values?.get(id) as Checked;

            return (
              <DropdownMenuCheckboxItem
                key={id}
                checked={checked}
                onClick={(e) => {
                  e.preventDefault();
                  onValueChange?.(id);
                }}>
                {name}
              </DropdownMenuCheckboxItem>
            );
          })}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
