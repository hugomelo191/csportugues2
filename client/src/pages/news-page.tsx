import { useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Link } from 'wouter';

interface NewsArticle {
  id: number;
  title: string;
  image: string;
  date: string;
  category: string;
  excerpt: string;
  author: string;
  link: string;
  featured?: boolean;
}

const NewsPage = () => {
  const [activeCategory, setActiveCategory] = useState<string>('Todos');
  
  // Exemplo de artigo em destaque
  const featuredNews: NewsArticle = {
    id: 1,
    title: 'COMPETIÇÃO NACIONAL DE CS2 ATRAI MAIS DE 50 EQUIPAS PORTUGUESAS',
    image: 'https://images.unsplash.com/photo-1548686304-89d188a80029?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
    date: '16 Mar 2024',
    category: 'Nacional',
    excerpt: 'A nova competição CS2 Portugal tem visto um interesse sem precedentes, com mais de 50 equipas registadas para participar na fase de qualificação. Este número recorde para o cenário competitivo português demonstra o crescimento significativo do Counter-Strike 2 desde o seu lançamento. Organizadores destacam a diversidade das equipas participantes, desde organizações estabelecidas até novos talentos emergentes.',
    author: 'Ricardo Silva',
    link: '/news/1',
    featured: true
  };

  // Exemplos de notícias recentes
  const newsArticles: NewsArticle[] = [
    {
      id: 2,
      title: 'SAW QUALIFICA-SE PARA TORNEIO EUROPEU',
      image: 'https://images.unsplash.com/photo-1511808963370-06cd05652bdd?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=60',
      date: '15 Mar 2024',
      category: 'Internacional',
      excerpt: 'A equipa portuguesa garantiu vaga após vencer equipa sueca nos qualificadores europeus. Com esta conquista, a SAW assegura presença no próximo torneio da BLAST Premier, onde enfrentará algumas das principais equipas do mundo.',
      author: 'Miguel Costa',
      link: '/news/2'
    },
    {
      id: 3,
      title: 'OMEN ANUNCIA TORNEIO UNIVERSITÁRIO DE CS2',
      image: 'https://images.unsplash.com/photo-1551430872-6788c98d528c?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=60',
      date: '14 Mar 2024',
      category: 'Educação',
      excerpt: 'A competição exclusiva para universitários terá €5,000 em prémios e equipamentos. Este torneio visa promover o esport no ambiente acadêmico, oferecendo uma oportunidade para estudantes mostrarem seu talento competitivo.',
      author: 'Sofia Martins',
      link: '/news/3'
    },
    {
      id: 4,
      title: 'RZR ROSTO NOVO DA FTW ESPORTS PARA 2024',
      image: 'https://images.unsplash.com/photo-1579373903781-fd5c0c30c4cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=60',
      date: '12 Mar 2024',
      category: 'Equipes',
      excerpt: 'O jovem talento português foi anunciado como novo AWPer após a saída de vstm. Com apenas 18 anos, RZR é considerado uma das maiores promessas do cenário nacional, tendo se destacado em competições amadoras nos últimos meses.',
      author: 'Pedro Santos',
      link: '/news/4'
    },
    {
      id: 5,
      title: 'NOVO PATCH DO CS2 TRAZ MUDANÇAS AO MAPA NUKE',
      image: 'https://images.unsplash.com/photo-1547394765-185e1e68f34e?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=60',
      date: '10 Mar 2024',
      category: 'Jogo',
      excerpt: 'Valve lança atualização com importantes alterações no layout de Nuke, além de ajustes em várias armas. A comunidade portuguesa já começa a testar e adaptar-se às mudanças que prometem impactar significativamente as estratégias competitivas.',
      author: 'Ana Ferreira',
      link: '/news/5'
    },
    {
      id: 6,
      title: 'TORNEIO BENEFICENTE ARRECADA €8.000 PARA INSTITUIÇÃO DE CARIDADE',
      image: 'https://images.unsplash.com/photo-1559041881-74dd9228ccc3?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=60',
      date: '8 Mar 2024',
      category: 'Comunidade',
      excerpt: 'Streamers e jogadores profissionais portugueses se uniram em evento online que combinou partidas exibição e doações do público. O evento contou com a participação de mais de 20 personalidades do cenário de CS2 em Portugal.',
      author: 'João Oliveira',
      link: '/news/6'
    },
    {
      id: 7,
      title: 'CENTRO DE TREINAMENTO PARA JOVENS TALENTOS ABRE EM LISBOA',
      image: 'https://images.unsplash.com/photo-1581542162356-5d17892dfead?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=60',
      date: '5 Mar 2024',
      category: 'Nacional',
      excerpt: 'Nova instalação oferece infraestrutura profissional para desenvolvimento de habilidades em CS2. O centro conta com 20 PCs de alta performance, análise de demos com treinadores experientes e programa estruturado de evolução para jogadores.',
      author: 'Ricardo Silva',
      link: '/news/7'
    }
  ];

  // Categorias disponíveis (extraídas dos artigos)
  const categories = ['Todos', ...Array.from(new Set([...newsArticles.map(article => article.category), featuredNews.category]))];
  
  // Filtrar artigos por categoria
  const filteredArticles = activeCategory === 'Todos' 
    ? newsArticles 
    : newsArticles.filter(article => article.category === activeCategory);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow py-8 bg-cs-dark">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <h1 className="font-orbitron text-3xl font-bold text-white mb-2">Notícias</h1>
              <p className="text-gray-400">Mantenha-se atualizado sobre o cenário competitivo de Counter-Strike 2 em Portugal.</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map(category => (
                <Button 
                  key={category}
                  variant={activeCategory === category ? "default" : "outline"}
                  className={activeCategory === category 
                    ? "bg-cs-neon text-cs-dark-800 hover:bg-cs-neon/80 border-none" 
                    : "bg-transparent border-cs-dark-600 hover:bg-cs-dark-700"
                  }
                  onClick={() => setActiveCategory(category)}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
          
          {/* Artigo em Destaque */}
          {(activeCategory === 'Todos' || activeCategory === featuredNews.category) && (
            <div className="bg-cs-dark-800 border border-cs-dark-600 rounded-md overflow-hidden hover:shadow-neon hover:border-cs-neon/40 transition duration-300 group mb-10">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="relative h-64 lg:h-auto">
                  <img src={featuredNews.image} alt={featuredNews.title} className="w-full h-full object-cover" />
                  <div className="absolute top-0 left-0 bg-cs-neon px-3 py-1 font-orbitron text-xs font-semibold text-cs-dark-800 clip-angled-right">
                    DESTAQUE
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-sm text-gray-400">{featuredNews.date}</span>
                    <span className="text-xs px-2 py-1 bg-cs-dark-700 rounded-full">{featuredNews.category}</span>
                  </div>
                  <h2 className="font-orbitron font-bold text-white text-xl lg:text-2xl mb-4 group-hover:text-cs-neon transition">
                    {featuredNews.title}
                  </h2>
                  <p className="text-gray-300 text-sm mb-6">{featuredNews.excerpt}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">Por {featuredNews.author}</span>
                    <Link href={featuredNews.link}>
                      <button className="px-4 py-2 bg-cs-neon/20 text-cs-neon hover:bg-cs-neon/30 rounded font-medium text-sm transition flex items-center">
                        Ler Artigo Completo
                        <i className="ri-arrow-right-line ml-2"></i>
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Grid de Notícias */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArticles.map(article => (
              <div key={article.id} className="bg-cs-dark-800 border border-cs-dark-600 rounded-md overflow-hidden hover:shadow-neon hover:border-cs-neon/40 transition duration-300 group">
                <div className="relative">
                  <img src={article.image} alt={article.title} className="w-full h-48 object-cover" />
                  <div className="absolute top-0 left-0 bg-cs-neon px-3 py-1 font-orbitron text-xs font-semibold text-cs-dark-800 clip-angled-right">
                    NOTÍCIA
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-xs text-gray-400">{article.date}</span>
                    <span className="text-xs px-2 py-1 bg-cs-dark-700 rounded-full">{article.category}</span>
                  </div>
                  <h3 className="font-orbitron font-semibold text-white text-lg mb-2 group-hover:text-cs-neon transition">
                    {article.title}
                  </h3>
                  <p className="text-gray-400 text-sm mb-4 line-clamp-3">{article.excerpt}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-500">Por {article.author}</span>
                    <Link href={article.link}>
                      <button className="text-cs-neon text-xs font-medium hover:underline flex items-center">
                        Ler mais
                        <i className="ri-arrow-right-line ml-1"></i>
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Paginação */}
          <div className="flex justify-center mt-10">
            <div className="flex space-x-2">
              <Button disabled variant="outline" className="w-10 h-10 p-0 border-cs-dark-600">
                <i className="ri-arrow-left-s-line"></i>
              </Button>
              <Button variant="outline" className="w-10 h-10 p-0 border-cs-dark-600 bg-cs-dark-700">1</Button>
              <Button variant="outline" className="w-10 h-10 p-0 border-cs-dark-600">2</Button>
              <Button variant="outline" className="w-10 h-10 p-0 border-cs-dark-600">3</Button>
              <Button variant="outline" className="w-10 h-10 p-0 border-cs-dark-600">
                <i className="ri-arrow-right-s-line"></i>
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NewsPage;
