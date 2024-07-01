import React from "react";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { auth } from "@/auth";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const metadata = {
  title: "NavUtils | Dashboard",
  description: "Website Dashboard by navdev",
};

async function getData() {
  const base_url = process.env.NEXT_URL;
  try {
    const response = await prisma.dataAbsensi.findMany({
      select: {
        absen: true,
        nama: true,
        status: true,
        createAt: true,
        updateAt: true,
        Siswa: {
          select: {
            uuid: true
          },
        },
      },
    });
    return response;
  } catch (error) {
    console.error(error.message);
  }
}

export default async function Dashboard() {
  const data = await getData();
  const currentMonth = new Date().toLocaleDateString("id-ID", { month: "long" });
  return (
    <div className="container mx-auto py-10 min-h-full">
      <DataTable columns={columns} data={data} />
    </div>
  );
}