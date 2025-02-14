import type { Metadata } from "next";
import "../../app/globals.css";
import { Open_Sans } from "next/font/google";

import Header from "@/components/header";
import { cn } from "@/lib/utils";
import ReactQueryProvider from "@configs/ReactQueryProvider";

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
});

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
          openSans.className
        )}
      >
        <ReactQueryProvider>
          <Header />
          {/* <Toaster position="bottom-left" /> */}
          {children}
        </ReactQueryProvider>
      </body>
    </html>
  );
}
