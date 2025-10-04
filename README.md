# A Cidade Que A Gente Quer - Planejando o Futuro
Projetado para democratizar a participação da população do Distrito Federal, esse é um canal direto entre os cidadãos e a gestão pública, permitindo que suas ideias e necessidades se transformem em políticas públicas reais.

A aplicação permite que qualquer pessoa envie uma ideia, que é então categorizada em setores de foco e exibida publicamente para consulta.

## Funcionalidades
  - **Envio de Propostas**: Formulário intuitivo para que os cidadãos detalhem o que é a proposta, por que é importante e como pode ser implementada.
  - **Visualização Pública**: Uma página dedicada exibe todas as propostas enviadas pela comunidade, promovendo a transparência e o engajamento cívico.
  - **Categorização Inteligente**: As propostas são organizadas por grandes setores (como Saúde, Segurança, Economia) e temas específicos, facilitando a análise e o planejamento.
  - **Design Responsivo**: Interface moderna e totalmente adaptável para uma ótima experiência em desktops e dispositivos móveis.

## Tecnologias
  - **Framework**: [Next.js](https://nextjs.org/) (com App Router)
  - **Linguagem**: [TypeScript](https://www.typescriptlang.org/)
  - **Backend e Banco de Dados**: [Supabase](https://supabase.io/)
  - **Estilização**: [Tailwind CSS](https://tailwindcss.com/)
  - **Componentes UI**: [shadcn/ui](https://ui.shadcn.com/)
  - **Ícones**: [Lucide React](https://lucide.dev/)

## Rodando Localmente
### a. Clone o Repo e depois Instale as Dependências com:
```bash
npm install
```
### b. Configure o Supabase:
  1. Crie um novo projeto no painel Supabase
  2. Cole o arquivo `supabase/squema.sql` deste repositório no editor SQL do Supabase e clique em "Run"
  3. Em Project Settings > API. Copie a URL do Projeto e a chave anon public
### c. Assim, adicione as Variáveis de Ambiente, como no exemplo:
```env
NEXT_PUBLIC_SUPABASE_URL=SUA_URL_DO_PROJETO_SUPABASE
NEXT_PUBLIC_SUPABASE_ANON_KEY=SUA_CHAVE_ANON_PUBLIC_SUPABASE
```
### d. Para rodar em Desenvolvimento:
```bash
npm run dev
```
Resultado em: [localhost:3000](http://localhost:3000)