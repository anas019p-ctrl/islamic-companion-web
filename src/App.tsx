import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { AccessibilityProvider } from "@/contexts/AccessibilityContext";
import Index from "./pages/Index";
import DuaPage from "./pages/DuaPage";
import QuranPage from "./pages/QuranPage";
import ScholarPage from "./pages/ScholarPage";
import SmartToolsPage from "./pages/SmartToolsPage";
import ProphetsPage from "./pages/ProphetsPage";
import HadithPage from "./pages/HadithPage";
import SahabaPage from "./pages/SahabaPage";
import LibraryPage from "./pages/LibraryPage";
import VideoResourcesPage from "./pages/VideoResourcesPage";
import EducationalPage from "./pages/EducationalPage";
import SecurityPage from "./pages/SecurityPage";
import AdminDashboard from "./pages/AdminDashboard";
import { FuturisticHub } from "./components/FuturisticHub";
import NotFound from "./pages/NotFound";
import { ProtectedRoute } from "./components/ProtectedRoute";
import TranslationPage from "./pages/TranslationPage";
import { GlobalAudioPlayer } from "./components/GlobalAudioPlayer";
import { AdhanManager } from "./components/AdhanManager";
import { InstructionsPage } from "./pages/InstructionsPage";
import { AncientBackground } from "./components/AncientBackground";
import { HistoryPage } from "./pages/HistoryPage";
import BlogPage from "./pages/BlogPage";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { ScrollToTop } from "./components/ScrollToTop";
import { GlowingCursor } from './components/GlowingCursor';
import { GalaxyAnimation } from './components/effects/GalaxyAnimation';
import { MagicNavigationMenu } from './components/effects/MagicNavigationMenu';
import { ContentHeatEffect } from './components/effects/ContentHeatEffect';
import { useEffect } from "react";

const queryClient = new QueryClient();

const AppContent = () => {
  useEffect(() => {
    const handleScroll = () => {
      if (window.innerWidth < 768) return; // Skip heavy work on mobile
      const scrolled = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const scrollFraction = scrolled / maxScroll;

      document.documentElement.style.setProperty('--scroll-hue', `${215 + (scrollFraction * 40)}`);
      document.documentElement.style.setProperty('--scroll-luminosity', `${8 + (scrollFraction * 10)}%`);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <BrowserRouter>
      <ErrorBoundary>
        <ScrollToTop />
        {window.innerWidth >= 768 && <ContentHeatEffect />}
        <GalaxyAnimation />
        {window.innerWidth >= 1024 && <GlowingCursor />}
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/dua" element={<DuaPage />} />
          <Route path="/quran" element={<QuranPage />} />
          <Route path="/scholar" element={<ScholarPage />} />
          <Route path="/tools" element={<SmartToolsPage />} />
          <Route path="/prophets" element={<ProphetsPage />} />
          <Route path="/hadith" element={<HadithPage />} />
          <Route path="/sahaba" element={<SahabaPage />} />
          <Route path="/library" element={<LibraryPage />} />
          <Route path="/videos" element={<VideoResourcesPage />} />
          <Route path="/education" element={<EducationalPage />} />
          <Route path="/translate" element={<TranslationPage />} />
          <Route path="/instructions" element={<InstructionsPage />} />
          <Route path="/history" element={<HistoryPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/security" element={<SecurityPage />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <MagicNavigationMenu />
        <GlobalAudioPlayer />
        <AdhanManager />
      </ErrorBoundary>
    </BrowserRouter>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <LanguageProvider>
        <AccessibilityProvider>
          <AncientBackground />
          <AppContent />
          <Toaster />
          <Sonner />
        </AccessibilityProvider>
      </LanguageProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
