import { Link } from 'wouter';

interface TeamProps {
  id: number;
  name: string;
  founded: string;
  tier: string;
  ranking: string;
  winRate: string;
  trophies: string;
  position: string;
  background: string;
}

const TeamCard = ({ team }: { team: TeamProps }) => {
  return (
    <div className="bg-cs-dark-800 border border-cs-dark-600 rounded-md overflow-hidden hover:shadow-neon transition duration-300 group">
      <div className="relative h-32 bg-gradient-to-r from-cs-dark-700 to-cs-dark overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{background: `url('${team.background}')`, backgroundSize: 'cover', backgroundPosition: 'center'}}></div>
        <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-cs-dark-800 to-transparent"></div>
        <div className="absolute top-4 right-4 bg-cs-dark-700 px-2 py-1 rounded text-xs">
          {team.position}
        </div>
        <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="w-16 h-16 rounded-full bg-cs-dark-800 border-4 border-cs-dark-800 overflow-hidden flex items-center justify-center">
            <span className="font-orbitron font-bold text-lg">{team.name.substring(0, 3)}</span>
          </div>
        </div>
      </div>
      <div className="p-4 pt-10 text-center">
        <h3 className="font-orbitron font-bold text-lg text-white mb-1 group-hover:text-cs-neon transition">{team.name}</h3>
        <p className="text-gray-400 text-xs mb-3">Fundada em {team.founded}</p>
        <div className="flex justify-center mb-4">
          <div className="px-2 py-1 bg-cs-dark-700 rounded text-xs">{team.tier}</div>
        </div>
        <div className="grid grid-cols-3 gap-2 text-xs">
          <div className="flex flex-col">
            <span className="text-gray-400">Ranking</span>
            <span className="text-white font-medium">{team.ranking}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-gray-400">Vitórias</span>
            <span className="text-white font-medium">{team.winRate}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-gray-400">Troféus</span>
            <span className="text-white font-medium">{team.trophies}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamCard;
