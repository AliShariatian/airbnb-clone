import { getCurrentUser } from "@/actions/getCurrentUser";
import EmptyState from "@/components/EmptyState";
import getReservations from "@/actions/getReservations";
import ReservationsClient from "./ReservationsClient";

const ReservationPage = async () => {
   const currentUser = await getCurrentUser();

   if (!currentUser) {
      return <EmptyState title="Unauthorized!" subTitle="Please login" />;
   }

   const reservations = await getReservations({ authorId: currentUser.id });

   if (reservations.length === 0) {
      return <EmptyState title="No reservations found" subTitle="Looks like you haven't reservations on your properties." />;
   }

   return <ReservationsClient reservations={reservations} currentUser={currentUser} />;
};

export default ReservationPage;
