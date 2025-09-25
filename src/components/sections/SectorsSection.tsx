import { Card, CardTitle, CardDescription } from '@/components/ui/card';
import {
  HeartHandshake,
  TrendingUp,
  Network,
  Shield,
  Landmark,
  Sparkles,
  Icon as LucideIcon,
} from 'lucide-react';
import { ComponentType } from 'react';
import { cn } from '@/lib/utils';

type Sector = {
  id: number;
  name: string;
  description: string | null;
  slug: string;
}

interface SectorsSectionProps {
  sectors: Sector[];
}

const sectorDetails: { [key: string]: { icon: ComponentType<{ className?: string }>; color: string, gradient: string } } = {
  'desenvolvimento-social': { icon: HeartHandshake, color: 'text-rose-500', gradient: 'from-rose-500/20 to-transparent' },
  'economia-oportunidades': { icon: TrendingUp, color: 'text-emerald-500', gradient: 'from-emerald-500/20 to-transparent' },
  'mobilidade-infraestrutura': { icon: Network, color: 'text-blue-500', gradient: 'from-blue-500/20 to-transparent' },
  'seguranca-cidania': { icon: Shield, color: 'text-amber-500', gradient: 'from-amber-500/20 to-transparent' },
  'gestao-publica': { icon: Landmark, color: 'text-indigo-500', gradient: 'from-indigo-500/20 to-transparent' },
};

export function SectorsSection({ sectors }: SectorsSectionProps) {
  return (
    <section id="setores" className="py-20 sm:py-24 md:py-32 bg-background scroll-mt-16 relative overflow-hidden">
      <div 
        className="absolute inset-0 -z-10 bg-muted/20"
        style={{
          backgroundImage: 'radial-gradient(circle at top left, hsl(var(--primary) / 0.05), transparent 40%), radial-gradient(circle at bottom right, hsl(var(--primary) / 0.05), transparent 40%)'
        }}
      />
      <div className="container mx-auto">
        <div className="max-w-3xl mx-auto text-center mb-12 md:mb-20">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-4 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            Nossas Áreas de Foco
          </h2>
          <p className="text-lg text-muted-foreground animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
            As propostas são organizadas em 5 grandes setores que representam os pilares para o desenvolvimento do Distrito Federal.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {sectors.map((sector, index) => {
            const details = sectorDetails[sector.slug] || { icon: Sparkles, color: 'text-primary', gradient: 'from-primary/20 to-transparent' };
            const Icon = details.icon;

            return (
              <Card 
                key={sector.id} 
                className={cn(
                  "group relative flex flex-col items-center text-center p-6 bg-background/50 backdrop-blur-sm transition-all duration-300 overflow-hidden",
                  "border border-transparent hover:border-primary/30",
                  "animate-in fade-in zoom-in-95",
                )}
                style={{ animationDelay: `${200 + index * 100}ms`, animationFillMode: 'both' }}
              >
                <div 
                  className={cn(
                    "absolute -inset-px rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300",
                    "bg-gradient-to-br",
                    details.gradient,
                  )}
                />
                <div className="relative z-10 flex flex-col items-center h-full">
                    <div className={cn("mb-5 p-4 rounded-full bg-primary/10", details.color)}>
                      <Icon className="size-8" />
                    </div>
                    <div className="flex flex-col flex-grow">
                      <CardTitle className="text-xl font-semibold">{sector.name}</CardTitle>
                      <CardDescription className="mt-2 text-base flex-grow">{sector.description}</CardDescription>
                    </div>
                </div>
              </Card>
          ); })}
            <Card className="group relative flex flex-col items-center justify-center text-center p-6 bg-transparent transition-all duration-300 border-2 border-dashed hover:border-solid hover:border-primary hover:bg-primary/5 animate-in fade-in zoom-in-95" style={{ animationDelay: '800ms', animationFillMode: 'both' }}>
                 <div className="relative z-10 flex flex-col items-center">
                    <div className="mb-4 p-4 bg-primary/10 rounded-full text-primary">
                      <Sparkles className="size-8" />
                    </div>
                    <CardTitle className="text-xl font-semibold">E muito mais...</CardTitle>
                    <CardDescription className="mt-2 text-base">Sua ideia pode inaugurar novas frentes de trabalho para o futuro da nossa cidade.</CardDescription>
                </div>
            </Card>
        </div>
      </div>
    </section>
); }