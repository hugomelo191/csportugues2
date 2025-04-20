import React from 'react';
import { Link } from 'wouter';

interface MatchTeam {
  name: string;
  logo: string;
  score: number;
}

interface MatchCompetition {
  name: string;
  type: 'league' | 'tournament' | 'qualifier' | 'friendly';
}

interface MatchProps {
  id: number;
  competition: MatchCompetition;
  viewers: string;
  teamA: MatchTeam;
  teamB: MatchTeam;
  map: string;
  status: string;
  series: string;
  streamPlatform: 'twitch' | 'youtube';
}

const MatchCard = ({ match }: { match: MatchProps }) => {
  const getCompetitionBg = (type: string) => {
    switch (type) {
      case 'league':
        return 'bg-cs-red';
      case 'tournament':
        return 'bg-cs-blue';
      case 'qualifier':
        return 'bg-cs-yellow';
      default:
        return 'bg-cs-dark-600';
    }
  };

  const getStreamIcon = (platform: string) => {
    switch (platform) {
      case 'twitch':
        return <i className="ri-twitch-line text-purple-500"></i>;
      case 'youtube':
        return <i className="ri-youtube-line text-red-500"></i>;
      default:
        return <i className="ri-live-line"></i>;
    }
  };

  return (
    <div className="w-80 bg-cs-dark-700 border border-cs-dark-600 rounded-md overflow-hidden hover:border-cs-red/40 transition duration-300">
      <div className="p-4">
        <div className="flex justify-between items-center mb-3">
          <span className={`text-xs ${getCompetitionBg(match.competition.type)} px-2 py-1 rounded ${match.competition.type === 'qualifier' ? 'text-cs-dark-800' : 'text-white'} font-medium`}>
            {match.competition.name}
          </span>
          <div className="flex items-center space-x-1">
            <i className="ri-eye-line text-xs text-gray-400"></i>
            <span className="text-xs text-gray-400">{match.viewers}</span>
          </div>
        </div>
        
        <div className="flex justify-between items-center mb-4">
          <div className="flex flex-col items-center text-center w-2/5">
            <div className="w-12 h-12 mb-2 rounded bg-cs-dark-600 p-1 flex items-center justify-center">
              <span className="font-orbitron text-sm">{match.teamA.logo}</span>
            </div>
            <span className="font-orbitron font-medium text-sm">{match.teamA.name}</span>
            <span className="text-cs-neon font-orbitron text-lg font-bold">{match.teamA.score}</span>
          </div>
          <div className="flex flex-col items-center w-1/5">
            <span className="text-gray-400 text-xs">vs</span>
            <span className="w-2 h-2 rounded-full bg-cs-red animate-pulse mt-2"></span>
          </div>
          <div className="flex flex-col items-center text-center w-2/5">
            <div className="w-12 h-12 mb-2 rounded bg-cs-dark-600 p-1 flex items-center justify-center">
              <span className="font-orbitron text-sm">{match.teamB.logo}</span>
            </div>
            <span className="font-orbitron font-medium text-sm">{match.teamB.name}</span>
            <span className="text-cs-neon font-orbitron text-lg font-bold">{match.teamB.score}</span>
          </div>
        </div>
        
        <div className="flex justify-between text-xs text-gray-400 mb-3">
          <span>{match.map} • {match.status}</span>
          <span>{match.series}</span>
        </div>
        
        <Link href={`/matches/${match.id}`}>
          <button className="w-full py-2 bg-cs-dark-600 hover:bg-cs-dark text-sm rounded flex items-center justify-center space-x-2">
            {getStreamIcon(match.streamPlatform)}
            <span>Ver na {match.streamPlatform === 'twitch' ? 'Twitch' : 'YouTube'}</span>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default MatchCard;
