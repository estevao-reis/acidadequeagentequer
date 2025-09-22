import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { MobileNav } from './MobileNav';

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">

        <Link href="/" className="flex items-center space-x-2">
          <Image
            src="/logo.jpg"
            alt="Logo DF Participativo"
            width={40}
            height={40}
            className="rounded-md"
          />
        </Link>

        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
          <Link href="/#setores" className="transition-colors hover:text-foreground/80 text-foreground/60">Setores</Link>
          <Link href="/propostas" className="transition-colors hover:text-foreground/80 text-foreground/60">Propostas</Link>
        </nav>

        <div className="flex items-center gap-2">
           <Button asChild className="hidden md:inline-flex">
            <Link href="/#participe">Enviar Ideia</Link>
           </Button>
           <MobileNav />
        </div>

      </div>
    </header>
); }