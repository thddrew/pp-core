import { getLinkedAccountsForUser } from "@/lib/plaid/accounts";
import { PLAID_ACCOUNTS_KEY } from "@/lib/plaid/utils";
import { auth } from "@clerk/nextjs";
import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query";

import { AccountsSummary } from "./AccountsSummary";

export const Accounts = async () => {
  const client = new QueryClient();
  const { userId } = auth();

  if (!userId) {
    return <div>User not found</div>;
  }

  await client.prefetchQuery({
    queryKey: [PLAID_ACCOUNTS_KEY, userId],
    queryFn: getLinkedAccountsForUser,
    staleTime: 1000 * 60 * 10,
  });

  return (
    <HydrationBoundary state={dehydrate(client)}>
      <AccountsSummary userId={userId} />
    </HydrationBoundary>
  );
};
