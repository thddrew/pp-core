import { AccountsHeader, AccountsSummary, AccountsWrapper } from "@/components/wealth/Accounts/Accounts";
import { parsePageSearchParams } from "@/lib/parsePageSearchParams";
import { Loader2Icon } from "lucide-react";
import { Suspense } from "react";

export default function AccountsPage({ searchParams }: { searchParams: Record<string, string> }) {
  const initialSearchParams = parsePageSearchParams(searchParams);

  return (
    <section className="p-4">
      <AccountsHeader />
      <div className="h-8" />
      <Suspense fallback={<Loader2Icon className="animate-spin" />}>
        <AccountsSummary />
      </Suspense>
      <div className="h-16" />
      <Suspense fallback={<Loader2Icon className="animate-spin" />}>
        <AccountsWrapper searchParams={initialSearchParams} />
      </Suspense>
    </section>
  );
}
