'use client';

import { useState, useEffect } from 'react';
import { verifyAdminCode, getAdminDashboardData, logoutAdmin } from '@/lib/actions/admin.actions';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Lock, LogOut, Users, Calendar, FileText, MapPin, Phone } from 'lucide-react';

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    setLoading(true);
    const result = await getAdminDashboardData();
    if (result.authorized && result.data) {
      setIsAuthenticated(true);
      setData(result.data);
    }
    setLoading(false);
  }

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const res = await verifyAdminCode(code);
    if (res.success) {
      await loadData();
    } else {
      setError('Código de acesso incorreto');
      setLoading(false);
  } }

  async function handleLogout() {
    await logoutAdmin();
    setIsAuthenticated(false);
    setData(null);
    setCode('');
  }

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Carregando...</div>;
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted/20 p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto bg-primary/10 p-3 rounded-full w-fit mb-2">
              <Lock className="size-6 text-primary" />
            </div>
            <CardTitle>Acesso Administrativo</CardTitle>
            <CardDescription>Digite o código de segurança para continuar</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <Input 
                type="password" 
                placeholder="Código de Acesso" 
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="text-center text-lg tracking-widest"
              />
              {error && <p className="text-destructive text-sm text-center">{error}</p>}
              <Button type="submit" className="w-full" disabled={loading}>
                Entrar
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
  ); }

  return (
    <div className="min-h-screen bg-muted/10 pt-24 pb-12 px-4">
      <div className="container mx-auto max-w-6xl">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Painel de Controle</h1>
            <p className="text-muted-foreground">Visão geral do engajamento</p>
          </div>
          <Button variant="outline" onClick={handleLogout} size="sm">
            <LogOut className="size-4 mr-2" /> Sair
          </Button>
        </div>

        {/* Cards de Estatísticas Gerais */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card>
            <CardContent className="p-6 flex items-center gap-4">
              <div className="p-3 bg-blue-100 text-blue-600 rounded-full">
                <Users className="size-6" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total de Cidadãos</p>
                <p className="text-2xl font-bold">{data.stats.totalCitizens}</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 flex items-center gap-4">
              <div className="p-3 bg-green-100 text-green-600 rounded-full">
                <Calendar className="size-6" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Eventos Ativos</p>
                <p className="text-2xl font-bold">{data.events.filter((e: any) => e.active).length}</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 flex items-center gap-4">
              <div className="p-3 bg-amber-100 text-amber-600 rounded-full">
                <FileText className="size-6" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Propostas Recebidas</p>
                <p className="text-2xl font-bold">{data.stats.totalProposals}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="events" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="events">Eventos & Inscritos</TabsTrigger>
            {/* Futuramente pode adicionar aba de propostas detalhadas */}
          </TabsList>

          <TabsContent value="events" className="space-y-6">
            {/* Lista de Eventos */}
            {data.events.map((event: any) => (
              <Card key={event.id} className="overflow-hidden">
                <CardHeader className="bg-muted/30 border-b">
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        {event.name}
                        {event.active ? 
                          <Badge className="bg-green-500">Ativo</Badge> : 
                          <Badge variant="secondary">Encerrado</Badge>
                        }
                      </CardTitle>
                      <CardDescription className="flex items-center gap-2 mt-1">
                        <Calendar className="size-3" />
                        {new Date(event.date).toLocaleDateString('pt-BR', { 
                          weekday: 'long', day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit' 
                        })}
                        <span className="mx-1">•</span>
                        <MapPin className="size-3" />
                        {event.location}
                      </CardDescription>
                    </div>
                    <div className="text-right">
                      <p className="text-3xl font-bold text-primary">{event.count}</p>
                      <p className="text-xs text-muted-foreground uppercase font-bold">Confirmados</p>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="p-0">
                  {/* Tabela de Inscritos deste evento específico */}
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                      <thead className="bg-muted/10 text-muted-foreground text-xs uppercase">
                        <tr>
                          <th className="px-6 py-3">Nome</th>
                          <th className="px-6 py-3">Telefone</th>
                          <th className="px-6 py-3">Região (RA)</th>
                          <th className="px-6 py-3 text-right">Data Inscrição</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y">
                        {data.registrations
                          .filter((reg: any) => reg.event_id === event.id)
                          .map((reg: any, idx: number) => (
                          <tr key={idx} className="hover:bg-muted/5 transition-colors">
                            <td className="px-6 py-3 font-medium">{reg.citizen.name}</td>
                            <td className="px-6 py-3 flex items-center gap-2">
                              <Phone className="size-3 text-muted-foreground" />
                              {reg.citizen.phone_number}
                            </td>
                            <td className="px-6 py-3 text-muted-foreground">
                              {reg.citizen.region?.name || '-'}
                            </td>
                            <td className="px-6 py-3 text-right text-muted-foreground">
                              {new Date(reg.created_at).toLocaleDateString('pt-BR')}
                            </td>
                          </tr>
                        ))}
                        {data.registrations.filter((reg: any) => reg.event_id === event.id).length === 0 && (
                          <tr>
                            <td colSpan={4} className="px-6 py-8 text-center text-muted-foreground">
                              Nenhum inscrito neste evento ainda.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>

      </div>
    </div>
); }