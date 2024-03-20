"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

import { SearchParams } from "./types/SearchParams";

// TODO: do i need this??
export const useUrlState = (searchParams: SearchParams, initialState: Partial<SearchParams> = {}) => {
  const pathname = usePathname();
  const router = useRouter();

  const [urlState, setUrlState] = useState<SearchParams>({
    ...searchParams,
    ...initialState,
  });

  const setUpdatedState = (nextState: Partial<SearchParams>) => {
    // TODO: fix this TS issue
    // @ts-ignore
    const newParams = new URLSearchParams({
      ...urlState,
      ...nextState,
    });
    setUrlState({ ...urlState, ...nextState }); // optimistic update
    router.replace(`${pathname}?${newParams}`);
  };

  return [urlState, setUpdatedState] as const;
};
