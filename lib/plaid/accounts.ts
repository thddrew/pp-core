"use server";

import { getPlaidAccountById, getPlaidAccountsByUserId } from "@/prisma/queries/plaidAccount";
import { getUserByClerkId } from "@/prisma/queries/users";

import { createPlaidClient } from "./plaid-client";

export const getPlaidAccountsDetails = async (userId: number) => {
  try {
    if (!userId) throw new Error("User ID is required");
    const plaidClient = createPlaidClient();

    const plaidAccounts = await getPlaidAccountsByUserId(userId);

    const plaidAccountsDetails = await Promise.all(
      plaidAccounts.map(async (account) => {
        const response = await plaidClient.accountsGet({
          access_token: account.access_token,
        });

        return response.data;
      })
    );

    return plaidAccountsDetails;
  } catch (err) {
    return [];
  }
};
