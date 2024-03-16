import { Transactions } from "@/components/wealth/Transactions/Transactions";
import { parsePageSearchParams } from "@/lib/getInitialSearchParams";
import { SearchParams } from "@/lib/types/SearchParams";
import { Loader2Icon } from "lucide-react";
import { Suspense } from "react";

export default async function TransactionsPage({ searchParams }: { searchParams?: Record<string, string> }) {
  const defaultSearchParams = parsePageSearchParams(searchParams);

  return (
    <section className="flex h-full w-full flex-col p-4">
      <h2 className="text-xl font-bold">Transactions</h2>
      <div className="h-8" />
      <Suspense fallback={<Loader2Icon className="animate-spin" />}>
        <Transactions searchParams={defaultSearchParams} />
      </Suspense>
    </section>
  );
}
