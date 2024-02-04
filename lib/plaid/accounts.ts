"use server";

import { getPlaidAccountById } from "@/prisma/queries/plaidAccount";
import { getUserByClerkId } from "@/prisma/queries/users";
import { auth } from "@clerk/nextjs";

import { createPlaidClient } from "./plaid-client";

export const getLinkedAccountsForUser = async () => {
  const { userId } = auth();

  if (!userId) throw new Error("User ID is required");

  try {
    const user = await getUserByClerkId(userId);

    if (!user) throw new Error("User not found");
    if (!user.plaidAccountId) throw new Error("User does not have a Plaid account");

    const userPlaidAccount = await getPlaidAccountById(user.plaidAccountId);

    if (!userPlaidAccount) throw new Error("Plaid account not found");
    if (!userPlaidAccount.access_token) throw new Error("Plaid account does not have an access token");

    // Fetch the user's accounts from Plaid
    const response = await createPlaidClient().accountsGet({
      access_token: userPlaidAccount?.access_token,
    });

    return response.data;
  } catch (err) {
    throw new Error(err);
  }
};
