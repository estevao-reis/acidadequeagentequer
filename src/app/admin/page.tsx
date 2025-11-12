'use client';

import { useState, useEffect } from 'react';
import { verifyAdminCode, getAdminDashboardData, logoutAdmin } from '@/lib/actions/admin.actions';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Lock, LogOut, Users, Calendar, FileText, MapPin, Phone, User, Clock } from 'lucide-react';

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
    }
  }

  async function handleLogout() {
    await logoutAdmin();
    setIsAuthenticated(false);
    setData(null);
    setCode('');
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background pt-20">
        <div className="flex flex-col items-center gap-3">
          <div className="size-8 border-3 border-primary border-t-transparent rounded-full animate-spin" />
          <p className="text-sm text-muted-foreground font-medium">Carregando...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4 pt-24">
        <Card className="w-full max-w-sm shadow-sm border rounded-2xl">
          <CardHeader className="text-center space-y-3 pb-4">
            <div className="mx-auto bg-primary/10 p-3 rounded-2xl w-fit mb-2">
              <Lock className="size-6 text-primary" />
            </div>
            <CardTitle className="text-xl font-bold text-gray-900">Acesso Administrativo</CardTitle>
            <CardDescription className="text-sm text-gray-600">
              Digite o código de segurança
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Input 
                  type="password" 
                  placeholder="Código" 
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="text-center text-lg tracking-widest h-12 rounded-xl"
                  autoFocus
                />
                {error && (
                  <p className="text-red-500 text-sm text-center font-medium animate-pulse">
                    {error}
                  </p>
                )}
              </div>
              <Button 
                type="submit" 
                className="w-full h-12 text-base font-semibold rounded-xl"
                disabled={loading}
              >
                {loading ? 'Verificando...' : 'Entrar'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-12 pt-24 md:pt-32 px-4">
      <div className="container mx-auto max-w-7xl">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Painel Admin</h1>
            <p className="text-sm text-gray-500">Gestão de eventos e métricas</p>
          </div>
          <Button 
            variant="outline" 
            onClick={handleLogout} 
            size="sm"
            className="h-9 border-gray-200 text-gray-600 hover:text-gray-900"
          >
            <LogOut className="size-4 mr-2" />
            Sair
          </Button>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card className="bg-white border-0 shadow-sm rounded-xl hover:shadow-md transition-shadow">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="bg-blue-100 p-2.5 rounded-lg shrink-0">
                <Users className="size-5 text-blue-600" />
              </div>
              <div className="min-w-0">
                <p className="text-xs text-gray-500 font-medium truncate">Cidadãos</p>
                <p className="text-xl font-bold text-gray-900 truncate">{data.stats.totalCitizens}</p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white border-0 shadow-sm rounded-xl hover:shadow-md transition-shadow">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="bg-green-100 p-2.5 rounded-lg shrink-0">
                <Calendar className="size-5 text-green-600" />
              </div>
              <div className="min-w-0">
                <p className="text-xs text-gray-500 font-medium truncate">Eventos Ativos</p>
                <p className="text-xl font-bold text-gray-900 truncate">
                  {data.events.filter((e: any) => e.active).length}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-0 shadow-sm rounded-xl hover:shadow-md transition-shadow">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="bg-amber-100 p-2.5 rounded-lg shrink-0">
                <FileText className="size-5 text-amber-600" />
              </div>
              <div className="min-w-0">
                <p className="text-xs text-gray-500 font-medium truncate">Propostas</p>
                <p className="text-xl font-bold text-gray-900 truncate">{data.stats.totalProposals}</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-0 shadow-sm rounded-xl hover:shadow-md transition-shadow">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="bg-purple-100 p-2.5 rounded-lg shrink-0">
                <User className="size-5 text-purple-600" />
              </div>
              <div className="min-w-0">
                <p className="text-xs text-gray-500 font-medium truncate">Inscrições</p>
                <p className="text-xl font-bold text-gray-900 truncate">
                  {data.registrations.length}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="events" className="w-full">
          <TabsList className="w-full grid grid-cols-1 md:w-auto md:inline-flex h-auto p-1 bg-gray-200/50 rounded-xl mb-4">
            <TabsTrigger 
              value="events" 
              className="py-2 px-6 text-sm font-medium rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm transition-all"
            >
              Eventos & Inscritos
            </TabsTrigger>
          </TabsList>

          <TabsContent value="events" className="space-y-4">
            {data.events.map((event: any) => (
              <Card key={event.id} className="border-0 shadow-sm rounded-xl overflow-hidden">
                <CardHeader className="bg-gray-50/50 border-b border-gray-100 p-4 md:p-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <CardTitle className="text-lg md:text-xl font-bold text-gray-900">
                          {event.name}
                        </CardTitle>
                        {event.active ? (
                          <Badge className="bg-green-100 text-green-700 border-0 hover:bg-green-100 text-xs px-2 py-0.5 font-medium">
                            Ativo
                          </Badge>
                        ) : (
                          <Badge variant="secondary" className="text-xs px-2 py-0.5">
                            Encerrado
                          </Badge>
                        )}
                      </div>
                      
                      <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-gray-500">
                        <div className="flex items-center gap-2">
                          <Calendar className="size-4 text-blue-500" />
                          <span>
                            {new Date(event.date).toLocaleDateString('pt-BR', { 
                              weekday: 'long', day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit' 
                            })}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="size-4 text-blue-500" />
                          <span>{event.location}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3 bg-white p-3 rounded-xl border border-gray-100 shadow-sm md:min-w-[180px] justify-center">
                      <div className="text-right">
                        <p className="text-2xl font-bold text-blue-600 leading-none">{event.count}</p>
                        <p className="text-xs text-gray-500 font-medium mt-1">PESSOAS CONFIRMADAS</p>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="p-0">
                  {/* Grid Responsivo para lista de inscritos */}
                  <div className="divide-y divide-gray-100">
                    {data.registrations.filter((reg: any) => reg.event_id === event.id).length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 divide-y md:divide-y-0 md:gap-1 bg-gray-50/30">
                        {data.registrations
                          .filter((reg: any) => reg.event_id === event.id)
                          .map((reg: any, idx: number) => (
                          <div key={idx} className="p-4 bg-white hover:bg-gray-50 transition-colors md:border-b border-gray-100/50">
                            <div className="flex items-start gap-3">
                              <div className="bg-gray-100 p-2 rounded-full mt-0.5">
                                <User className="size-4 text-gray-500" />
                              </div>
                              <div className="min-w-0 flex-1">
                                <p className="font-semibold text-gray-900 text-sm truncate">
                                  {reg.citizen.name}
                                </p>
                                <div className="flex flex-col gap-1 mt-1">
                                  <div className="flex items-center gap-1.5 text-xs text-gray-500">
                                    <Phone className="size-3" />
                                    <span className="truncate">{reg.citizen.phone_number}</span>
                                  </div>
                                  <div className="flex items-center gap-1.5 text-xs text-gray-500">
                                    <MapPin className="size-3" />
                                    <span className="truncate">{reg.citizen.region?.name || 'RA não informada'}</span>
                                  </div>
                                  <div className="flex items-center gap-1.5 text-[10px] text-gray-400 mt-1">
                                    <Clock className="size-3" />
                                    Inscrito em {new Date(reg.created_at).toLocaleDateString('pt-BR')}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="py-12 text-center bg-white">
                        <div className="bg-gray-50 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                          <User className="size-6 text-gray-300" />
                        </div>
                        <p className="text-gray-500 text-sm font-medium">
                          Ainda não há inscritos para este evento.
                        </p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
            
            {data.events.length === 0 && (
              <Card className="border-0 shadow-sm rounded-xl text-center py-16 bg-white">
                <div className="bg-gray-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calendar className="size-8 text-gray-400" />
                </div>
                <CardTitle className="text-lg font-bold text-gray-900 mb-2">
                  Nenhum evento encontrado
                </CardTitle>
                <CardDescription className="text-gray-500">
                  Comece criando um evento no banco de dados.
                </CardDescription>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}