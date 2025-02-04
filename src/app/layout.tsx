import type { Metadata } from "next";
import "./globals.css";
import { Open_Sans } from "next/font/google";
import { Toaster } from "react-hot-toast";

import ReactQueryProvider from "@configs/ReactQueryProvider";

const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-open-sans",
});

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
      <body className={`${openSans.variable} font-sans`}>
        <ReactQueryProvider>
          <Toaster position="bottom-left" />
          {children}
        </ReactQueryProvider>
      </body>
    </html>
  );
}
