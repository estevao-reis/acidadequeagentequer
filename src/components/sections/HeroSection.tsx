import { Button } from '@/components/ui/button';
import Link from 'next/link';

export function HeroSection() {
  return (
    <section className="relative w-full py-20 md:py-32 lg:py-40 bg-muted/40">
      <div className="container mx-auto text-center">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tighter">
            A cidade que queremos, construída por todos nós.
          </h1>
          <p className="mt-6 text-lg text-muted-foreground">
            Sua voz é a ferramenta mais poderosa para a mudança. Participe, proponha e ajude a transformar as demandas da população em políticas públicas reais para o Distrito Federal.
          </p>
          <div className="mt-8">
            <Button size="lg" asChild>
              <Link href="#participe">Quero Enviar Minha Ideia</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
); }