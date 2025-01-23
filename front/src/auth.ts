import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth, { Account, User } from "next-auth";
import Google from "next-auth/providers/google";
import { prismaClient } from "./server/prismaClient";

export const authConfig = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  adapter: PrismaAdapter(prismaClient),
  secret: process.env.SECRET,
  callbacks: {
    signIn: async (params: { user: User; account: Account | null }) => {
      console.log(params.user);
      await fetch(`${process.env.INTERNAL_ENDPOINT}/api/auth/signup/google`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-User-Id": params.user.id || "",
          "X-api-key": process.env.API_KEY || "",
        },
        body: JSON.stringify({
          userId: params.user.id,
          name: params.user.name,
        }),
      });

      return true;
    },
  },
});
