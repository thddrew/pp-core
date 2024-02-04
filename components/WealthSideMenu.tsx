import { Button } from "@/components/ui/button";
import { HomeIcon, PiggyBankIcon } from "lucide-react";

export const WealthSideMenu = async () => {
  return (
    <nav className="h-screen p-4">
      <h1 className="text-xl font-bold">Wealth</h1>
      <div className="h-4" />
      <Button variant="ghost" className="flex w-full items-center justify-start gap-2 text-left">
        <HomeIcon className="size-5" />
        <span>Home</span>
      </Button>
      <Button variant="ghost" className="flex w-full items-center justify-start gap-2 text-left">
        <PiggyBankIcon className="size-5" />
        <span>Accounts</span>
      </Button>
      <Button variant="ghost" className="flex w-full items-center justify-start gap-2 text-left">
        <HomeIcon className="size-5" />
        <span>Transactions</span>
      </Button>
    </nav>
  );
};
