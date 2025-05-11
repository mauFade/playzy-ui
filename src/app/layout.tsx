import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";

import { Toaster } from "@/components/ui/sonner";
import ReactQueryProvider from "@configs/ReactQueryProvider";
import { AuthContextProvider } from "@/context/auth-context";
import { ChatContextProvider } from "@/context/chat-context";

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
        <AuthContextProvider>
          <ChatContextProvider>
            <ReactQueryProvider>
              {children}
              <Toaster />
            </ReactQueryProvider>
          </ChatContextProvider>
        </AuthContextProvider>
      </body>
    </html>
  );
}
