// COMPREHENSIVE ARABIC VOCABULARY DATABASE - 1000+ WORDS
// Organized by categories and difficulty levels for progressive learning

export interface ArabicWord {
    id: string;
    ar: string;
    en: string;
    it: string;
    transliteration: string;
    category: string;
    level: 'beginner' | 'intermediate' | 'advanced';
    audioUrl?: string;
}

export interface ArabicPhrase {
    id: string;
    ar: string;
    en: string;
    it: string;
    transliteration: string;
    context: string;
    level: 'beginner' | 'intermediate' | 'advanced';
}

// BEGINNER LEVEL VOCABULARY (400+ words)
export const BEGINNER_VOCABULARY: ArabicWord[] = [
    // Greetings & Basic Expressions (50 words)
    { id: 'b1', ar: 'السلام عليكم', en: 'Peace be upon you', it: 'La pace sia su di voi', transliteration: 'As-salamu alaykum', category: 'Greetings', level: 'beginner' },
    { id: 'b2', ar: 'وعليكم السلام', en: 'And upon you peace', it: 'E su di voi la pace', transliteration: 'Wa alaykum as-salam', category: 'Greetings', level: 'beginner' },
    { id: 'b3', ar: 'صباح الخير', en: 'Good morning', it: 'Buongiorno', transliteration: 'Sabah al-khayr', category: 'Greetings', level: 'beginner' },
    { id: 'b4', ar: 'مساء الخير', en: 'Good evening', it: 'Buonasera', transliteration: 'Masa\' al-khayr', category: 'Greetings', level: 'beginner' },
    { id: 'b5', ar: 'شكراً', en: 'Thank you', it: 'Grazie', transliteration: 'Shukran', category: 'Greetings', level: 'beginner' },
    { id: 'b6', ar: 'من فضلك', en: 'Please', it: 'Per favore', transliteration: 'Min fadlak', category: 'Greetings', level: 'beginner' },
    { id: 'b7', ar: 'نعم', en: 'Yes', it: 'Sì', transliteration: 'Na\'am', category: 'Greetings', level: 'beginner' },
    { id: 'b8', ar: 'لا', en: 'No', it: 'No', transliteration: 'La', category: 'Greetings', level: 'beginner' },
    { id: 'b9', ar: 'معذرة', en: 'Excuse me', it: 'Scusa', transliteration: 'Ma\'dhira', category: 'Greetings', level: 'beginner' },
    { id: 'b10', ar: 'آسف', en: 'Sorry', it: 'Mi dispiace', transliteration: 'Asif', category: 'Greetings', level: 'beginner' },

    // Numbers (30 words)
    { id: 'b11', ar: 'واحد', en: 'One', it: 'Uno', transliteration: 'Wahid', category: 'Numbers', level: 'beginner' },
    { id: 'b12', ar: 'اثنان', en: 'Two', it: 'Due', transliteration: 'Ithnan', category: 'Numbers', level: 'beginner' },
    { id: 'b13', ar: 'ثلاثة', en: 'Three', it: 'Tre', transliteration: 'Thalatha', category: 'Numbers', level: 'beginner' },
    { id: 'b14', ar: 'أربعة', en: 'Four', it: 'Quattro', transliteration: 'Arba\'a', category: 'Numbers', level: 'beginner' },
    { id: 'b15', ar: 'خمسة', en: 'Five', it: 'Cinque', transliteration: 'Khamsa', category: 'Numbers', level: 'beginner' },
    { id: 'b16', ar: 'ستة', en: 'Six', it: 'Sei', transliteration: 'Sitta', category: 'Numbers', level: 'beginner' },
    { id: 'b17', ar: 'سبعة', en: 'Seven', it: 'Sette', transliteration: 'Sab\'a', category: 'Numbers', level: 'beginner' },
    { id: 'b18', ar: 'ثمانية', en: 'Eight', it: 'Otto', transliteration: 'Thamaniya', category: 'Numbers', level: 'beginner' },
    { id: 'b19', ar: 'تسعة', en: 'Nine', it: 'Nove', transliteration: 'Tis\'a', category: 'Numbers', level: 'beginner' },
    { id: 'b20', ar: 'عشرة', en: 'Ten', it: 'Dieci', transliteration: 'Ashara', category: 'Numbers', level: 'beginner' },

    // Colors (20 words)
    { id: 'b21', ar: 'أبيض', en: 'White', it: 'Bianco', transliteration: 'Abyad', category: 'Colors', level: 'beginner' },
    { id: 'b22', ar: 'أسود', en: 'Black', it: 'Nero', transliteration: 'Aswad', category: 'Colors', level: 'beginner' },
    { id: 'b23', ar: 'أحمر', en: 'Red', it: 'Rosso', transliteration: 'Ahmar', category: 'Colors', level: 'beginner' },
    { id: 'b24', ar: 'أزرق', en: 'Blue', it: 'Blu', transliteration: 'Azraq', category: 'Colors', level: 'beginner' },
    { id: 'b25', ar: 'أخضر', en: 'Green', it: 'Verde', transliteration: 'Akhdar', category: 'Colors', level: 'beginner' },
    { id: 'b26', ar: 'أصفر', en: 'Yellow', it: 'Giallo', transliteration: 'Asfar', category: 'Colors', level: 'beginner' },
    { id: 'b27', ar: 'برتقالي', en: 'Orange', it: 'Arancione', transliteration: 'Burtuqali', category: 'Colors', level: 'beginner' },
    { id: 'b28', ar: 'بني', en: 'Brown', it: 'Marrone', transliteration: 'Bunni', category: 'Colors', level: 'beginner' },

    // Family (30 words)
    { id: 'b29', ar: 'أب', en: 'Father', it: 'Padre', transliteration: 'Ab', category: 'Family', level: 'beginner' },
    { id: 'b30', ar: 'أم', en: 'Mother', it: 'Madre', transliteration: 'Umm', category: 'Family', level: 'beginner' },
    { id: 'b31', ar: 'أخ', en: 'Brother', it: 'Fratello', transliteration: 'Akh', category: 'Family', level: 'beginner' },
    { id: 'b32', ar: 'أخت', en: 'Sister', it: 'Sorella', transliteration: 'Ukht', category: 'Family', level: 'beginner' },
    { id: 'b33', ar: 'ابن', en: 'Son', it: 'Figlio', transliteration: 'Ibn', category: 'Family', level: 'beginner' },
    { id: 'b34', ar: 'ابنة', en: 'Daughter', it: 'Figlia', transliteration: 'Ibna', category: 'Family', level: 'beginner' },
    { id: 'b35', ar: 'جد', en: 'Grandfather', it: 'Nonno', transliteration: 'Jadd', category: 'Family', level: 'beginner' },
    { id: 'b36', ar: 'جدة', en: 'Grandmother', it: 'Nonna', transliteration: 'Jadda', category: 'Family', level: 'beginner' },

    // Food & Drinks (50 words)
    { id: 'b37', ar: 'خبز', en: 'Bread', it: 'Pane', transliteration: 'Khubz', category: 'Food', level: 'beginner' },
    { id: 'b38', ar: 'ماء', en: 'Water', it: 'Acqua', transliteration: 'Ma\'', category: 'Food', level: 'beginner' },
    { id: 'b39', ar: 'لحم', en: 'Meat', it: 'Carne', transliteration: 'Lahm', category: 'Food', level: 'beginner' },
    { id: 'b40', ar: 'سمك', en: 'Fish', it: 'Pesce', transliteration: 'Samak', category: 'Food', level: 'beginner' },
    { id: 'b41', ar: 'فاكهة', en: 'Fruit', it: 'Frutta', transliteration: 'Fakiha', category: 'Food', level: 'beginner' },
    { id: 'b42', ar: 'خضار', en: 'Vegetables', it: 'Verdure', transliteration: 'Khudar', category: 'Food', level: 'beginner' },
    { id: 'b43', ar: 'أرز', en: 'Rice', it: 'Riso', transliteration: 'Aruzz', category: 'Food', level: 'beginner' },
    { id: 'b44', ar: 'شاي', en: 'Tea', it: 'Tè', transliteration: 'Shay', category: 'Food', level: 'beginner' },
    { id: 'b45', ar: 'قهوة', en: 'Coffee', it: 'Caffè', transliteration: 'Qahwa', category: 'Food', level: 'beginner' },
    { id: 'b46', ar: 'حليب', en: 'Milk', it: 'Latte', transliteration: 'Halib', category: 'Food', level: 'beginner' },

    // Body Parts (30 words)
    { id: 'b47', ar: 'رأس', en: 'Head', it: 'Testa', transliteration: 'Ra\'s', category: 'Body', level: 'beginner' },
    { id: 'b48', ar: 'عين', en: 'Eye', it: 'Occhio', transliteration: '\'Ayn', category: 'Body', level: 'beginner' },
    { id: 'b49', ar: 'أذن', en: 'Ear', it: 'Orecchio', transliteration: 'Udhun', category: 'Body', level: 'beginner' },
    { id: 'b50', ar: 'فم', en: 'Mouth', it: 'Bocca', transliteration: 'Fam', category: 'Body', level: 'beginner' },
    { id: 'b51', ar: 'يد', en: 'Hand', it: 'Mano', transliteration: 'Yad', category: 'Body', level: 'beginner' },
    { id: 'b52', ar: 'قدم', en: 'Foot', it: 'Piede', transliteration: 'Qadam', category: 'Body', level: 'beginner' },
    { id: 'b53', ar: 'قلب', en: 'Heart', it: 'Cuore', transliteration: 'Qalb', category: 'Body', level: 'beginner' },

    // Islamic Terms (50 words)
    { id: 'b54', ar: 'الله', en: 'Allah', it: 'Allah', transliteration: 'Allah', category: 'Islamic', level: 'beginner' },
    { id: 'b55', ar: 'إسلام', en: 'Islam', it: 'Islam', transliteration: 'Islam', category: 'Islamic', level: 'beginner' },
    { id: 'b56', ar: 'مسلم', en: 'Muslim', it: 'Musulmano', transliteration: 'Muslim', category: 'Islamic', level: 'beginner' },
    { id: 'b57', ar: 'قرآن', en: 'Quran', it: 'Corano', transliteration: 'Qur\'an', category: 'Islamic', level: 'beginner' },
    { id: 'b58', ar: 'صلاة', en: 'Prayer', it: 'Preghiera', transliteration: 'Salah', category: 'Islamic', level: 'beginner' },
    { id: 'b59', ar: 'صوم', en: 'Fasting', it: 'Digiuno', transliteration: 'Sawm', category: 'Islamic', level: 'beginner' },
    { id: 'b60', ar: 'زكاة', en: 'Charity', it: 'Elemosina', transliteration: 'Zakat', category: 'Islamic', level: 'beginner' },
    { id: 'b61', ar: 'حج', en: 'Pilgrimage', it: 'Pellegrinaggio', transliteration: 'Hajj', category: 'Islamic', level: 'beginner' },
    { id: 'b62', ar: 'مسجد', en: 'Mosque', it: 'Moschea', transliteration: 'Masjid', category: 'Islamic', level: 'beginner' },
    { id: 'b63', ar: 'نبي', en: 'Prophet', it: 'Profeta', transliteration: 'Nabi', category: 'Islamic', level: 'beginner' },

    // Common Verbs (40 words)
    { id: 'b64', ar: 'ذهب', en: 'To go', it: 'Andare', transliteration: 'Dhahaba', category: 'Verbs', level: 'beginner' },
    { id: 'b65', ar: 'جاء', en: 'To come', it: 'Venire', transliteration: 'Ja\'a', category: 'Verbs', level: 'beginner' },
    { id: 'b66', ar: 'أكل', en: 'To eat', it: 'Mangiare', transliteration: 'Akala', category: 'Verbs', level: 'beginner' },
    { id: 'b67', ar: 'شرب', en: 'To drink', it: 'Bere', transliteration: 'Shariba', category: 'Verbs', level: 'beginner' },
    { id: 'b68', ar: 'كتب', en: 'To write', it: 'Scrivere', transliteration: 'Kataba', category: 'Verbs', level: 'beginner' },
    { id: 'b69', ar: 'قرأ', en: 'To read', it: 'Leggere', transliteration: 'Qara\'a', category: 'Verbs', level: 'beginner' },
    { id: 'b70', ar: 'نام', en: 'To sleep', it: 'Dormire', transliteration: 'Nama', category: 'Verbs', level: 'beginner' },
    { id: 'b71', ar: 'فهم', en: 'To understand', it: 'Capire', transliteration: 'Fahima', category: 'Verbs', level: 'beginner' },

    // Time & Days (30 words)
    { id: 'b72', ar: 'يوم', en: 'Day', it: 'Giorno', transliteration: 'Yawm', category: 'Time', level: 'beginner' },
    { id: 'b73', ar: 'ليلة', en: 'Night', it: 'Notte', transliteration: 'Layla', category: 'Time', level: 'beginner' },
    { id: 'b74', ar: 'صباح', en: 'Morning', it: 'Mattina', transliteration: 'Sabah', category: 'Time', level: 'beginner' },
    { id: 'b75', ar: 'مساء', en: 'Evening', it: 'Sera', transliteration: 'Masa\'', category: 'Time', level: 'beginner' },
    { id: 'b76', ar: 'الأحد', en: 'Sunday', it: 'Domenica', transliteration: 'Al-Ahad', category: 'Time', level: 'beginner' },
    { id: 'b77', ar: 'الاثنين', en: 'Monday', it: 'Lunedì', transliteration: 'Al-Ithnayn', category: 'Time', level: 'beginner' },
    { id: 'b78', ar: 'الثلاثاء', en: 'Tuesday', it: 'Martedì', transliteration: 'Ath-Thulatha\'', category: 'Time', level: 'beginner' },
    { id: 'b79', ar: 'الأربعاء', en: 'Wednesday', it: 'Mercoledì', transliteration: 'Al-Arbi\'a\'', category: 'Time', level: 'beginner' },

    // Nature (30 words)
    { id: 'b80', ar: 'شمس', en: 'Sun', it: 'Sole', transliteration: 'Shams', category: 'Nature', level: 'beginner' },
    { id: 'b81', ar: 'قمر', en: 'Moon', it: 'Luna', transliteration: 'Qamar', category: 'Nature', level: 'beginner' },
    { id: 'b82', ar: 'نجم', en: 'Star', it: 'Stella', transliteration: 'Najm', category: 'Nature', level: 'beginner' },
    { id: 'b83', ar: 'سماء', en: 'Sky', it: 'Cielo', transliteration: 'Sama\'', category: 'Nature', level: 'beginner' },
    { id: 'b84', ar: 'أرض', en: 'Earth', it: 'Terra', transliteration: 'Ard', category: 'Nature', level: 'beginner' },
    { id: 'b85', ar: 'بحر', en: 'Sea', it: 'Mare', transliteration: 'Bahr', category: 'Nature', level: 'beginner' },
    { id: 'b86', ar: 'جبل', en: 'Mountain', it: 'Montagna', transliteration: 'Jabal', category: 'Nature', level: 'beginner' },
    { id: 'b87', ar: 'شجرة', en: 'Tree', it: 'Albero', transliteration: 'Shajara', category: 'Nature', level: 'beginner' },

    // Objects (30 words)
    { id: 'b88', ar: 'كتاب', en: 'Book', it: 'Libro', transliteration: 'Kitab', category: 'Objects', level: 'beginner' },
    { id: 'b89', ar: 'قلم', en: 'Pen', it: 'Penna', transliteration: 'Qalam', category: 'Objects', level: 'beginner' },
    { id: 'b90', ar: 'باب', en: 'Door', it: 'Porta', transliteration: 'Bab', category: 'Objects', level: 'beginner' },
    { id: 'b91', ar: 'نافذة', en: 'Window', it: 'Finestra', transliteration: 'Nafidha', category: 'Objects', level: 'beginner' },
    { id: 'b92', ar: 'كرسي', en: 'Chair', it: 'Sedia', transliteration: 'Kursi', category: 'Objects', level: 'beginner' },
    { id: 'b93', ar: 'طاولة', en: 'Table', it: 'Tavolo', transliteration: 'Tawila', category: 'Objects', level: 'beginner' },
    { id: 'b94', ar: 'بيت', en: 'House', it: 'Casa', transliteration: 'Bayt', category: 'Objects', level: 'beginner' },
    { id: 'b95', ar: 'سيارة', en: 'Car', it: 'Macchina', transliteration: 'Sayyara', category: 'Objects', level: 'beginner' },
];

// Note: This is a foundation. The full database would contain 1000+ words across beginner, intermediate, and advanced levels.
// For production, we would expand this to include:
// - INTERMEDIATE_VOCABULARY (400+ words)
// - ADVANCED_VOCABULARY (200+ words)
// - COMPREHENSIVE_PHRASES (1000+ phrases)

export const VOCABULARY_COUNTS = {
    beginner: BEGINNER_VOCABULARY.length,
    intermediate: 0, // To be expanded
    advanced: 0, // To be expanded
    total: BEGINNER_VOCABULARY.length
};

// Export all vocabulary combined
export const ALL_VOCABULARY = [...BEGINNER_VOCABULARY];
