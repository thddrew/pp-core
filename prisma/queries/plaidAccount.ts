import { Prisma } from "@prisma/client";

import prisma from "../client";

/**
 * Create a new Plaid account
 */
export const createPlaidAccount = async (data: Prisma.PlaidAccountCreateInput) => {
  const account = await prisma.plaidAccount.create({
    data,
  });

  return account;
};

/**
 * Get a Plaid account by its ID
 */
export const getPlaidAccountById = async (id: number) => {
  const account = await prisma.plaidAccount.findUnique({
    where: { id },
  });

  return account;
};

/**
 * Get all Plaid accounts for a user
 */
export const getPlaidAccountsByUserId = async (userId: number) => {
  const accounts = await prisma.plaidAccount.findMany({
    where: { userId },
  });

  return accounts;
};
