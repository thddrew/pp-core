"use server";

import { qstashClient } from "./client";

export const startSyncTransactionsJob = async (instId: string, userId: number) => {
  const body = {
    institutionId: instId,
    userId,
  };
  // If you know the public URL of the email API, you can use it directly
  const url = `${process.env.QSTASH_APP_URL}/api/qstash`;

  // Tell QStash to start the background job.
  // For proper error handling, refer to the quick start.
  const res = await qstashClient.publishJSON({
    url,
    body,
  });

  return res.messageId;
};
