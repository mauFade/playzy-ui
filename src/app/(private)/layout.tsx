import { Inter } from "next/font/google";
import type React from "react";
import "../../app/globals.css";

import Header from "@/components/header";
import { Toaster } from "@/components/ui/toaster";
import { cn } from "@/lib/utils";
import ReactQueryProvider from "@configs/ReactQueryProvider";

const inter = Inter({ subsets: ["latin"] });

export default function PrivateLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ReactQueryProvider>
      <div
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          inter.className
        )}
      >
        <Header />
        <main>
          {children}
          <Toaster />
        </main>
      </div>
    </ReactQueryProvider>
  );
}
