import { getInstitutionDetails } from "@/lib/plaid/institutions";
import { getAllTransactionsForUser } from "@/lib/plaid/transactions";
import { PLAID_TRANSACTIONS_KEY } from "@/lib/plaid/utils";
import { SearchParams } from "@/lib/types/SearchParams";
import { getCurrentUser } from "@/prisma/queries/users";
import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query";
import { Loader2Icon } from "lucide-react";
import { CountryCode, Institution, TransactionsGetResponse } from "plaid";
import { Suspense } from "react";

import { TransactionsFilter } from "./TransactionsFilter";
import { TransactionsTable } from "./TransactionsTable";

const Transactions = async ({ searchParams }: { searchParams?: SearchParams }) => {
  const queryClient = new QueryClient();
  const user = await getCurrentUser();

  if (!user) {
    return <div className="text-gray-400">User not found</div>;
  }

  const allTransactions = await getAllTransactionsForUser(
    user.id,
    searchParams?.fromDate,
    searchParams?.toDate
  );

  let filteredTransactions = allTransactions;
  // TODO: make filters reusable and composable?
  if (searchParams?.institution !== "all") {
    filteredTransactions = allTransactions.filter(
      (transaction) => transaction.item.institution_id === searchParams?.institution
    );
  }

  const institutions = (
    await Promise.all(
      filteredTransactions.map(
        ({ item }) =>
          item.institution_id ? getInstitutionDetails(item.institution_id, [CountryCode.Ca]) : null // TODO: handle multiple countries
      )
    )
  ).filter(Boolean) as Institution[]; // TODO: why does TS not now this cannot be null?

  queryClient.setQueryData(
    [PLAID_TRANSACTIONS_KEY, user.id, searchParams?.fromDate, searchParams?.toDate],
    allTransactions
  );

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <TransactionsFilter
        userId={user.id}
        searchParams={searchParams}
        institutions={institutions}
        transactions={filteredTransactions}
      />
      <div className="h-8" />
      <TransactionsTable userId={user.id} transactions={filteredTransactions} />
    </HydrationBoundary>
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
    <>
      <h2 className="text-xl font-bold">{header}</h2>
      <div className="h-8" />
      <Suspense fallback={<Loader2Icon className="animate-spin" />}>
        <Transactions searchParams={searchParams} />
      </Suspense>
    </>
  );
};
