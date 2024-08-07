/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Settings, Eye, ArrowUpDown, BadgeCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { auth } from "@/auth";
import { useState } from "react";
import axios from "axios";

export const columns = [
  {
    accessorKey: "absen",
    header: "Absen",
    cell: (info) => parseInt(info.getValue()),
  },
  {
    accessorKey: "nama",
    header: "Name",
    cell: (info) => String(info.getValue()),
    enableResizing: true,
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Status
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: (info) => String(info.getValue()),
    enableResizing: true,
  },
  {
    accessorKey: "updateAt",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Update
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: (info) => new Date(info.getValue()).toLocaleDateString(),
    enableResizing: true,
  },
  {
    accessorKey: "createAt",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Create
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: (info) => new Date(info.getValue()).toLocaleDateString(),
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const dataabsensi = row.original;
      const [open, setOpen] = useState(false);
      const [open2, setOpen2] = useState(false);
      const [status, setStatus] = useState("");
      const handleUpdate = async () => {
        try {
          await axios.put("/api/absen", {
            absen: dataabsensi.absen,
            status: status.toLocaleLowerCase(),
          });
          setOpen2(true);
          setTimeout(() => setOpen2(false));
        } catch (error) {
          console.error(error.message);
        }
      };
      const formatLocalTime = (dateString) => {
        const options = { timeZone: "Asia/Jakarta", weekday: "long", year: "numeric", month: "long", day: "numeric", hour: "2-digit", minute: "2-digit", second: "2-digit" };
        return new Date(dateString).toLocaleString("id-ID", options);
      };
      return (
        <>
          <div className="flex flex-row gap-4">
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Eye className="cursor-pointer" />
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Data Siswa</DialogTitle>
                  <DialogDescription>Detail data absensi siswa</DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <p>Absen: {dataabsensi.absen}</p>
                  <p>Nama: {dataabsensi.nama}</p>
                  <p>Status: {dataabsensi.status}</p>
                  <p>Update: {formatLocalTime(dataabsensi.updateAt)}</p>
                  <p>Create: {formatLocalTime(dataabsensi.createAt)}</p>
                </div>
                <DialogFooter>
                  <Button variant="default" onClick={() => setOpen(false)}>
                    Close
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            <Dialog open={open2} onOpenChange={setOpen2}>
              <DialogTrigger asChild>
                <Settings className="cursor-pointer" />
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Edit Siswa</DialogTitle>
                  <DialogDescription>Edit Data Absensi Seperti uuid dan Status Siswa</DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <Input required type="text" placeholder={status} className="w-full" onChange={(e) => setStatus(e.target.value)} />
                </div>
                <DialogFooter>
                  <Button
                    variant="default"
                    onClick={() => {
                      if (status) {
                        handleUpdate();
                      }
                    }}
                    disabled={!status}
                  >
                    Update
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </>
      );
    },
  },
];
