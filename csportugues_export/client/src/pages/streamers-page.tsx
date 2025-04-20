import { useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import StreamerCard from '@/components/ui/StreamerCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface Streamer {
  id: number;
  name: string;
  role: string;
  social: {
    twitch?: string;
    youtube?: string;
    twitter?: string;
    instagram?: string;
  };
  followers: string;
  streams: string;
  type: 'streamer' | 'caster' | 'both';
}

const StreamersPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Exemplos de streamers e casters
  const streamersData: Streamer[] = [
    {
      id: 1,
      name: 'RicFazeres',
      role: 'Caster & Streamer',
      social: {
        twitch: '#',
        youtube: '#',
        twitter: '#',
        instagram: '#',
      },
      followers: '267K',
      streams: '324',
      type: 'both'
    },
    {
      id: 2,
      name: 'ImpetuozeCS',
      role: 'Streamer & Pro Player',
      social: {
        twitch: '#',
        twitter: '#',
        instagram: '#',
      },
      followers: '112K',
      streams: '198',
      type: 'streamer'
    },
    {
      id: 3,
      name: 'FoxCSGO',
      role: 'Caster & Analista',
      social: {
        twitch: '#',
        youtube: '#',
        twitter: '#',
      },
      followers: '87K',
      streams: '156',
      type: 'caster'
    },
    {
      id: 4,
      name: 'NunoCS',
      role: 'Streamer & Content Creator',
      social: {
        twitch: '#',
        youtube: '#',
        instagram: '#',
      },
      followers: '53K',
      streams: '94',
      type: 'streamer'
    },
    {
      id: 5,
      name: 'MariaGAMER',
      role: 'Streamer',
      social: {
        twitch: '#',
        instagram: '#',
      },
      followers: '42K',
      streams: '87',
      type: 'streamer'
    },
    {
      id: 6,
      name: 'CSPortugalCast',
      role: 'Caster Oficial',
      social: {
        twitch: '#',
        youtube: '#',
        twitter: '#',
      },
      followers: '38K',
      streams: '126',
      type: 'caster'
    },
    {
      id: 7,
      name: 'TugaStreamers',
      role: 'Grupo de Streamers',
      social: {
        twitch: '#',
        youtube: '#',
        twitter: '#',
        instagram: '#',
      },
      followers: '35K',
      streams: '210',
      type: 'streamer'
    },
    {
      id: 8,
      name: 'RubenAnalyst',
      role: 'Analista & Caster',
      social: {
        twitch: '#',
        youtube: '#',
        twitter: '#',
      },
      followers: '29K',
      streams: '164',
      type: 'caster'
    }
  ];

  // Filtrar streamers por pesquisa e tipo
  const filterStreamers = (type: string) => {
    return streamersData
      .filter(streamer => 
        (type === 'all' || 
         (type === 'streamers' && (streamer.type === 'streamer' || streamer.type === 'both')) ||
         (type === 'casters' && (streamer.type === 'caster' || streamer.type === 'both')))
        && 
        streamer.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow py-8 bg-cs-dark">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <h1 className="font-orbitron text-3xl font-bold text-white mb-2">Streamers e Casters</h1>
              <p className="text-gray-400">Conheça os principais criadores de conteúdo e narradores de CS2 em Portugal.</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
              <div className="relative w-full sm:w-64">
                <Input 
                  placeholder="Pesquisar streamer..." 
                  className="bg-cs-dark-800 border-cs-dark-600 pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <i className="ri-search-line absolute left-3 top-2.5 text-gray-400"></i>
              </div>
              <Button className="bg-gradient-to-r from-purple-600 to-purple-400 hover:from-purple-700 hover:to-purple-500 text-white font-medium">
                <i className="ri-user-add-line mr-2"></i>
                Tornar-se Parceiro
              </Button>
            </div>
          </div>
          
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid grid-cols-3 mb-8">
              <TabsTrigger value="all" className="font-orbitron">
                <i className="ri-user-star-line mr-2"></i>
                Todos
              </TabsTrigger>
              <TabsTrigger value="streamers" className="font-orbitron">
                <i className="ri-live-line text-purple-500 mr-2"></i>
                Streamers
              </TabsTrigger>
              <TabsTrigger value="casters" className="font-orbitron">
                <i className="ri-mic-line text-blue-500 mr-2"></i>
                Casters
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="all">
              {filterStreamers('all').length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {filterStreamers('all').map(streamer => (
                    <StreamerCard key={streamer.id} streamer={streamer} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <i className="ri-search-line text-4xl text-gray-500 mb-2"></i>
                  <p className="text-gray-400">Nenhum streamer ou caster encontrado com esse nome.</p>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="streamers">
              {filterStreamers('streamers').length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {filterStreamers('streamers').map(streamer => (
                    <StreamerCard key={streamer.id} streamer={streamer} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <i className="ri-search-line text-4xl text-gray-500 mb-2"></i>
                  <p className="text-gray-400">Nenhum streamer encontrado com esse nome.</p>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="casters">
              {filterStreamers('casters').length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {filterStreamers('casters').map(streamer => (
                    <StreamerCard key={streamer.id} streamer={streamer} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <i className="ri-search-line text-4xl text-gray-500 mb-2"></i>
                  <p className="text-gray-400">Nenhum caster encontrado com esse nome.</p>
                </div>
              )}
            </TabsContent>
          </Tabs>
          
          {/* Formulário para se tornar parceiro (Collapsible) */}
          <div className="mt-12 border border-dashed border-cs-dark-600 rounded-lg p-6">
            <div className="text-center mb-6">
              <h2 className="font-orbitron text-xl font-semibold text-white mb-2">Quer se tornar um Streamer ou Caster parceiro?</h2>
              <p className="text-gray-400 max-w-2xl mx-auto">Se você produz conteúdo de CS2 em português e tem interesse em fazer parte da nossa plataforma, preencha o formulário abaixo.</p>
            </div>
            
            <div className="bg-cs-dark-800 border border-cs-dark-600 rounded-lg p-6 max-w-3xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Nome/Nickname</label>
                  <Input className="bg-cs-dark-700 border-cs-dark-600" placeholder="Seu nome ou nickname" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Email</label>
                  <Input className="bg-cs-dark-700 border-cs-dark-600" placeholder="Seu email de contato" type="email" />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Canal Twitch/YouTube</label>
                  <Input className="bg-cs-dark-700 border-cs-dark-600" placeholder="Link do seu canal" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Tipo de Conteúdo</label>
                  <select className="w-full px-3 py-2 bg-cs-dark-700 border border-cs-dark-600 rounded text-gray-200 focus:outline-none focus:border-cs-neon/50">
                    <option>Streamer</option>
                    <option>Caster</option>
                    <option>Ambos</option>
                  </select>
                </div>
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-300 mb-1">Conte-nos sobre você</label>
                <textarea 
                  className="w-full px-3 py-2 bg-cs-dark-700 border border-cs-dark-600 rounded text-gray-200 focus:outline-none focus:border-cs-neon/50 resize-none"
                  rows={3}
                  placeholder="Descreva sua experiência e por que deseja se juntar à nossa comunidade"
                ></textarea>
              </div>
              
              <Button className="w-full bg-gradient-to-r from-purple-600 to-purple-400 hover:from-purple-700 hover:to-purple-500 text-white font-medium">
                Enviar Solicitação
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default StreamersPage;
