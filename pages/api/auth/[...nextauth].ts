import { PrismaAdapter } from "@next-auth/prisma-adapter";
import NextAuth, { AuthOptions } from "next-auth";
import prisma from "@/libs/prismadb";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

export const authOptions: AuthOptions = {
   adapter: PrismaAdapter(prisma),
   providers: [
      GithubProvider({
         clientId: process.env.GITHUB_ID as string,
         clientSecret: process.env.GITHUB_SECRET as string,
      }),

      GoogleProvider({
         clientId: process.env.GOOGLE_CLIENT_ID as string,
         clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      }),

      CredentialsProvider({
         name: "LoginForm",
         credentials: {
            email: { label: "email", type: "email" },
            password: { label: "password", type: "password" },
         },

         async authorize(LoginForm) {
            // if email and user is empty
            if (!LoginForm?.email || !LoginForm?.password) {
               throw new Error("InvalidEmailOrPassword");
            }

            // search user in database
            const user = await prisma.user.findUnique({
               where: {
                  email: LoginForm.email,
               },
            });

            // if not exist user
            if (!user || !user?.hashedPassword) {
               // Email not found! Please SignUp.
               throw new Error("UserNotFound");
            }

            const isCorrectPassword = await bcrypt.compare(LoginForm.password, user.hashedPassword);

            // if password is not correct
            if (!isCorrectPassword) {
               throw new Error("InvalidPassword");
            }

            // if user Exist in database AND Correct password.
            return user;
         },
      }),
   ],

   // Specify URLs to be used if we want to create custom sign in, sign out and error pages.
   pages: {
      signIn: "/",
   },
   // Set debug to true to enable debug messages for authentication and database operations in development mode.
   debug: process.env.NODE_ENV === "development",

   // jwt: json web token
   session: {
      strategy: "jwt",
   },
   secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
