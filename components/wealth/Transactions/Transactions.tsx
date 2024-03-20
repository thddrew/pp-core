import { getAccountsByUserId } from "@/lib/prisma/queries/accounts";
import { getInstitutionsByUserId } from "@/lib/prisma/queries/institutions";
import { getTransactionsByUserId } from "@/lib/prisma/queries/transactions";
import { getCurrentUser } from "@/lib/prisma/queries/users";
import { SearchParams } from "@/lib/types/SearchParams";
import { Transaction, User } from "@/lib/types/prisma";
import { Account } from "@prisma/client";
import { isWithinInterval } from "date-fns";
import { Loader2Icon } from "lucide-react";
import { Suspense } from "react";

import { TransactionsFilter } from "./TransactionsFilter";
import { TransactionsTable } from "./TransactionsTable";

type MappedAccountIds = Record<string, Account>;

const filterByDateRange = (
  transaction: Transaction,
  range: {
    fromDate?: string;
    toDate?: string;
  }
) => {
  if (range.fromDate && range.toDate) {
    return isWithinInterval(new Date(transaction.date), {
      start: new Date(range.fromDate),
      end: new Date(range.toDate),
    });
  }

  // Default to true if range not provided
  return true;
};

const filterByAccountType = (
  transaction: Transaction,
  mappedAccountIds: MappedAccountIds,
  accountTypes?: string[]
) => {
  if (!accountTypes) return true;
  // heuristic way to avoid using .includes()
  if (accountTypes.length === 1 && accountTypes[0] === "all") return true;

  const { subtype } = mappedAccountIds[transaction.account_id];

  return subtype ? accountTypes.includes(subtype) : false;
};

const filterByInstitutionId = (
  transaction: Transaction,
  mappedAccountsIds: MappedAccountIds,
  institutionsIds?: string[]
) => {
  if (!institutionsIds) return true;

  if (institutionsIds.length === 1 && institutionsIds[0] === "all") return true;

  const { institution_id } = mappedAccountsIds[transaction.account_id];

  return institution_id ? institutionsIds.includes(institution_id) : false;
};

const filterBySearchTerms = (transaction: Transaction, searchTerms?: string[]) => {
  if (!searchTerms || !searchTerms.length) return true;

  // Maybe consider fuzzy searching
  const includesMatch = searchTerms.some((term) => transaction.name.toLowerCase().includes(term));

  return includesMatch;
};

export const TransactionsTableWrapper = async ({
  searchParams,
  user,
}: {
  searchParams: SearchParams;
  user: User;
}) => {
  const transactions = await getTransactionsByUserId(user.id);
  const allAccounts = await getAccountsByUserId(user.id);

  const mappedAccountIds = allAccounts.reduce<MappedAccountIds>((acc, account) => {
    if (account.account_id) {
      acc[account.account_id] = account;
      return acc;
    }

    return acc;
  }, {});

  const filteredTransactions = transactions
    .flatMap((transaction) => {
      if (transaction.deletedAt) return [];

      const withinDateRange = filterByDateRange(transaction, {
        fromDate: searchParams.fromDate,
        toDate: searchParams.toDate,
      });

      const matchesAccountType = filterByAccountType(transaction, mappedAccountIds, searchParams.accountType);

      const matchesInstitutionId = filterByInstitutionId(
        transaction,
        mappedAccountIds,
        searchParams.institutions
      );

      const matchesSearchTerms = filterBySearchTerms(transaction, searchParams.search);

      if (withinDateRange && matchesAccountType && matchesInstitutionId && matchesSearchTerms)
        return [transaction];
      return [];
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <TransactionsTable
      searchParams={searchParams}
      userId={user.id}
      transactions={filteredTransactions}
      mappedAccountIds={mappedAccountIds}
    />
  );
};

export const TransactionsWrapper = async ({ searchParams }: { searchParams: SearchParams }) => {
  const user = await getCurrentUser();

  if (!user) {
    return <div className="text-gray-400">User not found</div>;
  }

  const allAccounts = await getAccountsByUserId(user.id);
  const institutions = await getInstitutionsByUserId(user.id);

  return (
    <>
      <TransactionsFilter searchParams={searchParams} accounts={allAccounts} institutions={institutions} />
      <div className="h-8" />
      <Suspense fallback={<Loader2Icon className="animate-spin" />}>
        <TransactionsTableWrapper searchParams={searchParams} user={user} />
      </Suspense>
    </>
  );
};
