"use server";

import { createPlaidAccount } from "@/prisma/queries/plaidAccount";
import { updateUserByClerkId } from "@/prisma/queries/users";
import { auth } from "@clerk/nextjs";
import { CountryCode, LinkTokenCreateRequest, Products } from "plaid";

import { createPlaidClient } from "./plaid-client";

export const getLinkToken = async () => {
  const { userId } = auth();

  try {
    if (!userId) throw new Error("User ID is required");

    const request: LinkTokenCreateRequest = {
      client_name: "PP Wealth",
      language: "en",
      country_codes: [CountryCode.Ca],
      user: {
        client_user_id: userId,
      },
      products: [Products.Auth, Products.Transactions, Products.Investments, Products.Liabilities],
    };

    const response = await createPlaidClient().linkTokenCreate(request);

    return response.data.link_token;
  } catch (err) {
    console.log(err.response.data);
  }
};

export const exchangePublicToken = async (publicToken: string) => {
  const { userId } = auth();

  try {
    if (!userId) throw new Error("User ID is required");

    const response = await createPlaidClient().itemPublicTokenExchange({
      public_token: publicToken,
    });

    const plaidAccount = await createPlaidAccount({
      access_token: response.data.access_token,
      request_id: response.data.request_id,
      item_id: response.data.item_id,
    });

    // Save the access token to the user's account
    await updateUserByClerkId(userId, {
      plaidAccountId: plaidAccount.id,
    });

    return response.data;
  } catch (err) {
    console.log(err);
  }
};
