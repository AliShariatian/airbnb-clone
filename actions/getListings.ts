import prisma from "@/libs/prismadb";

export interface ListingsParams {
   userId?: string;
   guestCount?: number;
   roomCount?: number;
   bathroomCount?: number;
   startDate?: string;
   endDate?: string;
   locationValue?: string;
   category?: string;
}

export default async function getListings(params: ListingsParams) {
   try {
      const { userId, guestCount, roomCount, bathroomCount, startDate, endDate, locationValue, category } = params;

      let query: any = {};

      if (userId) {
         query.userId = userId;
      }

      if (category) {
         query.category = category;
      }

      if (roomCount) {
         query.roomCount = {
            // greater than
            gte: +roomCount,
         };
      }

      if (guestCount) {
         query.guestCount = {
            // greater than
            gte: +guestCount,
         };
      }

      if (bathroomCount) {
         query.bathroomCount = {
            // greater than
            gte: +bathroomCount,
         };
      }

      if (locationValue) {
         query.locationValue = locationValue;
      }

      if (startDate && endDate) {
         query.NOT = {
            reservations: {
               some: {
                  OR: [
                     {
                        endDate: { gte: startDate },
                        startDate: { lte: startDate },
                     },
                     {
                        startDate: { lte: endDate },
                        endDate: { gte: endDate },
                     },
                  ],
               },
            },
         };
      }

      const listings = await prisma.listing.findMany({
         where: query,
         orderBy: {
            createdAt: "desc",
         },
      });

      // use this method to fix some error
      const safeListings = listings.map((item) => ({
         ...item,
         createdAt: item.createdAt.toISOString(),
      }));

      return safeListings;
   } catch (error: any) {
      throw new Error(error.message);
   }
}
