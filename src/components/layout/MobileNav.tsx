'use client';

import { useState } from 'react';
import Link from "next/link";
import Image from "next/image";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { navLinks } from '@/config/nav';

export function MobileNav() {
  const [open, setOpen] = useState(false);

  const closeSheet = () => setOpen(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Abrir Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[300px]">
        <div className="flex flex-col gap-8 pt-4">
            <Link href="/" onClick={closeSheet} className="flex items-center space-x-2">
                <Image
                  src="/logo.jpg"
                  alt="Logo A Cidade Que A Gente Quer"
                  width={35}
                  height={35}
                  className="rounded-md"
                />
                <span className="font-bold">A Cidade Que A Gente Quer</span>
            </Link>
            <nav className="grid gap-4 text-lg font-medium">
                {navLinks.map((link) => (
                    <Link
                        key={link.href}
                        href={link.href}
                        onClick={closeSheet}
                        className="transition-colors hover:text-foreground/80"
                    >
                        {link.label}
                    </Link>
                ))}
                <Link
                    href="/#participe"
                    onClick={closeSheet}
                    className="transition-colors hover:text-foreground/80"
                >
                    Enviar Ideia
                </Link>
            </nav>
        </div>
      </SheetContent>
    </Sheet>
); }