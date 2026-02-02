export interface LocalHadith {
    id: string;
    narrator: string;
    text_ar: string;
    text_it: string;
    text_en: string;
    collection: string;
    grade: string;
}

export const HADITH_DATABASE: LocalHadith[] = [
    {
        id: "b1",
        collection: "bukhari",
        narrator: "Umar bin Al-Khattab",
        text_ar: "إِنَّمَا الأَعْمَالُ بِالنِّيَّاتِ، وَإِنَّمَا لِكُلِّ امْرِئٍ مَا نَوَى",
        text_it: "Le azioni sono valutate in base alle intenzioni, e ad ogni uomo spetterà ciò che ha inteso.",
        text_en: "Actions are but by intention and every man shall have but that which he intended.",
        grade: "Sahih"
    },
    {
        id: "b2",
        collection: "bukhari",
        narrator: "Abu Huraira",
        text_ar: "مَنْ كَانَ يُؤْمِنُ بِاللَّهِ وَالْيَوْمِ الآخِرِ فَلْيَقُلْ خَيْرًا أَوْ لِيَصْمُتْ",
        text_it: "Chi crede in Allah e nell'Ultimo Giorno, che dica il bene o resti in silenzio.",
        text_en: "Whoever believes in Allah and the Last Day, let him speak good or remain silent.",
        grade: "Sahih"
    },
    {
        id: "m1",
        collection: "muslim",
        narrator: "Abu Huraira",
        text_ar: "الدِّينُ النَّصِيحَةُ",
        text_it: "La religione è sincerità (Nasiha).",
        text_en: "Religion is sincerity (Nasiha).",
        grade: "Sahih"
    },
    {
        id: "b3",
        collection: "bukhari",
        narrator: "Anas bin Malik",
        text_ar: "لاَ يُؤْمِنُ أَحَدُكُمْ حَتَّى يُحِبَّ لأَخِيهِ مَا يُحِبُّ لِنَفْسِهِ",
        text_it: "Nessuno di voi crede veramente finché non desidera per suo fratello quello che desidera per se stesso.",
        text_en: "None of you truly believes until he loves for his brother what he loves for himself.",
        grade: "Sahih"
    },
    {
        id: "b4",
        collection: "bukhari",
        narrator: "Aisha (RA)",
        text_ar: "مَنْ أَحْدَثَ فِي أَمْرِنَا هَذَا مَا لَيْسَ فِيهِ فَهُوَ رَدٌّ",
        text_it: "Chiunque introduca in questa nostra questione (religione) qualcosa che non ne fa parte, essa sarà respinta.",
        text_en: "Whoever innovates something in this matter of ours (religion) which is not part of it, it will be rejected.",
        grade: "Sahih"
    },
    {
        id: "m2",
        collection: "muslim",
        narrator: "Abu Huraira",
        text_ar: "مَنْ سَلَكَ طَرِيقًا يَلْتَمِسُ فِيهِ عِلْمًا سَهَّلَ اللَّهُ لَهُ بِهِ طَرِيقًا إِلَى الْجَنَّةِ",
        text_it: "Chi intraprende un cammino per cercare la conoscenza, Allah gli faciliterà il cammino verso il Paradiso.",
        text_en: "Whoever follows a path in pursuit of knowledge, Allah will make easy for him a path to Paradise.",
        grade: "Sahih"
    },
    {
        id: "b5",
        collection: "bukhari",
        narrator: "Abu Huraira",
        text_ar: "الْمُسْلِمُ مَنْ سَلِمَ الْمُسْلِمُونَ مِنْ لِسَانِهِ وَيَدِهِ",
        text_it: "Il musulmano è colui dal quale gli altri musulmani sono al sicuro dalla sua lingua e dalla sua mano.",
        text_en: "A Muslim is the one from whose tongue and hands other Muslims are safe.",
        grade: "Sahih"
    },
    {
        id: "m3",
        collection: "muslim",
        narrator: "Abu Musa al-Ash'ari",
        text_ar: "الطُّهُورُ شَطْرُ الإِيمَانِ",
        text_it: "La purezza è metà della fede.",
        text_en: "Purity is half of faith.",
        grade: "Sahih"
    },
    {
        id: "b6",
        collection: "bukhari",
        narrator: "Abdullah bin Amr",
        text_ar: "بَلِّغُوا عَنِّي وَلَوْ آيَةً",
        text_it: "Trasmettete da parte mia, anche se si trattasse di un solo versetto.",
        text_en: "Convey from me, even if it is only one verse.",
        grade: "Sahih"
    },
    {
        id: "m4",
        collection: "muslim",
        narrator: "Abu Huraira",
        text_ar: "إِنَّ اللَّهَ لاَ يَنْظُرُ إِلَى صُوَرِكُمْ وَأَمْوَالِكُمْ وَلَكِنْ يَنْظُرُ إِلَى قُلُوبِكُمْ وَأَعْمَالِكُمْ",
        text_it: "In verità, Allah non guarda il vostro aspetto o le vostre ricchezze, ma guarda i vostri cuori e le vore azioni.",
        text_en: "Verily, Allah does not look at your appearance or wealth, but He looks at your hearts and your deeds.",
        grade: "Sahih"
    }
];
