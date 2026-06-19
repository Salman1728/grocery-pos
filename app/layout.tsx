import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { FlexposSidebar } from "@/components/flexpos-sidebar";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FlexPOS",
  description: "Multi-purpose POS platform for grocery, cafe, retail, pharmacy, and service businesses",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <FlexposSidebar />
        <div className="lg:pl-72">{children}</div>
      </body>
    </html>
  );
}
