import OpenRouterService from '@/lib/OpenRouterService';

export interface BlogPost {
    id: string;
    title: string;
    excerpt: string;
    content: string;
    date: string;
    author: string;
    category: string;
    readTime: string;
    image?: string;
}

const FALLBACK_INSIGHTS = [
    {
        title: "Il Significato della Pazienza nell'Islam",
        excerpt: "La pazienza (Sabr) è uno dei valori fondamentali dell'Islam, menzionata oltre 90 volte nel Corano.",
        content: `## الصَّبْرُ نِصْفُ الإِيمَانِ — La Pazienza è metà della Fede\n\nAllah dice nel Corano:\n> *"O voi che credete! Cercate aiuto nella pazienza e nella preghiera: in verità Allah è con i pazienti."* (Surah Al-Baqarah 2:153)\n\n### Il Hadith\nIl Profeta Muhammad ﷺ disse: *"Nessuno ha ricevuto un dono migliore e più grande della pazienza."* (Bukhari & Muslim)\n\n### Lezione Pratica\nQuando affrontiamo difficoltà, il primo passo è **fermarsi** prima di reagire. Il respiro consapevole (3 volte) prima di rispondere a una provocazione è Sunnah applicata alla vita moderna.\n\n*بارك الله فيكم*`,
        category: "Valori Islamici"
    },
    {
        title: "La Preghiera del Fajr: Il Segreto del Successo",
        excerpt: "Svegliarsi per il Fajr è tra le pratiche più raccomandate, con benefici spirituali e fisici scientificamente provati.",
        content: `## فَجْرٌ — L'Alba dell'Anima\n\nAllah dice nel Corano:\n> *"Stabilisci la preghiera al tramonto del sole fino all'oscurità della notte, e [recita] il Corano dell'alba. In verità, la recitazione dell'alba è testimoniata."* (Al-Isra' 17:78)\n\n### Il Hadith\n*"Le due rak'ah del Fajr sono più preziose del mondo e di tutto ciò che contiene."* (Muslim)\n\n### Applicazione Moderna\nSvegliarsi all'alba per la preghiera allinea il corpo con il ritmo circadiano naturale, migliorando energia e concentrazione per tutta la giornata.\n\n*اللهم بارك لنا في أوقاتنا*`,
        category: "Preghiera"
    },
    {
        title: "Ramadan: La Scuola Mensile della Purificazione",
        excerpt: "Il digiuno del Ramadan non è solo astenersi dal cibo, ma è un mese completo di riforma spirituale.",
        content: `## رَمَضَان — Il Mese della Misericordia\n\nAllah dice nel Corano:\n> *"O voi che credete! Vi è stato prescritto il digiuno, come fu prescritto a coloro che vi hanno preceduto, affinché possiate essere giusti."* (Al-Baqarah 2:183)\n\n### Il Hadith\n*"Chi digiuna il Ramadan con fede e sperando nella ricompensa di Allah, gli verranno perdonati i peccati precedenti."* (Bukhari)\n\n### I Tre Livelli del Digiuno\n1. **Fisico**: Astenersi da cibo e bevande\n2. **Verbale**: Controllare lingua, bugie, calunnie\n3. **Spirituale**: Purificare cuore e intenzioni\n\n*رمضان مبارك*`,
        category: "Ramadan"
    }
];

export class BlogService {
    private static STORAGE_KEY = 'islamic_app_daily_insight_v2';
    private static CACHE_HOURS = 24;
    private static todayISO = () => new Date().toISOString().split('T')[0];

    private static isCacheValid(stored: BlogPost & { cachedAt: string }): boolean {
        if (!stored?.cachedAt) return false;
        const ageMs = Date.now() - new Date(stored.cachedAt).getTime();
        return ageMs < this.CACHE_HOURS * 60 * 60 * 1000;
    }

    private static getFallback(): BlogPost {
        const idx = new Date().getDate() % FALLBACK_INSIGHTS.length;
        const fb = FALLBACK_INSIGHTS[idx];
        const todayISO = new Date().toISOString().split('T')[0];

        const images = [
            'https://images.unsplash.com/photo-1542810634-71277d95dcbb?w=800',
            'https://images.unsplash.com/photo-1564769662533-4f00a87b4056?w=800',
            'https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?w=800'
        ];

        return {
            id: 'fallback-' + todayISO,
            ...fb,
            date: todayISO,
            author: 'Islamic Companion',
            readTime: '3 min',
            image: images[idx % images.length]
        };
    }

    static async getDailyInsight(language: string = 'it'): Promise<BlogPost> {
        const cacheKey = `${this.STORAGE_KEY}_${language}`;

        try {
            const stored = localStorage.getItem(cacheKey);
            if (stored) {
                const parsed = JSON.parse(stored);
                if (this.isCacheValid(parsed) && parsed.title && parsed.content) {
                    return parsed;
                }
            }
        } catch {
            localStorage.removeItem(cacheKey);
        }

        const langMap: Record<string, string> = {
            it: 'italiano',
            en: 'English',
            ar: 'العربية',
            fr: 'français',
            de: 'Deutsch',
            es: 'español'
        };
        const langLabel = langMap[language] || 'italiano';

        const today = new Date().toLocaleDateString('it-IT', { weekday: 'long', day: 'numeric', month: 'long' });
        const topics = ['Tawhid e Fede', 'Preghiera e Dhikr', 'Etica Islamica', 'Storie dei Profeti', 'Saggezza del Corano', 'Sunnah del Profeta ﷺ', 'Famiglia nell Islam'];
        const topic = topics[new Date().getDate() % topics.length];

        const images = [
            'https://images.unsplash.com/photo-1542810634-71277d95dcbb?w=800',
            'https://images.unsplash.com/photo-1564769662533-4f00a87b4056?w=800',
            'https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=800',
            'https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?w=800',
            'https://images.unsplash.com/photo-1519817650390-64a93db51149?w=800'
        ];
        const image = images[new Date().getDate() % images.length];

        const prompt = `Sei un accademico islamico specializzato nella formazione di predicatori (Du'at).

Scrivi un articolo FORMATIVO (non solo informativo) in ${langLabel} per aspiranti predicatori per oggi (${today}).
Argomento: ${topic}

STRUTTURA RICHIESTA (ritorna SOLO JSON valido, senza markdown code block):
{
  "title": "Titolo accademico in ${langLabel}",
  "excerpt": "Riassunto analitico di 2 frasi in ${langLabel}",
  "content": "Articolo completo in ${langLabel} seguendo questa struttura:\n\n## Introduzione Accademica\n- Versetto coranico pertinente (numero sura:versetto)\n- Contesto della rivelazione\n\n## Analisi Filologica\n- Spiegazione dei termini chiave in arabo classico\n\n## Hadith Autentici\n- Almeno 2 Hadith con fonte completa (es. Sahih Bukhari)\n- Grado di autenticità\n\n## Applicazione per il Predicatore Moderno\n- Come usare questa conoscenza nella Da'wah\n- Errori comuni da evitare\n\n## Conclusione con Dua\n- Dua pertinente in arabo con traduzione\n\nUsa Markdown (##, >, **testo**). Minimo 800 parole.",
  "category": "Formazione Predicatori"
}

IMPORTANTE: Evita riferimenti a immagini di persone. Focalizzati su saggezza, spiritualità e pratica quotidiana.`;

        try {
            const response = await OpenRouterService.generateContent(prompt, 'google/gemini-2.0-flash-lite-preview-02-05:free');

            if (!response) throw new Error('AI Response is empty');

            const jsonStart = response.indexOf('{');
            const jsonEnd = response.lastIndexOf('}') + 1;

            if (jsonStart === -1 || jsonEnd === -1) throw new Error('No valid JSON found');

            const clean = response.substring(jsonStart, jsonEnd).trim();
            const json = JSON.parse(clean);

            if (!json.title || !json.content) throw new Error('Invalid structure');

            const todayISO = new Date().toISOString().split('T')[0];
            const newPost: BlogPost & { cachedAt: string } = {
                id: `daily-${language}-${Date.now()}`,
                title: json.title,
                excerpt: json.excerpt || json.content.substring(0, 150) + '...',
                content: json.content,
                date: todayISO,
                author: language === 'it' ? 'Studioso AI' : 'AI Scholar',
                category: json.category || topic,
                readTime: `${Math.ceil(json.content.split(' ').length / 200)} min`,
                image: image,
                cachedAt: new Date().toISOString()
            };

            localStorage.setItem(cacheKey, JSON.stringify(newPost));
            return newPost;
        } catch (error) {
            console.error('[BlogService] AI generation failed, using fallback:', error);
            return this.getFallback();
        }
    }

    static async regenerate(language: string = 'it'): Promise<BlogPost> {
        localStorage.removeItem(`${this.STORAGE_KEY}_${language}`);
        return this.getDailyInsight(language);
    }

    static clearCache(): void {
        Object.keys(localStorage)
            .filter(k => k.startsWith(this.STORAGE_KEY))
            .forEach(k => localStorage.removeItem(k));
    }
}
