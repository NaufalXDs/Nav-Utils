import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import Google from "next-auth/providers/google"

import { PrismaAdapter } from "@auth/prisma-adapter"
import prisma from "@/lib/prisma"

export const { handlers, signIn, signOut, auth } = NextAuth({
  // adapter: PrismaAdapter(prisma),
  providers: [GitHub, Google],
  pages: {
    signIn: "/auth",
  },
  callbacks: {
    signIn: async ({ user }) => {
      return user.email.endsWith("@gmail.com");
    },
  },
});