import { Link } from 'wouter';
import { useAuth } from '@/hooks/use-auth';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu = ({ isOpen, onClose }: MobileMenuProps) => {
  const { user } = useAuth();

  if (!isOpen) return null;

  return (
    <div className="md:hidden bg-cs-dark-800 border-b border-gray-800 p-4 fixed top-[58px] left-0 right-0 z-50">
      <nav className="flex flex-col space-y-3">
        <Link href="/" className="py-2 text-white font-medium" onClick={onClose}>Início</Link>
        <Link href="/teams" className="py-2 text-gray-400 font-medium" onClick={onClose}>Equipas</Link>
        <Link href="/matchmaking" className="py-2 text-gray-400 font-medium" onClick={onClose}>Matchmaking</Link>
        <Link href="/matches" className="py-2 text-gray-400 font-medium" onClick={onClose}>Jogos</Link>
        <Link href="/tournaments" className="py-2 text-gray-400 font-medium" onClick={onClose}>Competições</Link>
        <Link href="/news" className="py-2 text-gray-400 font-medium" onClick={onClose}>Notícias</Link>
        <Link href="/streamers" className="py-2 text-gray-400 font-medium" onClick={onClose}>Streamers</Link>
        
        {!user && (
          <div className="pt-2">
            <Link href="/auth">
              <button 
                className="w-full px-4 py-3 rounded bg-gradient-to-r from-cs-neon/80 to-cs-neon/30 text-cs-dark-800 font-semibold"
                onClick={onClose}
              >
                Registo / Login
              </button>
            </Link>
          </div>
        )}
      </nav>
    </div>
  );
};

export default MobileMenu;
