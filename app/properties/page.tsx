import EmptyState from "@/components/EmptyState";
import PropertiesClient from "./PropertiesClient";

import { getCurrentUser } from "@/actions/getCurrentUser";
import getListings from "@/actions/getListings";

const Properties = async () => {
   const currentUser = await getCurrentUser();

   if (!currentUser) {
      return <EmptyState title="Unauthorized!" subTitle="Please login" />;
   }

   const listings = await getListings({ userId: currentUser.id });

   if (listings.length === 0) {
      return <EmptyState title="No properties found!" subTitle="Looks like you haven't properties." />;
   }

   return <PropertiesClient listings={listings} currentUser={currentUser} />;
};

export default Properties;
