import { InitialSearchParams } from "@/lib/getInitialSearchParams";
import { syncTransactionsForUser } from "@/lib/plaid/transactions";
import { getAccountsByUserId } from "@/prisma/queries/accounts";
import { getInstitutionsByUserId } from "@/prisma/queries/institutions";
import { getTransactionsByUserId } from "@/prisma/queries/transactions";
import { getCurrentUser } from "@/prisma/queries/users";

import { TransactionsFilter } from "./TransactionsFilter";

export const Transactions = async ({ searchParams }: { searchParams: InitialSearchParams }) => {
  const user = await getCurrentUser();

  if (!user) {
    return <div className="text-gray-400">User not found</div>;
  }

  const transactions = await getTransactionsByUserId(user.id);
  const allAccounts = await getAccountsByUserId(user.id);
  const institutions = await getInstitutionsByUserId(user.id);

  // const syncedTransactions = await syncTransactionsForUser(user.id);

  return (
    <>
      <TransactionsFilter
        userId={user.id}
        searchParams={searchParams}
        accounts={allAccounts}
        institutions={institutions}
        transactions={filteredTransactions}
      />
      <div className="h-8" />
      <TransactionsTable searchParams={searchParams} userId={user.id} transactions={filteredTransactions} />
    </>
  );
};
