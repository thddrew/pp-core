import { InitialSearchParams } from "@/lib/getInitialSearchParams";
import { getAccountsByUserId } from "@/lib/prisma/queries/accounts";
import { getInstitutionsByUserId } from "@/lib/prisma/queries/institutions";
import { getTransactionsByUserId } from "@/lib/prisma/queries/transactions";
import { getCurrentUser } from "@/lib/prisma/queries/users";
import { Account } from "@prisma/client";
import { isWithinInterval } from "date-fns";

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

  const mappedAccountIds = allAccounts.reduce<Record<string, Account>>((acc, account) => {
    if (account.account_id) {
      acc[account.account_id] = account;
      return acc;
    }

    return acc;
  }, {});

  const filteredTransactions = transactions
    .flatMap((transaction) => {
      if (transaction.deletedAt) return [];

      // Filter by date range
      if (searchParams.fromDate && searchParams.toDate) {
        if (
          isWithinInterval(new Date(transaction.date), {
            start: new Date(searchParams.fromDate),
            end: new Date(searchParams.toDate),
          })
        ) {
          return [transaction];
        }
      }

      // Filter by account type ex. TFSA, Chequing, etc
      // const transactionAccountType = mappedAccountIdsToSubType[transaction.account_id];

      // if (searchParams.accountType.includes(transactionAccountType)) {
      //   return [transaction];
      // }

      return [];
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

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
      <TransactionsTable
        searchParams={searchParams}
        userId={user.id}
        transactions={filteredTransactions}
        mappedAccountIds={mappedAccountIds}
      />
    </>
  );
};
