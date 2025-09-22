import Link from 'next/link';
import { Button } from '@/components/ui/button';

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="font-bold">DF Participativo</span>
          </Link>
          <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
            <Link href="/#setores" className="transition-colors hover:text-foreground/80 text-foreground/60">Setores</Link>
            <Link href="/propostas" className="transition-colors hover:text-foreground/80 text-foreground/60">Propostas</Link>
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-2">
           <Button asChild>
            <Link href="/#participe">Enviar Ideia</Link>
           </Button>
        </div>
      </div>
    </header>
); }