import {
  AccountsHeader,
  AccountsSummary,
  AccountsTablesWrapper,
} from "@/components/wealth/Accounts/Accounts";
import { getInitialSearchParams } from "@/lib/getInitialSearchParams";
import { Loader2Icon } from "lucide-react";
import { Suspense } from "react";

export default function AccountsPage({ searchParams }: { searchParams: Record<string, string> }) {
  const initialSearchParams = getInitialSearchParams(searchParams);

  return (
    <section className="p-4">
      <AccountsHeader />
      <div className="h-8" />
      <Suspense fallback={<Loader2Icon className="animate-spin" />}>
        <AccountsSummary />
      </Suspense>
      <div className="h-16" />
      <Suspense fallback={<Loader2Icon className="animate-spin" />}>
        <AccountsTablesWrapper searchParams={initialSearchParams} />
      </Suspense>
    </section>
  );
}
