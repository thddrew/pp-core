"use server";

import { getAccountById } from "@/prisma/queries/accounts";

import { createPlaidClient } from "./plaid-client";

export const getLiabilities = async (plaidAccountId: number) => {
  const plaidAccount = await getAccountById(plaidAccountId);

  if (!plaidAccount) throw new Error("Plaid account not found");
  if (!plaidAccount.access_token) throw new Error("Plaid account access token not found");

  try {
    const response = await createPlaidClient().liabilitiesGet({
      access_token: plaidAccount.access_token,
    });

    return response.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};
