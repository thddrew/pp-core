import { Separator } from "@/components/ui/separator";
import { getPlaidAccountsDetails } from "@/lib/plaid/accounts";
import { getInstitutionDetails } from "@/lib/plaid/institutions";
import { PLAID_ACCOUNTS_KEY } from "@/lib/plaid/utils";
import { getCurrentUser } from "@/prisma/queries/users";
import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query";
import { Loader2Icon } from "lucide-react";
import { CountryCode, Institution, InstitutionsGetByIdResponse } from "plaid";
import { Suspense } from "react";

import { OpenLinkButton } from "../LinkToken/OpenLinkButton";
import { SummaryCard } from "../SummaryCard";
import { AccountsTable } from "./AccountsTable";

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

  const summaryData = await getPlaidAccountsDetails(user.id);
  const allAccounts = summaryData.flatMap((data) => data.accounts);

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

export const AccountsWrapper = async () => {
  const user = await getCurrentUser();
  const client = new QueryClient();

  // Should be cached for AccountsSummary
  let summaryData = user ? await getPlaidAccountsDetails(user.id) : [];

  // Institution details
  const institutions = (
    await Promise.all(
      summaryData.map(
        ({ item }) =>
          item.institution_id ? getInstitutionDetails(item.institution_id, [CountryCode.Ca]) : null // TODO: handle multiple countries
      )
    )
  ).filter(Boolean) as Institution[]; // TODO: why does TS not now this cannot be null?

  summaryData = summaryData.map((data) => {
    const institution = institutions.find(
      ({ institution_id }) => institution_id === data.item.institution_id
    );

    return {
      ...data,
      accounts: data.accounts.map((account) => ({
        ...account,
        institutionName: institution?.name,
      })),
      item: {
        ...data.item,
        institution,
      },
    };
  });

  if (user?.id) {
    await client.prefetchQuery({
      queryKey: [PLAID_ACCOUNTS_KEY, user.id],
      queryFn: () => summaryData,
      staleTime: 1000 * 60 * 15, // 15 minutes
    });
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
        <HydrationBoundary state={dehydrate(client)}>
          {user?.id && <AccountsTable userId={user.id} institutions={institutions} />}
        </HydrationBoundary>
      </Suspense>
    </>
  );
};
