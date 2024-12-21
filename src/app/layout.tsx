import type { Metadata } from "next";
import "./globals.css";
import ReactQueryProvider from "@configs/ReactQueryProvider";

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
        <ReactQueryProvider>{children}</ReactQueryProvider>
      </body>
    </html>
  );
}
