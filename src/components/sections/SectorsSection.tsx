import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

type Sector = {
  id: number;
  name: string;
  description: string | null;
}

interface SectorsSectionProps {
  sectors: Sector[];
}

export function SectorsSection({ sectors }: SectorsSectionProps) {
  return (
    <section id="setores" className="py-20 bg-background scroll-mt-16">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-4">
            Nossas Áreas de Foco
          </h2>
          <p className="text-lg text-muted-foreground">
            As propostas são organizadas em 5 grandes setores que representam os pilares para o desenvolvimento do Distrito Federal.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sectors.map((sector) => (
            <Card key={sector.id} className="flex flex-col">
              <CardHeader>
                <CardTitle>{sector.name}</CardTitle>
                <CardDescription>{sector.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
            <Card className="flex flex-col items-center justify-center text-center p-8 border-dashed">
                <CardHeader>
                    <CardTitle>E muito mais...</CardTitle>
                    <CardDescription>Sua ideia pode inaugurar novas frentes de trabalho para o futuro da nossa cidade.</CardDescription>
                </CardHeader>
            </Card>
        </div>
      </div>
    </section>
); }