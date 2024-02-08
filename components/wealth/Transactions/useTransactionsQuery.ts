import { getTransactions } from "@/lib/plaid/transactions";
import { PLAID_TRANSACTIONS_KEY } from "@/lib/plaid/utils";
import { useQuery } from "@tanstack/react-query";

export const useTransactionsQuery = (plaidAccountId: number) =>
  useQuery({
    queryKey: [PLAID_TRANSACTIONS_KEY, plaidAccountId],
    queryFn: async () => getTransactions(plaidAccountId),
  });
