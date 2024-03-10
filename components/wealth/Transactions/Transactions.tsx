import { InitialSearchParams } from "@/lib/getInitialSearchParams";
import { getAccountsByUserId } from "@/lib/prisma/queries/accounts";
import { getInstitutionsByUserId } from "@/lib/prisma/queries/institutions";
import { getTransactionsByUserId } from "@/lib/prisma/queries/transactions";
import { getCurrentUser } from "@/lib/prisma/queries/users";

import { TransactionsFilter } from "./TransactionsFilter";
import { TransactionsTable } from "./TransactionsTable";

export const Transactions = async ({ searchParams }: { searchParams: InitialSearchParams }) => {
  const user = await getCurrentUser();

  if (!user) {
    return <div className="text-gray-400">User not found</div>;
  }

  const transactions = await getTransactionsByUserId(user.id);
  const allAccounts = await getAccountsByUserId(user.id);
  const institutions = await getInstitutionsByUserId(user.id);

  return (
    <>
      <TransactionsFilter
        userId={user.id}
        searchParams={searchParams}
        accounts={allAccounts}
        institutions={institutions}
        transactions={transactions}
      />
      <div className="h-8" />
      <TransactionsTable searchParams={searchParams} userId={user.id} transactions={transactions} />
    </>
  );
};
