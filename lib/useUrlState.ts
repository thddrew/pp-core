"use client";

import { useState } from "react";

export const useUrlState = (defaultState: Record<string, string> = {}) => {
  const [urlState, setUrlState] = useState(defaultState);

  if (typeof window === "undefined") return [urlState, () => {}] as const;

  const params = new URLSearchParams(window.location.search);
  const mergedState = {
    ...defaultState,
    ...Object.fromEntries(params.entries()),
  };

  const setParams: typeof setUrlState = (nextState) => {
    const updatedState = { ...urlState, ...nextState };
    setUrlState(updatedState);
    const newParams = new URLSearchParams(updatedState);
    window.history.pushState({}, "", `${window.location.pathname}?${newParams}`);
  };

  return [mergedState, setParams] as const;
};
