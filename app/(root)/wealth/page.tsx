import { LinkTokenQuery } from "@/components/plaid/LinkTokenQuery";

export default async function Wealth() {
  return (
    <section className="p-24">
      <h1 className="text-xl font-bold">Wealth</h1>
      <p>Connect your bank accounts to get started.</p>
      <br />
      <LinkTokenQuery />
    </section>
  );
}
