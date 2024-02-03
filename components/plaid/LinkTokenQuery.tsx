// Prefetch the link token
import { getLinkToken } from "@/lib/plaid/server-actions";
import { PLAID_LINK_TOKEN_KEY } from "@/lib/plaid/utils";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";

import { PlaidLinkWrapper } from "./OpenLinkButton";

export const LinkTokenQuery = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: [PLAID_LINK_TOKEN_KEY],
    queryFn: getLinkToken,
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PlaidLinkWrapper />
    </HydrationBoundary>
  );
};
