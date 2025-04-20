import { Link } from 'wouter';
import { useAuth } from '@/hooks/use-auth';

const HeroSection = () => {
  const { user } = useAuth();

  return (
    <section className="relative bg-cs-dark py-12 md:py-20 overflow-hidden">
      <div className="absolute inset-0 opacity-20" style={{background: "url('https://images.unsplash.com/photo-1542751371-adc38448a05e?ixlib=rb-1.2.1&auto=format&fit=crop&w=2100&q=80')", backgroundSize: 'cover', backgroundPosition: 'center', filter: 'brightness(0.5)'}}></div>
      <div className="absolute inset-0 bg-gradient-to-b from-cs-dark to-transparent opacity-90"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="w-full md:w-1/2 mb-10 md:mb-0">
            <div className="relative">
              <h1 className="font-orbitron font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white leading-tight mb-6">
                <span className="text-cs-neon glow-text">COMUNIDADE</span> 
                <br />PORTUGUESA DE
                <br />COUNTER-STRIKE 2
              </h1>
              <div className="h-1 w-20 bg-gradient-to-r from-cs-neon to-cs-blue mb-6"></div>
              <p className="text-gray-300 text-lg mb-8 max-w-md">A plataforma definitiva para jogadores, equipas e fãs de CS2 em Portugal. Competições, recrutamento e toda a comunidade num só lugar.</p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                {user ? (
                  <Link href="/matchmaking">
                    <button className="clip-angled-right px-6 py-3 bg-gradient-to-r from-cs-neon to-cs-neon/70 text-cs-dark-800 font-orbitron font-semibold hover:shadow-neon transition-shadow duration-300 flex items-center justify-center">
                      <span>MATCHMAKING</span>
                      <i className="ri-arrow-right-line ml-2"></i>
                    </button>
                  </Link>
                ) : (
                  <Link href="/auth">
                    <button className="clip-angled-right px-6 py-3 bg-gradient-to-r from-cs-neon to-cs-neon/70 text-cs-dark-800 font-orbitron font-semibold hover:shadow-neon transition-shadow duration-300 flex items-center justify-center">
                      <span>JUNTE-SE AGORA</span>
                      <i className="ri-arrow-right-line ml-2"></i>
                    </button>
                  </Link>
                )}
                <button className="clip-angled-left px-6 py-3 border border-cs-neon/30 bg-cs-dark-800/50 text-cs-neon font-orbitron font-medium hover:bg-cs-dark-700 transition-colors duration-300 flex items-center justify-center">
                  <i className="ri-information-line mr-2"></i>
                  <span>SAIBA MAIS</span>
                </button>
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/2">
            <div className="relative mx-auto max-w-md">
              {/* Featured Match Card */}
              <div className="relative bg-cs-dark-800 border border-cs-dark-600 rounded-md overflow-hidden sheen-effect">
                <div className="absolute top-0 left-0 bg-cs-red px-3 py-1 font-orbitron text-xs font-semibold clip-angled-right z-10">
                  AO VIVO
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-xs text-gray-400">Liga Portuguesa • Final</span>
                    <div className="flex items-center space-x-1">
                      <span className="w-2 h-2 rounded-full bg-cs-red animate-pulse inline-block"></span>
                      <span className="text-cs-red text-xs font-medium">12.4K espectadores</span>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center mb-6 bg-cs-dark-700/60 p-3 rounded">
                    <div className="flex flex-col items-center text-center w-1/3">
                      <div className="w-14 h-14 mb-2 rounded bg-cs-dark-600 p-2 flex items-center justify-center">
                        <span className="font-orbitron text-lg">FTW</span>
                      </div>
                      <span className="font-orbitron font-medium">FTW</span>
                      <span className="text-cs-neon font-orbitron text-lg font-bold">13</span>
                    </div>
                    <div className="flex flex-col items-center w-1/3">
                      <div className="font-orbitron text-xs mb-2 text-gray-400">MAPA 2/3</div>
                      <div className="text-gray-300 text-xs mb-1">Inferno</div>
                      <div className="font-orbitron text-cs-yellow text-sm">1º OVERTIME</div>
                    </div>
                    <div className="flex flex-col items-center text-center w-1/3">
                      <div className="w-14 h-14 mb-2 rounded bg-cs-dark-600 p-2 flex items-center justify-center">
                        <span className="font-orbitron text-lg">SAW</span>
                      </div>
                      <span className="font-orbitron font-medium">SAW</span>
                      <span className="text-cs-neon font-orbitron text-lg font-bold">13</span>
                    </div>
                  </div>
                  
                  <button className="w-full py-2 bg-cs-dark-600 hover:bg-cs-dark-700 transition rounded flex items-center justify-center text-sm font-medium">
                    <i className="ri-live-line mr-2 text-cs-red"></i>
                    <span>Assistir agora na Twitch</span>
                  </button>
                </div>
              </div>
              
              {/* Upcoming Matches Indicator */}
              <div className="absolute -right-4 bottom-4 bg-cs-dark-700 border border-cs-dark-600 rounded px-3 py-2 shadow-lg">
                <div className="flex items-center space-x-2">
                  <i className="ri-calendar-event-line text-cs-blue"></i>
                  <span className="text-xs font-medium">+ 3 jogos hoje</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
