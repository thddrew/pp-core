"use client";

import { isValid } from "date-fns";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";

import { defaultTodayRange } from "./defaultDateRanges";
import { getInitialSearchParams } from "./getInitialSearchParams";
import { PushStateURL, usePushStateListener } from "./usePushStateListener";

export const useUrlState = (defaultState: Record<string, string> = {}) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [urlState, setUrlState] = useState(
    getInitialSearchParams(defaultState, Object.fromEntries(searchParams.entries()))
  );

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
    history.pushState({}, "", `${pathname}?${newParams}`);
    setUrlState({ ...urlState, ...nextState });
  };

  if (typeof window === "undefined") return [defaultState, () => {}] as const;

  return [urlState, setUpdatedState] as const;
};
