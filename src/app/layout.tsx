import MobileTopBar from "@/components/sections/MobileTopBar";
import TopBar from "@/components/sections/TopBar";
import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import ReactQueryProvider from "@/lib/query-provider";

const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Dapp Book",
  description: "A collection of all your dapp books",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className={`${montserrat.className} antialiased`}>
        <ReactQueryProvider>
          <div className="min-h-screen flex flex-col">
            <TopBar />
            <MobileTopBar />
            {children}
          </div>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
