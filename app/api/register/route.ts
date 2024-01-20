import bcrypt from "bcrypt";
import prisma from "@/libs/prismadb";
import { NextResponse } from "next/server";

// Post function for SignUp process
export async function POST(request: Request) {
   const body = await request.json();

   // extract user data from request
   const { name, email, password } = body;

   /* 12 is The salt to be used in encryption.
      If specified as a number then a salt will be generated with the specified number of rounds and used. */
   const hashedPassword = await bcrypt.hash(password, 12);

   // create a new user when he/she signed-up
   const user = await prisma.user.create({
      data: {
         name,
         email,
         hashedPassword,
      },
   });

   return NextResponse.json(user);
}
