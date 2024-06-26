"use client";
import { auth } from "@/auth";
import { Button } from "./ui/button";
import Image from "next/image";
import { useState, useEffect } from "react";
import DropdownProfile from "./ui/dropdown-profile";
import Link from "next/link";

export default function Navbar({ session }) {
  // console.log(session)
  return (
    <div className="min-h-[60px] flex flex-row items-center justify-between px-4 py-2 bg-transparent text-foreground">
      <button className="button text-2xl" data-text="NavUtils">
        <span className="actual-text">&nbsp;NavUtils&nbsp;</span>
        <span aria-hidden="true" className="hover-text">
          &nbsp;NavUtils&nbsp;
        </span>
      </button>
      <div className="flex flex-row items-center justify-center gap-2">
        <Link href={"/"}>
          <Button
            variant="outline"
            className=" px-4 py-2 rounded-md cursor-pointer transition-all 
          bg-background text-foreground
          border-green-400
          border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px]
          active:border-b-[2px] active:brightness-90 active:translate-y-[2px] hover:shadow-xl hover:shadow-green-300 shadow-green-300 active:shadow-none "
          >
            Home
          </Button>
        </Link>
        <Link href={"/blog"}>
          <Button
            variant="outline"
            className=" px-4 py-2 rounded-md cursor-pointer transition-all 
bg-background text-foreground
border-green-400
border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px]
active:border-b-[2px] active:brightness-90 active:translate-y-[2px] hover:shadow-xl hover:shadow-green-300 shadow-green-300 active:shadow-none"
          >
            Blog
          </Button>
        </Link>
        {session ? (
          <>
            <DropdownProfile session={session} />
          </>
        ) : (
          <Link href={"/auth"}>
            <Button className="bg-orange-950 text-orange-400 border border-orange-400 border-b-4 font-medium overflow-hidden relative px-4 py-2 rounded-md hover:brightness-150 hover:border-t-4 hover:border-b active:opacity-75 outline-none duration-300 group flex">
              <span className="bg-orange-400 shadow-orange-400 absolute -top-[150%] left-0 inline-flex w-80 h-[5px] rounded-md opacity-50 group-hover:top-[150%] duration-500 shadow-[0_0_10px_10px_rgba(0,0,0,0.3)]"></span>
              Login
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
}
