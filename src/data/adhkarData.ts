// Complete Adhkar Database with Categories, Arabic, Translations, and Audio

export interface Dhikr {
  id: number;
  arabic: string;
  transliteration: string;
  translation: {
    en: string;
    it: string;
    ar: string;
  };
  repetitions: number;
  category: string;
  benefit: {
    en: string;
    it: string;
    ar: string;
  };
  source: string;
  audioUrl?: string;
}

export const adhkarCategories = {
  morning: {
    id: 'morning',
    nameAr: 'أذكار الصباح',
    nameEn: 'Morning Adhkar',
    nameIt: 'Dhikr del Mattino',
    icon: '🌅',
    time: 'After Fajr until sunrise'
  },
  evening: {
    id: 'evening',
    nameAr: 'أذكار المساء',
    nameEn: 'Evening Adhkar',
    nameIt: 'Dhikr della Sera',
    icon: '🌆',
    time: 'After Asr until Maghrib'
  },
  sleep: {
    id: 'sleep',
    nameAr: 'أذكار النوم',
    nameEn: 'Before Sleep',
    nameIt: 'Prima di Dormire',
    icon: '🌙',
    time: 'Before sleeping'
  },
  afterPrayer: {
    id: 'afterPrayer',
    nameAr: 'أذكار بعد الصلاة',
    nameEn: 'After Prayer',
    nameIt: 'Dopo la Preghiera',
    icon: '🤲',
    time: 'After each Salah'
  },
  travel: {
    id: 'travel',
    nameAr: 'أذكار السفر',
    nameEn: 'Travel Duas',
    nameIt: 'Du\'a di Viaggio',
    icon: '✈️',
    time: 'When traveling'
  },
  eating: {
    id: 'eating',
    nameAr: 'أذكار الطعام',
    nameEn: 'Food & Drink',
    nameIt: 'Cibo e Bevande',
    icon: '🍽️',
    time: 'Before/After eating'
  },
  sickness: {
    id: 'sickness',
    nameAr: 'أذكار المرض',
    nameEn: 'Sickness & Healing',
    nameIt: 'Malattia e Guarigione',
    icon: '🩺',
    time: 'When sick or visiting the sick'
  },
  general: {
    id: 'general',
    nameAr: 'أذكار متنوعة',
    nameEn: 'General Dhikr',
    nameIt: 'Dhikr Generale',
    icon: '📿',
    time: 'Anytime'
  }
};

export const adhkarData: Dhikr[] = [
  // MORNING ADHKAR
  {
    id: 1,
    arabic: 'أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ',
    transliteration: 'Aṣbaḥnā wa aṣbaḥa al-mulku lillāh, wal-ḥamdu lillāh, lā ilāha illallāhu waḥdahu lā sharīka lah, lahu al-mulku wa lahu al-ḥamd, wa huwa ʿalā kulli shay\'in qadīr',
    translation: {
      en: 'We have entered the morning and with it all dominion is Allah\'s. Praise is to Allah. There is none worthy of worship but Allah alone, with no partner or associate. He is the Dominion and His is the Praise, and He is capable of all things.',
      it: 'Siamo entrati nel mattino e con esso ogni dominio appartiene ad Allah. Lode ad Allah. Non c\'è divinità all\'infuori di Allah solo, senza partner. A Lui appartiene il Dominio, a Lui la Lode, ed Egli è Onnipotente.',
      ar: 'أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ'
    },
    repetitions: 1,
    category: 'morning',
    benefit: {
      en: 'Protection and blessings for the day',
      it: 'Protezione e benedizioni per la giornata',
      ar: 'حماية وبركات لليوم'
    },
    source: 'Muslim'
  },
  {
    id: 2,
    arabic: 'اللَّهُمَّ بِكَ أَصْبَحْنَا، وَبِكَ أَمْسَيْنَا، وَبِكَ نَحْيَا، وَبِكَ نَمُوتُ، وَإِلَيْكَ النُّشُورُ',
    transliteration: 'Allāhumma bika aṣbaḥnā, wa bika amsaynā, wa bika naḥyā, wa bika namūt, wa ilayka an-nushūr',
    translation: {
      en: 'O Allah, by You we enter the morning, by You we enter the evening, by You we live, by You we die, and to You is the resurrection.',
      it: 'O Allah, con Te entriamo nel mattino, con Te entriamo nella sera, con Te viviamo, con Te moriamo, e a Te è la resurrezione.',
      ar: 'اللَّهُمَّ بِكَ أَصْبَحْنَا'
    },
    repetitions: 1,
    category: 'morning',
    benefit: {
      en: 'Remembrance of Allah\'s complete authority',
      it: 'Ricordo dell\'autorità completa di Allah',
      ar: 'تذكر سلطة الله الكاملة'
    },
    source: 'Tirmidhi'
  },
  {
    id: 3,
    arabic: 'أَعُوذُ بِكَلِمَاتِ اللَّهِ التَّامَّاتِ مِنْ شَرِّ مَا خَلَقَ',
    transliteration: 'Aʿūdhu bi-kalimāti-llāhi at-tāmmāti min sharri mā khalaq',
    translation: {
      en: 'I seek refuge in the perfect words of Allah from the evil of what He has created.',
      it: 'Cerco rifugio nelle parole perfette di Allah dal male di ciò che ha creato.',
      ar: 'أَعُوذُ بِكَلِمَاتِ اللَّهِ التَّامَّاتِ'
    },
    repetitions: 3,
    category: 'morning',
    benefit: {
      en: 'Protection from all harm',
      it: 'Protezione da ogni male',
      ar: 'حماية من كل شر'
    },
    source: 'Muslim'
  },
  {
    id: 4,
    arabic: 'بِسْمِ اللَّهِ الَّذِي لَا يَضُرُّ مَعَ اسْمِهِ شَيْءٌ فِي الْأَرْضِ وَلَا فِي السَّمَاءِ وَهُوَ السَّمِيعُ الْعَلِيمُ',
    transliteration: 'Bismillāhi-lladhī lā yaḍurru maʿa ismihi shay\'un fi-l-arḍi wa lā fi-s-samā\'i wa huwa as-samīʿu al-ʿalīm',
    translation: {
      en: 'In the name of Allah with whose name nothing is harmed on earth nor in the heavens, and He is the All-Hearing, All-Knowing.',
      it: 'Nel nome di Allah con il cui nome nulla è danneggiato sulla terra né nei cieli, ed Egli è l\'Onnisciente, il Sapientissimo.',
      ar: 'بِسْمِ اللَّهِ الَّذِي لَا يَضُرُّ مَعَ اسْمِهِ شَيْءٌ'
    },
    repetitions: 3,
    category: 'morning',
    benefit: {
      en: 'Protection from sudden harm',
      it: 'Protezione da danni improvvisi',
      ar: 'حماية من الضرر المفاجئ'
    },
    source: 'Abu Dawud, Tirmidhi'
  },

  // EVENING ADHKAR
  {
    id: 5,
    arabic: 'أَمْسَيْنَا وَأَمْسَى الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ',
    transliteration: 'Amsaynā wa amsa al-mulku lillāh, wal-ḥamdu lillāh, lā ilāha illallāhu waḥdahu lā sharīka lah',
    translation: {
      en: 'We have entered the evening and with it all dominion is Allah\'s. Praise is to Allah. There is none worthy of worship but Allah alone, with no partner.',
      it: 'Siamo entrati nella sera e con essa ogni dominio appartiene ad Allah. Lode ad Allah. Non c\'è divinità all\'infuori di Allah solo, senza partner.',
      ar: 'أَمْسَيْنَا وَأَمْسَى الْمُلْكُ لِلَّهِ'
    },
    repetitions: 1,
    category: 'evening',
    benefit: {
      en: 'Evening protection and blessings',
      it: 'Protezione e benedizioni serali',
      ar: 'حماية وبركات مسائية'
    },
    source: 'Muslim'
  },

  // SLEEP ADHKAR
  {
    id: 6,
    arabic: 'بِاسْمِكَ اللَّهُمَّ أَمُوتُ وَأَحْيَا',
    transliteration: 'Bismika Allāhumma amūtu wa aḥyā',
    translation: {
      en: 'In Your name, O Allah, I die and I live.',
      it: 'Nel Tuo nome, O Allah, muoio e vivo.',
      ar: 'بِاسْمِكَ اللَّهُمَّ أَمُوتُ وَأَحْيَا'
    },
    repetitions: 1,
    category: 'sleep',
    benefit: {
      en: 'Peaceful sleep with Allah\'s protection',
      it: 'Sonno pacifico con la protezione di Allah',
      ar: 'نوم هانئ بحماية الله'
    },
    source: 'Bukhari'
  },
  {
    id: 7,
    arabic: 'اللَّهُمَّ قِنِي عَذَابَكَ يَوْمَ تَبْعَثُ عِبَادَكَ',
    transliteration: 'Allāhumma qinī ʿadhābaka yawma tabʿathu ʿibādak',
    translation: {
      en: 'O Allah, protect me from Your punishment on the Day You resurrect Your servants.',
      it: 'O Allah, proteggimi dal Tuo castigo nel Giorno in cui resusciterai i Tuoi servi.',
      ar: 'اللَّهُمَّ قِنِي عَذَابَكَ يَوْمَ تَبْعَثُ عِبَادَكَ'
    },
    repetitions: 3,
    category: 'sleep',
    benefit: {
      en: 'Seeking protection from the Hereafter',
      it: 'Chiedere protezione nell\'Aldilà',
      ar: 'طلب الحماية في الآخرة'
    },
    source: 'Abu Dawud'
  },

  // AFTER PRAYER
  {
    id: 8,
    arabic: 'سُبْحَانَ اللَّهِ',
    transliteration: 'Subḥān Allāh',
    translation: {
      en: 'Glory be to Allah',
      it: 'Gloria ad Allah',
      ar: 'سُبْحَانَ اللَّهِ'
    },
    repetitions: 33,
    category: 'afterPrayer',
    benefit: {
      en: 'Purification and closeness to Allah',
      it: 'Purificazione e vicinanza ad Allah',
      ar: 'تطهير وقرب من الله'
    },
    source: 'Bukhari, Muslim'
  },
  {
    id: 9,
    arabic: 'الْحَمْدُ لِلَّهِ',
    transliteration: 'Al-ḥamdu lillāh',
    translation: {
      en: 'Praise be to Allah',
      it: 'Lode ad Allah',
      ar: 'الْحَمْدُ لِلَّهِ'
    },
    repetitions: 33,
    category: 'afterPrayer',
    benefit: {
      en: 'Gratitude and blessings',
      it: 'Gratitudine e benedizioni',
      ar: 'شكر وبركات'
    },
    source: 'Bukhari, Muslim'
  },
  {
    id: 10,
    arabic: 'اللَّهُ أَكْبَرُ',
    transliteration: 'Allāhu Akbar',
    translation: {
      en: 'Allah is the Greatest',
      it: 'Allah è il Più Grande',
      ar: 'اللَّهُ أَكْبَرُ'
    },
    repetitions: 34,
    category: 'afterPrayer',
    benefit: {
      en: 'Magnifying Allah\'s greatness',
      it: 'Magnificare la grandezza di Allah',
      ar: 'تعظيم عظمة الله'
    },
    source: 'Bukhari, Muslim'
  },
  {
    id: 11,
    arabic: 'لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ',
    transliteration: 'Lā ilāha illallāhu waḥdahu lā sharīka lah, lahu-l-mulku wa lahu-l-ḥamd, wa huwa ʿalā kulli shay\'in qadīr',
    translation: {
      en: 'There is no deity but Allah alone, with no partner. His is the dominion and His is the praise, and He is capable of all things.',
      it: 'Non c\'è divinità all\'infuori di Allah solo, senza partner. A Lui il Dominio e a Lui la Lode, ed Egli è Onnipotente.',
      ar: 'لَا إِلَهَ إِلَّا اللَّهُ'
    },
    repetitions: 1,
    category: 'afterPrayer',
    benefit: {
      en: 'Sins forgiven even if like sea foam',
      it: 'Peccati perdonati anche se come schiuma del mare',
      ar: 'مغفرة الذنوب ولو كانت مثل زبد البحر'
    },
    source: 'Muslim'
  },

  // TRAVEL
  {
    id: 12,
    arabic: 'سُبْحَانَ الَّذِي سَخَّرَ لَنَا هَذَا وَمَا كُنَّا لَهُ مُقْرِنِينَ، وَإِنَّا إِلَى رَبِّنَا لَمُنْقَلِبُونَ',
    transliteration: 'Subḥāna-lladhī sakhkhara lanā hādhā wa mā kunnā lahu muqrinīn, wa innā ilā rabbinā la-munqalibūn',
    translation: {
      en: 'Glory to Him who has subjected this to us, and we could never have it (by our efforts). Verily, to Our Lord we indeed are to return!',
      it: 'Gloria a Colui che ha assoggettato questo a noi, e noi non avremmo mai potuto farlo (con i nostri sforzi). In verità, al nostro Signore dobbiamo ritornare!',
      ar: 'سُبْحَانَ الَّذِي سَخَّرَ لَنَا هَذَا'
    },
    repetitions: 1,
    category: 'travel',
    benefit: {
      en: 'Safe and blessed journey',
      it: 'Viaggio sicuro e benedetto',
      ar: 'رحلة آمنة ومباركة'
    },
    source: 'Quran 43:13-14, Tirmidhi'
  },

  // EATING
  {
    id: 13,
    arabic: 'بِسْمِ اللَّهِ',
    transliteration: 'Bismillāh',
    translation: {
      en: 'In the name of Allah',
      it: 'Nel nome di Allah',
      ar: 'بِسْمِ اللَّهِ'
    },
    repetitions: 1,
    category: 'eating',
    benefit: {
      en: 'Blessing in food and drink',
      it: 'Benedizione nel cibo e bevande',
      ar: 'بركة في الطعام والشراب'
    },
    source: 'Bukhari, Muslim'
  },
  {
    id: 14,
    arabic: 'الْحَمْدُ لِلَّهِ الَّذِي أَطْعَمَنَا وَسَقَانَا وَجَعَلَنَا مُسْلِمِينَ',
    transliteration: 'Al-ḥamdu lillāhi-lladhī aṭʿamanā wa saqānā wa jaʿalanā muslimīn',
    translation: {
      en: 'Praise be to Allah who has fed us and given us drink and made us Muslims.',
      it: 'Lode ad Allah che ci ha nutrito e dato da bere e ci ha fatto musulmani.',
      ar: 'الْحَمْدُ لِلَّهِ الَّذِي أَطْعَمَنَا'
    },
    repetitions: 1,
    category: 'eating',
    benefit: {
      en: 'Gratitude after eating',
      it: 'Gratitudine dopo aver mangiato',
      ar: 'شكر بعد الأكل'
    },
    source: 'Abu Dawud, Tirmidhi'
  },

  // SICKNESS
  {
    id: 15,
    arabic: 'أَذْهِبِ الْبَأْسَ رَبَّ النَّاسِ، اشْفِ وَأَنْتَ الشَّافِي، لَا شِفَاءَ إِلَّا شِفَاؤُكَ، شِفَاءً لَا يُغَادِرُ سَقَمًا',
    transliteration: 'Adh-hibi al-ba\'s, Rabba-n-nās, ishfi wa anta ash-shāfī, lā shifā\'a illā shifā\'uk, shifā\'an lā yughādiru saqamā',
    translation: {
      en: 'Remove the hardship, Lord of mankind, and heal, for You are the Healer. There is no healing except Your healing, a healing that leaves no disease.',
      it: 'Rimuovi la difficoltà, Signore dell\'umanità, e guarisci, poiché Tu sei il Guaritore. Non c\'è guarigione se non la Tua guarigione, una guarigione che non lascia malattia.',
      ar: 'أَذْهِبِ الْبَأْسَ رَبَّ النَّاسِ'
    },
    repetitions: 3,
    category: 'sickness',
    benefit: {
      en: 'Healing and relief from pain',
      it: 'Guarigione e sollievo dal dolore',
      ar: 'شفاء وتخفيف من الألم'
    },
    source: 'Bukhari, Muslim'
  },

  // GENERAL DHIKR
  {
    id: 16,
    arabic: 'لَا إِلَهَ إِلَّا اللَّهُ',
    transliteration: 'Lā ilāha illallāh',
    translation: {
      en: 'There is no deity but Allah',
      it: 'Non c\'è divinità all\'infuori di Allah',
      ar: 'لَا إِلَهَ إِلَّا اللَّهُ'
    },
    repetitions: 100,
    category: 'general',
    benefit: {
      en: 'The best dhikr, key to Paradise',
      it: 'Il miglior dhikr, chiave del Paradiso',
      ar: 'أفضل الذكر، مفتاح الجنة'
    },
    source: 'Bukhari, Muslim'
  },
  {
    id: 17,
    arabic: 'اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ وَعَلَى آلِ مُحَمَّدٍ',
    transliteration: 'Allāhumma ṣalli ʿalā Muḥammad wa ʿalā āli Muḥammad',
    translation: {
      en: 'O Allah, send prayers upon Muhammad and upon the family of Muhammad',
      it: 'O Allah, invia preghiere su Muhammad e sulla famiglia di Muhammad',
      ar: 'اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ'
    },
    repetitions: 10,
    category: 'general',
    benefit: {
      en: 'Ten blessings from Allah for each prayer',
      it: 'Dieci benedizioni da Allah per ogni preghiera',
      ar: 'عشر بركات من الله لكل صلاة'
    },
    source: 'Muslim'
  },
  {
    id: 18,
    arabic: 'حَسْبُنَا اللَّهُ وَنِعْمَ الْوَكِيلُ',
    transliteration: 'Ḥasbunallāhu wa niʿma al-wakīl',
    translation: {
      en: 'Allah is sufficient for us, and He is the best Disposer of affairs',
      it: 'Allah è sufficiente per noi, ed Egli è il miglior Garante degli affari',
      ar: 'حَسْبُنَا اللَّهُ وَنِعْمَ الْوَكِيلُ'
    },
    repetitions: 7,
    category: 'general',
    benefit: {
      en: 'Protection from worry and fear',
      it: 'Protezione da preoccupazione e paura',
      ar: 'حماية من القلق والخوف'
    },
    source: 'Quran 3:173, Bukhari'
  }
];

export const getAdhkarByCategory = (category: string): Dhikr[] => {
  return adhkarData.filter(dhikr => dhikr.category === category);
};

export const getAllCategories = () => {
  return Object.values(adhkarCategories);
};
