import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import MobileSidebar from "@/components/MobileSidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AIDA",
  description: "AIDA Digital Assistant for Government Query",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
       <link
        rel="icon"
        href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 10 100 100'><text y='.9em' font-size='110'>🤖</text></svg>"
      />
      <body className={`${inter.className} bg-gray-950`}>
        <MobileSidebar />
        {children}
      </body>
    </html>
  );
}
