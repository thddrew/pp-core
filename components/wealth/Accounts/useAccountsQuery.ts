import { getPlaidAccountsDetails } from "@/lib/plaid/accounts";
import { PLAID_ACCOUNTS_KEY } from "@/lib/plaid/utils";
import { useQuery } from "@tanstack/react-query";

export const useAccountsQuery = (userId: number) =>
  useQuery({
    queryKey: [PLAID_ACCOUNTS_KEY, userId],
    queryFn: async () => {
      try {
        return getPlaidAccountsDetails(userId);
      } catch (err) {
        console.log(err);
        return [];
      }
    },
  });
