"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { defaultDateRanges } from "@/lib/defaultDateRanges";

export type DateRange = { fromDate: string; toDate: string };

type DateRangePickerProps = {
  onChange?: (range: Partial<DateRange>) => void;
  selected: DateRange;
};

export function DateRangePicker({ onChange, selected }: DateRangePickerProps) {
  return (
    <section className="p-4">
      <div className="flex">
        <div className="flex w-40 flex-col gap-2">
          {Object.values(defaultDateRanges).map((range) => (
            <Button
              key={range.label}
              variant="outline"
              onClick={() => {
                onChange?.({
                  fromDate: range.from.toISOString(),
                  toDate: range.to.toISOString(),
                });
              }}>
              {range.label}
            </Button>
          ))}
        </div>
        <Calendar
          numberOfMonths={2}
          mode="range"
          toDate={new Date()}
          selected={{
            // TODO: handle dates
            from: new Date(selected.fromDate),
            to: new Date(selected.toDate),
          }}
          onSelect={(range) => {
            onChange?.({
              fromDate: range?.from?.toISOString(),
              toDate: range?.to?.toISOString() ?? range?.from?.toISOString(),
            });
          }}
        />
      </div>
    </section>
  );
}
