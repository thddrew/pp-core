import { TooltipProvider } from "@/components/ui/tooltip";
import { getPlaidAccountsDetails } from "@/lib/plaid/accounts";
import { getInstitutionsByUserId } from "@/lib/prisma/queries/institutions";
import { getCurrentUser } from "@/lib/prisma/queries/users";
import { SearchParams } from "@/lib/types/SearchParams";
import { AccountBaseWithInst } from "@/lib/types/plaid";
import { AccountSubtype } from "plaid";

import { OpenLinkButton } from "../LinkToken/OpenLinkButton";
import { AccountTypesFilter } from "../common/filters/AccountTypeFilter";
import { AccountCard } from "./AccountCard";
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
        <AccountCard
          title={
            <span className="flex justify-between text-base font-normal">
              <span>Total Balance</span> <span>{currency}</span>
            </span>
          }>
          <span className="text-2xl font-bold">{balance}</span>
        </AccountCard>
      </div>
    </section>
  );
};

export const AccountsFilter = async ({
  searchParams,
  accounts,
}: {
  searchParams: SearchParams;
  accounts: AccountSubtype[];
}) => {
  return (
    <div className="flex items-center gap-3">
      <div className="w-full max-w-[200px]">
        <span className="text-sm text-muted-foreground">Account Type</span>
        <div className="h-1" />
        <AccountTypesFilter searchParams={searchParams} accounts={accounts} />
      </div>
    </div>
  );
};

export const AccountsWrapper = async ({ searchParams }: { searchParams: SearchParams }) => {
  const user = await getCurrentUser();
  if (!user) return <p className="text-gray-400">User not found</p>;

  const accounts = await getPlaidAccountsDetails(user.id);
  if (!accounts) return <p className="text-gray-400">No accounts found</p>;

  const institutions = await getInstitutionsByUserId(user.id);

  const allAccounts = accounts.flatMap<AccountBaseWithInst>((account) =>
    account.accounts.map(
      (acc) =>
        ({
          ...acc,
          institution_id: account.item.institution_id,
          institution_name:
            institutions?.find((inst) => inst.institution_id === account.item.institution_id)?.name ??
            account.item.institution_id,
        }) satisfies AccountBaseWithInst
    )
  );

  const filteredAccounts = allAccounts.filter((account) => {
    if (searchParams.accountType?.includes("all")) return true;

    if (account.subtype) {
      return searchParams.accountType?.includes(account.subtype);
    }
  });

  const uniqueAccountTypes = Array.from(
    new Set(allAccounts.flatMap((account) => (account.subtype ? [account.subtype] : [])))
  );

  return (
    <TooltipProvider>
      <AccountsFilter searchParams={searchParams} accounts={uniqueAccountTypes} />
      <div className="h-8" />
      <AccountsTable userId={user.id} accounts={filteredAccounts} searchParams={searchParams} />
    </TooltipProvider>
  );
};
