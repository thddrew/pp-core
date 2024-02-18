"use client";

import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

import { getInitialSearchParams } from "./getInitialSearchParams";
import { SearchParams } from "./types/SearchParams";

export const useUrlState = (searchParams: Record<string, string> = {}, initialState: SearchParams = {}) => {
  const pathname = usePathname();
  const router = useRouter();
  const [urlState, setUrlState] = useState(getInitialSearchParams(searchParams, initialState));

  const setUpdatedState = (nextState: Record<string, string | string[]>) => {
    const newParams = new URLSearchParams({
      ...urlState,
      ...nextState,
    });
    setUrlState({ ...urlState, ...nextState }); // optimistic update
    router.push(`${pathname}?${newParams}`);
  };

  return [urlState, setUpdatedState] as const;
};
