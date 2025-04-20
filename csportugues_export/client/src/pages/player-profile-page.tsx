import { useAuth } from '@/hooks/use-auth';
import { Redirect } from 'wouter';
import { Button } from '@/components/ui/button';
import { Link } from 'wouter';
import PlayerProfileForm from '@/components/players/PlayerProfileForm';
import { Loader2, Users, UserCheck, Target, Settings, Award } from 'lucide-react';

const PlayerProfilePage = () => {
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
          <h1 className="text-2xl md:text-3xl font-orbitron text-white mb-2">Perfil de Jogador</h1>
          <p className="text-gray-400">
            Cria ou atualiza o teu perfil de jogador para participar no matchmaking e juntar-te a equipas.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <PlayerProfileForm onSuccess={() => window.scrollTo(0, 0)} />
          </div>
          
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-cs-dark-800 p-6 rounded-lg border border-cs-dark-700">
              <h3 className="text-lg font-orbitron text-white mb-4">Porque criar um perfil?</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="mt-1 rounded-full bg-cs-dark-700 p-1.5">
                    <UserCheck className="h-4 w-4 text-cs-neon" />
                  </div>
                  <div>
                    <h4 className="text-white text-sm font-medium">Visibilidade</h4>
                    <p className="text-xs text-gray-400">Sê encontrado por equipas que procuram jogadores</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="mt-1 rounded-full bg-cs-dark-700 p-1.5">
                    <Users className="h-4 w-4 text-cs-neon" />
                  </div>
                  <div>
                    <h4 className="text-white text-sm font-medium">Equipas</h4>
                    <p className="text-xs text-gray-400">Candidata-te a equipas existentes ou cria a tua própria</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="mt-1 rounded-full bg-cs-dark-700 p-1.5">
                    <Target className="h-4 w-4 text-cs-neon" />
                  </div>
                  <div>
                    <h4 className="text-white text-sm font-medium">Matchmaking</h4>
                    <p className="text-xs text-gray-400">Participa no nosso sistema de matchmaking</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="mt-1 rounded-full bg-cs-dark-700 p-1.5">
                    <Award className="h-4 w-4 text-cs-neon" />
                  </div>
                  <div>
                    <h4 className="text-white text-sm font-medium">Torneios</h4>
                    <p className="text-xs text-gray-400">Participa em torneios organizados na plataforma</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-cs-blue/20 to-cs-blue/5 p-6 rounded-lg border border-cs-blue/30">
              <h3 className="text-lg font-orbitron text-white mb-4">Procura Equipa</h3>
              <p className="text-gray-300 text-sm mb-4">
                Depois de criar o teu perfil, podes procurar equipas que estejam a recrutar novos jogadores.
              </p>
              <Link href="/matchmaking">
                <Button className="w-full py-3 bg-cs-blue hover:bg-cs-blue/80 text-white font-orbitron">
                  ENCONTRAR EQUIPA
                </Button>
              </Link>
            </div>
            
            <div className="bg-cs-dark-800 p-6 rounded-lg border border-cs-dark-700">
              <h3 className="text-lg font-orbitron text-white mb-4">Cria a Tua Equipa</h3>
              <div className="flex items-center gap-3 mb-4">
                <div className="rounded-full bg-cs-dark-700 p-2">
                  <Settings className="h-5 w-5 text-cs-neon" />
                </div>
                <div>
                  <h4 className="text-white text-sm font-medium">Gerir Equipa</h4>
                  <p className="text-xs text-gray-400">Torna-te capitão da tua própria equipa</p>
                </div>
              </div>
              <p className="text-gray-300 text-sm mb-4">
                Preferência em criar a tua própria equipa? Podes registá-la na nossa plataforma e começar a recrutar jogadores.
              </p>
              <Link href="/team-creation">
                <Button variant="outline" className="w-full py-3 border-cs-dark-600 hover:bg-cs-dark-700 text-white font-orbitron">
                  CRIAR EQUIPA
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerProfilePage;