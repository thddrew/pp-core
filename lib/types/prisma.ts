import type { Prisma } from "@prisma/client";

export type AccountType = Prisma.$AccountPayload["scalars"];

export type AccountTypeWithInstName = AccountType & {
  institution_name?: string;
};

export type Transaction = Prisma.$TransactionPayload["scalars"];

export type User = Prisma.$UserPayload["scalars"];
