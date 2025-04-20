import { useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Check, X, Users, Radio, AlertTriangle, BarChart3, CheckCircle, Clock, Activity } from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';
import { useToast } from '@/hooks/use-toast';
import { apiRequest, queryClient } from '@/lib/queryClient';
import { Label } from '@/components/ui/label';

const AdminPage = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [rejectReason, setRejectReason] = useState('');
  const [rejectModalOpen, setRejectModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<{id: number, type: 'team' | 'streamer', name: string}>(null);
  
  // Verificar se o utilizador é administrador
  if (!user || user.role !== 'admin') {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <AlertTriangle className="h-16 w-16 text-yellow-500 mx-auto mb-4" />
        <h1 className="text-2xl font-orbitron text-white mb-2">Acesso Restrito</h1>
        <p className="text-gray-400">
          Esta área é restrita a administradores do sistema.
        </p>
        <Button 
          className="mt-6 bg-cs-dark-700 hover:bg-cs-dark-600 text-white"
          onClick={() => window.location.href = '/'}
        >
          Voltar para a Página Inicial
        </Button>
      </div>
    );
  }
  
  // Buscar estatísticas de administração
  const { data: stats, isLoading: statsLoading } = useQuery({
    queryKey: ['/api/admin/stats'],
    queryFn: async () => {
      const res = await apiRequest('GET', '/api/admin/stats');
      return await res.json();
    }
  });
  
  // Buscar equipas pendentes
  const { 
    data: pendingTeams, 
    isLoading: teamsLoading 
  } = useQuery({
    queryKey: ['/api/admin/teams/pending'],
    queryFn: async () => {
      const res = await apiRequest('GET', '/api/admin/teams/pending');
      return await res.json();
    }
  });
  
  // Buscar streamers pendentes
  const { 
    data: pendingStreamers, 
    isLoading: streamersLoading 
  } = useQuery({
    queryKey: ['/api/admin/streamers/pending'],
    queryFn: async () => {
      const res = await apiRequest('GET', '/api/admin/streamers/pending');
      return await res.json();
    }
  });
  
  // Mutação para aprovar equipa
  const approveTeamMutation = useMutation({
    mutationFn: async (teamId: number) => {
      const res = await apiRequest('POST', `/api/admin/teams/${teamId}/approve`);
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/admin/stats'] });
      queryClient.invalidateQueries({ queryKey: ['/api/admin/teams/pending'] });
      
      toast({
        title: 'Equipa Aprovada',
        description: 'A equipa foi aprovada com sucesso.',
        variant: 'default',
      });
    },
    onError: (error: Error) => {
      toast({
        title: 'Erro',
        description: error.message || 'Ocorreu um erro ao aprovar a equipa.',
        variant: 'destructive',
      });
    }
  });
  
  // Mutação para rejeitar equipa
  const rejectTeamMutation = useMutation({
    mutationFn: async ({teamId, reason}: {teamId: number, reason: string}) => {
      const res = await apiRequest('POST', `/api/admin/teams/${teamId}/reject`, { reason });
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/admin/stats'] });
      queryClient.invalidateQueries({ queryKey: ['/api/admin/teams/pending'] });
      
      toast({
        title: 'Equipa Rejeitada',
        description: 'A equipa foi rejeitada com sucesso.',
        variant: 'default',
      });
      
      setRejectModalOpen(false);
      setRejectReason('');
    },
    onError: (error: Error) => {
      toast({
        title: 'Erro',
        description: error.message || 'Ocorreu um erro ao rejeitar a equipa.',
        variant: 'destructive',
      });
    }
  });
  
  // Mutação para aprovar streamer
  const approveStreamerMutation = useMutation({
    mutationFn: async (streamerId: number) => {
      const res = await apiRequest('POST', `/api/admin/streamers/${streamerId}/approve`);
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/admin/stats'] });
      queryClient.invalidateQueries({ queryKey: ['/api/admin/streamers/pending'] });
      
      toast({
        title: 'Streamer Aprovado',
        description: 'O streamer foi aprovado com sucesso.',
        variant: 'default',
      });
    },
    onError: (error: Error) => {
      toast({
        title: 'Erro',
        description: error.message || 'Ocorreu um erro ao aprovar o streamer.',
        variant: 'destructive',
      });
    }
  });
  
  // Mutação para rejeitar streamer
  const rejectStreamerMutation = useMutation({
    mutationFn: async ({streamerId, reason}: {streamerId: number, reason: string}) => {
      const res = await apiRequest('POST', `/api/admin/streamers/${streamerId}/reject`, { reason });
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/admin/stats'] });
      queryClient.invalidateQueries({ queryKey: ['/api/admin/streamers/pending'] });
      
      toast({
        title: 'Streamer Rejeitado',
        description: 'O streamer foi rejeitado com sucesso.',
        variant: 'default',
      });
      
      setRejectModalOpen(false);
      setRejectReason('');
    },
    onError: (error: Error) => {
      toast({
        title: 'Erro',
        description: error.message || 'Ocorreu um erro ao rejeitar o streamer.',
        variant: 'destructive',
      });
    }
  });
  
  // Funções para aprovação/rejeição
  const handleApprove = (id: number, type: 'team' | 'streamer') => {
    if (type === 'team') {
      approveTeamMutation.mutate(id);
    } else {
      approveStreamerMutation.mutate(id);
    }
  };
  
  const handleReject = () => {
    if (!selectedItem) return;
    
    if (selectedItem.type === 'team') {
      rejectTeamMutation.mutate({
        teamId: selectedItem.id,
        reason: rejectReason
      });
    } else {
      rejectStreamerMutation.mutate({
        streamerId: selectedItem.id,
        reason: rejectReason
      });
    }
  };
  
  const openRejectModal = (id: number, type: 'team' | 'streamer', name: string) => {
    setSelectedItem({ id, type, name });
    setRejectModalOpen(true);
  };
  
  return (
    <div className="container max-w-screen-xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-orbitron text-white mb-8">
        Painel de Administração
      </h1>
      
      {/* Dashboard stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-10">
        <Card className="bg-cs-dark-800 border border-cs-dark-700">
          <CardContent className="pt-6">
            <div className="flex items-center">
              <div className="p-2 bg-cs-dark-700 rounded-lg mr-4">
                <Clock className="h-5 w-5 text-cs-neon" />
              </div>
              <div>
                <p className="text-sm text-gray-400">Equipas Pendentes</p>
                <h3 className="text-2xl font-bold text-white">
                  {statsLoading ? '...' : stats?.pendingTeams || 0}
                </h3>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-cs-dark-800 border border-cs-dark-700">
          <CardContent className="pt-6">
            <div className="flex items-center">
              <div className="p-2 bg-cs-dark-700 rounded-lg mr-4">
                <Clock className="h-5 w-5 text-purple-500" />
              </div>
              <div>
                <p className="text-sm text-gray-400">Streamers Pendentes</p>
                <h3 className="text-2xl font-bold text-white">
                  {statsLoading ? '...' : stats?.pendingStreamers || 0}
                </h3>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-cs-dark-800 border border-cs-dark-700">
          <CardContent className="pt-6">
            <div className="flex items-center">
              <div className="p-2 bg-cs-dark-700 rounded-lg mr-4">
                <Users className="h-5 w-5 text-blue-500" />
              </div>
              <div>
                <p className="text-sm text-gray-400">Utilizadores Totais</p>
                <h3 className="text-2xl font-bold text-white">
                  {statsLoading ? '...' : stats?.totalUsers || 0}
                </h3>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-cs-dark-800 border border-cs-dark-700">
          <CardContent className="pt-6">
            <div className="flex items-center">
              <div className="p-2 bg-cs-dark-700 rounded-lg mr-4">
                <Activity className="h-5 w-5 text-orange-500" />
              </div>
              <div>
                <p className="text-sm text-gray-400">Equipas Totais</p>
                <h3 className="text-2xl font-bold text-white">
                  {statsLoading ? '...' : stats?.totalTeams || 0}
                </h3>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Tabs de gerenciamento */}
      <Tabs defaultValue="teams" className="w-full">
        <TabsList className="bg-cs-dark-800 mb-6">
          <TabsTrigger value="teams" className="data-[state=active]:bg-cs-dark-700">
            <Users className="h-4 w-4 mr-2" />
            Equipas Pendentes
          </TabsTrigger>
          <TabsTrigger value="streamers" className="data-[state=active]:bg-cs-dark-700">
            <Radio className="h-4 w-4 mr-2" />
            Streamers Pendentes
          </TabsTrigger>
        </TabsList>
        
        {/* Tab de Equipas Pendentes */}
        <TabsContent value="teams">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-white mb-4">Equipas Aguardando Aprovação</h2>
            
            {teamsLoading ? (
              <div className="text-center py-10">
                <div className="spinner"></div>
                <p className="text-gray-400 mt-2">Carregando equipas pendentes...</p>
              </div>
            ) : pendingTeams?.length === 0 ? (
              <div className="text-center py-10 bg-cs-dark-800 rounded-lg border border-cs-dark-700">
                <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-3" />
                <p className="text-gray-400">Não há equipas aguardando aprovação.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4">
                {pendingTeams?.map((team) => (
                  <Card key={team.id} className="bg-cs-dark-800 border border-cs-dark-700">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-white">{team.name}</CardTitle>
                          <CardDescription className="text-gray-400">
                            {new Date(team.createdAt).toLocaleDateString('pt-PT')}
                          </CardDescription>
                        </div>
                        <Badge className="bg-yellow-600 text-white">Pendente</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div>
                          <span className="text-sm font-medium text-gray-400">Região:</span>
                          <span className="text-sm text-white ml-2">{team.region || 'Não especificado'}</span>
                        </div>
                        <div>
                          <span className="text-sm font-medium text-gray-400">Nível:</span>
                          <span className="text-sm text-white ml-2">{team.tier || 'Não especificado'}</span>
                        </div>
                        <div>
                          <span className="text-sm font-medium text-gray-400">Descrição:</span>
                          <p className="text-sm text-white mt-1">
                            {team.description || 'Sem descrição disponível'}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-end gap-2 pt-2">
                      <Button 
                        size="sm" 
                        variant="destructive"
                        onClick={() => openRejectModal(team.id, 'team', team.name)}
                        disabled={rejectTeamMutation.isPending}
                      >
                        <X className="h-4 w-4 mr-1" />
                        Rejeitar
                      </Button>
                      <Button 
                        size="sm" 
                        className="bg-green-600 hover:bg-green-700"
                        onClick={() => handleApprove(team.id, 'team')}
                        disabled={approveTeamMutation.isPending}
                      >
                        <Check className="h-4 w-4 mr-1" />
                        Aprovar
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </TabsContent>
        
        {/* Tab de Streamers Pendentes */}
        <TabsContent value="streamers">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-white mb-4">Streamers Aguardando Verificação</h2>
            
            {streamersLoading ? (
              <div className="text-center py-10">
                <div className="spinner"></div>
                <p className="text-gray-400 mt-2">Carregando streamers pendentes...</p>
              </div>
            ) : pendingStreamers?.length === 0 ? (
              <div className="text-center py-10 bg-cs-dark-800 rounded-lg border border-cs-dark-700">
                <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-3" />
                <p className="text-gray-400">Não há streamers aguardando verificação.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4">
                {pendingStreamers?.map((streamer) => (
                  <Card key={streamer.id} className="bg-cs-dark-800 border border-cs-dark-700">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-white">{streamer.name}</CardTitle>
                          <CardDescription className="text-gray-400">
                            {new Date(streamer.createdAt).toLocaleDateString('pt-PT')}
                          </CardDescription>
                        </div>
                        <Badge className="bg-purple-600 text-white">
                          {streamer.applicationType || 'Streamer'}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div>
                          <span className="text-sm font-medium text-gray-400">Plataforma:</span>
                          <span className="text-sm text-white ml-2">{streamer.platform || 'Não especificado'}</span>
                        </div>
                        <div>
                          <span className="text-sm font-medium text-gray-400">Canal:</span>
                          <span className="text-sm text-white ml-2">
                            {streamer.channelUrl ? (
                              <a 
                                href={streamer.channelUrl} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-cs-neon hover:underline"
                              >
                                Abrir link do canal
                              </a>
                            ) : 'Não especificado'}
                          </span>
                        </div>
                        <div>
                          <span className="text-sm font-medium text-gray-400">Descrição:</span>
                          <p className="text-sm text-white mt-1">
                            {streamer.description || 'Sem descrição disponível'}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-end gap-2 pt-2">
                      <Button 
                        size="sm" 
                        variant="destructive"
                        onClick={() => openRejectModal(streamer.id, 'streamer', streamer.name)}
                        disabled={rejectStreamerMutation.isPending}
                      >
                        <X className="h-4 w-4 mr-1" />
                        Rejeitar
                      </Button>
                      <Button 
                        size="sm" 
                        className="bg-green-600 hover:bg-green-700"
                        onClick={() => handleApprove(streamer.id, 'streamer')}
                        disabled={approveStreamerMutation.isPending}
                      >
                        <Check className="h-4 w-4 mr-1" />
                        Verificar
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
      
      {/* Modal de Rejeição */}
      <Dialog open={rejectModalOpen} onOpenChange={setRejectModalOpen}>
        <DialogContent className="bg-cs-dark-800 border border-cs-dark-700 text-white">
          <DialogHeader>
            <DialogTitle>Rejeitar {selectedItem?.type === 'team' ? 'Equipa' : 'Streamer'}</DialogTitle>
            <DialogDescription className="text-gray-400">
              Insira um motivo para rejeitar {selectedItem?.name}.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="reason">Motivo da rejeição</Label>
              <Textarea
                id="reason"
                placeholder="Explique o motivo da rejeição"
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
                className="bg-cs-dark-700 border-cs-dark-600 text-white"
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setRejectModalOpen(false)}
              className="bg-cs-dark-700 hover:bg-cs-dark-600 text-white"
            >
              Cancelar
            </Button>
            <Button 
              variant="destructive" 
              onClick={handleReject}
              disabled={!rejectReason.trim() || rejectTeamMutation.isPending || rejectStreamerMutation.isPending}
            >
              Rejeitar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <style jsx>{`
        .spinner {
          border: 4px solid rgba(0, 0, 0, 0.1);
          width: 36px;
          height: 36px;
          border-radius: 50%;
          border-left-color: #00ffaa;
          margin: 0 auto;
          animation: spin 1s linear infinite;
        }
        
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default AdminPage;