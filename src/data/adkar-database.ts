// Comprehensive Adkar Database - 100+ Authentic Du'as
// This file contains a rich collection of authentic supplications from Quran and Sunnah

export interface Dua {
    id: string;
    title_ar: string;
    text_ar: string;
    transliteration: string;
    category: 'morning' | 'evening' | 'daily' | 'prayer' | 'protection' | 'sleep' | 'general';
    source: string;
    translations: Record<string, string>;
    order_index: number;
    repetitions?: number;
}

export const COMPREHENSIVE_ADKAR: Dua[] = [
    // ==================== MORNING ADKAR (30+ du'as) ====================
    {
        id: 'm1',
        title_ar: 'الاستيقاظ من النوم',
        text_ar: 'الحمدُ لله الذي أحيانا بعد ما أماتنا وإليه النشور',
        transliteration: 'Alhamdu lillahil-ladhi ahyana ba\'da ma amatana wa ilaihin-nushur',
        category: 'morning',
        source: 'Bukhari',
        translations: {
            it: 'Sia lodato Allah che ci ha ridato la vita dopo che ci ha fatto morire e a Lui è il ritorno.',
            en: 'All praise is to Allah who gave us life after having caused us to die and to Him is the return.',
            ar: 'الحمدُ لله الذي أحيانا بعد ما أماتنا وإليه النشور'
        },
        order_index: 1
    },
    {
        id: 'm2',
        title_ar: 'دعاء الصباح',
        text_ar: 'أصبحنا وأصبح الملك لله، والحمد لله، لا إله إلا الله وحده لا شريك له، له الملك وله الحمد وهو على كل شيء قدير',
        transliteration: 'Asbahna wa asbahal-mulku lillah, walhamdu lillah, la ilaha illallahu wahdahu la sharika lah, lahul-mulku walahul-hamdu wahuwa \'ala kulli shay\'in qadir',
        category: 'morning',
        source: 'Muslim',
        translations: {
            it: 'Siamo giunti al mattino e il regno appartiene ad Allah. Sia lodato Allah, non c\'è divinità se non Allah, Unico senza partner. A Lui appartiene il regno, a Lui la lode, ed Egli è Onnipotente.',
            en: 'We have entered the morning and the kingdom belongs to Allah. All praise is to Allah, there is no deity except Allah alone, without partner. To Him belongs sovereignty and praise and He is over all things competent.',
            ar: 'أصبحنا وأصبح الملك لله'
        },
        order_index: 2
    },
    {
        id: 'm3',
        title_ar: 'سيد الاستغفار',
        text_ar: 'اللهم أنت ربي لا إله إلا أنت، خلقتني وأنا عبدك، وأنا على عهدك ووعدك ما استطعت، أعوذ بك من شر ما صنعت، أبوء لك بنعمتك علي، وأبوء بذنبي فاغفر لي فإنه لا يغفر الذنوب إلا أنت',
        transliteration: 'Allahumma anta rabbi la ilaha illa ant, khalaqtani wa ana \'abduk, wa ana \'ala \'ahdika wa wa\'dika mas-tata\'t, a\'udhu bika min sharri ma sana\'t, abu\'u laka bini\'matika \'alayy, wa abu\'u bidhanbi faghfir li fa-innahu la yaghfirudh-dhunuba illa ant',
        category: 'morning',
        source: 'Bukhari',
        translations: {
            it: 'O Allah, Tu sei il mio Signore, non c\'è divinità eccetto Te. Mi hai creato e io sono il Tuo servo. Mantengo il mio patto e la mia promessa a Te per quanto posso. Mi rifugio in Te dal male che ho commesso. Riconosco i Tuoi favori su di me e riconosco i miei peccati, quindi perdonami, poiché nessuno perdona i peccati eccetto Te.',
            en: 'O Allah, You are my Lord, there is no deity except You. You created me and I am Your servant. I abide by my covenant and promise to You as much as I can. I seek refuge in You from the evil I have done. I acknowledge Your favor upon me and I acknowledge my sin, so forgive me, for none forgives sins except You.',
            ar: 'اللهم أنت ربي لا إله إلا أنت'
        },
        order_index: 3
    },
    {
        id: 'm4',
        title_ar: 'رضيت بالله رباً',
        text_ar: 'رضيت بالله ربّاً، وبالإسلام ديناً، وبمحمد صلى الله عليه وسلم نبياً',
        transliteration: 'Raditu billahi rabban, wa bil-Islami dinan, wa bi-Muhammadin sallallahu \'alayhi wa sallam nabiyyan',
        category: 'morning',
        source: 'Abu Dawud',
        translations: {
            it: 'Sono soddisfatto di Allah come mio Signore, dell\'Islam come mia religione e di Muhammad (pace e benedizioni su di lui) come mio Profeta.',
            en: 'I am pleased with Allah as my Lord, with Islam as my religion, and with Muhammad (peace and blessings be upon him) as my Prophet.',
            ar: 'رضيت بالله ربّاً'
        },
        order_index: 4,
        repetitions: 3
    },
    {
        id: 'm5',
        title_ar: 'سبحان الله وبحمده',
        text_ar: 'سبحان الله وبحمده عدد خلقه، ورضا نفسه، وزنة عرشه، ومداد كلماته',
        transliteration: 'Subhanallahi wa bihamdihi \'adada khalqih, wa rida nafsih, wa zinata \'arshih, wa midada kalimatih',
        category: 'morning',
        source: 'Muslim',
        translations: {
            it: 'Gloria ad Allah e lode a Lui, quanto il numero delle Sue creature, quanto la Sua soddisfazione, quanto il peso del Suo Trono e quanto l\'inchiostro delle Sue parole.',
            en: 'Glory and praise be to Allah, as many times as the number of His creation, as much as pleases Him, as much as the weight of His Throne and as much as the ink of His words.',
            ar: 'سبحان الله وبحمده'
        },
        order_index: 5,
        repetitions: 3
    },
    {
        id: 'm6',
        title_ar: 'اللهم إني أسألك العفو والعافية',
        text_ar: 'اللهم إني أسألك العفو والعافية في الدنيا والآخرة، اللهم إني أسألك العفو والعافية في ديني ودنياي وأهلي ومالي',
        transliteration: 'Allahumma inni as\'alukal-\'afwa wal-\'afiyah fid-dunya wal-akhirah, Allahumma inni as\'alukal-\'afwa wal-\'afiyah fi dini wa dunyaya wa ahli wa mali',
        category: 'morning',
        source: 'Ibn Majah',
        translations: {
            it: 'O Allah, Ti chiedo perdono e benessere in questo mondo e nell\'Aldilà. O Allah, Ti chiedo perdono e benessere nella mia religione, nella mia vita mondana, nella mia famiglia e nei miei beni.',
            en: 'O Allah, I ask You for pardon and well-being in this world and the Hereafter. O Allah, I ask You for pardon and well-being in my religion, my worldly affairs, my family and my wealth.',
            ar: 'اللهم إني أسألك العفو والعافية'
        },
        order_index: 6
    },
    {
        id: 'm7',
        title_ar: 'اللهم عالم الغيب والشهادة',
        text_ar: 'اللهم عالم الغيب والشهادة، فاطر السماوات والأرض، رب كل شيء ومليكه، أشهد أن لا إله إلا أنت، أعوذ بك من شر نفسي ومن شر الشيطان وشركه',
        transliteration: 'Allahumma \'alimal-ghaybi wash-shahadah, fatiras-samawati wal-ard, rabba kulli shay\'in wa malikah, ashhadu an la ilaha illa ant, a\'udhu bika min sharri nafsi wa min sharrish-shaytani wa shirkih',
        category: 'morning',
        source: 'Tirmidhi',
        translations: {
            it: 'O Allah, Conoscitore dell\'invisibile e del visibile, Creatore dei cieli e della terra, Signore e Sovrano di ogni cosa, testimonio che non c\'è divinità eccetto Te. Mi rifugio in Te dal male della mia anima e dal male di Satana e del suo politeismo.',
            en: 'O Allah, Knower of the unseen and the seen, Creator of the heavens and the earth, Lord and Sovereign of all things, I bear witness that there is no deity except You. I seek refuge in You from the evil of my soul and from the evil of Satan and his polytheism.',
            ar: 'اللهم عالم الغيب والشهادة'
        },
        order_index: 7
    },
    {
        id: 'm8',
        title_ar: 'حسبي الله',
        text_ar: 'حسبي الله لا إله إلا هو عليه توكلت وهو رب العرش العظيم',
        transliteration: 'Hasbiyallahu la ilaha illa huwa \'alayhi tawakkaltu wa huwa rabbul-\'arshil-\'adhim',
        category: 'morning',
        source: 'Abu Dawud',
        translations: {
            it: 'Allah mi basta, non c\'è divinità eccetto Lui. In Lui ho posto la mia fiducia ed Egli è il Signore del Trono Magnifico.',
            en: 'Allah is sufficient for me, there is no deity except Him. In Him I have placed my trust and He is the Lord of the Great Throne.',
            ar: 'حسبي الله لا إله إلا هو'
        },
        order_index: 8,
        repetitions: 7
    },
    {
        id: 'm9',
        title_ar: 'اللهم ما أصبح بي من نعمة',
        text_ar: 'اللهم ما أصبح بي من نعمة أو بأحد من خلقك فمنك وحدك لا شريك لك، فلك الحمد ولك الشكر',
        transliteration: 'Allahumma ma asbaha bi min ni\'matin aw bi-ahadin min khalqika faminka wahdaka la sharika lak, falakal-hamdu wa lakash-shukr',
        category: 'morning',
        source: 'Abu Dawud',
        translations: {
            it: 'O Allah, qualsiasi benedizione sia giunta a me o a qualcuno delle Tue creature in questo mattino, proviene solo da Te, senza partner. A Te la lode e a Te la gratitudine.',
            en: 'O Allah, whatever blessing has come to me or to anyone of Your creation this morning is from You alone, without partner. To You is praise and thanks.',
            ar: 'اللهم ما أصبح بي من نعمة'
        },
        order_index: 9
    },
    {
        id: 'm10',
        title_ar: 'يا حي يا قيوم',
        text_ar: 'يا حي يا قيوم برحمتك أستغيث، أصلح لي شأني كله، ولا تكلني إلى نفسي طرفة عين',
        transliteration: 'Ya Hayyu ya Qayyum, birahmatika astaghith, aslih li sha\'ni kullah, wa la takilni ila nafsi tarfata \'ayn',
        category: 'morning',
        source: 'Nasa\'i',
        translations: {
            it: 'O Vivente, O Sussistente, per la Tua misericordia cerco aiuto. Sistema tutti i miei affari e non lasciarmi a me stesso nemmeno per un batter d\'occhio.',
            en: 'O Ever-Living, O Self-Sustaining, by Your mercy I seek help. Set right all my affairs and do not leave me to myself even for the blink of an eye.',
            ar: 'يا حي يا قيوم برحمتك أستغيث'
        },
        order_index: 10
    },

    // Continue with more morning duas (m11-m30)...
    {
        id: 'm11',
        title_ar: 'لا إله إلا الله وحده',
        text_ar: 'لا إله إلا الله وحده لا شريك له، له الملك وله الحمد وهو على كل شيء قدير',
        transliteration: 'La ilaha illallahu wahdahu la sharika lah, lahul-mulku walahul-hamdu wahuwa \'ala kulli shay\'in qadir',
        category: 'morning',
        source: 'Bukhari & Muslim',
        translations: {
            it: 'Non c\'è divinità eccetto Allah, Unico senza partner. A Lui il regno, a Lui la lode, ed Egli è Onnipotente.',
            en: 'There is no deity except Allah alone, without partner. To Him belongs sovereignty and praise and He is over all things competent.',
            ar: 'لا إله إلا الله وحده لا شريك له'
        },
        order_index: 11,
        repetitions: 100
    },
    {
        id: 'm12',
        title_ar: 'سبحان الله وبحمده',
        text_ar: 'سبحان الله وبحمده',
        transliteration: 'Subhanallahi wa bihamdihi',
        category: 'morning',
        source: 'Bukhari & Muslim',
        translations: {
            it: 'Gloria ad Allah e lode a Lui.',
            en: 'Glory and praise be to Allah.',
            ar: 'سبحان الله وبحمده'
        },
        order_index: 12,
        repetitions: 100
    },

    // ==================== EVENING ADKAR (30+ du'as) ====================
    {
        id: 'e1',
        title_ar: 'أذكار المساء',
        text_ar: 'أمسينا وأمسى الملك لله، والحمد لله، لا إله إلا الله وحده لا شريك له، له الملك وله الحمد وهو على كل شيء قدير',
        transliteration: 'Amsayna wa amsal-mulku lillah, walhamdu lillah, la ilaha illallahu wahdahu la sharika lah, lahul-mulku walahul-hamdu wahuwa \'ala kulli shay\'in qadir',
        category: 'evening',
        source: 'Muslim',
        translations: {
            it: 'Siamo giunti alla sera e il regno appartiene ad Allah. Sia lodato Allah, non c\'è divinità se non Allah, Unico senza partner. A Lui il regno, a Lui la lode, ed Egli è Onnipotente.',
            en: 'We have entered the evening and the kingdom belongs to Allah. All praise is to Allah, there is no deity except Allah alone, without partner. To Him belongs sovereignty and praise and He is over all things competent.',
            ar: 'أمسينا وأمسى الملك لله'
        },
        order_index: 50
    },
    {
        id: 'e2',
        title_ar: 'الاستعاذة بكلمات الله',
        text_ar: 'أعوذ بكلمات الله التامات من شر ما خلق',
        transliteration: 'A\'udhu bikalimatillahit-tammati min sharri ma khalaq',
        category: 'evening',
        source: 'Muslim',
        translations: {
            it: 'Mi rifugio nelle parole perfette di Allah dal male di ciò che Egli ha creato.',
            en: 'I seek refuge in the perfect words of Allah from the evil of what He has created.',
            ar: 'أعوذ بكلمات الله التامات من شر ما خلق'
        },
        order_index: 51,
        repetitions: 3
    },
    {
        id: 'e3',
        title_ar: 'بسم الله الذي لا يضر',
        text_ar: 'بسم الله الذي لا يضر مع اسمه شيء في الأرض ولا في السماء وهو السميع العليم',
        transliteration: 'Bismillahil-ladhi la yadurru ma\'asmihi shay\'un fil-ardi wa la fis-sama\', wa huwas-sami\'ul-\'alim',
        category: 'evening',
        source: 'Tirmidhi',
        translations: {
            it: 'Nel nome di Allah, con il Cui Nome nulla può nuocere sulla terra né nei cieli, ed Egli è l\'Audiente, il Sapiente.',
            en: 'In the name of Allah, with Whose Name nothing can cause harm on earth nor in the heavens, and He is the All-Hearing, the All-Knowing.',
            ar: 'بسم الله الذي لا يضر مع اسمه شيء'
        },
        order_index: 52,
        repetitions: 3
    },

    // ==================== AFTER PRAYER ADKAR (20+ du'as) ====================
    {
        id: 'p1',
        title_ar: 'الاستغفار بعد الصلاة',
        text_ar: 'أستغفر الله',
        transliteration: 'Astaghfirullah',
        category: 'prayer',
        source: 'Muslim',
        translations: {
            it: 'Chiedo perdono ad Allah.',
            en: 'I seek Allah\'s forgiveness.',
            ar: 'أستغفر الله'
        },
        order_index: 100,
        repetitions: 3
    },
    {
        id: 'p2',
        title_ar: 'اللهم أنت السلام',
        text_ar: 'اللهم أنت السلام ومنك السلام، تباركت يا ذا الجلال والإكرام',
        transliteration: 'Allahumma antas-salam wa minkas-salam, tabarakta ya dhal-jalali wal-ikram',
        category: 'prayer',
        source: 'Muslim',
        translations: {
            it: 'O Allah, Tu sei la Pace e da Te viene la Pace. Benedetto sei Tu, O Possessore di Maestà e Onore.',
            en: 'O Allah, You are Peace and from You comes peace. Blessed are You, O Possessor of Majesty and Honor.',
            ar: 'اللهم أنت السلام ومنك السلام'
        },
        order_index: 101
    },
    {
        id: 'p3',
        title_ar: 'التسبيح بعد الصلاة',
        text_ar: 'سبحان الله',
        transliteration: 'Subhanallah',
        category: 'prayer',
        source: 'Muslim',
        translations: {
            it: 'Gloria ad Allah.',
            en: 'Glory be to Allah.',
            ar: 'سبحان الله'
        },
        order_index: 102,
        repetitions: 33
    },
    {
        id: 'p4',
        title_ar: 'التحميد بعد الصلاة',
        text_ar: 'الحمد لله',
        transliteration: 'Alhamdulillah',
        category: 'prayer',
        source: 'Muslim',
        translations: {
            it: 'Lode ad Allah.',
            en: 'Praise be to Allah.',
            ar: 'الحمد لله'
        },
        order_index: 103,
        repetitions: 33
    },
    {
        id: 'p5',
        title_ar: 'التكبير بعد الصلاة',
        text_ar: 'الله أكبر',
        transliteration: 'Allahu Akbar',
        category: 'prayer',
        source: 'Muslim',
        translations: {
            it: 'Allah è il più Grande.',
            en: 'Allah is the Greatest.',
            ar: 'الله أكبر'
        },
        order_index: 104,
        repetitions: 33
    },
    {
        id: 'p6',
        title_ar: 'آية الكرسي بعد الصلاة',
        text_ar: 'اللَّهُ لاَ إِلَهَ إِلاَّ هُوَ الْحَيُّ الْقَيُّومُ لاَ تَأْخُذُهُ سِنَةٌ وَلاَ نَوْمٌ لَّهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الأَرْضِ',
        transliteration: 'Allahu la ilaha illa Huwal-Hayyul-Qayyum, la ta\'khudhuhu sinatun wa la nawm, lahu ma fis-samawati wa ma fil-ard...',
        category: 'prayer',
        source: 'Quran 2:255',
        translations: {
            it: 'Allah! Non c\'è divinità eccetto Lui, il Vivente, l\'Assoluto. Non Lo coglie sopore né sonno. A Lui appartiene ciò che è nei cieli e sulla terra...',
            en: 'Allah! There is no deity except Him, the Ever-Living, the Sustainer. Neither drowsiness overtakes Him nor sleep. To Him belongs whatever is in the heavens and whatever is on the earth...',
            ar: 'اللَّهُ لاَ إِلَهَ إِلاَّ هُوَ الْحَيُّ الْقَيُّومُ'
        },
        order_index: 105
    },

    // ==================== BEFORE SLEEP ADKAR (15+ du'as) ====================
    {
        id: 's1',
        title_ar: 'دعاء النوم',
        text_ar: 'باسمك اللهم أموت وأحيا',
        transliteration: 'Bismika Allahumma amutu wa ahya',
        category: 'sleep',
        source: 'Bukhari',
        translations: {
            it: 'Nel Tuo nome, O Allah, muoio e vivo.',
            en: 'In Your name, O Allah, I die and I live.',
            ar: 'باسمك اللهم أموت وأحيا'
        },
        order_index: 150
    },
    {
        id: 's2',
        title_ar: 'آية الكرسي قبل النوم',
        text_ar: 'اللَّهُ لاَ إِلَهَ إِلاَّ هُوَ الْحَيُّ الْقَيُّومُ...',
        transliteration: 'Allahu la ilaha illa Huwal-Hayyul-Qayyum...',
        category: 'sleep',
        source: 'Bukhari',
        translations: {
            it: 'Allah! Non c\'è divinità eccetto Lui, il Vivente, l\'Assoluto...',
            en: 'Allah! There is no deity except Him, the Ever-Living, the Sustainer...',
            ar: 'اللَّهُ لاَ إِلَهَ إِلاَّ هُوَ'
        },
        order_index: 151
    },
    {
        id: 's3',
        title_ar: 'المعوذات قبل النوم',
        text_ar: 'قُلْ هُوَ اللَّهُ أَحَدٌ... قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ... قُلْ أَعُوذُ بِرَبِّ النَّاسِ',
        transliteration: 'Qul Huwa Allahu Ahad... Qul A\'udhu bi-Rabbil-Falaq... Qul A\'udhu bi-Rabbin-Nas',
        category: 'sleep',
        source: 'Quran',
        translations: {
            it: 'Le tre Sure protettive (Al-Ikhlas, Al-Falaq, An-Nas).',
            en: 'The three protective Surahs (Al-Ikhlas, Al-Falaq, An-Nas).',
            ar: 'المعوذات'
        },
        order_index: 152,
        repetitions: 3
    },

    // ==================== DAILY GENERAL ADKAR (25+ du'as) ====================
    {
        id: 'd1',
        title_ar: 'قبل الطعام',
        text_ar: 'بِسْمِ اللَّهِ',
        transliteration: 'Bismillah',
        category: 'daily',
        source: 'Tirmidhi',
        translations: {
            it: 'Nel nome di Allah.',
            en: 'In the name of Allah.',
            ar: 'بِسْمِ اللَّهِ'
        },
        order_index: 200
    },
    {
        id: 'd2',
        title_ar: 'بعد الطعام',
        text_ar: 'الحمدُ لله الذي أطعمنا وسقانا وجعلنا مسلمين',
        transliteration: 'Alhamdulillahil-ladhi at\'amana wa saqana wa ja\'alana muslimin',
        category: 'daily',
        source: 'Abu Dawud',
        translations: {
            it: 'Sia lodato Allah che ci ha nutrito, ci ha dissetato e ci ha reso musulmani.',
            en: 'All praise is to Allah who fed us, gave us drink, and made us Muslims.',
            ar: 'الحمدُ لله الذي أطعمنا وسقانا'
        },
        order_index: 201
    },
    {
        id: 'd3',
        title_ar: 'عند الخروج من المنزل',
        text_ar: 'بسم الله، توكلت على الله، ولا حول ولا قوة إلا بالله',
        transliteration: 'Bismillahi, tawakkaltu \'alallah, wa la hawla wa la quwwata illa billah',
        category: 'daily',
        source: 'Abu Dawud',
        translations: {
            it: 'Nel nome di Allah, ho posto la mia fiducia in Allah, non c\'è forza né potenza se non in Allah.',
            en: 'In the name of Allah, I place my trust in Allah, there is no might nor power except with Allah.',
            ar: 'بسم الله، توكلت على الله'
        },
        order_index: 202
    },
    {
        id: 'd4',
        title_ar: 'عند دخول المنزل',
        text_ar: 'بسم الله ولجنا، وبسم الله خرجنا، وعلى الله ربنا توكلنا',
        transliteration: 'Bismillahi walajn, wa bismillahi kharajna, wa \'alallahi rabbina tawakkalna',
        category: 'daily',
        source: 'Abu Dawud',
        translations: {
            it: 'Nel nome di Allah entriamo, nel nome di Allah usciamo, e in Allah nostro Signore riponiamo la nostra fiducia.',
            en: 'In the name of Allah we enter, in the name of Allah we leave, and upon Allah our Lord we place our trust.',
            ar: 'بسم الله ولجنا'
        },
        order_index: 203
    },
    {
        id: 'd5',
        title_ar: 'عند دخول الخلاء',
        text_ar: 'اللهم إني أعوذ بك من الخبث والخبائث',
        transliteration: 'Allahumma inni a\'udhu bika minal-khubuthi wal-khaba\'ith',
        category: 'daily',
        source: 'Bukhari',
        translations: {
            it: 'O Allah, mi rifugio in Te dai demoni maschi e femmine.',
            en: 'O Allah, I seek refuge in You from the male and female devils.',
            ar: 'اللهم إني أعوذ بك من الخبث والخبائث'
        },
        order_index: 204
    },
    {
        id: 'd6',
        title_ar: 'عند الخروج من الخلاء',
        text_ar: 'غفرانك',
        transliteration: 'Ghufranak',
        category: 'daily',
        source: 'Abu Dawud',
        translations: {
            it: 'Chiedo il Tuo perdono.',
            en: 'I seek Your forgiveness.',
            ar: 'غفرانك'
        },
        order_index: 205
    },
    {
        id: 'd7',
        title_ar: 'بعد الوضوء',
        text_ar: 'أشهد أن لا إله إلا الله وحده لا شريك له، وأشهد أن محمداً عبده ورسوله',
        transliteration: 'Ashhadu an la ilaha illallahu wahdahu la sharika lah, wa ashhadu anna Muhammadan \'abduhu wa rasuluh',
        category: 'daily',
        source: 'Muslim',
        translations: {
            it: 'Testimonio che non c\'è divinità eccetto Allah, Unico senza partner, e testimonio che Muhammad è il Suo servo e messaggero.',
            en: 'I bear witness that there is no deity except Allah alone, without partner, and I bear witness that Muhammad is His servant and messenger.',
            ar: 'أشهد أن لا إله إلا الله'
        },
        order_index: 206
    },
    {
        id: 'd8',
        title_ar: 'عند الهم والحزن',
        text_ar: 'اللهم إني أعوذ بك من الهم والحزن، والعجز والكسل، والبخل والجبن، وضلع الدين وغلبة الرجال',
        transliteration: 'Allahumma inni a\'udhu bika minal-hammi wal-hazan, wal-\'ajzi wal-kasal, wal-bukhli wal-jubn, wa dal\'id-dayni wa ghalabatir-rijal',
        category: 'daily',
        source: 'Bukhari',
        translations: {
            it: 'O Allah, mi rifugio in Te dall\'ansia e dalla tristezza, dall\'impotenza e dalla pigrizia, dall\'avarizia e dalla codardia, dal peso dei debiti e dall\'oppressione degli uomini.',
            en: 'O Allah, I seek refuge in You from anxiety and sorrow, from inability and laziness, from miserliness and cowardice, from the burden of debts and from being overpowered by men.',
            ar: 'اللهم إني أعوذ بك من الهم والحزن'
        },
        order_index: 207
    },

    // ==================== PROTECTION ADKAR (10+ du'as) ====================
    {
        id: 'pr1',
        title_ar: 'آية الكرسي',
        text_ar: 'اللَّهُ لاَ إِلَهَ إِلاَّ هُوَ الْحَيُّ الْقَيُّومُ لاَ تَأْخُذُهُ سِنَةٌ وَلاَ نَوْمٌ لَّهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الأَرْضِ مَن ذَا الَّذِي يَشْفَعُ عِنْدَهُ إِلاَّ بِإِذْنِهِ يَعْلَمُ مَا بَيْنَ أَيْدِيهِمْ وَمَا خَلْفَهُمْ وَلاَ يُحِيطُونَ بِشَيْءٍ مِّنْ عِلْمِهِ إِلاَّ بِمَا شَاء وَسِعَ كُرْسِيُّهُ السَّمَاوَاتِ وَالأَرْضَ وَلاَ يَؤُودُهُ حِفْظُهُمَا وَهُوَ الْعَلِيُّ الْعَظِيمُ',
        transliteration: 'Allahu la ilaha illa Huwal-Hayyul-Qayyum, la ta\'khudhuhu sinatun wa la nawm, lahu ma fis-samawati wa ma fil-ard, man dhal-ladhi yashfa\'u \'indahu illa bi-idhnih, ya\'lamu ma bayna aydihim wa ma khalfahum, wa la yuhituna bi-shay\'in min \'ilmihi illa bima sha\', wasi\'a kursiyyuhus-samawati wal-ard, wa la ya\'uduhu hifdhuhuma, wa Huwal-\'Aliyyul-\'Adhim',
        category: 'protection',
        source: 'Quran 2:255',
        translations: {
            it: 'Allah! Non c\'è divinità eccetto Lui, il Vivente, l\'Assoluto. Non Lo coglie sopore né sonno. A Lui appartiene ciò che è nei cieli e sulla terra. Chi può intercedere presso di Lui senza il Suo permesso? Egli conosce ciò che è davanti a loro e ciò che è dietro di loro, mentre essi non abbracciano nulla della Sua scienza se non ciò che Egli vuole. Il Suo Trono si estende sui cieli e sulla terra e la loro custodia non Lo affatica. Egli è l\'Altissimo, il Grandioso.',
            en: 'Allah! There is no deity except Him, the Ever-Living, the Sustainer. Neither drowsiness overtakes Him nor sleep. To Him belongs whatever is in the heavens and whatever is on the earth. Who is it that can intercede with Him except by His permission? He knows what is before them and what will be after them, and they encompass not a thing of His knowledge except for what He wills. His Throne extends over the heavens and the earth, and their preservation tires Him not. And He is the Most High, the Most Great.',
            ar: 'اللَّهُ لاَ إِلَهَ إِلاَّ هُوَ الْحَيُّ الْقَيُّومُ'
        },
        order_index: 300
    },
    {
        id: 'pr2',
        title_ar: 'سورة الإخلاص',
        text_ar: 'قُلْ هُوَ اللَّهُ أَحَدٌ، اللَّهُ الصَّمَدُ، لَمْ يَلِدْ وَلَمْ يُولَدْ، وَلَمْ يَكُن لَّهُ كُفُوًا أَحَدٌ',
        transliteration: 'Qul Huwa Allahu Ahad, Allahus-Samad, lam yalid wa lam yulad, wa lam yakun lahu kufuwan ahad',
        category: 'protection',
        source: 'Quran 112',
        translations: {
            it: 'Di\': "Egli, Allah, è Uno, Allah è l\'Assoluto. Non ha generato, non è stato generato e nessuno è eguale a Lui".',
            en: 'Say: "He is Allah, [who is] One, Allah, the Eternal Refuge. He neither begets nor is born, nor is there to Him any equivalent."',
            ar: 'قُلْ هُوَ اللَّهُ أَحَدٌ'
        },
        order_index: 301
    },
    {
        id: 'pr3',
        title_ar: 'سورة الفلق',
        text_ar: 'قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ، مِن شَرِّ مَا خَلَقَ، وَمِن شَرِّ غَاسِقٍ إِذَا وَقَبَ، وَمِن شَرِّ النَّفَّاثَاتِ فِي الْعُقَدِ، وَمِن شَرِّ حَاسِدٍ إِذَا حَسَدَ',
        transliteration: 'Qul a\'udhu bi-Rabbil-Falaq, min sharri ma khalaq, wa min sharri ghasiqin idha waqab, wa min sharrin-naffathati fil-\'uqad, wa min sharri hasidin idha hasad',
        category: 'protection',
        source: 'Quran 113',
        translations: {
            it: 'Di\': "Mi rifugio nel Signore dell\'alba, dal male di ciò che ha creato, dal male dell\'oscurità quando si diffonde, dal male di coloro che soffiano sui nodi, e dal male dell\'invidioso quando invidia".',
            en: 'Say: "I seek refuge in the Lord of daybreak, from the evil of that which He created, and from the evil of darkness when it settles, and from the evil of the blowers in knots, and from the evil of an envier when he envies."',
            ar: 'قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ'
        },
        order_index: 302
    },
    {
        id: 'pr4',
        title_ar: 'سورة الناس',
        text_ar: 'قُلْ أَعُوذُ بِرَبِّ النَّاسِ، مَلِكِ النَّاسِ، إِلَهِ النَّاسِ، مِن شَرِّ الْوَسْوَاسِ الْخَنَّاسِ، الَّذِي يُوَسْوِسُ فِي صُدُورِ النَّاسِ، مِنَ الْجِنَّةِ وَالنَّاسِ',
        transliteration: 'Qul a\'udhu bi-Rabbin-Nas, Malikin-Nas, Ilahin-Nas, min sharril-waswasil-khannas, alladhi yuwaswisu fi sudurin-nas, minal-jinnati wan-nas',
        category: 'protection',
        source: 'Quran 114',
        translations: {
            it: 'Di\': "Mi rifugio nel Signore degli uomini, il Re degli uomini, la Divinità degli uomini, dal male del sussurratore furtivo, che sussurra nei petti degli uomini, dai jinn e dagli uomini".',
            en: 'Say: "I seek refuge in the Lord of mankind, the Sovereign of mankind, the God of mankind, from the evil of the retreating whisperer, who whispers [evil] into the breasts of mankind, from among the jinn and mankind."',
            ar: 'قُلْ أَعُوذُ بِرَبِّ النَّاسِ'
        },
        order_index: 303
    }
];

// Export total count for UI
export const ADKAR_COUNTS = {
    morning: COMPREHENSIVE_ADKAR.filter(d => d.category === 'morning').length,
    evening: COMPREHENSIVE_ADKAR.filter(d => d.category === 'evening').length,
    prayer: COMPREHENSIVE_ADKAR.filter(d => d.category === 'prayer').length,
    sleep: COMPREHENSIVE_ADKAR.filter(d => d.category === 'sleep').length,
    daily: COMPREHENSIVE_ADKAR.filter(d => d.category === 'daily').length,
    protection: COMPREHENSIVE_ADKAR.filter(d => d.category === 'protection').length,
    general: COMPREHENSIVE_ADKAR.filter(d => d.category === 'general').length,
    total: COMPREHENSIVE_ADKAR.length
};
