import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
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
  events: {
    signIn: async ({ user }) => {
      await fetch(`${process.env.INTERNAL_ENDPOINT}/api/auth/signup/google`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-User-Id": user.id || "",
          "X-api-key": process.env.API_KEY || "",
        },
        body: JSON.stringify({
          userId: user.id,
          name: user.name,
        }),
      });
    },
  },
});
