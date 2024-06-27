import Google from "next-auth/providers/google"

import { PrismaClient } from "@prisma/client"
const Gprisma = new PrismaClient()

const options = {
    debug: process.env.NODE_ENV !== "production",
    providers: [Google({
        clientId: process.env.AUTH_GOOGLE_ID,
        clientSecret: process.env.AUTH_GOOGLE_SECRET,
        profile(profile) {
            return {
                id: profile.sub,
                email: profile.email,
                emailVerified: profile.email_verified,
                name: profile.name,
                image: profile.picture,
                username: profile.given_name,
                role: profile.role

            }
        },
    })],
    pages: {
        signIn: "/auth",
    },
    secret: process.env.AUTH_SECRET,
    callbacks: {
        signIn: async ({ user }) => {
            return user.email.endsWith("@gmail.com");
        },
        async jwt({ token, user }) {
            if (user) {
                const userRole = await Gprisma.user.findFirst({
                    where: {
                        email: user.email
                    }
                });
                if (!userRole) {
                    token.id = user.id
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
            return token;
        },
        async session({ session, token }) {
            if (session?.user) {
                session.user.id = token.id
                session.user.email = token.email
                session.user.name = token.name
                session.user.image = token.picture
                session.user.role = token.role
            }
            return session;
        },

        /*
         * OLD CONFIG
        */
        // async session({ token, session }) {
        //     if (token) {
        //         session.user.id = token.id
        //         session.user.email = token.email
        //         session.user.name = token.name
        //         session.user.image = token.picture
        //         session.user.role = token.role
        //     }
        //     return session
        // },
        // async jwt({ token, user }) {
        //     const userRole = await Gprisma.user.findFirst({
        //         where: {
        //             email: token.email
        //         }
        //     })
        //     if (!userRole) {
        //         token.id = user.id
        //         return token
        //     }
        //     return {
        //         id: userRole.id,
        //         email: userRole.email,
        //         name: userRole.name,
        //         picture: userRole.image,
        //         role: userRole.role,
        //     }
        // }
    }
}

export default options