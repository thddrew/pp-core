import { WealthSideMenu } from "@/components/WealthSideMenu";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <section className="flex">
      <div className="w-72">
        <WealthSideMenu />
      </div>
      <div className="flex-1">{children}</div>
    </section>
  );
}
