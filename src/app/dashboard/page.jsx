import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import Layout from "@/components/Layout";
import React from "react";
import Menubar_dashboard from "@/components/ui/menubar_dashboard";

export const metadata = {
  title: "NavUtils | Dashboard",
  description: "Website Dashboard by navdev",
};

export default function Dashboard() {
  return (
    <>
      <Menubar_dashboard />
      
    </>
  );
}
