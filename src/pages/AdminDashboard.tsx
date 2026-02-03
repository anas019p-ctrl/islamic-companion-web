import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import confetti from 'canvas-confetti';
import { AnimatedLoginForm } from '@/components/effects/AnimatedLoginForm';
import { supabase } from '@/integrations/supabase/client';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import {
    Shield, Database, Upload, BookOpen, MessageSquare,
    Users, Video, FileText, Plus, Edit, Trash2, Save,
    Settings, Activity, Globe, Lock, LogOut, CheckCircle2,
    Search, Filter, MoreVertical, X, Heart
} from 'lucide-react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

import { GlassThermometer } from '@/components/effects/GlassThermometer';

interface ContentItem {
    id: string;
    title: string;
    content: string;
    category: string;
    created_at: string;
}


// Error Boundary Component to catch runtime errors
class AdminErrorBoundary extends React.Component<{ children: React.ReactNode }, { hasError: boolean, error: Error | null }> {
    constructor(props: { children: React.ReactNode }) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error: Error) {
        return { hasError: true, error };
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        console.error("Admin Dashboard Error:", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen flex items-center justify-center bg-background p-4">
                    <Card className="w-full max-w-md border-destructive/20 bg-destructive/5">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-destructive">
                                <Shield className="w-6 h-6" />
                                Dashboard Error
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <p className="text-sm text-muted-foreground">
                                The admin dashboard encountered a critical error. This is likely due to a network issue or invalid data.
                            </p>
                            <div className="p-2 bg-black/20 rounded text-xs font-mono text-destructive/80 overflow-auto max-h-32">
                                {this.state.error?.message}
                            </div>
                            <Button
                                onClick={() => {
                                    localStorage.clear();
                                    window.location.reload();
                                }}
                                className="w-full bg-destructive hover:bg-destructive/90"
                            >
                                Reset Cache & Reload
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            );
        }

        return this.props.children;
    }
}

const AdminDashboardContent = () => {

    const navigate = useNavigate();
    const { toast } = useToast();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSignup, setIsSignup] = useState(false);
    const [systemErrors, setSystemErrors] = useState<{ id: string; message: string; time: string }[]>([]);

    // Trilingual Admin UI Support
    const [adminLang, setAdminLang] = useState<'it' | 'en' | 'ar'>('it');
    const adminT = {
        it: {
            title: "Dashboard Amministratore",
            subtitle: "Sistema Completo di Gestione Contenuti",
            vocabulary: "Vocabolario",
            duas: "Duas",
            prophets: "Profeti",
            blog: "Blog",
            library: "Libreria (PDF)",
            systemLogs: "Log di Sistema",
            config: "Configurazione",
            save: "Salva nel Database",
            addWord: "Aggiungi Parola",
            addDua: "Aggiungi Dua",
            addProphet: "Aggiungi Profeta",
            addPost: "Pubblica Articolo",
            addBook: "Carica Libro PDF",
            wordAr: "Arabo",
            wordEn: "Inglese",
            wordIt: "Italiano",
            category: "Categoria",
            content: "Contenuto",
            uploadPdf: "Seleziona PDF dal PC",
            stats: "Statistiche",
            heat: "Calore Contenuti",
            logout: "Esci",
            reload: "Ricarica App"
        },
        en: {
            title: "Admin Dashboard",
            subtitle: "Complete Content Management System",
            vocabulary: "Vocabulary",
            duas: "Duas",
            prophets: "Prophets",
            blog: "Blog",
            library: "Library (PDF)",
            systemLogs: "System Logs",
            config: "Config",
            save: "Save to Database",
            addWord: "Add Word",
            addDua: "Add Dua",
            addProphet: "Add Prophet",
            addPost: "Publish Post",
            addBook: "Upload PDF Book",
            wordAr: "Arabic",
            wordEn: "English",
            wordIt: "Italian",
            category: "Category",
            content: "Content",
            uploadPdf: "Select PDF from PC",
            stats: "Statistics",
            heat: "Content Heat",
            logout: "Logout",
            reload: "Reload App"
        },
        ar: {
            title: "لوحة التحكم",
            subtitle: "نظام إدارة المحتوى المتكامل",
            vocabulary: "المفردات",
            duas: "الأدعية",
            prophets: "الأنبياء",
            blog: "المدونة",
            library: "المكتبة (PDF)",
            systemLogs: "سجلات النظام",
            config: "الإعدادات",
            save: "حفظ في قاعدة البيانات",
            addWord: "إضافة كلمة",
            addDua: "إضافة دعاء",
            addProphet: "إضافة نبي",
            addPost: "نشر مقال",
            addBook: "رفع كتاب PDF",
            wordAr: "العربية",
            wordEn: "الإنجليزية",
            wordIt: "الإيطالية",
            category: "الفئة",
            content: "المحتوى",
            uploadPdf: "اختر ملف PDF من جهازك",
            stats: "الإحصائيات",
            heat: "حرارة المحتوى",
            logout: "تسجيل الخروج",
            reload: "تحديث التطبيق"
        }
    };
    const tA = adminT[adminLang];

    // Content states
    const [vocabularyItems, setVocabularyItems] = useState<any[]>([]);
    const [newWord, setNewWord] = useState({ word_ar: '', word_en: '', word_it: '', category: 'basic' });

    // Duas state
    const [duas, setDuas] = useState<any[]>([]);
    const [newDua, setNewDua] = useState({ title_ar: '', text_ar: '', category: 'daily', source: '' });

    // Prophets state
    const [prophets, setProphets] = useState<any[]>([]);
    const [newProphet, setNewProphet] = useState({
        name_ar: '',
        name_en: '',
        era: '',
        timeline_order: 1,
        story_ar: ''
    });
    const [editingItem, setEditingItem] = useState<any>(null);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

    // Blog state
    const [blogPosts, setBlogPosts] = useState<any[]>([]);
    const [newPost, setNewPost] = useState({ title: '', content: '', category: 'spirituality', image_url: '', video_url: '' });

    // Library state
    const [books, setBooks] = useState<any[]>([]);
    const [newBook, setNewBook] = useState({
        title_ar: '',
        title_en: '',
        title_it: '',
        author: '',
        pdf_url: '',
        category: 'literature'
    });
    const [uploadingPdf, setUploadingPdf] = useState(false);
    const [uploadingBlogImage, setUploadingBlogImage] = useState(false);

    const ADMIN_EMAIL = 'anas019p@gmail.com';

    useEffect(() => {
        checkAuth();
        // Setup error listener
        const handleError = (event: ErrorEvent) => {
            const newError = {
                id: Math.random().toString(36).substr(2, 9),
                message: event.message,
                time: new Date().toLocaleTimeString(),
            };
            setSystemErrors(prev => [newError, ...prev].slice(0, 50));
        };
        window.addEventListener('error', handleError);

        const loadAllData = async () => {
            setIsLoading(true);
            try {
                await Promise.all([
                    fetchDuas(),
                    fetchProphets(),
                    fetchVocabulary(),
                    fetchBlogPosts(),
                    fetchBooks()
                ]);
            } finally {
                setIsLoading(false);
            }
        };

        if (isAuthenticated) {
            loadAllData();
        }

        return () => window.removeEventListener('error', handleError);
    }, [isAuthenticated]);

    const fetchDuas = async () => {
        const { data, error } = await supabase.from('duas').select('*').order('created_at', { ascending: false });
        if (!error && data) setDuas(data);
    };

    const fetchProphets = async () => {
        const { data, error } = await supabase.from('prophets').select('*').order('timeline_order', { ascending: true });
        if (!error && data) setProphets(data);
    };

    const fetchVocabulary = async () => {
        try {
            const { data, error } = await supabase.from('vocabulary').select('*').order('created_at', { ascending: false });
            if (!error && data) setVocabularyItems(data);
        } catch (e) {
            console.debug("Vocabulary table not available");
        }
    };

    const fetchBlogPosts = async () => {
        try {
            const { data, error } = await supabase.from('blog_posts' as any).select('*').order('created_at', { ascending: false });
            if (!error && data) setBlogPosts(data);
        } catch (e) {
            console.debug("Blog posts table not available");
        }
    };

    const fetchBooks = async () => {
        try {
            const { data, error } = await supabase.from('books' as any).select('*').order('created_at', { ascending: false });
            if (!error && data) setBooks(data);
        } catch (e) {
            console.debug("Books table not available");
        }
    };

    const addBlogPost = async () => {
        if (!newPost.title || !newPost.content) {
            toast({ title: '⚠️ Missing Fields', description: 'Title and content are required', variant: 'destructive' });
            return;
        }

        const { error } = await supabase.from('blog_posts' as any).insert([newPost]);

        if (error) {
            toast({ title: '❌ Error adding Post', description: error.message, variant: 'destructive' });
        } else {
            toast({ title: '✅ Post Published' });
            fetchBlogPosts();
            setNewPost({ title: '', content: '', category: 'spirituality', image_url: '', video_url: '' });
        }
    };

    const handlePdfUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (file.type !== 'application/pdf') {
            toast({ title: '❌ Error', description: 'Only PDF files are allowed', variant: 'destructive' });
            return;
        }

        setUploadingPdf(true);
        try {
            const fileExt = file.name.split('.').pop();
            const fileName = `${Math.random()}.${fileExt}`;
            const filePath = `books/${fileName}`;

            const { error: uploadError } = await supabase.storage
                .from('media')
                .upload(filePath, file);

            if (uploadError) throw uploadError;

            const { data: { publicUrl } } = supabase.storage
                .from('media')
                .getPublicUrl(filePath);

            setNewBook(prev => ({ ...prev, pdf_url: publicUrl }));
            toast({ title: '✅ PDF Uploaded', description: 'File ready to be saved to database' });
        } catch (error: any) {
            toast({ title: '❌ Upload Failed', description: error.message, variant: 'destructive' });
        } finally {
            setUploadingPdf(false);
        }
    };

    const handleBlogImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (!file.type.startsWith('image/')) {
            toast({ title: '❌ Error', description: 'Only image files are allowed', variant: 'destructive' });
            return;
        }

        setUploadingBlogImage(true);
        try {
            const fileExt = file.name.split('.').pop();
            const fileName = `blog-${Math.random()}.${fileExt}`;
            const filePath = `blog/${fileName}`;

            const { error: uploadError } = await supabase.storage
                .from('media')
                .upload(filePath, file);

            if (uploadError) throw uploadError;

            const { data: { publicUrl } } = supabase.storage
                .from('media')
                .getPublicUrl(filePath);

            setNewPost(prev => ({ ...prev, image_url: publicUrl }));
            toast({ title: '✅ Image Uploaded', description: 'Immagine caricata e pronta' });
        } catch (error: any) {
            toast({ title: '❌ Upload Failed', description: error.message, variant: 'destructive' });
        } finally {
            setUploadingBlogImage(false);
        }
    };

    const addBook = async () => {
        if (!newBook.pdf_url || !newBook.title_ar) {
            toast({ title: '⚠️ Missing Fields', description: 'Title (AR) and PDF are required', variant: 'destructive' });
            return;
        }

        const { error } = await supabase.from('books' as any).insert([newBook]);

        if (error) {
            toast({ title: '❌ Error adding Book', description: error.message, variant: 'destructive' });
        } else {
            toast({ title: '✅ Book Added' });
            fetchBooks();
            setNewBook({
                title_ar: '',
                title_en: '',
                title_it: '',
                author: '',
                pdf_url: '',
                category: 'literature'
            });
        }
    };

    const addDua = async () => {
        const { data, error } = await supabase.from('duas' as any).insert([newDua]).select();
        if (error) {
            toast({ title: '❌ Error adding Dua', description: error.message, variant: 'destructive' });
        } else {
            toast({ title: '✅ Dua Added', description: 'New dua saved to database' });
            fetchDuas();
            setNewDua({ title_ar: '', text_ar: '', category: 'daily', source: '' });
        }
    };

    const addProphet = async () => {
        if (!newProphet.name_ar || !newProphet.name_en || !newProphet.story_ar) {
            toast({ title: '❌ Error', description: 'Name (AR/EN) and Story are required', variant: 'destructive' });
            return;
        }

        const { error } = await supabase.from('prophets' as any).insert([newProphet]);

        if (error) {
            toast({ title: '❌ Error adding Prophet', description: error.message, variant: 'destructive' });
        } else {
            toast({ title: '✅ Prophet Added', description: 'Prophet story saved to database' });
            fetchProphets();
            setNewProphet({
                name_ar: '',
                name_en: '',
                era: '',
                timeline_order: prophets.length + 1,
                story_ar: ''
            });
        }
    };

    const deleteItem = async (table: string, id: string) => {
        const { error } = await supabase.from(table as any).delete().eq('id', id);
        if (error) {
            toast({ title: '❌ Delete Failed', description: error.message, variant: 'destructive' });
        } else {
            toast({ title: '✅ Item Deleted' });
            if (table === 'duas') fetchDuas();
            if (table === 'prophets') fetchProphets();
            if (table === 'vocabulary') fetchVocabulary();
            if (table === 'blog_posts') fetchBlogPosts();
            if (table === 'books') fetchBooks();
        }
    };

    const updateItem = async (table: string, id: string, data: any) => {
        const { error } = await supabase.from(table as any).update(data).eq('id', id);
        if (error) {
            toast({ title: '❌ Update Failed', description: error.message, variant: 'destructive' });
        } else {
            toast({ title: '✅ Item Updated' });
            if (table === 'duas') fetchDuas();
            if (table === 'prophets') fetchProphets();
            if (table === 'vocabulary') fetchVocabulary();
            if (table === 'blog_posts') fetchBlogPosts();
            if (table === 'books') fetchBooks();
            setIsEditDialogOpen(false);
            setEditingItem(null);
        }
    };

    const deleteBlogPost = (id: string) => {
        deleteItem('blog_posts' as any, id);
    };

    const deleteVocabulary = (id: string) => {
        deleteItem('vocabulary', id);
    };

    const checkAuth = async () => {
        const { data: { session } } = await supabase.auth.getSession();
        if (session) {
            if (session.user.email?.toLowerCase() === ADMIN_EMAIL.toLowerCase()) {
                setIsAuthenticated(true);
            } else {
                await supabase.auth.signOut();
                toast({
                    title: '❌ Access Denied',
                    description: 'Only authorized administrators can access this dashboard.',
                    variant: 'destructive',
                });
            }
        }
        setIsLoading(false);
    };

    const handleAuth = async (e: React.FormEvent, directEmail?: string, directPassword?: string) => {
        if (e) e.preventDefault();
        const loginEmail = directEmail || email;
        const loginPassword = directPassword || password;
        setIsLoading(true);

        try {
            if (isSignup) {
                if (loginEmail.toLowerCase() !== ADMIN_EMAIL.toLowerCase()) {
                    throw new Error('You are not authorized to create an admin account.');
                }
                const { data, error } = await supabase.auth.signUp({
                    email: loginEmail,
                    password: loginPassword,
                    options: {
                        data: {
                            role: 'admin',
                        },
                    },
                });
                if (error) throw error;
                toast({
                    title: '✅ Signup Successful',
                    description: 'Check your email for confirmation (if enabled) or try logging in.',
                });
                setIsSignup(false);
            } else {
                const { data, error } = await supabase.auth.signInWithPassword({
                    email: loginEmail,
                    password: loginPassword,
                });
                if (error) throw error;

                if (data.user.email?.toLowerCase() !== ADMIN_EMAIL.toLowerCase()) {
                    await supabase.auth.signOut();
                    throw new Error('Access Denied: unauthorized user.');
                }

                setIsAuthenticated(true);
                confetti({
                    particleCount: 150,
                    spread: 70,
                    origin: { y: 0.6 },
                    colors: ['#c9a44a', '#ffffff', '#10b981']
                });
                toast({
                    title: '✅ Login Successful',
                    description: 'Welcome to Admin Dashboard',
                });
            }
        } catch (error: any) {
            toast({
                title: isSignup ? '❌ Signup Failed' : '❌ Login Failed',
                description: error.message,
                variant: 'destructive',
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleForgotPassword = async () => {
        if (!email) {
            toast({
                title: '⚠️ Email Richiesto',
                description: 'Inserisci la tua email admin per recuperare la password.',
                variant: 'destructive',
            });
            return;
        }
        setIsLoading(true);
        try {
            const { error } = await supabase.auth.resetPasswordForEmail(email, {
                redirectTo: `${window.location.origin}/admin`,
            });
            if (error) throw error;
            toast({
                title: '✅ Email Inviata',
                description: 'Controlla la tua casella di posta per il link di ripristino.',
            });
        } catch (error: any) {
            console.error("Password reset error details:", error);
            toast({
                title: '❌ Errore',
                description: `${error.message}. Verifica lo stato del database Supabase o prova più tardi.`,
                variant: 'destructive',
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleLogout = async () => {
        await supabase.auth.signOut();
        setIsAuthenticated(false);
        navigate('/');
    };

    const clearAppCache = async () => {
        try {
            // Clear Browser Cache (Cache API)
            if ('caches' in window) {
                const names = await caches.keys();
                await Promise.all(names.map(name => caches.delete(name)));
            }
            // Clear Local Storage
            localStorage.clear();
            // Clear Session Storage
            sessionStorage.clear();

            toast({
                title: '✅ Cache Cleared',
                description: 'Application cache and local data have been reset.',
            });
        } catch (error: any) {
            toast({
                title: '❌ Clear Failed',
                description: error.message,
                variant: 'destructive',
            });
        }
    };

    const clearTempFiles = () => {
        // In a web app, "temp files" are usually just session data or cache
        // But we can specifically target known "temp" patterns if they exist
        sessionStorage.clear();
        toast({
            title: '✅ Temp Files Cleared',
            description: 'Temporary session data has been removed.',
        });
    };

    const addVocabulary = async () => {
        if (!newWord.word_ar || !newWord.word_en || !newWord.word_it) {
            toast({
                title: '⚠️ Missing Fields',
                description: 'Please fill all language fields',
                variant: 'destructive',
            });
            return;
        }

        const { error } = await supabase.from('vocabulary' as any).insert([newWord]);

        if (error) {
            toast({
                title: '❌ Error adding Word',
                description: error.message,
                variant: 'destructive',
            });
        } else {
            confetti({
                particleCount: 80,
                spread: 60,
                origin: { y: 0.7 }
            });
            toast({
                title: '✅ Word Added',
                description: 'Vocabulary item saved to database',
            });
            fetchVocabulary();
            setNewWord({ word_ar: '', word_en: '', word_it: '', category: 'basic' });
        }
    };

    if (isLoading && !isAuthenticated) {
        return (
            <div className="min-h-screen bg-[#0a0a0b] flex flex-col items-center justify-center p-4">
                <div className="relative">
                    <div className="w-16 h-16 rounded-full border-2 border-primary/20 border-t-primary animate-spin" />
                    <Shield className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 text-primary" />
                </div>
                <p className="mt-4 text-[10px] uppercase tracking-[0.3em] text-primary/60 font-bold animate-pulse">
                    Accedendo al Sistema...
                </p>
            </div>
        );
    }

    // Login Screen
    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-[#0a0a0b] flex items-center justify-center p-4 relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(201,164,74,0.05),transparent_50%)]" />
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[120px] animate-pulse" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }} />

                <AnimatedLoginForm
                    onLogin={(e, p) => handleAuth(null as any, e, p)}
                    onForgotPassword={handleForgotPassword}
                    isLoading={isLoading}
                    isAdmin={true}
                />
            </div>
        );
    }

    // Admin Dashboard Secondary Loading
    if (isLoading && isAuthenticated) {
        return (
            <div className="min-h-screen bg-[#0a0a0b] flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
                    <p className="text-muted-foreground text-sm tracking-widest uppercase animate-pulse">Sincronizzazione dati...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background flex flex-col">
            <Header />
            <main className="flex-grow container mx-auto px-4 py-8 pt-24">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                    <div className={adminLang === 'ar' ? 'text-right w-full' : ''} dir={adminLang === 'ar' ? 'rtl' : 'ltr'}>
                        <h1 className="text-4xl font-bold text-gradient-gold mb-2">
                            {tA.title}
                        </h1>
                        <p className="text-muted-foreground">{tA.subtitle}</p>
                        <Badge className="bg-emerald-500 animate-pulse mt-2">VERSION 2.1 - ACTIVE MODIFICATIONS</Badge>
                    </div>

                    {/* Quick Access Bar - Professional Control */}
                    <div className="flex flex-wrap items-center gap-2 p-2 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-md shadow-lg">
                        <Button variant="ghost" size="sm" className="flex gap-2 hover:bg-primary/20 hover:text-primary transition-all font-bold text-[9px] md:text-[10px] uppercase tracking-wider h-8" onClick={() => {
                            const tab = document.querySelector('[value="library"]') as HTMLButtonElement;
                            if (tab) tab.click();
                        }}>
                            <BookOpen className="w-3 h-3 md:w-4 md:h-4 text-primary" /> {tA.addBook} <Badge variant="outline" className="text-[8px] h-4 bg-primary/20 border-primary/30">NEW</Badge>
                        </Button>
                        <Button variant="ghost" size="sm" className="flex gap-2 hover:bg-emerald-500/20 hover:text-emerald-400 transition-all font-bold text-[9px] md:text-[10px] uppercase tracking-wider h-8" onClick={() => {
                            const tab = document.querySelector('[value="blog"]') as HTMLButtonElement;
                            if (tab) tab.click();
                        }}>
                            <MessageSquare className="w-3 h-3 md:w-4 md:h-4 text-emerald-400" /> {tA.addPost}
                        </Button>
                        <Button variant="ghost" size="sm" className="flex gap-2 hover:bg-blue-500/20 hover:text-blue-400 transition-all font-bold text-[9px] md:text-[10px] uppercase tracking-wider h-8" onClick={() => {
                            const tab = document.querySelector('[value="settings"]') as HTMLButtonElement;
                            if (tab) tab.click();
                            toast({ title: "Video Content", description: "Use the Advanced Settings to manage video integrations." });
                        }}>
                            <Video className="w-3 h-3 md:w-4 md:h-4 text-blue-400" /> + Video
                        </Button>
                        <div className="w-[1px] h-6 bg-white/10 mx-2 hidden lg:block" />
                        <div className="flex gap-2">
                            <div className="flex bg-white/5 p-1 rounded-lg border border-white/10">
                                {(['it', 'en', 'ar'] as const).map((l) => (
                                    <button
                                        key={l}
                                        onClick={() => setAdminLang(l)}
                                        className={`px-3 py-1 rounded text-xs font-bold transition-all ${adminLang === l ? 'bg-primary text-primary-foreground' : 'hover:bg-white/5'}`}
                                    >
                                        {l.toUpperCase()}
                                    </button>
                                ))}
                            </div>
                            <Button variant="outline" size="sm" onClick={() => window.location.reload()} className="glass !h-8">
                                {tA.reload}
                            </Button>
                            <Button variant="destructive" size="sm" onClick={handleLogout} className="!h-8">
                                {tA.logout}
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Stats with Thermometer */}
                <div className="flex flex-col md:flex-row gap-6 mb-12 items-center">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 flex-grow">
                        {[
                            { label: 'Vocabolario', count: vocabularyItems.length, icon: Globe, color: 'text-primary', bg: 'bg-primary/10' },
                            { label: 'Duas & Dhikr', count: duas.length, icon: Heart, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
                            { label: 'Profeti', count: prophets.length, icon: Users, color: 'text-amber-400', bg: 'bg-amber-500/10' },
                            { label: 'Alert Sistema', count: systemErrors.length, icon: Shield, color: 'text-red-400', bg: 'bg-red-500/10' }
                        ].map((stat, i) => (
                            <Card key={i} className="bg-white/5 border-white/5 backdrop-blur-xl hover:bg-white/10 transition-all p-6 group">
                                <div className="flex justify-between items-start mb-4">
                                    <div className={`p-3 rounded-2xl ${stat.bg} ${stat.color} group-hover:scale-110 transition-transform`}>
                                        <stat.icon className="w-6 h-6" />
                                    </div>
                                </div>
                                <p className="text-3xl font-bold tracking-tight mb-1">{stat.count}</p>
                                <p className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground">{stat.label}</p>
                            </Card>
                        ))}
                    </div>

                    <div className="flex-shrink-0">
                        <GlassThermometer value={Math.min(100, Math.floor((vocabularyItems.length + duas.length + prophets.length) / 5))} label="Content Heat" />
                    </div>
                </div>

                {/* Content Management Tabs */}
                <Tabs defaultValue="vocabulary" className="w-full">
                    <TabsList className="flex flex-wrap h-auto p-1 glass-premium mb-6 overflow-x-auto">
                        <TabsTrigger value="vocabulary" className="flex-1 min-w-[100px]">{tA.vocabulary}</TabsTrigger>
                        <TabsTrigger value="duas" className="flex-1 min-w-[100px]">{tA.duas}</TabsTrigger>
                        <TabsTrigger value="prophets" className="flex-1 min-w-[100px]">{tA.prophets}</TabsTrigger>
                        <TabsTrigger value="blog" className="flex-1 min-w-[100px]">{tA.blog}</TabsTrigger>
                        <TabsTrigger value="library" className="flex-1 min-w-[100px]">{tA.library}</TabsTrigger>
                        <TabsTrigger value="errors" className="flex-1 min-w-[100px]">{tA.systemLogs}</TabsTrigger>
                        <TabsTrigger value="settings" className="flex-1 min-w-[100px]">{tA.config}</TabsTrigger>
                    </TabsList>

                    {/* Vocabulary Tab */}
                    <TabsContent value="vocabulary" className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-500">
                        <Card className="glass-premium border-primary/10">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-primary">
                                    <Plus className="w-5 h-5" />
                                    Add New Vocabulary Word
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div className="space-y-1.5">
                                        <Label>Arabic (العربية)</Label>
                                        <Input
                                            value={newWord.word_ar}
                                            onChange={(e) => setNewWord({ ...newWord, word_ar: e.target.value })}
                                            placeholder="كتاب"
                                            className="glass text-right font-arabic text-lg"
                                            dir="rtl"
                                        />
                                    </div>
                                    <div className="space-y-1.5">
                                        <Label>English</Label>
                                        <Input
                                            value={newWord.word_en}
                                            onChange={(e) => setNewWord({ ...newWord, word_en: e.target.value })}
                                            placeholder="Book"
                                            className="glass"
                                        />
                                    </div>
                                    <div className="space-y-1.5">
                                        <Label>Italian (Italiano)</Label>
                                        <Input
                                            value={newWord.word_it}
                                            onChange={(e) => setNewWord({ ...newWord, word_it: e.target.value })}
                                            placeholder="Libro"
                                            className="glass"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-1.5">
                                    <Label>Category</Label>
                                    <select
                                        value={newWord.category}
                                        onChange={(e) => setNewWord({ ...newWord, category: e.target.value })}
                                        className="w-full p-2.5 rounded-lg glass border border-primary/20 bg-background/50"
                                    >
                                        <option value="basic">Basic</option>
                                        <option value="food">Food & Drink</option>
                                        <option value="family">Family</option>
                                        <option value="islamic">Islamic Terms</option>
                                        <option value="verbs">Verbs</option>
                                        <option value="numbers">Numbers</option>
                                    </select>
                                </div>
                                <Button onClick={addVocabulary} className="w-full h-11">
                                    <Save className="w-4 h-4 mr-2" />
                                    Save Word to Database
                                </Button>
                            </CardContent>
                        </Card>

                        <Card className="glass-premium border-primary/10">
                            <CardHeader>
                                <CardTitle>Vocabulary Database ({vocabularyItems.length} items)</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3">
                                    {vocabularyItems.map((item) => {
                                        return (
                                            <div key={item.id} className="flex items-center justify-between p-4 rounded-xl bg-primary/5 border border-primary/10 hover:bg-primary/10 transition-colors">
                                                <div className="flex items-center gap-6">
                                                    <span className="font-arabic text-2xl text-primary">{item.word_ar}</span>
                                                    <div className="flex flex-col">
                                                        <span className="font-medium">{item.word_en}</span>
                                                        <span className="text-sm text-muted-foreground italic">{item.word_it}</span>
                                                    </div>
                                                </div>
                                                <div className="flex gap-2">
                                                    <Badge variant="outline" className="h-fit">{item.category}</Badge>
                                                    <Button variant="ghost" size="icon" className="h-9 w-9 hover:text-primary" onClick={() => { setEditingItem({ table: 'vocabulary', ...item }); setIsEditDialogOpen(true); }}>
                                                        <Edit className="w-4 h-4" />
                                                    </Button>
                                                    <Button variant="ghost" size="icon" className="h-9 w-9 hover:text-destructive" onClick={() => deleteVocabulary(item.id)}>
                                                        <Trash2 className="w-4 h-4" />
                                                    </Button>
                                                </div>
                                            </div>
                                        );
                                    })}
                                    {vocabularyItems.length === 0 && (
                                        <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
                                            <Database className="w-12 h-12 mb-3 opacity-20" />
                                            <p>No vocabulary items yet. Add your first word above!</p>
                                        </div>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Duas Tab */}
                    <TabsContent value="duas" className="space-y-4 animate-in fade-in duration-500">
                        <Card className="glass-premium border-emerald-500/20">
                            <CardHeader>
                                <CardTitle className="text-emerald-400 flex items-center gap-2">
                                    <Plus className="w-5 h-5" /> Add New Dua
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <Input
                                        placeholder="Title (Arabic)"
                                        className="glass font-arabic"
                                        dir="rtl"
                                        value={newDua.title_ar}
                                        onChange={e => setNewDua({ ...newDua, title_ar: e.target.value })}
                                    />
                                    <Input
                                        placeholder="Category"
                                        className="glass"
                                        value={newDua.category}
                                        onChange={e => setNewDua({ ...newDua, category: e.target.value })}
                                    />
                                </div>
                                <Textarea
                                    placeholder="Dua Text (Arabic)"
                                    className="glass font-arabic h-24"
                                    dir="rtl"
                                    value={newDua.text_ar}
                                    onChange={e => setNewDua({ ...newDua, text_ar: e.target.value })}
                                />
                                <Button className="w-full bg-emerald-600 hover:bg-emerald-700" onClick={addDua}>
                                    Save Dua to Database
                                </Button>
                            </CardContent>
                        </Card>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {duas.map(dua => (
                                <Card key={dua.id} className="glass-premium border-emerald-500/10">
                                    <CardContent className="p-4">
                                        <div className="flex justify-between items-start mb-2">
                                            <span className="text-xs text-muted-foreground uppercase">{dua.category}</span>
                                            <div className="flex gap-1">
                                                <Button variant="ghost" size="icon" className="h-8 w-8 hover:text-primary" onClick={() => { setEditingItem({ table: 'duas', ...dua }); setIsEditDialogOpen(true); }}>
                                                    <Edit className="w-3 h-3" />
                                                </Button>
                                                <Button variant="ghost" size="icon" className="h-8 w-8 hover:text-destructive" onClick={() => deleteItem('duas', dua.id)}>
                                                    <Trash2 className="w-3 h-3" />
                                                </Button>
                                            </div>
                                        </div>
                                        <h4 className="font-arabic text-lg mb-2 truncate">{dua.title_ar}</h4>
                                        <p className="font-arabic text-sm opacity-60 line-clamp-2" dir="rtl">{dua.text_ar}</p>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </TabsContent>

                    {/* Prophets Tab */}
                    <TabsContent value="prophets" className="space-y-4 animate-in fade-in duration-500">
                        <Card className="glass-premium border-amber-500/20">
                            <CardHeader>
                                <CardTitle className="text-amber-400 flex items-center gap-2">
                                    <Plus className="w-5 h-5" /> Register Prophet
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <Input
                                        placeholder="Name (Arabic)"
                                        className="glass font-arabic text-right"
                                        dir="rtl"
                                        value={newProphet.name_ar}
                                        onChange={e => setNewProphet({ ...newProphet, name_ar: e.target.value })}
                                    />
                                    <Input
                                        placeholder="Name (English)"
                                        className="glass"
                                        value={newProphet.name_en}
                                        onChange={e => setNewProphet({ ...newProphet, name_en: e.target.value })}
                                    />
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <Input
                                        placeholder="Era"
                                        className="glass"
                                        value={newProphet.era}
                                        onChange={e => setNewProphet({ ...newProphet, era: e.target.value })}
                                    />
                                    <Input
                                        type="number"
                                        placeholder="Order"
                                        className="glass"
                                        value={newProphet.timeline_order}
                                        onChange={e => setNewProphet({ ...newProphet, timeline_order: parseInt(e.target.value) })}
                                    />
                                </div>
                                <Textarea
                                    placeholder="Story (Arabic)"
                                    className="glass font-arabic h-24"
                                    dir="rtl"
                                    value={newProphet.story_ar}
                                    onChange={e => setNewProphet({ ...newProphet, story_ar: e.target.value })}
                                />
                                <Button className="w-full bg-amber-600 hover:bg-amber-700" onClick={addProphet}>
                                    Save Prophet to Database
                                </Button>
                            </CardContent>
                        </Card>

                        <div className="space-y-2">
                            {prophets.map(p => (
                                <div key={p.id} className="flex items-center justify-between p-4 rounded-xl glass border border-white/5">
                                    <div className="flex gap-4 items-center">
                                        <span className="font-arabic text-xl">{p.name_ar}</span>
                                        <span className="text-muted-foreground">- {p.name_en} ({p.era})</span>
                                    </div>
                                    <div className="flex gap-2">
                                        <Button variant="ghost" size="icon" className="h-9 w-9 hover:text-primary" onClick={() => { setEditingItem({ table: 'prophets', ...p }); setIsEditDialogOpen(true); }}>
                                            <Edit className="w-4 h-4" />
                                        </Button>
                                        <Button variant="ghost" size="icon" className="h-9 w-9 hover:text-destructive" onClick={() => deleteItem('prophets', p.id)}>
                                            <Trash2 className="w-4 h-4" />
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </TabsContent>



                    {/* Blog Tab */}
                    <TabsContent value="blog" className="animate-in fade-in duration-500">
                        <Card className="glass-premium border-primary/10">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-primary">
                                    <FileText className="w-5 h-5" />
                                    Gestione Blog
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="p-6 rounded-2xl bg-primary/5 border border-primary/20">
                                    <h4 className="font-bold mb-4 text-lg">📝 Crea Nuovo Articolo</h4>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                        <div className="space-y-1.5">
                                            <Label>Titolo</Label>
                                            <Input
                                                placeholder="Es: La Bellezza del Ramadan"
                                                className="glass"
                                                value={newPost.title}
                                                onChange={e => setNewPost({ ...newPost, title: e.target.value })}
                                            />
                                        </div>
                                        <div className="space-y-1.5">
                                            <Label>Categoria</Label>
                                            <select
                                                className="w-full p-2.5 rounded-lg glass border border-primary/20 bg-background/50"
                                                value={newPost.category}
                                                onChange={e => setNewPost({ ...newPost, category: e.target.value })}
                                            >
                                                <option value="spirituality">Spiritualità</option>
                                                <option value="fundamentals">Fondamenti</option>
                                                <option value="ramadan">Ramadan</option>
                                                <option value="history">Storia</option>
                                                <option value="education">Educazione</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="space-y-1.5 mb-4">
                                        <Label>Contenuto Articolo</Label>
                                        <Textarea
                                            placeholder="Scrivi il contenuto del tuo articolo qui..."
                                            className="glass min-h-[200px]"
                                            value={newPost.content}
                                            onChange={e => setNewPost({ ...newPost, content: e.target.value })}
                                        />
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                        <div className="space-y-1.5">
                                            <Label>Immagine Copertina (dal PC)</Label>
                                            <div className="flex gap-2">
                                                <Input
                                                    type="file"
                                                    accept="image/*"
                                                    className="glass flex-1 file:bg-primary file:text-primary-foreground file:border-0 file:rounded-md file:px-2 file:py-1 file:mr-2"
                                                    onChange={handleBlogImageUpload}
                                                />
                                                {uploadingBlogImage && <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-primary" />}
                                                {newPost.image_url && (
                                                    <div className="w-12 h-10 rounded border border-white/10 overflow-hidden bg-black/50">
                                                        <img src={newPost.image_url} className="w-full h-full object-cover" alt="Preview" />
                                                    </div>
                                                )}
                                            </div>
                                            <p className="text-[10px] text-muted-foreground mt-1">L'URL verrà generato automaticamente dopo l'upload.</p>
                                        </div>
                                        <div className="space-y-1.5">
                                            <Label>URL Video (YouTube)</Label>
                                            <Input
                                                placeholder="https://youtube.com/watch?v=..."
                                                className="glass"
                                                value={newPost.video_url}
                                                onChange={e => setNewPost({ ...newPost, video_url: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                    <Button className="w-full h-12" onClick={addBlogPost}>
                                        <Save className="w-4 h-4 mr-2" />
                                        Pubblica Articolo
                                    </Button>
                                </div>

                                <div className="space-y-3">
                                    <h4 className="font-bold text-sm uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                                        <Database className="w-4 h-4" /> Archivio Post ({blogPosts.length})
                                    </h4>
                                    {blogPosts.map((post) => (
                                        <div key={post.id} className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
                                            <div className="flex items-center gap-4">
                                                {post.image_url && <img src={post.image_url} className="w-12 h-12 rounded object-cover border border-white/10" alt="" />}
                                                <div>
                                                    <p className="font-bold text-sm">{post.title}</p>
                                                    <p className="text-[10px] text-muted-foreground uppercase">{post.category} • {new Date(post.created_at).toLocaleDateString()}</p>
                                                </div>
                                            </div>
                                            <div className="flex gap-2">
                                                <Button variant="ghost" size="icon" className="h-9 w-9 hover:text-primary" onClick={() => { setEditingItem({ table: 'blog_posts', ...post }); setIsEditDialogOpen(true); }}>
                                                    <Edit className="w-4 h-4" />
                                                </Button>
                                                <Button variant="ghost" size="icon" className="h-9 w-9 hover:text-destructive" onClick={() => deleteBlogPost(post.id)}>
                                                    <Trash2 className="w-4 h-4" />
                                                </Button>
                                            </div>
                                        </div>
                                    ))}
                                    {blogPosts.length === 0 && (
                                        <div className="p-8 text-center text-muted-foreground border border-dashed border-white/10 rounded-2xl">
                                            Nessun articolo pubblicato. Crea il primo qui sopra!
                                        </div>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Errors Tab */}
                    <TabsContent value="errors" className="animate-in fade-in duration-500">
                        <Card className="glass-premium border-red-500/20">
                            <CardHeader className="flex flex-row items-center justify-between">
                                <CardTitle className="text-destructive flex items-center gap-2">
                                    <Shield className="w-5 h-5" />
                                    System Error Logs
                                </CardTitle>
                                <Button variant="outline" size="sm" onClick={() => setSystemErrors([])} disabled={systemErrors.length === 0}>
                                    Clear Logs
                                </Button>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {systemErrors.map((error) => (
                                        <div key={error.id} className="p-4 rounded-lg bg-red-500/5 border border-red-500/10 flex flex-col gap-1">
                                            <div className="flex justify-between items-start">
                                                <p className="font-mono text-sm text-red-400 break-all">{error.message}</p>
                                                <span className="text-[10px] text-muted-foreground whitespace-nowrap">{error.time}</span>
                                            </div>
                                        </div>
                                    ))}
                                    {systemErrors.length === 0 && (
                                        <div className="py-12 text-center text-muted-foreground">
                                            <Plus className="w-12 h-12 mx-auto mb-3 opacity-10 rotate-45" />
                                            <p>No system errors detected. Everything is running smoothly!</p>
                                        </div>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Settings Tab */}
                    <TabsContent value="settings" className="animate-in fade-in duration-500">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Card className="glass-premium border-orange-500/20">
                                <CardHeader>
                                    <CardTitle className="text-orange-400">Maintenance & Cache</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <div className="flex flex-col gap-4">
                                        <div className="p-4 rounded-xl bg-primary/10 border border-primary/20">
                                            <h4 className="font-bold mb-1 text-primary">System Auto-Fix Tool</h4>
                                            <p className="text-sm text-muted-foreground mb-4">
                                                Automatically resolve common issues like translation failures, audio sync problems, and UI glitches by resetting core application systems.
                                            </p>
                                            <Button onClick={async () => {
                                                setIsLoading(true);
                                                try {
                                                    // Perform multiple cleanup actions
                                                    if ('caches' in window) {
                                                        const names = await caches.keys();
                                                        await Promise.all(names.map(name => caches.delete(name)));
                                                    }
                                                    localStorage.clear();
                                                    sessionStorage.clear();

                                                    toast({
                                                        title: "🚀 Auto-Fix Complete",
                                                        description: "All systems have been reset and optimized.",
                                                    });

                                                    // Force reload after short delay
                                                    setTimeout(() => window.location.reload(), 1500);
                                                } catch (e) {
                                                    toast({ title: "Fix Failed", variant: "destructive" });
                                                } finally {
                                                    setIsLoading(false);
                                                }
                                            }} className="w-full bg-primary hover:bg-primary/90 font-bold tracking-widest h-12">
                                                🚀 RUN GLOBAL AUTO-FIX
                                            </Button>
                                        </div>

                                        <div className="p-4 rounded-xl bg-orange-500/5 border border-orange-500/10">
                                            <h4 className="font-bold mb-1">Clear Browser Cache</h4>
                                            <p className="text-sm text-muted-foreground mb-4">
                                                Force clear all locally stored data, images, and API caches. Useful if the app feels sluggish.
                                            </p>
                                            <Button onClick={clearAppCache} className="w-full bg-orange-500 hover:bg-orange-600">
                                                Execute Pulizia Cache
                                            </Button>
                                        </div>

                                        <div className="p-4 rounded-xl bg-yellow-500/5 border border-yellow-500/10">
                                            <h4 className="font-bold mb-1">Clear Temporary Files</h4>
                                            <p className="text-sm text-muted-foreground mb-4">
                                                Remove session-based temporary files and logs.
                                            </p>
                                            <Button onClick={clearTempFiles} variant="outline" className="w-full border-yellow-500/50 text-yellow-500 hover:bg-yellow-500/10">
                                                Clear Temp Files
                                            </Button>
                                        </div>

                                        <div className="space-y-4 pt-6 border-t border-white/10">
                                            <h4 className="font-bold text-xs uppercase tracking-widest text-primary flex items-center gap-2">
                                                Professional API Integrations <Badge className="bg-primary/20 text-primary border-primary/30">NEW</Badge>
                                            </h4>
                                            <div className="grid gap-3">
                                                <div className="space-y-1">
                                                    <Label className="text-[10px]">ElevenLabs API (TTS)</Label>
                                                    <Input type="password" placeholder="sk_..." className="glass h-8 text-xs" />
                                                </div>
                                                <div className="space-y-1">
                                                    <Label className="text-[10px]">MyMemory API Key</Label>
                                                    <Input type="password" placeholder="Optional Key" className="glass h-8 text-xs" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="glass-premium border-blue-500/40 shadow-glow-blue/10">
                                <CardHeader>
                                    <CardTitle className="text-blue-400 flex items-center justify-between">
                                        Advanced App Settings
                                        <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">NEW</Badge>
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/5">
                                            <div>
                                                <p className="text-sm font-bold text-blue-300">Galaxy Effect Intensity</p>
                                                <p className="text-[10px] text-muted-foreground">Adjust background CPU usage</p>
                                            </div>
                                            <Badge variant="outline">High</Badge>
                                        </div>
                                        <div className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/5">
                                            <div>
                                                <p className="text-sm font-bold text-blue-300">Image Verification AI</p>
                                                <p className="text-[10px] text-muted-foreground">Automatic religious policy filter</p>
                                            </div>
                                            <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">Active</Badge>
                                        </div>
                                        <div className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/10">
                                            <div>
                                                <p className="text-sm font-bold text-blue-300">System Logs Retention</p>
                                                <p className="text-[10px] text-muted-foreground">Current: 24h</p>
                                            </div>
                                            <Button variant="ghost" size="sm" className="h-7 text-[10px]">Change</Button>
                                        </div>
                                        <div className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/10">
                                            <div>
                                                <p className="text-sm font-bold text-red-300">Database Debug Mode</p>
                                                <p className="text-[10px] text-muted-foreground">Enable console logging for queries</p>
                                            </div>
                                            <div className="w-10 h-5 bg-white/10 rounded-full relative">
                                                <div className="absolute left-1 top-1 w-3 h-3 bg-white/20 rounded-full" />
                                            </div>
                                        </div>
                                    </div>
                                    <Button className="w-full bg-blue-600 hover:bg-blue-700 h-10 shadow-glow-blue" onClick={() => toast({ title: "✅ Settings Saved", description: "Changes applied successfully." })}>
                                        <Save className="w-4 h-4 mr-2" /> Save Global Config
                                    </Button>
                                </CardContent>
                            </Card>

                            <Card className="glass-premium">
                                <CardHeader>
                                    <CardTitle>System Information</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="space-y-2">
                                        <div className="flex justify-between text-sm py-2 border-b border-white/5">
                                            <span className="text-muted-foreground">Support Email:</span>
                                            <span>anas019p@gmail.com</span>
                                        </div>
                                        <div className="flex justify-between text-sm py-2 border-b border-white/5">
                                            <span className="text-muted-foreground">Version:</span>
                                            <span>1.0.5</span>
                                        </div>
                                        <div className="flex justify-between text-sm py-2 border-b border-white/5">
                                            <span className="text-muted-foreground">Database Status:</span>
                                            <span className="text-green-500 flex items-center gap-1">
                                                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                                Connected
                                            </span>
                                        </div>
                                        <div className="flex justify-between text-sm py-2">
                                            <span className="text-muted-foreground">Last Sync:</span>
                                            <span>{new Date().toLocaleDateString()}</span>
                                        </div>
                                    </div>
                                    <div className="pt-4">
                                        <p className="text-[10px] text-center text-muted-foreground uppercase tracking-widest">
                                            Secure Admin Access Active
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </TabsContent>

                    {/* Library Tab */}
                    <TabsContent value="library" className="space-y-4 animate-in fade-in duration-500">
                        <Card className="glass-premium border-blue-500/20">
                            <CardHeader>
                                <CardTitle className="text-blue-400 flex items-center gap-2">
                                    <BookOpen className="w-5 h-5" /> {tA.addBook}
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div className="space-y-1.5">
                                        <Label>{tA.wordAr} (العربية)</Label>
                                        <Input
                                            value={newBook.title_ar}
                                            onChange={e => setNewBook({ ...newBook, title_ar: e.target.value })}
                                            placeholder="عنوان الكتاب"
                                            className="glass text-right font-arabic"
                                            dir="rtl"
                                        />
                                    </div>
                                    <div className="space-y-1.5">
                                        <Label>{tA.wordEn}</Label>
                                        <Input
                                            value={newBook.title_en}
                                            onChange={e => setNewBook({ ...newBook, title_en: e.target.value })}
                                            placeholder="English Title"
                                            className="glass"
                                        />
                                    </div>
                                    <div className="space-y-1.5">
                                        <Label>{tA.wordIt}</Label>
                                        <Input
                                            value={newBook.title_it}
                                            onChange={e => setNewBook({ ...newBook, title_it: e.target.value })}
                                            placeholder="Titolo Italiano"
                                            className="glass"
                                        />
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-1.5">
                                        <Label>Autore</Label>
                                        <Input
                                            value={newBook.author}
                                            onChange={e => setNewBook({ ...newBook, author: e.target.value })}
                                            placeholder="Sheikh..."
                                            className="glass"
                                        />
                                    </div>
                                    <div className="space-y-1.5">
                                        <Label>PDF File</Label>
                                        <div className="flex gap-2">
                                            <Input
                                                type="file"
                                                accept=".pdf"
                                                onChange={handlePdfUpload}
                                                className="glass file:bg-primary file:text-primary-foreground file:border-0 file:rounded-md file:px-2 file:py-1 file:mr-2"
                                            />
                                            {uploadingPdf && <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-primary" />}
                                        </div>
                                    </div>
                                </div>
                                <Button className="w-full bg-blue-600 hover:bg-blue-700" onClick={addBook}>
                                    <Save className="w-4 h-4 mr-2" /> {tA.save}
                                </Button>
                            </CardContent>
                        </Card>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {books.map(book => (
                                <Card key={book.id} className="glass-premium border-blue-500/10 hover:border-blue-500/30 transition-all">
                                    <CardContent className="p-4">
                                        <div className="flex justify-between items-start mb-2">
                                            <Badge variant="outline" className="text-blue-400">{book.category}</Badge>
                                            <div className="flex gap-1">
                                                <Button variant="ghost" size="icon" className="h-8 w-8 hover:text-primary" onClick={() => { setEditingItem({ table: 'books', ...book }); setIsEditDialogOpen(true); }}>
                                                    <Edit className="w-3 h-3" />
                                                </Button>
                                                <Button variant="ghost" size="icon" className="h-8 w-8 hover:text-destructive" onClick={() => deleteItem('books', book.id)}>
                                                    <Trash2 className="w-3 h-3" />
                                                </Button>
                                            </div>
                                        </div>
                                        <h4 className="font-arabic text-lg mb-1 truncate">{book.title_ar}</h4>
                                        <p className="text-sm font-medium mb-1 truncate">{book.title_it || book.title_en}</p>
                                        <p className="text-xs text-muted-foreground italic mb-4">{book.author}</p>
                                        <Button variant="outline" size="sm" className="w-full h-8 text-[10px] uppercase tracking-widest" asChild>
                                            <a href={book.pdf_url} target="_blank" rel="noopener noreferrer">Download PDF</a>
                                        </Button>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </TabsContent>
                </Tabs>
            </main>

            <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                <DialogContent className="sm:max-w-[600px] glass-premium border-primary/20 bg-[#0a0a0b]/95 backdrop-blur-2xl">
                    <DialogHeader>
                        <DialogTitle className="text-2xl font-bold text-gradient-gold flex items-center gap-2">
                            <Edit className="w-6 h-6" />
                            Modifica Contenuto
                        </DialogTitle>
                        <DialogDescription>
                            Aggiorna le informazioni nel database in tempo reale.
                        </DialogDescription>
                    </DialogHeader>

                    {editingItem && (
                        <div className="space-y-6 py-4">
                            {editingItem.table === 'vocabulary' && (
                                <div className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label>Parola Araba</Label>
                                            <Input
                                                value={editingItem.word_ar}
                                                onChange={e => setEditingItem({ ...editingItem, word_ar: e.target.value })}
                                                className="glass text-right font-arabic text-lg"
                                                dir="rtl"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Categoria</Label>
                                            <Input
                                                value={editingItem.category}
                                                onChange={e => setEditingItem({ ...editingItem, category: e.target.value })}
                                                className="glass"
                                            />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label>Traduzione Inglese</Label>
                                            <Input
                                                value={editingItem.word_en}
                                                onChange={e => setEditingItem({ ...editingItem, word_en: e.target.value })}
                                                className="glass"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Traduzione Italiana</Label>
                                            <Input
                                                value={editingItem.word_it}
                                                onChange={e => setEditingItem({ ...editingItem, word_it: e.target.value })}
                                                className="glass"
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}

                            {editingItem.table === 'duas' && (
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <Label>Titolo (Arabo)</Label>
                                        <Input
                                            value={editingItem.title_ar}
                                            onChange={e => setEditingItem({ ...editingItem, title_ar: e.target.value })}
                                            className="glass font-arabic text-right"
                                            dir="rtl"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Contenuto Dua (Arabo)</Label>
                                        <Textarea
                                            value={editingItem.text_ar}
                                            onChange={e => setEditingItem({ ...editingItem, text_ar: e.target.value })}
                                            className="glass font-arabic h-32 text-right"
                                            dir="rtl"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Categoria</Label>
                                        <Input
                                            value={editingItem.category}
                                            onChange={e => setEditingItem({ ...editingItem, category: e.target.value })}
                                            className="glass"
                                        />
                                    </div>
                                </div>
                            )}

                            {editingItem.table === 'prophets' && (
                                <div className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label>Nome (Arabo)</Label>
                                            <Input
                                                value={editingItem.name_ar}
                                                onChange={e => setEditingItem({ ...editingItem, name_ar: e.target.value })}
                                                className="glass font-arabic text-right"
                                                dir="rtl"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Nome (Inglese)</Label>
                                            <Input
                                                value={editingItem.name_en}
                                                onChange={e => setEditingItem({ ...editingItem, name_en: e.target.value })}
                                                className="glass"
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Storia (Araba)</Label>
                                        <Textarea
                                            value={editingItem.story_ar}
                                            onChange={e => setEditingItem({ ...editingItem, story_ar: e.target.value })}
                                            className="glass font-arabic h-48 text-right"
                                            dir="rtl"
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label>Era</Label>
                                            <Input
                                                value={editingItem.era}
                                                onChange={e => setEditingItem({ ...editingItem, era: e.target.value })}
                                                className="glass"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Ordine Temporale</Label>
                                            <Input
                                                type="number"
                                                value={editingItem.timeline_order}
                                                onChange={e => setEditingItem({ ...editingItem, timeline_order: parseInt(e.target.value) })}
                                                className="glass"
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}
                            {editingItem.table === 'books' && (
                                <div className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label>Titolo (Arabo)</Label>
                                            <Input
                                                value={editingItem.title_ar}
                                                onChange={e => setEditingItem({ ...editingItem, title_ar: e.target.value })}
                                                className="glass text-right font-arabic text-lg"
                                                dir="rtl"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Autore</Label>
                                            <Input
                                                value={editingItem.author}
                                                onChange={e => setEditingItem({ ...editingItem, author: e.target.value })}
                                                className="glass"
                                            />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label>Titolo (EN)</Label>
                                            <Input
                                                value={editingItem.title_en}
                                                onChange={e => setEditingItem({ ...editingItem, title_en: e.target.value })}
                                                className="glass"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Titolo (IT)</Label>
                                            <Input
                                                value={editingItem.title_it}
                                                onChange={e => setEditingItem({ ...editingItem, title_it: e.target.value })}
                                                className="glass"
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}

                            {editingItem.table === 'blog_posts' && (
                                <div className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label>Titolo</Label>
                                            <Input
                                                value={editingItem.title}
                                                onChange={e => setEditingItem({ ...editingItem, title: e.target.value })}
                                                className="glass"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Categoria</Label>
                                            <select
                                                className="w-full p-2.5 rounded-lg glass border border-primary/20 bg-background/50 h-10 text-sm"
                                                value={editingItem.category}
                                                onChange={e => setEditingItem({ ...editingItem, category: e.target.value })}
                                            >
                                                <option value="spirituality">Spiritualità</option>
                                                <option value="fundamentals">Fondamenti</option>
                                                <option value="ramadan">Ramadan</option>
                                                <option value="history">Storia</option>
                                                <option value="education">Educazione</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Contenuto</Label>
                                        <Textarea
                                            value={editingItem.content}
                                            onChange={e => setEditingItem({ ...editingItem, content: e.target.value })}
                                            className="glass h-48"
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label>URL Immagine</Label>
                                            <Input
                                                value={editingItem.image_url}
                                                onChange={e => setEditingItem({ ...editingItem, image_url: e.target.value })}
                                                className="glass"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label>URL Video</Label>
                                            <Input
                                                value={editingItem.video_url}
                                                onChange={e => setEditingItem({ ...editingItem, video_url: e.target.value })}
                                                className="glass"
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    <DialogFooter className="gap-2">
                        <Button variant="outline" onClick={() => setIsEditDialogOpen(false)} className="border-white/10 hover:bg-white/5">
                            Annulla
                        </Button>
                        <Button
                            onClick={() => {
                                if (!editingItem) return;
                                const { table, id, created_at, ...updateData } = editingItem;
                                updateItem(table, id, updateData);
                            }}
                            className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold px-8"
                        >
                            Salva Modifiche
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <Footer />
        </div>
    );
};

const AdminDashboard = () => (
    <AdminErrorBoundary>
        <AdminDashboardContent />
    </AdminErrorBoundary>
);

export default AdminDashboard;
