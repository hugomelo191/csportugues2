import { useState } from 'react';
import { useAuth } from '@/hooks/use-auth';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

interface Player {
  id: number;
  username: string;
  position: string;
  level: string;
  experience: string;
  disponibility: string;
  languages: string[];
  skills: {
    name: string;
    value: number;
  }[];
  contact: string;
}

interface Team {
  id: number;
  name: string;
  logo: string;
  level: string;
  region: string;
  positions: string[];
  requirements: string[];
  description: string;
  contact: string;
}

const MatchmakingPage = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [regionFilter, setRegionFilter] = useState('Todas');
  const [levelFilter, setLevelFilter] = useState('Todos');

  // Exemplos de jogadores
  const players: Player[] = [
    {
      id: 1,
      username: "sniper_master",
      position: "AWPer",
      level: "Experiente",
      experience: "3 anos",
      disponibility: "Noites e fins de semana",
      languages: ["Português", "Inglês"],
      skills: [
        { name: "Precisão", value: 85 },
        { name: "Comunicação", value: 70 },
        { name: "Estratégia", value: 75 }
      ],
      contact: "discord: sniper_master#1234"
    },
    {
      id: 2,
      username: "entry_fragger92",
      position: "Entry Fragger",
      level: "Semi-Pro",
      experience: "5 anos",
      disponibility: "Tempo integral",
      languages: ["Português", "Espanhol", "Inglês"],
      skills: [
        { name: "Precisão", value: 80 },
        { name: "Comunicação", value: 85 },
        { name: "Estratégia", value: 75 }
      ],
      contact: "discord: entry_fragger92#5678"
    },
    {
      id: 3,
      username: "support_king",
      position: "Support",
      level: "Amador",
      experience: "1 ano",
      disponibility: "Fins de semana",
      languages: ["Português"],
      skills: [
        { name: "Precisão", value: 65 },
        { name: "Comunicação", value: 90 },
        { name: "Estratégia", value: 80 }
      ],
      contact: "discord: support_king#9012"
    },
    {
      id: 4,
      username: "igl_leader",
      position: "IGL",
      level: "Experiente",
      experience: "4 anos",
      disponibility: "Noites",
      languages: ["Português", "Inglês"],
      skills: [
        { name: "Precisão", value: 70 },
        { name: "Comunicação", value: 95 },
        { name: "Estratégia", value: 90 }
      ],
      contact: "discord: igl_leader#3456"
    }
  ];

  // Exemplos de equipes
  const teams: Team[] = [
    {
      id: 1,
      name: "Phoenix Esports",
      logo: "PHX",
      level: "Semi-Pro",
      region: "Porto",
      positions: ["AWPer", "Rifler"],
      requirements: ["Nível 8+ Faceit", "Experiência em torneios", "18+ anos"],
      description: "Equipe estabelecida buscando jogadores dedicados para competir em torneios nacionais e internacionais.",
      contact: "manager@phoenix.pt"
    },
    {
      id: 2,
      name: "Voltage Gaming",
      logo: "VLT",
      level: "Amador",
      region: "Lisboa",
      positions: ["Entry Fragger", "Support"],
      requirements: ["Nível 5+ Faceit", "Disponibilidade noturna", "Boa comunicação"],
      description: "Equipe em crescimento procurando completar o roster para participar em competições amadoras.",
      contact: "voltage.team@gmail.com"
    },
    {
      id: 3,
      name: "Shadow Wolves",
      logo: "SLW",
      level: "Iniciante",
      region: "Coimbra",
      positions: ["IGL", "AWPer", "Lurker"],
      requirements: ["Compromisso", "Vontade de melhorar", "Boa atitude"],
      description: "Nova equipe buscando jogadores para crescer juntos no cenário competitivo.",
      contact: "discord: shadowwolves"
    },
    {
      id: 4,
      name: "Elite Tactics",
      logo: "ETX",
      level: "Semi-Pro",
      region: "Braga",
      positions: ["Rifler", "Support"],
      requirements: ["Nível 7+ Faceit", "3+ anos de experiência", "Falar inglês fluente"],
      description: "Equipe competitiva com ambições internacionais procurando jogadores experientes.",
      contact: "contato@elitetactics.com"
    }
  ];

  // Filtrar jogadores
  const filteredPlayers = players.filter(player => 
    player.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    player.position.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Filtrar equipes
  const filteredTeams = teams.filter(team => {
    const matchesSearch = team.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         team.positions.some(pos => pos.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesRegion = regionFilter === 'Todas' || team.region === regionFilter;
    const matchesLevel = levelFilter === 'Todos' || team.level === levelFilter;
    
    return matchesSearch && matchesRegion && matchesLevel;
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow py-8 bg-cs-dark">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <h1 className="font-orbitron text-3xl font-bold text-white mb-2">Matchmaking</h1>
              <p className="text-gray-400">Encontre jogadores para a sua equipe ou junte-se a uma equipe existente.</p>
            </div>
            {user ? (
              <div className="flex space-x-4">
                <Button className="bg-cs-neon text-cs-dark-800 hover:bg-cs-neon/80">
                  <i className="ri-user-add-line mr-2"></i>
                  Criar Perfil de Jogador
                </Button>
                <Button className="bg-cs-blue text-white hover:bg-cs-blue/80">
                  <i className="ri-team-line mr-2"></i>
                  Procurar Jogadores
                </Button>
              </div>
            ) : (
              <Button className="bg-cs-neon text-cs-dark-800 hover:bg-cs-neon/80" onClick={() => window.location.href = '/auth'}>
                <i className="ri-login-box-line mr-2"></i>
                Login para Participar
              </Button>
            )}
          </div>
          
          <Tabs defaultValue="players" className="w-full">
            <TabsList className="grid grid-cols-2 mb-8">
              <TabsTrigger value="players" className="font-orbitron">
                <i className="ri-user-search-line mr-2"></i>
                Jogadores Disponíveis
              </TabsTrigger>
              <TabsTrigger value="teams" className="font-orbitron">
                <i className="ri-team-line mr-2"></i>
                Equipes Recrutando
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="players">
              <div className="bg-cs-dark-800 p-4 rounded-lg mb-6 flex flex-col md:flex-row gap-4">
                <div className="flex-grow">
                  <div className="relative">
                    <Input 
                      placeholder="Procurar por nome de jogador ou posição..." 
                      className="bg-cs-dark-700 border-cs-dark-600 pl-10"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <i className="ri-search-line absolute left-3 top-2.5 text-gray-400"></i>
                  </div>
                </div>
              </div>
              
              {filteredPlayers.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredPlayers.map(player => (
                    <Card key={player.id} className="bg-cs-dark-700 border-cs-dark-600 hover:border-cs-neon/50 transition duration-300">
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <div className="flex items-center space-x-3">
                            <div className="w-12 h-12 rounded-full bg-cs-dark-600 flex items-center justify-center font-orbitron text-sm">
                              {player.username.substring(0, 2).toUpperCase()}
                            </div>
                            <div>
                              <CardTitle className="text-white text-lg">{player.username}</CardTitle>
                              <div className="flex items-center text-sm">
                                <Badge variant="outline" className="bg-cs-dark-800 text-cs-neon border-cs-neon/30 mr-2">
                                  {player.position}
                                </Badge>
                                <span className="text-gray-400">{player.level}</span>
                              </div>
                            </div>
                          </div>
                          <Badge variant="outline" className="bg-cs-dark-800 border-cs-dark-600">
                            {player.experience}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="pb-2">
                        <div className="space-y-3">
                          <div>
                            <div className="text-xs text-gray-400 mb-1">Disponibilidade</div>
                            <div className="text-sm">{player.disponibility}</div>
                          </div>
                          
                          <div>
                            <div className="text-xs text-gray-400 mb-1">Idiomas</div>
                            <div className="flex flex-wrap gap-1">
                              {player.languages.map((lang, index) => (
                                <Badge key={index} variant="secondary" className="bg-cs-dark-800">
                                  {lang}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          
                          <div>
                            <div className="text-xs text-gray-400 mb-1">Habilidades</div>
                            <div className="space-y-1">
                              {player.skills.map((skill, index) => (
                                <div key={index} className="flex items-center">
                                  <span className="text-xs w-24">{skill.name}</span>
                                  <div className="w-full bg-cs-dark-800 h-2 rounded-full">
                                    <div
                                      className="bg-gradient-to-r from-cs-neon to-cs-blue h-full rounded-full"
                                      style={{ width: `${skill.value}%` }}
                                    ></div>
                                  </div>
                                  <span className="text-xs ml-2">{skill.value}%</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                      <Separator className="bg-cs-dark-600" />
                      <CardFooter className="pt-3 flex justify-between">
                        <div className="text-xs text-gray-400">{player.contact}</div>
                        {user ? (
                          <Button size="sm" className="bg-cs-blue text-white hover:bg-cs-blue/80">
                            <i className="ri-message-2-line mr-1"></i> Contactar
                          </Button>
                        ) : (
                          <Button size="sm" disabled className="opacity-50">
                            <i className="ri-lock-line mr-1"></i> Login Necessário
                          </Button>
                        )}
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <i className="ri-search-line text-4xl text-gray-500 mb-2"></i>
                  <p className="text-gray-400">Nenhum jogador encontrado com esse termo de pesquisa.</p>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="teams">
              <div className="bg-cs-dark-800 p-4 rounded-lg mb-6 flex flex-col md:flex-row gap-4">
                <div className="flex-grow">
                  <div className="relative">
                    <Input 
                      placeholder="Procurar por nome de equipe ou posição..." 
                      className="bg-cs-dark-700 border-cs-dark-600 pl-10"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <i className="ri-search-line absolute left-3 top-2.5 text-gray-400"></i>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-32">
                    <select 
                      className="w-full px-3 py-2 bg-cs-dark-700 border border-cs-dark-600 rounded text-sm"
                      value={regionFilter}
                      onChange={(e) => setRegionFilter(e.target.value)}
                    >
                      <option value="Todas">Todas Regiões</option>
                      <option value="Lisboa">Lisboa</option>
                      <option value="Porto">Porto</option>
                      <option value="Braga">Braga</option>
                      <option value="Coimbra">Coimbra</option>
                    </select>
                  </div>
                  <div className="w-32">
                    <select 
                      className="w-full px-3 py-2 bg-cs-dark-700 border border-cs-dark-600 rounded text-sm"
                      value={levelFilter}
                      onChange={(e) => setLevelFilter(e.target.value)}
                    >
                      <option value="Todos">Todos Níveis</option>
                      <option value="Iniciante">Iniciante</option>
                      <option value="Amador">Amador</option>
                      <option value="Experiente">Experiente</option>
                      <option value="Semi-Pro">Semi-Pro</option>
                    </select>
                  </div>
                </div>
              </div>
              
              {filteredTeams.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredTeams.map(team => (
                    <Card key={team.id} className="bg-cs-dark-700 border-cs-dark-600 hover:border-cs-neon/50 transition duration-300">
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <div className="flex items-center space-x-3">
                            <div className="w-12 h-12 rounded bg-cs-dark-600 flex items-center justify-center font-orbitron font-bold text-sm">
                              {team.logo}
                            </div>
                            <div>
                              <CardTitle className="text-white text-lg">{team.name}</CardTitle>
                              <div className="flex items-center text-sm">
                                <Badge variant="outline" className="bg-cs-dark-800 text-cs-blue border-cs-blue/30 mr-2">
                                  {team.level}
                                </Badge>
                                <span className="text-gray-400">{team.region}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="pb-2">
                        <div className="space-y-3">
                          <div>
                            <div className="text-xs text-gray-400 mb-1">Posições Procuradas</div>
                            <div className="flex flex-wrap gap-1">
                              {team.positions.map((position, index) => (
                                <Badge key={index} className="bg-cs-red/80 text-white">
                                  {position}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          
                          <div>
                            <div className="text-xs text-gray-400 mb-1">Requisitos</div>
                            <ul className="list-disc list-inside text-sm">
                              {team.requirements.map((req, index) => (
                                <li key={index}>{req}</li>
                              ))}
                            </ul>
                          </div>
                          
                          <div>
                            <div className="text-xs text-gray-400 mb-1">Sobre a Equipe</div>
                            <p className="text-sm">{team.description}</p>
                          </div>
                        </div>
                      </CardContent>
                      <Separator className="bg-cs-dark-600" />
                      <CardFooter className="pt-3 flex justify-between">
                        <div className="text-xs text-gray-400">{team.contact}</div>
                        {user ? (
                          <Button size="sm" className="bg-cs-red text-white hover:bg-cs-red/80">
                            <i className="ri-user-add-line mr-1"></i> Candidatar-se
                          </Button>
                        ) : (
                          <Button size="sm" disabled className="opacity-50">
                            <i className="ri-lock-line mr-1"></i> Login Necessário
                          </Button>
                        )}
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <i className="ri-search-line text-4xl text-gray-500 mb-2"></i>
                  <p className="text-gray-400">Nenhuma equipe encontrada com esses filtros.</p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default MatchmakingPage;
