"use server";

import { qstashClient } from "./client";

export type SyncTransactionsJobOptions = {
  institutionId: string;
  userId: number;
  fullSync?: boolean;
};

export const startSyncTransactionsJob = async ({
  institutionId,
  userId,
  fullSync,
}: SyncTransactionsJobOptions) => {
  const body: SyncTransactionsJobOptions = {
    institutionId,
    userId,
    fullSync,
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

export type ScheduleSyncTransactionsJobOptions = SyncTransactionsJobOptions & {
  cron: string;
};

export const scheduleSyncTransactionsJob = async ({
  institutionId,
  userId,
  fullSync,
  cron,
}: ScheduleSyncTransactionsJobOptions) => {
  const body: SyncTransactionsJobOptions = {
    institutionId,
    userId,
    fullSync,
  };

  const url = `${process.env.QSTASH_APP_URL}/api/qstash`;

  const schedule = await qstashClient.schedules.create({
    body: JSON.stringify(body),
    destination: url,
    cron,
  });

  return schedule.scheduleId;
};

export const scheduleDailySyncTransactionsJob = async (options: SyncTransactionsJobOptions) => {
  return scheduleSyncTransactionsJob({
    ...options,
    cron: "0 0 * * *",
  });
};

export const getScheduledSyncDetails = async (scheduleKey: string) => {
  const schedule = await qstashClient.schedules.get(scheduleKey);

  return schedule;
};

export const removeScheduledSyncJob = async (scheduleKey: string) => {
  return qstashClient.schedules.delete(scheduleKey);
};
