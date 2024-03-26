"use server";

import { getInstitutionsByUserId } from "@/lib/prisma/queries/institutions";

import { PlaidClient } from "./plaid-client";

/**
 * Get details for saved accounts
 */
export const getPlaidAccountsDetails = async (userId: number) => {
  try {
    if (!userId) throw new Error("User ID is required");
    const institutions = await getInstitutionsByUserId(userId);

    const promiseRes = await Promise.allSettled(
      institutions.map(async ({ id, access_token }) => {
        if (!access_token) return Promise.reject(`No access token for institution ${id}`);
        const response = await PlaidClient.accountsGet({ access_token });

        return response.data;
      })
    );

    const accounts = [];
    const failed = [];
    for (const res of promiseRes) {
      if (res.status === "fulfilled") {
        accounts.push(res.value);
      } else {
        failed.push(res.reason);
      }
    }

    if (failed.length) {
      console.error(failed);
    }

    return accounts;
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
