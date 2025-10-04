'use client';

import { HeroSection } from '@/components/sections/HeroSection';
import { SectorsSection } from '@/components/sections/SectorsSection';
import { useProposalModal } from '@/context/ProposalModalContext';

type Sector = { id: number; name: string; description: string | null; slug: string; };

interface HomePageClientProps {
  sectors: Sector[];
}

export function HomePageClient({ sectors }: HomePageClientProps) {
  const { openModal } = useProposalModal();

  return (
    <>
      <HeroSection onButtonClick={() => openModal()} />

      <SectorsSection
        sectors={sectors}
        onSectorClick={(sectorId) => openModal(sectorId)}
      />
    </>
); }