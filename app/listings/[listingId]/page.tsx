import { getCurrentUser } from "@/actions/getCurrentUser";
import { getListingById } from "@/actions/getListingById";
import EmptyState from "@/components/EmptyState";
import ListingClient from "./ListingClient";
import getReservations from "@/actions/getReservations";

interface Params {
   listingId?: string;
}

const ListingSinglePage = async ({ params }: { params: Params }) => {
   const listing = await getListingById(params);
   const currentUser = await getCurrentUser();
   const reservations = await getReservations(params);

   if (!listing) {
      return <EmptyState />;
   }

   return <ListingClient listing={listing} currentUser={currentUser} reservations={reservations} />;
};

export default ListingSinglePage;
