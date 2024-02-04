import { Prisma } from "@prisma/client";

import prisma from "../client";

export const createPlaidAccount = async (data: Prisma.PlaidAccountCreateInput) => {
  const account = await prisma.plaidAccount.create({
    data,
  });

  return account;
};
