import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import {
  HeartHandshake,
  TrendingUp,
  Building,
  Shield,
  ScrollText,
  Sparkles,
  Icon as LucideIcon,
} from 'lucide-react';
import { ComponentType } from 'react';

type Sector = {
  id: number;
  name: string;
  description: string | null;
  slug: string;
}

interface SectorsSectionProps {
  sectors: Sector[];
}

const sectorDetails: { [key: string]: { icon: ComponentType<{ className?: string }>; color: string } } = {
  'desenvolvimento-social': { icon: HeartHandshake, color: 'text-rose-500' },
  'economia-oportunidades': { icon: TrendingUp, color: 'text-emerald-500' },
  'mobilidade-infraestrutura': { icon: Building, color: 'text-blue-500' },
  'seguranca-cidania': { icon: Shield, color: 'text-amber-500' },
  'gestao-publica': { icon: ScrollText, color: 'text-indigo-500' },
};

export function SectorsSection({ sectors }: SectorsSectionProps) {
  const sectorsWithSlug = sectors.map(sector => ({
    ...sector,
    slug: sector.name.toLowerCase().replace(/ e /g, '-').replace(/ /g, '-').replace(/[^a-z-]/g, ''),
  }));

  return (
    <section id="setores" className="py-20 bg-muted/20 scroll-mt-16">
      <div className="container mx-auto">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-4">
            Nossas Áreas de Foco
          </h2>
          <p className="text-lg text-muted-foreground">
            As propostas são organizadas em 5 grandes setores que representam os pilares para o desenvolvimento do Distrito Federal.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sectorsWithSlug.map((sector) => {
            const details = sectorDetails[sector.slug] || { icon: Sparkles, color: 'text-foreground' };
            const Icon = details.icon;

            return (
              <Card 
                key={sector.id} 
                className="flex flex-col text-center items-center transition-all duration-300 hover:shadow-xl hover:-translate-y-2"
              >
                <CardHeader className="items-center">
                  <div className={`mb-4 p-4 bg-primary/10 rounded-full ${details.color}`}>
                    <Icon className="size-8" />
                  </div>
                  <CardTitle className="text-lg">{sector.name}</CardTitle>
                  <CardDescription className="mt-2">{sector.description}</CardDescription>
                </CardHeader>
              </Card>
          ); })}
            <Card className="flex flex-col items-center justify-center text-center p-8 border-dashed transition-all duration-300 hover:shadow-xl hover:-translate-y-2 hover:border-primary">
                <CardHeader className="items-center">
                    <div className="mb-4 p-4 bg-primary/10 rounded-full text-primary">
                      <Sparkles className="size-8" />
                    </div>
                    <CardTitle className="text-lg">E muito mais...</CardTitle>
                    <CardDescription className="mt-2">Sua ideia pode inaugurar novas frentes de trabalho para o futuro da nossa cidade.</CardDescription>
                </CardHeader>
            </Card>
        </div>
      </div>
    </section>
); }