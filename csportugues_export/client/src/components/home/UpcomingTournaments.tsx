import { Link } from 'wouter';
import TournamentCard from '../ui/TournamentCard';

const UpcomingTournaments = () => {
  // Exemplos de torneios
  const tournaments = [
    {
      id: 1,
      name: 'Liga Portuguesa CS2',
      season: 'Season 4',
      status: 'A decorrer',
      logo: '',
      teams: 16,
      prize: '€10,000',
      dates: 'Mar 25 - Abr 30',
      format: '5v5',
      currentPhase: 'Grupos',
      groups: [
        { name: 'Grupo A', matches: '6/12', leader: 'SAW (3-0)' },
        { name: 'Grupo B', matches: '5/12', leader: 'FTW (2-0)' }
      ]
    },
    {
      id: 2,
      name: 'OMEN University Cup',
      season: '2024',
      status: 'Inscrições abertas',
      logo: '',
      teams: 8,
      prize: '€5,000',
      dates: 'Abr 10 - Abr 15',
      format: '5v5',
      description: 'Torneio exclusivo para estudantes universitários portugueses em formato de eliminação direta.',
      info: [
        { icon: 'ri-timer-line', text: 'Inscrições encerram em 5 dias' },
        { icon: 'ri-group-line', text: '3/8 equipas registadas' }
      ]
    }
  ];

  return (
    <section className="py-12 bg-cs-dark-800 relative">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="font-orbitron text-2xl font-bold text-white">
            Competições a Decorrer
          </h2>
          <Link href="/tournaments" className="text-cs-neon text-sm font-medium hover:underline flex items-center">
            Ver todas
            <i className="ri-arrow-right-line ml-1"></i>
          </Link>
        </div>
        
        {/* Tournaments */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {tournaments.map(tournament => (
            <TournamentCard key={tournament.id} tournament={tournament} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default UpcomingTournaments;
