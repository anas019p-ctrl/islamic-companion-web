export interface FAQ {
    id: string;
    question_it: string;
    question_en: string;
    question_ar: string;
    keywords: string[]; // for simple search matching
    answer_it: string;
    answer_en: string;
    answer_ar: string;
}

export const offlineFAQs: FAQ[] = [
    {
        id: "faq-1",
        question_it: "Cos'è l'Islam?",
        question_en: "What is Islam?",
        question_ar: "Ù…Ø§ Ù‡Ùˆ Ø§Ù„Ø¥Ø³Ù„Ø§Ù…ØŸ",
        keywords: ["islam", "cos'è", "significato", "religione", "what is", "meaning", "religion"],
        answer_it: "L'Islam è una religione monoteista basata sulla sottomissione alla volontà di Allah. I suoi fondamenti sono i 5 Pilastri: Testimonianza di fede (Shahada), Preghiera (Salah), Elemosina (Zakat), Digiuno (Sawm) e Pellegrinaggio (Hajj).",
        answer_en: "Islam is a monotheistic religion based on submission to the will of Allah. Its foundations are the 5 Pillars: Declaration of Faith (Shahada), Prayer (Salah), Charity (Zakat), Fasting (Sawm), and Pilgrimage (Hajj).",
        answer_ar: "Ø§Ù„Ø¥Ø³Ù„Ø§Ù… Ù‡Ùˆ Ø¯ÙŠÙ† ØªÙˆØ­ÙŠØ¯ÙŠ ÙŠÙ‚ÙˆÙ… Ø¹Ù„Ù‰ Ø§Ù„Ø§Ø³ØªØ³Ù„Ø§Ù… Ù„Ø¥Ø±Ø§Ø¯Ø© Ø§Ù„Ù„Ù‡. Ø£Ø³Ø³Ù‡ Ù‡ÙŠ Ø§Ù„Ø£Ø±ÙƒØ§Ù† Ø§Ù„Ø®Ù…Ø³Ø©: Ø§Ù„Ø´Ù‡Ø§Ø¯Ø©ØŒ Ø§Ù„ØµÙ„Ø§Ø©ØŒ Ø§Ù„Ø²ÙƒØ§Ø©ØŒ Ø§Ù„ØµÙˆÙ…ØŒ ÙˆØ§Ù„Ø­Ø¬."
    },
    {
        id: "faq-2",
        question_it: "Chi è il Profeta Muhammad?",
        question_en: "Who is Prophet Muhammad?",
        question_ar: "Ù…Ù† Ù‡Ùˆ Ø§Ù„Ù†Ø¨ÙŠ Ù…Ø­Ù…Ø¯ØŸ",
        keywords: ["muhammad", "profeta", "chi è", "prophet", "who is", "mohammed"],
        answer_it: "Il Profeta Muhammad (pace e benedizione su di lui) è l'ultimo messaggero di Allah, inviato a tutta l'umanità per trasmettere il Sacro Corano e insegnare l'Islam.",
        answer_en: "Prophet Muhammad (peace and blessings be upon him) is the final messenger of Allah, sent to all of humanity to deliver the Holy Quran and teach Islam.",
        answer_ar: "Ø§Ù„Ù†Ø¨ÙŠ Ù…Ø­Ù…Ø¯ (ØµÙ„Ù‰ Ø§Ù„Ù„Ù‡ Ø¹Ù„ÙŠÙ‡ ÙˆØ³Ù„Ù…) Ù‡Ùˆ Ø®Ø§ØªÙ… Ø§Ù„Ù…Ø±Ø³Ù„ÙŠÙ†ØŒ Ø£Ø±Ø³Ù„Ù‡ Ø§Ù„Ù„Ù‡ Ø¥Ù„Ù‰ Ø§Ù„Ø¨Ø´Ø±ÙŠØ© Ø¬Ù…Ø¹Ø§Ø¡ Ù„ØªØ¨Ù„ÙŠØº Ø§Ù„Ù‚Ø±Ø¢Ù† Ø§Ù„ÙƒØ±ÙŠÙ… ÙˆØªØ¹Ù„ÙŠÙ… Ø§Ù„Ø¥Ø³Ù„Ø§Ù…."
    },
    {
        id: "faq-3",
        question_it: "Cos'è il Corano?",
        question_en: "What is the Quran?",
        question_ar: "Ù…Ø§ Ù‡Ùˆ Ø§Ù„Ù‚Ø±Ø¢Ù†ØŸ",
        keywords: ["corano", "quran", "libro sacro", "holy book", "libro"],
        answer_it: "Il Corano è il libro sacro dell'Islam, considerato la parola letterale di Allah rivelata al Profeta Muhammad tramite l'Arcangelo Gabriele.",
        answer_en: "The Quran is the holy book of Islam, considered the literal word of Allah revealed to Prophet Muhammad through the Archangel Gabriel.",
        answer_ar: "Ø§Ù„Ù‚Ø±Ø¢Ù† Ù‡Ùˆ ÙƒØªØ§Ø¨ Ø§Ù„Ø¥Ø³Ù„Ø§Ù… Ø§Ù„Ù…Ù‚Ø¯Ø³ØŒ ÙˆÙŠÙ Ø¹ØªØ¨Ø± ÙƒÙ„Ø§Ù… Ø§Ù„Ù„Ù‡ Ø§Ù„Ù„Ù Ø¸ÙŠ Ø§Ù„Ù…Ù†Ø²Ù„ Ø¹Ù„Ù‰ Ø§Ù„Ù†Ø¨ÙŠ Ù…Ø­Ù…Ø¯ Ø¨ÙˆØ§Ø³Ø·Ø© Ø§Ù„Ù…Ù„Ø§Ùƒ Ø¬Ø¨Ø±ÙŠÙ„."
    },
    {
        id: "faq-4",
        question_it: "Come si fa la preghiera (Salah)?",
        question_en: "How to perform the prayer (Salah)?",
        question_ar: "ÙƒÙŠÙ  ØªØ¤Ø¯Ù‰ Ø§Ù„ØµÙ„Ø§Ø©ØŸ",
        keywords: ["preghiera", "salah", "pregare", "prayer", "pray", "namaz"],
        answer_it: "La Salah si esegue 5 volte al giorno rivolti verso la Kaaba a La Mecca. È necessario compiere l'abluzione (Wudu) prima di iniziare. La preghiera consiste in Rak'ah (unità) che includono stare in piedi, recitare il Corano, inchinarsi (Ruku') e prostrarsi (Sujud).",
        answer_en: "Salah is performed 5 times a day facing the Kaaba in Mecca. It is necessary to perform ablution (Wudu) before starting. The prayer consists of Rak'ah (units) which include standing, reciting the Quran, bowing (Ruku'), and prostrating (Sujud).",
        answer_ar: "ØªØ¤Ø¯Ù‰ Ø§Ù„ØµÙ„Ø§Ø© 5 Ù…Ø±Ø§Øª Ù ÙŠ Ø§Ù„ÙŠÙˆÙ… Ù…ØªØ¬Ù‡ÙŠÙ† Ù†Ø­Ùˆ Ø§Ù„ÙƒØ¹Ø¨Ø© Ù ÙŠ Ù…ÙƒØ©ØŒ ÙˆÙŠØ¬Ø¨ Ø§Ù„ÙˆØ¶ÙˆØ¡ Ù‚Ø¨Ù„ Ø§Ù„Ø¨Ø¯Ø¡. ØªØªÙƒÙˆÙ† Ø§Ù„ØµÙ„Ø§Ø© Ù…Ù† Ø±ÙƒØ¹Ø§Øª ØªØ´Ù…Ù„ Ø§Ù„ÙˆÙ‚ÙˆÙ ØŒ Ù‚Ø±Ø§Ø¡Ø© Ø§Ù„Ù‚Ø±Ø¢Ù†ØŒ Ø§Ù„Ø±ÙƒÙˆØ¹ØŒ ÙˆØ§Ù„Ø³Ø¬ÙˆØ¯."
    },
    {
        id: "faq-5",
        question_it: "Cos'è il Ramadan?",
        question_en: "What is Ramadan?",
        question_ar: "Ù…Ø§ Ù‡Ùˆ Ø±Ù…Ø¶Ø§Ù†ØŸ",
        keywords: ["ramadan", "digiuno", "fasting", "sawm", "mese"],
        answer_it: "Il Ramadan è il nono mese del calendario islamico, durante il quale i musulmani digiunano dall'alba al tramonto. È un mese di purificazione spirituale, preghiera e carità.",
        answer_en: "Ramadan is the ninth month of the Islamic calendar, during which Muslims fast from dawn to sunset. It is a month of spiritual purification, prayer, and charity.",
        answer_ar: "Ø±Ù…Ø¶Ø§Ù† Ù‡Ùˆ Ø§Ù„Ø´Ù‡Ø± Ø§Ù„ØªØ§Ø³Ø¹ Ù ÙŠ Ø§Ù„ØªÙ‚ÙˆÙŠÙ… Ø§Ù„Ø¥Ø³Ù„Ø§Ù…ÙŠØŒ ÙˆÙ ÙŠÙ‡ ÙŠØµÙˆÙ… Ø§Ù„Ù…Ø³Ù„Ù…ÙˆÙ† Ù…Ù† Ø§Ù„Ù Ø¬Ø± Ø¥Ù„Ù‰ ØºØ±ÙˆØ¨ Ø§Ù„Ø´Ù…Ø³. Ø¥Ù†Ù‡ Ø´Ù‡Ø± Ù„Ù„ØªØ·Ù‡ÙŠØ± Ø§Ù„Ø±ÙˆØ­ÙŠ ÙˆØ§Ù„ØµÙ„Ø§Ø© ÙˆØ§Ù„ØµØ¯Ù‚Ø©."
    },
    {
        id: "faq-6",
        question_it: "Cos'è la Zakat?",
        question_en: "What is Zakat?",
        question_ar: "Ù…Ø§ Ù‡ÙŠ Ø§Ù„Ø²ÙƒØ§Ø©ØŸ",
        keywords: ["zakat", "elemosina", "carità", "charity", "donare"],
        answer_it: "La Zakat è l'elemosina obbligatoria nell'Islam. I musulmani che possiedono una certa quantità di ricchezza devono donarne il 2,5% ogni anno ai poveri e ai bisognosi.",
        answer_en: "Zakat is obligatory charity in Islam. Muslims who possess a certain amount of wealth must donate 2.5% of it every year to the poor and needy.",
        answer_ar: "Ø§Ù„Ø²ÙƒØ§Ø© Ù‡ÙŠ Ø§Ù„ØµØ¯Ù‚Ø© Ø§Ù„ÙˆØ§Ø¬Ø¨Ø© Ù ÙŠ Ø§Ù„Ø¥Ø³Ù„Ø§Ù…. ÙŠØ¬Ø¨ Ø¹Ù„Ù‰ Ø§Ù„Ù…Ø³Ù„Ù…ÙŠÙ† Ø§Ù„Ø°ÙŠÙ† ÙŠÙ…Ù„ÙƒÙˆÙ† Ù…Ù‚Ø¯Ø§Ø±Ù‹Ø§ Ù…Ø¹ÙŠÙ†Ù‹Ø§ Ù…Ù† Ø§Ù„Ù…Ø§Ù„ Ø§Ù„ØªØ¨Ø±Ø¹ Ø¨Ù†Ø³Ø¨Ø© 2.5% Ù…Ù†Ù‡ Ø³Ù†ÙˆÙŠÙ‹Ø§ Ù„Ù„Ù Ù‚Ø±Ø§Ø¡ ÙˆØ§Ù„Ù…Ø­ØªØ§Ø¬ÙŠÙ†."
    },
    {
        id: "faq-7",
        question_it: "Chi sono i Profeti nell'Islam?",
        question_en: "Who are the Prophets in Islam?",
        question_ar: "Ù…Ù† Ù‡Ù… Ø§Ù„Ø£Ù†Ø¨ÙŠØ§Ø¡ Ù ÙŠ Ø§Ù„Ø¥Ø³Ù„Ø§Ù…ØŸ",
        keywords: ["profeti", "prophets", "inviati", "messaggeri", "messengers"],
        answer_it: "Nell'Islam, i Profeti sono uomini scelti da Allah per guidare l'umanità. Tra i più noti ci sono Adamo, Noè, Abramo, Mosè e Gesù, culminando con Muhammad (pace su di loro). Noi crediamo in tutti loro senza distinzioni.",
        answer_en: "In Islam, Prophets are men chosen by Allah to guide humanity. Among the most known are Adam, Noah, Abraham, Moses, and Jesus, culminating with Muhammad (peace be upon them). We believe in all of them without distinction.",
        answer_ar: "Ù ÙŠ Ø§Ù„Ø¥Ø³Ù„Ø§Ù…ØŒ Ø§Ù„Ø£Ù†Ø¨ÙŠØ§Ø¡ Ù‡Ù… Ø±Ø¬Ø§Ù„ Ø§Ø®ØªØ§Ø±Ù‡Ù… Ø§Ù„Ù„Ù‡ Ù„Ù‡Ø¯Ø§ÙŠØ© Ø§Ù„Ø¨Ø´Ø±ÙŠØ©. Ù…Ù† Ø£Ø´Ù‡Ø±Ù‡Ù… Ø¢Ø¯Ù…ØŒ Ù†ÙˆØ­ØŒ Ø¥Ø¨Ø±Ø§Ù‡ÙŠÙ…ØŒ Ù…ÙˆØ³Ù‰ØŒ ÙˆØ¹ÙŠØ³Ù‰ØŒ ÙˆØ®Ø§ØªÙ…Ù‡Ù… Ù…Ø­Ù…Ø¯ (Ø¹Ù„ÙŠÙ‡Ù… Ø§Ù„Ø³Ù„Ø§Ù…). Ù†Ø­Ù† Ù†Ø¤Ù…Ù† Ø¨Ù‡Ù… Ø¬Ù…ÙŠØ¹Ù‹Ø§ Ø¯ÙˆÙ† ØªÙ Ø±ÙŠÙ‚."
    },
    {
        id: "faq-8",
        question_it: "Cos'è l'Hijab?",
        question_en: "What is the Hijab?",
        question_ar: "Ù…Ø§ Ù‡Ùˆ Ø§Ù„Ø­Ø¬Ø§Ø¨ØŸ",
        keywords: ["hijab", "velo", "modestia", "abbigliamento", "veil", "modesty", "clothing"],
        answer_it: "L'Hijab non è solo il velo che copre i capelli delle donne musulmane, ma un concetto più ampio di modestia nel comportamento, nello sguardo e nell'abbigliamento per uomini e donne, comandato da Allah per preservare la dignità e la purezza.",
        answer_en: "Hijab is not just the headscarf worn by Muslim women, but a broader concept of modesty in behavior, gaze, and clothing for both men and women, commanded by Allah to preserve dignity and purity.",
        answer_ar: "Ø§Ù„Ø­Ø¬Ø§Ø¨ Ù„ÙŠØ³ Ù…Ø¬Ø±Ø¯ ØºØ·Ø§Ø¡ Ù„Ø±Ø£Ø³ Ø§Ù„Ù…Ø±Ø£Ø© Ø§Ù„Ù…Ø³Ù„Ù…Ø© Ø¨Ù„ Ù‡Ùˆ Ù…Ù Ù‡ÙˆÙ… Ø£Ø´Ù…Ù„ Ù„Ù„Ø­Ø´Ù…Ø© Ù ÙŠ Ø§Ù„Ø³Ù„ÙˆÙƒ ÙˆØ§Ù„Ù†Ø¸Ø± ÙˆØ§Ù„Ù„Ø¨Ø§Ø³ Ù„ÙƒÙ„ Ù…Ù† Ø§Ù„Ø±Ø¬Ø§Ù„ ÙˆØ§Ù„Ù†Ø³Ø§Ø¡ØŒ ÙˆÙ‡Ùˆ Ø£Ù…Ø± Ù…Ù† Ø§Ù„Ù„Ù‡ Ù„Ø­Ù Ø¸ Ø§Ù„ÙƒØ±Ø§Ù…Ø© ÙˆØ§Ù„Ø¹Ù Ø©."
    },
    {
        id: "faq-9",
        question_it: "Chi è Allah?",
        question_en: "Who is Allah?",
        question_ar: "Ù…Ù† Ù‡Ùˆ Ø§Ù„Ù„Ù‡ØŸ",
        keywords: ["allah", "dio", "god", "signore", "lord"],
        answer_it: "Allah è la parola araba per Dio. Nell'Islam, Allah è il Creatore unico e assoluto dell'Universo. È Unico, Onnipotente, Onnisciente e Misericordioso. Non ha partner, figli o uguali.",
        answer_en: "Allah is the Arabic word for God. In Islam, Allah is the unique and absolute Creator of the Universe. He is One, Omnipotent, Omniscient, and Merciful. He has no partners, children, or equals.",
        answer_ar: "Ø§Ù„Ù„Ù‡ Ù‡Ùˆ Ø§Ù„Ø®Ø§Ù„Ù‚ Ø§Ù„ÙˆØ§Ø­Ø¯ Ø§Ù„Ø£Ø­Ø¯ Ù„Ù„ÙƒÙˆÙ† Ù ÙŠ Ø§Ù„Ø¥Ø³Ù„Ø§Ù…. ÙˆÙ‡Ùˆ Ø§Ù„ÙˆØ§Ø­Ø¯ØŒ Ø§Ù„Ù‚Ø§Ø¯Ø± Ø¹Ù„Ù‰ ÙƒÙ„ Ø´ÙŠØ¡ØŒ Ø§Ù„Ø¹Ù„ÙŠÙ… Ø¨ÙƒÙ„ Ø´ÙŠØ¡ØŒ ÙˆØ§Ù„Ø±Ø­Ù…Ù† Ø§Ù„Ø±Ø­ÙŠÙ…. Ù„ÙŠØ³ Ù„Ù‡ Ø´Ø±ÙŠÙƒ ÙˆÙ„Ø§ ÙˆÙ„Ø¯ ÙˆÙ„Ø§ Ø´Ø¨ÙŠÙ‡."
    }
];
