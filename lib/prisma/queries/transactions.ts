import type { TransactionsSyncResponse } from "plaid";

import prisma from "../prisma-client";
import { getAccountsByInstitutionId, getAccountsByUserId } from "./accounts";

export const getTransactionsByAccountId = async (account_id: string) => {
  const allTransactions = await prisma.transaction.findMany({
    where: {
      account_id,
    },
  });

  return allTransactions;
};

export const getTransactionsByUserId = async (userId: number) => {
  const allAccounts = await getAccountsByUserId(userId);

  const allTransactions = await Promise.all(
    allAccounts.map(async (account) =>
      account.account_id ? getTransactionsByAccountId(account.account_id) : null
    )
  );

  return allTransactions.flatMap((transactions) => (transactions?.length ? transactions : []));
};

export const deleteAllTransactionsByInstId = async (institution_id: string, userId: number) => {
  const allAccounts = await getAccountsByInstitutionId(institution_id, userId);

  const allTransactions = await Promise.all(
    allAccounts.map(async (account) =>
      account.account_id ? getTransactionsByAccountId(account.account_id) : null
    )
  );

  const transactionIds = allTransactions.flatMap(
    (transactions) => transactions?.map((transaction) => transaction.transaction_id) ?? []
  );

  // TODO: soft delete
  // await prisma.transaction.updateMany({
  //   where: {
  //     transaction_id: {
  //       in: transactionIds,
  //     },
  //   },
  //   data: {
  //     deletedAt: new Date(),
  //   },
  // });

  await prisma.transaction.deleteMany({
    where: {
      transaction_id: {
        in: transactionIds,
      },
    },
  });

  console.log("Deleted all transactions for institution", institution_id);
};

export const updateTransactions = async (transactions: TransactionsSyncResponse) => {
  const { added, modified, removed } = transactions;

  await prisma.transaction.createMany({
    data: added.map((transaction) => ({
      account_id: transaction.account_id,
      amount: transaction.amount,
      date: transaction.date,
      category: transaction.personal_finance_category?.primary,
      name: transaction.name,
      currency_code: transaction.iso_currency_code,
      pending: transaction.pending,
      transaction_id: transaction.transaction_id,
    })),
  });

  for (const transaction of modified) {
    prisma.transaction.update({
      where: {
        transaction_id: transaction.transaction_id,
      },
      data: {
        amount: transaction.amount,
        date: transaction.date,
        category: transaction.personal_finance_category?.primary,
        name: transaction.name,
        currency_code: transaction.iso_currency_code,
        pending: transaction.pending,
      },
    });
  }

  prisma.transaction.deleteMany({
    where: {
      transaction_id: {
        in: removed.map((transaction) => transaction.transaction_id) as string[],
      },
    },
  });

  console.log("Transactions synced");
};
