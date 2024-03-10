import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ReactNode } from "react";

type AccountCardProps = {
  title: ReactNode;
  description?: ReactNode;
  children: ReactNode;
};

export const AccountCard = async ({ title, description, children }: AccountCardProps) => (
  <Card>
    <CardHeader>
      <CardTitle>{title}</CardTitle>
      <CardDescription>{description}</CardDescription>
    </CardHeader>
    <CardContent>{children}</CardContent>
  </Card>
);
