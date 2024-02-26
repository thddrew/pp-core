/**
 * Filters duplicate Plaid accounts from a link token response
 */
import { getAccountsByUserId } from "@/prisma/queries/accounts";
import { getUserByClerkId } from "@/prisma/queries/users";
import { PlaidLinkOnSuccessMetadata } from "react-plaid-link";

export const filterDuplicateAccounts = async (metadata: PlaidLinkOnSuccessMetadata, clerkId: string) => {
  const { accounts, institution } = metadata;
  const user = await getUserByClerkId(clerkId);

  if (!user) throw new Error("User not found");

  let existingAccounts = await getAccountsByUserId(user.id);

  // Duplicate accounts are those that have the same institution_id
  existingAccounts = existingAccounts.filter((acc) => acc.institution_id === institution?.institution_id);

  // TODO: optimize
  const newAccounts = accounts.filter((account) => {
    const matchingMask = existingAccounts.find((acc) => acc.mask === account.mask);
    // Matching name may not be reliable
    const matchingName = existingAccounts.find((acc) => acc.display_name === account.name);

    return !matchingMask && !matchingName;
  });

  return newAccounts;
};
