"use client";

import { AiOutlineMenu } from "react-icons/ai";
import Avatar from "../Avatar";
import { useCallback, useState } from "react";
import MenuItem from "./MenuItem";
import useRegisterModal from "@/hooks/useRegisterModal";
import useLoginModal from "@/hooks/useLoginModal";

const UserMenu = () => {
   const [menuIsOpen, setMenuIsOpen] = useState(false);
   const registerModal = useRegisterModal();
   const loginModal = useLoginModal();

   // toggle for open and close sub-menu
   const toggleOpenMenu = useCallback(() => {
      setMenuIsOpen((value) => !value);
   }, []);

   return (
      <div className="relative">
         <div className="flex items-center gap-3">
            <div onClick={() => {}} className="hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer">
               Airbnb your home
            </div>
            <div onClick={toggleOpenMenu} className="p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition">
               <AiOutlineMenu />
               <div className="hidden md:block">
                  <Avatar />
               </div>
            </div>
         </div>

         {/* sub-menu */}
         {menuIsOpen && (
            <>
               <div onClick={toggleOpenMenu} className="fixed inset-0"></div>
               <div className="absolute right-0 top-14 md:top-12 rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white overflow-hidden text-sm">
                  <ul className="flex flex-col cursor-pointer">
                     <MenuItem onClick={loginModal.onOpen} label="Login" />
                     <MenuItem onClick={registerModal.onOpen} label="Sign up" />
                  </ul>
               </div>
            </>
         )}
      </div>
   );
};

export default UserMenu;
