import { TransactionsWrapper } from "@/components/wealth/Transactions/Transactions";
import { getInitialSearchParams } from "@/lib/getInitialSearchParams";
import { SearchParams } from "@/lib/types/SearchParams";

export default async function TransactionsPage({ searchParams }: { searchParams: SearchParams }) {
  const defaultSearchParams: SearchParams = getInitialSearchParams(searchParams);
  return (
    <section className="flex h-full w-full flex-col p-4">
      <TransactionsWrapper searchParams={defaultSearchParams} />
    </section>
  );
}
