import Heading from "@/components/Heading";
import Container from "@/components/Container";
import ListingCard from "@/components/listings/ListingCard";

import { SafeListing, SafeUser } from "@/types";

interface FavoritesClientProps {
   favoriteListings: SafeListing[];
   currentUser?: SafeUser | null;
}

const ReservationsClient: React.FC<FavoritesClientProps> = ({ currentUser, favoriteListings }) => {
   return (
      <Container>
         <Heading title="Favorites" subTitle="List of places you have favorite!" />
         <section className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
            {favoriteListings.map((item) => (
               <ListingCard key={item.id} data={item} currentUser={currentUser} />
            ))}
         </section>
      </Container>
   );
};

export default ReservationsClient;
