import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import TeamCard from '@/components/ui/TeamCard';
import { Button } from '@/components/ui/button';

const TeamsPage = () => {
  // Lista de equipas (exemplo)
  const teams = [
    {
      id: 1,
      name: 'SAW',
      founded: '2019',
      tier: 'Tier 1',
      ranking: '#24 WORLD',
      winRate: '76%',
      trophies: '12',
      position: '#1 PT',
      background: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 2,
      name: 'FTW Esports',
      founded: '2017',
      tier: 'Tier 1',
      ranking: '#38 WORLD',
      winRate: '68%',
      trophies: '9',
      position: '#2 PT',
      background: 'https://images.unsplash.com/photo-1627856013091-fed6e4e30025?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 3,
      name: 'OFFSET Esports',
      founded: '2020',
      tier: 'Tier 2',
      ranking: '#72 WORLD',
      winRate: '62%',
      trophies: '5',
      position: '#3 PT',
      background: 'https://images.unsplash.com/photo-1448375240586-882707db888b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 4,
      name: 'Nexus Gaming',
      founded: '2021',
      tier: 'Tier 2',
      ranking: '#86 WORLD',
      winRate: '58%',
      trophies: '3',
      position: '#4 PT',
      background: 'https://images.unsplash.com/photo-1560253023-26ef6b2e7129?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 5,
      name: 'Karma Esports',
      founded: '2022',
      tier: 'Tier 2',
      ranking: '#112 WORLD',
      winRate: '52%',
      trophies: '2',
      position: '#5 PT',
      background: 'https://images.unsplash.com/photo-1560253023-26ef6b2e7129?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 6,
      name: 'EGN Esports',
      founded: '2020',
      tier: 'Tier 3',
      ranking: '#147 WORLD',
      winRate: '48%',
      trophies: '1',
      position: '#6 PT',
      background: 'https://images.unsplash.com/photo-1560253023-26ef6b2e7129?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 7,
      name: 'GTZ Bulls',
      founded: '2021',
      tier: 'Tier 3',
      ranking: '#196 WORLD',
      winRate: '45%',
      trophies: '1',
      position: '#7 PT',
      background: 'https://images.unsplash.com/photo-1560253023-26ef6b2e7129?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 8,
      name: 'Arctic Gaming',
      founded: '2022',
      tier: 'Tier 3',
      ranking: '#245 WORLD',
      winRate: '41%',
      trophies: '0',
      position: '#8 PT',
      background: 'https://images.unsplash.com/photo-1560253023-26ef6b2e7129?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow py-8 bg-cs-dark">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <h1 className="font-orbitron text-3xl font-bold text-white mb-2">Equipas Portuguesas de CS2</h1>
              <p className="text-gray-400">Descubra todas as equipas da cena competitiva portuguesa de Counter-Strike 2.</p>
            </div>
            <div className="flex space-x-4">
              <Button className="bg-cs-dark-700 hover:bg-cs-dark-600 border border-cs-dark-600">
                <i className="ri-filter-3-line mr-2"></i>
                Filtrar
              </Button>
              <Button className="bg-gradient-to-r from-cs-neon to-cs-neon/70 text-cs-dark-800 font-orbitron font-semibold hover:shadow-neon transition-shadow duration-300">
                <i className="ri-add-line mr-2"></i>
                Criar Equipa
              </Button>
            </div>
          </div>
          
          {/* Grid de Equipas */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {teams.map(team => (
              <TeamCard key={team.id} team={team} />
            ))}
          </div>
          
          {/* Paginação */}
          <div className="flex justify-center mt-10">
            <div className="flex space-x-2">
              <Button disabled variant="outline" className="w-10 h-10 p-0 border-cs-dark-600">
                <i className="ri-arrow-left-s-line"></i>
              </Button>
              <Button variant="outline" className="w-10 h-10 p-0 border-cs-dark-600 bg-cs-dark-700">1</Button>
              <Button variant="outline" className="w-10 h-10 p-0 border-cs-dark-600">2</Button>
              <Button variant="outline" className="w-10 h-10 p-0 border-cs-dark-600">3</Button>
              <Button variant="outline" className="w-10 h-10 p-0 border-cs-dark-600">
                <i className="ri-arrow-right-s-line"></i>
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TeamsPage;
