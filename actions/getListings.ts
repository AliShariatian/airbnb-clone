import prisma from "@/libs/prismadb";

export interface ListingsParams {
   userId?: string;
}

export default async function getListings(params: ListingsParams) {
   try {
      const { userId } = params;
      let query: any = {};

      if (userId) {
         query.userId = userId;
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
