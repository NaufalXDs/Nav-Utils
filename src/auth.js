import NextAuth from "next-auth"

import { PrismaClient } from '@prisma/client';
import authConfig from "@/auth.config"
import { PrismaAdapter } from "@auth/prisma-adapter"
const prisma = new PrismaClient();
import { Gprisma } from "@/lib/prisma";

export const { auth, handlers, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(Gprisma),
  session: {
    strategy: "jwt",
  },
  ...authConfig,
})