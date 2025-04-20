import { Link } from 'wouter';

const NewsSection = () => {
  // Exemplo de notícia em destaque
  const featuredNews = {
    id: 1,
    title: 'COMPETIÇÃO NACIONAL DE CS2 ATRAI MAIS DE 50 EQUIPAS PORTUGUESAS',
    image: 'https://images.unsplash.com/photo-1548686304-89d188a80029?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
    date: '16 Mar 2024',
    category: 'Nacional',
    excerpt: 'A nova competição CS2 Portugal tem visto um interesse sem precedentes, com mais de 50 equipas registadas para participar na fase de qualificação. Este número recorde para o cenário competitivo português demonstra o crescimento...',
    author: 'Ricardo Silva',
    link: '/news/1'
  };

  // Exemplos de notícias recentes
  const recentNews = [
    {
      id: 2,
      title: 'SAW QUALIFICA-SE PARA TORNEIO EUROPEU',
      image: 'https://images.unsplash.com/photo-1511808963370-06cd05652bdd?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=60',
      date: '15 Mar 2024',
      category: 'EU',
      excerpt: 'A equipa portuguesa garantiu vaga após vencer equipa sueca nos qualificadores...'
    },
    {
      id: 3,
      title: 'OMEN ANUNCIA TORNEIO UNIVERSITÁRIO DE CS2',
      image: 'https://images.unsplash.com/photo-1551430872-6788c98d528c?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=60',
      date: '14 Mar 2024',
      category: 'Edu',
      excerpt: 'A competição exclusiva para universitários terá €5,000 em prémios e equipamentos...'
    },
    {
      id: 4,
      title: 'RZR ROSTO NOVO DA FTW ESPORTS PARA 2024',
      image: 'https://images.unsplash.com/photo-1579373903781-fd5c0c30c4cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=60',
      date: '12 Mar 2024',
      category: 'Roster',
      excerpt: 'O jovem talento português foi anunciado como novo AWPer após a saída de...'
    },
    {
      id: 5,
      title: 'NOVO PATCH DO CS2 TRAZ MUDANÇAS AO MAPA NUKE',
      image: 'https://images.unsplash.com/photo-1547394765-185e1e68f34e?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=60',
      date: '10 Mar 2024',
      category: 'Update',
      excerpt: 'Valve lança atualização com importantes alterações no layout de Nuke...'
    }
  ];

  return (
    <section className="py-12 bg-cs-dark relative">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="font-orbitron text-2xl font-bold text-white">
            Últimas Notícias
          </h2>
          <Link href="/news" className="text-cs-neon text-sm font-medium hover:underline flex items-center">
            Ver todas
            <i className="ri-arrow-right-line ml-1"></i>
          </Link>
        </div>
        
        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Featured News */}
          <div className="md:col-span-2 bg-cs-dark-800 border border-cs-dark-600 rounded-md overflow-hidden hover:shadow-neon hover:border-cs-neon/40 transition duration-300 group">
            <div className="relative h-64">
              <img src={featuredNews.image} alt={featuredNews.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-cs-dark-800 to-transparent opacity-90"></div>
              <div className="absolute top-4 left-4 bg-cs-neon px-2 py-1 font-orbitron text-xs font-semibold text-cs-dark-800 clip-angled-right">
                DESTAQUE
              </div>
              <div className="absolute bottom-4 left-4 right-4">
                <h3 className="font-orbitron font-bold text-white text-xl mb-2 group-hover:text-cs-neon transition">{featuredNews.title}</h3>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-400">{featuredNews.date}</span>
                  <span className="text-xs px-2 py-1 bg-cs-dark-700 rounded-full">{featuredNews.category}</span>
                </div>
              </div>
            </div>
            <div className="p-4">
              <p className="text-gray-300 text-sm mb-4">{featuredNews.excerpt}</p>
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-500">Por {featuredNews.author}</span>
                <Link href={featuredNews.link}>
                  <button className="text-cs-neon text-xs font-medium hover:underline flex items-center">
                    Ler Artigo Completo
                    <i className="ri-arrow-right-line ml-1"></i>
                  </button>
                </Link>
              </div>
            </div>
          </div>
          
          {/* News List */}
          <div className="flex flex-col space-y-4">
            {recentNews.map((news) => (
              <div key={news.id} className="bg-cs-dark-800 border border-cs-dark-600 rounded-md overflow-hidden hover:border-cs-neon/40 transition duration-300 flex">
                <div className="w-1/3 h-24">
                  <img src={news.image} alt={news.title} className="w-full h-full object-cover" />
                </div>
                <div className="w-2/3 p-3">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-orbitron font-medium text-white text-sm">{news.title}</h3>
                    <span className="text-xs px-1.5 py-0.5 bg-cs-dark-700 rounded-full">{news.category}</span>
                  </div>
                  <p className="text-gray-400 text-xs line-clamp-2 mb-1">{news.excerpt}</p>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-gray-500">{news.date}</span>
                    <Link href={`/news/${news.id}`} className="text-cs-neon hover:underline">Ler mais</Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsSection;
