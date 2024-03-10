"use server";

import { createAccount } from "@/lib/prisma/queries/accounts";
import { auth } from "@clerk/nextjs";
import { CountryCode, LinkTokenCreateRequest, PlaidError, Products } from "plaid";

import { createPlaidClient } from "./plaid-client";

export const getLinkToken = async (products: Products[]) => {
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
      products,
    };

    const response = await createPlaidClient().linkTokenCreate(request);

    return response.data.link_token;
  } catch (err) {
    // @ts-ignore
    // TODO: handle error
    console.log(err.response.data as PlaidError);
  }
};

/**
 * Exchange a public token for an access token to the resource and create a plaid account entity
 */
export const exchangePublicToken = async (publicToken: string, userId: number) => {
  try {
    const response = await createPlaidClient().itemPublicTokenExchange({
      public_token: publicToken,
    });
    return response.data.access_token;
  } catch (err) {
    console.log(err);
  }
};
