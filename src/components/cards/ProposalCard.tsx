import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { ProposalWithDetails } from '@/types';

interface ProposalCardProps {
  proposal: ProposalWithDetails;
}

export function ProposalCard({ proposal }: ProposalCardProps) {
  const authorName = proposal.citizen?.name ?? 'Anônimo';
  const authorRegion = proposal.citizen?.region?.name ?? 'Não informada';
  const sectorName = proposal.subcategory?.sector?.name ?? 'Setor não informado';
  const subcategoryName = proposal.subcategory?.name ?? 'Tema não informado';

  return (
    <Card className="flex flex-col h-full">
      <CardHeader>
        <div className="flex flex-wrap gap-2 mb-4">
            <Badge variant="secondary">{sectorName}</Badge>
            <Badge variant="outline">{subcategoryName}</Badge>
        </div>
        <CardTitle>{proposal.title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-muted-foreground line-clamp-4">{proposal.description}</p>
      </CardContent>
      <CardFooter className="flex flex-col items-start gap-2 text-sm text-muted-foreground pt-4 border-t mt-auto px-6 pb-6">
        <span><strong>Autor:</strong> {authorName} ({authorRegion})</span>
        <span><strong>Enviada em:</strong> {new Date(proposal.created_at).toLocaleDateString('pt-BR')}</span>
      </CardFooter>
    </Card>
); }