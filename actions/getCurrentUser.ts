import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import prisma from "@/libs/prismadb";

export async function getSession() {
   return await getServerSession(authOptions);
}

export async function getCurrentUser() {
   try {
      const session = await getSession();

      // if user email not exist in session
      if (!session?.user?.email) {
         return null;
      }

      const currentUser = await prisma.user.findUnique({
         where: {
            email: session.user.email as string,
         },
      });

      // if user email not exist in db
      if (!currentUser) {
         return null;
      }

      return {
         ...currentUser,
         // toISOString() => Returns a date as a string value in ISO format.
         createdAt: currentUser.createdAt.toISOString(),
         updatedAt: currentUser.updatedAt.toISOString(),
         emailVerified: currentUser.emailVerified?.toISOString() || null,
      };
   } catch (err) {
      return null;
   }
}
