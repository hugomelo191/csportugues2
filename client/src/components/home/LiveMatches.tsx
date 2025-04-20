import { Link } from 'wouter';
import MatchCard from '../ui/MatchCard';

const LiveMatches = () => {
  // Exemplos de partidas ao vivo
  const liveMatches = [
    {
      id: 1,
      competition: {
        name: 'Liga Portuguesa',
        type: 'league',
      },
      viewers: '12.4K',
      teamA: {
        name: 'FTW',
        logo: 'FTW',
        score: 13
      },
      teamB: {
        name: 'SAW',
        logo: 'SAW',
        score: 13
      },
      map: 'Inferno',
      status: '1º OT',
      series: 'Mapa 2/3',
      streamPlatform: 'twitch'
    },
    {
      id: 2,
      competition: {
        name: 'Torneio OMEN',
        type: 'tournament',
      },
      viewers: '3.2K',
      teamA: {
        name: 'Offset',
        logo: 'Offset',
        score: 9
      },
      teamB: {
        name: 'EGN',
        logo: 'EGN',
        score: 7
      },
      map: 'Mirage',
      status: 'CT-Side',
      series: 'Mapa 1/3',
      streamPlatform: 'youtube'
    },
    {
      id: 3,
      competition: {
        name: 'Qualifier EU',
        type: 'qualifier',
      },
      viewers: '5.7K',
      teamA: {
        name: 'PARIMATCH',
        logo: 'PARIMATCH',
        score: 11
      },
      teamB: {
        name: 'GTZ',
        logo: 'GTZ',
        score: 14
      },
      map: 'Nuke',
      status: 'T-Side',
      series: 'Mapa 3/3',
      streamPlatform: 'twitch'
    },
    {
      id: 4,
      competition: {
        name: 'Amistoso',
        type: 'friendly',
      },
      viewers: '809',
      teamA: {
        name: 'Karma',
        logo: 'Karma',
        score: 6
      },
      teamB: {
        name: 'Nexus',
        logo: 'Nexus',
        score: 4
      },
      map: 'Vertigo',
      status: 'CT-Side',
      series: 'Mapa 1/1',
      streamPlatform: 'twitch'
    }
  ];

  return (
    <section className="py-12 bg-cs-dark-800 relative">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center space-x-3">
            <h2 className="font-orbitron text-2xl font-bold text-white">
              <i className="ri-live-line text-cs-red mr-2"></i>
              Jogos ao Vivo
            </h2>
            <div className="px-2 py-1 bg-cs-dark-700 rounded-full flex items-center">
              <span className="w-2 h-2 rounded-full bg-cs-red animate-pulse inline-block mr-1"></span>
              <span className="text-xs text-gray-300">{liveMatches.length} Partidas</span>
            </div>
          </div>
          <Link href="/matches" className="text-cs-neon text-sm font-medium hover:underline flex items-center">
            Ver todos
            <i className="ri-arrow-right-line ml-1"></i>
          </Link>
        </div>
        
        {/* Live Matches Slider */}
        <div className="overflow-x-auto hide-scrollbar pb-4">
          <div className="flex space-x-4 min-w-max">
            {liveMatches.map(match => (
              <MatchCard key={match.id} match={match} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LiveMatches;
