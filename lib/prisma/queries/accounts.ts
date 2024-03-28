"use server";

/**
 * These are all db queries
 */
import type { Prisma } from "@prisma/client";

import prisma from "../prisma-client";

/**
 * Create a new stored account
 */
export const createAccount = async (data: Prisma.AccountCreateInput) => {
  const account = await prisma.account.create({
    data,
  });

  return account;
};

export const createAccounts = async (data: Prisma.AccountCreateInput[]) => {
  const accounts = await prisma.account.createMany({
    data,
  });

  return accounts;
};

/**
 * Get a stored account by its ID
 */
export const getAccountById = async (id: number) => {
  const account = await prisma.account.findUnique({
    where: { id },
  });

  return account;
};

/**
 * Get all stored accounts for a user
 */
export const getAccountsByUserId = async (userId: number) => {
  const accounts = await prisma.account.findMany({
    where: { userId },
  });

  return accounts;
};

export const getAccountsByInstitutionId = async (institution_id: string, userId: number) => {
  const accounts = await prisma.account.findMany({
    where: { institution_id, userId },
  });

  return accounts;
};
