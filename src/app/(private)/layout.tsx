import type { Metadata } from "next";
import "../../app/globals.css";
import { Inter } from "next/font/google";

import Header from "@/components/header";
import { Toaster } from "@/components/ui/toaster";
import { cn } from "@/lib/utils";
import ReactQueryProvider from "@configs/ReactQueryProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Playzy - Play With Us",
  description: "GG?",
};

export default function PrivateLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          inter.className
        )}
      >
        <ReactQueryProvider>
          <Header />
          {children}
          <Toaster />
        </ReactQueryProvider>
      </body>
    </html>
  );
}
