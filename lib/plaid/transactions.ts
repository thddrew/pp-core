"use server";

import { getInstitutionsByUserId, updateInstitution } from "@/lib/prisma/queries/institutions";
import { deleteAllTransactionsByInstId, updateTransactions } from "@/lib/prisma/queries/transactions";
import { Institution } from "@prisma/client";
import { subDays } from "date-fns";

import { PlaidClient } from "./plaid-client";

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

export const syncAllTransactionsByInst = async (inst: Institution, userId: number, cursor?: string) => {
  console.log("Syncing transactions for institution", inst.id);
  if (!inst.access_token) {
    throw new Error(`Access token not found for institution ${inst.id}`);
  }

  let hasMore = true;
  let nextCursor = cursor;

  if (!cursor) {
    console.log("Deleting all transactions for institution", inst.id);
    await deleteAllTransactionsByInstId(inst.institution_id, userId);
  }

  while (hasMore) {
    const response = await PlaidClient.transactionsSync({
      access_token: inst.access_token,
      cursor: nextCursor,
      count: 500,
      options: {
        days_requested: 730,
      },
    });

    await updateTransactions(response.data);

    hasMore = response.data.has_more;
    nextCursor = response.data.next_cursor;
  }

  await updateInstitution(inst.id, {
    sync_cursor: nextCursor,
    last_sync: new Date().toISOString(),
    sync_job_key: null,
  });
};

export const syncTransactionsForUser = async (userId: number) => {
  const institutions = await getInstitutionsByUserId(userId);

  for (const institution of institutions) {
    if (!institution.access_token) {
      return;
    }

    const response = await PlaidClient.transactionsSync({
      access_token: institution.access_token,
      cursor: institution.sync_cursor ?? undefined,
    });

    return response.data;
  }
};
