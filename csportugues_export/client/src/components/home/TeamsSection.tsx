import { Link } from 'wouter';
import TeamCard from '../ui/TeamCard';

const TeamsSection = () => {
  // Exemplos de equipas
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
    }
  ];

  return (
    <section className="py-12 bg-cs-dark relative">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="font-orbitron text-2xl font-bold text-white">
            Top Equipas Portuguesas
          </h2>
          <Link href="/teams" className="text-cs-neon text-sm font-medium hover:underline flex items-center">
            Ver todas as equipas
            <i className="ri-arrow-right-line ml-1"></i>
          </Link>
        </div>
        
        {/* Teams Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {teams.map(team => (
            <TeamCard key={team.id} team={team} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamsSection;
