import { getPlaidAccountsDetails } from "@/lib/plaid/accounts";
import { getCurrentUser } from "@/prisma/queries/users";
import { Loader2Icon } from "lucide-react";
import { Suspense } from "react";

import { OpenLinkButton } from "../LinkToken/OpenLinkButton";
import { SummaryCard } from "../SummaryCard";

const AccountsSummary = async () => {
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

export const AccountsWrapper = async () => (
  <>
    <div className="flex items-center gap-3">
      <h2 className="text-xl font-bold">Account Summary</h2>
      <OpenLinkButton />
    </div>
    <div className="h-8" />
    <Suspense fallback={<Loader2Icon className="animate-spin" />}>
      <AccountsSummary />
    </Suspense>
  </>
);
