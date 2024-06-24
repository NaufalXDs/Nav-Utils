import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import Google from "next-auth/providers/google"

import { PrismaAdapter } from "@auth/prisma-adapter"
import { Gprisma } from "@/lib/prisma"

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(Gprisma),
  session: {
    strategy: "jwt",
  },
  providers: [GitHub({
    profile(profile) {
      return { ...profile }
    },
  }), Google({
    profile(profile) {
      return {
        id: profile.sub,
        email: profile.email,
        emailVerified: profile.email_verified,
        name: profile.name,
        image: profile.picture,
        username: profile.given_name
      }
    },
  })],
  pages: {
    signIn: "/auth",
  },
  callbacks: {
    signIn: async ({ user }) => {
      return user.email.endsWith("@gmail.com");
    },
    session({ session, user }) {
      if (user && user.role) {
        session.user.role = user.role;
      }
      return session;
    }
  }
});