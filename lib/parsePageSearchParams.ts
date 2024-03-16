import { isValid } from "date-fns";

import { defaultDateRanges } from "./defaultDateRanges";
import { SearchParams } from "./types/SearchParams";

const defaultState = {
  search: [],
  fromDate: defaultDateRanges.last60Days.from.toISOString(),
  toDate: defaultDateRanges.last60Days.to.toISOString(),
  institutions: ["all"],
  account: ["all"],
  accountType: ["all"],
};

// Used in page level to set default search params and parse into array of options
export const parsePageSearchParams = (
  searchParams: Record<string, string> = {},
  initialState: Partial<SearchParams> = {}
) => {
  const urlState = {
    ...defaultState,
    ...initialState,
    ...searchParams,
  };

  const listKeys = ["search", "institutions", "account", "accountType"] as const;

  for (const key of listKeys) {
    if (!searchParams[key]) {
      urlState[key] = defaultState[key];
    } else if (typeof searchParams[key] === "string") {
      urlState[key] = searchParams[key].split(",");
    }
  }

  if (!isValid(new Date(urlState.fromDate)) || !isValid(new Date(urlState.toDate))) {
    urlState.fromDate = defaultDateRanges.last30Days.from.toISOString();
    urlState.toDate = defaultDateRanges.last30Days.to.toISOString();
  }

  return urlState;
};
