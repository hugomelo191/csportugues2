interface StreamerSocial {
  twitch?: string;
  youtube?: string;
  twitter?: string;
  instagram?: string;
}

interface StreamerProps {
  id: number;
  name: string;
  role: string;
  social: StreamerSocial;
  followers: string;
  streams: string;
}

const StreamerCard = ({ streamer }: { streamer: StreamerProps }) => {
  return (
    <div className="bg-cs-dark-700 border border-cs-dark-600 rounded-md overflow-hidden hover:shadow-neon hover:border-cs-neon/40 transition duration-300 group">
      <div className="relative">
        <div className="h-24 bg-gradient-to-r from-purple-900/50 to-purple-700/30"></div>
        <div className="absolute top-12 left-1/2 transform -translate-x-1/2">
          <div className="w-20 h-20 rounded-full bg-cs-dark-800 border-4 border-cs-dark-800 overflow-hidden flex items-center justify-center">
            <span className="font-orbitron text-lg">{streamer.name.substring(0, 2)}</span>
          </div>
        </div>
      </div>
      <div className="p-4 pt-12 text-center">
        <h3 className="font-orbitron font-bold text-white text-lg mb-1 group-hover:text-cs-neon transition">{streamer.name}</h3>
        <p className="text-gray-400 text-xs mb-3">{streamer.role}</p>
        <div className="flex justify-center space-x-3 mb-4">
          {streamer.social.twitch && (
            <a href={streamer.social.twitch} className="w-8 h-8 flex items-center justify-center rounded bg-cs-dark-600 text-purple-400 hover:bg-purple-700 hover:text-white transition">
              <i className="ri-twitch-line"></i>
            </a>
          )}
          {streamer.social.youtube && (
            <a href={streamer.social.youtube} className="w-8 h-8 flex items-center justify-center rounded bg-cs-dark-600 text-red-400 hover:bg-red-700 hover:text-white transition">
              <i className="ri-youtube-line"></i>
            </a>
          )}
          {streamer.social.twitter && (
            <a href={streamer.social.twitter} className="w-8 h-8 flex items-center justify-center rounded bg-cs-dark-600 text-blue-400 hover:bg-blue-700 hover:text-white transition">
              <i className="ri-twitter-x-line"></i>
            </a>
          )}
          {streamer.social.instagram && (
            <a href={streamer.social.instagram} className="w-8 h-8 flex items-center justify-center rounded bg-cs-dark-600 text-pink-400 hover:bg-pink-700 hover:text-white transition">
              <i className="ri-instagram-line"></i>
            </a>
          )}
        </div>
        <div className="flex justify-between items-center text-xs">
          <div className="flex flex-col items-center w-1/2">
            <span className="text-gray-400">Seguidores</span>
            <span className="text-white font-medium">{streamer.followers}</span>
          </div>
          <div className="flex flex-col items-center w-1/2">
            <span className="text-gray-400">Transmissões</span>
            <span className="text-white font-medium">{streamer.streams}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StreamerCard;
