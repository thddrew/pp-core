"use server";

import { getPlaidAccountsByUserId } from "@/prisma/queries/plaidAccount";
import { cache } from "react";

import { createPlaidClient } from "./plaid-client";

export const getPlaidAccountsDetails = cache(async (userId: number) => {
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
});
