"use client";

import React, { useCallback, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import Avatar from "../Avatar";
import MenuItem from "./MenuItem";
import { SafeUser } from "@/types";
import { signOut } from "next-auth/react";

import useRegisterModal from "@/hooks/useRegisterModal";
import useLoginModal from "@/hooks/useLoginModal";
import useRentModal from "@/hooks/useRentModal";

interface UserMenuProps {
   currentUser?: SafeUser | null;
}

const userMenuItemsHaveLink = [
   { href: "/trips", label: "My trips" },
   { href: "/favorites", label: "My favorites" },
   { href: "/reservations", label: "My reservations" },
   { href: "/properties", label: "My properties" },
];

const UserMenu: React.FC<UserMenuProps> = ({ currentUser }) => {
   const [menuIsOpen, setMenuIsOpen] = useState(false);

   const registerModal = useRegisterModal();
   const loginModal = useLoginModal();
   const rentModal = useRentModal();

   // toggle for open and close sub-menu
   const toggleOpenMenu = useCallback(() => {
      setMenuIsOpen((value) => !value);
   }, []);

   const onRent = useCallback(() => {
      if (!currentUser) {
         loginModal.onOpen();
         return;
      }
      rentModal.onOpen();
   }, [currentUser, loginModal, rentModal]);

   return (
      <div className="relative">
         <div className="flex items-center gap-3">
            <div onClick={onRent} className="hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer">
               Airbnb your home
            </div>
            <div onClick={toggleOpenMenu} className="p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition">
               <AiOutlineMenu />
               <div className="hidden md:block">
                  <Avatar src={currentUser?.image} />
               </div>
            </div>
         </div>

         {/* sub-menu */}
         {menuIsOpen && (
            <>
               <div onClick={toggleOpenMenu} className="fixed inset-0"></div>
               <div className="absolute right-0 top-14 md:top-12 rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white overflow-hidden text-sm">
                  <ul className="flex flex-col cursor-pointer">
                     {currentUser ? (
                        <>
                           {userMenuItemsHaveLink.map(({ href, label }) => (
                              <MenuItem href={href} label={label} />
                           ))}

                           <MenuItem onClick={rentModal.onOpen} label="Airbnb my home" />
                           <hr />
                           <MenuItem onClick={() => signOut()} label="Logout" />
                        </>
                     ) : (
                        <>
                           <MenuItem onClick={loginModal.onOpen} label="Login" />
                           <MenuItem onClick={registerModal.onOpen} label="Sign up" />
                        </>
                     )}
                  </ul>
               </div>
            </>
         )}
      </div>
   );
};

export default UserMenu;
