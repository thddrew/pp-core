import { syncAllTransactionsByInst } from "@/lib/plaid/transactions";
import { getInstitutionByInstId } from "@/lib/prisma/queries/institutions";
import { SyncTransactionsJobOptions } from "@/lib/qstash/sync";
import { verifySignatureAppRouter } from "@upstash/qstash/dist/nextjs";
import { NextRequest, NextResponse } from "next/server";

const handler = async (req: NextRequest) => {
  const { institutionId, userId, fullSync } = (await req.json()) as SyncTransactionsJobOptions;

  const institution = await getInstitutionByInstId(institutionId, userId);

  if (!institution) {
    return NextResponse.json({ message: `Institution ${institutionId} not found` });
  }

  const cursor = (fullSync ? undefined : institution.sync_cursor) ?? undefined;

  // undefined for type safety?
  await syncAllTransactionsByInst(institution, userId, cursor);

  return NextResponse.json({
    message: `Syncing transactions for institution ${institutionId} and user ${userId}`,
  });
};

export const POST = verifySignatureAppRouter(handler);
