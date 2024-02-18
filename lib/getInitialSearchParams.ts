import { isValid } from "date-fns";

import { defaultDateRanges } from "./defaultDateRanges";
import { SearchParams } from "./types/SearchParams";

export const getInitialSearchParams = (
  searchParams: Record<string, string> = {},
  initialState: SearchParams = {}
) => {
  const urlState = {
    search: "",
    fromDate: defaultDateRanges.last30Days.from.toISOString(),
    toDate: defaultDateRanges.last30Days.to.toISOString(),
    institutions: ["all"],
    account: "all",
    accountType: "all",
    ...initialState,
    ...searchParams,
  };

  if (typeof searchParams.institutions === "string" && searchParams.institutions) {
    urlState.institutions = searchParams.institutions.split(",");
  }

  if (!isValid(new Date(urlState.fromDate)) || !isValid(new Date(urlState.toDate))) {
    urlState.fromDate = defaultDateRanges.last30Days.from.toISOString();
    urlState.toDate = defaultDateRanges.last30Days.to.toISOString();
  }

  return urlState;
};
