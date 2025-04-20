import { Link } from 'wouter';
import StreamerCard from '../ui/StreamerCard';

const StreamersSection = () => {
  // Exemplos de streamers
  const streamers = [
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
      streams: '324'
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
      streams: '198'
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
      streams: '156'
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
      streams: '94'
    }
  ];

  return (
    <section className="py-12 bg-cs-dark-800 relative">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="font-orbitron text-2xl font-bold text-white">
            Streamers e Casters
          </h2>
          <Link href="/streamers" className="text-cs-neon text-sm font-medium hover:underline flex items-center">
            Ver todos
            <i className="ri-arrow-right-line ml-1"></i>
          </Link>
        </div>
        
        {/* Streamers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {streamers.map(streamer => (
            <StreamerCard key={streamer.id} streamer={streamer} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default StreamersSection;
