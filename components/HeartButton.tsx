"use client";

import useFavorite from "@/hooks/useFavorite";
import { SafeUser } from "@/types";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

interface HeartButtonProps {
   listingId: string;
   currentUser?: SafeUser | null;
}
const HeartButton: React.FC<HeartButtonProps> = ({ listingId, currentUser }) => {
   const { hasFavorite, toggleFavorite } = useFavorite({ listingId, currentUser });

   return (
      <span onClick={toggleFavorite} className="relative hover:opacity-80 transition cursor-pointer shadow">
         <AiOutlineHeart title={hasFavorite ? "Remove from your Favorite" : "Add to your Favorite"} size={28} className="fill-white absolute -top-[2px] -right-[1px]" />
         <AiFillHeart size={24} className={hasFavorite ? "fill-rose-500" : "fill-neutral-500/70"} />
      </span>
   );
};

export default HeartButton;
