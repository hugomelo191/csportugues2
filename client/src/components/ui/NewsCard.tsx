import { Link } from 'wouter';

interface NewsItemProps {
  type: string;
  image: string;
  date: string;
  category: string;
  title: string;
  excerpt: string;
  author?: string;
  info?: string;
  tags?: string[];
  link: string;
}

const NewsCard = ({ item }: { item: NewsItemProps }) => {
  const getBadgeColor = (type: string) => {
    switch (type) {
      case 'NOTÍCIA':
        return 'bg-cs-neon text-cs-dark-800';
      case 'TORNEIO':
        return 'bg-cs-blue text-cs-dark-800';
      case 'RECRUTAMENTO':
        return 'bg-cs-red text-cs-dark-800';
      default:
        return 'bg-cs-dark-700 text-white';
    }
  };

  const getButtonColor = (type: string) => {
    switch (type) {
      case 'NOTÍCIA':
        return 'text-cs-neon';
      case 'TORNEIO':
        return 'text-cs-blue';
      case 'RECRUTAMENTO':
        return 'text-cs-red';
      default:
        return 'text-cs-neon';
    }
  };

  const getButtonText = (type: string) => {
    switch (type) {
      case 'NOTÍCIA':
        return 'Ler mais';
      case 'TORNEIO':
        return 'Ver detalhes';
      case 'RECRUTAMENTO':
        return 'Candidatar-se';
      default:
        return 'Ver mais';
    }
  };

  return (
    <div className="bg-cs-dark-800 border border-cs-dark-600 rounded-md overflow-hidden hover:shadow-neon hover:border-cs-neon/40 transition duration-300 group h-full flex flex-col">
      <div className="relative">
        <img src={item.image} alt={item.title} className="w-full h-48 object-cover" />
        <div className="absolute top-0 left-0 bg-cs-neon px-3 py-1 font-orbitron text-xs font-semibold text-cs-dark-800 clip-angled-right">
          {item.type}
        </div>
      </div>
      <div className="p-5 flex-grow flex flex-col">
        <div className="flex justify-between items-center mb-3">
          <span className="text-xs text-gray-400">{item.date}</span>
          <span className="text-xs px-2 py-1 bg-cs-dark-700 rounded-full">{item.category}</span>
        </div>
        <h3 className="font-orbitron font-semibold text-white text-lg mb-2 group-hover:text-cs-neon transition">{item.title}</h3>
        <p className="text-gray-400 text-sm mb-4 flex-grow">{item.excerpt}</p>
        
        {item.tags && (
          <div className="flex flex-wrap gap-2 mb-4">
            {item.tags.map((tag, index) => (
              <span key={index} className="px-2 py-1 text-xs bg-cs-dark-700 rounded">{tag}</span>
            ))}
          </div>
        )}
        
        <div className="flex justify-between items-center">
          <span className="text-xs text-gray-500">{item.author || item.info}</span>
          <Link href={item.link}>
            <button className={`${getButtonColor(item.type)} text-xs font-medium hover:underline flex items-center`}>
              {getButtonText(item.type)}
              <i className="ri-arrow-right-line ml-1"></i>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NewsCard;
