import { createClient } from '@/lib/supabase/server';
import { HeroSection } from '@/components/sections/HeroSection';
import { SectorsSection } from '@/components/sections/SectorsSection';
import { ProposalForm } from '@/components/forms/ProposalForm';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const supabase = await createClient();

  const [
    { data: sectors },
    { data: subcategories },
    { data: regions }
  ] = await Promise.all([
    supabase.from('Sectors').select('id, name, description, slug').order('id'),
    supabase.from('Subcategories').select('id, name, sector_id').order('name'),
    supabase.from('AdministrativeRegions').select('id, name').order('name')
  ]);

  return (
    <>
      <HeroSection />
      <SectorsSection sectors={sectors || []} />

      <section id="participe" className="py-20 bg-muted/40 scroll-mt-16">
        <div className="container">
          <ProposalForm
            sectors={sectors || []}
            subcategories={subcategories || []}
            regions={regions || []}
          />
        </div>
      </section>
    </>
); }