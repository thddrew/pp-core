import {
  endOfDay,
  endOfMonth,
  endOfWeek,
  endOfYear,
  startOfDay,
  startOfMonth,
  startOfWeek,
  startOfYear,
  subDays,
  subMonths,
  subWeeks,
  subYears,
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
  last30Days: {
    label: "Last 30 Days",
    from: startOfDay(subDays(new Date(), 30)),
    to: endOfDay(new Date()),
  },
  last60Days: {
    label: "Last 60 Days",
    from: startOfDay(subDays(new Date(), 60)),
    to: endOfDay(new Date()),
  },
  thisYear: {
    label: "This Year",
    from: startOfYear(new Date()),
    to: endOfDay(new Date()),
  },
  lastYear: {
    label: "Last Year",
    from: startOfYear(subYears(new Date(), 1)),
    to: endOfYear(subYears(new Date(), 1)),
  },
};

export const defaultTodayRange = {
  fromDate: defaultDateRanges.today.from.toISOString(),
  toDate: defaultDateRanges.today.to.toISOString(),
};
