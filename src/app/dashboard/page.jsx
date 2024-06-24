import React from "react";
import { columns } from "./columns";
import axios from "axios";
import { auth } from "@/auth";
import { DataTable } from "./data-table";
import { useSession } from "next-auth/react";

export const metadata = {
  title: "NavUtils | Dashboard",
  description: "Website Dashboard by navdev",
};

async function getData() {
  const base_url = process.env.NEXT_URL;
  try {
    const response = await axios.get(`${base_url}` + "/api/absen/");
    return response.data;
  } catch (error) {
    console.error(error.message);
  }
}

export default async function Dashboard() {
  const data = await getData();
  // const session = await useSession();
  // console.log(session);
  // if (session?.user.role === "admin") {
  //   return console.log("admin");
  // }
  return (
    <div className="container mx-auto py-10 min-h-full">
      {/* <h1>{session?.user?.role}</h1> */}
      <DataTable columns={columns} data={data} />
    </div>
  );
}
