"use client";

import { Button } from "@/components/ui/button";
import { usePlaidLink } from "react-plaid-link";

import { usePlaidLinkQuery } from "./usePlaidLinkQuery";

type OpenLinkButtonProps = {
  linkToken: string;
};

export const PlaidLinkWrapper = () => {
  const { data } = usePlaidLinkQuery();

  if (data) {
    return <OpenLinkButton linkToken={data} />;
  }

  return "Link token is not available.";
};

export const OpenLinkButton = ({ linkToken }: OpenLinkButtonProps) => {
  const { open } = usePlaidLink({
    onSuccess: (public_token, metadata) => {
      console.log("onSuccess", public_token, metadata);
      // TODO: check for duplicate accounts
    },
    token: linkToken,
  });

  return (
    <Button
      onClick={() => {
        open();
      }}>
      Link account
    </Button>
  );
};
