export interface BlogPost {
    id: string;
    title: string;
    title_ar?: string;
    title_it?: string;
    content: string;
    content_ar?: string;
    content_it?: string;
    excerpt: string;
    excerpt_ar?: string;
    excerpt_it?: string;
    category: string;
    image_url?: string;
    created_at: string;
    read_time?: string;
    author_id?: string;
}

export const staticBlogPosts: BlogPost[] = [
    {
        id: 'post-1',
        title: 'The Power of Patience (Sabr) in Difficult Times',
        title_ar: 'Ù‚ÙˆØ© Ø§Ù„ØµØ¨Ø± Ù ÙŠ Ø§Ù„Ø£ÙˆÙ‚Ø§Øª Ø§Ù„ØµØ¹Ø¨Ø©',
        title_it: 'Il Potere della Pazienza (Sabr) nei Tempi Difficili',
        excerpt: 'Discover the profound Islamic concept of Sabr and how it transforms hardships into spiritual growth.',
        excerpt_ar: 'Ø§ÙƒØªØ´Ù  Ù…Ù Ù‡ÙˆÙ… Ø§Ù„ØµØ¨Ø± Ø§Ù„Ø¥Ø³Ù„Ø§Ù…ÙŠ Ø§Ù„Ø¹Ù…ÙŠÙ‚ ÙˆÙƒÙŠÙ  ÙŠØ­ÙˆÙ„ Ø§Ù„Ù…Ø­Ù† Ø¥Ù„Ù‰ Ù†Ù…Ùˆ Ø±ÙˆØ­ÙŠ.',
        excerpt_it: 'Scopri il profondo concetto islamico del Sabr e come trasforma le avversitÃ  in crescita spirituale.',
        content: `Patience, or *Sabr*, is one of the most emphasized virtues in Islam. It is mentioned over 90 times in the Quran, highlighting its central role in the life of a believer. 

Allah says in the Quran: "O you who have believed, seek help through patience and prayer. Indeed, Allah is with the patient." (Al-Baqarah 2:153)

### The True Meaning of Sabr
Sabr is often mistranslated as passive endurance, but it is actually an active, resilient state of mind. It involves remaining steadfast upon the truth, restraining oneself from complaining or despairing, and striving to overcome obstacles while trusting completely in Allah's wisdom.

### Types of Sabr
According to scholars, there are three types of Sabr:
1. **Patience upon obedience to Allah**: Continuing to perform prayers, fast, and do good deeds even when difficult.
2. **Patience in refraining from disobedience**: Resisting the urge to commit sins.
3. **Patience during hardships and calamities**: Accepting Allah's decree during times of loss, sickness, or trial without losing faith.

The Prophet Muhammad (ï·º) said: "No fatigue, nor disease, nor sorrow, nor sadness, nor hurt, nor distress befalls a Muslim, even if it were the prick he receives from a thorn, but that Allah expiates some of his sins for that." (Sahih al-Bukhari)

Remember, after every hardship comes ease. Embrace Sabr and watch your spiritual resilience grow.`,
        content_ar: `Ø§Ù„ØµØ¨Ø± Ù‡Ùˆ Ø£Ø­Ø¯ Ø£Ù‡Ù… Ø§Ù„Ù Ø¶Ø§Ø¦Ù„ Ù ÙŠ Ø§Ù„Ø¥Ø³Ù„Ø§Ù…. Ù„Ù‚Ø¯ ÙˆØ±Ø¯ Ø°ÙƒØ±Ù‡ Ø£ÙƒØ«Ø± Ù…Ù† 90 Ù…Ø±Ø© Ù ÙŠ Ø§Ù„Ù‚Ø±Ø¢Ù† Ø§Ù„ÙƒØ±ÙŠÙ…ØŒ Ù…Ù…Ø§ ÙŠØ¨Ø±Ø² Ø¯ÙˆØ±Ù‡ Ø§Ù„Ù…Ø±ÙƒØ²ÙŠ Ù ÙŠ Ø­ÙŠØ§Ø© Ø§Ù„Ù…Ø¤Ù…Ù†.

ÙŠÙ‚ÙˆÙ„ Ø§Ù„Ù„Ù‡ ØªØ¹Ø§Ù„Ù‰: "ÙŠÙŽØ§ Ø£ÙŽÙŠÙ Ù‘Ù‡ÙŽØ§ Ø§Ù„ÙŽÙ‘Ø°Ù ÙŠÙ†ÙŽ Ø¢Ù…ÙŽÙ†Ù ÙˆØ§ Ø§Ø³Ù’ØªÙŽØ¹Ù ÙŠÙ†Ù ÙˆØ§ Ø¨Ù Ø§Ù„ØµÙŽÙ‘Ø¨Ù’Ø±Ù  ÙˆÙŽØ§Ù„ØµÙŽÙ‘Ù„ÙŽØ§Ø©Ù  Ûš Ø¥Ù Ù†ÙŽÙ‘ Ø§Ù„Ù„ÙŽÙ‘Ù‡ÙŽ Ù…ÙŽØ¹ÙŽ Ø§Ù„ØµÙŽÙ‘Ø§Ø¨Ù Ø±Ù ÙŠÙ†ÙŽ" (Ø§Ù„Ø¨Ù‚Ø±Ø© 2:153).

### Ø§Ù„Ù…Ø¹Ù†Ù‰ Ø§Ù„Ø­Ù‚ÙŠÙ‚ÙŠ Ù„Ù„ØµØ¨Ø±
ØºØ§Ù„Ø¨Ù‹Ø§ Ù…Ø§ ÙŠÙ ØªØ±Ø¬Ù… Ø§Ù„ØµØ¨Ø± Ø®Ø·Ø£Ù‹ Ø¹Ù„Ù‰ Ø£Ù†Ù‡ ØªØ­Ù…Ù„ Ø³Ù„Ø¨ÙŠØŒ Ù„ÙƒÙ†Ù‡ Ù ÙŠ Ø§Ù„ÙˆØ§Ù‚Ø¹ Ø­Ø§Ù„Ø© Ø°Ù‡Ù†ÙŠØ© Ù†Ø´Ø·Ø© ÙˆÙ…Ø±Ù†Ø©. ÙˆÙ‡Ùˆ ÙŠÙ†Ø·ÙˆÙŠ Ø¹Ù„Ù‰ Ø§Ù„Ø«Ø¨Ø§Øª Ø¹Ù„Ù‰ Ø§Ù„Ø­Ù‚ØŒ ÙˆÙƒØ¨Ø­ Ø§Ù„Ù†Ù Ø³ Ø¹Ù† Ø§Ù„Ø´ÙƒÙˆÙ‰ Ø£Ùˆ Ø§Ù„ÙŠØ£Ø³ØŒ ÙˆØ§Ù„Ø³Ø¹ÙŠ Ù„Ù„ØªØºÙ„Ø¨ Ø¹Ù„Ù‰ Ø§Ù„Ø¹Ù‚Ø¨Ø§Øª Ù…Ø¹ Ø§Ù„Ø«Ù‚Ø© Ø§Ù„Ù…Ø·Ù„Ù‚Ø© Ù ÙŠ Ø­ÙƒÙ…Ø© Ø§Ù„Ù„Ù‡.

### Ø£Ù†ÙˆØ§Ø¹ Ø§Ù„ØµØ¨Ø±
ÙˆÙ Ù‚Ø§Ù‹ Ù„Ù„Ø¹Ù„Ù…Ø§Ø¡ØŒ Ù‡Ù†Ø§Ùƒ Ø«Ù„Ø§Ø«Ø© Ø£Ù†ÙˆØ§Ø¹ Ù…Ù† Ø§Ù„ØµØ¨Ø±:
1. **Ø§Ù„ØµØ¨Ø± Ø¹Ù„Ù‰ Ø·Ø§Ø¹Ø© Ø§Ù„Ù„Ù‡**: Ø§Ù„Ø§Ø³ØªÙ…Ø±Ø§Ø± Ù ÙŠ Ø£Ø¯Ø§Ø¡ Ø§Ù„ØµÙ„ÙˆØ§Øª ÙˆØ§Ù„ØµÙŠØ§Ù… ÙˆÙ Ø¹Ù„ Ø§Ù„Ø®ÙŠØ±Ø§Øª Ø­ØªÙ‰ Ø¹Ù†Ø¯Ù…Ø§ ÙŠÙƒÙˆÙ† Ø°Ù„Ùƒ ØµØ¹Ø¨Ù‹Ø§.
2. **Ø§Ù„ØµØ¨Ø± Ø¹Ù† Ù…Ø¹ØµÙŠØ© Ø§Ù„Ù„Ù‡**: Ù…Ù‚Ø§ÙˆÙ…Ø© Ø§Ù„Ø±ØºØ¨Ø© Ù ÙŠ Ø§Ø±ØªÙƒØ§Ø¨ Ø§Ù„Ø°Ù†ÙˆØ¨.
3. **Ø§Ù„ØµØ¨Ø± Ø¹Ù„Ù‰ Ø£Ù‚Ø¯Ø§Ø± Ø§Ù„Ù„Ù‡ Ø§Ù„Ù…Ø¤Ù„Ù…Ø©**: Ù‚Ø¨ÙˆÙ„ Ù‚Ø¶Ø§Ø¡ Ø§Ù„Ù„Ù‡ Ø£Ø«Ù†Ø§Ø¡ Ø§Ù„Ù Ù‚Ø¯ Ø£Ùˆ Ø§Ù„Ù…Ø±Ø¶ Ø£Ùˆ Ø§Ù„Ø§Ø¨ØªÙ„Ø§Ø¡ Ø¯ÙˆÙ† Ù Ù‚Ø¯Ø§Ù† Ø§Ù„Ø¥ÙŠÙ…Ø§Ù†.

Ù‚Ø§Ù„ Ø§Ù„Ù†Ø¨ÙŠ Ù…Ø­Ù…Ø¯ (ï·º): "Ù…ÙŽØ§ ÙŠÙ ØµÙ ÙŠØ¨Ù  Ø§Ù„Ù’Ù…Ù Ø³Ù’Ù„Ù Ù…ÙŽ Ù…Ù Ù†Ù’ Ù†ÙŽØµÙŽØ¨Ù  ÙˆÙŽÙ„ÙŽØ§ ÙˆÙŽØµÙŽØ¨Ù  ÙˆÙŽÙ„ÙŽØ§ Ù‡ÙŽÙ…Ù Ù‘ ÙˆÙŽÙ„ÙŽØ§ Ø­Ù Ø²Ù’Ù†Ù  ÙˆÙŽÙ„ÙŽØ§ Ø£ÙŽØ°Ù‹Ù‰ ÙˆÙŽÙ„ÙŽØ§ ØºÙŽÙ…Ù Ù‘ØŒ Ø­ÙŽØªÙŽÙ‘Ù‰ Ø§Ù„Ø´ÙŽÙ‘ÙˆÙ’ÙƒÙŽØ©Ù  ÙŠÙ Ø´ÙŽØ§ÙƒÙ Ù‡ÙŽØ§ØŒ Ø¥Ù Ù„ÙŽÙ‘Ø§ ÙƒÙŽÙ ÙŽÙ‘Ø±ÙŽ Ø§Ù„Ù„ÙŽÙ‘Ù‡Ù  Ø¨Ù Ù‡ÙŽØ§ Ù…Ù Ù†Ù’ Ø®ÙŽØ·ÙŽØ§ÙŠÙŽØ§Ù‡Ù " (ØµØ­ÙŠØ­ Ø§Ù„Ø¨Ø®Ø§Ø±ÙŠ).

ØªØ°ÙƒØ±ØŒ Ø£Ù†Ù‡ Ù…Ø¹ Ø§Ù„Ø¹Ø³Ø± ÙŠØ³Ø±Ù‹Ø§. Ø§Ø¹ØªÙ†Ù‚ Ø§Ù„ØµØ¨Ø± ÙˆØ´Ø§Ù‡Ø¯ Ù…Ø±ÙˆÙ†ØªÙƒ Ø§Ù„Ø±ÙˆØ­ÙŠØ© ØªÙ†Ù…Ùˆ.`,
        content_it: `La pazienza, o *Sabr*, Ã¨ una delle virtÃ¹ piÃ¹ enfatizzate nell'Islam. Ãˆ menzionata oltre 90 volte nel Corano, evidenziando il suo ruolo centrale nella vita di un credente.

Allah dice nel Corano: "O voi che credete, cercate aiuto nella pazienza e nella preghiera. In veritÃ , Allah Ã¨ con i pazienti." (Al-Baqarah 2:153)

### Il Vero Significato del Sabr
Il Sabr Ã¨ spesso tradotto erroneamente come sopportazione passiva, ma in realtÃ  Ã¨ uno stato mentale attivo e resiliente. Implica il rimanere saldi nella veritÃ , trattenersi dal lamentarsi o dal disperarsi e sforzarsi di superare gli ostacoli fidandosi completamente della saggezza di Allah.

### Tipi di Sabr
Secondo gli studiosi, ci sono tre tipi di Sabr:
1. **Pazienza nell'obbedienza ad Allah**: Continuare a compiere le preghiere, digiunare e fare buone azioni anche quando Ã¨ difficile.
2. **Pazienza nell'astenersi dalla disobbedienza**: Resistere alla tentazione di commettere peccati.
3. **Pazienza durante le difficoltÃ  e le calamitÃ **: Accettare il decreto di Allah durante i momenti di perdita, malattia o prova senza perdere la fede.

Il Profeta Muhammad (ï·º) disse: "Nessuna fatica, malattia, dolore, tristezza, ferita o angoscia colpisce un musulmano, persino la spina che lo punge, senza che Allah espia per mezzo di essa parte dei suoi peccati." (Sahih al-Bukhari)

Ricorda, dopo ogni difficoltÃ  c'Ã¨ la facilitÃ . Abbraccia il Sabr e guarda crescere la tua resilienza spirituale.`,
        category: 'spirituality',
        image_url: 'https://images.unsplash.com/photo-1542816417-0983c9c9ad53?auto=format&fit=crop&w=800&q=80',
        created_at: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
        read_time: '4_min_read'
    },
    {
        id: 'post-2',
        title: 'The Beauty of Khushu (Devotion) in Prayer',
        title_ar: 'Ø¬Ù…Ø§Ù„ Ø§Ù„Ø®Ø´ÙˆØ¹ Ù ÙŠ Ø§Ù„ØµÙ„Ø§Ø©',
        title_it: 'La Bellezza della Devozione (Khushu) in Preghiera',
        excerpt: 'Enhance your daily prayers by understanding and applying Khushu, the heart of an accepted Salah.',
        excerpt_ar: 'Ø­Ø³Ù† ØµÙ„ÙˆØ§ØªÙƒ Ø§Ù„ÙŠÙˆÙ…ÙŠØ© Ù…Ù† Ø®Ù„Ø§Ù„ Ù Ù‡Ù… ÙˆØªØ·Ø¨ÙŠÙ‚ Ø§Ù„Ø®Ø´ÙˆØ¹ØŒ Ù‚Ù„Ø¨ Ø§Ù„ØµÙ„Ø§Ø© Ø§Ù„Ù…Ù‚Ø¨ÙˆÙ„Ø©.',
        excerpt_it: 'Migliora le tue preghiere quotidiane comprendendo e applicando il Khushu, il cuore di una Salah accettata.',
        content: `Prayer (Salah) is the second pillar of Islam and our direct connection with our Creator. However, physical movements without the presence of the heart leave the prayer incomplete. This presence is known as *Khushu* (humility and devotion).

### Why is Khushu Important?
Allah says: "Successful indeed are the believers: those who offer their prayers with all solemnity and full submissiveness." (Al-Mu'minun 23:1-2)

Without Khushu, prayer becomes a mere routine rather than a spiritual refuge. The Prophet (ï·º) warned that the first thing to be lifted from this Ummah (community) will be Khushu.

### Ways to Attain Khushu
1. **Prepare properly**: Perform Wudu (ablution) carefully and arrive early for prayer.
2. **Understand what you recite**: Learn the meaning of Surah Al-Fatiha and other recitations. Knowing what you are saying to Allah deepens the connection.
3. **Remember death**: Pray as if it is your last prayer. The Prophet (ï·º) advised: "When you stand for your prayer, pray as if you are saying farewell." (Ibn Majah)
4. **Remove distractions**: Pray in a quiet place and turn off your phone.

Through Khushu, prayer transforms from a duty into a profound, peaceful conversation with the Loving Creator.`,
        content_ar: `Ø§Ù„ØµÙ„Ø§Ø© Ù‡ÙŠ Ø§Ù„Ø±ÙƒÙ† Ø§Ù„Ø«Ø§Ù†ÙŠ Ù…Ù† Ø£Ø±ÙƒØ§Ù† Ø§Ù„Ø¥Ø³Ù„Ø§Ù… ÙˆØµÙ„ØªÙ†Ø§ Ø§Ù„Ù…Ø¨Ø§Ø´Ø±Ø© Ø¨Ø®Ø§Ù„Ù‚Ù†Ø§. ÙˆÙ…Ø¹ Ø°Ù„ÙƒØŒ Ù Ø¥Ù† Ø§Ù„Ø­Ø±ÙƒØ§Øª Ø§Ù„Ø¬Ø³Ø¯ÙŠØ© Ø¯ÙˆÙ† Ø­Ø¶ÙˆØ± Ø§Ù„Ù‚Ù„Ø¨ ØªØ¬Ø¹Ù„ Ø§Ù„ØµÙ„Ø§Ø© Ù†Ø§Ù‚ØµØ©. ÙŠÙ Ø¹Ø±Ù  Ù‡Ø°Ø§ Ø§Ù„Ø­Ø¶ÙˆØ± Ø¨Ø§Ø³Ù… *Ø§Ù„Ø®Ø´ÙˆØ¹*.

### Ù„Ù…Ø§Ø°Ø§ Ø§Ù„Ø®Ø´ÙˆØ¹ Ù…Ù‡Ù…ØŸ
ÙŠÙ‚ÙˆÙ„ Ø§Ù„Ù„Ù‡ ØªØ¹Ø§Ù„Ù‰: "Ù‚ÙŽØ¯Ù’ Ø£ÙŽÙ Ù’Ù„ÙŽØ­ÙŽ Ø§Ù„Ù’Ù…Ù Ø¤Ù’Ù…Ù Ù†Ù ÙˆÙ†ÙŽ * Ø§Ù„ÙŽÙ‘Ø°Ù ÙŠÙ†ÙŽ Ù‡Ù Ù…Ù’ Ù Ù ÙŠ ØµÙŽÙ„ÙŽØ§ØªÙ Ù‡Ù Ù…Ù’ Ø®ÙŽØ§Ø´Ù Ø¹Ù ÙˆÙ†ÙŽ" (Ø§Ù„Ù…Ø¤Ù…Ù†ÙˆÙ† 23:1-2).

Ø¨Ø¯ÙˆÙ† Ø®Ø´ÙˆØ¹ØŒ ØªØµØ¨Ø­ Ø§Ù„ØµÙ„Ø§Ø© Ù…Ø¬Ø±Ø¯ Ø±ÙˆØªÙŠÙ† Ø¨Ø¯Ù„Ø§Ù‹ Ù…Ù† Ù…Ù„Ø§Ø° Ø±ÙˆØ­ÙŠ. Ù„Ù‚Ø¯ Ø­Ø°Ø± Ø§Ù„Ù†Ø¨ÙŠ (ï·º) Ù…Ù† Ø£Ù† Ø£ÙˆÙ„ Ø´ÙŠØ¡ ÙŠÙ Ø±Ù Ø¹ Ù…Ù† Ù‡Ø°Ù‡ Ø§Ù„Ø£Ù…Ø© Ù‡Ùˆ Ø§Ù„Ø®Ø´ÙˆØ¹.

### Ø·Ø±Ù‚ Ù„ØªØ­Ù‚ÙŠÙ‚ Ø§Ù„Ø®Ø´ÙˆØ¹
1. **Ø§Ù„Ø§Ø³ØªØ¹Ø¯Ø§Ø¯ Ø§Ù„Ø¬ÙŠØ¯**: Ø£Ø³Ø¨Øº Ø§Ù„ÙˆØ¶ÙˆØ¡ ÙˆØ§Ø­Ø¶Ø± Ù…Ø¨ÙƒØ±Ø§Ù‹ Ù„Ù„ØµÙ„Ø§Ø©.
2. **Ø§Ù Ù‡Ù… Ù…Ø§ ØªÙ‚Ø±Ø£**: ØªØ¹Ù„Ù… Ù…Ø¹Ù†Ù‰ Ø³ÙˆØ±Ø© Ø§Ù„Ù Ø§ØªØ­Ø© ÙˆØ§Ù„Ù‚Ø±Ø§Ø¡Ø§Øª Ø§Ù„Ø£Ø®Ø±Ù‰. Ù…Ø¹Ø±Ù Ø© Ù…Ø§ ØªÙ‚ÙˆÙ„Ù‡ Ù„Ù„Ù‡ ØªØ¹Ù…Ù‚ Ø§Ù„Ø§Ø±ØªØ¨Ø§Ø·.
3. **ØªØ°ÙƒØ± Ø§Ù„Ù…ÙˆØª**: ØµÙ„Ù Ù‘ ØµÙ„Ø§Ø© Ù…ÙˆØ¯Ø¹. Ù†ØµØ­ Ø§Ù„Ù†Ø¨ÙŠ (ï·º): "Ø¥Ù Ø°ÙŽØ§ Ù‚Ù Ù…Ù’ØªÙŽ Ù Ù ÙŠ ØµÙŽÙ„ÙŽØ§ØªÙ ÙƒÙŽ Ù ÙŽØµÙŽÙ„Ù Ù‘ ØµÙŽÙ„ÙŽØ§Ø©ÙŽ Ù…Ù ÙˆÙŽØ¯Ù Ù‘Ø¹Ù " (Ø§Ø¨Ù† Ù…Ø§Ø¬Ù‡).
4. **Ø¥Ø²Ø§Ù„Ø© Ø§Ù„Ù…Ø´ØªØªØ§Øª**: ØµÙ„Ù Ù‘ Ù ÙŠ Ù…ÙƒØ§Ù† Ù‡Ø§Ø¯Ø¦ ÙˆØ£ØºÙ„Ù‚ Ù‡Ø§ØªÙ Ùƒ.

Ù…Ù† Ø®Ù„Ø§Ù„ Ø§Ù„Ø®Ø´ÙˆØ¹ØŒ ØªØªØ­ÙˆÙ„ Ø§Ù„ØµÙ„Ø§Ø© Ù…Ù† ÙˆØ§Ø¬Ø¨ Ø¥Ù„Ù‰ Ù…Ø­Ø§Ø¯Ø«Ø© Ø¹Ù…ÙŠÙ‚Ø© ÙˆØ³Ù„Ù…ÙŠØ© Ù…Ø¹ Ø§Ù„Ø®Ø§Ù„Ù‚ Ø§Ù„ÙˆØ¯ÙˆØ¯.`,
        content_it: `La preghiera (Salah) Ã¨ il secondo pilastro dell'Islam e il nostro collegamento diretto con il nostro Creatore. Tuttavia, i movimenti fisici senza la presenza del cuore lasciano la preghiera incompleta. Questa presenza Ã¨ nota come *Khushu* (umiltÃ  e devozione).

### PerchÃ© il Khushu Ã¨ importante?
Allah dice: "In veritÃ  prospereranno i credenti: quelli che sono umili e devoti (khashi'un) nelle loro preghiere." (Al-Mu'minun 23:1-2)

Senza Khushu, la preghiera diventa una mera routine piuttosto che un rifugio spirituale. Il Profeta (ï·º) ha avvertito che la prima cosa che verrÃ  tolta a questa Ummah (comunitÃ ) sarÃ  il Khushu.

### Modi per Ottenere il Khushu
1. **Preparati adeguatamente**: Esegui il Wudu (abluzione) con cura e arriva presto per la preghiera.
2. **Comprendi ciÃ² che reciti**: Impara il significato della Surah Al-Fatiha e di altre recitazioni. Sapere cosa stai dicendo ad Allah approfondisce il legame.
3. **Ricorda la morte**: Prega come se fosse la tua ultima preghiera. Il Profeta (ï·º) consigliÃ²: "Quando ti alzi per la preghiera, prega come se stessi dicendo addio." (Ibn Majah)
4. **Rimuovi le distrazioni**: Prega in un luogo tranquillo e spegni il telefono.

Attraverso il Khushu, la preghiera si trasforma da un dovere a una conversazione profonda e pacifica con il Creatore Amorevole.`,
        category: 'prayer',
        image_url: 'https://images.unsplash.com/photo-1594913210408-72b1d3d623b3?auto=format&fit=crop&w=800&q=80',
        created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(),
        read_time: '3_min_read'
    },
    {
        id: 'post-3',
        title: 'The Wonders of the Quran: A Timeless Miracle',
        title_ar: 'Ø¹Ø¬Ø§Ø¦Ø¨ Ø§Ù„Ù‚Ø±Ø¢Ù†: Ù…Ø¹Ø¬Ø²Ø© Ø®Ø§Ù„Ø¯Ø©',
        title_it: 'Le Meraviglie del Corano: Un Miracolo Senza Tempo',
        excerpt: 'Explore how the Quran remains a source of linguistic beauty, scientific accuracy, and spiritual guidance.',
        excerpt_ar: 'Ø§Ø³ØªÙƒØ´Ù  ÙƒÙŠÙ  ÙŠØ¨Ù‚Ù‰ Ø§Ù„Ù‚Ø±Ø¢Ù† Ù…ØµØ¯Ø±Ù‹Ø§ Ù„Ù„Ø¬Ù…Ø§Ù„ Ø§Ù„Ù„ØºÙˆÙŠ ÙˆØ§Ù„Ø¯Ù‚Ø© Ø§Ù„Ø¹Ù„Ù…ÙŠØ© ÙˆØ§Ù„Ù‡Ø¯Ø§ÙŠØ© Ø§Ù„Ø±ÙˆØ­ÙŠØ©.',
        excerpt_it: 'Esplora come il Corano rimane una fonte di bellezza linguistica, accuratezza scientifica e guida spirituale.',
        content: `The Quran is not just a book; it is the literal word of Allah, revealed to the Prophet Muhammad (ï·º) through the Angel Jibreel. Unlike any other text, the Quran has been perfectly preserved for over 1400 years.

### Linguistic Miracle
At the time of revelation, the Arabs were masters of poetry and rhetoric. Yet, the Quran presented a linguistic style so unique and profound that the greatest poets could not produce a single chapter like it. 

Allah challenges humanity: "And if you are in doubt about what We have sent down upon Our Servant, then produce a surah the like thereof..." (Al-Baqarah 2:23)

### Healing and Comfort
Beyond its linguistic beauty, the Quran is described as a 'Shifa' (healing) for the hearts. It addresses anxiety, grief, and the profound questions of existence. 
"And We send down of the Quran that which is healing and mercy for the believers..." (Al-Isra 17:82)

Reading the Quran daily, even if just a few verses, brings immense blessing (Barakah) into one's home and life.`,
        content_ar: `Ø§Ù„Ù‚Ø±Ø¢Ù† Ù„ÙŠØ³ Ù…Ø¬Ø±Ø¯ ÙƒØªØ§Ø¨Ø› Ø¥Ù†Ù‡ ÙƒÙ„Ø§Ù… Ø§Ù„Ù„Ù‡ Ø§Ù„Ø­Ø±Ù ÙŠØŒ Ø§Ù„Ù…Ù†Ø²Ù„ Ø¹Ù„Ù‰ Ø§Ù„Ù†Ø¨ÙŠ Ù…Ø­Ù…Ø¯ (ï·º) Ø¨ÙˆØ§Ø³Ø·Ø© Ø§Ù„Ù…Ù„Ùƒ Ø¬Ø¨Ø±ÙŠÙ„. ÙˆØ¹Ù„Ù‰ Ø¹ÙƒØ³ Ø£ÙŠ Ù†Øµ Ø¢Ø®Ø±ØŒ ØªÙ… Ø­Ù Ø¸ Ø§Ù„Ù‚Ø±Ø¢Ù† Ø¨Ø´ÙƒÙ„ Ù…Ø«Ø§Ù„ÙŠ Ù„Ø£ÙƒØ«Ø± Ù…Ù† 1400 Ø¹Ø§Ù….

### Ø§Ù„Ù…Ø¹Ø¬Ø²Ø© Ø§Ù„Ù„ØºÙˆÙŠØ©
Ù ÙŠ ÙˆÙ‚Øª Ø§Ù„Ù†Ø²ÙˆÙ„ØŒ ÙƒØ§Ù† Ø§Ù„Ø¹Ø±Ø¨ Ø£Ø³Ø§ØªØ°Ø© Ù ÙŠ Ø§Ù„Ø´Ø¹Ø± ÙˆØ§Ù„Ø¨Ù„Ø§ØºØ©. ÙˆÙ…Ø¹ Ø°Ù„ÙƒØŒ Ù‚Ø¯Ù… Ø§Ù„Ù‚Ø±Ø¢Ù† Ø£Ø³Ù„ÙˆØ¨Ù‹Ø§ Ù„ØºÙˆÙŠÙ‹Ø§ Ù Ø±ÙŠØ¯Ù‹Ø§ ÙˆØ¹Ù…ÙŠÙ‚Ù‹Ø§ Ù„Ø¯Ø±Ø¬Ø© Ø£Ù† Ø£Ø¹Ø¸Ù… Ø§Ù„Ø´Ø¹Ø±Ø§Ø¡ Ù„Ù… ÙŠØ³ØªØ·ÙŠØ¹ÙˆØ§ Ø¥Ù†ØªØ§Ø¬ Ø³ÙˆØ±Ø© ÙˆØ§Ø­Ø¯Ø© Ù…Ø«Ù„Ù‡.

ÙŠØªØ­Ø¯Ù‰ Ø§Ù„Ù„Ù‡ Ø§Ù„Ø¨Ø´Ø±ÙŠØ©: "ÙˆÙŽØ¥Ù Ù† ÙƒÙ Ù†ØªÙ Ù…Ù’ Ù Ù ÙŠ Ø±ÙŽÙŠÙ’Ø¨Ù  Ù…Ù Ù‘Ù…ÙŽÙ‘Ø§ Ù†ÙŽØ²ÙŽÙ‘Ù„Ù’Ù†ÙŽØ§ Ø¹ÙŽÙ„ÙŽÙ‰Ù° Ø¹ÙŽØ¨Ù’Ø¯Ù Ù†ÙŽØ§ Ù ÙŽØ£Ù’ØªÙ ÙˆØ§ Ø¨Ù Ø³Ù ÙˆØ±ÙŽØ©Ù  Ù…Ù Ù‘Ù† Ù…Ù Ù‘Ø«Ù’Ù„Ù Ù‡Ù ..." (Ø§Ù„Ø¨Ù‚Ø±Ø© 2:23).

### Ø§Ù„Ø´Ù Ø§Ø¡ ÙˆØ§Ù„Ø±Ø§Ø­Ø©
Ø¨Ø§Ù„Ø¥Ø¶Ø§Ù Ø© Ø¥Ù„Ù‰ Ø¬Ù…Ø§Ù„Ù‡ Ø§Ù„Ù„ØºÙˆÙŠØŒ ÙŠÙ ÙˆØµÙ  Ø§Ù„Ù‚Ø±Ø¢Ù† Ø¨Ø£Ù†Ù‡ "Ø´Ù Ø§Ø¡" Ù„Ù„Ù‚Ù„ÙˆØ¨. Ù Ù‡Ùˆ ÙŠØ¹Ø§Ù„Ø¬ Ø§Ù„Ù‚Ù„Ù‚ØŒ ÙˆØ§Ù„Ø­Ø²Ù†ØŒ ÙˆØ§Ù„Ø£Ø³Ø¦Ù„Ø© Ø§Ù„ÙˆØ¬ÙˆØ¯ÙŠØ© Ø§Ù„Ø¹Ù…ÙŠÙ‚Ø©.
"ÙˆÙŽÙ†Ù Ù†ÙŽØ²Ù Ù‘Ù„Ù  Ù…Ù Ù†ÙŽ Ø§Ù„Ù’Ù‚Ù Ø±Ù’Ø¢Ù†Ù  Ù…ÙŽØ§ Ù‡Ù ÙˆÙŽ Ø´Ù Ù ÙŽØ§Ø¡ÙŒ ÙˆÙŽØ±ÙŽØ­Ù’Ù…ÙŽØ©ÙŒ Ù„Ù Ù‘Ù„Ù’Ù…Ù Ø¤Ù’Ù…Ù Ù†Ù ÙŠÙ†ÙŽ..." (Ø§Ù„Ø¥Ø³Ø±Ø§Ø¡ 17:82).

Ù‚Ø±Ø§Ø¡Ø© Ø§Ù„Ù‚Ø±Ø¢Ù† ÙŠÙˆÙ…ÙŠÙ‹Ø§ØŒ Ø­ØªÙ‰ Ù„Ùˆ Ø¨Ø¶Ø¹ Ø¢ÙŠØ§Øª Ù Ù‚Ø·ØŒ ØªØ¬Ù„Ø¨ Ø¨Ø±ÙƒØ© Ø¹Ø¸ÙŠÙ…Ø© Ø¥Ù„Ù‰ Ø¨ÙŠØª Ø§Ù„Ø¥Ù†Ø³Ø§Ù† ÙˆØ­ÙŠØ§ØªÙ‡.`,
        content_it: `Il Corano non Ã¨ solo un libro; Ã¨ la parola letterale di Allah, rivelata al Profeta Muhammad (ï·º) attraverso l'Angelo Jibreel. A differenza di qualsiasi altro testo, il Corano Ã¨ stato perfettamente conservato per oltre 1400 anni.

### Il Miracolo Linguistico
Al momento della rivelazione, gli arabi erano maestri di poesia e retorica. Eppure, il Corano presentava uno stile linguistico cosÃ¬ unico e profondo che i piÃ¹ grandi poeti non riuscirono a produrre un solo capitolo simile.

Allah sfida l'umanitÃ : "E se avete qualche dubbio in merito a quello che abbiamo fatto scendere sul Nostro Servo, portate allora una Sura simile a questa..." (Al-Baqarah 2:23)

### Guarigione e Conforto
Oltre alla sua bellezza linguistica, il Corano Ã¨ descritto come 'Shifa' (guarigione) per i cuori. Affronta l'ansia, il dolore e le profonde domande dell'esistenza.
"Noi facciamo scendere dal Corano ciÃ² che Ã¨ guarigione e misericordia per i credenti..." (Al-Isra 17:82)

Leggere il Corano ogni giorno, anche solo per pochi versi, porta immense benedizioni (Barakah) nella propria casa e vita.`,
        category: 'quran',
        image_url: 'https://images.unsplash.com/photo-1585036156171-384164a8c675?auto=format&fit=crop&w=800&q=80',
        created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7).toISOString(),
        read_time: '4_min_read'
    },
    {
        id: 'post-4',
        title: 'The Concept of Tawakkul: Trusting Allah\'s Plan',
        title_ar: 'Ù…Ù Ù‡ÙˆÙ… Ø§Ù„ØªÙˆÙƒÙ„: Ø§Ù„Ø«Ù‚Ø© Ø¨Ø®Ø·Ø© Ø§Ù„Ù„Ù‡',
        title_it: 'Il Concetto di Tawakkul: Fidarsi del Piano di Allah',
        excerpt: 'Understanding the balance between tying your camel and trusting entirely in your Creator.',
        excerpt_ar: 'Ù Ù‡Ù… Ø§Ù„ØªÙˆØ§Ø²Ù† Ø¨ÙŠÙ† Ø§Ù„Ø£Ø®Ø° Ø¨Ø§Ù„Ø£Ø³Ø¨Ø§Ø¨ ÙˆØ§Ù„Ø«Ù‚Ø© Ø§Ù„ÙƒØ§Ù…Ù„Ø© Ù ÙŠ Ø®Ø§Ù„Ù‚Ùƒ.',
        excerpt_it: 'Comprendere l\'equilibrio tra fare la propria parte e fidarsi interamente del Creatore.',
        content: `Tawakkul is an essential Islamic concept that means putting full trust and reliance in Allah. It brings profound peace to the heart, knowing that the Almighty is in control of all affairs.

Allah says: "And whoever relies upon Allah - then He is sufficient for him." (At-Talaq 65:3)

### Tying the Camel
However, Tawakkul does not mean inaction. The famous hadith clarifies this beautifully:
A man asked the Prophet (ï·º): "O Messenger of Allah, should I tie my camel and trust in Allah, or should I leave her untied and trust in Allah?" The Prophet (ï·º) replied: "Tie her and trust in Allah." (Tirmidhi)

True Tawakkul means utilizing all the resources and means available to you (tying the camel) while recognizing in your heart that the outcome is entirely in the hands of Allah.

When we adopt this mindset, we replace anxiety with tranquility, and fear with faith.`,
        content_ar: `Ø§Ù„ØªÙˆÙƒÙ„ Ù‡Ùˆ Ù…Ù Ù‡ÙˆÙ… Ø¥Ø³Ù„Ø§Ù…ÙŠ Ø£Ø³Ø§Ø³ÙŠ ÙŠØ¹Ù†ÙŠ ÙˆØ¶Ø¹ Ø§Ù„Ø«Ù‚Ø© ÙˆØ§Ù„Ø§Ø¹ØªÙ…Ø§Ø¯ Ø§Ù„ÙƒØ§Ù…Ù„ Ø¹Ù„Ù‰ Ø§Ù„Ù„Ù‡. Ø¥Ù†Ù‡ ÙŠØ¬Ù„Ø¨ Ø³Ù„Ø§Ù…Ù‹Ø§ Ø¹Ù…ÙŠÙ‚Ù‹Ø§ Ù„Ù„Ù‚Ù„Ø¨ØŒ Ù…Ø¹ Ø§Ù„Ø¹Ù„Ù… Ø£Ù† Ø§Ù„Ø®Ø§Ù„Ù‚ Ù‡Ùˆ Ø§Ù„Ù…ØªØµØ±Ù  Ù ÙŠ Ø¬Ù…ÙŠØ¹ Ø§Ù„Ø£Ù…ÙˆØ±.

ÙŠÙ‚ÙˆÙ„ Ø§Ù„Ù„Ù‡ ØªØ¹Ø§Ù„Ù‰: "ÙˆÙŽÙ…ÙŽÙ† ÙŠÙŽØªÙŽÙˆÙŽÙƒÙŽÙ‘Ù„Ù’ Ø¹ÙŽÙ„ÙŽÙ‰ Ø§Ù„Ù„ÙŽÙ‘Ù‡Ù  Ù ÙŽÙ‡Ù ÙˆÙŽ Ø­ÙŽØ³Ù’Ø¨Ù Ù‡Ù ..." (Ø§Ù„Ø·Ù„Ø§Ù‚ 65:3).

### Ø§Ø¹Ù‚Ù„Ù‡Ø§ ÙˆØªÙˆÙƒÙ„
ÙˆÙ…Ø¹ Ø°Ù„ÙƒØŒ Ù Ø¥Ù† Ø§Ù„ØªÙˆÙƒÙ„ Ù„Ø§ ÙŠØ¹Ù†ÙŠ Ø§Ù„ØªÙ‚Ø§Ø¹Ø³. ÙŠÙˆØ¶Ø­ Ø§Ù„Ø­Ø¯ÙŠØ« Ø§Ù„Ø´Ù‡ÙŠØ± Ù‡Ø°Ø§ Ø¨Ø´ÙƒÙ„ Ø¬Ù…ÙŠÙ„:
Ø³Ø£Ù„ Ø±Ø¬Ù„ Ø§Ù„Ù†Ø¨ÙŠ (ï·º): "ÙŠØ§ Ø±Ø³ÙˆÙ„ Ø§Ù„Ù„Ù‡ØŒ Ø£Ø¹Ù‚Ù„Ù‡Ø§ ÙˆØ£ØªÙˆÙƒÙ„ (£ÙŠ Ù†Ø§Ù‚ØªÙŠ)ØŒ Ø£Ùˆ Ø£Ø·Ù„Ù‚Ù‡Ø§ ÙˆØ£ØªÙˆÙƒÙ„ØŸ" Ù Ø£Ø¬Ø§Ø¨ Ø§Ù„Ù†Ø¨ÙŠ (ï·º): "Ø§Ø¹Ù‚Ù„Ù‡Ø§ ÙˆØªÙˆÙƒÙ„" (Ø§Ù„ØªØ±Ù…Ø°ÙŠ).

Ø§Ù„ØªÙˆÙƒÙ„ Ø§Ù„Ø­Ù‚ÙŠÙ‚ÙŠ ÙŠØ¹Ù†ÙŠ Ø§Ø³ØªØ®Ø¯Ø§Ù… Ø¬Ù…ÙŠØ¹ Ø§Ù„Ù…ÙˆØ§Ø±Ø¯ ÙˆØ§Ù„Ø£Ø³Ø¨Ø§Ø¨ Ø§Ù„Ù…ØªØ§Ø­Ø© Ù„Ùƒ (Ø¹Ù‚Ù„ Ø§Ù„Ù†Ø§Ù‚Ø©) Ù…Ø¹ Ø§Ù„Ø§Ø¹ØªØ±Ø§Ù  Ù ÙŠ Ù‚Ù„Ø¨Ùƒ Ø¨Ø£Ù† Ø§Ù„Ù†ØªÙŠØ¬Ø© Ø¨ÙŠØ¯ Ø§Ù„Ù„Ù‡ ØªÙ…Ø§Ù…Ù‹Ø§.

Ø¹Ù†Ø¯Ù…Ø§ Ù†ØªØ¨Ù†Ù‰ Ù‡Ø°Ù‡ Ø§Ù„Ø¹Ù‚Ù„ÙŠØ©ØŒ Ù Ø¥Ù†Ù†Ø§ Ù†Ø³ØªØ¨Ø¯Ù„ Ø§Ù„Ù‚Ù„Ù‚ Ø¨Ø§Ù„Ø·Ù…Ø£Ù†ÙŠÙ†Ø©ØŒ ÙˆØ§Ù„Ø®ÙˆÙ  Ø¨Ø§Ù„Ø¥ÙŠÙ…Ø§Ù†.`,
        content_it: `Il Tawakkul Ã¨ un concetto islamico essenziale che significa riporre piena fiducia e affidamento in Allah. Porta una profonda pace al cuore, sapendo che l'Onnipotente ha il controllo di tutti gli affari.

Allah dice: "E a chi confida in Allah, Egli basta." (At-Talaq 65:3)

### Lega il Cammello
Tuttavia, il Tawakkul non significa inazione. Il famoso hadith chiarisce questo aspetto in modo meraviglioso:
Un uomo chiese al Profeta (ï·º): "O Messaggero di Allah, devo legare il mio cammello e fidarmi di Allah, o devo lasciarlo slegato e fidarmi di Allah?" Il Profeta (ï·º) rispose: "Legalo e fidati di Allah." (Tirmidhi)

Il vero Tawakkul significa utilizzare tutte le risorse e i mezzi a propria disposizione (legare il cammello) riconoscendo perÃ² nel proprio cuore che il risultato Ã¨ interamente nelle mani di Allah.

Quando adottiamo questa mentalitÃ , sostituiamo l'ansia con la tranquillitÃ  e la paura con la fede.`,
        category: 'spirituality',
        image_url: 'https://images.unsplash.com/photo-1542844111-ce151ed5dbe6?auto=format&fit=crop&w=800&q=80',
        created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 12).toISOString(),
        read_time: '3_min_read'
    }
];
