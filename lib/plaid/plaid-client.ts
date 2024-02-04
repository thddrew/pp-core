import { Configuration, PlaidApi, PlaidEnvironments } from "plaid";

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
