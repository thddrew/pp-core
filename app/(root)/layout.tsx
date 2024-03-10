import { Header } from "@/components/Header";
import { ThemeProvider } from "@/components/ThemeProvider";
import { cn } from "@/lib/utils";
import { HydrationOverlay } from "@builder.io/react-hydration-overlay";
import { ClerkProvider } from "@clerk/nextjs";
import { Analytics } from "@vercel/analytics/react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { ClientProviders } from "../../components/ClientProviders";
import "../globals.css";

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
              <HydrationOverlay>
                <main className="mx-auto max-w-screen-2xl">
                  <Header />
                  <div className="h-16" />
                  {children}
                </main>
              </HydrationOverlay>
              <Analytics />
            </ClientProviders>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
