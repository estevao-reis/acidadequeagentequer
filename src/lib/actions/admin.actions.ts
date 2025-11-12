'use server';

import { createClient } from '@/lib/supabase/server';
import { cookies } from 'next/headers';

export async function verifyAdminCode(code: string) {
  if (code === process.env.ADMIN_ACCESS_CODE) {
    const cookieStore = await cookies();
    cookieStore.set('admin_session', 'authenticated', { 
      httpOnly: true, 
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 
    });
    return { success: true };
  }
  return { success: false, message: 'Código inválido' };
}

export async function getAdminDashboardData() {
  const supabase = await createClient();
  
  const cookieStore = await cookies();
  if (cookieStore.get('admin_session')?.value !== 'authenticated') {
    return { authorized: false, data: null };
  }

  try {
    const { data: events, error: eventsError } = await supabase
      .from('Events')
      .select(`
        id, name, date, location, active,
        registrations:EventRegistrations(count)
      `)
      .order('date', { ascending: false });

    if (eventsError) throw eventsError;

    const { data: registrations, error: regError } = await supabase
      .from('EventRegistrations')
      .select(`
        event_id,
        created_at,
        citizen:Citizens ( name, phone_number, region:AdministrativeRegions(name) )
      `)
      .order('created_at', { ascending: false });

    if (regError) throw regError;

    const { count: totalProposals } = await supabase.from('Proposals').select('*', { count: 'exact', head: true });
    const { count: totalCitizens } = await supabase.from('Citizens').select('*', { count: 'exact', head: true });

    return {
      authorized: true,
      data: {
        events: events.map(e => ({
          ...e,
          count: e.registrations[0]?.count || 0
        })),
        registrations,
        stats: {
          totalProposals: totalProposals || 0,
          totalCitizens: totalCitizens || 0
    } } };

  } catch (error) {
    console.error('Erro admin:', error);
    return { authorized: true, error: 'Erro ao carregar dados' };
} }

export async function logoutAdmin() {
  const cookieStore = await cookies();
  cookieStore.delete('admin_session');
}