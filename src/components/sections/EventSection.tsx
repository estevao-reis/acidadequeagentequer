'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Calendar, MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useProposalModal } from '@/context/ProposalModalContext';

export function EventSection() {
  const { openSupportModal } = useProposalModal();

  return (
    <section id="evento" className="py-20 sm:py-24 md:py-32 bg-muted/20">
      <div className="container mx-auto px-4">
        
        {/* Cabeçalho da Seção */}
        <div className="max-w-3xl mx-auto text-center mb-16 md:mb-24">
          <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6 bg-gradient-to-br from-foreground from-60% to-foreground/70 bg-clip-text text-transparent">
            Mais que Propostas
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed">
            A Cidade que a Gente Quer está nas ruas! E convidamos você para o nosso primeiro encontro, em Nova Colina.
          </p>
        </div>

        {/* Card do Evento */}
        <div className={cn(
          "max-w-6xl mx-auto bg-background/60 backdrop-blur-sm border border-border/50 rounded-2xl shadow-xl overflow-hidden",
          "transition-all duration-500 hover:shadow-2xl hover:border-border/80"
        )}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 items-center"> 
            
            {/* Imagem do Convite */}
            <div
              className={cn(
                "w-full h-full min-h-[1000px] sm:min-h-[1100px] md:min-h-[1300px] lg:min-h-[700px] relative",
                "order-2 lg:order-1",
                "bg-muted/30",
                "p-4 md:p-8",
                "rounded-l-lg rounded-r-lg md:rounded-r-none md:rounded-l-lg overflow-hidden"
              )}
            >
              <Image
                src="/convite-caminhada.jpeg"
                alt="Convite para o evento Vem Caminhar Comigo em Nova Colina"
                fill
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 33vw"
              />
            </div>

            {/* Textos e Botão */}
            <div className={cn(
              "p-8 md:p-12 flex flex-col justify-center",
              "order-1 lg:order-2", 
              "lg:col-span-2" 
            )}>
              <Badge 
                variant="default" 
                className="mb-4 w-fit bg-gradient-to-r from-primary to-primary/80"
              >
                Primeira Edição!
              </Badge>
              
              <h3 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                Um encontro.
              </h3>
              
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                O projeto "A Cidade que a Gente Quer" é um convite à ação! Teremos nossa primeira edição em Nova Colina para dialogar e construir juntos.
              </p>

              <div className="flex flex-col sm:flex-row sm:items-center gap-4 text-foreground/90 mb-8">
                <div className="flex items-center gap-2">
                  <MapPin className="size-5 text-primary" />
                  <span className="font-medium">Local: Nova Colina</span>
                </div>
                <span className="hidden sm:block text-muted-foreground">|</span>
                <div className="flex items-center gap-2">
                  <Calendar className="size-5 text-primary" />
                  <span className="font-medium">Quarta-feira, 12 de novembro de 2025 às 19:00!</span>
                </div>
              </div>

              <Button 
                size="lg" 
                className="group w-full sm:w-fit text-lg py-6 px-8"
                onClick={openSupportModal}
              >
                Confirme sua Presença
                <ArrowRight className="ml-2 size-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>

          </div>
        </div>

      </div>
    </section>
); }