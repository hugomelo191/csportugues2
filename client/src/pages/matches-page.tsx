import { useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import MatchCard from '@/components/ui/MatchCard';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const MatchesPage = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

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

  // Exemplos de partidas futuras
  const upcomingMatches = [
    {
      id: 5,
      competition: {
        name: 'Liga Portuguesa',
        type: 'league',
      },
      viewers: '-',
      teamA: {
        name: 'SAW',
        logo: 'SAW',
        score: 0
      },
      teamB: {
        name: 'Offset',
        logo: 'Offset',
        score: 0
      },
      map: 'TBD',
      status: '21 Mar - 19:00',
      series: 'BO3',
      streamPlatform: 'twitch'
    },
    {
      id: 6,
      competition: {
        name: 'University Cup',
        type: 'tournament',
      },
      viewers: '-',
      teamA: {
        name: 'ISCTE',
        logo: 'ISCTE',
        score: 0
      },
      teamB: {
        name: 'FEUP',
        logo: 'FEUP',
        score: 0
      },
      map: 'TBD',
      status: '22 Mar - 18:00',
      series: 'BO1',
      streamPlatform: 'twitch'
    },
    {
      id: 7,
      competition: {
        name: 'BLAST Premier',
        type: 'qualifier',
      },
      viewers: '-',
      teamA: {
        name: 'FTW',
        logo: 'FTW',
        score: 0
      },
      teamB: {
        name: 'BIG',
        logo: 'BIG',
        score: 0
      },
      map: 'TBD',
      status: '25 Mar - 20:00',
      series: 'BO3',
      streamPlatform: 'youtube'
    }
  ];

  // Exemplos de partidas passadas
  const pastMatches = [
    {
      id: 8,
      competition: {
        name: 'Liga Portuguesa',
        type: 'league',
      },
      viewers: '9.2K',
      teamA: {
        name: 'FTW',
        logo: 'FTW',
        score: 16
      },
      teamB: {
        name: 'Nexus',
        logo: 'Nexus',
        score: 8
      },
      map: 'Mirage',
      status: 'Terminado',
      series: 'Mapa 2/2',
      streamPlatform: 'twitch'
    },
    {
      id: 9,
      competition: {
        name: 'Liga Portuguesa',
        type: 'league',
      },
      viewers: '8.7K',
      teamA: {
        name: 'SAW',
        logo: 'SAW',
        score: 16
      },
      teamB: {
        name: 'Karma',
        logo: 'Karma',
        score: 3
      },
      map: 'Inferno',
      status: 'Terminado',
      series: 'Mapa 2/2',
      streamPlatform: 'twitch'
    },
    {
      id: 10,
      competition: {
        name: 'BLAST Premier',
        type: 'qualifier',
      },
      viewers: '15.3K',
      teamA: {
        name: 'SAW',
        logo: 'SAW',
        score: 2
      },
      teamB: {
        name: 'Complexity',
        logo: 'Complexity',
        score: 1
      },
      map: 'Vários',
      status: 'Terminado',
      series: 'BO3',
      streamPlatform: 'youtube'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow py-8 bg-cs-dark">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <h1 className="font-orbitron text-3xl font-bold text-white mb-2">Jogos e Resultados</h1>
              <p className="text-gray-400">Acompanhe todas as partidas de CS2 da comunidade portuguesa.</p>
            </div>
            <div className="flex space-x-4">
              <Button variant="outline" className="border-cs-dark-600" onClick={() => setViewMode('grid')}>
                <i className={`ri-grid-fill ${viewMode === 'grid' ? 'text-cs-neon' : 'text-gray-400'}`}></i>
              </Button>
              <Button variant="outline" className="border-cs-dark-600" onClick={() => setViewMode('list')}>
                <i className={`ri-list-check ${viewMode === 'list' ? 'text-cs-neon' : 'text-gray-400'}`}></i>
              </Button>
            </div>
          </div>
          
          <Tabs defaultValue="live" className="w-full">
            <TabsList className="grid grid-cols-3 mb-8">
              <TabsTrigger value="live" className="font-orbitron">
                <i className="ri-live-line text-cs-red mr-2"></i>
                Ao Vivo ({liveMatches.length})
              </TabsTrigger>
              <TabsTrigger value="upcoming" className="font-orbitron">
                <i className="ri-calendar-event-line text-cs-blue mr-2"></i>
                Próximos Jogos
              </TabsTrigger>
              <TabsTrigger value="past" className="font-orbitron">
                <i className="ri-history-line text-gray-400 mr-2"></i>
                Resultados
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="live">
              <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
                {liveMatches.map(match => (
                  <div key={match.id} className={viewMode === 'list' ? 'w-full' : ''}>
                    <MatchCard match={match} />
                  </div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="upcoming">
              <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
                {upcomingMatches.map(match => (
                  <div key={match.id} className={viewMode === 'list' ? 'w-full' : ''}>
                    <MatchCard match={match} />
                  </div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="past">
              <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
                {pastMatches.map(match => (
                  <div key={match.id} className={viewMode === 'list' ? 'w-full' : ''}>
                    <MatchCard match={match} />
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
          
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

export default MatchesPage;
