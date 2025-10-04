'use client';

import { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { ProposalWithDetails } from '@/types';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { 
  User, 
  MapPin, 
  Calendar, 
  ChevronDown,
  ChevronUp,
  Lightbulb,
  TrendingUp
} from 'lucide-react';

interface ProposalCardProps {
  proposal: ProposalWithDetails;
  variant?: 'default' | 'compact' | 'featured';
}

export function ProposalCard({ 
  proposal,
  variant = 'default' 
}: ProposalCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const authorName = proposal.citizen?.name ?? 'Anônimo';
  const authorRegion = proposal.citizen?.region?.name ?? 'Não informada';
  const sectorName = proposal.subcategory?.sector?.name ?? 'Setor não informado';
  const subcategoryName = proposal.subcategory?.name ?? 'Tema não informado';
  
  const description = proposal.description || 'Sem descrição fornecida.';
  const isLongText = description.length > 150;
  const displayText = isExpanded ? description : description.slice(0, 150) + (isLongText ? '...' : '');

  const getSectorColor = (sector: string) => {
    const colors: { [key: string]: string } = {
      'Desenvolvimento Social e Qualidade de Vida': 'bg-rose-100 text-rose-800 border-rose-200 hover:bg-rose-200',
      'Economia e Oportunidades': 'bg-emerald-100 text-emerald-800 border-emerald-200 hover:bg-emerald-200',
      'Mobilidade e Infraestrutura Urbana': 'bg-blue-100 text-blue-800 border-blue-200 hover:bg-blue-200',
      'Segurança Pública e Cidadania': 'bg-amber-100 text-amber-800 border-amber-200 hover:bg-amber-200',
      'Gestão Pública e Transparência': 'bg-indigo-100 text-indigo-800 border-indigo-200 hover:bg-indigo-200',
    };
    return colors[sector] || 'bg-gray-100 text-gray-800 border-gray-200 hover:bg-gray-200';
  };

  const isNew = Date.now() - new Date(proposal.created_at).getTime() < 3 * 24 * 60 * 60 * 1000;

  if (variant === 'compact') {
    return (
      <Card className="group cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-105 border-l-4 border-l-primary">
        <CardContent className="p-4">
          <div className="flex items-start justify-between">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-2">
                <Badge 
                  variant="secondary" 
                  className={cn("text-xs truncate max-w-full", getSectorColor(sectorName))}
                >
                  {sectorName}
                </Badge>
                {isNew && (
                  <Badge variant="default" className="bg-green-500 text-white text-xs">
                    Nova
                  </Badge>
                )}
              </div>
              <h3 className="font-semibold text-foreground line-clamp-2 group-hover:text-primary transition-colors">
                {proposal.title}
              </h3>
              <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                {description}
              </p>
            </div>
            <Lightbulb className="size-5 text-primary/60 ml-3 flex-shrink-0" />
          </div>
        </CardContent>
      </Card>
  ); }

  return (
    <Card className={cn(
      "group flex flex-col h-full transition-all duration-500 hover:shadow-xl border hover:border-primary/20 overflow-hidden",
      variant === 'featured' && "border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-transparent"
    )}>
      <CardHeader className="pb-3">
        <div className="flex flex-wrap items-center gap-2 mb-3">
          
          <Badge 
            variant="secondary"
            title={sectorName}
            className={cn(
              "font-medium transition-colors max-w-[130px] pr-2", 
              getSectorColor(sectorName)
            )}
          >
            <span className="truncate min-w-0">{sectorName}</span>
          </Badge>
          
          <Badge 
            variant="outline" 
            className="text-xs max-w-[130px] pr-4" 
            title={subcategoryName}
          >
            <span className="truncate min-w-0">{subcategoryName}</span>
          </Badge>

          {isNew && (
            <Badge variant="default" className="bg-green-500 text-white text-xs animate-pulse">
              Nova
            </Badge>
          )}
          {variant === 'featured' && (
            <Badge variant="default" className="bg-primary text-white text-xs">
              <TrendingUp className="size-3 mr-1" />
              Em Destaque
            </Badge>
          )}
        </div>
        
        <CardTitle className="text-xl leading-tight group-hover:text-primary transition-colors duration-300">
          {proposal.title}
        </CardTitle>
      </CardHeader>

      <CardContent className="flex-grow flex flex-col gap-4 pb-4">
        <div className="flex-grow">
          <p className={cn(
            "text-muted-foreground leading-relaxed transition-all duration-300",
            !isExpanded && "line-clamp-4"
          )}>
            {displayText}
          </p>
          
          {isLongText && (
            <Button
              variant="ghost"
              size="sm"
              className="mt-3 h-auto p-0 text-primary hover:text-primary/80 hover:bg-transparent font-medium"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              <span className="flex items-center gap-1">
                {isExpanded ? 'Ver menos' : 'Ver mais'}
                {isExpanded ? <ChevronUp className="size-4" /> : <ChevronDown className="size-4" />}
              </span>
            </Button>
          )}
        </div>
      </CardContent>

      <CardFooter className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 text-sm pt-4 border-t bg-muted/20 px-6 pb-6">
        <div className="flex items-center gap-1.5 text-muted-foreground min-w-0" title={`${authorName} (${authorRegion})`}>
          <User className="size-4 flex-shrink-0 text-foreground/60" />
          <span className="font-medium text-foreground/80 truncate">{authorName}</span>
          <span className="mx-1 text-foreground/40">·</span>
          <MapPin className="size-4 flex-shrink-0" />
          <span className="truncate">{authorRegion}</span>
        </div>
        
        <div className="flex items-center gap-1.5 text-muted-foreground">
          <Calendar className="size-4" />
          <time dateTime={proposal.created_at}>
            {new Date(proposal.created_at).toLocaleDateString('pt-BR', {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric'
            })}
          </time>
        </div>
      </CardFooter>

      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
    </Card>
); }