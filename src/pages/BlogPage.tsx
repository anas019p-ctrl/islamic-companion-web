import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { supabase } from '@/integrations/supabase/client';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
    Calendar, Clock, BookOpen, Play, ExternalLink,
    Languages, Loader2, RefreshCw, Sparkles
} from 'lucide-react';
import { ScholarService } from '@/lib/ScholarService';
import { useToast } from '@/hooks/use-toast';
import { AuthenticImage } from '@/components/AuthenticImage';
import { BlogService } from '@/services/BlogService';

// ── Types ──────────────────────────────────────────────────────────────────────
interface BlogPost {
    id: string;
    title: string;
    content: string;
    excerpt?: string;
    image_url?: string;
    image?: string;
    video_url?: string;
    category?: string;
    published_at: string;
    is_draft?: boolean;
    author?: string;
    readTime?: string;
}

// ── Helper: compute reading time ───────────────────────────────────────────────
const calcReadTime = (text: string) =>
    `${Math.max(1, Math.ceil(text.split(' ').length / 200))} min`;

// ── Helper: YouTube embed ──────────────────────────────────────────────────────
const getYoutubeEmbedUrl = (url?: string) => {
    if (!url) return null;
    const match = url.match(/^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/);
    return match && match[2].length === 11
        ? `https://www.youtube.com/embed/${match[2]}`
        : null;
};

// ── Component ──────────────────────────────────────────────────────────────────
const BlogPage = () => {
    const { t, language } = useLanguage();
    const { toast } = useToast();

    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isTranslating, setIsTranslating] = useState(false);
    const [isRegenerating, setIsRegenerating] = useState(false);

    const isRTL = language === 'ar';

    // ── Fetch posts ────────────────────────────────────────────────────────────
    const fetchPosts = useCallback(async (forceRegen = false) => {
        setIsLoading(true);
        let currentDbPosts: BlogPost[] = [];
        let currentAiPost: BlogPost | null = null;

        // 1. Supabase posts (silent - table may not exist yet)
        try {
            const { data: dbData, error: dbError } = await supabase
                .from('blog_posts' as any)
                .select('*')
                .order('created_at', { ascending: false })
                .limit(20);

            // Silently skip if table doesn't exist (404) or any other DB error
            if (!dbError && dbData && dbData.length > 0) {
                currentDbPosts = dbData.map((p: any) => ({
                    id: String(p.id),
                    title: p.title,
                    content: p.content,
                    excerpt: p.excerpt || p.content?.substring(0, 150) + '...',
                    image_url: p.image_url,
                    video_url: p.video_url,
                    category: p.category,
                    published_at: p.published_at || p.created_at,
                    author: p.author || 'Admin',
                    readTime: calcReadTime(p.content || ''),
                    is_draft: p.is_draft || false,
                })).filter((p: any) => !p.is_draft);
            }
        } catch {
            // Silently ignore - AI content will still show
        }

        // 2. AI Daily Insight
        try {
            const insight = forceRegen
                ? await BlogService.regenerate(language)
                : await BlogService.getDailyInsight(language);

            if (insight) {
                currentAiPost = {
                    id: insight.id,
                    title: insight.title,
                    content: insight.content,
                    excerpt: insight.excerpt,
                    image_url: insight.image,
                    category: insight.category,
                    published_at: insight.date,
                    author: insight.author,
                    readTime: insight.readTime,
                };
            }
        } catch (err) {
            console.error('[BlogPage] AI fetch error:', err);
        }

        const combinedPosts = currentAiPost ? [currentAiPost, ...currentDbPosts] : currentDbPosts;
        setPosts(combinedPosts);
        setIsLoading(false);
    }, [language, toast]);

    useEffect(() => {
        fetchPosts();
    }, [fetchPosts]);

    // ── Regenerate AI post ─────────────────────────────────────────────────────
    const handleRegenerate = async () => {
        setIsRegenerating(true);
        await fetchPosts(true);
        setIsRegenerating(false);
        toast({ title: '✨ Post rigenerato!', description: 'Nuovi contenuti AI generati.' });
    };

    // ── Translate post ─────────────────────────────────────────────────────────
    const handleTranslate = async (post: BlogPost) => {
        if (!post.content || isTranslating) return;
        setIsTranslating(true);
        try {
            const targetLang = language === 'it' ? 'Italian' : language === 'ar' ? 'Arabic' : 'English';
            const [translatedContent, translatedTitle] = await Promise.all([
                ScholarService.translate(post.content, targetLang),
                ScholarService.translate(post.title, targetLang),
            ]);

            setSelectedPost({ ...post, content: translatedContent, title: translatedTitle });
            toast({
                title: t('translated') || '✅ Tradotto',
                description: t('translatedByAi') || 'Contenuto tradotto via AI.',
            });
        } catch {
            toast({ title: 'Errore traduzione', variant: 'destructive' });
        } finally {
            setIsTranslating(false);
        }
    };

    // ── Format date ────────────────────────────────────────────────────────────
    const formatDate = (dateStr: string) => {
        if (!dateStr) return '';
        try {
            const d = new Date(dateStr);
            if (isNaN(d.getTime())) return dateStr;
            return d.toLocaleDateString(
                language === 'ar' ? 'ar-SA' : language === 'it' ? 'it-IT' : 'en-US',
                { year: 'numeric', month: 'long', day: 'numeric' }
            );
        } catch {
            return dateStr;
        }
    };

    // ── Render markdown-like content (simple) ──────────────────────────────────
    const renderContent = (text: string) => {
        return text
            .split('\n')
            .map((line, i) => {
                if (line.startsWith('## ')) return <h2 key={i} className="text-2xl font-amiri font-bold text-primary mt-6 mb-3">{line.slice(3)}</h2>;
                if (line.startsWith('### ')) return <h3 key={i} className="text-xl font-amiri font-semibold text-primary/80 mt-4 mb-2">{line.slice(4)}</h3>;
                if (line.startsWith('> ')) return <blockquote key={i} className="border-l-4 border-primary/50 pl-4 italic text-muted-foreground my-3">{line.slice(2)}</blockquote>;
                if (line.startsWith('- ')) return <li key={i} className="ml-4 list-disc text-base">{line.slice(2)}</li>;
                if (line === '') return <br key={i} />;
                // Bold: **text**
                const boldParsed = line.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
                return <p key={i} className="text-base leading-relaxed my-1" dangerouslySetInnerHTML={{ __html: boldParsed }} />;
            });
    };

    // ── UI ─────────────────────────────────────────────────────────────────────
    return (
        <div className={`min-h-screen bg-background/50 backdrop-blur-sm ${isRTL ? 'rtl' : 'ltr'}`} dir={isRTL ? 'rtl' : 'ltr'}>
            <Header />
            <main className="container mx-auto px-4 py-8 pt-32">

                {/* ── Hero ── */}
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
                    <p className="text-muted-foreground max-w-2xl mx-auto text-lg mb-6">
                        {t('blogDesc') || 'Articoli e riflessioni per approfondire la tua conoscenza islamica.'}
                    </p>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={handleRegenerate}
                        disabled={isRegenerating || isLoading}
                        className="gap-2 border-primary/30 hover:border-primary/60"
                    >
                        {isRegenerating
                            ? <Loader2 className="w-4 h-4 animate-spin" />
                            : <Sparkles className="w-4 h-4 text-primary" />}
                        {isRegenerating ? 'Generando...' : '✨ Rigenera AI Post'}
                    </Button>
                </motion.div>

                {/* ── Loading ── */}
                {isLoading && (
                    <div className="flex flex-col items-center justify-center py-24 gap-4">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary" />
                        <p className="text-muted-foreground text-sm">Caricamento riflessioni islamiche...</p>
                    </div>
                )}

                {/* ── No posts ── */}
                {!isLoading && posts.length === 0 && (
                    <div className="text-center py-24">
                        <p className="text-muted-foreground">Nessun articolo disponibile.</p>
                        <Button variant="outline" onClick={() => fetchPosts()} className="mt-4 gap-2">
                            <RefreshCw className="w-4 h-4" /> Riprova
                        </Button>
                    </div>
                )}

                {/* ── Detail view ── */}
                {!isLoading && selectedPost && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-4xl mx-auto">
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
                                <div className="flex flex-wrap items-center gap-3 mb-4">
                                    {selectedPost.category && (
                                        <Badge variant="outline" className="text-primary border-primary/30">
                                            {selectedPost.category}
                                        </Badge>
                                    )}
                                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                                        <Calendar className="w-3 h-3" />
                                        {formatDate(selectedPost.published_at)}
                                    </span>
                                    {selectedPost.author && (
                                        <span className="text-xs text-muted-foreground">✍️ {selectedPost.author}</span>
                                    )}
                                </div>
                                <CardTitle className="text-3xl font-amiri text-primary">
                                    {selectedPost.title}
                                </CardTitle>
                            </CardHeader>

                            <CardContent>
                                {/* YouTube embed — only if valid URL */}
                                {(() => {
                                    const ytUrl = getYoutubeEmbedUrl(selectedPost.video_url);
                                    return ytUrl ? (
                                        <div className="mb-8 aspect-video rounded-xl overflow-hidden border border-white/10 shadow-2xl">
                                            <iframe
                                                width="100%" height="100%"
                                                src={ytUrl}
                                                title="YouTube video"
                                                frameBorder="0"
                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                allowFullScreen
                                            />
                                        </div>
                                    ) : null;
                                })()}

                                <div className="flex items-center justify-between mb-4">
                                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                                        <Clock className="w-3 h-3" />
                                        {selectedPost.readTime || calcReadTime(selectedPost.content)}
                                    </span>
                                    <div className="flex gap-2">
                                        <Button
                                            variant="outline" size="sm"
                                            onClick={() => handleTranslate(selectedPost)}
                                            disabled={isTranslating}
                                            className="h-8 gap-2 bg-primary/5 border-primary/20 hover:bg-primary/10"
                                        >
                                            {isTranslating
                                                ? <Loader2 className="w-3 h-3 animate-spin" />
                                                : <Languages className="w-3 h-3" />}
                                            {isTranslating ? 'Traducendo...' : (t('translateToCurrent') || 'Traduci')}
                                        </Button>
                                    </div>
                                </div>

                                {/* Markdown-rendered content */}
                                <ScrollArea className="h-[500px] pr-4">
                                    <div className="prose prose-invert max-w-none">
                                        {renderContent(selectedPost.content)}
                                    </div>
                                </ScrollArea>

                                {/* YouTube link button — only if valid */}
                                {selectedPost.video_url && getYoutubeEmbedUrl(selectedPost.video_url) && (
                                    <div className="mt-8">
                                        <Button variant="outline" asChild>
                                            <a href={selectedPost.video_url} target="_blank" rel="noopener noreferrer">
                                                <Play className="w-3 h-3 mr-2" />
                                                Visualizza su YouTube
                                                <ExternalLink className="w-3 h-3 ml-2" />
                                            </a>
                                        </Button>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </motion.div>
                )}

                {/* ── Post grid ── */}
                {!isLoading && !selectedPost && posts.length > 0 && (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                        {posts.map((post, index) => (
                            <motion.div
                                key={post.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.07 }}
                            >
                                <Card
                                    className="futuristic-card cursor-pointer group overflow-hidden h-full flex flex-col hover:border-primary/40 transition-all duration-300"
                                    onClick={() => setSelectedPost(post)}
                                >
                                    {/* First post badge */}
                                    {index === 0 && (
                                        <div className="bg-gradient-to-r from-primary/20 to-primary/5 px-4 py-2 text-xs font-bold text-primary flex items-center gap-2">
                                            <Sparkles className="w-3 h-3" /> AI Daily Insight
                                        </div>
                                    )}

                                    {(post.image_url || post.image) && (
                                        <div className="relative h-48 overflow-hidden">
                                            <AuthenticImage
                                                src={(post.image_url || post.image)!}
                                                alt={post.title}
                                                className="w-full h-full group-hover:scale-105 transition-transform duration-500"
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
                                            {post.video_url && getYoutubeEmbedUrl(post.video_url) && (
                                                <Badge variant="outline" className="text-[10px] text-red-400 border-red-400/30">
                                                    <Play className="w-2 h-2 mr-1" /> Video
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
                                                {post.readTime || calcReadTime(post.content)}
                                            </span>
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                )}
            </main>
            <Footer />
        </div>
    );
};

export default BlogPage;
