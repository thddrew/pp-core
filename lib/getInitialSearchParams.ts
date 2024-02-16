import { isValid } from "date-fns";

import { defaultDateRanges } from "./defaultDateRanges";

export const getInitialSearchParams = (
  initialState: Record<string, string> = {},
  searchParams: Record<string, string> = {}
) => {
  const urlState = {
    search: "",
    fromDate: defaultDateRanges.last30Days.from.toISOString(),
    toDate: defaultDateRanges.last30Days.to.toISOString(),
    institution: "all",
    account: "all",
    ...initialState,
    ...searchParams,
  };

  if (!isValid(new Date(urlState.fromDate)) || !isValid(new Date(urlState.toDate))) {
    urlState.fromDate = defaultDateRanges.last30Days.from.toISOString();
    urlState.toDate = defaultDateRanges.last30Days.to.toISOString();
  }

  return urlState;
};
