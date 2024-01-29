import axios from "axios";
import { useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

import { SafeUser } from "@/types";
import useLoginModal from "./useLoginModal";

interface UseFavorite {
   listingId: string;
   currentUser?: SafeUser | null;
}

const useFavorite = ({ listingId, currentUser }: UseFavorite) => {
   const router = useRouter();
   const loginModal = useLoginModal();

   const hasFavorite = useMemo(() => {
      const list = currentUser?.favoriteIds || [];

      return list.includes(listingId);
   }, [currentUser, listingId]);

   const toggleFavorite = useCallback(
      async (event: React.MouseEvent<HTMLSpanElement>) => {
         event.stopPropagation();

         if (!currentUser) {
            return loginModal.onOpen();
         }

         try {
            let request;

            if (hasFavorite) {
               // delete if exist
               request = () => axios.delete(`/api/favorite/${listingId}`);
            } else {
               // add if not exist
               request = () => axios.post(`/api/favorite/${listingId}`);
            }

            await request();
            toast.success("Success");
         } catch (error) {
            toast.error("Something went wrong!");
         }
      },
      [currentUser, hasFavorite, listingId, loginModal, router]
   );

   return {
      hasFavorite,
      toggleFavorite,
   };
};

export default useFavorite;
