import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { MobileNav } from './MobileNav';
import { navLinks } from '@/config/nav';

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 flex h-16 items-center justify-between">
        <div className="flex items-center gap-6 md:gap-10">
          <Link href="/" className="flex items-center space-x-3">
            <Image
              src="/logo.jpg"
              alt="Logo A Cidade Que A Gente Quer"
              width={40}
              height={40}
              className="rounded-md"
            />
            <span className="font-bold hidden sm:inline-block text-lg">
              A Cidade Que A Gente Quer
            </span>
          </Link>
          <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="transition-colors hover:text-foreground/80 text-foreground/60"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-2">
           <Button asChild className="hidden md:inline-flex">
            <Link href="/#participe">Enviar Ideia</Link>
           </Button>
           <MobileNav />
        </div>
      </div>
    </header>
); }