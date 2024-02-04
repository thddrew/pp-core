import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ReactNode } from "react";

type SummaryCardProps = {
  title: ReactNode;
  description: ReactNode;
  children: ReactNode;
};

export const SummaryCard = async ({ title, description, children }: SummaryCardProps) => (
  <Card>
    <CardHeader>
      <CardTitle>{title}</CardTitle>
      <CardDescription>{description}</CardDescription>
    </CardHeader>
    <CardContent>{children}</CardContent>
  </Card>
);
