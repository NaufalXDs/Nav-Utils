import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import React from "react";
import signOut from "@/utils/signOut";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { auth } from "@/auth";

export default async function DropdownProfile({ session }) {
  // console.log(session)
  return (
    <DropdownMenu className="bg-background">
      <DropdownMenuTrigger asChild>
        <div className="mx-auto">
          <Avatar className="hover:shadow-gray-1000 hover:shadow-xl cursor-pointer transition-all duration-300">
            <AvatarImage src={session.user.image} />
            <AvatarFallback>{session.user.name}</AvatarFallback>
          </Avatar>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="absolute right-0 mt-2 w-48 origin-top-right rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none overflow-auto">
        <DropdownMenuItem>
          <Link href={`/profile`} target="_blank">
            Profile
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        {session.user.role === "ADMIN" && (
          <>
            <DropdownMenuItem>
              <Link href={`/dashboard`}>Dashboard</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link href={`/admin`}>Admin</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
          </>
        )}
        {session.user.role === "SEKRE" && (
          <>
            <DropdownMenuItem>
              <Link href={`/dashboard`}>Dashboard</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
          </>
        )}
        <DropdownMenuItem className="cursor-pointer" onClick={() => signOut()}>
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
