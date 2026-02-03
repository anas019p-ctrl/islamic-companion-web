import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { supabase } from '@/integrations/supabase/client';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Calendar, Clock, BookOpen, Play, ExternalLink, ShieldAlert } from 'lucide-react';
import { AuthenticImage } from '@/components/AuthenticImage';

interface BlogPost {
    id: string;
    title: string;
    content: string;
    excerpt?: string;
    image_url?: string;
    video_url?: string;
    category?: string;
    published_at: string;
    is_draft: boolean;
}

// Sample blog posts for demo (will be replaced by Supabase data)
const SAMPLE_POSTS: BlogPost[] = [
    {
        id: '1',
        title: 'L\'Importanza della Preghiera (Salah)',
        content: 'La preghiera è il pilastro della religione e la luce del credente. È il legame diretto tra il servo e il suo Creatore...',
        excerpt: 'Un approfondimento spirituale sull\'importanza fondamentale della preghiera quotidiana.',
        image_url: 'https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=800', // Mosque interior
        category: 'Spiritualità',
        published_at: new Date().toISOString(),
        is_draft: false
    },
    {
        id: '2',
        title: 'I Meriti della Recitazione del Corano',
        content: 'La recitazione del Corano porta pace al cuore e intercessione nel Giorno del Giudizio...',
        excerpt: 'Perché dedicare tempo ogni giorno alla lettura del Libro Sacro di Allah.',
        image_url: 'https://images.unsplash.com/photo-1584281723351-9d9224214544?w=800', // Quran/Mosque style
        category: 'Corano',
        published_at: new Date(Date.now() - 86400000).toISOString(),
        is_draft: false
    }
];

import { BlogService } from '@/services/BlogService';

const BlogPage = () => {
    const { t, language } = useLanguage();
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        setIsLoading(true);
        try {
            // Load Daily Insight from AI
            const dailyInsight = await BlogService.getDailyInsight();

            // Map the internal BlogPost format to the page format if needed
            // Currently they are almost identical. 
            // The service returns: { id, title, content, excerpt, category, date, author, ... }
            // The page uses: { id, title, content, excerpt, category, published_at, is_draft, ... }

            const aiPost: BlogPost = {
                ...dailyInsight,
                published_at: dailyInsight.date, // Map date to published_at
                is_draft: false
            };

            setPosts([aiPost, ...SAMPLE_POSTS]);
        } catch (error) {
            console.error("Error fetching AI posts:", error);
            setPosts(SAMPLE_POSTS);
        } finally {
            setIsLoading(false);
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString(language === 'it' ? 'it-IT' : 'en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const isRTL = language === 'ar';

    return (
        <div className={`min-h-screen bg-background/50 backdrop-blur-sm ${isRTL ? 'rtl' : 'ltr'}`} dir={isRTL ? 'rtl' : 'ltr'}>
            <Header />
            <main className="container mx-auto px-4 py-8 pt-32">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 mb-6">
                        <BookOpen className="w-5 h-5 text-primary" />
                        <span className="text-xs font-bold text-primary uppercase tracking-[0.3em]">
                            {t('blog') || 'Blog'}
                        </span>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-bold font-amiri text-gradient-gold mb-4">
                        {t('spiritualInsights') || 'Riflessioni Spirituali'}
                    </h1>
                    <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                        {t('blogDesc') || 'Articoli, riflessioni e guide per approfondire la tua conoscenza islamica.'}
                    </p>
                </motion.div>

                {selectedPost ? (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="max-w-4xl mx-auto"
                    >
                        <Button variant="ghost" onClick={() => setSelectedPost(null)} className="mb-6">
                            ← {t('backToList') || 'Torna alla lista'}
                        </Button>
                        <Card className="futuristic-card overflow-hidden">
                            {selectedPost.image_url && (
                                <div className="relative h-64 md:h-96 overflow-hidden">
                                    <AuthenticImage
                                        src={selectedPost.image_url}
                                        alt={selectedPost.title}
                                        className="w-full h-full"
                                        fallbackType="mosque"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
                                </div>
                            )}
                            <CardHeader>
                                <div className="flex items-center gap-4 mb-4">
                                    {selectedPost.category && (
                                        <Badge variant="outline" className="text-primary border-primary/30">
                                            {selectedPost.category}
                                        </Badge>
                                    )}
                                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                                        <Calendar className="w-3 h-3" />
                                        {formatDate(selectedPost.published_at)}
                                    </span>
                                </div>
                                <CardTitle className="text-3xl font-amiri text-primary">
                                    {selectedPost.title}
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="prose prose-invert max-w-none">
                                    <ScrollArea className="h-[400px] pr-4">
                                        <div className="text-lg leading-relaxed whitespace-pre-wrap">
                                            {selectedPost.content}
                                        </div>
                                    </ScrollArea>
                                </div>
                                {selectedPost.video_url && (
                                    <div className="mt-8">
                                        <Button variant="outline" asChild>
                                            <a href={selectedPost.video_url} target="_blank" rel="noopener noreferrer">
                                                <Play className="w-4 h-4 mr-2" />
                                                {t('watchVideo') || 'Guarda Video'}
                                                <ExternalLink className="w-3 h-3 ml-2" />
                                            </a>
                                        </Button>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </motion.div>
                ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                        {posts.map((post, index) => (
                            <motion.div
                                key={post.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <Card
                                    className="futuristic-card cursor-pointer group overflow-hidden h-full flex flex-col"
                                    onClick={() => setSelectedPost(post)}
                                >
                                    {post.image_url && (
                                        <div className="relative h-48 overflow-hidden">
                                            <AuthenticImage
                                                src={post.image_url}
                                                alt={post.title}
                                                className="w-full h-full"
                                                fallbackType="pattern"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-60" />
                                        </div>
                                    )}
                                    <CardHeader className="flex-1">
                                        <div className="flex items-center gap-2 mb-2">
                                            {post.category && (
                                                <Badge variant="outline" className="text-[10px] text-primary border-primary/30">
                                                    {post.category}
                                                </Badge>
                                            )}
                                        </div>
                                        <CardTitle className="text-xl font-amiri group-hover:text-primary transition-colors line-clamp-2">
                                            {post.title}
                                        </CardTitle>
                                        {post.excerpt && (
                                            <p className="text-sm text-muted-foreground line-clamp-3 mt-2">
                                                {post.excerpt}
                                            </p>
                                        )}
                                    </CardHeader>
                                    <CardContent className="pt-0">
                                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                                            <span className="flex items-center gap-1">
                                                <Calendar className="w-3 h-3" />
                                                {formatDate(post.published_at)}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <Clock className="w-3 h-3" />
                                                5 min
                                            </span>
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                )}

                {isLoading && (
                    <div className="flex justify-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                    </div>
                )}
            </main>
            <Footer />
        </div>
    );
};

export default BlogPage;
