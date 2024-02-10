import { useEffect } from "react";

export type PushStateURL = Parameters<typeof history.pushState>[2];

export const usePushStateListener = (callback: (url: PushStateURL) => void) => {
  useEffect(() => {
    // make a copy of original function to avoid complications
    const originalPushState = history.pushState;

    history.pushState = (data, title, url) => {
      originalPushState.apply(history, [data, title, url]);
      callback(url);
    };

    return () => {
      history.pushState = originalPushState; // restore the copy
    };
  }, [callback]);
};
