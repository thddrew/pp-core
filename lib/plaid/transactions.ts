"use server";

import { getAccountsByUserId } from "@/lib/prisma/queries/accounts";
import { getInstitutionsByUserId, updateInstitution } from "@/lib/prisma/queries/institutions";
import { updateTransactions } from "@/lib/prisma/queries/transactions";
import { Institution } from "@prisma/client";
import { formatDate, subDays } from "date-fns";

import { createPlaidClient } from "./plaid-client";

/**
 * @deprecated
 * Get all transactions for a user from all its Plaid accounts
 */
export const getAllTransactionsForUser = async (
  userId: number,
  startDate: string = subDays(new Date(), 30).toISOString(),
  endDate: string = new Date().toISOString()
) => {
  return [];
};

// TODO: background jobs queue system
export const syncAllTransactionsByInst = async (inst: Institution, cursor?: string) => {
  const plaidClient = createPlaidClient();

  if (!inst.access_token) {
    throw new Error(`Access token not found for institution ${inst.id}`);
  }

  let hasMore = true;
  let nextCursor: string | undefined = cursor ?? inst.sync_cursor ?? undefined;

  while (hasMore) {
    const response = await plaidClient.transactionsSync({
      access_token: inst.access_token,
      cursor: nextCursor,
    });

    await updateTransactions(response.data);

    hasMore = response.data.has_more;
    nextCursor = response.data.next_cursor;
  }

  updateInstitution(inst.id, { sync_cursor: nextCursor, last_sync: new Date().toISOString() });
};

export const syncTransactionsForUser = async (userId: number) => {
  const institutions = await getInstitutionsByUserId(userId);
  const plaidClient = createPlaidClient();

  for (const institution of institutions) {
    if (!institution.access_token) {
      return;
    }

    const response = await plaidClient.transactionsSync({
      access_token: institution.access_token,
      cursor: institution.sync_cursor ?? undefined,
    });

    return response.data;
  }
};
