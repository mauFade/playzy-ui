import type { Metadata } from "next";
import "./globals.css";
import ReactQueryProvider from "@configs/ReactQueryProvider";
import { Toaster } from "react-hot-toast";

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
    <html lang="en">
      <body>
        <ReactQueryProvider>
          <Toaster position="bottom-left" />
          {children}
        </ReactQueryProvider>
      </body>
    </html>
  );
}
