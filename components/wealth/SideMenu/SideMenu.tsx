import { HomeIcon, PiggyBankIcon } from "lucide-react";
import { Suspense } from "react";

import { SideMenuLink } from "./SideMenuLink";

export const SideMenu = () => (
  <nav className="p-4">
    <h2 className="text-xl font-bold">Wealth</h2>
    <div className="h-4" />
    <div className="space-y-2">
      <Suspense fallback={<div>Loading links...</div>}>
        <SideMenuLink href="/wealth">
          <HomeIcon className="mr-2 size-5" />
          Home
        </SideMenuLink>
        <SideMenuLink href="/wealth/accounts">
          <PiggyBankIcon className="mr-2 size-5" />
          Accounts
        </SideMenuLink>
        <SideMenuLink href="/wealth/transactions">
          <HomeIcon className="mr-2 size-5" />
          Transactions
        </SideMenuLink>
        {/* <SideMenuLink href="/wealth/liabilities">
          <HomeIcon className="mr-2 size-5" />
          Liabilities
        </SideMenuLink> */}
      </Suspense>
    </div>
  </nav>
);
