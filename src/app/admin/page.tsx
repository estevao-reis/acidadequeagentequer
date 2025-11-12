import { getEventAttendees } from '@/lib/actions/admin.actions';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, MapPin, Phone, Calendar } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function AdminPage() {
  const { data: attendees } = await getEventAttendees();
  const totalAttendees = attendees?.length || 0;

  return (
    <main className="pt-28 pb-12 bg-muted/20 min-h-screen">
      <div className="container mx-auto px-4 max-w-6xl">
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Painel Administrativo</h1>
            <p className="text-muted-foreground">Gestão de inscritos para o evento em Nova Colina</p>
          </div>
          
          <Card className="bg-primary text-primary-foreground border-none shadow-lg">
            <CardContent className="p-4 flex items-center gap-4">
              <div className="p-2 bg-white/20 rounded-full">
                <Users className="size-6 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium opacity-90">Total de Confirmados</p>
                <p className="text-3xl font-bold">{totalAttendees}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Lista de Presença</CardTitle>
            <CardDescription>
              Pessoas cadastradas que <strong>não</strong> enviaram propostas (apenas confirmaram presença).
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-muted-foreground uppercase bg-muted/50 border-b">
                  <tr>
                    <th className="px-4 py-3 rounded-tl-lg">Nome</th>
                    <th className="px-4 py-3">Contato</th>
                    <th className="px-4 py-3">Região (RA)</th>
                    <th className="px-4 py-3 rounded-tr-lg text-right">Data Cadastro</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {attendees && attendees.length > 0 ? (
                    attendees.map((person: any) => (
                      <tr key={person.id} className="bg-background hover:bg-muted/20 transition-colors">
                        <td className="px-4 py-3 font-medium text-foreground">
                          {person.name}
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Phone className="size-3" />
                            <span>{person.phone_number}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <Badge variant="secondary" className="font-normal">
                            <MapPin className="size-3 mr-1" />
                            {person.region?.name || 'Não informada'}
                          </Badge>
                        </td>
                        <td className="px-4 py-3 text-right text-muted-foreground">
                          <div className="flex items-center justify-end gap-2">
                            <span>{new Date(person.created_at).toLocaleDateString('pt-BR')}</span>
                            <Calendar className="size-3" />
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={4} className="px-4 py-8 text-center text-muted-foreground">
                        Nenhuma presença confirmada ainda.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

      </div>
    </main>
); }