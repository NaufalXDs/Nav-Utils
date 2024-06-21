import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-full mt-48">
      <h1 className="text-4xl font-bold">404</h1>
      <p className="text-2xl">Page not found</p>
      <Link href="/">
        <Button variant="outline" className=" text-white font-bold py-2 px-3 rounded">
          Go back to home
        </Button>
      </Link>
    </div>
  );
}

export default NotFound;
