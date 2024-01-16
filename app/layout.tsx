import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";

// import components
import Navbar from "@/components/navbar/Navbar";

const fontNunito = Nunito({ subsets: ["latin-ext"] });

export const metadata: Metadata = {
   title: "Airbnb",
   description: "Airbnb website clone with next.js",
};

function RootLayout({ children }: { children: React.ReactNode }) {
   return (
      <html lang="en">
         <body className={fontNunito.className}>
            <Navbar />
            {children}
         </body>
      </html>
   );
}

export default RootLayout;
