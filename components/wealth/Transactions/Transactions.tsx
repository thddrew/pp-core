import { getAllTransactionsForUser, getTransactions } from "@/lib/plaid/transactions";
import { PLAID_TRANSACTIONS_KEY } from "@/lib/plaid/utils";
import { SearchParams } from "@/lib/types/SearchParams";
import { getCurrentUser } from "@/prisma/queries/users";
import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query";
import { Loader2Icon } from "lucide-react";
import { Suspense } from "react";

import { TransactionsFilter } from "./TransactionsFilter";
import { TransactionsTable } from "./TransactionsTable";

const Transactions = async ({ searchParams }: { searchParams?: SearchParams }) => {
  const queryClient = new QueryClient();
  const user = await getCurrentUser();

  if (!user) {
    return <div className="text-gray-400">User not found</div>;
  }

  await queryClient.prefetchQuery({
    queryKey: [PLAID_TRANSACTIONS_KEY, user.plaidAccountId, searchParams?.fromDate, searchParams?.toDate],
    queryFn: async () => getAllTransactionsForUser(user.id, searchParams?.fromDate, searchParams?.toDate),
    staleTime: 1000 * 60 * 15, // 15 minutes
  });

  return (
    <section className="flex flex-col">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <TransactionsTable userId={user.id} />
      </HydrationBoundary>
    </section>
  );
};

type TransactionsWrapperProps = {
  header?: string;
  searchParams?: SearchParams;
};

export const TransactionsWrapper = async ({
  header = "Transactions",
  searchParams,
}: TransactionsWrapperProps) => {
  return (
    <div>
      <h2 className="text-xl font-bold">{header}</h2>
      <div className="h-8" />
      <TransactionsFilter searchParams={searchParams} />
      <div className="h-8" />
      <Suspense fallback={<Loader2Icon className="animate-spin" />}>
        <Transactions searchParams={searchParams} />
      </Suspense>
    </div>
  );
};
