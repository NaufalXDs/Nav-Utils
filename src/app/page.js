import Image from "next/image";
import ModeToggle from "@/components/ui/button_theme";
export default async function Home() {
  return (
    <main className="flex min-h-full flex-col items-center justify-between p-24">
      <ModeToggle />
    </main>
  );
}
