'use client';

import { Button } from '@/components/ui/button';
import { ArrowRight, Users, Lightbulb } from 'lucide-react';
import Image from 'next/image';
import { useRef, useEffect, useState } from 'react';
import Link from 'next/link';

interface HeroSectionProps {
  onButtonClick: () => void;
}

export function HeroSection({ onButtonClick }: HeroSectionProps) {
  const [isVisible, setIsVisible] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    setIsVisible(true);
    
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        console.log('Autoplay bloqueado, usando fallback de imagem');
  }); } }, []);

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden">


      <div className="absolute inset-0 z-0">
        {/* Vídeo background (opcional - adicione um vídeo MP4 na pasta public) */}
        {/* <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          className="w-full h-full object-cover opacity-20"
          poster="/hero-background.png"
        >
          <source src="/hero-bg-video.mp4" type="video/mp4" />
        </video> */}
        


        <Image
          src="/hero-background.png"
          alt="Background da cidade"
          fill
          priority
          className="object-cover object-center"
          quality={90}
        />
        
        <div className="absolute inset-0 bg-gradient-to-br from-background/95 via-background/60 to-background/50" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/30" />
        
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-primary rounded-full animate-pulse" />
          <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-primary rounded-full animate-pulse delay-300" />
          <div className="absolute bottom-1/4 left-1/2 w-1 h-1 bg-primary rounded-full animate-pulse delay-700" />
        </div>
      </div>

      <div className="container relative z-10 mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto">

          {/* Título */}
          <h1 className={`text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter mb-6 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <span className="bg-gradient-to-br from-foreground from-60% to-foreground/70 bg-clip-text text-transparent">
              A cidade
            </span>
            <br />
            <span className="bg-gradient-to-r from-primary via-primary/90 to-primary/80 bg-clip-text text-transparent">
              que queremos
            </span>
          </h1>

          {/* Subtítulo */}
          <div className={`max-w-2xl mx-auto transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed mb-2">
              <span className="font-semibold text-foreground/90">Construída coletivamente</span> através da 
              voz e ação de cada cidadão
            </p>
          </div>

          {/* Descrição */}
          <div className={`max-w-3xl mx-auto transition-all duration-1000 delay-600 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <p className="text-lg md:text-xl text-muted-foreground/90 leading-relaxed mb-8">
              Sua voz é a ferramenta mais poderosa para a mudança. 
              <span className="block mt-2 font-medium text-foreground/80">
                Participe, proponha e ajude a transformar demandas em políticas públicas reais para o Distrito Federal.
              </span>
            </p>
          </div>

          <div className={`flex flex-col sm:flex-row gap-4 justify-center items-center mt-12 transition-all duration-1000 delay-800 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <Button 
              size="lg" 
              onClick={onButtonClick}
              className="relative group px-8 py-6 text-lg font-semibold shadow-2xl transition-all duration-300 hover:scale-105 hover:shadow-2xl"
            >
              <span className="flex items-center gap-2">
                <Lightbulb className="size-5" />
                Quero Enviar Minha Ideia
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </span>
              
              <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-primary to-primary/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
            </Button>

            <Button
              asChild
              variant="outline"
              size="lg"
              className="px-8 py-6 text-lg font-medium border-2 backdrop-blur-sm bg-background/50 hover:bg-background/80 transition-transform duration-300 hover:scale-105"
            >
              <Link href="/propostas">
                <Users className="mr-2 size-5" />
                Conhecer as Propostas
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Indicador de Scroll */}
      <div className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 transition-all duration-1000 delay-1200 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
        <button
          onClick={() => document.getElementById('setores')?.scrollIntoView({ behavior: 'smooth' })}
          className="flex flex-col items-center gap-2 text-muted-foreground hover:text-foreground transition-colors group"
        >
          <span className="text-sm font-medium">Explore as Áreas</span>
          <div className="w-6 h-10 border-2 border-border rounded-full flex justify-center">
            <div className="w-1 h-3 bg-muted-foreground rounded-full mt-2 group-hover:bg-primary animate-bounce" />
          </div>
        </button>
      </div>
    </section>
); }