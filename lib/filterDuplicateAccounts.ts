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

  const newAccounts = accounts.filter((account) => {
    const isExisting = existingAccounts.find(
      (acc) => acc.mask === account.mask || acc.display_name === account.name
    );

    return !isExisting;
  });

  return newAccounts;
};
