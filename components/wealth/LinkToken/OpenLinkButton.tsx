"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { filterDuplicateAccounts } from "@/lib/filterDuplicateAccounts";
import { getPlaidAccountsByAccessToken } from "@/lib/plaid/accounts";
import { exchangePublicToken, getLinkToken } from "@/lib/plaid/link-token";
import { createAccounts } from "@/lib/prisma/queries/accounts";
import {
  createInstitution,
  getInstitutionByInstId,
  updateInstitution,
} from "@/lib/prisma/queries/institutions";
import { getCurrentUser, updateUser } from "@/lib/prisma/queries/users";
import { startSyncTransactionsJob } from "@/lib/qstash/transactions";
import { DollarSignIcon, Loader2Icon, PiggyBankIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { Products } from "plaid";
import { useEffect, useState } from "react";
import { usePlaidLink } from "react-plaid-link";

export const OpenLinkButton = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState<string | null>(null);

  const { open } = usePlaidLink({
    onSuccess: async (public_token, metadata) => {
      setToken(null);
      const user = await getCurrentUser();

      if (!user) throw new Error("User not found");
      const newAccounts = await filterDuplicateAccounts(metadata, user.clerkId);

      if (!newAccounts.length) {
        // TODO: Show a message to the user
        console.log("No new accounts");
        return;
      }

      const accessToken = await exchangePublicToken(public_token, user.id);

      if (!accessToken) {
        console.log("No access token");
        return;
      }

      let accounts = await getPlaidAccountsByAccessToken(accessToken);

      // Only get new accounts
      accounts = accounts.filter((account) =>
        Boolean(
          newAccounts.find(
            (newAccount) => newAccount.mask === account.mask && newAccount.name === account.name
          )
        )
      );

      const existingInstitution = metadata.institution?.institution_id
        ? await getInstitutionByInstId(metadata.institution?.institution_id)
        : null;

      let syncJobKey = null;
      if (metadata.institution?.institution_id) {
        try {
          syncJobKey = await startSyncTransactionsJob({
            institutionId: metadata.institution?.institution_id,
            userId: user.id,
            fullSync: false,
          });
        } catch (err) {
          // TODO: handle error
          console.error("Error starting sync job", err);
        }
      }

      if (!existingInstitution) {
        await createInstitution({
          institution_id: metadata.institution?.institution_id ?? "UNKNOWN",
          name: metadata.institution?.name ?? metadata.institution?.institution_id ?? "UNKNOWN",
          access_token: accessToken,
          userId: user.id,
          sync_job_key: syncJobKey,
        });
      } else {
        await updateInstitution(existingInstitution.id, {
          access_token: accessToken,
          sync_job_key: syncJobKey,
        });
      }

      await createAccounts(
        accounts.map((account) => ({
          userId: user.id,
          account_id: account.account_id,
          display_name: account.name,
          institution_id: metadata.institution?.institution_id,
          mask: account.mask,
          available_balance: account.balances.available,
          current_balance: account.balances.current,
          type: account.type,
          subtype: account.subtype,
          currency_code: account.balances.iso_currency_code,
          official_name: account.official_name,
        }))
      );

      router.refresh();
    },
    token,
  });

  const onGetToken = async (products: Products[]) => {
    setLoading(true);
    const token = await getLinkToken(products);

    if (token) {
      setToken(token);
    }
  };

  useEffect(() => {
    if (token) {
      open();
    }
  }, [open, token]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Add</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[200px]">
        <DropdownMenuLabel>Type of account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="p-2"
          onClick={() => {
            onGetToken([Products.Transactions]);
          }}>
          <PiggyBankIcon className="mr-2 size-5" />
          <span>Bank</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          disabled
          className="p-2"
          onClick={() => {
            onGetToken([Products.Investments]);
          }}>
          <DollarSignIcon className="mr-2 size-5" />
          <span>Investment</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
