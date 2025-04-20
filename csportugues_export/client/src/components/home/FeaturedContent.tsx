import { Link } from 'wouter';
import NewsCard from '../ui/NewsCard';

const FeaturedContent = () => {
  // Exemplos de conteúdo destacado
  const featuredContent = [
    {
      type: 'NOTÍCIA',
      image: 'https://images.unsplash.com/photo-1599400685016-e186fa6fdf52?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      date: '16 Mar 2024',
      category: 'Nacional',
      title: 'FTW e SAW classificam-se para a BLAST Premier',
      excerpt: 'As equipas portuguesas garantiram presença no torneio internacional após vitórias impressionantes nos qualificadores europeus...',
      author: 'Ricardo Silva',
      link: '/news/1'
    },
    {
      type: 'TORNEIO',
      image: 'https://images.unsplash.com/photo-1560253023-3ec5d502959f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      date: 'Inscrições abertas',
      category: '5v5',
      title: 'Liga Portuguesa CS2 - Temporada 4',
      excerpt: '16 equipas disputam o maior prémio de sempre em Portugal. Fase de grupos já definida com início marcado para a próxima semana...',
      info: 'Início: 25 Mar',
      link: '/tournaments/1'
    },
    {
      type: 'RECRUTAMENTO',
      image: 'https://images.unsplash.com/photo-1561736778-92e52a7769ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      date: 'Equipa procura jogadores',
      category: 'Profissional',
      title: 'Tryouts Nexus Gaming - AWPer & Rifler',
      excerpt: 'Equipa de topo nacional com participação em competições internacionais procura completar roster para a nova temporada...',
      tags: ['AWPer', 'Rifler', 'Nível 10 Faceit+'],
      info: '12 candidatos',
      link: '/matchmaking/1'
    },
  ];

  return (
    <section className="py-12 bg-cs-dark relative">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="font-orbitron text-2xl font-bold">
            <span className="text-white">Em </span>
            <span className="text-cs-neon">Destaque</span>
          </h2>
          <div className="flex space-x-2">
            <button className="w-10 h-10 flex items-center justify-center rounded border border-cs-dark-600 hover:border-cs-neon/50 hover:bg-cs-dark-700 transition">
              <i className="ri-arrow-left-s-line"></i>
            </button>
            <button className="w-10 h-10 flex items-center justify-center rounded border border-cs-dark-600 hover:border-cs-neon/50 hover:bg-cs-dark-700 transition">
              <i className="ri-arrow-right-s-line"></i>
            </button>
          </div>
        </div>
        
        {/* Featured Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredContent.map((item, index) => (
            <NewsCard key={index} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedContent;
