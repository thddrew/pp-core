import { getLiabilities } from "@/lib/plaid/liabilities";
import { PLAID_LIABILITIES_KEY } from "@/lib/plaid/utils";
import { getPlaidAccountById } from "@/prisma/queries/plaidAccount";
import { getCurrentUser } from "@/prisma/queries/users";
import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query";

import { LiabilitiesTable } from "./LiabilitiesTable";

export const Liabilities = async () => {
  const user = await getCurrentUser();
  const client = new QueryClient();

  if (!user) {
    return <div>User not found</div>;
  }

  if (!user.plaidAccountId) {
    return <div>No account linked</div>;
  }

  await client.prefetchQuery({
    queryKey: [PLAID_LIABILITIES_KEY, user.plaidAccountId],
    queryFn: async () => getLiabilities(user.plaidAccountId as number),
    staleTime: 1000 * 60 * 15, // 15 minutes
  });

  return (
    <div>
      <h2 className="text-xl font-bold">Liabilities</h2>
      <div className="h-8" />
      <section className="flex flex-col gap-3">
        <HydrationBoundary state={dehydrate(client)}>
          <LiabilitiesTable plaidAccountId={user.plaidAccountId} />
        </HydrationBoundary>
      </section>
    </div>
  );
};
