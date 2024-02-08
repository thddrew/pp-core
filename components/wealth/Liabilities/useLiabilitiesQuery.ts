import { getLiabilities } from "@/lib/plaid/liabilities";
import { PLAID_LIABILITIES_KEY } from "@/lib/plaid/utils";
import { useQuery } from "@tanstack/react-query";

export const useLiabilitiesQuery = (plaidAccountId: number) =>
  useQuery({
    queryKey: [PLAID_LIABILITIES_KEY, plaidAccountId],
    queryFn: async () => getLiabilities(plaidAccountId),
  });
