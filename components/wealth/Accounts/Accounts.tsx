import { InitialSearchParams } from "@/lib/getInitialSearchParams";
import { getPlaidAccountsDetails } from "@/lib/plaid/accounts";
import { getCurrentUser } from "@/prisma/queries/users";
import { Loader2Icon } from "lucide-react";
import { AccountBase } from "plaid";
import { Suspense } from "react";

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

  const allAccounts = accountDetails?.flatMap((account) => account.accounts) ?? [];

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
  const accounts = user ? await getPlaidAccountsDetails(user.id) : null;

  let allAccounts: AccountBase[] = [];
  if (accounts) {
    allAccounts = accounts.flatMap((account) =>
      account.accounts.map((acc) => ({ ...acc, institution_id: account.item.institution_id }))
    );
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
        {user?.id && <AccountsTable userId={user.id} accounts={allAccounts} searchParams={searchParams} />}
      </Suspense>
    </>
  );
};
