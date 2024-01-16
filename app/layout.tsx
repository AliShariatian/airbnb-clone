import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";

const fontNunito = Nunito({ subsets: ["latin"] });

export const metadata: Metadata = {
   title: "Airbnb",
   description: "Airbnb website clone with next.js",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
   return (
      <html lang="en">
         <body className={fontNunito.className}>{children}</body>
      </html>
   );
}

