'use client';

import { useEffect, useRef, useState } from 'react';
import { useFormStatus } from 'react-dom';
import { submitProposal } from '@/lib/actions/proposal.actions';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

type Sector = { id: number; name: string; };
type Subcategory = { id: number; name: string; sector_id: number; };
type Region = { id: string; name: string; };

interface ProposalFormProps {
  sectors: Sector[];
  subcategories: Subcategory[];
  regions: Region[];
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="w-full" disabled={pending}>
      {pending ? 'Enviando sua Ideia...' : 'Registrar Minha Ideia'}
    </Button>
); }

export function ProposalForm({ sectors, subcategories, regions }: ProposalFormProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [selectedSector, setSelectedSector] = useState<string>('');
  const [filteredSubcategories, setFilteredSubcategories] = useState<Subcategory[]>([]);

  useEffect(() => {
    if (selectedSector) {
      setFilteredSubcategories(
        subcategories.filter(sc => sc.sector_id === parseInt(selectedSector))
      );
    } else {
      setFilteredSubcategories([]);
    }
  }, [selectedSector, subcategories]);

  const handleAction = async (formData: FormData) => {
    const result = await submitProposal(formData);
    setMessage(result.message);
    setIsSuccess(result.success);
    if (result.success) {
      formRef.current?.reset();
      setSelectedSector('');
    }
  };

  return (
    <form ref={formRef} action={handleAction} className="w-full max-w-2xl mx-auto bg-card p-8 rounded-2xl shadow-xl border">
      <div className="text-center mb-10">
          <h3 className="text-3xl font-bold">Compartilhe sua Ideia</h3>
          <p className="text-muted-foreground mt-2">Juntos, podemos construir um futuro melhor para o DF.</p>
      </div>
      
      <div className="grid gap-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="grid gap-2">
            <Label htmlFor="name">Seu Nome</Label>
            <Input id="name" name="name" required placeholder="Nome completo" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Seu E-mail</Label>
            <Input id="email" name="email" type="email" required placeholder="email@exemplo.com" />
          </div>
        </div>

        <div className="grid gap-2">
            <Label htmlFor="region_id">Sua Região Administrativa</Label>
            <Select name="region_id" required>
                <SelectTrigger><SelectValue placeholder="Selecione sua RA" /></SelectTrigger>
                <SelectContent>
                    {regions.map(region => <SelectItem key={region.id} value={region.id}>{region.name}</SelectItem>)}
                </SelectContent>
            </Select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           <div className="grid gap-2">
              <Label htmlFor="sector_id">Setor Principal</Label>
              <Select name="sector_id" required onValueChange={setSelectedSector}>
                  <SelectTrigger><SelectValue placeholder="Escolha um setor" /></SelectTrigger>
                  <SelectContent>
                      {sectors.map(sector => <SelectItem key={sector.id} value={String(sector.id)}>{sector.name}</SelectItem>)}
                  </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="subcategory_id">Tema Específico</Label>
              <Select name="subcategory_id" required disabled={!selectedSector}>
                  <SelectTrigger><SelectValue placeholder="Escolha um tema" /></SelectTrigger>
                  <SelectContent>
                      {filteredSubcategories.map(sub => <SelectItem key={sub.id} value={String(sub.id)}>{sub.name}</SelectItem>)}
                  </SelectContent>
              </Select>
            </div>
        </div>

        <div className="grid gap-2">
          <Label htmlFor="title">Título da Proposta</Label>
          <Input id="title" name="title" required placeholder="Um resumo da sua ideia em uma frase" />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="description">Descreva sua Ideia</Label>
          <Textarea id="description" name="description" required placeholder="Detalhe sua proposta. O que é? Por que é importante? Como pode ser implementada?" rows={5} />
        </div>

        {message && (
          <div className={`text-sm font-medium text-center p-3 rounded-md ${isSuccess ? 'bg-green-100 text-green-800' : 'bg-destructive/10 text-destructive'}`}>
            {message}
          </div>
        )}

        <SubmitButton />
      </div>
    </form>
); }