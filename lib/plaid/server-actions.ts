"use server";

import { auth } from "@clerk/nextjs";
import {
  Configuration,
  CountryCode,
  LinkTokenCreateRequest,
  PlaidApi,
  PlaidEnvironments,
  Products,
} from "plaid";

export const createPlaidClient = () => {
  const configuration = new Configuration({
    basePath: PlaidEnvironments.sandbox,
    baseOptions: {
      headers: {
        "PLAID-CLIENT-ID": process.env.PLAID_CLIENT_ID,
        "PLAID-SECRET": process.env.PLAID_SECRET_ID,
        "Plaid-Version": "2020-09-14",
      },
    },
  });

  return new PlaidApi(configuration);
};

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
      products: [Products.Auth],
    };

    const response = await createPlaidClient().linkTokenCreate(request);
    console.log(response.data);

    return response.data.link_token;
  } catch (err) {
    console.log(err.response.data);
  }
};
