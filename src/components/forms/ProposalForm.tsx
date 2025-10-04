'use client';

import { useEffect, useRef, useState } from 'react';
import { useFormStatus } from 'react-dom';
import { submitProposal } from '@/lib/actions/proposal.actions';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  User,
  Folder,
  FileText,
  Send,
  CheckCircle,
  AlertCircle,
  ArrowRight,
} from 'lucide-react';
import { cn } from '@/lib/utils';

type Sector = { id: number; name: string; };
type Subcategory = { id: number; name: string; sector_id: number; };
type Region = { id: string; name: string; };

interface ProposalFormProps {
  sectors: Sector[];
  subcategories: Subcategory[];
  regions: Region[];
  initialSectorId?: string;
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      className="w-full group relative overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-lg"
      disabled={pending}
      size="lg"
    >
      <div className="flex items-center justify-center gap-2">
        {pending ? (
          <>
            <div className="size-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
            Enviando sua Ideia...
          </>
        ) : (
          <>
            <Send className="size-5 transition-transform group-hover:scale-110" />
            Registrar Minha Ideia
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </>
        )}
      </div>
      <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-primary to-primary/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
    </Button>
  );
}

export function ProposalForm({ sectors, subcategories, regions, initialSectorId }: ProposalFormProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [selectedSector, setSelectedSector] = useState<string>(initialSectorId || '');
  const [filteredSubcategories, setFilteredSubcategories] = useState<Subcategory[]>([]);
  const [characterCount, setCharacterCount] = useState(0);

  useEffect(() => {
    if (initialSectorId) {
      setSelectedSector(initialSectorId);
    }
  }, [initialSectorId]);

  useEffect(() => {
    if (selectedSector) {
      setFilteredSubcategories(
        subcategories.filter(sc => sc.sector_id === parseInt(selectedSector, 10))
      );
    } else {
      setFilteredSubcategories([]);
    }
  }, [selectedSector, subcategories]);

  const handleAction = async (formData: FormData) => {
    setMessage(null);
    const result = await submitProposal(formData);
    setMessage(result.message);
    setIsSuccess(result.success);

    if (result.success) {
      formRef.current?.reset();
      setSelectedSector('');
      setCharacterCount(0);
      formRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCharacterCount(e.target.value.length);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card className="border-0 shadow-none bg-transparent mb-8">
        <CardHeader className="text-center pb-4">
          <CardTitle className="text-3xl md:text-4xl font-bold bg-gradient-to-br from-foreground from-60% to-foreground/70 bg-clip-text text-transparent">
            Compartilhe Sua Ideia
          </CardTitle>
          <CardDescription className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Sua proposta pode ser o início de uma grande transformação. Preencha os campos abaixo.
          </CardDescription>
        </CardHeader>
      </Card>

      <Card>
        <CardContent className="p-6 md:p-8">
          <form ref={formRef} action={handleAction} className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center gap-2 border-b pb-2">
                <User className="size-5 text-primary" />
                Sobre Você
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nome Completo</Label>
                  <Input id="name" name="name" required placeholder="Seu nome" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone_number" className="flex items-center gap-2">
                    Telefone (com DDD)
                  </Label>
                  <Input
                    id="phone_number"
                    name="phone_number"
                    type="tel"
                    required
                    placeholder="(61) 99999-9999"
                    pattern="\([0-9]{2}\) [0-9]{5}-[0-9]{4}"
                    title="Formato esperado: (XX) XXXXX-XXXX"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="region_id" className="flex items-center gap-2">
                    Sua Região Administrativa
                </Label>
                <Select name="region_id" required>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Selecione sua RA" />
                  </SelectTrigger>
                  <SelectContent>
                    {regions.map(region => <SelectItem key={region.id} value={region.id}>{region.name}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center gap-2 border-b pb-2">
                <Folder className="size-5 text-primary" />
                Categorize sua Ideia
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="sector_id">Setor Principal</Label>
                  <Select name="sector_id" required onValueChange={setSelectedSector} defaultValue={initialSectorId}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Escolha um setor" />
                    </SelectTrigger>
                    <SelectContent>
                      {sectors.map(sector => <SelectItem key={sector.id} value={String(sector.id)}>{sector.name}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="subcategory_id" className="flex items-center gap-2">
                        Tema Específico
                    </Label>
                  <Select key={selectedSector} name="subcategory_id" required disabled={!selectedSector}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder={selectedSector ? "Escolha um tema" : "Selecione o setor"} />
                    </SelectTrigger>
                    <SelectContent>
                      {filteredSubcategories.map(sub => <SelectItem key={sub.id} value={String(sub.id)}>{sub.name}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center gap-2 border-b pb-2">
                <FileText className="size-5 text-primary" />
                Detalhes da Proposta
              </h3>
              <div className="space-y-2">
                <Label htmlFor="title">Título da Proposta</Label>
                <Input id="title" name="title" required placeholder="Um resumo claro e objetivo da sua ideia" />
                <p className="text-xs text-muted-foreground">Capture a essência da sua proposta.</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Descreva sua Ideia</Label>
                <Textarea
                  id="description"
                  name="description"
                  required
                  placeholder="Detalhe sua proposta: O que é? Por que é importante? Como pode ser implementada? Quem será beneficiado?"
                  rows={6}
                  onChange={handleDescriptionChange}
                  className="min-h-[140px]"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Mínimo de 50 caracteres recomendado</span>
                  <span className={cn(characterCount > 50 ? "text-green-600" : "text-amber-600")}>
                    {characterCount} caracteres
                  </span>
                </div>
              </div>
            </div>

            {message && (
              <div className={cn(
                "p-4 rounded-lg border flex items-start gap-3 animate-in fade-in",
                isSuccess
                  ? "bg-green-50 border-green-200 text-green-800"
                  : "bg-destructive/10 border-destructive/20 text-destructive"
              )}>
                {isSuccess ? <CheckCircle className="size-5 flex-shrink-0 mt-0.5" /> : <AlertCircle className="size-5 flex-shrink-0 mt-0.5" />}
                <div>
                  <p className="font-semibold">{message}</p>
                  {isSuccess && <p className="text-sm mt-1 opacity-90">Obrigado por sua contribuição!</p>}
                </div>
              </div>
            )}

            <SubmitButton />
          </form>
        </CardContent>
      </Card>
    </div>
); }