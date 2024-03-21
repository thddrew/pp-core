import { AccountsHeader, AccountsSummary } from "@/components/wealth/Accounts/Accounts";
import { LiabilitiesWrapper } from "@/components/wealth/Liabilities/Liabilities";
import { TransactionsTableWrapper } from "@/components/wealth/Transactions/Transactions";
import { parsePageSearchParams } from "@/lib/parsePageSearchParams";
import { getCurrentUser } from "@/lib/prisma/queries/users";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import { Loader2Icon } from "lucide-react";
import { Suspense } from "react";

export default async function Wealth({ searchParams }: { searchParams?: Record<string, string> }) {
  const user = await getCurrentUser();
  const initialSearchParams = parsePageSearchParams(searchParams);

  if (!user) {
    return (
      <section className="h-full p-4">
        <SignedOut>
          <p className="text-gray-400">You must be signed in to access your accounts.</p>
        </SignedOut>
      </section>
    );
  }

  return (
    <section className="h-full p-4">
      <SignedIn>
        <AccountsHeader />
        <div className="h-8" />
        <Suspense fallback={<Loader2Icon className="animate-spin" />}>
          <AccountsSummary />
        </Suspense>
        <div className="h-8" />
        <h2 className="text-xl font-bold">Recent Transactions</h2>
        <div className="h-8" />
        <Suspense fallback={<Loader2Icon className="animate-spin" />}>
          <TransactionsTableWrapper user={user} searchParams={initialSearchParams} />
        </Suspense>
        {/* <div className="h-8" /> */}
        {/* <LiabilitiesWrapper header="Recent Liabilities" /> */}
      </SignedIn>
      <SignedOut>
        <p className="text-gray-400">You must be signed in to access your accounts.</p>
      </SignedOut>
    </section>
  );
}
