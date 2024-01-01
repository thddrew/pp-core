import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";

import { ModeToggle } from "./ModeToggle";
import { Button } from "./ui/button";

export const Header = () => (
  <header className="flex justify-end gap-3 p-3">
    <ModeToggle />
    <SignedIn>
      <UserButton afterSignOutUrl="/" />
    </SignedIn>
    <SignedOut>
      <SignInButton>
        <Button variant="outline">Sign in</Button>
      </SignInButton>
    </SignedOut>
  </header>
);
