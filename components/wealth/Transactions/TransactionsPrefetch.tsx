import { getTransactions } from "@/lib/plaid/transactions";
import { PLAID_TRANSACTIONS_KEY } from "@/lib/plaid/utils";
import { getCurrentUser } from "@/prisma/queries/users";
import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query";

import { Transactions } from "./Transactions";
import { TransactionsTable } from "./TransactionsTable";

type TransactionsProps = {
  header?: string;
};

export const TransactionsPrefetch = async ({ header = "Transactions" }: TransactionsProps) => {
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
    staleTime: 1000 * 60 * 15, // 15 minutes
  });

  return (
    <div>
      <h2 className="text-xl font-bold">{header}</h2>
      <div className="h-8" />
      <section className="flex flex-col">
        <HydrationBoundary state={dehydrate(queryClient)}>
          <Transactions plaidAccountId={user.plaidAccountId} />
        </HydrationBoundary>
      </section>
    </div>
  );
};