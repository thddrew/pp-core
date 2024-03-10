"use server";

import { getAccountsByUserId } from "@/lib/prisma/queries/accounts";
import { getInstitutionsByUserId } from "@/lib/prisma/queries/institutions";
import { getUser } from "@/lib/prisma/queries/users";
import { AccountsGetResponse } from "plaid";
import { cache } from "react";

import { createPlaidClient } from "./plaid-client";

/**
 * Get details for saved accounts
 */
export const getPlaidAccountsDetails = cache(async (userId: number) => {
  try {
    if (!userId) throw new Error("User ID is required");
    const plaidClient = createPlaidClient();

    const institutions = await getInstitutionsByUserId(userId);

    const allAccessTokens = institutions
      .map((institution) => institution.access_token)
      .filter(Boolean) as string[];

    const allAccountsDetails = await Promise.all(
      allAccessTokens.map(async (token) => {
        const response = await plaidClient.accountsGet({ access_token: token });

        return response.data;
      })
    );

    return allAccountsDetails;
  } catch (err) {
    return null;
  }
});

export const getPlaidAccountsByAccessToken = async (access_token: string) => {
  const plaidClient = createPlaidClient();
  try {
    const response = await plaidClient.accountsGet({
      access_token,
    });

    return response.data.accounts;
  } catch (err) {
    return [];
  }
};
