import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import React from "react";
import UserAvatar from "@/components/Avatar";
import signOut from "@/utils/signOut";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function DropdownProfile({ session }) {
  return (
    <DropdownMenu className="bg-background">
      <DropdownMenuTrigger asChild>
        <div className="mx-auto">
          <Avatar className="hover:shadow-gray-100 hover:shadow-xl cursor-pointer transition-all duration-300">
            <AvatarImage src={session.user.image} />
            <AvatarFallback>{session.user.name[0]}</AvatarFallback>
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
        <DropdownMenuItem>
          <Link href={`/dashboard`}>Dashboard</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer" onClick={() => signOut()}>Logout</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
