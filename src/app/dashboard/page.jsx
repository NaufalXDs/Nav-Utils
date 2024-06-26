import React from "react";
import { columns } from "./columns";
import axios from "axios";
import { DataTable } from "./data-table";
import { auth } from "@/auth";

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
  // const session = await auth();
  // try {
  //   if (session.user.role !== "ADMIN") {
  //     return <p>You are not authorized to view this page!</p>;
  //   }
  // } catch (error) {
  //   console.error("Error checking user role:", error.message);
  //   return <p>Something went wrong. Please try again later.</p>;
  // }
  return (
    <div className="container mx-auto py-10 min-h-full">
      <DataTable columns={columns} data={data} />
    </div>
  );
}