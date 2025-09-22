import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';

export function HeroSection() {
  return (
    <section className="relative w-full py-20 md:py-32 lg:py-40 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src="/hero-background.jpg"
          alt="Vista de Brasília"
          fill
          priority
          className="object-cover object-center opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
      </div>

      <div className="container relative z-10 mx-auto text-center">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tighter text-foreground animate-in fade-in slide-in-from-bottom-4 duration-1000">
            A cidade que queremos, <span className="text-primary">construída por todos nós.</span>
          </h1>
          <p className="mt-6 text-lg text-muted-foreground animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
            Sua voz é a ferramenta mais poderosa para a mudança. Participe, proponha e ajude a transformar as demandas da população em políticas públicas reais para o Distrito Federal.
          </p>
          <div className="mt-8 animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-300">
            <Button size="lg" asChild className="shadow-lg transition-transform hover:scale-105">
              <Link href="#participe">Quero Enviar Minha Ideia</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
); }