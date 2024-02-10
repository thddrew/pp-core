"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { useUrlState } from "@/lib/useUrlState";
import {
  endOfDay,
  endOfMonth,
  endOfWeek,
  format,
  startOfDay,
  startOfMonth,
  startOfWeek,
  subMonths,
  subWeeks,
} from "date-fns";

const defaultRanges = {
  today: {
    label: "Today",
    from: startOfDay(new Date()),
    to: endOfDay(new Date()),
  },
  thisWeek: {
    label: "This Week",
    from: startOfWeek(new Date()),
    to: endOfWeek(new Date()),
  },
  lastWeek: {
    label: "Last Week",
    from: startOfWeek(subWeeks(new Date(), 1)),
    to: endOfWeek(subWeeks(new Date(), 1)),
  },
  thisMonth: {
    label: "This Month",
    from: startOfMonth(new Date()),
    to: endOfMonth(new Date()),
  },
  lastMonth: {
    label: "Last Month",
    from: startOfMonth(subMonths(new Date(), 1)),
    to: endOfMonth(subMonths(new Date(), 1)),
  },
};

export function DateRangePicker() {
  const [urlState, setUrlState] = useUrlState({
    fromDate: defaultRanges.today.from.toISOString(),
    toDate: defaultRanges.today.to.toISOString(),
  });

  console.log(urlState);

  return (
    <section className="p-4">
      <div className="flex">
        <div className="flex flex-col">
          {Object.values(defaultRanges).map((range) => (
            <Button
              key={range.label}
              variant="outline"
              onClick={() => {
                setUrlState({
                  fromDate: range.from.toISOString(),
                  toDate: range.to.toISOString(),
                });
              }}>
              {range.label}
            </Button>
          ))}
        </div>
        <Calendar
          mode="range"
          selected={{
            from: new Date(urlState.fromDate),
            to: new Date(urlState.toDate),
          }}
          numberOfMonths={2}
        />
      </div>
    </section>
  );
}
