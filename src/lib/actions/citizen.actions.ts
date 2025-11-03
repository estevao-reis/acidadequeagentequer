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
  };

  if (!rawData.name || !rawData.phone_number || !rawData.region_id) {
    return { success: false, message: 'Por favor, preencha todos os campos obrigatórios.' };
  }

  try {
    const { data: existingCitizen, error: citizenError } = await supabase
      .from('Citizens')
      .select('id')
      .eq('phone_number', rawData.phone_number)
      .single();

    if (citizenError && citizenError.code !== 'PGRST116') {
      throw new Error(`Erro ao verificar cidadão: ${citizenError.message}`);
    }

    if (existingCitizen) {
      return { success: true, message: 'Obrigado! Você já está registrado como apoiador.' };
    }

    const { error: newCitizenError } = await supabase
      .from('Citizens')
      .insert({
        name: rawData.name,
        phone_number: rawData.phone_number,
        region_id: rawData.region_id,
      })
      .select('id')
      .single();

    if (newCitizenError) {
      if (newCitizenError.message.includes('Citizens_phone_number_key')) {
         return { success: false, message: 'Este número de telefone já está cadastrado.' };
      }
      throw new Error(`Erro ao criar perfil: ${newCitizenError.message}`);
    }

    return { success: true, message: 'Seu apoio foi registrado com sucesso! Agradecemos sua participação.' };

  } catch (error) {
    console.error('Erro no registro do apoiador:', error);
    const errorMessage = (error as Error).message || 'Ocorreu um erro inesperado.';
    return { success: false, message: errorMessage };
} }