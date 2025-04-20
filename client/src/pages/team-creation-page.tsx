import { useAuth } from '@/hooks/use-auth';
import { Redirect } from 'wouter';
import { Button } from '@/components/ui/button';
import { Link } from 'wouter';
import TeamCreationForm from '@/components/teams/TeamCreationForm';
import { Loader2, Users, Shield, Calendar, Trophy } from 'lucide-react';

const TeamCreationPage = () => {
  const { user, isLoading } = useAuth();
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-cs-neon" />
      </div>
    );
  }
  
  if (!user) {
    return <Redirect to="/auth" />;
  }
  
  return (
    <div className="py-12">
      <div className="container max-w-6xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-orbitron text-white mb-2">Criar Equipa</h1>
          <p className="text-gray-400">
            Cria a tua equipa de Counter-Strike 2 e participa em torneios, encontra novos membros e acompanha o teu progresso.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <TeamCreationForm onSuccess={() => window.scrollTo(0, 0)} />
          </div>
          
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-cs-dark-800 p-6 rounded-lg border border-cs-dark-700">
              <h3 className="text-lg font-orbitron text-white mb-4">Processo de Aprovação</h3>
              <div className="space-y-4 text-gray-300 text-sm">
                <p>
                  Todas as equipas criadas passam por um processo de aprovação antes de aparecerem na plataforma.
                </p>
                <p>
                  Este processo garante que as equipas cumprem as diretrizes da comunidade e evita conteúdo inadequado.
                </p>
                <div className="mt-4 space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="mt-1 rounded-full bg-cs-dark-700 p-1.5">
                      <Shield className="h-4 w-4 text-cs-neon" />
                    </div>
                    <div>
                      <h4 className="text-white text-sm font-medium">Moderação</h4>
                      <p className="text-xs text-gray-400">A tua equipa será revista pelos administradores</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="mt-1 rounded-full bg-cs-dark-700 p-1.5">
                      <Calendar className="h-4 w-4 text-cs-neon" />
                    </div>
                    <div>
                      <h4 className="text-white text-sm font-medium">Tempo de Espera</h4>
                      <p className="text-xs text-gray-400">Geralmente, as equipas são aprovadas em 24-48h</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="mt-1 rounded-full bg-cs-dark-700 p-1.5">
                      <Trophy className="h-4 w-4 text-cs-neon" />
                    </div>
                    <div>
                      <h4 className="text-white text-sm font-medium">Perfil Completo</h4>
                      <p className="text-xs text-gray-400">Equipas com informações completas são aprovadas mais rapidamente</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-cs-blue/20 to-cs-blue/5 p-6 rounded-lg border border-cs-blue/30">
              <h3 className="text-lg font-orbitron text-white mb-4">Já Tens Equipa?</h3>
              <p className="text-gray-300 text-sm mb-4">
                Se já tens equipa, podes ver o estado da tua candidatura ou explorar outras equipas na comunidade.
              </p>
              <div className="grid grid-cols-2 gap-3">
                <Link href="/teams">
                  <Button className="w-full py-3 bg-cs-blue hover:bg-cs-blue/80 text-white font-orbitron">
                    EQUIPAS
                  </Button>
                </Link>
                <Link href="/profile">
                  <Button variant="outline" className="w-full py-3 border-cs-blue/50 text-cs-blue hover:bg-cs-blue/10 font-orbitron">
                    PERFIL
                  </Button>
                </Link>
              </div>
            </div>
            
            <div className="bg-cs-dark-800 p-6 rounded-lg border border-cs-dark-700">
              <h3 className="text-lg font-orbitron text-white mb-4">Procurando Jogadores?</h3>
              <div className="flex items-center gap-3 mb-4">
                <div className="rounded-full bg-cs-dark-700 p-2">
                  <Users className="h-5 w-5 text-cs-neon" />
                </div>
                <div>
                  <h4 className="text-white text-sm font-medium">Matchmaking</h4>
                  <p className="text-xs text-gray-400">Encontra jogadores para a tua equipa</p>
                </div>
              </div>
              <p className="text-gray-300 text-sm mb-4">
                Após criar a tua equipa, podes procurar novos membros na nossa secção de matchmaking.
              </p>
              <Link href="/matchmaking">
                <Button variant="outline" className="w-full py-3 border-cs-dark-600 hover:bg-cs-dark-700 text-white font-orbitron">
                  MATCHMAKING
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamCreationPage;