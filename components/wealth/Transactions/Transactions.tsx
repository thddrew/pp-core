import { getTransactions } from "@/lib/plaid/transactions";
import { PLAID_TRANSACTIONS_KEY } from "@/lib/plaid/utils";
import { getCurrentUser } from "@/prisma/queries/users";
import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query";
import { Loader2Icon } from "lucide-react";
import { Suspense } from "react";

import { TransactionsFilter } from "./TransactionsFilter";
import { TransactionsTable } from "./TransactionsTable";

const Transactions = async () => {
  const queryClient = new QueryClient();
  const user = await getCurrentUser();

  if (!user) {
    return <div className="text-gray-400">User not found</div>;
  }

  if (!user.plaidAccountId) {
    return <div className="text-gray-400">No account linked</div>;
  }

  await queryClient.prefetchQuery({
    queryKey: [PLAID_TRANSACTIONS_KEY, user.plaidAccountId],
    queryFn: async () => getTransactions(user.plaidAccountId as number),
    staleTime: 1000 * 60 * 15, // 15 minutes
  });

  return (
    <section className="flex flex-col">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <TransactionsFilter />
        <div className="h-8" />
        <TransactionsTable plaidAccountId={user.plaidAccountId} />
      </HydrationBoundary>
    </section>
  );
};

type TransactionsWrapperProps = {
  header?: string;
};

export const TransactionsWrapper = async ({ header = "Transactions" }: TransactionsWrapperProps) => {
  return (
    <div>
      <h2 className="text-xl font-bold">{header}</h2>
      <div className="h-8" />
      <Suspense fallback={<Loader2Icon className="animate-spin" />}>
        <Transactions />
      </Suspense>
    </div>
  );
};
