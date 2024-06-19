import { auth } from "@/auth"

export default async function GetUser() {
    const session = await auth();
    if (!session || !session.user) {
        return null;
    }
    return session.user;
}
