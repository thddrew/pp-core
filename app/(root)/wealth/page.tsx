import { Accounts } from "@/components/plaid/Accounts/Accounts";
import { OpenLinkButton } from "@/components/plaid/LinkToken/OpenLinkButton";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import { Suspense } from "react";

export default async function Wealth() {
  return (
    <section className="w-full p-4">
      <h1 className="text-xl font-bold">Wealth</h1>
      <p>Connect your bank accounts to get started.</p>
      <br />
      <SignedIn>
        <OpenLinkButton />
      </SignedIn>
      <SignedOut>
        <i>Not signed in</i>
      </SignedOut>
      <div className="h-12" />
      <Suspense fallback={<div>Loading accounts...</div>}>
        <Accounts />
      </Suspense>
    </section>
  );
}
