import { createClient } from '@/lib/supabase/server';
import { ProposalCard } from '@/components/cards/ProposalCard';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import type { ProposalWithDetails } from '@/types';

export const revalidate = 60;

export default async function PropostasPage() {
  const supabase = await createClient();

  const { data: proposals, error } = await supabase
    .from('Proposals')
    .select(`
      id,
      created_at,
      title,
      description,
      citizen:Citizens!inner ( name, region:AdministrativeRegions ( name ) ),
      subcategory:Subcategories!inner ( name, sector:Sectors!inner ( name ) )
    `)
    .order('created_at', { ascending: false })
    .returns<ProposalWithDetails[]>();

  if (error) {
    console.error('Erro ao buscar propostas:', error);
    return (
      <div className="container text-center py-10">
        <p className="text-destructive">Não foi possível carregar as propostas no momento. Tente novamente mais tarde.</p>
      </div>
  ); }

  return (
    <main className="py-12 bg-muted/20">
      <div className="container">
        <header className="mb-10">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/">Início</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>Propostas da Comunidade</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
            <h1 className="text-4xl font-bold tracking-tighter mt-4">Propostas da Comunidade</h1>
            <p className="mt-2 text-muted-foreground">
                Veja as ideias enviadas pela população para construirmos um DF melhor.
            </p>
        </header>

        {proposals && proposals.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
            {proposals.map((proposal) => (
              <ProposalCard key={proposal.id} proposal={proposal} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 border-dashed border-2 rounded-xl">
             <h2 className="text-2xl font-semibold">Nenhuma proposta enviada ainda.</h2>
             <p className="text-muted-foreground mt-2">Seja o primeiro a compartilhar sua ideia!</p>
          </div>
        )}
      </div>
    </main>
); }