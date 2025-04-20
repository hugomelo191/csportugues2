import { useAuth } from '@/hooks/use-auth';
import { Redirect } from 'wouter';
import { Button } from '@/components/ui/button';
import { Link } from 'wouter';
import StreamerApplicationForm from '@/components/streamers/StreamerApplicationForm';
import { Loader2 } from 'lucide-react';

const StreamerApplicationPage = () => {
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
          <h1 className="text-2xl md:text-3xl font-orbitron text-white mb-2">Candidatura de Streamer/Caster</h1>
          <p className="text-gray-400">
            Junta-te à nossa comunidade oficial de streamers e casters portugueses de Counter-Strike 2.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <StreamerApplicationForm />
          </div>
          
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-cs-dark-800 p-6 rounded-lg border border-cs-dark-700">
              <h3 className="text-lg font-orbitron text-white mb-4">Informações</h3>
              <div className="space-y-4 text-gray-300 text-sm">
                <p>
                  As candidaturas são analisadas individualmente pela nossa equipa de administração.
                </p>
                <p>
                  Para ser aprovado, precisa cumprir estes requisitos mínimos:
                </p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Criar conteúdo de CS2 com regularidade</li>
                  <li>Foco na comunidade portuguesa</li>
                  <li>Manter uma postura profissional e adequada</li>
                  <li>Streamers devem ter histórico de transmissões de CS2</li>
                  <li>Casters devem ter experiência prévia ou demonstrar aptidão</li>
                </ul>
                <p>
                  Os streamers e casters aprovados serão elegíveis para:
                </p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Destaque na secção oficial de streamers da plataforma</li>
                  <li>Oportunidade de transmitir/comentar torneios oficiais</li>
                  <li>Participação em eventos exclusivos da comunidade</li>
                  <li>Acesso antecipado a notícias e actualizações</li>
                </ul>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-cs-blue/20 to-cs-blue/5 p-6 rounded-lg border border-cs-blue/30">
              <h3 className="text-lg font-orbitron text-white mb-4">Já é Streamer?</h3>
              <p className="text-gray-300 text-sm mb-4">
                Se já tens perfil na nossa plataforma, podes aceder à tua página de streamer e verificar o estado da tua candidatura.
              </p>
              <Link href="/streamers">
                <Button className="w-full py-3 bg-cs-blue hover:bg-cs-blue/80 text-white font-orbitron">
                  VER STREAMERS
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StreamerApplicationPage;