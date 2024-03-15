"use client";

import { useEffect, useState } from "react";

export const useMatchMedia = (mediaQuery: string) => {
  const [matchQueryList, setMatchQueryList] = useState<MediaQueryList | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined" && !matchQueryList) {
      const res = window.matchMedia(mediaQuery);

      setMatchQueryList(res);

      // res.addEventListener("change", (e) => {
      //   // @ts-expect-error
      //   setMatchQueryList(e);
      // });
    }

    return () => {
      // if (matchQueryList) {
      //   matchQueryList.removeEventListener("change", (e) => {
      //     // @ts-expect-error
      //     setMatchQueryList(e);
      //   });
      // }
    };
  }, [matchQueryList, mediaQuery]);

  return { matches: matchQueryList?.matches };
};
