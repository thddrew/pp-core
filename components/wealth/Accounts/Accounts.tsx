import { getAccountsByClerkId } from "@/lib/plaid/accounts";
import { PLAID_ACCOUNTS_KEY } from "@/lib/plaid/utils";
import { getCurrentUser } from "@/prisma/queries/users";
import { auth } from "@clerk/nextjs";
import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query";

import { AccountsSummary } from "./AccountsSummary";

export const Accounts = async () => {
  const user = await getCurrentUser();
  const client = new QueryClient();

  if (!user || !user.clerkId) {
    return <div>User not found</div>;
  }

  await client.prefetchQuery({
    queryKey: [PLAID_ACCOUNTS_KEY, user.clerkId],
    queryFn: async () => getAccountsByClerkId(user.clerkId),
    staleTime: 1000 * 60 * 15, // 15 minutes
  });

  return (
    <HydrationBoundary state={dehydrate(client)}>
      <AccountsSummary userId={user.clerkId} />
    </HydrationBoundary>
  );
};
