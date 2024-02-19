"use client";

import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

import { InitialSearchParams, getInitialSearchParams } from "./getInitialSearchParams";
import { SearchParams } from "./types/SearchParams";

export const useUrlState = (
  searchParams: InitialSearchParams = getInitialSearchParams(),
  initialState: SearchParams = {}
) => {
  const pathname = usePathname();
  const router = useRouter();
  const [urlState, setUrlState] = useState({
    ...initialState,
    ...searchParams,
  });

  const setUpdatedState = (nextState: Partial<InitialSearchParams>) => {
    // TODO: fix this TS issue
    // @ts-ignore
    const newParams = new URLSearchParams({
      ...urlState,
      ...nextState,
    });
    setUrlState({ ...urlState, ...nextState }); // optimistic update
    router.push(`${pathname}?${newParams}`);
  };

  return [urlState, setUpdatedState] as const;
};
