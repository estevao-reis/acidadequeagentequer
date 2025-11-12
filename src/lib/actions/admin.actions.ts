'use server';

import { createClient } from '@/lib/supabase/server';

export async function getEventAttendees() {
  const supabase = await createClient();

  try {
    const { data: citizens, error } = await supabase
      .from('Citizens')
      .select(`
        id,
        name,
        phone_number,
        created_at,
        region:AdministrativeRegions ( name ),
        Proposals ( id )
      `)
      .order('created_at', { ascending: false });

    if (error) {
      throw new Error(`Erro ao buscar cidadãos: ${error.message}`);
    }

    const attendees = citizens?.filter((citizen: any) => citizen.Proposals.length === 0) || [];

    return { success: true, data: attendees };

  } catch (error) {
    console.error('Erro na action administrativa:', error);
    return { success: false, data: [] };
} }