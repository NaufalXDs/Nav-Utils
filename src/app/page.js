import Image from "next/image";
import { auth } from "../auth"
import ModeToggle from "@/components/ui/button_theme";

export default async function Home() {
  const token = await auth()
  return (
    <main className="flex min-h-full flex-col items-center justify-between p-24">
      <p>{token?.user?.name} & {token?.user?.role}</p>
      <ModeToggle />
    </main>
  );
}