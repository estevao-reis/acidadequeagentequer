'use server';

import { createClient } from '@/lib/supabase/server';

type ActionResult = {
  success: boolean;
  message: string;
};

export async function registerSupporter(formData: FormData): Promise<ActionResult> {
  const supabase = await createClient();

  const rawData = {
    name: formData.get('name') as string,
    phone_number: (formData.get('phone_number') as string || '').replace(/\D/g, ''),
    region_id: formData.get('region_id') as string,
    event_id: formData.get('event_id') as string,
  };

  if (!rawData.name || !rawData.phone_number || !rawData.region_id || !rawData.event_id) {
    return { success: false, message: 'Por favor, preencha todos os campos obrigatórios.' };
  }

  try {    
    let citizenId = '';

    const { data: existingCitizen } = await supabase
      .from('Citizens')
      .select('id')
      .eq('phone_number', rawData.phone_number)
      .single();

    if (existingCitizen) {
      citizenId = existingCitizen.id;
      
    } else {
      const { data: newCitizen, error: createError } = await supabase
        .from('Citizens')
        .insert({
          name: rawData.name,
          phone_number: rawData.phone_number,
          region_id: rawData.region_id,
        })
        .select('id')
        .single();

      if (createError) throw new Error(`Erro ao criar perfil: ${createError.message}`);
      citizenId = newCitizen.id;
    }

    const { error: registrationError } = await supabase
      .from('EventRegistrations')
      .insert({
        citizen_id: citizenId,
        event_id: rawData.event_id
      });

    if (registrationError) {
      if (registrationError.code === '23505') {
         return { success: true, message: 'Você já está confirmado neste evento!' };
      }
      throw new Error(`Erro na inscrição: ${registrationError.message}`);
    }

    return { success: true, message: 'Presença confirmada com sucesso! Nos vemos lá.' };

  } catch (error) {
    console.error('Erro no registro do apoiador:', error);
    const errorMessage = (error as Error).message || 'Ocorreu um erro inesperado.';
    return { success: false, message: errorMessage };
} }