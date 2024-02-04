import { Prisma } from "@prisma/client";

import prisma from "../client";

export const createPlaidAccount = async (data: Prisma.PlaidAccountCreateInput) => {
  const account = await prisma.plaidAccount.create({
    data,
  });

  return account;
};

export const getPlaidAccountById = async (id: number) => {
  const account = await prisma.plaidAccount.findUnique({
    where: { id },
  });

  return account;
};
