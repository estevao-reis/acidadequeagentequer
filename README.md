# A Cidade que A Gente Quer

## 📖 Sobre o Projeto

**A Cidade Que A Gente Quer** é uma plataforma de código aberto para democracia participativa, projetada para coletar e organizar propostas da população. O objetivo é criar um canal direto entre os cidadãos e a gestão pública, permitindo que suas ideias e necessidades se transformem em políticas públicas reais, começando com o plano de governo de 2026 para o Distrito Federal.

A aplicação permite que qualquer pessoa envie uma ideia, que é então categorizada em setores de foco e exibida publicamente para consulta.

## ✨ Funcionalidades

  - **Envio de Propostas**: Formulário intuitivo para que os cidadãos enviem suas ideias, detalhando o que é a proposta, por que é importante e como pode ser implementada.
  - **Visualização Pública**: Uma página dedicada exibe todas as propostas enviadas pela comunidade, promovendo a transparência e o engajamento cívico.
  - **Categorização Inteligente**: As propostas são organizadas por grandes setores (como Saúde, Segurança, Economia) e temas específicos, facilitando a análise e o planejamento.
  - **Design Responsivo**: Interface moderna e totalmente adaptável para uma ótima experiência em desktops e dispositivos móveis.

## 🛠️ Tecnologias Utilizadas

Este projeto foi construído com as seguintes tecnologias de ponta:

  - **Framework**: [Next.js](https://nextjs.org/) (com App Router)
  - **Linguagem**: [TypeScript](https://www.typescriptlang.org/)
  - **Backend e Banco de Dados**: [Supabase](https://supabase.io/)
  - **Estilização**: [Tailwind CSS](https://tailwindcss.com/)
  - **Componentes UI**: [shadcn/ui](https://ui.shadcn.com/)
  - **Ícones**: [Lucide React](https://lucide.dev/)

## 🚀 Rodando o Projeto Localmente

Siga os passos abaixo para configurar e executar o projeto em seu ambiente de desenvolvimento.

### Pré-requisitos

  - [Node.js](https://nodejs.org/en/) (versão 18 ou superior)
  - [npm](https://www.npmjs.com/) ou um gerenciador de pacotes de sua preferência
  - Uma conta gratuita no [Supabase](https://supabase.com/)

### 1\. Clonar o Repositório

```bash
git clone https://github.com/seu-usuario/acidadequeagentequer.git
cd acidadequeagentequer
```

### 2\. Instalar as Dependências

```bash
npm install
```

### 3\. Configurar o Supabase

1.  Acesse seu painel do Supabase e crie um novo projeto.
2.  No seu projeto, vá para a seção **"SQL Editor"**.
3.  Abra o arquivo `supabase/squema.sql` deste repositório, copie todo o conteúdo e cole no editor do Supabase.
4.  Clique em **"Run"** para criar todas as tabelas, políticas de segurança e inserir os dados iniciais.
5.  Após a execução, vá para **Project Settings \> API**. Copie a **URL do Projeto** e a chave **`anon` `public`**.

### 4\. Configurar as Variáveis de Ambiente

1.  Na raiz do seu projeto, crie um arquivo chamado `.env.local`.
2.  Adicione as chaves que você copiou do Supabase, como no exemplo abaixo:

<!-- end list -->

```env
# .env.local

NEXT_PUBLIC_SUPABASE_URL=SUA_URL_DO_PROJETO_SUPABASE
NEXT_PUBLIC_SUPABASE_ANON_KEY=SUA_CHAVE_ANON_PUBLIC_SUPABASE
```

### 5\. Executar o Servidor de Desenvolvimento

Agora você está pronto para iniciar a aplicação\!

```bash
npm run dev
```

Abra [http://localhost:3000](https://www.google.com/search?q=http://localhost:3000) no seu navegador para ver o resultado.