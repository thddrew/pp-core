"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

import { InitialSearchParams, getInitialSearchParams } from "./getInitialSearchParams";
import { SearchParams } from "./types/SearchParams";

export const useUrlState = (searchParams?: InitialSearchParams, initialState: SearchParams = {}) => {
  const pathname = usePathname();
  const router = useRouter();
  const defaultSearchParams = useSearchParams();

  const [urlState, setUrlState] = useState(
    getInitialSearchParams(
      {
        ...Object.fromEntries(defaultSearchParams),
        ...searchParams,
      },
      initialState
    )
  );

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
