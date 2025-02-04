import type { Metadata } from "next";
import "../../app/globals.css";
import { Open_Sans } from "next/font/google";
import { Toaster } from "react-hot-toast";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
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

export default function PrivateLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${openSans.variable} font-sans`}>
        <ReactQueryProvider>
          <Header />
          <Toaster position="bottom-left" />

          {children}

          <Footer />
        </ReactQueryProvider>
      </body>
    </html>
  );
}
