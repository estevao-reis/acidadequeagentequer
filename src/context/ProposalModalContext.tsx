'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { ProposalForm } from '@/components/forms/ProposalForm';
import { SupportForm } from '@/components/forms/SupportForm';
import { cn } from '@/lib/utils';

function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }
    const listener = () => {
      setMatches(media.matches);
    };
    media.addEventListener('change', listener);
    return () => media.removeEventListener('change', listener);
  }, [matches, query]);

  return matches;
}


type Sector = { id: number; name: string; };
type Subcategory = { id: number; name: string; sector_id: number; };
type Region = { id: string; name: string; };

interface ProposalModalContextType {
  openModal: (sectorId?: number) => void;
  openSupportModal: () => void;
}

const ProposalModalContext = createContext<ProposalModalContextType | undefined>(undefined);

interface ProposalModalProviderProps {
  children: ReactNode;
  sectors: Sector[];
  subcategories: Subcategory[];
  regions: Region[];
}

export function ProposalModalProvider({
  children,
  sectors,
  subcategories,
  regions,
}: ProposalModalProviderProps) {
  const [isProposalOpen, setIsProposalOpen] = useState(false);
  const [isSupportOpen, setIsSupportOpen] = useState(false);
  const [selectedSectorId, setSelectedSectorId] = useState<string | undefined>(undefined);
  const isMobile = useMediaQuery('(max-width: 768px)');

  const openModal = (sectorId?: number) => {
    setSelectedSectorId(sectorId ? String(sectorId) : undefined);
    setIsProposalOpen(true);
  };

  const openSupportModal = () => {
    setIsSupportOpen(true);
  };

  return (
    <ProposalModalContext.Provider value={{ openModal, openSupportModal }}>
      {children}
      
      <Sheet open={isProposalOpen} onOpenChange={setIsProposalOpen}>
        <SheetContent
          side={isMobile ? 'bottom' : 'right'}
          className={cn(
            "flex flex-col p-0",
            isMobile
              ? "h-[85vh] rounded-t-2xl"
              : "w-full md:w-1/2 lg:max-w-xl"
          )}
        >
          <SheetHeader className="sr-only">
            <SheetTitle>Formulário de Envio de Proposta</SheetTitle>
          </SheetHeader>
          <div className="flex-grow overflow-y-auto">
            <div className="p-6 md:p-8">
              <ProposalForm
                sectors={sectors}
                subcategories={subcategories}
                regions={regions}
                initialSectorId={selectedSectorId}
              />
            </div>
          </div>
        </SheetContent>
      </Sheet>

      <Sheet open={isSupportOpen} onOpenChange={setIsSupportOpen}>
        <SheetContent
          side={isMobile ? 'bottom' : 'right'}
          className={cn(
            "flex flex-col p-0",
            isMobile
              ? "h-[75vh] rounded-t-2xl"
              : "w-full md:w-1/2 lg:max-w-xl"
          )}
        >
          <SheetHeader className="sr-only">
            <SheetTitle>Formulário de Apoio ao Projeto</SheetTitle>
          </SheetHeader>
          <div className="flex-grow overflow-y-auto">
            <div className="p-6 md:p-8">
              <SupportForm regions={regions} />
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </ProposalModalContext.Provider>
); }

export function useProposalModal() {
  const context = useContext(ProposalModalContext);
  if (context === undefined) {
    throw new Error('useProposalModal must be used within a ProposalModalProvider');
  }
  return context;
}