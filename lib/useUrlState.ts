"use client";

import { isValid } from "date-fns";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";

import { defaultTodayRange } from "./defaultDateRanges";
import { getInitialSearchParams } from "./getInitialSearchParams";
import { SearchParams } from "./types/SearchParams";
import { PushStateURL, usePushStateListener } from "./usePushStateListener";

export const useUrlState = (searchParams?: SearchParams, initialState: Record<string, string> = {}) => {
  const pathname = usePathname();
  const router = useRouter();
  // const searchParams = useSearchParams();
  const [urlState, setUrlState] = useState(getInitialSearchParams(initialState, searchParams));

  // const urlState = useMemo(
  //   () => getInitialSearchParams(defaultState, Object.fromEntries(searchParams.entries())),
  //   [searchParams, defaultState]
  // );

  // const pushStateCallback = useCallback((url: PushStateURL) => {
  //   const newParams = new URLSearchParams(String(url).split("?")[1]);
  //   setUrlState(Object.fromEntries(newParams.entries()));
  // }, []);

  // usePushStateListener(pushStateCallback);

  const setUpdatedState = (nextState: Record<string, string>) => {
    const newParams = new URLSearchParams({
      ...urlState,
      ...nextState,
    });
    // history.pushState({}, "", `${pathname}?${newParams}`);
    setUrlState({ ...urlState, ...nextState }); // optimistic update
    router.push(`${pathname}?${newParams}`);
  };

  if (typeof window === "undefined") return [initialState, () => {}] as const;

  return [urlState, setUpdatedState] as const;
};
