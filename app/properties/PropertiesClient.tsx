"use client";

import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { SafeListing, SafeReservation, SafeUser } from "@/types";
import axios from "axios";
import Container from "@/components/Container";
import Heading from "@/components/Heading";
import ListingCard from "@/components/listings/ListingCard";
import toast from "react-hot-toast";

interface PropertiesClientProps {
   listings: SafeListing[];
   currentUser?: SafeUser | null;
}

const PropertiesClient: React.FC<PropertiesClientProps> = ({ currentUser, listings }) => {
   const [deletingId, setDeletingId] = useState("");
   const router = useRouter();

   const onCancel = useCallback(
      (id: string) => {
         setDeletingId(id);

         axios
            .delete(`/api/listings/${id}`)
            .then(() => {
               toast.success("Listing deleted");
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
         <Heading title="Properties" subTitle="List of your properties" />
         <section className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
            {listings.map((item) => (
               <ListingCard key={item.id} data={item} actionId={item.id} onAction={onCancel} disabled={deletingId === item.id} actionLabel="Delete properties" currentUser={currentUser} />
            ))}
         </section>
      </Container>
   );
};

export default PropertiesClient;
