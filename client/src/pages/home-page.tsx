import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/home/HeroSection';
import FeaturedContent from '@/components/home/FeaturedContent';
import LiveMatches from '@/components/home/LiveMatches';
import TeamsSection from '@/components/home/TeamsSection';
import UpcomingTournaments from '@/components/home/UpcomingTournaments';
import NewsSection from '@/components/home/NewsSection';
import StreamersSection from '@/components/home/StreamersSection';
import CTASection from '@/components/home/CTASection';

const HomePage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <HeroSection />
        <FeaturedContent />
        <LiveMatches />
        <TeamsSection />
        <UpcomingTournaments />
        <NewsSection />
        <StreamersSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;
