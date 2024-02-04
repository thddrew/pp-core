import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";

import { AppSwitcherMenu } from "./AppSwitcherMenu";
import { ModeToggle } from "./ModeToggle";
import { Button } from "./ui/button";

export const Header = () => (
  <header className="fixed right-0 top-0 z-50 flex w-full items-center justify-end gap-3 p-3">
    <div className="mr-auto">
      <AppSwitcherMenu />
    </div>
    <ModeToggle />
    <SignedIn>
      <UserButton afterSignOutUrl="/wealth" />
    </SignedIn>
    <SignedOut>
      <SignInButton mode="modal" redirectUrl="/wealth">
        <Button variant="outline">Sign in</Button>
      </SignInButton>
    </SignedOut>
  </header>
);
