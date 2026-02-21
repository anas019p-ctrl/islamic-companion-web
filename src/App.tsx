import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { AccessibilityProvider } from "@/contexts/AccessibilityContext";
import { FuturisticHub } from "./components/FuturisticHub";
import NotFound from "./pages/NotFound";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { GlobalAudioPlayer } from "./components/GlobalAudioPlayer";
import { AdhanManager } from "./components/AdhanManager";
import { AncientBackground } from "./components/AncientBackground";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { ScrollToTop } from "./components/ScrollToTop";
import { GlowingCursor } from './components/GlowingCursor';
import { GalaxyAnimation } from './components/effects/GalaxyAnimation';
import { MagicNavigationMenu } from './components/effects/MagicNavigationMenu';
import { ContentHeatEffect } from './components/effects/ContentHeatEffect';
import { useEffect, lazy, Suspense } from "react";

// Lazy loading for heavy sections
const Index = lazy(() => import("./pages/Index"));
const DuaPage = lazy(() => import("./pages/DuaPage"));
const QuranPage = lazy(() => import("./pages/QuranPage"));
const ScholarPage = lazy(() => import("./pages/ScholarPage"));
const SmartToolsPage = lazy(() => import("./pages/SmartToolsPage"));
const ProphetsPage = lazy(() => import("./pages/ProphetsPage"));
const HadithPage = lazy(() => import("./pages/HadithPage"));
const SahabaPage = lazy(() => import("./pages/SahabaPage"));
const LibraryPage = lazy(() => import("./pages/LibraryPage"));
const VideoResourcesPage = lazy(() => import("./pages/VideoResourcesPage"));
const EducationalPage = lazy(() => import("./pages/EducationalPage"));
const SecurityPage = lazy(() => import("./pages/SecurityPage"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));
const TranslationPage = lazy(() => import("./pages/TranslationPage"));
const InstructionsPage = lazy(() => import("./pages/InstructionsPage"));
const HistoryPage = lazy(() => import("./pages/HistoryPage"));
const BlogPage = lazy(() => import("./pages/BlogPage"));
const KidsPage = lazy(() => import("./pages/KidsPage"));
const MosqueMapPage = lazy(() => import("./pages/MosqueMapPage"));
const CommonMistakesPage = lazy(() => import("./pages/CommonMistakesPage"));

// Loading fallback component
const PageLoader = () => (
  <div className="fixed inset-0 flex items-center justify-center bg-background z-50">
    <div className="relative w-24 h-24">
      <div className="absolute inset-0 border-4 border-primary/20 rounded-full" />
      <div className="absolute inset-0 border-4 border-primary rounded-full animate-spin border-t-transparent" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-12 h-12 bg-primary/10 rounded-full animate-pulse" />
      </div>
    </div>
  </div>
);

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
        <Suspense fallback={<PageLoader />}>
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
            <Route path="/kids" element={<KidsPage />} />
            <Route path="/mosques" element={<MosqueMapPage />} />
            <Route path="/mistakes" element={<CommonMistakesPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
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
