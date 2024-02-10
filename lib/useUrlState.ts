"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

import { PushStateURL, usePushStateListener } from "./usePushStateListener";

export const useUrlState = (defaultState: Record<string, string> = {}) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [urlState, setUrlState] = useState({
    ...defaultState,
    ...Object.fromEntries(searchParams.entries()),
  });
  const callback = useCallback((url: PushStateURL) => {
    const newParams = new URLSearchParams(String(url).split("?")[1]);
    setUrlState(Object.fromEntries(newParams.entries()));
  }, []);

  usePushStateListener(callback);

  if (typeof window === "undefined") return [defaultState, () => {}] as const;

  const setParams = (nextState: Record<string, string>) => {
    const updatedState = { ...urlState, ...nextState };
    const newParams = new URLSearchParams(updatedState);
    history.pushState({}, "", `${pathname}?${newParams}`);
  };

  return [urlState, setParams] as const;
};
