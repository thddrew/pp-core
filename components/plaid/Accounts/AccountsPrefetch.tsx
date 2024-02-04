import { getLinkedAccountsForUser } from "@/lib/plaid/accounts";
import { PLAID_ACCOUNTS_KEY } from "@/lib/plaid/utils";
import { auth } from "@clerk/nextjs";
import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query";

import { Accounts } from "./Accounts";

export const AccountsPrefetch = async () => {
  const client = new QueryClient();
  const { userId } = auth();

  await client.prefetchQuery({
    queryKey: [PLAID_ACCOUNTS_KEY, userId],
    queryFn: getLinkedAccountsForUser,
  });

  return (
    <HydrationBoundary state={dehydrate(client)}>
      <Accounts />
    </HydrationBoundary>
  );
};
