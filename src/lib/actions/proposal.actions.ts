'use server';

import { revalidatePath } from 'next/cache';
import { createClient } from '@/lib/supabase/server';

type ActionResult = {
  success: boolean;
  message: string;
};

export async function submitProposal(formData: FormData): Promise<ActionResult> {
  const supabase = await createClient();

  const rawData = {
    name: formData.get('name') as string,
    phone_number: (formData.get('phone_number') as string || '').replace(/\D/g, ''),
    region_id: formData.get('region_id') as string,
    subcategory_id: formData.get('subcategory_id') as string,
    title: formData.get('title') as string,
    description: formData.get('description') as string,
  };

  if (!rawData.name || !rawData.phone_number || !rawData.subcategory_id || !rawData.title || !rawData.description) {
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

    let citizen = existingCitizen;

    if (!citizen) {
      const { data: newCitizen, error: newCitizenError } = await supabase
        .from('Citizens')
        .insert({
          name: rawData.name,
          phone_number: rawData.phone_number,
          region_id: rawData.region_id,
        })
        .select('id')
        .single();

      if (newCitizenError) throw new Error(`Erro ao criar perfil: ${newCitizenError.message}`);
      citizen = newCitizen;
    }

    if(!citizen) throw new Error('Não foi possível identificar o autor da proposta.');

    const { error: proposalError } = await supabase.from('Proposals').insert({
      citizen_id: citizen.id,
      subcategory_id: parseInt(rawData.subcategory_id, 10),
      title: rawData.title,
      description: rawData.description,
    });

    if (proposalError) {
      throw new Error(`Erro ao registrar proposta: ${proposalError.message}`);
    }

    revalidatePath('/propostas');
    revalidatePath('/');

    return { success: true, message: 'Sua proposta foi enviada com sucesso! Agradecemos sua participação.' };

  } catch (error) {
    console.error('Erro na submissão da proposta:', error);
    const errorMessage = (error as Error).message || 'Ocorreu um erro inesperado.';

    if (errorMessage.includes('duplicate key value violates unique constraint "Citizens_phone_number_key"')) {
        return { success: false, message: 'Este número de telefone já está cadastrado. Por favor, utilize outro.' };
    }

    return { success: false, message: errorMessage };
} }