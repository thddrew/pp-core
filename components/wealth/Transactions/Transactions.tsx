import { InitialSearchParams } from "@/lib/getInitialSearchParams";
import { getInstitutionDetails } from "@/lib/plaid/institutions";
import { getAllTransactionsForUser } from "@/lib/plaid/transactions";
import { PLAID_TRANSACTIONS_KEY } from "@/lib/plaid/utils";
import { getCurrentUser } from "@/prisma/queries/users";
import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query";
import { CountryCode, Institution } from "plaid";

import { TransactionsFilter } from "./TransactionsFilter";
import { TransactionsTable } from "./TransactionsTable";

export const Transactions = async ({ searchParams }: { searchParams: InitialSearchParams }) => {
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
  // TODO: apply other filters
  filteredTransactions = allTransactions.filter((transaction) => {
    const matchesInstitution =
      searchParams?.institutions?.includes(transaction.item.institution_id ?? "") ?? false;

    return matchesInstitution;
  });

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
      <TransactionsTable searchParams={searchParams} userId={user.id} transactions={filteredTransactions} />
    </HydrationBoundary>
  );
};
