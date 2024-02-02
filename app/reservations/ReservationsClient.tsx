"use client";

import toast from "react-hot-toast";
import axios from "axios";
import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";

import Heading from "@/components/Heading";
import Container from "@/components/Container";
import ListingCard from "@/components/listings/ListingCard";

import { SafeReservation, SafeUser } from "@/types";

interface ReservationsClientProps {
   reservations: SafeReservation[];
   currentUser?: SafeUser | null;
}

const ReservationsClient: React.FC<ReservationsClientProps> = ({ currentUser, reservations }) => {
   const router = useRouter();
   const [deletingId, setDeletingId] = useState("");

   const onCancel = useCallback(
      (id: string) => {
         setDeletingId(id);

         axios
            .delete(`/api/reservations/${id}`)
            .then(() => {
               toast.success("Reservation cancelled.");
               router.refresh();
            })
            .catch(() => {
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
         <Heading title="Reservations" subTitle="Bookings on your properties" />
         <section className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
            {reservations.map((item) => (
               <ListingCard
                  key={item.id}
                  data={item.listing}
                  reservation={item}
                  actionId={item.id}
                  onAction={onCancel}
                  disabled={deletingId === item.id}
                  actionLabel="Cancel guest reservation"
                  currentUser={currentUser}
               />
            ))}
         </section>
      </Container>
   );
};

export default ReservationsClient;
