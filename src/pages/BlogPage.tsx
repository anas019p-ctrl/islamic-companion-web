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
import { Calendar, Clock, BookOpen, Play, ExternalLink, ShieldAlert, Languages, Loader2 } from 'lucide-react';
import { ScholarService } from '@/lib/ScholarService';
import { useToast } from '@/hooks/use-toast';
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
// Sample blog posts (now empty to prioritize real database content or authentic AI generation)
const SAMPLE_POSTS: BlogPost[] = [];

import { BlogService } from '@/services/BlogService';

const BlogPage = () => {
    const { t, language } = useLanguage();
    const { toast } = useToast();
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isTranslating, setIsTranslating] = useState(false);

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        setIsLoading(true);
        try {
            // 1. Fetch posts from Supabase
            const { data: dbPosts, error } = await supabase
                .from('blog_posts' as any)
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;

            const formattedDbPosts: BlogPost[] = (dbPosts || []).map((post: any) => ({
                id: post.id.toString(),
                title: post.title,
                content: post.content,
                excerpt: post.excerpt || (post.content.length > 150 ? post.content.substring(0, 150) + '...' : post.content),
                image_url: post.image_url,
                video_url: post.video_url,
                category: post.category,
                published_at: post.created_at,
                is_draft: false
            }));

            // 2. Load Daily Insight from AI
            const dailyInsight = await BlogService.getDailyInsight();

            const aiPost: BlogPost = {
                ...dailyInsight,
                published_at: dailyInsight.date,
                is_draft: false
            };

            // 3. Combine and set posts
            setPosts([aiPost, ...formattedDbPosts]);
        } catch (error) {
            console.error("Error fetching posts:", error);
            // Fallback to AI only if DB fails
            try {
                const dailyInsight = await BlogService.getDailyInsight();
                setPosts([{ ...dailyInsight, published_at: dailyInsight.date, is_draft: false }]);
            } catch (aiError) {
                setPosts(SAMPLE_POSTS);
            }
        } finally {
            setIsLoading(false);
        }
    };

    const getYoutubeEmbedUrl = (url?: string) => {
        if (!url) return null;
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
        const match = url.match(regExp);
        return (match && match[2].length === 11) ? `https://www.youtube.com/embed/${match[2]}` : null;
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString(language === 'it' ? 'it-IT' : 'en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const isRTL = language === 'ar';

    const handleTranslate = async (post: BlogPost) => {
        if (!post.content || isTranslating) return;
        setIsTranslating(true);
        try {
            const translatedContent = await ScholarService.translate(post.content, language === 'it' ? 'Italian' : language === 'ar' ? 'Arabic' : 'English');
            const translatedTitle = await ScholarService.translate(post.title, language === 'it' ? 'Italian' : language === 'ar' ? 'Arabic' : 'English');

            setSelectedPost({
                ...post,
                content: translatedContent,
                title: translatedTitle
            });

            toast({
                title: t('translated') || "Tradotto con successo",
                description: t('translatedByAi') || "Il contenuto è stato tradotto dall'IA.",
            });
        } catch (error) {
            console.error("Translation error:", error);
            toast({
                title: "Errore",
                description: "Impossibile tradurre il post.",
                variant: "destructive"
            });
        } finally {
            setIsTranslating(false);
        }
    };

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
                                {selectedPost.video_url && getYoutubeEmbedUrl(selectedPost.video_url) && (
                                    <div className="mb-8 aspect-video rounded-xl overflow-hidden border border-white/10 shadow-2xl">
                                        <iframe
                                            width="100%"
                                            height="100%"
                                            src={getYoutubeEmbedUrl(selectedPost.video_url)!}
                                            title="YouTube video player"
                                            frameBorder="0"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                        ></iframe>
                                    </div>
                                )}
                                <div className="flex items-center justify-between mb-4">
                                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                                        <Clock className="w-3 h-3" />
                                        5 min read
                                    </span>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => handleTranslate(selectedPost)}
                                        disabled={isTranslating}
                                        className="h-8 gap-2 bg-primary/5 border-primary/20 hover:bg-primary/10"
                                    >
                                        {isTranslating ? (
                                            <Loader2 className="w-3 h-3 animate-spin" />
                                        ) : (
                                            <Languages className="w-3 h-3" />
                                        )}
                                        {t('translateToCurrent') || 'Traduci Post'}
                                    </Button>
                                </div>
                                <div className="prose prose-invert max-w-none">
                                    <ScrollArea className="h-[400px] pr-4">
                                        <div className="text-lg leading-relaxed whitespace-pre-wrap">
                                            {selectedPost.content}
                                        </div>
                                    </ScrollArea>
                                </div>
                                <div className="mt-8">
                                    <Button variant="outline" asChild>
                                        <a href={selectedPost.video_url} target="_blank" rel="noopener noreferrer">
                                            <ExternalLink className="w-3 h-3 mr-2" />
                                            Visualizza su YouTube
                                        </a>
                                    </Button>
                                </div>
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
