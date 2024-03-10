import type { Prisma } from "@prisma/client";

export type AccountType = Prisma.$AccountPayload["scalars"];

export type AccountTypeWithInstName = AccountType & {
  institution_name?: string;
};
