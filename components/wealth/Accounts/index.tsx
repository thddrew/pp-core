import { getLinkedAccountsForUser } from "@/lib/plaid/accounts";
import { SignedIn } from "@clerk/nextjs";
import { DollarSignIcon } from "lucide-react";

import { OpenLinkButton } from "../LinkToken/OpenLinkButton";
import { SummaryCard } from "../SummaryCard";

export const Accounts = async () => {
  // TODO: How to handle top level server action errors
  try {
    const { accounts } = await getLinkedAccountsForUser();

    return (
      <div>
        <div className="flex items-center gap-3">
          <h2 className="text-xl font-bold">Accounts</h2>
          <OpenLinkButton />
        </div>
        <div className="h-8" />
        <section className="flex gap-3">
          {accounts.map((account) => (
            <div key={account.account_id} className="basis-72">
              <SummaryCard title={account.name} description={<span>Ends with {account.mask}</span>}>
                {account.balances.current?.toLocaleString("en-US", {
                  style: "currency",
                  currency: account.balances.iso_currency_code ?? "CAD",
                })}
              </SummaryCard>
            </div>
          ))}
        </section>
      </div>
    );
  } catch (err) {
    return <div>{err.message}</div>;
  }
};
