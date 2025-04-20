import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import TournamentCard from '@/components/ui/TournamentCard';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const TournamentsPage = () => {
  // Exemplos de torneios ativos
  const activeTournaments = [
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
    },
    {
      id: 3,
      name: 'BLAST Premier Qualifiers',
      season: 'Spring 2024',
      status: 'A decorrer',
      logo: '',
      teams: 12,
      prize: '€50,000 + Spot',
      dates: 'Mar 15 - Abr 5',
      format: '5v5',
      currentPhase: 'Eliminação Dupla',
      groups: [
        { name: 'Upper Bracket', matches: '4/8', leader: 'G2 (2-0)' },
        { name: 'Lower Bracket', matches: '2/6', leader: 'NA (1-0)' }
      ]
    }
  ];

  // Exemplos de torneios futuros
  const upcomingTournaments = [
    {
      id: 4,
      name: 'FTW Arena Cup',
      season: 'Summer 2024',
      status: 'Inscrições abertas',
      logo: '',
      teams: 32,
      prize: '€3,000',
      dates: 'Jun 1 - Jun 30',
      format: '5v5',
      description: 'Torneio aberto para todas as equipas portuguesas e espanholas.',
      info: [
        { icon: 'ri-timer-line', text: 'Inscrições encerram em 30 dias' },
        { icon: 'ri-group-line', text: '8/32 equipas registadas' }
      ]
    },
    {
      id: 5,
      name: 'ESL Portugal',
      season: 'Season 2',
      status: 'Inscrições em breve',
      logo: '',
      teams: 16,
      prize: '€15,000',
      dates: 'Jul 10 - Ago 20',
      format: '5v5',
      description: 'Segunda temporada do circuito nacional oficial da ESL.',
      info: [
        { icon: 'ri-timer-line', text: 'Inscrições abrem em 25 dias' },
        { icon: 'ri-award-line', text: 'Vaga para ESL Pro League' }
      ]
    }
  ];

  // Exemplos de torneios passados
  const pastTournaments = [
    {
      id: 6,
      name: 'Liga Portuguesa CS2',
      season: 'Season 3',
      status: 'Concluído',
      logo: '',
      teams: 16,
      prize: '€8,000',
      dates: 'Nov 10 - Dez 20, 2023',
      format: '5v5',
      description: 'Campeão: SAW. Vice-campeão: FTW Esports.',
      info: [
        { icon: 'ri-user-star-line', text: 'MVP: foxz (SAW)' },
        { icon: 'ri-eye-line', text: '22K espectadores (pico)' }
      ]
    },
    {
      id: 7,
      name: 'MEO Cup',
      season: '2023',
      status: 'Concluído',
      logo: '',
      teams: 8,
      prize: '€6,000',
      dates: 'Set 5 - Set 15, 2023',
      format: '5v5',
      description: 'Campeão: FTW Esports. Vice-campeão: Offset.',
      info: [
        { icon: 'ri-user-star-line', text: 'MVP: rMz (FTW)' },
        { icon: 'ri-eye-line', text: '18K espectadores (pico)' }
      ]
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow py-8 bg-cs-dark">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <h1 className="font-orbitron text-3xl font-bold text-white mb-2">Competições</h1>
              <p className="text-gray-400">Torneios e ligas de Counter-Strike 2 em Portugal e participações internacionais.</p>
            </div>
            <Button className="bg-gradient-to-r from-cs-neon to-cs-neon/70 text-cs-dark-800 font-orbitron font-semibold hover:shadow-neon transition-shadow duration-300">
              <i className="ri-trophy-line mr-2"></i>
              Organizar Torneio
            </Button>
          </div>
          
          <Tabs defaultValue="active" className="w-full">
            <TabsList className="grid grid-cols-3 mb-8">
              <TabsTrigger value="active" className="font-orbitron">
                <i className="ri-trophy-fill text-cs-yellow mr-2"></i>
                A Decorrer
              </TabsTrigger>
              <TabsTrigger value="upcoming" className="font-orbitron">
                <i className="ri-calendar-event-line text-cs-blue mr-2"></i>
                Próximos
              </TabsTrigger>
              <TabsTrigger value="past" className="font-orbitron">
                <i className="ri-history-line text-gray-400 mr-2"></i>
                Anteriores
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="active">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {activeTournaments.map(tournament => (
                  <TournamentCard key={tournament.id} tournament={tournament} />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="upcoming">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {upcomingTournaments.map(tournament => (
                  <TournamentCard key={tournament.id} tournament={tournament} />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="past">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {pastTournaments.map(tournament => (
                  <TournamentCard key={tournament.id} tournament={tournament} />
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

export default TournamentsPage;
