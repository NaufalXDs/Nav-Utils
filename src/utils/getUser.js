"use client"
import { getSession } from "next-auth/react";

export async function getUserInfo() {
    const session = await getSession();
    if (session) {
        return {
            email: session.user.email,
            role: session.user.role,
        };
    }
    return null;
}
