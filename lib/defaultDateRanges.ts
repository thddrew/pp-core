import {
  endOfDay,
  endOfMonth,
  endOfWeek,
  startOfDay,
  startOfMonth,
  startOfWeek,
  subMonths,
  subWeeks,
} from "date-fns";

export const defaultDateRanges = {
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

export const defaultTodayRange = {
  fromDate: defaultDateRanges.today.from.toISOString(),
  toDate: defaultDateRanges.today.to.toISOString(),
};
