import { Transactions } from "@/components/wealth/Transactions/Transactions";
import { Loader2Icon } from "lucide-react";
import { Suspense } from "react";

export default async function TransactionsPage() {
  return (
    <section className="w-full p-4">
      <Suspense fallback={<Loader2Icon className="animate-spin" />}>
        <Transactions />
      </Suspense>
    </section>
  );
}
