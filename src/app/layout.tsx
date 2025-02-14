import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";

import { Toaster } from "@/components/ui/toaster";
import ReactQueryProvider from "@configs/ReactQueryProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Playzy - Play With Us",
  description: "GG?",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        <ReactQueryProvider>
          {children}
          <Toaster />
        </ReactQueryProvider>
      </body>
    </html>
  );
}
