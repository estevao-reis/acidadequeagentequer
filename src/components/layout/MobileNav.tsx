'use client';

import { useState } from 'react';
import Link from "next/link";
import Image from "next/image";
import { 
  BookMarked, 
  Home, 
  Menu, 
  Send, 
  Users, 
  TrendingUp,
  Network,
  Shield,
  Landmark
} from "lucide-react";
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useProposalModal } from '@/context/ProposalModalContext';
import { cn } from '@/lib/utils';

type NavLink = {
  href: string;
  label: string;
  icon: React.ElementType;
  description?: string;
};

const mobileNavLinks: NavLink[] = [
  {
    href: "/",
    label: "Início",
    icon: Home,
    description: "Voltar para a página principal"
  },
  {
    href: "/#setores",
    label: "Áreas de Foco",
    icon: BookMarked,
    description: "Explore nossas áreas estratégicas"
  },
  {
    href: "/propostas",
    label: "Propostas",
    icon: Users,
    description: "Veja as ideias da comunidade"
}, ];

const quickActions = [
  {
    label: "Desenvolvimento Social",
    sectorId: 1,
    icon: Users,
    color: "text-rose-500"
  },
  {
    label: "Economia & Oportunidades",
    sectorId: 2,
    icon: TrendingUp,
    color: "text-emerald-500"
  },
  {
    label: "Mobilidade e Infraestrutura",
    sectorId: 3,
    icon: Network,
    color: "text-blue-500"
  },
  {
    label: "Segurança e Cidadania",
    sectorId: 4,
    icon: Shield,
    color: "text-amber-500"
  },
  {
    label: "Gestão Pública",
    sectorId: 5,
    icon: Landmark,
    color: "text-indigo-500"
}, ];

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const { openModal } = useProposalModal();

  const closeSheetAndOpenModal = (sectorId?: number) => {
    setOpen(false);
    setTimeout(() => openModal(sectorId), 300);
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button 
          variant="outline" 
          size="icon" 
          className="lg:hidden relative group transition-all duration-300 hover:scale-105"
        >
          <Menu className="h-5 w-5 transition-transform group-hover:rotate-90" />
          <span className="sr-only">Abrir Menu</span>
          <div className="absolute -top-1 -right-1 size-2 bg-primary rounded-full animate-pulse" />
        </Button>
      </SheetTrigger>

      <SheetContent 
        side="left" 
        className="w-[85vw] max-w-sm flex flex-col p-0 border-r-0 bg-background/95 backdrop-blur-xl"
      >
        <SheetHeader className="p-6 pb-4 border-b border-border/50 bg-gradient-to-b from-background to-background/80">
          <SheetTitle asChild>
            <Link href="/" onClick={() => setOpen(false)} className="flex items-center gap-3 group">
              <Image
                src="/logo.png"
                alt="Logo A Cidade Que A Gente Quer"
                width={44}
                height={44}
                className="rounded-lg"
              />
              <div className="flex flex-col">
                <span className="font-bold text-lg leading-tight">A Cidade Que A Gente Quer</span>
                <span className="text-xs text-muted-foreground font-normal mt-0.5">
                  Planejando o Futuro
                </span>
              </div>
            </Link>
          </SheetTitle>
        </SheetHeader>

        <div className="flex flex-col flex-grow overflow-y-auto">
          <nav className="p-6 pb-4">
            <div className="space-y-2">
              {mobileNavLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-4 rounded-xl px-4 py-3 text-base font-medium transition-all duration-200 group hover:bg-accent hover:scale-[1.02] active:scale-95"
                >
                  <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                    <link.icon className="size-5 text-primary" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-foreground">{link.label}</span>
                    {link.description && (
                      <span className="text-xs text-muted-foreground mt-0.5">
                        {link.description}
                      </span>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </nav>

          <div className="px-6 py-4 border-t border-border/50">
            <h3 className="text-sm font-semibold text-muted-foreground mb-3 px-2">
              Contribuir por Setor
            </h3>
            <div className="space-y-1">
              {quickActions.map((action) => {
                const Icon = action.icon;
                return (
                  <button
                    key={action.sectorId}
                    onClick={() => closeSheetAndOpenModal(action.sectorId)}
                    className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all duration-200 hover:bg-accent/50"
                  >
                    <Icon className={cn("size-4", action.color)} />
                    <span className="text-foreground/80">{action.label}</span>
                  </button>
              ); })}
            </div>
          </div>

          <div className="flex-grow" />
        </div>

        <SheetFooter className="p-6 pt-4 border-t border-border/50 bg-gradient-to-t from-background to-background/80">
          <Button 
            onClick={() => closeSheetAndOpenModal()} 
            size="lg" 
            className="w-full group relative overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-lg"
          >
            <Send className="mr-2 size-5 transition-transform group-hover:scale-110" />
            Enviar sua Ideia
            <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
          </Button>
          <p className="text-center text-xs text-muted-foreground mt-3 px-4">
            Sua ideia pode transformar nossa cidade. Compartilhe agora!
          </p>
        </SheetFooter>
      </SheetContent>
    </Sheet>
); }