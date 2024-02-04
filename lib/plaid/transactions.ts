"use server";

import { getPlaidAccountById } from "@/prisma/queries/plaidAccount";
import { format, subDays } from "date-fns";

import { createPlaidClient } from "./plaid-client";

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
