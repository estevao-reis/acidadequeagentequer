'use client';

import { useRef, useState } from 'react';
import { useFormStatus } from 'react-dom';
import { registerSupporter } from '@/lib/actions/citizen.actions';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { User, CheckCircle, AlertCircle, CalendarCheck } from 'lucide-react';
import { cn } from '@/lib/utils';

const EVENT_ID = '00000000-0000-0000-0000-000000000001'; 

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
            Confirmando...
          </>
        ) : (
          <>
            <CalendarCheck className="size-5 transition-transform group-hover:scale-110" />
            Confirmar Presença
          </>
        )}
      </div>
      <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-primary to-primary/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
    </Button>
); }

interface SupportFormProps {
  regions: { id: string; name: string; }[];
}

export function SupportForm({ regions }: SupportFormProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleAction = async (formData: FormData) => {
    setMessage(null);
    const result = await registerSupporter(formData);
    setMessage(result.message);
    setIsSuccess(result.success);

    if (result.success) {
      if (!result.message.includes("já está confirmado")) {
         formRef.current?.reset();
      }
      formRef.current?.scrollIntoView({ behavior: 'smooth' });
  } };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card className="border-0 shadow-none bg-transparent mb-8">
        <CardHeader className="text-center pb-4">
          <CardTitle className="text-3xl md:text-4xl font-bold bg-gradient-to-br from-foreground from-60% to-foreground/70 bg-clip-text text-transparent">
            Confirme sua Presença
          </CardTitle>
          <CardDescription className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Garanta seu lugar na nossa primeira edição em Nova Colina! Preencha abaixo.
          </CardDescription>
        </CardHeader>
      </Card>

      <Card>
        <CardContent className="p-6 md:p-8">
          <form ref={formRef} action={handleAction} className="space-y-6">            
            <input type="hidden" name="event_id" value={EVENT_ID} />

            <div className="space-y-4">
               <h3 className="text-lg font-semibold flex items-center gap-2 border-b pb-2">
                <User className="size-5 text-primary" />
                Sobre Você
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name_support_event">Nome Completo</Label>
                  <Input id="name_support_event" name="name" required placeholder="Seu nome" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone_number_support_event" className="flex items-center gap-2">
                    Telefone (com DDD)
                  </Label>
                  <Input
                    id="phone_number_support_event"
                    name="phone_number"
                    type="tel"
                    required
                    placeholder="61999999999"
                    pattern="[0-9]{10,11}"
                    title="Apenas números, de 10 a 11 dígitos"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="region_id_support_event" className="flex items-center gap-2">
                  Sua Região Administrativa
                </Label>
                <Select name="region_id" required>
                  <SelectTrigger id="region_id_support_event" className="w-full">
                    <SelectValue placeholder="Selecione sua RA" />
                  </SelectTrigger>
                  <SelectContent>
                    {regions.map(region => <SelectItem key={region.id} value={region.id}>{region.name}</SelectItem>)}
                  </SelectContent>
                </Select>
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
                </div>
              </div>
            )}

            <SubmitButton />
          </form>
        </CardContent>
      </Card>
    </div>
); }