"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

const buttonClasses = "bg-transparent text-gray-400 hover:bg-transparent hover:text-gray-50";

type SideMenuLinkProps = {
  href: string;
  children: React.ReactNode;
};

export const SideMenuLink = ({ href, children }: SideMenuLinkProps) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Button
      asChild
      variant={isActive ? "secondary" : "ghost"}
      className={cn("w-full justify-start", isActive ? "" : buttonClasses)}>
      <Link href={href}>{children}</Link>
    </Button>
  );
};
