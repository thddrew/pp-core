"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { exchangePublicToken, getLinkToken } from "@/lib/plaid/link-token";
import { DollarSignIcon, Loader2Icon, PiggyBankIcon } from "lucide-react";
import { Products } from "plaid";
import { useEffect, useState } from "react";
import { usePlaidLink } from "react-plaid-link";

export const OpenLinkButton = () => {
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState<string | null>(null);

  const { open } = usePlaidLink({
    onSuccess: async (public_token, metadata) => {
      setToken(null);
      // TODO: use the metadata to prefetch the account data
      const response = await exchangePublicToken(public_token);
      // TODO: check for duplicate accounts
    },
    token,
  });

  const onGetToken = async (products: Products[]) => {
    setLoading(true);
    const token = await getLinkToken(products);

    if (token) {
      setToken(token);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (token) {
      open();
    }
  }, [open, token]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Add</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[200px]">
        <DropdownMenuLabel>Type of account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="p-2"
          onClick={() => {
            onGetToken([Products.Auth]);
          }}>
          <PiggyBankIcon className="mr-2 size-5" />
          <span>Bank</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          className="p-2"
          onClick={() => {
            onGetToken([Products.Investments, Products.Auth]);
          }}>
          <DollarSignIcon className="mr-2 size-5" />
          <span>Investment</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
