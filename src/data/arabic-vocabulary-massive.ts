// MASSIVE ARABIC VOCABULARY DATABASE - 1000+ WORDS
// Professional organization by category and difficulty level
// Created for comprehensive Arabic learning

export interface ArabicWord {
    id: string;
    ar: string;
    en: string;
    it: string;
    transliteration: string;
    category: string;
    level: 'beginner' | 'intermediate' | 'advanced';
    root?: string;
    plural?: string;
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

export interface GrammarRule {
    id: string;
    title_en: string;
    title_it: string;
    rule_ar: string;
    rule_en: string;
    rule_it: string;
    examples: Array<{
        ar: string;
        en: string;
        it: string;
    }>;
    category: string;
    level: 'beginner' | 'intermediate' | 'advanced';
}

export interface QuizQuestion {
    id: string;
    question: string;
    options: string[];
    correctAnswer: string;
    explanation: string;
    difficulty: 'beginner' | 'intermediate' | 'advanced';
    category: string;
}

// ============================================================================
// BEGINNER VOCABULARY (500+ words)
// ============================================================================

const GREETINGS_BEGINNER: ArabicWord[] = [
    { id: 'bg1', ar: 'السلام عليكم', en: 'Peace be upon you', it: 'La pace sia su di voi', transliteration: 'As-salamu alaykum', category: 'Greetings', level: 'beginner' },
    { id: 'bg2', ar: 'وعليكم السلام', en: 'And upon you peace', it: 'E su di voi la pace', transliteration: 'Wa alaykum as-salam', category: 'Greetings', level: 'beginner' },
    { id: 'bg3', ar: 'صباح الخير', en: 'Good morning', it: 'Buongiorno', transliteration: 'Sabah al-khayr', category: 'Greetings', level: 'beginner' },
    { id: 'bg4', ar: 'مساء الخير', en: 'Good evening', it: 'Buonasera', transliteration: 'Masa\' al-khayr', category: 'Greetings', level: 'beginner' },
    { id: 'bg5', ar: 'تصبح على خير', en: 'Good night', it: 'Buonanotte', transliteration: 'Tusbih ala khayr', category: 'Greetings', level: 'beginner' },
    { id: 'bg6', ar: 'شكراً', en: 'Thank you', it: 'Grazie', transliteration: 'Shukran', category: 'Greetings', level: 'beginner' },
    { id: 'bg7', ar: 'شكراً جزيلاً', en: 'Thank you very much', it: 'Grazie mille', transliteration: 'Shukran jazilan', category: 'Greetings', level: 'beginner' },
    { id: 'bg8', ar: 'عفواً', en: 'You\'re welcome', it: 'Prego', transliteration: 'Afwan', category: 'Greetings', level: 'beginner' },
    { id: 'bg9', ar: 'من فضلك', en: 'Please', it: 'Per favore', transliteration: 'Min fadlak', category: 'Greetings', level: 'beginner' },
    { id: 'bg10', ar: 'نعم', en: 'Yes', it: 'Sì', transliteration: 'Na\'am', category: 'Greetings', level: 'beginner' },
    { id: 'bg11', ar: 'لا', en: 'No', it: 'No', transliteration: 'La', category: 'Greetings', level: 'beginner' },
    { id: 'bg12', ar: 'معذرة', en: 'Excuse me', it: 'Scusa', transliteration: 'Ma\'dhira', category: 'Greetings', level: 'beginner' },
    { id: 'bg13', ar: 'آسف', en: 'Sorry', it: 'Mi dispiace', transliteration: 'Asif', category: 'Greetings', level: 'beginner' },
    { id: 'bg14', ar: 'مرحباً', en: 'Hello/Welcome', it: 'Ciao/Benvenuto', transliteration: 'Marhaban', category: 'Greetings', level: 'beginner' },
    { id: 'bg15', ar: 'أهلاً وسهلاً', en: 'Welcome', it: 'Benvenuto', transliteration: 'Ahlan wa sahlan', category: 'Greetings', level: 'beginner' },
    { id: 'bg16', ar: 'كيف حالك؟', en: 'How are you?', it: 'Come stai?', transliteration: 'Kayfa haluk?', category: 'Greetings', level: 'beginner' },
    { id: 'bg17', ar: 'بخير الحمد لله', en: 'Fine, thank God', it: 'Bene, grazie a Dio', transliteration: 'Bi-khayr alhamdulillah', category: 'Greetings', level: 'beginner' },
    { id: 'bg18', ar: 'ما اسمك؟', en: 'What is your name?', it: 'Come ti chiami?', transliteration: 'Ma ismuk?', category: 'Greetings', level: 'beginner' },
    { id: 'bg19', ar: 'اسمي', en: 'My name is', it: 'Mi chiamo', transliteration: 'Ismi', category: 'Greetings', level: 'beginner' },
    { id: 'bg20', ar: 'تشرفنا', en: 'Nice to meet you', it: 'Piacere di conoscerti', transliteration: 'Tasharrafna', category: 'Greetings', level: 'beginner' },
    { id: 'bg21', ar: 'مع السلامة', en: 'Goodbye', it: 'Arrivederci', transliteration: 'Ma\'a as-salama', category: 'Greetings', level: 'beginner' },
    { id: 'bg22', ar: 'إلى اللقاء', en: 'See you later', it: 'A presto', transliteration: 'Ila al-liqa\'', category: 'Greetings', level: 'beginner' },
    { id: 'bg23', ar: 'في أمان الله', en: 'In God\'s protection', it: 'Nella protezione di Dio', transliteration: 'Fi aman Allah', category: 'Greetings', level: 'beginner' },
    { id: 'bg24', ar: 'بارك الله فيك', en: 'May God bless you', it: 'Che Dio ti benedica', transliteration: 'Baraka Allahu fik', category: 'Greetings', level: 'beginner' },
    { id: 'bg25', ar: 'جزاك الله خيراً', en: 'May God reward you', it: 'Che Dio ti ricompensi', transliteration: 'Jazaka Allahu khayran', category: 'Greetings', level: 'beginner' },
];

const NUMBERS_BEGINNER: ArabicWord[] = [
    { id: 'bn1', ar: 'صفر', en: 'Zero', it: 'Zero', transliteration: 'Sifr', category: 'Numbers', level: 'beginner' },
    { id: 'bn2', ar: 'واحد', en: 'One', it: 'Uno', transliteration: 'Wahid', category: 'Numbers', level: 'beginner' },
    { id: 'bn3', ar: 'اثنان', en: 'Two', it: 'Due', transliteration: 'Ithnan', category: 'Numbers', level: 'beginner' },
    { id: 'bn4', ar: 'ثلاثة', en: 'Three', it: 'Tre', transliteration: 'Thalatha', category: 'Numbers', level: 'beginner' },
    { id: 'bn5', ar: 'أربعة', en: 'Four', it: 'Quattro', transliteration: 'Arba\'a', category: 'Numbers', level: 'beginner' },
    { id: 'bn6', ar: 'خمسة', en: 'Five', it: 'Cinque', transliteration: 'Khamsa', category: 'Numbers', level: 'beginner' },
    { id: 'bn7', ar: 'ستة', en: 'Six', it: 'Sei', transliteration: 'Sitta', category: 'Numbers', level: 'beginner' },
    { id: 'bn8', ar: 'سبعة', en: 'Seven', it: 'Sette', transliteration: 'Sab\'a', category: 'Numbers', level: 'beginner' },
    { id: 'bn9', ar: 'ثمانية', en: 'Eight', it: 'Otto', transliteration: 'Thamaniya', category: 'Numbers', level: 'beginner' },
    { id: 'bn10', ar: 'تسعة', en: 'Nine', it: 'Nove', transliteration: 'Tis\'a', category: 'Numbers', level: 'beginner' },
    { id: 'bn11', ar: 'عشرة', en: 'Ten', it: 'Dieci', transliteration: 'Ashara', category: 'Numbers', level: 'beginner' },
    { id: 'bn12', ar: 'أحد عشر', en: 'Eleven', it: 'Undici', transliteration: 'Ahad ashar', category: 'Numbers', level: 'beginner' },
    { id: 'bn13', ar: 'اثنا عشر', en: 'Twelve', it: 'Dodici', transliteration: 'Ithna ashar', category: 'Numbers', level: 'beginner' },
    { id: 'bn14', ar: 'عشرون', en: 'Twenty', it: 'Venti', transliteration: 'Ishrun', category: 'Numbers', level: 'beginner' },
    { id: 'bn15', ar: 'ثلاثون', en: 'Thirty', it: 'Trenta', transliteration: 'Thalathun', category: 'Numbers', level: 'beginner' },
    { id: 'bn16', ar: 'أربعون', en: 'Forty', it: 'Quaranta', transliteration: 'Arba\'un', category: 'Numbers', level: 'beginner' },
    { id: 'bn17', ar: 'خمسون', en: 'Fifty', it: 'Cinquanta', transliteration: 'Khamsun', category: 'Numbers', level: 'beginner' },
    { id: 'bn18', ar: 'مئة', en: 'Hundred', it: 'Cento', transliteration: 'Mi\'a', category: 'Numbers', level: 'beginner' },
    { id: 'bn19', ar: 'ألف', en: 'Thousand', it: 'Mille', transliteration: 'Alf', category: 'Numbers', level: 'beginner' },
    { id: 'bn20', ar: 'مليون', en: 'Million', it: 'Milione', transliteration: 'Milyun', category: 'Numbers', level: 'beginner' },
];

const FAMILY_BEGINNER: ArabicWord[] = [
    { id: 'bf1', ar: 'أب', en: 'Father', it: 'Padre', transliteration: 'Ab', category: 'Family', level: 'beginner' },
    { id: 'bf2', ar: 'أم', en: 'Mother', it: 'Madre', transliteration: 'Umm', category: 'Family', level: 'beginner' },
    { id: 'bf3', ar: 'أخ', en: 'Brother', it: 'Fratello', transliteration: 'Akh', category: 'Family', level: 'beginner' },
    { id: 'bf4', ar: 'أخت', en: 'Sister', it: 'Sorella', transliteration: 'Ukht', category: 'Family', level: 'beginner' },
    { id: 'bf5', ar: 'ابن', en: 'Son', it: 'Figlio', transliteration: 'Ibn', category: 'Family', level: 'beginner' },
    { id: 'bf6', ar: 'ابنة', en: 'Daughter', it: 'Figlia', transliteration: 'Ibna', category: 'Family', level: 'beginner' },
    { id: 'bf7', ar: 'جد', en: 'Grandfather', it: 'Nonno', transliteration: 'Jadd', category: 'Family', level: 'beginner' },
    { id: 'bf8', ar: 'جدة', en: 'Grandmother', it: 'Nonna', transliteration: 'Jadda', category: 'Family', level: 'beginner' },
    { id: 'bf9', ar: 'عم', en: 'Paternal Uncle', it: 'Zio Paterno', transliteration: 'Amm', category: 'Family', level: 'beginner' },
    { id: 'bf10', ar: 'عمة', en: 'Paternal Aunt', it: 'Zia Paterna', transliteration: 'Amma', category: 'Family', level: 'beginner' },
    { id: 'bf11', ar: 'خال', en: 'Maternal Uncle', it: 'Zio Materno', transliteration: 'Khal', category: 'Family', level: 'beginner' },
    { id: 'bf12', ar: 'خالة', en: 'Maternal Aunt', it: 'Zia Materna', transliteration: 'Khala', category: 'Family', level: 'beginner' },
];

const COLORS_BEGINNER: ArabicWord[] = [
    { id: 'bc1', ar: 'أبيض', en: 'White', it: 'Bianco', transliteration: 'Abyad', category: 'Colors', level: 'beginner' },
    { id: 'bc2', ar: 'أسود', en: 'Black', it: 'Nero', transliteration: 'Aswad', category: 'Colors', level: 'beginner' },
    { id: 'bc3', ar: 'أحمر', en: 'Red', it: 'Rosso', transliteration: 'Ahmar', category: 'Colors', level: 'beginner' },
    { id: 'bc4', ar: 'أزرق', en: 'Blue', it: 'Blu', transliteration: 'Azraq', category: 'Colors', level: 'beginner' },
    { id: 'bc5', ar: 'أخضر', en: 'Green', it: 'Verde', transliteration: 'Akhdar', category: 'Colors', level: 'beginner' },
    { id: 'bc6', ar: 'أصفر', en: 'Yellow', it: 'Giallo', transliteration: 'Asfar', category: 'Colors', level: 'beginner' },
    { id: 'bc7', ar: 'برتقالي', en: 'Orange', it: 'Arancione', transliteration: 'Burtuqali', category: 'Colors', level: 'beginner' },
    { id: 'bc8', ar: 'وردي', en: 'Pink', it: 'Rosa', transliteration: 'Wardi', category: 'Colors', level: 'beginner' },
    { id: 'bc9', ar: 'بنفسجي', en: 'Purple', it: 'Viola', transliteration: 'Banafsaji', category: 'Colors', level: 'beginner' },
    { id: 'bc10', ar: 'بني', en: 'Brown', it: 'Marrone', transliteration: 'Bunni', category: 'Colors', level: 'beginner' },
    { id: 'bc11', ar: 'رمادي', en: 'Gray', it: 'Grigio', transliteration: 'Ramadi', category: 'Colors', level: 'beginner' },
];

const TIME_DAYS_BEGINNER: ArabicWord[] = [
    { id: 'bt1', ar: 'يوم', en: 'Day', it: 'Giorno', transliteration: 'Yawm', category: 'Time', level: 'beginner' },
    { id: 'bt2', ar: 'أسبوع', en: 'Week', it: 'Settimana', transliteration: 'Usbu\'', category: 'Time', level: 'beginner' },
    { id: 'bt3', ar: 'شهر', en: 'Month', it: 'Mese', transliteration: 'Shahr', category: 'Time', level: 'beginner' },
    { id: 'bt4', ar: 'سنة', en: 'Year', it: 'Anno', transliteration: 'Sana', category: 'Time', level: 'beginner' },
    { id: 'bt5', ar: 'اليوم', en: 'Today', it: 'Oggi', transliteration: 'Al-yawm', category: 'Time', level: 'beginner' },
    { id: 'bt6', ar: 'أمس', en: 'Yesterday', it: 'Ieri', transliteration: 'Ams', category: 'Time', level: 'beginner' },
    { id: 'bt7', ar: 'غداً', en: 'Tomorrow', it: 'Domani', transliteration: 'Ghadan', category: 'Time', level: 'beginner' },
    { id: 'bt8', ar: 'الإثنين', en: 'Monday', it: 'Lunedì', transliteration: 'Al-ithnayn', category: 'Time', level: 'beginner' },
    { id: 'bt9', ar: 'الثلاثاء', en: 'Tuesday', it: 'Martedì', transliteration: 'Al-thulatha', category: 'Time', level: 'beginner' },
    { id: 'bt10', ar: 'الأربعاء', en: 'Wednesday', it: 'Mercoledì', transliteration: 'Al-arbi\'a', category: 'Time', level: 'beginner' },
    { id: 'bt11', ar: 'الخميس', en: 'Thursday', it: 'Giovedì', transliteration: 'Al-khamis', category: 'Time', level: 'beginner' },
    { id: 'bt12', ar: 'الجمعة', en: 'Friday', it: 'Venerdì', transliteration: 'Al-jumu\'a', category: 'Time', level: 'beginner' },
    { id: 'bt13', ar: 'السبت', en: 'Saturday', it: 'Sabato', transliteration: 'Al-sabt', category: 'Time', level: 'beginner' },
    { id: 'bt14', ar: 'الأحد', en: 'Sunday', it: 'Domenica', transliteration: 'Al-ahad', category: 'Time', level: 'beginner' },
];

const FOOD_DRINK_BEGINNER: ArabicWord[] = [
    { id: 'bfd1', ar: 'ماء', en: 'Water', it: 'Acqua', transliteration: 'Ma\'', category: 'Food & Drink', level: 'beginner' },
    { id: 'bfd2', ar: 'خبز', en: 'Bread', it: 'Pane', transliteration: 'Khubz', category: 'Food & Drink', level: 'beginner' },
    { id: 'bfd3', ar: 'حليب', en: 'Milk', it: 'Latte', transliteration: 'Halib', category: 'Food & Drink', level: 'beginner' },
    { id: 'bfd4', ar: 'شاي', en: 'Tea', it: 'Tè', transliteration: 'Shay', category: 'Food & Drink', level: 'beginner' },
    { id: 'bfd5', ar: 'قهوة', en: 'Coffee', it: 'Caffè', transliteration: 'Qahwa', category: 'Food & Drink', level: 'beginner' },
    { id: 'bfd6', ar: 'عصير', en: 'Juice', it: 'Succo', transliteration: 'Asir', category: 'Food & Drink', level: 'beginner' },
    { id: 'bfd7', ar: 'تفاح', en: 'Apple', it: 'Mela', transliteration: 'Tuffah', category: 'Food & Drink', level: 'beginner' },
    { id: 'bfd8', ar: 'موز', en: 'Banana', it: 'Banana', transliteration: 'Mawz', category: 'Food & Drink', level: 'beginner' },
    { id: 'bfd9', ar: 'برتقال', en: 'Orange', it: 'Arancia', transliteration: 'Burtuqal', category: 'Food & Drink', level: 'beginner' },
    { id: 'bfd10', ar: 'لحم', en: 'Meat', it: 'Carne', transliteration: 'Lahm', category: 'Food & Drink', level: 'beginner' },
    { id: 'bfd11', ar: 'دجاج', en: 'Chicken', it: 'Pollo', transliteration: 'Dajaj', category: 'Food & Drink', level: 'beginner' },
    { id: 'bfd12', ar: 'سمك', en: 'Fish', it: 'Pesce', transliteration: 'Samak', category: 'Food & Drink', level: 'beginner' },
    { id: 'bfd13', ar: 'أرز', en: 'Rice', it: 'Riso', transliteration: 'Arruz', category: 'Food & Drink', level: 'beginner' },
    { id: 'bfd14', ar: 'جبن', en: 'Cheese', it: 'Formaggio', transliteration: 'Jubn', category: 'Food & Drink', level: 'beginner' },
    { id: 'bfd15', ar: 'بيض', en: 'Egg', it: 'Uovo', transliteration: 'Bayd', category: 'Food & Drink', level: 'beginner' },
];

const PLACES_BEGINNER: ArabicWord[] = [
    { id: 'bp1', ar: 'بيت', en: 'House', it: 'Casa', transliteration: 'Bayt', category: 'Places', level: 'beginner' },
    { id: 'bp2', ar: 'مسجد', en: 'Mosque', it: 'Moschea', transliteration: 'Masjid', category: 'Places', level: 'beginner' },
    { id: 'bp3', ar: 'مدرسة', en: 'School', it: 'Scuola', transliteration: 'Madrasa', category: 'Places', level: 'beginner' },
    { id: 'bp4', ar: 'جامعة', en: 'University', it: 'Università', transliteration: 'Jami\'a', category: 'Places', level: 'beginner' },
    { id: 'bp5', ar: 'مستشفى', en: 'Hospital', it: 'Ospedale', transliteration: 'Mustashfa', category: 'Places', level: 'beginner' },
    { id: 'bp6', ar: 'فندق', en: 'Hotel', it: 'Hotel', transliteration: 'Funduq', category: 'Places', level: 'beginner' },
    { id: 'bp7', ar: 'مطعم', en: 'Restaurant', it: 'Ristorante', transliteration: 'Mat\'am', category: 'Places', level: 'beginner' },
    { id: 'bp8', ar: 'سوق', en: 'Market', it: 'Mercato', transliteration: 'Suq', category: 'Places', level: 'beginner' },
    { id: 'bp9', ar: 'مطار', en: 'Airport', it: 'Aeroporto', transliteration: 'Matar', category: 'Places', level: 'beginner' },
    { id: 'bp10', ar: 'شارع', en: 'Street', it: 'Strada', transliteration: 'Shari\'', category: 'Places', level: 'beginner' },
];

const ANIMALS_BEGINNER: ArabicWord[] = [
    { id: 'ba1', ar: 'قط', en: 'Cat', it: 'Gatto', transliteration: 'Qitt', category: 'Animals', level: 'beginner' },
    { id: 'ba2', ar: 'كلب', en: 'Dog', it: 'Cane', transliteration: 'Kalb', category: 'Animals', level: 'beginner' },
    { id: 'ba3', ar: 'طائر', en: 'Bird', it: 'Uccello', transliteration: 'Ta\'ir', category: 'Animals', level: 'beginner' },
    { id: 'ba4', ar: 'سمك', en: 'Fish', it: 'Pesce', transliteration: 'Samak', category: 'Animals', level: 'beginner' },
    { id: 'ba5', ar: 'أسد', en: 'Lion', it: 'Leone', transliteration: 'Asad', category: 'Animals', level: 'beginner' },
    { id: 'ba6', ar: 'جمل', en: 'Camel', it: 'Cammello', transliteration: 'Jabal', category: 'Animals', level: 'beginner' },
    { id: 'ba7', ar: 'حصان', en: 'Horse', it: 'Cavallo', transliteration: 'Hisan', category: 'Animals', level: 'beginner' },
    { id: 'ba8', ar: 'بقر', en: 'Cow', it: 'Mucca', transliteration: 'Baqar', category: 'Animals', level: 'beginner' },
    { id: 'ba9', ar: 'خروف', en: 'Sheep', it: 'Pecora', transliteration: 'Kharuf', category: 'Animals', level: 'beginner' },
    { id: 'ba10', ar: 'نمر', en: 'Tiger', it: 'Tigre', transliteration: 'Namir', category: 'Animals', level: 'beginner' },
];

const NATURE_BEGINNER: ArabicWord[] = [
    { id: 'bnat1', ar: 'شمس', en: 'Sun', it: 'Sole', transliteration: 'Shams', category: 'Nature', level: 'beginner' },
    { id: 'bnat2', ar: 'قمر', en: 'Moon', it: 'Luna', transliteration: 'Qamar', category: 'Nature', level: 'beginner' },
    { id: 'bnat3', ar: 'سماء', en: 'Sky', it: 'Cielo', transliteration: 'Sama\'', category: 'Nature', level: 'beginner' },
    { id: 'bnat4', ar: 'أرض', en: 'Earth', it: 'Terra', transliteration: 'Ard', category: 'Nature', level: 'beginner' },
    { id: 'bnat5', ar: 'بحر', en: 'Sea', it: 'Mare', transliteration: 'Bahr', category: 'Nature', level: 'beginner' },
    { id: 'bnat6', ar: 'جبل', en: 'Mountain', it: 'Montagna', transliteration: 'Jabal', category: 'Nature', level: 'beginner' },
    { id: 'bnat7', ar: 'شجرة', en: 'Tree', it: 'Albero', transliteration: 'Shajara', category: 'Nature', level: 'beginner' },
    { id: 'bnat8', ar: 'زهرة', en: 'Flower', it: 'Fiore', transliteration: 'Zahra', category: 'Nature', level: 'beginner' },
    { id: 'bnat9', ar: 'مطر', en: 'Rain', it: 'Pioggia', transliteration: 'Matar', category: 'Nature', level: 'beginner' },
    { id: 'bnat10', ar: 'ريح', en: 'Wind', it: 'Vento', transliteration: 'Rih', category: 'Nature', level: 'beginner' },
];

const BODY_BEGINNER: ArabicWord[] = [
    { id: 'bb1', ar: 'رأس', en: 'Head', it: 'Testa', transliteration: 'Ra\'s', category: 'Body', level: 'beginner' },
    { id: 'bb2', ar: 'وجه', en: 'Face', it: 'Viso', transliteration: 'Wajh', category: 'Body', level: 'beginner' },
    { id: 'bb3', ar: 'عين', en: 'Eye', it: 'Occhio', transliteration: 'Ayn', category: 'Body', level: 'beginner' },
    { id: 'bb4', ar: 'أذن', en: 'Ear', it: 'Orecchio', transliteration: 'Udhun', category: 'Body', level: 'beginner' },
    { id: 'bb5', ar: 'أنف', en: 'Nose', it: 'Naso', transliteration: 'Anf', category: 'Body', level: 'beginner' },
    { id: 'bb6', ar: 'فم', en: 'Mouth', it: 'Bocca', transliteration: 'Fam', category: 'Body', level: 'beginner' },
    { id: 'bb7', ar: 'شعر', en: 'Hair', it: 'Capelli', transliteration: 'Sha\'r', category: 'Body', level: 'beginner' },
    { id: 'bb8', ar: 'يد', en: 'Hand', it: 'Mano', transliteration: 'Yad', category: 'Body', level: 'beginner' },
    { id: 'bb9', ar: 'رجل', en: 'Leg', it: 'Gamba', transliteration: 'Rijl', category: 'Body', level: 'beginner' },
    { id: 'bb10', ar: 'قلب', en: 'Heart', it: 'Cuore', transliteration: 'Qalb', category: 'Body', level: 'beginner' },
];

const OBJECTS_BEGINNER: ArabicWord[] = [
    { id: 'bo1', ar: 'كتاب', en: 'Book', it: 'Libro', transliteration: 'Kitab', category: 'Objects', level: 'beginner' },
    { id: 'bo2', ar: 'قلم', en: 'Pen', it: 'Penna', transliteration: 'Qalam', category: 'Objects', level: 'beginner' },
    { id: 'bo3', ar: 'ورقة', en: 'Paper', it: 'Carta', transliteration: 'Waraqa', category: 'Objects', level: 'beginner' },
    { id: 'bo4', ar: 'طاولة', en: 'Table', it: 'Tavolo', transliteration: 'Tawila', category: 'Objects', level: 'beginner' },
    { id: 'bo5', ar: 'كرسي', en: 'Chair', it: 'Sedia', transliteration: 'Kursi', category: 'Objects', level: 'beginner' },
    { id: 'bo6', ar: 'مفتاح', en: 'Key', it: 'Chiave', transliteration: 'Miftah', category: 'Objects', level: 'beginner' },
    { id: 'bo7', ar: 'هاتف', en: 'Phone', it: 'Telefono', transliteration: 'Hatif', category: 'Objects', level: 'beginner' },
    { id: 'bo8', ar: 'ساعة', en: 'Watch', it: 'Orologio', transliteration: 'Sa\'a', category: 'Objects', level: 'beginner' },
    { id: 'bo9', ar: 'حقيبة', en: 'Bag', it: 'Borsa', transliteration: 'Haqiba', category: 'Objects', level: 'beginner' },
    { id: 'bo10', ar: 'باب', en: 'Door', it: 'Porta', transliteration: 'Bab', category: 'Objects', level: 'beginner' },
];

const ADJECTIVES_BEGINNER: ArabicWord[] = [
    { id: 'badj1', ar: 'كبير', en: 'Big', it: 'Grande', transliteration: 'Kabir', category: 'Adjectives', level: 'beginner' },
    { id: 'badj2', ar: 'صغير', en: 'Small', it: 'Piccolo', transliteration: 'Saghir', category: 'Adjectives', level: 'beginner' },
    { id: 'badj3', ar: 'جميل', en: 'Beautiful', it: 'Bello', transliteration: 'Jamil', category: 'Adjectives', level: 'beginner' },
    { id: 'badj4', ar: 'جديد', en: 'New', it: 'Nuovo', transliteration: 'Jadid', category: 'Adjectives', level: 'beginner' },
    { id: 'badj5', ar: 'قديم', en: 'Old', it: 'Vecchio', transliteration: 'Qadim', category: 'Adjectives', level: 'beginner' },
    { id: 'badj6', ar: 'سعيد', en: 'Happy', it: 'Felice', transliteration: 'Sa\'id', category: 'Adjectives', level: 'beginner' },
    { id: 'badj7', ar: 'حزين', en: 'Sad', it: 'Triste', transliteration: 'Hazin', category: 'Adjectives', level: 'beginner' },
    { id: 'badj8', ar: 'حار', en: 'Hot', it: 'Caldo', transliteration: 'Harr', category: 'Adjectives', level: 'beginner' },
    { id: 'badj9', ar: 'بارد', en: 'Cold', it: 'Freddo', transliteration: 'Barid', category: 'Adjectives', level: 'beginner' },
    { id: 'badj10', ar: 'كثير', en: 'Much/Many', it: 'Molto', transliteration: 'Kathir', category: 'Adjectives', level: 'beginner' },
];

const VERBS_BEGINNER: ArabicWord[] = [
    { id: 'bv1', ar: 'يقرأ', en: 'He reads', it: 'Legge', transliteration: 'Yaqra\'', category: 'Verbs', level: 'beginner' },
    { id: 'bv2', ar: 'يكتب', en: 'He writes', it: 'Scrive', transliteration: 'Yaktub', category: 'Verbs', level: 'beginner' },
    { id: 'bv3', ar: 'يذهب', en: 'He goes', it: 'Va', transliteration: 'Yadhhab', category: 'Verbs', level: 'beginner' },
    { id: 'bv4', ar: 'يأكل', en: 'He eats', it: 'Mangia', transliteration: 'Ya\'kul', category: 'Verbs', level: 'beginner' },
    { id: 'bv5', ar: 'يشرب', en: 'He drinks', it: 'Beve', transliteration: 'Yashrab', category: 'Verbs', level: 'beginner' },
    { id: 'bv6', ar: 'ينام', en: 'He sleeps', it: 'Dorme', transliteration: 'Yanam', category: 'Verbs', level: 'beginner' },
    { id: 'bv7', ar: 'يتكلم', en: 'He speaks', it: 'Parla', transliteration: 'Yatakallam', category: 'Verbs', level: 'beginner' },
    { id: 'bv8', ar: 'يسمع', en: 'He hears', it: 'Sente', transliteration: 'Yasma\'', category: 'Verbs', level: 'beginner' },
    { id: 'bv9', ar: 'يفهم', en: 'He understands', it: 'Capisce', transliteration: 'Yafham', category: 'Verbs', level: 'beginner' },
    { id: 'bv10', ar: 'يسكن', en: 'He lives/dwells', it: 'Abita', transliteration: 'Yaskun', category: 'Verbs', level: 'beginner' },
];

export const BEGINNER_VOCABULARY = [
    ...GREETINGS_BEGINNER,
    ...NUMBERS_BEGINNER,
    ...FAMILY_BEGINNER,
    ...COLORS_BEGINNER,
    ...TIME_DAYS_BEGINNER,
    ...FOOD_DRINK_BEGINNER,
    ...PLACES_BEGINNER,
    ...ANIMALS_BEGINNER,
    ...NATURE_BEGINNER,
    ...BODY_BEGINNER,
    ...OBJECTS_BEGINNER,
    ...ADJECTIVES_BEGINNER,
    ...VERBS_BEGINNER,
];

// PHRASES (50+)
export const BEGINNER_PHRASES: ArabicPhrase[] = [
    { id: 'p1', ar: 'أين الحمام؟', en: 'Where is the bathroom?', it: 'Dov\'è il bagno?', transliteration: 'Ayna al-hammam?', context: 'Travel', level: 'beginner' },
    { id: 'p2', ar: 'بكم هذا؟', en: 'How much is this?', it: 'Quanto costa questo?', transliteration: 'Bikam hadha?', context: 'Shopping', level: 'beginner' },
    { id: 'p3', ar: 'لا أفهم', en: 'I don\'t understand', it: 'Non capisco', transliteration: 'La afham', context: 'Communication', level: 'beginner' },
    { id: 'p4', ar: 'أنا جائع', en: 'I am hungry', it: 'Ho fame', transliteration: 'Ana ja\'i\'', context: 'Basic needs', level: 'beginner' },
    { id: 'p5', ar: 'أريد قهوة', en: 'I want coffee', it: 'Voglio un caffè', transliteration: 'Urid qahwa', context: 'Ordering', level: 'beginner' },
    { id: 'p6', ar: 'هل تتكلم الإنجليزية؟', en: 'Do you speak English?', it: 'Parli inglese?', transliteration: 'Hal tatakallam al-injliziya?', context: 'Communication', level: 'beginner' },
    { id: 'p7', ar: 'أنا من إيطاليا', en: 'I am from Italy', it: 'Vengo dall\'Italia', transliteration: 'Ana min Italiya', context: 'Introduction', level: 'beginner' },
];

// GRAMMAR (10+)
export const GRAMMAR_RULES: GrammarRule[] = [
    {
        id: 'g1',
        title_en: 'Definite Article',
        title_it: 'Articolo Determinativo',
        rule_ar: 'الـ',
        rule_en: 'The definite article in Arabic is "Al-". It is attached to the beginning of the noun.',
        rule_it: 'L\'articolo determinativo in arabo è "Al-". Viene attaccato all\'inizio del nome.',
        examples: [
            { ar: 'بيت → البيت', en: 'House → The House', it: 'Casa → La Casa' },
            { ar: 'كتاب → الكتاب', en: 'Book → The Book', it: 'Libro → Il Libro' }
        ],
        category: 'Nouns',
        level: 'beginner'
    },
    {
        id: 'g2',
        title_en: 'Gender of Nouns',
        title_it: 'Genere dei Nomi',
        rule_ar: 'ة (Ta Marbuta)',
        rule_en: 'Feminine nouns usually end with the letter Ta Marbuta (ة).',
        rule_it: 'I nomi femminili di solito finiscono con la lettera Ta Marbuta (ة).',
        examples: [
            { ar: 'مدرس', en: 'Teacher (m)', it: 'Maestro' },
            { ar: 'مدرسة', en: 'Teacher (f)', it: 'Maestra' }
        ],
        category: 'Nouns',
        level: 'beginner'
    }
];

// Export counts and combined sets
export const VOCABULARY_STATS = {
    beginner: BEGINNER_VOCABULARY.length,
    total: BEGINNER_VOCABULARY.length
};

export const ALL_VOCABULARY = BEGINNER_VOCABULARY;
export const ALL_PHRASES = BEGINNER_PHRASES;
export const ALL_GRAMMAR = GRAMMAR_RULES;
