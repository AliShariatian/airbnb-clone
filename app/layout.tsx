import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";

// import components
import Navbar from "@/components/navbar/Navbar";
import LoginModal from "@/components/modals/LoginModal";
import RegisterModal from "@/components/modals/RegisterModal";
import RentModal from "@/components/modals/RentModal";
import ToasterProvider from "@/providers/ToasterProvider";
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
            <Navbar currentUser={currentUser} />
            <main className="pb-20 pt-28">{children}</main>
            <ToasterProvider />
            <LoginModal />
            <RegisterModal />
            <RentModal />
         </body>
      </html>
   );
}

export default RootLayout;
