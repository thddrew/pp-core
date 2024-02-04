import { Accounts } from "@/components/wealth/Accounts";
import { Transactions } from "@/components/wealth/Transactions";
import { Suspense } from "react";

export default async function Wealth() {
  return (
    <section className="w-full p-4">
      <Suspense fallback={<div>Loading accounts...</div>}>
        <Accounts />
      </Suspense>
      <div className="h-8" />
      <Suspense fallback={<div>Loading transactions...</div>}>
        <Transactions />
      </Suspense>
    </section>
  );
}
