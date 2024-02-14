import { isValid } from "date-fns";

import { defaultTodayRange } from "./defaultDateRanges";

export const getInitialSearchParams = (
  searchParams: Record<string, string> = {},
  defaultState: Record<string, string> = {
    search: "",
    fromDate: defaultTodayRange.fromDate,
    toDate: defaultTodayRange.toDate,
  }
) => {
  const initialState = {
    ...defaultState,
    ...searchParams,
  };

  if (!isValid(new Date(initialState.fromDate)) || !isValid(new Date(initialState.toDate))) {
    initialState.fromDate = defaultTodayRange.fromDate;
    initialState.toDate = defaultTodayRange.toDate;
  }

  return initialState;
};
