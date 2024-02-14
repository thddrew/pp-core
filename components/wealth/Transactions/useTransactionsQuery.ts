import { getAllTransactionsForUser, getTransactions } from "@/lib/plaid/transactions";
import { PLAID_TRANSACTIONS_KEY } from "@/lib/plaid/utils";
import { useQuery } from "@tanstack/react-query";

export const useTransactionsQuery = (userId: number, startDate?: string, endDate?: string) =>
  useQuery({
    queryKey: [PLAID_TRANSACTIONS_KEY, userId, startDate, endDate],
    queryFn: async () => getAllTransactionsForUser(userId, startDate, endDate),
  });
