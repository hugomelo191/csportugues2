import { useEffect } from 'react';
import { useLocation } from 'wouter';
import { useAuth } from '@/hooks/use-auth';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import LoginForm from '@/components/auth/LoginForm';
import RegisterForm from '@/components/auth/RegisterForm';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const AuthPage = () => {
  const [, navigate] = useLocation();
  const { user, isLoading } = useAuth();

  useEffect(() => {
    if (user && !isLoading) {
      navigate('/');
    }
  }, [user, isLoading, navigate]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-cs-dark">
        <div className="w-10 h-10 border-4 border-cs-neon border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (user) {
    return null; // Will redirect in useEffect
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow flex items-center justify-center py-12 bg-cs-dark">
        <div className="container px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-6xl mx-auto">
            {/* Auth Forms */}
            <div className="bg-cs-dark-800 border border-cs-dark-600 rounded-lg p-8">
              <div className="mb-6">
                <h1 className="font-orbitron text-2xl sm:text-3xl font-bold text-white mb-2">Bem-vindo à <span className="text-cs-neon">CS</span>Portugues</h1>
                <p className="text-gray-400">Faça login ou registe-se para aceder a todas as funcionalidades da plataforma.</p>
              </div>
              
              <Tabs defaultValue="login" className="w-full">
                <TabsList className="grid grid-cols-2 mb-6">
                  <TabsTrigger value="login" className="font-orbitron">Login</TabsTrigger>
                  <TabsTrigger value="register" className="font-orbitron">Registo</TabsTrigger>
                </TabsList>
                <TabsContent value="login">
                  <LoginForm />
                </TabsContent>
                <TabsContent value="register">
                  <RegisterForm />
                </TabsContent>
              </Tabs>
            </div>
            
            {/* Hero Section */}
            <div className="relative flex items-center rounded-lg overflow-hidden bg-cs-dark-700 border border-cs-dark-600 p-8 hidden md:block">
              <div className="absolute inset-0 opacity-10" style={{background: "url('https://images.unsplash.com/photo-1551150441-3f3828204ef0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80')", backgroundSize: 'cover', backgroundPosition: 'center'}}></div>
              <div className="absolute inset-0 bg-gradient-to-t from-cs-dark-800 to-transparent"></div>
              
              <div className="relative z-10">
                <h2 className="font-orbitron text-3xl font-bold text-white mb-4">A Comunidade de <span className="text-cs-neon">CS2</span> em Portugal</h2>
                <div className="h-1 w-16 bg-cs-neon mb-6"></div>
                
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <div className="w-8 h-8 rounded-full bg-cs-neon/20 flex items-center justify-center text-cs-neon mr-3 mt-0.5">
                      <i className="ri-team-line"></i>
                    </div>
                    <div>
                      <h3 className="font-medium text-white mb-1">Encontre ou Crie uma Equipa</h3>
                      <p className="text-gray-400 text-sm">Junte-se a uma equipa existente ou monte a sua própria lineup para competições.</p>
                    </div>
                  </li>
                  
                  <li className="flex items-start">
                    <div className="w-8 h-8 rounded-full bg-cs-neon/20 flex items-center justify-center text-cs-neon mr-3 mt-0.5">
                      <i className="ri-trophy-line"></i>
                    </div>
                    <div>
                      <h3 className="font-medium text-white mb-1">Participe em Torneios</h3>
                      <p className="text-gray-400 text-sm">Inscreva-se nas competições nacionais e dispute prémios.</p>
                    </div>
                  </li>
                  
                  <li className="flex items-start">
                    <div className="w-8 h-8 rounded-full bg-cs-neon/20 flex items-center justify-center text-cs-neon mr-3 mt-0.5">
                      <i className="ri-user-star-line"></i>
                    </div>
                    <div>
                      <h3 className="font-medium text-white mb-1">Perfil de Jogador</h3>
                      <p className="text-gray-400 text-sm">Crie o seu perfil, destaque suas habilidades e estatísticas para ser notado.</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AuthPage;
