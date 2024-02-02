"use client";

import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { SafeReservation, SafeUser } from "@/types";
import axios from "axios";
import Container from "@/components/Container";
import Heading from "@/components/Heading";
import ListingCard from "@/components/listings/ListingCard";
import toast from "react-hot-toast";

interface TripsClientProps {
   reservations: SafeReservation[];
   currentUser?: SafeUser | null;
}

const TripsClient: React.FC<TripsClientProps> = ({ currentUser, reservations }) => {
   const [deletingId, setDeletingId] = useState("");
   const router = useRouter();

   const onCancel = useCallback(
      (id: string) => {
         setDeletingId(id);

         axios
            .delete(`/api/reservations/${id}`)
            .then(() => {
               toast.success("Reservation cancelled");
               router.refresh();
            })
            .catch((err) => {
               toast.error("Something went wrong!");
            })
            .finally(() => {
               setDeletingId("");
            });
      },
      [router]
   );

   return (
      <Container>
         <Heading title="Trips" subTitle="Where you're been and where you're going" />
         <section className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
            {reservations.map((item) => (
               <ListingCard
                  key={item.id}
                  data={item.listing}
                  reservation={item}
                  actionId={item.id}
                  onAction={onCancel}
                  disabled={deletingId === item.id}
                  actionLabel="Cancel reservation"
                  currentUser={currentUser}
               />
            ))}
         </section>
      </Container>
   );
};

export default TripsClient;
