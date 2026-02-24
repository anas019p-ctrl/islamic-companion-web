import { Header } from '@/components/Header';
import { HeroSection } from '@/components/HeroSection';
import { SacredHeritage } from '@/components/SacredHeritage';
import { SectionsGrid } from '@/components/SectionsGrid';
import { LearnArabicSection } from '@/components/LearnArabicSection';
import { Footer } from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-transparent animated-bg particles-bg">
      <Header />
      <main>
        <HeroSection />
        <SacredHeritage />
        <SectionsGrid />
        <LearnArabicSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
