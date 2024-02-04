import { OpenLinkButton } from "@/components/plaid/OpenLinkButton";
import { SignedIn, SignedOut } from "@clerk/nextjs";

export default async function Wealth() {
  return (
    <section className="p-24">
      <h1 className="text-xl font-bold">Wealth</h1>
      <p>Connect your bank accounts to get started.</p>
      <br />
      <SignedIn>
        <OpenLinkButton />
      </SignedIn>
      <SignedOut>
        <i>Not signed in</i>
      </SignedOut>
    </section>
  );
}
