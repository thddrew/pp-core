import { Header } from "@/components/Header";
import { ThemeProvider } from "@/components/ThemeProvider";
import { cn } from "@/lib/utils";
import { ClerkProvider } from "@clerk/nextjs";
import { Analytics } from "@vercel/analytics/react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { ClientProviders } from "../../components/ClientProviders";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "PP Core",
  description: "The next app",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={cn("bg-background font-sans antialiased", inter.variable)}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            <ClientProviders>
              <Header />
              <div className="h-16" />
              {children}
              <Analytics />
            </ClientProviders>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
