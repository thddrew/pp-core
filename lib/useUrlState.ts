"use client";

import { isValid } from "date-fns";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";

import { defaultTodayRange } from "./defaultDateRanges";
import { PushStateURL, usePushStateListener } from "./usePushStateListener";

export const useUrlState = (defaultState: Record<string, string> = {}) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [urlState, setUrlState] = useState(() => {
    const initialState = {
      ...defaultState,
      ...Object.fromEntries(searchParams.entries()),
    };

    if (!isValid(new Date(initialState.fromDate)) || !isValid(new Date(initialState.toDate))) {
      initialState.fromDate = defaultTodayRange.fromDate;
      initialState.toDate = defaultTodayRange.toDate;
    }

    return initialState;
  });

  const pushStateCallback = useCallback((url: PushStateURL) => {
    const newParams = new URLSearchParams(String(url).split("?")[1]);
    setUrlState(Object.fromEntries(newParams.entries()));
  }, []);

  usePushStateListener(pushStateCallback);

  const setUpdatedState = (nextState: Record<string, string>) => {
    const newParams = new URLSearchParams({
      ...urlState,
      ...nextState,
    });
    history.pushState({}, "", `${pathname}?${newParams}`);
    // setUrlState({ ...urlState, ...nextState });
  };

  if (typeof window === "undefined") return [defaultState, () => {}] as const;

  return [urlState, setUpdatedState] as const;
};
