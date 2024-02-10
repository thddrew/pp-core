"use client";

import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { defaultDateRanges } from "@/lib/defaultDateRanges";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import * as React from "react";

import { DateRange, DateRangePicker } from "./DateRangePicker";

export function DateRangePickerButton({
  className,
  range,
  onChange,
}: {
  className?: string;
  range: {
    fromDate: string;
    toDate: string;
  };
  onChange?: (range: Partial<DateRange>) => void;
}) {
  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn("w-max justify-start text-left font-normal", !range && "text-muted-foreground")}>
            <CalendarIcon className="mr-2 h-4 w-4" />
            {range.fromDate ? (
              range.toDate ? (
                <>
                  {format(range.fromDate, "LLL dd, y")} - {format(range.toDate, "LLL dd, y")}
                </>
              ) : (
                format(range.fromDate, "LLL dd, y")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <DateRangePicker selected={range} onChange={onChange} />
        </PopoverContent>
      </Popover>
    </div>
  );
}
