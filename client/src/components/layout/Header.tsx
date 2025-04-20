import { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { useAuth } from '@/hooks/use-auth';
import MobileMenu from './MobileMenu';
import AuthModal from '../auth/AuthModal';
import { 
  ChevronDown, 
  UserCircle2, 
  Users, 
  Radio, 
  LogOut,
  PlusCircle
} from 'lucide-react';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isCreateMenuOpen, setIsCreateMenuOpen] = useState(false);
  
  const userMenuRef = useRef<HTMLDivElement>(null);
  const createMenuRef = useRef<HTMLDivElement>(null);
  
  const [location] = useLocation();
  const { user, logoutMutation } = useAuth();

  const navLinks = [
    { name: 'Início', path: '/' },
    { name: 'Equipas', path: '/teams' },
    { name: 'Matchmaking', path: '/matchmaking' },
    { name: 'Jogos', path: '/matches' },
    { name: 'Competições', path: '/tournaments' },
    { name: 'Notícias', path: '/news' },
    { name: 'Streamers', path: '/streamers' },
  ];
  
  const createLinks = [
    { name: 'Criar Equipa', path: '/team-creation', icon: Users },
    { name: 'Perfil de Jogador', path: '/player-profile', icon: UserCircle2 },
    { name: 'Candidatura Streamer', path: '/streamer-application', icon: Radio },
  ];

  const isActive = (path: string) => {
    return location === path;
  };

  const handleLogout = () => {
    logoutMutation.mutate();
    setIsUserMenuOpen(false);
  };
  
  // Fechar menus quando clicar fora
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
      if (createMenuRef.current && !createMenuRef.current.contains(event.target as Node)) {
        setIsCreateMenuOpen(false);
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <header className="relative bg-cs-dark-800 border-b border-cs-dark-600 z-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-3">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <div className="relative h-10 w-10 flex items-center justify-center bg-cs-dark-600 rounded">
                <span className="text-cs-neon font-orbitron font-bold text-lg glow-text">CS</span>
                <div className="absolute inset-0 rounded bg-gradient-to-r from-cs-neon/30 to-cs-blue/30 blur-md opacity-20"></div>
              </div>
              <span className="font-orbitron font-bold text-xl text-white">
                <span className="text-cs-neon">CS</span>Portugues
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-6">
              {navLinks.map((link) => (
                <Link 
                  key={link.path}
                  href={link.path} 
                  className={`nav-link ${isActive(link.path) ? 'text-white' : 'text-gray-400'} font-medium hover:text-cs-neon transition relative after:absolute after:h-0.5 after:bg-cs-neon after:w-full after:left-0 after:bottom-0 after:scale-x-0 after:origin-right hover:after:scale-x-100 hover:after:origin-left after:transition-transform pb-1`}
                >
                  {link.name}
                </Link>
              ))}
              
              {user && (
                <div ref={createMenuRef} className="relative">
                  <button
                    onClick={() => setIsCreateMenuOpen(!isCreateMenuOpen)}
                    className={`flex items-center gap-1 ${isCreateMenuOpen ? 'text-cs-neon' : 'text-gray-400'} font-medium hover:text-cs-neon transition`}
                  >
                    <PlusCircle className="h-4 w-4" />
                    <span>Criar</span>
                    <ChevronDown className={`h-4 w-4 transition-transform ${isCreateMenuOpen ? 'rotate-180' : ''}`} />
                  </button>
                  
                  {isCreateMenuOpen && (
                    <div className="absolute top-10 right-0 w-60 bg-cs-dark-900 border border-cs-dark-700 rounded-md shadow-lg shadow-black/50 p-2 z-50">
                      <div className="py-1">
                        {createLinks.map((link) => (
                          <Link 
                            key={link.path} 
                            href={link.path}
                            onClick={() => setIsCreateMenuOpen(false)}
                          >
                            <div className="flex items-center px-4 py-2 text-sm text-gray-300 hover:bg-cs-dark-800 hover:text-white rounded transition">
                              <link.icon className="h-4 w-4 mr-2 text-cs-neon" />
                              <span>{link.name}</span>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </nav>

            {/* User Controls */}
            <div className="flex items-center space-x-4">
              <button className="hidden md:flex items-center text-gray-300 hover:text-white transition">
                <i className="ri-search-line text-xl"></i>
              </button>
              
              {user ? (
                <div ref={userMenuRef} className="relative">
                  <button 
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="px-4 py-2 rounded bg-gradient-to-r from-cs-dark-700 to-cs-dark-600 hover:from-cs-neon/20 hover:to-cs-neon/5 flex items-center space-x-2 text-white transition duration-300 border border-cs-dark-600 hover:border-cs-neon/30 shadow-sm"
                  >
                    <UserCircle2 className="h-4 w-4 mr-1" />
                    <span className="font-medium">{user.username}</span>
                    <ChevronDown className={`h-4 w-4 transition-transform ${isUserMenuOpen ? 'rotate-180' : ''}`} />
                  </button>
                  
                  {isUserMenuOpen && (
                    <div className="absolute top-12 right-0 w-52 bg-cs-dark-900 border border-cs-dark-700 rounded-md shadow-lg shadow-black/50 p-2 z-50">
                      <Link href="/player-profile" onClick={() => setIsUserMenuOpen(false)}>
                        <div className="flex items-center px-4 py-2 text-sm text-gray-300 hover:bg-cs-dark-800 hover:text-white rounded transition">
                          <UserCircle2 className="h-4 w-4 mr-2 text-cs-neon" />
                          <span>Perfil de Jogador</span>
                        </div>
                      </Link>
                      <Link href="/team-creation" onClick={() => setIsUserMenuOpen(false)}>
                        <div className="flex items-center px-4 py-2 text-sm text-gray-300 hover:bg-cs-dark-800 hover:text-white rounded transition">
                          <Users className="h-4 w-4 mr-2 text-cs-neon" />
                          <span>Criar Equipa</span>
                        </div>
                      </Link>
                      <Link href="/streamer-application" onClick={() => setIsUserMenuOpen(false)}>
                        <div className="flex items-center px-4 py-2 text-sm text-gray-300 hover:bg-cs-dark-800 hover:text-white rounded transition">
                          <Radio className="h-4 w-4 mr-2 text-cs-neon" />
                          <span>Streamer/Caster</span>
                        </div>
                      </Link>
                      <div className="border-t border-cs-dark-700 my-1"></div>
                      <button 
                        onClick={handleLogout}
                        className="w-full flex items-center px-4 py-2 text-sm text-gray-300 hover:bg-cs-dark-800 hover:text-white rounded transition"
                      >
                        <LogOut className="h-4 w-4 mr-2 text-cs-neon" />
                        <span>Terminar sessão</span>
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="relative group">
                  <button 
                    onClick={() => setIsAuthModalOpen(true)}
                    className="px-4 py-2 rounded bg-gradient-to-r from-cs-dark-700 to-cs-dark-600 hover:from-cs-neon/20 hover:to-cs-neon/5 flex items-center space-x-2 text-white transition duration-300 border border-cs-dark-600 hover:border-cs-neon/30 shadow-sm"
                  >
                    <UserCircle2 className="h-4 w-4 mr-1" />
                    <span className="font-medium">Login</span>
                  </button>
                  <div className="absolute left-0 right-0 h-0.5 bottom-0 bg-cs-neon scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
                </div>
              )}
              
              <button 
                className="md:hidden text-gray-300 hover:text-white transition"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                <i className="ri-menu-line text-2xl"></i>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />

      {/* Auth Modal */}
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </>
  );
};

export default Header;
