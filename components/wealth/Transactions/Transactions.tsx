import { getInitialSearchParams } from "@/lib/getInitialSearchParams";
import { getInstitutionDetails } from "@/lib/plaid/institutions";
import { getAllTransactionsForUser } from "@/lib/plaid/transactions";
import { PLAID_TRANSACTIONS_KEY } from "@/lib/plaid/utils";
import { getCurrentUser } from "@/prisma/queries/users";
import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query";
import { Loader2Icon } from "lucide-react";
import { CountryCode, Institution, TransactionsGetResponse } from "plaid";
import { Suspense } from "react";

import { TransactionsFilter } from "./TransactionsFilter";
import { TransactionsTable } from "./TransactionsTable";

const Transactions = async ({ searchParams }: { searchParams?: Record<string, string> }) => {
  const queryClient = new QueryClient();
  const user = await getCurrentUser();

  if (!user) {
    return <div className="text-gray-400">User not found</div>;
  }

  const initialSearchParams = getInitialSearchParams(searchParams);

  const allTransactions = await getAllTransactionsForUser(
    user.id,
    initialSearchParams?.fromDate,
    initialSearchParams?.toDate
  );

  let filteredTransactions = allTransactions;
  // TODO: make filters reusable and composable?
  if (!initialSearchParams?.institutions?.includes("all")) {
    filteredTransactions = allTransactions.filter(
      (transaction) =>
        initialSearchParams.institutions?.includes(transaction.item.institution_id ?? "") ?? false
    );
  }

  const allAccounts = filteredTransactions.flatMap((transaction) => transaction.accounts);

  const institutions = (
    await Promise.all(
      allTransactions.map(
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
        accounts={allAccounts}
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
  searchParams?: Record<string, string>;
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
