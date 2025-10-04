-- Tabela para armazenar as Regiões Administrativas do DF
CREATE TABLE IF NOT EXISTS public."AdministrativeRegions" (
  id uuid NOT NULL PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL UNIQUE
);
-- Insere as RAs do DF
INSERT INTO public."AdministrativeRegions" (name) VALUES
('Plano Piloto'), ('Gama'), ('Taguatinga'), ('Brazlândia'), ('Sobradinho'), ('Planaltina'), ('Paranoá'), ('Núcleo Bandeireante'), ('Ceilândia'), ('Guará'), ('Cruzeiro'), ('Samambaia'), ('Santa Maria'), ('São Sebastião'), ('Recanto das Emas'), ('Lago Sul'), ('Riacho Fundo'), ('Lago Norte'), ('Candangolândia'), ('Águas Claras'), ('Riacho Fundo II'), ('Sudoeste/Octogonal'), ('Varjão'), ('Park Way'), ('SCIA'), ('Sobradinho II'), ('Jardim Botânico'), ('Itapoã'), ('SIA'), ('Vicente Pires'), ('Fercal'), ('Sol Nascente/Pôr do Sol'), ('Arniqueira'), ('Arapoanga'), ('Água Quente')
ON CONFLICT (name) DO NOTHING;


-- Tabela para os cidadãos que enviam propostas
CREATE TABLE IF NOT EXISTS public."Citizens" (
  id uuid NOT NULL PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  name text NOT NULL,
  phone_number text NOT NULL UNIQUE,
  region_id uuid REFERENCES public."AdministrativeRegions"(id)
);

-- Tabela para os 5 grandes setores de políticas públicas.
CREATE TABLE IF NOT EXISTS public."Sectors" (
  id smallint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name text NOT NULL UNIQUE,
  slug text NOT NULL UNIQUE,
  description text
);
-- Popula os setores principais
INSERT INTO public."Sectors" (name, slug, description) VALUES
('Desenvolvimento Social e Qualidade de Vida', 'desenvolvimento-social', 'Saúde, educação, assistência social, cultura e esporte.'),
('Economia e Oportunidades', 'economia-oportunidades', 'Emprego, empreendedorismo, inovação e sustentabilidade.'),
('Mobilidade e Infraestrutura Urbana', 'mobilidade-infraestrutura', 'Transporte, saneamento, habitação e planejamento urbano.'),
('Segurança Pública e Cidadania', 'seguranca-cidania', 'Prevenção à violência, policiamento comunitário e direitos humanos.'),
('Gestão Pública e Transparência', 'gestao-publica', 'Desburocratização, tecnologia e controle social.')
ON CONFLICT (slug) DO NOTHING;

-- Tabela para as subcategorias dentro de cada setor.
CREATE TABLE IF NOT EXISTS public."Subcategories" (
  id smallint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  sector_id smallint NOT NULL REFERENCES public."Sectors"(id) ON DELETE CASCADE,
  name text NOT NULL,
  slug text NOT NULL UNIQUE,
  CONSTRAINT uq_sector_subcategory_name UNIQUE (sector_id, name)
);
-- Popula as subcategorias
INSERT INTO public."Subcategories" (sector_id, name, slug) VALUES
(1, 'Saúde', 'saude'),
(1, 'Educação', 'educacao'),
(1, 'Assistência Social', 'assistencia-social'),
(1, 'Cultura e Esporte', 'cultura-esporte'),
(2, 'Emprego e Renda', 'emprego-renda'),
(2, 'Empreendedorismo', 'empreendedorismo'),
(2, 'Inovação e Tecnologia', 'inovacao-tecnologia'),
(2, 'Sustentabilidade', 'sustentabilidade'),
(3, 'Transporte Público', 'transporte-publico'),
(3, 'Saneamento Básico', 'saneamento-basico'),
(3, 'Habitação', 'habitacao'),
(3, 'Planejamento Urbano', 'planejamento-urbano'),
(4, 'Prevenção à Violência', 'prevencao-violencia'),
(4, 'Policiamento Comunitário', 'policiamento-comunitario'),
(4, 'Direitos Humanos', 'direitos-humanos'),
(5, 'Transparência', 'transparencia'),
(5, 'Desburocratização', 'desburocratizacao'),
(5, 'Participação Social', 'participacao-social')
ON CONFLICT (slug) DO NOTHING;

-- Tabela principal para armazenar as propostas dos cidadãos.
CREATE TABLE IF NOT EXISTS public."Proposals" (
  id uuid NOT NULL PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  citizen_id uuid NOT NULL REFERENCES public."Citizens"(id) ON DELETE CASCADE,
  subcategory_id smallint NOT NULL REFERENCES public."Subcategories"(id),
  title text NOT NULL,
  description text NOT NULL,
  status text NOT NULL DEFAULT 'recebida'
);

-- =============================================================================
-- POLÍTICAS DE SEGURANÇA (RLS)
-- =============================================================================

-- Habilita RLS em todas as tabelas
ALTER TABLE public."Citizens" ENABLE ROW LEVEL SECURITY;
ALTER TABLE public."Sectors" ENABLE ROW LEVEL SECURITY;
ALTER TABLE public."Subcategories" ENABLE ROW LEVEL SECURITY;
ALTER TABLE public."Proposals" ENABLE ROW LEVEL SECURITY;
ALTER TABLE public."AdministrativeRegions" ENABLE ROW LEVEL SECURITY;

-- Permite leitura pública para setores, subcategorias e regiões
CREATE POLICY "Public can read sectors" ON public."Sectors" FOR SELECT USING (true);
CREATE POLICY "Public can read subcategories" ON public."Subcategories" FOR SELECT USING (true);
CREATE POLICY "Public can read administrative regions" ON public."AdministrativeRegions" FOR SELECT USING (true);

-- Permite que qualquer pessoa envie uma proposta e crie um perfil de cidadão
CREATE POLICY "Public can create citizens" ON public."Citizens" FOR INSERT WITH CHECK (true);
CREATE POLICY "Public can create proposals" ON public."Proposals" FOR INSERT WITH CHECK (true);

-- Permite que o público visualize as propostas enviadas
CREATE POLICY "Public can view proposals and their authors" ON public."Proposals" FOR SELECT USING (true);
CREATE POLICY "Public can view citizens who made proposals" ON public."Citizens" FOR SELECT USING (true);