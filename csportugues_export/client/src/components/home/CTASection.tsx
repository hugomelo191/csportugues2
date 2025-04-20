import { Link } from 'wouter';
import { useAuth } from '@/hooks/use-auth';

const CTASection = () => {
  const { user } = useAuth();

  return (
    <section className="py-16 bg-cs-dark relative">
      <div className="absolute inset-0 opacity-10" style={{background: "url('https://images.unsplash.com/photo-1552820728-8b83bb6b773f?ixlib=rb-1.2.1&auto=format&fit=crop&w=2100&q=80')", backgroundSize: 'cover', backgroundPosition: 'center'}}></div>
      <div className="absolute inset-0 bg-gradient-to-r from-cs-dark to-cs-dark-800/80"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-orbitron font-bold text-3xl md:text-4xl text-white mb-4">
            <span className="text-cs-neon glow-text">JUNTE-SE</span> À COMUNIDADE CS2 PORTUGUESA
          </h2>
          <p className="text-gray-300 text-lg mb-8">Crie o seu perfil, junte-se a uma equipa ou forme a sua própria equipa para competir nos torneios e ligas nacionais.</p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            {user ? (
              <Link href="/teams">
                <button className="clip-angled-right px-8 py-4 bg-gradient-to-r from-cs-neon to-cs-neon/70 text-cs-dark-800 font-orbitron font-semibold hover:shadow-neon transition-shadow duration-300 flex items-center justify-center">
                  <span>CRIAR EQUIPA</span>
                  <i className="ri-add-line ml-2"></i>
                </button>
              </Link>
            ) : (
              <Link href="/auth">
                <button className="clip-angled-right px-8 py-4 bg-gradient-to-r from-cs-neon to-cs-neon/70 text-cs-dark-800 font-orbitron font-semibold hover:shadow-neon transition-shadow duration-300 flex items-center justify-center">
                  <span>CRIAR CONTA</span>
                  <i className="ri-user-add-line ml-2"></i>
                </button>
              </Link>
            )}
            <button className="clip-angled-left px-8 py-4 border border-cs-blue/40 bg-cs-dark-800/50 text-cs-blue font-orbitron font-medium hover:bg-cs-dark-700 transition-colors duration-300 flex items-center justify-center">
              <i className="ri-information-line mr-2"></i>
              <span>COMO FUNCIONA</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
