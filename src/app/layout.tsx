import React from 'react';
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

const siteUrl = "https://acidadequeagentequer.vercel.app";
const title = "A Cidade Que A Gente Quer";
const description = "Sua voz é a ferramenta para a mudança. Participe, proponha e ajude a construir o plano de governo de 2026 para o Distrito Federal.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default: title,
    template: `%s | ${title}`,
  },
  description: description,

  icons: {
    icon: "/favicon.ico",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },

  openGraph: {
    title: title,
    description: description,
    url: siteUrl,
    siteName: title,
    images: [
      {
        url: '/logo.png',
        width: 1014,
        height: 1014,
        alt: `Logo do projeto ${title}`,
      },
    ],
    locale: 'pt_BR',
    type: 'website',
  },

  twitter: {
    card: 'summary_large_image',
    title: title,
    description: description,
    images: ['/logo.png'],
}, };


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="scroll-smooth">
      <body className={`${inter.variable} antialiased flex flex-col min-h-screen bg-background text-foreground`}>
        <Header />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
); }