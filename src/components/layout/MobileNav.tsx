'use client';

import { useState } from 'react';
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Abrir Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left">
        <div className="flex flex-col gap-8 pt-4">
            <Link href="/" className="flex items-center space-x-2">
                <Image
                  src="/logo.jpg"
                  alt="Logo DF Participativo"
                  width={35}
                  height={35}
                  className="rounded-md"
                />
                <span className="font-bold">DF Participativo</span>
            </Link>
            <nav className="grid gap-4 text-lg font-medium">
                <Link href="/#setores" onClick={() => setOpen(false)}>Setores</Link>
                <Link href="/propostas" onClick={() => setOpen(false)}>Propostas</Link>
                <Link href="/#participe" onClick={() => setOpen(false)}>Enviar Ideia</Link>
            </nav>
        </div>
      </SheetContent>
    </Sheet>
); }