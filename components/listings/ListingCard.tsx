"use client";

import { useCallback, useMemo } from "react";
import useCountries from "@/hooks/useCountries";

import { SafeListing, SafeReservation, SafeUser } from "@/types";
import { format } from "date-fns";
import Image from "next/image";
import HeartButton from "../HeartButton";
import Link from "next/link";
import Button from "../Button";

interface ListingCardProps {
   data: SafeListing;
   onAction?: (id: string) => void;
   disabled?: boolean;
   actionLabel?: string;
   actionId?: string;
   reservation?: SafeReservation;
   currentUser?: SafeUser | null;
}

const ListingCard: React.FC<ListingCardProps> = ({ data, onAction, disabled, actionLabel, actionId = "", reservation, currentUser }) => {
   const { getByValue } = useCountries();

   const location = getByValue(data.locationValue);

   const cancelHandler = useCallback(
      (event: React.MouseEvent<HTMLButtonElement>) => {
         event.stopPropagation();

         if (disabled) {
            return;
         }

         onAction?.(actionId);
      },
      [disabled, onAction, actionId]
   );

   const price = useMemo(() => {
      if (reservation) {
         return reservation.totalPrice;
      }

      return data.price;
   }, [reservation, data.price]);

   const reservationData = useMemo(() => {
      if (!reservation) {
         return null;
      }

      const start = new Date(reservation.startDate);
      const end = new Date(reservation.endDate);

      return `${format(start, "PP")} - ${format(end, "PP")}`;
   }, [reservation]);

   // -------------------
   return (
      <div className="col-span-1 group">
         <div className="flex flex-col gap-2 w-full">
            <div className="aspect-square rounded-xl overflow-hidden relative w-full">
               <Link href={`/listings/${data.id}`} title="Read More">
                  <Image fill alt={data.title} src={data.imageSrc} className="object-cover size-full transition group-hover:scale-110" />
               </Link>
               <div className="absolute top-3 right-3 select-none">
                  <HeartButton listingId={data.id} currentUser={currentUser}/>
               </div>
            </div>
            <Link href={`/listings/${data.id}`} title="Read More" className="w-fit">
               <span className="font-semibold text-lg w-fit">
                  {location?.region}, {location?.label}
               </span>
            </Link>
            <div className="font-light text-neutral-500">{reservationData || data.category}</div>
            <div className="flex items-center gap-1">
               <span className="font-semibold">$ {price}</span>
               {!reservation && <div className="font-light">night</div>}
            </div>
            {onAction && actionLabel && <Button disabled={disabled} small label={actionLabel} onClick={cancelHandler} />}
         </div>
      </div>
   );
};

export default ListingCard;
