import { getCurrentUser } from "@/actions/getCurrentUser";
import EmptyState from "@/components/EmptyState";
import { getFavoriteListings } from "@/actions/getFavoriteListings";
import FavoritesClient from "./FavoritesClient";

const FavoritesPage = async () => {
   const currentUser = await getCurrentUser();
   const favoriteListings = await getFavoriteListings();

   if (favoriteListings.length === 0) {
      return <EmptyState title="No favorites found" subTitle="Looks like you haven't favorite listing." />;
   }

   return <FavoritesClient favoriteListings={favoriteListings} currentUser={currentUser} />;
};

export default FavoritesPage;
