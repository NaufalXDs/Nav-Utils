import { signIn } from "next-auth/react";

export const handleSignWithOauth = (provider) => {
    signIn(provider, { callbackUrl: '/' });
};