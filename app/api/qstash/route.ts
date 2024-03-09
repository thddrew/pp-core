import { verifySignatureAppRouter } from "@upstash/qstash/dist/nextjs";
import { NextRequest, NextResponse } from "next/server";

const handler = async (req: NextRequest) => {
  await new Promise((r) => setTimeout(r, 1000));

  console.log("Success");
  console.log(await req.json());
  return NextResponse.json({ name: "John Doe Serverless" });
};

export const POST = verifySignatureAppRouter(handler);
