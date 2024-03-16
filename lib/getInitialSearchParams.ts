import { isValid } from "date-fns";

import { defaultDateRanges } from "./defaultDateRanges";
import { SearchParams } from "./types/SearchParams";

// Used in page level to set default search params and parse into array of options
export const parsePageSearchParams = (
  searchParams: Record<string, string> = {},
  initialState: Partial<SearchParams> = {}
) => {
  const urlState = {
    search: "",
    fromDate: defaultDateRanges.last60Days.from.toISOString(),
    toDate: defaultDateRanges.last60Days.to.toISOString(),
    institutions: ["all"],
    account: ["all"],
    accountType: ["all"],
    ...initialState,
    ...searchParams,
  };

  // TODO: FIX
  if (typeof searchParams.institutions === "string" && searchParams.institutions) {
    urlState.institutions = searchParams.institutions.split(",");
  }

  if (typeof searchParams.account === "string" && searchParams.account) {
    urlState.account = searchParams.account.split(",");
  }

  if (typeof searchParams.accountType === "string" && searchParams.accountType) {
    urlState.accountType = searchParams.accountType.split(",");
  }

  if (!isValid(new Date(urlState.fromDate)) || !isValid(new Date(urlState.toDate))) {
    urlState.fromDate = defaultDateRanges.last30Days.from.toISOString();
    urlState.toDate = defaultDateRanges.last30Days.to.toISOString();
  }

  return urlState;
};
