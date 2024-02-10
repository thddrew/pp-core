import { SideMenu } from "@/components/wealth/SideMenu/SideMenu";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <section className="flex h-[calc(100dvh-64px)]">
      <div className="w-72">
        <SideMenu />
      </div>
      <div className="flex-1 overflow-auto">{children}</div>
    </section>
  );
}
