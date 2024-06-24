"use client";

import { VisibilityState, flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table";
import { Input } from "@/components/ui/input";
import * as React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowBigLeft, ArrowBigRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogTrigger, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import axios from "axios";

export function DataTable(props) {
  const { columns, data } = props;
  const [tableData, setTableData] = React.useState(data);
  const [sorting, setSorting] = React.useState([]);
  const [columnFilters, setColumnFilters] = React.useState([]);
  const [columnVisibility, setColumnVisibility] = React.useState({
    nama: true,
    absen: true,
    status: true,
    hadir: false,
    izin: false,
    sakit: false,
    alfa: false,
    updateAt: true,
    createAt: false,
    actions: true,
  });
  const [openDialog, setOpenDialog] = React.useState(false);
  const [newData, setNewData] = React.useState({
    absen: parseInt(""),
    nama: String(""),
    status: String(""),
    uuid: String(""),
  });

  const table = useReactTable({
    data: tableData,
    columns,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
    },
  });

  let lastRefreshTime = 0;

  async function refreshData() {
    const currentTime = Date.now();
    if (currentTime - lastRefreshTime < 20000) {
      alert("Refresh hanya bisa dilakukan setiap 20 detik.");
      return;
    }
    lastRefreshTime = currentTime;

    const base_url = process.env.NEXT_PUBLIC_BASE_URL;
    try {
      const response = await axios.get(`/api/absen/`);
      setTableData(response.data);
    } catch (error) {
      console.error(error.message);
      alert("Terjadi kesalahan saat mengambil data. Silakan coba lagi nanti.");
    }
  }

  async function handleNewData() {
    try {
      await axios.post("/api/absen", {
        absen: parseInt(newData.absen),
        nama: String(newData.nama),
        status: String(newData.status).charAt(0).toUpperCase() + string.slice(1),
        uuid: String(newData.uuid),
      });
      alert("Data berhasil disimpan");
      setOpenDialog(false);
      refreshData();
    } catch (error) {
      console.error(error.message);
      alert("Terjadi kesalahan saat menyimpan data. Silakan coba lagi nanti.");
    }
  }
  const formatLocalTime = (dateString) => {
    const options = { weekday: "long", year: "numeric", month: "long", day: "numeric", hour: "2-digit", minute: "2-digit", second: "2-digit" };
    return new Date(dateString).toLocaleDateString("id-ID", options);
  };

  return (
    <div>
      <div className="flex items-center py-4">
        <Input placeholder="Filter nama..." value={table.getColumn("nama")?.getFilterValue() ?? ""} onChange={(event) => table.getColumn("nama")?.setFilterValue(event.target.value)} className="max-w-sm bg-background/70" />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Filter
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem key={column.id} className="capitalize" checked={column.getIsVisible()} onCheckedChange={(value) => column.toggleVisibility(!!value)}>
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
        <Button variant="outline" className="ml-2" onClick={refreshData}>
          Refresh
        </Button>
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
          <DialogTrigger asChild>
            <Button variant="outline" className="ml-2">
              Tambah Data
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Tambah Data Siswa</DialogTitle>
              <DialogDescription>Masukkan data siswa baru</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <Input type="number" name="absen" placeholder="Absen" value={newData.absen} onChange={(e) => setNewData({ ...newData, absen: e.target.value })} className="w-full" />
              <Input type="text" name="nama" placeholder="Nama" value={newData.nama} onChange={(e) => setNewData({ ...newData, nama: e.target.value })} className="w-full" />
              <Input type="text" name="status" placeholder="Status" value={newData.status} onChange={(e) => setNewData({ ...newData, status: e.target.value })} className="w-full" />
              <Input type="text" name="uuid" placeholder="UUID" value={newData.uuid} onChange={(e) => setNewData({ ...newData, uuid: e.target.value })} className="w-full" />
            </div>
            <DialogFooter>
              <Button variant="default" onClick={handleNewData}>
                Simpan
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <div className="rounded-md border bg-background/70">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="text-center">
                {headerGroup.headers.map((header) => {
                  return <TableHead key={header.id}>{header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}</TableHead>;
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {cell.column.id === "updateAt" ? formatLocalTime(cell.getValue()) : cell.column.id === "createAt" ? formatLocalTime(cell.getValue()) : flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button variant="outline" size="sm" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
          <ArrowBigLeft />
        </Button>
        <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
          <ArrowBigRight />
        </Button>
      </div>
    </div>
  );
}
