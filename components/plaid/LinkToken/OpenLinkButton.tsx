"use client";

import { Button } from "@/components/ui/button";
import { exchangePublicToken, getLinkToken } from "@/lib/plaid/link-token";
import { Loader2Icon } from "lucide-react";
import { useEffect, useState } from "react";
import { usePlaidLink } from "react-plaid-link";

export const OpenLinkButton = () => {
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState<string | null>(null);

  const { open } = usePlaidLink({
    onSuccess: async (public_token, metadata) => {
      setToken(null);
      console.log("onSuccess", public_token, metadata);
      // TODO: use the metadata to prefetch the account data
      const response = await exchangePublicToken(public_token);
      // TODO: check for duplicate accounts
    },
    token,
  });

  const onGetToken = async () => {
    setLoading(true);
    const token = await getLinkToken();

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
    <Button
      className="gap-2"
      onClick={() => {
        onGetToken();
      }}>
      {loading ? <Loader2Icon className="animate-spin" /> : null}
      Link account
    </Button>
  );
};
