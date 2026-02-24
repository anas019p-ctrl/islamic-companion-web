import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { BackButton } from '@/components/BackButton';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Youtube, PlayCircle, BookOpen, Mic, ExternalLink } from 'lucide-react';

const videoResources = [
    {
        id: '1',
        title: 'Introduzione all\'Islam',
        description: 'Un video introduttivo completo sui principi fondamentali dell\'Islam.',
        url: 'https://youtu.be/HYYYdgl80qE',
        embedId: 'HYYYdgl80qE',
        category: 'Introduzione',
        icon: PlayCircle,
        isPlaylist: false
    },
    {
        id: '2',
        title: 'Lezioni di Lingua Araba',
        description: 'Playlist completa per imparare l\'arabo da zero con metodo professionale.',
        url: 'https://youtube.com/@LezionidiLinguaArabaeIslam/playlists',
        isPlaylist: true,
        category: 'Lingua Araba',
        icon: BookOpen
    },
    {
        id: '3',
        title: 'Recitazioni Coraniche',
        description: 'Collezione di recitazioni del Corano con tajweed perfetto.',
        url: 'https://youtube.com/@Gukarim93/playlists',
        isPlaylist: true,
        category: 'Recitazione',
        icon: Mic
    }
];

const VideoResourcesPage = () => {
    const { language, isRTL } = useLanguage();

    return (
        <div className={`min-h-screen bg-background ${isRTL ? 'rtl' : 'ltr'}`} dir={isRTL ? 'rtl' : 'ltr'}>
            <Header />

            <main className="container mx-auto px-4 py-8 pt-24 max-w-6xl">
                <BackButton />

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12"
                >
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-[2rem] bg-gradient-to-br from-red-500/20 to-red-600/20 mb-6 border border-red-500/20 shadow-xl">
                        <Youtube className="w-10 h-10 text-red-500" />
                    </div>
                    <h1 className="text-5xl font-bold font-amiri text-primary mb-4">
                        {language === 'ar' ? 'موارد الفيديو التعليمية' : 'Risorse Video Educative'}
                    </h1>
                    <p className="text-muted-foreground max-w-2xl mx-auto italic">
                        {language === 'ar'
                            ? 'مجموعة مختارة من أفضل الموارد التعليمية على يوتيوب'
                            : 'Una selezione curata delle migliori risorse educative su YouTube per approfondire la tua conoscenza dell\'Islam.'}
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                    {videoResources.map((resource, index) => {
                        const IconComponent = resource.icon;
                        return (
                            <motion.div
                                key={resource.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <Card className="glass border-primary/10 hover:border-primary/30 transition-all duration-300 overflow-hidden group h-full">
                                    <CardContent className="p-0">
                                        {resource.embedId && !resource.isPlaylist ? (
                                            <div className="aspect-video bg-black relative overflow-hidden">
                                                <iframe
                                                    className="w-full h-full"
                                                    src={`https://www.youtube.com/embed/${resource.embedId}`}
                                                    title={resource.title}
                                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                    allowFullScreen
                                                />
                                            </div>
                                        ) : (
                                            <div className="aspect-video bg-gradient-to-br from-red-500/10 to-red-600/5 flex items-center justify-center relative overflow-hidden">
                                                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-50" />
                                                <IconComponent className="w-24 h-24 text-red-500/30 group-hover:text-red-500/50 transition-colors" />
                                            </div>
                                        )}

                                        <div className="p-6 space-y-4">
                                            <div className="flex items-start justify-between gap-4">
                                                <div className="flex-1">
                                                    <div className="flex items-center gap-2 mb-2">
                                                        <div className="p-1.5 rounded-lg bg-red-500/10">
                                                            <IconComponent className="w-4 h-4 text-red-500" />
                                                        </div>
                                                        <span className="text-[9px] uppercase tracking-[0.15em] font-bold text-red-500">
                                                            {resource.category}
                                                        </span>
                                                    </div>
                                                    <h3 className="text-xl font-bold font-amiri mb-2 group-hover:text-primary transition-colors">
                                                        {resource.title}
                                                    </h3>
                                                    <p className="text-sm text-muted-foreground leading-relaxed">
                                                        {resource.description}
                                                    </p>
                                                </div>
                                            </div>

                                            <Button
                                                className="w-full bg-red-500 hover:bg-red-600 text-white shadow-lg shadow-red-500/20"
                                                onClick={() => window.open(resource.url, '_blank')}
                                            >
                                                <ExternalLink className="w-4 h-4 mr-2" />
                                                {resource.isPlaylist ? 'Apri Playlist' : 'Guarda su YouTube'}
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        );
                    })}
                </div>

                <div className="p-8 rounded-3xl bg-primary/5 border border-primary/20 text-center">
                    <Youtube className="w-12 h-12 text-red-500 mx-auto mb-4" />
                    <h3 className="text-xl font-bold mb-2">Scopri Altre Risorse</h3>
                    <p className="text-sm text-muted-foreground mb-6 max-w-2xl mx-auto">
                        Queste sono solo alcune delle migliaia di risorse educative disponibili. Continua a esplorare per approfondire la tua conoscenza.
                    </p>
                    <Button
                        variant="outline"
                        className="border-red-500/30 hover:bg-red-500/10"
                        onClick={() => window.open('https://youtube.com', '_blank')}
                    >
                        Esplora YouTube
                    </Button>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default VideoResourcesPage;
