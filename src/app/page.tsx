import { createClient } from '@/lib/supabase/server';
import { HomePageClient } from './HomePageClient';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const supabase = await createClient();

  const { data: sectors } = await supabase
    .from('Sectors')
    .select('id, name, description, slug')
    .order('id');

  return (
    <HomePageClient
      sectors={sectors || []}
    />
); }