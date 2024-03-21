"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu";
import { useState, ReactNode, Fragment } from "react";

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

// type GenericItem = Record<string, unknown>;

type MultiFilterProps<Item> = {
  values: Map<string | "all", boolean>;
  onValueChange: (value: string | "all") => void;
  items: { label?: string; items: Item[] }[];
  getKey: (item: Item) => string;
  getLabel: (item: Item) => ReactNode;
  includeAll?: boolean;
};

export function MultiFilter<Item>({
  values,
  onValueChange,
  items,
  getKey,
  getLabel,
  includeAll = true,
}: MultiFilterProps<Item>) {
  const displayValue = () => {
    if (values?.size === 1 && values.has("all")) {
      return "All";
    }

    return `${values.size} selected`;
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="w-full" variant="outline">
          {displayValue()}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        {includeAll && (
          <DropdownMenuCheckboxItem
            checked={values.get("all") as Checked}
            onClick={(e) => {
              e.preventDefault();
              onValueChange?.("all");
            }}>
            All
          </DropdownMenuCheckboxItem>
        )}
        {items.map((group, groupIdx) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: This is a temporary fix
          <Fragment key={groupIdx}>
            {group.label && <DropdownMenuLabel key={group.label}>{group.label}</DropdownMenuLabel>}
            {group.items.map((item) => {
              const id = getKey(item);
              const name = getLabel(item);
              const checked = values?.get(id) as Checked;

              return (
                <DropdownMenuCheckboxItem
                  key={id}
                  checked={checked}
                  onClick={(e) => {
                    e.preventDefault();
                    onValueChange?.(id);
                  }}>
                  <span className="capitalize">{name}</span>
                </DropdownMenuCheckboxItem>
              );
            })}
          </Fragment>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
