import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";

// import components
import Navbar from "@/components/navbar/Navbar";
import RegisterModal from "@/components/modals/RegisterModal";
import ToasterProvider from "@/providers/ToasterProvider";
import LoginModal from "@/components/modals/LoginModal";
import { getCurrentUser } from "@/actions/getCurrentUser";

const fontNunito = Nunito({ subsets: ["latin-ext"] });

export const metadata: Metadata = {
   title: "Airbnb",
   description: "Airbnb website clone with next.js",
};

async function RootLayout({ children }: { children: React.ReactNode }) {
   const currentUser = await getCurrentUser();
   return (
      <html lang="en">
         <body className={fontNunito.className}>
            <ToasterProvider />
            <LoginModal />
            <RegisterModal />
            <Navbar currentUser={currentUser} />
            {children}
         </body>
      </html>
   );
}

export default RootLayout;
