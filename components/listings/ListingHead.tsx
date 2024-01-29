import useCountries from "@/hooks/useCountries";
import { SafeUser } from "@/types";
import Heading from "../Heading";
import Image from "next/image";
import HeartButton from "../HeartButton";

interface ListingHeadProps {
   title: string;
   imageSrc: string;
   locationValue: string;
   id: string;
   currentUser?: SafeUser | null;
}

const ListingHead: React.FC<ListingHeadProps> = ({ title, imageSrc, locationValue, id, currentUser }) => {
   const { getByValue } = useCountries();
   const location = getByValue(locationValue);

   return (
      <>
         <Heading title={title} subTitle={`${location?.region}, ${location?.label}`} />
         <section className="w-full h-[80vh] overflow-hidden rounded-xl relative">
            <Image src={imageSrc} fill alt={title} className="object-cover w-full" />
            <div className="absolute top-5 right-5">
               <HeartButton listingId={id} currentUser={currentUser} />
            </div>
         </section>
      </>
   );
};

export default ListingHead;
