import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";

import { AppNavigationMenu } from "./AppNavigationMenu";
import { ModeToggle } from "./ModeToggle";
import { Button } from "./ui/button";

export const Header = () => (
  <header className="fixed right-0 top-0 flex w-full items-center justify-end gap-3 p-3">
    <div className="mr-auto">
      <AppNavigationMenu />
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
