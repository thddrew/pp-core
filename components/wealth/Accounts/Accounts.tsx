import { Separator } from "@/components/ui/separator";
import { InitialSearchParams } from "@/lib/getInitialSearchParams";
import { getPlaidAccountsDetails } from "@/lib/plaid/accounts";
import { getInstitutionDetails } from "@/lib/plaid/institutions";
import { PLAID_ACCOUNTS_KEY } from "@/lib/plaid/utils";
import { SearchParams } from "@/lib/types/SearchParams";
import { getAccountsByUserId } from "@/prisma/queries/accounts";
import { getCurrentUser } from "@/prisma/queries/users";
import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query";
import { Loader2Icon } from "lucide-react";
import { AccountBase, CountryCode, Institution, InstitutionsGetByIdResponse } from "plaid";
import { Suspense, useMemo } from "react";

import { OpenLinkButton } from "../LinkToken/OpenLinkButton";
import { SummaryCard } from "../SummaryCard";
import { AccountsTable } from "./AccountsTable";

// TODO: add searchParams
export const AccountsHeader = async () => {
  return (
    <div className="flex items-center gap-3">
      <h2 className="text-xl font-bold">Account Summary</h2>
      <OpenLinkButton />
    </div>
  );
};

export const AccountsSummary = async () => {
  const user = await getCurrentUser();

  if (!user || !user.clerkId) {
    return <div className="text-gray-400">User not found</div>;
  }

  const accountDetails = await getPlaidAccountsDetails(user.id);

  const allAccounts = accountDetails?.flatMap((account) => account.data.accounts) ?? [];

  const { total, currency } = allAccounts.reduce(
    (total, account) => ({
      total: total.total + (account.balances.current ?? 0),
      currency: total.currency, // TODO: handle multiple currencies
    }),
    {
      total: 0,
      currency: "CAD",
    }
  );

  const balance = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    currencyDisplay: "narrowSymbol",
  }).format(total);

  return (
    <section className="flex gap-3">
      <div className="basis-72">
        <SummaryCard
          title={
            <span className="flex justify-between text-base font-normal">
              <span>Total Balance</span> <span>{currency}</span>
            </span>
          }>
          <span className="text-2xl font-bold">{balance}</span>
        </SummaryCard>
      </div>
    </section>
  );
};

export const AccountsWrapper = async ({ searchParams }: { searchParams: InitialSearchParams }) => {
  const user = await getCurrentUser();
  const queryClient = new QueryClient();

  const accounts = user ? await getPlaidAccountsDetails(user.id) : null;

  let allAccounts: AccountBase[] = [];
  if (accounts) {
    allAccounts = accounts.flatMap((account) => account.data.accounts);
  }
  // const accounts = user ? await getAccountsByUserId(user.id) : null;

  if (user?.id) {
    queryClient.setQueryData([PLAID_ACCOUNTS_KEY, user.id], accounts);
  }

  return (
    <>
      <AccountsHeader />
      <div className="h-8" />
      <Suspense fallback={<Loader2Icon className="animate-spin" />}>
        <AccountsSummary />
      </Suspense>
      <div className="h-16" />
      <Suspense fallback={<Loader2Icon className="animate-spin" />}>
        <HydrationBoundary state={dehydrate(queryClient)}>
          {user?.id && <AccountsTable userId={user.id} accounts={allAccounts} searchParams={searchParams} />}
        </HydrationBoundary>
      </Suspense>
    </>
  );
};
