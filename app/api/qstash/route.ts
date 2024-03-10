import { syncAllTransactionsByInst } from "@/lib/plaid/transactions";
import { getInstitutionByInstId } from "@/lib/prisma/queries/institutions";
import { verifySignatureAppRouter } from "@upstash/qstash/dist/nextjs";
import { NextRequest, NextResponse } from "next/server";

const handler = async (req: NextRequest) => {
  await new Promise((r) => setTimeout(r, 1000));

  const res = (await req.json()) as { institutionId: string; userId: number };

  const institution = await getInstitutionByInstId(res.institutionId);

  if (!institution) {
    return NextResponse.json({ message: `Institution ${res.institutionId} not found` });
  }

  await syncAllTransactionsByInst(institution);

  return NextResponse.json({
    message: `Syncing transactions for institution ${res.institutionId} and user ${res.userId}`,
  });
};

export const POST = verifySignatureAppRouter(handler);
