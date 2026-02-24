import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Book, Library, ChevronRight, Star, ExternalLink } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { ScrollArea } from './ui/scroll-area';
import { Card, CardContent } from './ui/card';

interface HubCardProps {
    id: string;
    title: string;
    category: string;
    author: string;
    description: string;
}

const shamilaBooks = [
    { id: '1', title: 'Sahih al-Bukhari', category: 'Hadith', author: 'Al-Bukhari', description: 'La raccolta più autentica di tradizioni profetiche.' },
    { id: '2', title: 'Tafsir ibn Kathir', category: 'Tafsir', author: 'Ibn Kathir', description: 'Uno dei commentari coranici più celebri e autorevoli.' },
    { id: '3', title: 'Al-Bidayah wan-Nihayah', category: 'Storia', author: 'Ibn Kathir', description: 'Una cronaca della storia del mondo dalla creazione alla fine dei tempi.' },
    { id: '4', title: 'Riyad as-Salihin', category: 'Etica', author: 'Imam an-Nawawi', description: 'Il giardino dei giusti, una guida alla condotta morale.' },
    { id: '5', title: 'Al-Aqidah al-Wasitiyyah', category: 'Aqidah', author: 'Ibn Taymiyyah', description: 'Un testo fondamentale sul credo islamico.' },
    { id: '6', title: 'Fath al-Bari', category: 'Hadith', author: 'Ibn Hajar al-Asqalani', description: 'Il commentario monumentale del Sahih al-Bukhari.' },
    { id: '7', title: 'Sahih Muslim', category: 'Hadith', author: 'Muslim ibn al-Hajjaj', description: 'Una delle sei principali raccolte di hadith nell\'Islam sunnita.' },
    { id: '8', title: 'Sunan Abu Dawood', category: 'Hadith', author: 'Abu Dawood', description: 'Una raccolta di hadith incentrata su tradizioni legali.' },
    { id: '9', title: 'Jami` at-Tirmidhi', category: 'Hadith', author: 'At-Tirmidhi', description: 'Una delle sei principali raccolte di hadith.' },
    { id: '10', title: 'Sunan an-Nasa\'i', category: 'Hadith', author: 'An-Nasa\'i', description: 'Una raccolta nota per i suoi criteri rigorosi di selezione.' },
    { id: '11', title: 'Sunan Ibn Majah', category: 'Hadith', author: 'Ibn Majah', description: 'L\'ultima delle sei principali raccolte di hadith sunniti.' },
    { id: '12', title: 'Al-Muwatta', category: 'Fiqh', author: 'Imam Malik', description: 'La prima formulazione scritta della legge islamica.' },
    { id: '13', title: 'Tafsir al-Tabari', category: 'Tafsir', author: 'Al-Tabari', description: 'Uno dei primi e più influenti commentari del Corano.' },
    { id: '14', title: 'Ihya Ulum al-Din', category: 'Spiritualità', author: 'Al-Ghazali', description: 'La rinascita delle scienze religiose, un capolavoro spirituale.' },
    { id: '15', title: 'Mukhtasar Khalil', category: 'Fiqh', author: 'Khalil ibn Ishaq', description: 'Il testo standard per la giurisprudenza Maliki.' },
    { id: '16', title: 'Risalah al-Qushayriyyah', category: 'Sufismo', author: 'Al-Qushayri', description: 'Un testo classico sulla scienza del sufismo.' },
    { id: '17', title: 'Kitab al-Tawhid', category: 'Aqidah', author: 'Muhammad ibn Abd al-Wahhab', description: 'Un libro che spiega il concetto di monoteismo nell\'Islam.' },
    { id: '18', title: 'Bulugh al-Maram', category: 'Hadith', author: 'Ibn Hajar al-Asqalani', description: 'Una raccolta di hadith che costituiscono la base per la giurisprudenza shafi\'ita.' },
    { id: '19', title: 'Zad al-Ma\'ad', category: 'Sirah', author: 'Ibn Qayyim al-Jawziyya', description: 'Guida alla vita del Profeta Muhammad (pace su di lui).' },
    { id: '20', title: 'Al-Adab al-Mufrad', category: 'Etica', author: 'Al-Bukhari', description: 'Una raccolta di hadith incentrata sulle buone maniere e il comportamento.' }
];

export const ShamilaExplorer = () => {
    const [search, setSearch] = useState('');

    const filtered = shamilaBooks.filter(book =>
        book.title.toLowerCase().includes(search.toLowerCase()) ||
        book.category.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <section className="space-y-6">
            <div className="flex items-center justify-between gap-4 mb-4">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20">
                        <Library className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold font-amiri text-primary">Shamila Explorer</h3>
                        <p className="text-[10px] uppercase tracking-widest text-muted-foreground opacity-60 italic">Navigazione Testi Classici</p>
                    </div>
                </div>
                <div className="relative w-64 group">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary/50 group-focus-within:text-primary transition-colors" />
                    <Input
                        placeholder="Cerca tra i volumi..."
                        className="pl-9 h-10 glass border-primary/20 rounded-xl text-xs"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
            </div>

            <ScrollArea className="h-[400px] pr-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {filtered.map((book) => (
                        <motion.div
                            key={book.id}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            whileHover={{ y: -5 }}
                            className="cursor-pointer"
                        >
                            <Card className="bg-primary/[0.03] border-primary/10 hover:border-primary/30 transition-all duration-300 relative overflow-hidden h-full group">
                                <div className="absolute top-0 right-0 p-3">
                                    <Star className="w-3 h-3 text-primary opacity-20 group-hover:opacity-100 transition-opacity" />
                                </div>
                                <CardContent className="p-5 space-y-3">
                                    <div className="flex items-start justify-between">
                                        <div>
                                            <Badge variant="outline" className="text-[8px] uppercase tracking-tighter border-primary/30 text-primary mb-2">
                                                {book.category}
                                            </Badge>
                                            <h4 className="font-bold text-base font-amiri group-hover:text-primary transition-colors">{book.title}</h4>
                                            <p className="text-[10px] text-muted-foreground italic">{book.author}</p>
                                        </div>
                                    </div>
                                    <p className="text-[11px] text-foreground/70 leading-relaxed line-clamp-2">
                                        {book.description}
                                    </p>
                                    <div className="flex items-center justify-between pt-2 border-t border-primary/5">
                                        <span className="text-[9px] uppercase tracking-widest opacity-50">Volume Completo</span>
                                        <Button variant="ghost" size="sm" className="h-8 text-[10px] hover:bg-primary/10 group">
                                            Esplora <ChevronRight className="w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform" />
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </ScrollArea>

            <div className="p-4 rounded-2xl bg-primary/5 border border-primary/20 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-emerald-500/10">
                        <ExternalLink className="w-4 h-4 text-emerald-500" />
                    </div>
                    <p className="text-[10px] text-muted-foreground uppercase tracking-widest leading-none">
                        Accesso diretto all'archivio <span className="text-primary font-bold">Maktaba Shamila Web</span>
                    </p>
                </div>
                <Button variant="outline" size="sm" className="h-8 text-[9px] border-emerald-500/30 hover:bg-emerald-500/10" onClick={() => window.open('https://shamela.ws', '_blank')}>
                    Open Official Site
                </Button>
            </div>
        </section>
    );
};
