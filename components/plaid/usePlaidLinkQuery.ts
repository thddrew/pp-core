import { getLinkToken } from "@/lib/plaid/server-actions";
import { PLAID_LINK_TOKEN_KEY } from "@/lib/plaid/utils";
import { useQuery } from "@tanstack/react-query";

export const usePlaidLinkQuery = () =>
  useQuery({
    queryKey: [PLAID_LINK_TOKEN_KEY],
    queryFn: getLinkToken,
  });
