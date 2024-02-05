import { getTransactions } from "@/lib/plaid/transactions";
import { PLAID_TRANSACTIONS_KEY } from "@/lib/plaid/utils";
import { getCurrentUser } from "@/prisma/queries/users";
import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query";

import { TransactionsTable } from "./TransactionsTable";

export const Transactions = async () => {
  try {
    const queryClient = new QueryClient();
    const user = await getCurrentUser();

    if (!user) {
      return <div>User not found</div>;
    }

    if (!user.plaidAccountId) {
      return <div>No account linked</div>;
    }

    await queryClient.prefetchQuery({
      queryKey: [PLAID_TRANSACTIONS_KEY, user.plaidAccountId],
      queryFn: async () => getTransactions(user.plaidAccountId as number),
    });

    return (
      <div>
        <h2 className="text-xl font-bold">Transactions</h2>
        <div className="h-8" />
        <section className="flex flex-col gap-3">
          <HydrationBoundary state={dehydrate(queryClient)}>
            <TransactionsTable plaidAccountId={user.plaidAccountId} />
          </HydrationBoundary>
        </section>
      </div>
    );
  } catch (err) {
    return <div>Error: {err.message}</div>;
  }
};
