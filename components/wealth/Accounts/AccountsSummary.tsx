"use client";

import { OpenLinkButton } from "../LinkToken/OpenLinkButton";
import { SummaryCard } from "../SummaryCard";
import { useLinkedAccountsQuery } from "./useLinkedAccountsQuery";

type AccountsSummaryProps = {
  userId: string;
};

export const AccountsSummary = ({ userId }: AccountsSummaryProps) => {
  const { data } = useLinkedAccountsQuery(userId);

  const summaryData = data ?? { accounts: [] };

  const { total, currency } = summaryData.accounts.reduce(
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
    <>
      <div className="flex items-center gap-3">
        <h2 className="text-xl font-bold">Account Summary</h2>
        <OpenLinkButton />
      </div>
      <div className="h-8" />
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
    </>
  );
};