import React from "react";
import Menubar_dashboard from "@/components/ui/menubar_dashboard";
import { columns } from "./columns";
import axios from "axios";
import { DataTable } from "./data-table";

export const metadata = {
  title: "NavUtils | Dashboard",
  description: "Website Dashboard by navdev",
};

async function getData() {
  const base_url = process.env.NEXT_PUBLIC_BASE_URL;
  try {
    const response = await axios.get(`${base_url}` + "/api/absen/");
    return response.data;
  } catch (error) {
    console.error(error.message);
  }
}

export default async function Dashboard() {
  const data = await getData();
  return (
    <div className="container mx-auto py-10 min-h-full">
      {/* <Menubar_dashboard /> */}
      <DataTable columns={columns} data={data} />
    </div>
  );
}
