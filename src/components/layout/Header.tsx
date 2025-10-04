'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { MobileNav } from './MobileNav';
import { navLinks } from '@/config/nav';
import { useProposalModal } from '@/context/ProposalModalContext';
import { useState, useEffect, useRef } from 'react';
import { Lightbulb } from 'lucide-react';
import { cn } from '@/lib/utils';

export function Header() {
  const { openModal } = useProposalModal();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;

      setIsScrolled(currentScrollY > 10);
      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      lastScrollY.current = currentScrollY;
      
      if (docHeight > 0) {
        setScrollProgress((currentScrollY / docHeight) * 100);
      } else {
        setScrollProgress(0);
    } };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={cn(
      "fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ease-out",
      isVisible ? 'translate-y-0' : '-translate-y-full',
      isScrolled 
        ? 'bg-background/80 backdrop-blur-lg border-b' 
        : 'bg-transparent border-b border-transparent'
    )}>
      <div className="container mx-auto flex h-16 md:h-20 items-center px-4 transition-height duration-300">
        <div className="flex items-center gap-8 md:gap-12 mr-auto">
          <Link 
            href="/" 
            className="flex items-center space-x-3 group transition-transform duration-300 hover:scale-105"
          >
            <Image
              src="/logo.png"
              alt="Logo A Cidade Que A Gente Quer"
              width={44}
              height={44}
              className="rounded-lg transition-all duration-300 group-hover:shadow-lg"
              priority
            />
            <div className="flex flex-col">
              <span className="font-bold hidden sm:inline-block text-lg bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
                A Cidade Que A Gente Quer
              </span>
              <span className="hidden md:block text-xs text-muted-foreground font-normal mt-0.5">
                Planejando o Futuro
              </span>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="relative px-4 py-2 text-sm font-medium transition-all duration-300 group"
              >
                <span className="text-foreground/70 group-hover:text-foreground transition-colors">
                  {link.label}
                </span>
                <div className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-primary rounded-full transition-all duration-300 group-hover:left-0 group-hover:w-full -translate-x-1/2 group-hover:translate-x-0" />
                <div className="absolute inset-0 bg-primary/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <Button 
            onClick={() => openModal()}
            className="hidden md:inline-flex group relative overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-lg"
            size="lg"
          >
            <Lightbulb className="mr-2 size-4 transition-transform group-hover:scale-110" />
            Enviar Ideia
            <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
          </Button>
          <MobileNav />
        </div>
      </div>

      {/* Progresso */}
      <div className="absolute bottom-0 left-0 w-full h-0.5 bg-primary/10">
        <div 
          className="h-full bg-gradient-to-r from-primary to-primary/80"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>
    </header>
); }