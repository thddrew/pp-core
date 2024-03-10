"use server";

import { getInstitutionsByUserId } from "@/lib/prisma/queries/institutions";
import { cache } from "react";

import { PlaidClient } from "./plaid-client";

/**
 * Get details for saved accounts
 */
export const getPlaidAccountsDetails = async (userId: number) => {
  try {
    if (!userId) throw new Error("User ID is required");
    const institutions = await getInstitutionsByUserId(userId);

    const allAccessTokens = institutions
      .map((institution) => institution.access_token)
      .filter(Boolean) as string[];

    const promiseRes = await Promise.allSettled(
      allAccessTokens.map(async (token) => {
        const response = await PlaidClient.accountsGet({ access_token: token });

        return response.data;
      })
    );

    return promiseRes.flatMap((res) => (res.status === "fulfilled" ? [res.value] : []));
  } catch (err) {
    console.log(err);
    return null;
  }
};

export const getPlaidAccountsByAccessToken = async (access_token: string) => {
  try {
    const response = await PlaidClient.accountsGet({
      access_token,
    });

    return response.data.accounts;
  } catch (err) {
    return [];
  }
};
