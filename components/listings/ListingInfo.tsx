import useCountries from "@/hooks/useCountries";
import dynamic from "next/dynamic";
import { SafeUser } from "@/types";
import { IconType } from "react-icons";
import Avatar from "../Avatar";
import ListingCategory from "./ListingCategory";

interface ListingInfoProps {
   user: SafeUser;
   description: string;
   locationValue: string;
   roomCount: number;
   guestCount: number;
   bathroomCount: number;
   category: { icon: IconType; label: string; description: string } | undefined;
}

const ListingInfo: React.FC<ListingInfoProps> = ({ user, description, roomCount, bathroomCount, guestCount, category, locationValue }) => {
   const { getByValue } = useCountries();
   const coordinates = getByValue(locationValue)?.latlng;

   const Map = dynamic(() => import("../Map"), { ssr: false });

   return (
      <div className="flex flex-col gap-8 col-span-4">
         <div className="flex flex-col gap-2">
            <div className="flex items-center font-semibold text-xl gap-2">
               <span>Hosted by {user?.name}</span>
               <Avatar src={user?.image} />
            </div>
            <div className="flex items-center gap-4 font-light text-neutral-500">
               <span>
                  {guestCount} {guestCount === 1 ? "guest" : "guests"}
               </span>
               <span>
                  {roomCount} {roomCount === 1 ? "room" : "rooms"}
               </span>
               <span>
                  {bathroomCount} {bathroomCount === 1 ? "bathroom" : "bathrooms"}
               </span>
            </div>
         </div>
         <hr />
         {category && <ListingCategory icon={category.icon} label={category.label} description={category.description} />}
         <hr />
         <p className="text-lg font-light text-neutral-500">{description}</p>
         <hr />
         <Map center={coordinates} />
      </div>
   );
};

export default ListingInfo;
