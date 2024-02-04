// Prefetch the link token
import { getLinkToken } from "@/lib/plaid/link-token";
import { PLAID_LINK_TOKEN_KEY } from "@/lib/plaid/utils";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";

import { OpenLinkButton } from "./OpenLinkButton";

export const LinkTokenPrefetch = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: [PLAID_LINK_TOKEN_KEY],
    queryFn: getLinkToken,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <OpenLinkButton />
    </HydrationBoundary>
  );
};
