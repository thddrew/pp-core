import { AccountsWrapper } from "@/components/wealth/Accounts/Accounts";
import { SearchParams } from "@/lib/types/SearchParams";

export default function AccountsPage({ searchParams }: { searchParams: SearchParams }) {
  return (
    <section className="p-4">
      <AccountsWrapper searchParams={searchParams} />
    </section>
  );
}
