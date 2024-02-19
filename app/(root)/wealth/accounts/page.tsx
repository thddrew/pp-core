import { AccountsWrapper } from "@/components/wealth/Accounts/Accounts";
import { getInitialSearchParams } from "@/lib/getInitialSearchParams";
import { SearchParams } from "@/lib/types/SearchParams";

export default function AccountsPage({ searchParams }: { searchParams: Record<string, string> }) {
  const initialSearchParams = getInitialSearchParams(searchParams);

  return (
    <section className="p-4">
      <AccountsWrapper searchParams={initialSearchParams} />
    </section>
  );
}
