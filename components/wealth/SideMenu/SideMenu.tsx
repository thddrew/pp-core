import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { UnfoldHorizontalIcon } from "lucide-react";
import { Suspense } from "react";

import { routes } from "../routes";
import { SideMenuLink } from "./SideMenuLink";

type SideMenuProps = {
  onCollapse: () => void;
  isCollapsed?: boolean;
};

export const SideMenu = ({ onCollapse, isCollapsed }: SideMenuProps) => (
  <nav className="flex h-full flex-col p-4">
    <h2 className={cn("text-xl font-bold", isCollapsed ? "px-0 text-center" : "px-4")}>
      {isCollapsed ? "W" : "Wealth"}
    </h2>
    <div className="h-4" />
    <div className="flex flex-1 flex-col space-y-2">
      <Suspense fallback={<div>Loading links...</div>}>
        {routes.map((route) => (
          <SideMenuLink
            key={route.label}
            href={route.href}
            className={isCollapsed ? "justify-center p-0" : ""}>
            <route.icon className={cn("size-5", !isCollapsed && "mr-2")} />
            {!isCollapsed && route.label}
          </SideMenuLink>
        ))}
        <Button
          variant="ghost"
          onClick={onCollapse}
          className={cn("!mt-auto w-full", isCollapsed ? "justify-center px-0" : "justify-start")}>
          <UnfoldHorizontalIcon className={cn("size-5", !isCollapsed && "mr-2")} />
          {!isCollapsed && "Minimize Menu"}
        </Button>
      </Suspense>
    </div>
  </nav>
);
