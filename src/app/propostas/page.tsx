'use client';

import { createClient } from '@/lib/supabase/client';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import type { ProposalWithDetails } from '@/types';
import { ProposalsClientSection } from './ProposalsClientSection';
import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

function ProposalsContent() {
  const [proposals, setProposals] = useState<ProposalWithDetails[]>([]);
  const [sectors, setSectors] = useState<{ id: number; name: string; slug: string }[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const searchParams = useSearchParams();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const supabase = createClient();

      const { data: proposalsData, error: proposalsError } = await supabase
        .from('Proposals')
        .select(`
          id,
          created_at,
          title,
          description,
          citizen:Citizens!inner ( name, region:AdministrativeRegions ( name ) ),
          subcategory:Subcategories!inner ( name, sector:Sectors!inner ( name ) )
        `)
        .order('created_at', { ascending: false });

      const { data: sectorsData, error: sectorsError } = await supabase
        .from('Sectors')
        .select('id, name, slug')
        .order('name');

      if (proposalsError || sectorsError) {
        console.error('Erro ao buscar dados:', proposalsError || sectorsError);
        setError('Não foi possível carregar as propostas. Tente novamente mais tarde.');
      } else {
        setProposals(proposalsData as unknown as ProposalWithDetails[] || []);
        setSectors(sectorsData || []);
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  if (error) {
    return (
      <div className="container text-center py-10">
        <p className="text-destructive">{error}</p>
      </div>
  ); }

  if (loading) {
    return (
        <div className="container text-center py-10">
            <p>Carregando propostas...</p>
        </div>
  ) }

  const initialSearch = searchParams.get('search') || undefined;
  const initialSector = searchParams.get('sector') || undefined;
  const initialSort = searchParams.get('sort') || undefined;

  return (
    <ProposalsClientSection
      proposals={proposals}
      sectors={sectors}
      initialSearch={initialSearch}
      initialSector={initialSector}
      initialSort={initialSort}
    />
); }

export default function PropostasPage() {
  return (
    <main className="pt-28 md:pt-32 pb-12 bg-gradient-to-b from-background to-muted/10 min-h-screen">
      <div className="container mx-auto px-4">
        <header className="mb-12 max-w-6xl mx-auto">
          <Breadcrumb className="mb-6">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/" className="text-muted-foreground hover:text-foreground transition-colors">
                  Início
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage className="text-foreground font-semibold">
                  Propostas da Comunidade
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter bg-gradient-to-br from-foreground from-60% to-foreground/70 bg-clip-text text-transparent mb-4">
              Propostas da Comunidade
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Explore as ideias enviadas pela população e participe da construção de um Distrito Federal melhor para todos.
            </p>
          </div>
        </header>

        <Suspense fallback={<div className="text-center"><p>Carregando...</p></div>}>
          <ProposalsContent />
        </Suspense>
      </div>
    </main>
); }