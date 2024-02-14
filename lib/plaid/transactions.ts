"use server";

import { getPlaidAccountById, getPlaidAccountsByUserId } from "@/prisma/queries/plaidAccount";
import { format, formatDate, subDays } from "date-fns";
import { cache } from "react";

import { getPlaidAccountsDetails } from "./accounts";
import { createPlaidClient } from "./plaid-client";

/**
 * Get the transactions for a Plaid account
 */
export const getTransactions = async (plaidAccountId: number) => {
  const plaidAccount = await getPlaidAccountById(plaidAccountId);

  if (!plaidAccount) throw new Error("Plaid account not found");
  if (!plaidAccount.access_token) throw new Error("Plaid account access token not found");

  try {
    // Fetch the user's transactions from Plaid
    const response = await createPlaidClient().transactionsGet({
      access_token: plaidAccount.access_token,
      start_date: format(subDays(new Date(), 30), "yyyy-MM-dd"),
      end_date: format(new Date().toISOString(), "yyyy-MM-dd"),
    });

    return response.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

/**
 * Get all transactions for a user from all its Plaid accounts
 */
export const getAllTransactionsForUser = cache(
  async (
    userId: number,
    startDate: string = subDays(new Date(), 30).toISOString(),
    endDate: string = new Date().toISOString()
  ) => {
    const plaidAccounts = await getPlaidAccountsByUserId(userId);

    if (!plaidAccounts.length) throw new Error("Plaid accounts not found");

    const plaidClient = createPlaidClient();

    const responses = await Promise.all(
      plaidAccounts.map((account) =>
        plaidClient.transactionsGet({
          access_token: account.access_token,
          start_date: formatDate(startDate, "yyyy-MM-dd"),
          end_date: formatDate(endDate, "yyyy-MM-dd"),
        })
      )
    );

    return responses.map((response) => response.data);
  }
);
