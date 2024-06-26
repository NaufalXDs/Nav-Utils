import { NextAuthOptions } from 'next-auth'
import GitHub from "next-auth/providers/github"
import Google from "next-auth/providers/google"

import { PrismaAdapter } from "@auth/prisma-adapter"
import { PrismaClient } from "@prisma/client"

const Gprisma = new PrismaClient()
export const options = {
    adapter: PrismaAdapter(Gprisma),
    session: { strategy: "jwt" },
    providers: [GitHub({
        clientId: process.env.AUTH_GITHUB_ID,
        clientSecret: process.env.AUTH_GITHUB_SECRET,
        profile(profile) {
            return { ...profile, providerAccountId: profile.id.toString() }
        },
    }), Google({
        clientId: process.env.AUTH_GOOGLE_ID,
        clientSecret: process.env.AUTH_GOOGLE_SECRET
    })],
    pages: {
        signIn: "/auth",
    },
    secret: process.env.AUTH_SECRET,
    events: {
        async signIn(message) {
            console.log("User signed in:", message);
        },
        async signOut(message) {
            console.log("User signed out:", message);
        },
        async createUser(message) {
            console.log("User created:", message);
        },
        async updateUser(message) {
            console.log("User updated:", message);
        },
        async linkAccount(message) {
            console.log("Account linked:", message);
        },
        async session(message) {
            console.log("Session active:", message);
        }
    },
    callbacks: {
        signIn: async ({ user }) => {
            return user.email.endsWith("@gmail.com");
        },
        async session({ token, session }) {
            if (token) {
                session.user.id = token.id
                session.user.email = token.email
                session.user.name = token.name
                session.user.image = token.picture
                session.user.role = token.role
            }
            return session
        },
        async jwt({ token, user }) {
            const userRole = await Gprisma.user.findFirst({
                where: {
                    email: token.email
                }
            })
            if (!userRole) {
                token.id = !user.id
                return token
            }
            return {
                id: userRole.id,
                email: userRole.email,
                name: userRole.name,
                picture: userRole.image,
                role: userRole.role,
            }
        }
    }
}