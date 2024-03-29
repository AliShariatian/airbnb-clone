import { getCurrentUser } from "@/actions/getCurrentUser";
import getListings, { ListingsParams } from "@/actions/getListings";
import Container from "@/components/Container";
import EmptyState from "@/components/EmptyState";
import ListingCard from "@/components/listings/ListingCard";

interface HomePageProps {
   searchParams: ListingsParams;
}

const HomePage = async ({ searchParams }: HomePageProps) => {
   const listings = await getListings(searchParams);
   const currentUser = await getCurrentUser();

   if (listings.length === 0) {
      return <EmptyState showReset />;
   }

   return (
      <Container>
         <section className="pt-24 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
            {listings.map((item) => (
               <ListingCard key={item.id} data={item} currentUser={currentUser} />
            ))}
         </section>
      </Container>
   );
};

export default HomePage;
