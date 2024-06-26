import authConfig from "./auth.config"
import { NextResponse } from "next/server"
import NextAuth from "next-auth"

const { auth } = NextAuth(authConfig)
export default auth(async function middleware(req) {
    const session = await auth();
    if (req.nextUrl.pathname.startsWith("/admin")
        && session.user.role !== "ADMIN") {
        return NextResponse.rewrite(
            new URL("/auth/error?error=AccessDenied", req.url)
        )
    }

    if (req.nextUrl.pathname.startsWith("/dashboard")
        && session.user.role !== "ADMIN"
        && session.user.role !== "SEKRE") {
        return NextResponse.rewrite(
            new URL("/auth/error?error=AccessDenied", req.url)
        )
    }
}, {
    matcher: ["/admin", "/dashboard"]
})

// import { withAuth, NextRequestWithAuth } from "next-auth/middleware"

// export default withAuth(
//     // `withAuth` augments your `Request` with the user's token.
//     function middleware(request: NextRequestWithAuth) {
//         // console.log(request.nextUrl.pathname)
//         // console.log(request.nextauth.token)

//         if (request.nextUrl.pathname.startsWith("/extra")
//             && request.nextauth.token?.role !== "admin") {
//             return NextResponse.rewrite(
//                 new URL("/denied", request.url)
//             )
//         }

//         if (request.nextUrl.pathname.startsWith("/client")
//             && request.nextauth.token?.role !== "admin"
//             && request.nextauth.token?.role !== "manager") {
//             return NextResponse.rewrite(
//                 new URL("/denied", request.url)
//             )
//         }
//     },
//     {
//         callbacks: {
//             authorized: ({ token }) => !!token
//         },
//     }
// )

// // Applies next-auth only to matching routes - can be regex
// // Ref: https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
// export const config = { matcher: ["/extra", "/client", "/dashboard"] }