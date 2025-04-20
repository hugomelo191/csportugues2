import { Link } from 'wouter';

const Footer = () => {
  return (
    <footer className="bg-cs-dark-800 border-t border-cs-dark-600 pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="relative h-8 w-8 flex items-center justify-center bg-cs-dark-600 rounded">
                <span className="text-cs-neon font-orbitron font-bold text-sm">CS</span>
              </div>
              <span className="font-orbitron font-bold text-lg text-white">
                <span className="text-cs-neon">CS</span>Portugues
              </span>
            </div>
            <p className="text-gray-400 text-sm mb-4">A plataforma definitiva para a comunidade competitiva portuguesa de Counter-Strike 2.</p>
            <div className="flex space-x-3">
              <a href="#" className="w-8 h-8 flex items-center justify-center rounded bg-cs-dark-600 text-gray-400 hover:text-white hover:bg-cs-dark transition">
                <i className="ri-discord-line"></i>
              </a>
              <a href="#" className="w-8 h-8 flex items-center justify-center rounded bg-cs-dark-600 text-gray-400 hover:text-white hover:bg-cs-dark transition">
                <i className="ri-twitter-x-line"></i>
              </a>
              <a href="#" className="w-8 h-8 flex items-center justify-center rounded bg-cs-dark-600 text-gray-400 hover:text-white hover:bg-cs-dark transition">
                <i className="ri-instagram-line"></i>
              </a>
              <a href="#" className="w-8 h-8 flex items-center justify-center rounded bg-cs-dark-600 text-gray-400 hover:text-white hover:bg-cs-dark transition">
                <i className="ri-youtube-line"></i>
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-orbitron font-semibold text-white mb-4">Navegação</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/" className="text-gray-400 hover:text-cs-neon transition">Início</Link></li>
              <li><Link href="/teams" className="text-gray-400 hover:text-cs-neon transition">Equipas</Link></li>
              <li><Link href="/matchmaking" className="text-gray-400 hover:text-cs-neon transition">Matchmaking</Link></li>
              <li><Link href="/matches" className="text-gray-400 hover:text-cs-neon transition">Jogos & Resultados</Link></li>
              <li><Link href="/tournaments" className="text-gray-400 hover:text-cs-neon transition">Competições</Link></li>
              <li><Link href="/news" className="text-gray-400 hover:text-cs-neon transition">Notícias</Link></li>
              <li><Link href="/streamers" className="text-gray-400 hover:text-cs-neon transition">Streamers & Casters</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-orbitron font-semibold text-white mb-4">Recursos</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-gray-400 hover:text-cs-neon transition">Como Participar</a></li>
              <li><a href="#" className="text-gray-400 hover:text-cs-neon transition">Regras das Competições</a></li>
              <li><a href="#" className="text-gray-400 hover:text-cs-neon transition">Criar uma Equipa</a></li>
              <li><a href="#" className="text-gray-400 hover:text-cs-neon transition">Código de Conduta</a></li>
              <li><a href="#" className="text-gray-400 hover:text-cs-neon transition">FAQ</a></li>
              <li><a href="#" className="text-gray-400 hover:text-cs-neon transition">Suporte</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-orbitron font-semibold text-white mb-4">Newsletter</h3>
            <p className="text-gray-400 text-sm mb-4">Subscreva para receber as últimas notícias e atualizações sobre torneios.</p>
            <form className="mb-4">
              <div className="flex">
                <input type="email" placeholder="O seu email" className="px-4 py-2 bg-cs-dark-700 border border-cs-dark-600 rounded-l text-sm focus:outline-none focus:border-cs-neon/50 text-gray-300 w-full" />
                <button type="submit" className="px-4 py-2 bg-cs-neon text-cs-dark-800 font-medium rounded-r hover:bg-cs-neon/80 transition">
                  <i className="ri-send-plane-line"></i>
                </button>
              </div>
            </form>
            <p className="text-xs text-gray-500">Subscrevendo, concorda com a nossa política de privacidade.</p>
          </div>
        </div>
        
        <div className="border-t border-cs-dark-600 pt-6 flex flex-col md:flex-row justify-between items-center">
          <div className="text-xs text-gray-500 mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} CSPortugues. Todos os direitos reservados.
          </div>
          <div className="flex space-x-4 text-xs text-gray-500">
            <a href="#" className="hover:text-gray-400 transition">Termos de Serviço</a>
            <a href="#" className="hover:text-gray-400 transition">Política de Privacidade</a>
            <a href="#" className="hover:text-gray-400 transition">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
