import { SideMenu } from "@/components/wealth/SideMenu";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <section className="flex">
      <div className="w-72">
        <SideMenu />
      </div>
      <div className="flex-1">{children}</div>
    </section>
  );
}
