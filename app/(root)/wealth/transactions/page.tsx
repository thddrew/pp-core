import { TransactionsWrapper } from "@/components/wealth/Transactions/Transactions";
import { getInitialSearchParams } from "@/lib/getInitialSearchParams";
import { SearchParams } from "@/lib/types/SearchParams";

export default async function TransactionsPage({ searchParams }: { searchParams: SearchParams }) {
  const defaultSearchParams: SearchParams = getInitialSearchParams(searchParams);
  return (
    <section className="w-full p-4">
      <TransactionsWrapper searchParams={defaultSearchParams} />
    </section>
  );
}
