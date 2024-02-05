import { Accounts } from "@/components/wealth/Accounts/Accounts";
import { Transactions } from "@/components/wealth/Transactions/Transactions";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import { Loader2Icon } from "lucide-react";
import { Suspense } from "react";

export default async function Wealth() {
  return (
    <section className="w-full p-4">
      <SignedIn>
        <Suspense fallback={<Loader2Icon className="animate-spin" />}>
          <Accounts />
        </Suspense>
        <div className="h-8" />
        <Suspense fallback={<Loader2Icon className="animate-spin" />}>
          <Transactions />
        </Suspense>
      </SignedIn>
      <SignedOut>
        <p className="text-gray-400">You must be signed in to access your accounts.</p>
      </SignedOut>
    </section>
  );
}
