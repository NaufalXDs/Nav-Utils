"use client"

import { SquareUser, BookCopy } from "lucide-react";
import { FaGithub, FaGoogle, FaDiscord } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { createClient } from "@/utils/supabase/client";

export default function Page() {
  const tgl = new Date();

  const handleSignWithOauth = (provider) => {
    const supabase = createClient();
    supabase.auth.signInWithOAuth({
      provider: provider,
      options: {
        redirectTo: `${location.origin}/auth/callback`,
      },
    });
  };
  return (
    <div className="justify-center w-full flex h-screen items-center">
      <div className="w-96 h-72 border p-5 rounded-md space-y-6 font-mono">
        <div className="flex gap-2 items-center flex-row justify-between">
          <div className="flex space-x-2 text-red-500">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <p className="text-sm">bash</p>
          {/* <SquareUser />|<span className="text-foreground font-bold text-2xl">NavUtils 🤟</span> */}
        </div>

        <div>
          <span className="text-green-500 ">$ Login or Register 👇</span>
        </div>

        <div className="flex flex-col justify-center items-center gap-2">
          <Button
            variant="outline"
            onClick={() => handleSignWithOauth("google")}
            className="bg-red-950 text-red-400 border border-red-400 border-b-4 font-medium overflow-hidden relative px-4 py-2 rounded-md hover:brightness-150 hover:border-t-4 hover:border-b active:opacity-75 outline-none duration-500 group w-full flex flex-row items-center justify-center gap-2"
          >
            <span className="bg-red-400 shadow-red-400 absolute -top-[150%] left-0 inline-flex w-full h-[5px] rounded-md opacity-50 group-hover:top-[150%] duration-1000 shadow-[0_0_10px_10px_rgba(0,0,0,0.3)]"></span>
            <FaGoogle className="text-2xl" />
            Google
          </Button>
          <Button
            variant="outline"
            className="bg-stone-950 text-stone-400 border border-stone-400 border-b-4 font-medium overflow-hidden relative px-4 py-2 rounded-md hover:brightness-150 hover:border-t-4 hover:border-b active:opacity-75 outline-none duration-500 group w-full flex flex-row items-center justify-center gap-2"
            onClick={() => handleSignWithOauth("github")}
          >
            <span className="bg-stone-400 shadow-stone-400 absolute -top-[150%] left-0 inline-flex w-full h-[5px] rounded-md opacity-50 group-hover:top-[150%] duration-1000 shadow-[0_0_10px_10px_rgba(0,0,0,0.3)]"></span>
            <FaGithub className="text-2xl" />
            Github
          </Button>
          <Button
            variant="outline"
            className="bg-blue-950 text-blue-400 border border-blue-400 border-b-4 font-medium overflow-hidden relative px-4 py-2 rounded-md hover:brightness-150 hover:border-t-4 hover:border-b active:opacity-75 outline-none duration-500 group w-full flex flex-row items-center justify-center gap-2"
            onClick={() => handleSignWithOauth("discord")}
          >
            <span className="bg-blue-400 shadow-blue-400 absolute -top-[150%] left-0 inline-flex w-full h-[5px] rounded-md opacity-50 group-hover:top-[150%] duration-1000 shadow-[0_0_10px_10px_rgba(0,0,0,0.3)]"></span>
            <FaDiscord className="text-2xl" />
            Discord
          </Button>
        </div>
      </div>
    </div>
  );
}
