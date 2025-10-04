'use client';

import { Card, CardTitle, CardDescription } from '@/components/ui/card';
import {
  HeartHandshake,
  TrendingUp,
  Network,
  Shield,
  Landmark,
  Sparkles,
  ArrowRight,
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
  onSectorClick: (sectorId: number) => void;
}

const sectorDetails: { 
  [key: string]: { 
    icon: ComponentType<{ className?: string }>; 
    color: string; 
    gradient: string;
    bgGradient: string;
  } 
} = {
  'desenvolvimento-social': { 
    icon: HeartHandshake, 
    color: 'text-rose-600', 
    gradient: 'from-rose-600 to-rose-500',
    bgGradient: 'from-rose-50 to-rose-100/50'
  },
  'economia-oportunidades': { 
    icon: TrendingUp, 
    color: 'text-emerald-600', 
    gradient: 'from-emerald-600 to-emerald-500',
    bgGradient: 'from-emerald-50 to-emerald-100/50'
  },
  'mobilidade-infraestrutura': { 
    icon: Network, 
    color: 'text-blue-600', 
    gradient: 'from-blue-600 to-blue-500',
    bgGradient: 'from-blue-50 to-blue-100/50'
  },
  'seguranca-cidania': { 
    icon: Shield, 
    color: 'text-amber-600', 
    gradient: 'from-amber-600 to-amber-500',
    bgGradient: 'from-amber-50 to-amber-100/50'
  },
  'gestao-publica': { 
    icon: Landmark, 
    color: 'text-indigo-600', 
    gradient: 'from-indigo-600 to-indigo-500',
    bgGradient: 'from-indigo-50 to-indigo-100/50'
}, };

export function SectorsSection({ sectors, onSectorClick }: SectorsSectionProps) {
  return (
    <section id="setores" className="py-20 sm:py-24 md:py-32 bg-gradient-to-b from-background to-muted/20 scroll-mt-16 relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div 
          className="absolute inset-0 opacity-50"
          style={{
            backgroundImage: `
              radial-gradient(circle at 20% 20%, hsl(var(--primary) / 0.03) 0%, transparent 50%),
              radial-gradient(circle at 80% 80%, hsl(var(--primary) / 0.03) 0%, transparent 50%)
            `
          }}
        />
        <div className="absolute inset-0 bg-grid-black/[0.02] bg-[size:20px_20px]" />
      </div>

      <div className="container mx-auto px-4">

        <div className="max-w-3xl mx-auto text-center mb-16 md:mb-24">
          <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6 bg-gradient-to-br from-foreground from-60% to-foreground/70 bg-clip-text text-transparent animate-in fade-in slide-in-from-bottom-4 duration-1000">
            Transformando Nossa Cidade
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-200">
            Explore os setores estratégicos para o desenvolvimento urbano. 
            <span className="block mt-2 font-medium text-foreground/80">
              Contribua com suas ideias ou inspire-se nas propostas da comunidade.
            </span>
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-7xl mx-auto">
          {sectors.map((sector, index) => {
            const details = sectorDetails[sector.slug] || { 
              icon: Sparkles, 
              color: 'text-primary', 
              gradient: 'from-primary to-primary/80',
              bgGradient: 'from-primary/10 to-primary/5'
            };
            const Icon = details.icon;

            return (
              <Card 
                key={sector.id}
                onClick={() => onSectorClick(sector.id)}
                className={cn(
                  "cursor-pointer group relative flex flex-col p-8 transition-all duration-500 overflow-hidden",
                  "border-2 border-border/50 hover:border-border/80",
                  "bg-background/60 backdrop-blur-sm hover:bg-background/80",
                  "hover:shadow-2xl hover:scale-105",
                  "animate-in fade-in zoom-in-95"
                )}
                style={{ 
                  animationDelay: `${200 + index * 100}ms`, 
                  animationFillMode: 'both' 
                }}
              >
                <div 
                  className={cn(
                    "absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-all duration-500",
                    details.bgGradient
                  )}
                />
                
                <div 
                  className={cn(
                    "absolute inset-0 rounded-xl bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-500",
                    details.gradient
                  )}
                  style={{ 
                    mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                    WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                    maskComposite: 'subtract',
                    WebkitMaskComposite: 'xor',
                    padding: '2px'
                  }}
                />

                <div className="relative z-10 flex flex-col h-full">

                  <div className="flex items-start justify-between mb-6">
                    <div className={cn(
                      "p-3 rounded-2xl transition-all duration-500 group-hover:scale-110",
                      "bg-gradient-to-br from-background to-background/80",
                      "shadow-lg group-hover:shadow-xl"
                    )}>
                      <Icon className={cn("size-7", details.color)} />
                    </div>
                    <ArrowRight className={cn(
                      "size-5 transition-all duration-500",
                      "text-muted-foreground group-hover:text-foreground",
                      "transform -translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100"
                    )} />
                  </div>

                  <div className="flex flex-col flex-grow">
                    <CardTitle className="text-2xl font-bold tracking-tight mb-4 group-hover:bg-gradient-to-br group-hover:from-foreground group-hover:to-foreground/70 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-500">
                      {sector.name}
                    </CardTitle>
                    <CardDescription className="text-base leading-relaxed text-muted-foreground flex-grow">
                      {sector.description || "Contribua com suas ideias para este setor estratégico."}
                    </CardDescription>
                  </div>

                  <div className="mt-6 pt-4 border-t border-border/40">
                    <span className="text-sm font-medium text-primary/80 group-hover:text-primary transition-colors duration-500">
                      Clique para contribuir →
                    </span>
                  </div>
                </div>
              </Card>
          ); })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16 animate-in fade-in duration-1000 delay-1000">
          <p className="text-lg text-muted-foreground">
            Não encontrou o setor ideal?{' '}
            <button 
              onClick={() => onSectorClick(0)}
              className="text-primary font-semibold hover:underline underline-offset-4 transition-all"
            >
              Sugira uma nova área
            </button>
          </p>
        </div>
      </div>
    </section>
); }