import Image from "next/image";
import ModeToggle from "@/components/ui/Button_theme";
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <ModeToggle />
    </main>
  );
}
