const QURAN_API_BASE = 'https://api.alquran.cloud/v1';
const HADITH_API_BASE = 'https://hadith-api-six.vercel.app/api'; // Sample open hadith API

export interface ApiSurah {
    number: number;
    name: string;
    englishName: string;
    englishNameTranslation: string;
    numberOfAyahs: number;
    revelationType: string;
}

export interface ApiAyah {
    number: number;
    text: string;
    numberInSurah: number;
    juz: number;
    manzil: number;
    page: number;
    ruku: number;
    hizbQuarter: number;
}

export const islamicApi = {
    // Quran Methods
    async getAllSurahs(): Promise<ApiSurah[]> {
        const res = await fetch(`${QURAN_API_BASE}/surah`);
        const data = await res.json();
        return data.data;
    },

    async getSurahWithDetails(number: number, language: string = 'en.sahih') {
        // Fetch Arabic and Translation together
        const [arabicRes, transRes] = await Promise.all([
            fetch(`${QURAN_API_BASE}/surah/${number}/quran-uthmani`),
            fetch(`${QURAN_API_BASE}/surah/${number}/${language}`)
        ]);

        const arabicData = await arabicRes.json();
        const transData = await transRes.json();

        return {
            arabic: arabicData.data.ayahs,
            translation: transData.data.ayahs,
            metadata: arabicData.data
        };
    },

    async getAudioUrl(surahNumber: number) {
        // Padded number for consistent formatting
        const paddedNumber = surahNumber.toString().padStart(3, '0');

        // Primary: MP3Quran (Very stable for full surahs)
        // Secondary: Quranic Audio (Mishary Rashid Alafasy)
        const sources = [
            `https://server8.mp3quran.net/afs/${paddedNumber}.mp3`,
            `https://download.quranicaudio.com/quran/mishari_rashid_al-afasy/${paddedNumber}.mp3`,
            `https://mirrors.quranicaudio.com/quran/mishari_rashid_al-afasy/${paddedNumber}.mp3`
        ];

        // We return the first one, but the UI should handle fallback if possible
        return sources[0];
    },

    // Hadith Methods (Using local database + robust API fallback)
    async getHadithsByCollection(collection: string = 'bukhari') {
        const { HADITH_DATABASE } = await import('@/data/hadith-database');

        // Always include relevant local hadiths first
        const localItems = HADITH_DATABASE.filter(h => h.collection === collection).map(h => ({
            text: h.text_it || h.text_en,
            arabic: h.text_ar,
            narrator: h.narrator,
            grade: h.grade,
            edition: h.collection,
            translations: {
                it: h.text_it,
                en: h.text_en
            }
        }));

        // Fetch additional from API
        const editions: Record<string, string[]> = {
            bukhari: ['ara-bukhari', 'ita-bukhari', 'eng-bukhari'],
            muslim: ['ara-muslim', 'ita-muslim', 'eng-muslim'],
            tirmidhi: ['ara-tirmidhi', 'eng-tirmidhi'],
            abudawud: ['ara-abudawud', 'eng-abudawud'],
            ibnmajah: ['ara-ibnmajah', 'eng-ibnmajah'],
            nasai: ['ara-nasai', 'eng-nasai'],
        };

        const targetEditions = editions[collection] || [`ara-${collection}`, `eng-${collection}`];

        for (const edition of targetEditions) {
            try {
                const res = await fetch(`https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@1/editions/${edition}.min.json`);
                if (res.ok) {
                    const data = await res.json();
                    if (data && data.hadiths && data.hadiths.length > 0) {
                        const apiItems = data.hadiths.slice(0, 50).map((h: any) => ({
                            ...h,
                            arabic: h.arabic || (edition.startsWith('ara') ? h.text : null),
                            text: h.text,
                            edition: edition
                        }));
                        return [...localItems, ...apiItems];
                    }
                }
            } catch (e) {
                console.warn(`Failed to fetch edition ${edition}:`, e);
            }
        }

        return localItems.length > 0 ? localItems : [{
            hadithnumber: 1,
            narrator: "Umar bin Al-Khattab",
            text: "Narrated 'Umar bin Al-Khattab: I heard Allah's Messenger (ﷺ) saying, \"The reward of deeds depends upon the intentions and every person will get the reward according to what he has intended.\"",
            arabic: "إِنَّمَا الْأَعْمَالُ بِالنِّيَّاتِ، وَإِنَّمَا لِكُلِّ امْرِئٍ مَا نَوَى",
            grade: "Sahih"
        }];
    },

    // High Precision Prayer Times (AlAdhan API)
    async getPrayerTimesFromAlAdhan(lat: number, lng: number, altitude: number = 0, method: number = 3) {
        try {
            const date = new Date().toISOString().split('T')[0];
            const url = `https://api.aladhan.com/v1/timings/${date}?latitude=${lat}&longitude=${lng}&method=${method}&elevation=${altitude}`;
            const res = await fetch(url);
            if (res.ok) {
                const data = await res.json();
                const timings = data.data.timings;
                return {
                    fajr: timings.Fajr,
                    sunrise: timings.Sunrise,
                    dhuhr: timings.Dhuhr,
                    asr: timings.Asr,
                    maghrib: timings.Maghrib,
                    isha: timings.Isha,
                    date: date,
                    method: `ALADHAN_API_${data.data.meta.method.name}`
                };
            }
        } catch (error) {
            console.error("AlAdhan API Error:", error);
        }
        return null;
    },

    async searchLibrary(query: string) {
        // This would ideally hit a vector database or a broad Islamic API
        // Placeholder for innovative search logic
        return [];
    }
};
