import { Link } from 'wouter';

interface TournamentGroup {
  name: string;
  matches: string;
  leader: string;
}

interface TournamentInfo {
  icon: string;
  text: string;
}

interface TournamentProps {
  id: number;
  name: string;
  season: string;
  status: string;
  logo: string;
  teams: number;
  prize: string;
  dates: string;
  format: string;
  currentPhase?: string;
  groups?: TournamentGroup[];
  description?: string;
  info?: TournamentInfo[];
}

const TournamentCard = ({ tournament }: { tournament: TournamentProps }) => {
  const isRegistrationOpen = tournament.status.includes('Inscrições');

  return (
    <div className="bg-cs-dark-700 border border-cs-dark-600 rounded-md overflow-hidden hover:border-cs-neon/40 transition duration-300 group">
      <div className="p-5">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded bg-cs-dark-600 flex items-center justify-center overflow-hidden">
              {tournament.logo ? (
                <img src={tournament.logo} alt={tournament.name} className="w-10 h-10 object-contain" />
              ) : (
                <span className="font-orbitron text-sm">{tournament.name.substring(0, 3)}</span>
              )}
            </div>
            <div>
              <h3 className="font-orbitron font-bold text-white text-lg group-hover:text-cs-neon transition">{tournament.name}</h3>
              <div className="flex items-center space-x-2 text-xs text-gray-400">
                <span>{tournament.season}</span>
                <span>•</span>
                <span className={isRegistrationOpen ? 'text-cs-yellow' : 'text-cs-neon'}>{tournament.status}</span>
              </div>
            </div>
          </div>
          <div className="px-2 py-1 bg-cs-dark rounded-full text-xs">
            <span>{tournament.teams} Equipas</span>
          </div>
        </div>
        
        <div className="flex items-center space-x-6 mb-4 text-sm">
          <div className="flex items-center space-x-2">
            <i className="ri-trophy-line text-cs-yellow"></i>
            <span>{tournament.prize}</span>
          </div>
          <div className="flex items-center space-x-2">
            <i className="ri-calendar-line text-gray-400"></i>
            <span>{tournament.dates}</span>
          </div>
          <div className="flex items-center space-x-2">
            <i className="ri-group-line text-gray-400"></i>
            <span>{tournament.format}</span>
          </div>
        </div>
        
        <div className="bg-cs-dark rounded-md p-3 mb-4">
          {tournament.currentPhase ? (
            <>
              <h4 className="font-medium text-sm mb-2">Fase Atual: {tournament.currentPhase}</h4>
              {tournament.groups && (
                <div className="grid grid-cols-2 gap-3">
                  {tournament.groups.map((group, index) => (
                    <div key={index} className="bg-cs-dark-700 rounded p-2 text-xs">
                      <div className="flex justify-between items-center mb-1">
                        <span>{group.name}</span>
                        <span className="text-gray-400">Jogos: {group.matches}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="w-2 h-2 rounded-full bg-cs-neon"></span>
                        <span className="text-white">{group.leader}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          ) : (
            <>
              <h4 className="font-medium text-sm mb-2">{tournament.description}</h4>
              {tournament.info && (
                <div className="grid grid-cols-2 gap-3">
                  {tournament.info.map((info, index) => (
                    <div key={index} className="bg-cs-dark-700 rounded p-2 text-xs">
                      <div className="flex items-center space-x-2">
                        <i className={info.icon + " text-cs-yellow"}></i>
                        <span>{info.text}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
        
        <Link href={`/tournaments/${tournament.id}`}>
          <button className={`w-full py-2 ${isRegistrationOpen ? 'bg-gradient-to-r from-cs-neon/80 to-cs-neon/30 text-cs-dark-800 font-orbitron font-semibold' : 'bg-gradient-to-r from-cs-blue/80 to-cs-blue/30 text-white'} text-sm rounded hover:${isRegistrationOpen ? 'from-cs-neon hover:to-cs-neon/50' : 'from-cs-blue hover:to-cs-blue/50'} transition flex items-center justify-center`}>
            <i className={`${isRegistrationOpen ? 'ri-user-add-line' : 'ri-eye-line'} mr-2`}></i>
            <span>{isRegistrationOpen ? 'Inscrever Equipa' : 'Ver Detalhes'}</span>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default TournamentCard;
