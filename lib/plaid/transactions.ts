"use server";

import { getAccountsByUserId } from "@/prisma/queries/accounts";
import { getInstitutionsByUserId } from "@/prisma/queries/institutions";
import { formatDate, subDays } from "date-fns";

import { createPlaidClient } from "./plaid-client";

/**
 * @deprecated
 * Get all transactions for a user from all its Plaid accounts
 */
export const getAllTransactionsForUser = async (
  userId: number,
  startDate: string = subDays(new Date(), 30).toISOString(),
  endDate: string = new Date().toISOString()
) => {
  const accounts = await getAccountsByUserId(userId);

  if (!accounts.length) {
    // throw new Error("Plaid accounts not found")
    return [];
  }

  const plaidClient = createPlaidClient();

  // TODO: get transactions from db
  const responses = await Promise.all(
    accounts.map((account) =>
      plaidClient.transactionsGet({
        access_token: account.access_token,
        start_date: formatDate(startDate, "yyyy-MM-dd"),
        end_date: formatDate(endDate, "yyyy-MM-dd"),
      })
    )
  );

  return responses.map((response) => response.data);
};

export const syncTransactionsForUser = async (userId: number) => {
  const institutions = await getInstitutionsByUserId(userId);
  const plaidClient = createPlaidClient();

  const allTransactions = await Promise.all(
    institutions.map(async (institution) => {
      if (!institution.access_token) {
        return null;
      }

      const response = await plaidClient.transactionsSync({
        access_token: institution.access_token,
      });

      return response.data;
    })
  );

  return allTransactions.flatMap((transactions) => (transactions ? [transactions] : []));
};
