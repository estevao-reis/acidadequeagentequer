'use client';

import { useState, useMemo } from 'react';
import { ProposalCard } from '@/components/cards/ProposalCard';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, X, TrendingUp } from "lucide-react";
import type { ProposalWithDetails } from '@/types';

interface ProposalsClientSectionProps {
  proposals: ProposalWithDetails[];
  sectors: { id: number; name: string; slug: string }[];
  initialSearch?: string;
  initialSector?: string;
  initialSort?: string;
}

export function ProposalsClientSection({
  proposals,
  sectors,
  initialSearch = '',
  initialSector = '',
  initialSort = 'recent'
}: ProposalsClientSectionProps) {
  const [search, setSearch] = useState(initialSearch);
  const [selectedSector, setSelectedSector] = useState(initialSector);
  const [sortBy, setSortBy] = useState(initialSort);

  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + '...';
  };

  const filteredAndSortedProposals = useMemo(() => {
    let result = [...proposals];

    if (search) {
      const searchLower = search.toLowerCase();
      result = result.filter(p =>
        p.title.toLowerCase().includes(searchLower) ||
        (p.description && p.description.toLowerCase().includes(searchLower)) ||
        p.citizen?.name?.toLowerCase().includes(searchLower) ||
        p.subcategory?.name?.toLowerCase().includes(searchLower)
    ); }

    if (selectedSector) {
      result = result.filter(p => p.subcategory?.sector?.name === selectedSector);
    }

    switch (sortBy) {
      case 'oldest':
        result.sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());
        break;
      case 'title':
        result.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'recent':
      default:
        result.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
        break;
    }

    return result;
  }, [proposals, search, selectedSector, sortBy]);

  const clearFilters = () => {
    setSearch('');
    setSelectedSector('');
    setSortBy('recent');
  };

  const hasActiveFilters = search || selectedSector || sortBy !== 'recent';

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8 p-6 rounded-2xl bg-background border shadow-sm">
        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
          <div className="flex flex-col sm:flex-row gap-4 flex-1 w-full">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground size-4" />
              <Input
                placeholder="Buscar propostas, autores ou temas..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
              />
            </div>

            <Select
              value={selectedSector || 'all'}
              onValueChange={(value) => setSelectedSector(value === 'all' ? '' : value)}
            >
              <SelectTrigger className="w-full sm:w-[200px]">
                <Filter className="size-4 mr-2" />
                <SelectValue placeholder="Todos os setores" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os setores</SelectItem>
                {sectors.map((sector) => (
                  <SelectItem key={sector.id} value={sector.name}>
                    {truncateText(sector.name, 30)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <TrendingUp className="size-4 mr-2" />
                <SelectValue placeholder="Ordenar por" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="recent">Mais recentes</SelectItem>
                <SelectItem value="oldest">Mais antigas</SelectItem>
                <SelectItem value="title">Ordem alfabética</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {hasActiveFilters && (
            <Button variant="outline" onClick={clearFilters} className="whitespace-nowrap">
              <X className="size-4 mr-2" />
              Limpar Filtros
            </Button>
          )}
        </div>
        <div className="flex flex-wrap items-center justify-between mt-4 pt-4 border-t">
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="text-sm">
              {filteredAndSortedProposals.length} {filteredAndSortedProposals.length === 1 ? 'proposta encontrada' : 'propostas encontradas'}
            </Badge>
          </div>
          {filteredAndSortedProposals.length > 0 && (
            <div className="text-sm text-muted-foreground">
              Ordenado por {sortBy === 'recent' ? 'mais recentes' : sortBy === 'oldest' ? 'mais antigas' : 'ordem alfabética'}
            </div>
          )}
        </div>
      </div>

      {filteredAndSortedProposals.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
          {filteredAndSortedProposals.map((proposal, index) => (
            <div
              key={proposal.id}
              className="animate-in fade-in slide-in-from-bottom-4"
              style={{ animationDelay: `${Math.min(index * 50, 500)}ms` }}
            >
              <ProposalCard proposal={proposal} />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 border-2 border-dashed rounded-2xl bg-background/50">
          <div className="max-w-md mx-auto">
            <Search className="size-16 text-muted-foreground/40 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">Nenhuma proposta encontrada</h2>
            <p className="text-muted-foreground mb-6">Tente ajustar seus filtros de busca para ver mais resultados.</p>
            <Button onClick={clearFilters}>
              <X className="size-4 mr-2" />
              Limpar Filtros
            </Button>
          </div>
        </div>
      )}
    </div>
); }