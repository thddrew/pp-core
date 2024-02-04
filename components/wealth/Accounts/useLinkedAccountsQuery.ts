import { getLinkedAccountsForUser } from "@/lib/plaid/accounts";
import { PLAID_ACCOUNTS_KEY } from "@/lib/plaid/utils";
import { useQuery } from "@tanstack/react-query";

export const useLinkedAccountsQuery = (userId?: string | null) =>
  useQuery({
    queryKey: [PLAID_ACCOUNTS_KEY, userId],
    queryFn: getLinkedAccountsForUser,
  });
