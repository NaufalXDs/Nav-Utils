import { signOut as nextAuthSignOut } from "next-auth/react";

export default function signOut() {
  nextAuthSignOut({ callbackUrl: '/auth' });
}

