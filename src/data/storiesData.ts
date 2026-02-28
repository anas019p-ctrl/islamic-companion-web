export interface Story {
    id: string;
    title: string;
    title_ar?: string;
    title_en?: string;
    title_it?: string;
    content: string;
    content_ar?: string;
    content_en?: string;
    content_it?: string;
    moral: string;
    moral_ar?: string;
    moral_en?: string;
    moral_it?: string;
    category: 'prophets' | 'sahaba' | 'quran' | 'general';
    image_url?: string;
    read_time: string;
    age_group: string; // e.g. "4-7", "8-12"
}

export const staticStories: Story[] = [
    {
        id: 'story-adam',
        title: 'La Storia del Profeta Adamo, il Primo Uomo',
        title_ar: 'Ù‚ØµØ© Ø§Ù„Ù†Ø¨ÙŠ Ø¢Ø¯Ù…ØŒ Ø£ÙˆÙ„ Ø¥Ù†Ø³Ø§Ù†',
        title_en: 'The Story of Prophet Adam, the First Man',
        content: `Tanto, tanto tempo fa, prima che ci fossero persone, case o automobili, Allah ha creato la Terra e i Cieli. Poi, ha deciso di creare qualcosa di molto speciale: il primo essere umano! 
        
Allah ha chiesto agli angeli di raccogliere terra e argilla da tutto il mondo. Con questa argilla, Allah ha modellato il primo uomo e gli ha soffiato dentro la vita. Lo ha chiamato Adamo (la pace sia su di lui).
        
Allah ha insegnato ad Adamo i nomi di tutte le cose: gli alberi, gli animali, le stelle... Quando Allah ha chiesto agli angeli di nominare queste cose, loro non lo sapevano. Ma Adamo le sapeva tutte! Questo dimostrava quanto fosse intelligente il primo essere umano.

Adamo viveva in un bellissimo Paradiso. Allah ha creato anche una moglie per Adamo, Hawa (Eva), così che non fosse solo. Potevano mangiare tutto quello che volevano nel Paradiso, tranne i frutti di un albero speciale.

Ma Iblis (Shaytan) era molto geloso di Adamo. Iblis ha mentito ad Adamo e Hawa, dicendo loro che l'albero li avrebbe fatti vivere per sempre. Così, hanno mangiato il frutto. Subito, hanno capito di aver sbagliato e hanno chiesto scusa ad Allah piangendo e pentendosi.

Allah è il più Misericordioso: ha perdonato Adamo e Hawa! Poi, Allah li ha mandati sulla Terra per iniziare la vita dell'umanità. Da Adamo e Hawa siamo arrivati tutti noi!`,
        content_ar: `Ù ÙŠ ÙˆÙ‚Øª Ø¨Ø¹ÙŠØ¯ Ø¬Ø¯Ù‹Ø§ØŒ Ù‚Ø¨Ù„ ÙˆØ¬ÙˆØ¯ Ø§Ù„Ù†Ø§Ø³ Ø£Ùˆ Ø§Ù„Ù…Ù†Ø§Ø²Ù„ Ø£Ùˆ Ø§Ù„Ø³ÙŠØ§Ø±Ø§ØªØŒ Ø®Ù„Ù‚ Ø§Ù„Ù„Ù‡ Ø§Ù„Ø£Ø±Ø¶ ÙˆØ§Ù„Ø³Ù…Ø§ÙˆØ§Øª. Ø«Ù… Ù‚Ø±Ø± Ø£Ù† ÙŠØ®Ù„Ù‚ Ø´ÙŠØ¦Ù‹Ø§ Ù…Ù…ÙŠØ²Ù‹Ø§ Ø¬Ø¯Ù‹Ø§: Ø£ÙˆÙ„ Ø¥Ù†Ø³Ø§Ù†!
        
Ø·Ù„Ø¨ Ø§Ù„Ù„Ù‡ Ù…Ù† Ø§Ù„Ù…Ù„Ø§Ø¦ÙƒØ© Ø¬Ù…Ø¹ Ø§Ù„ØªØ±Ø§Ø¨ ÙˆØ§Ù„Ø·ÙŠÙ† Ù…Ù† Ø¬Ù…ÙŠØ¹ Ø£Ù†Ø­Ø§Ø¡ Ø§Ù„Ø¹Ø§Ù„Ù…. ÙˆØ¨Ù‡Ø°Ø§ Ø§Ù„Ø·ÙŠÙ†ØŒ Ø´ÙƒÙ„ Ø§Ù„Ù„Ù‡ Ø£ÙˆÙ„ Ø¥Ù†Ø³Ø§Ù† ÙˆÙ†Ù Ø® Ù ÙŠÙ‡ Ø§Ù„Ø±ÙˆØ­. ÙˆØ£Ø³Ù…Ø§Ù‡ Ø¢Ø¯Ù… (Ø¹Ù„ÙŠÙ‡ Ø§Ù„Ø³Ù„Ø§Ù…).

Ø¹Ù„Ù… Ø§Ù„Ù„Ù‡ Ø¢Ø¯Ù… Ø£Ø³Ù…Ø§Ø¡ ÙƒÙ„ Ø§Ù„Ø£Ø´ÙŠØ§Ø¡: Ø§Ù„Ø£Ø´Ø¬Ø§Ø±ØŒ Ø§Ù„Ø­ÙŠÙˆØ§Ù†Ø§ØªØŒ Ø§Ù„Ù†Ø¬ÙˆÙ…... ÙˆØ¹Ù†Ø¯Ù…Ø§ Ø³Ø£Ù„ Ø§Ù„Ù„Ù‡ Ø§Ù„Ù…Ù„Ø§Ø¦ÙƒØ© Ø¹Ù† Ø£Ø³Ù…Ø§Ø¡ Ù‡Ø°Ù‡ Ø§Ù„Ø£Ø´ÙŠØ§Ø¡ØŒ Ù„Ù… ÙŠØ¹Ø±Ù ÙˆØ§. Ù„ÙƒÙ† Ø¢Ø¯Ù… ÙƒØ§Ù† ÙŠØ¹Ø±Ù Ù‡Ø§ Ø¬Ù…ÙŠØ¹Ù‹Ø§!

Ø¹Ø§Ø´ Ø¢Ø¯Ù… Ù ÙŠ Ø¬Ù†Ø© Ø¬Ù…ÙŠÙ„Ø©ØŒ ÙˆØ®Ù„Ù‚ Ø§Ù„Ù„Ù‡ Ù„Ù‡ Ø²ÙˆØ¬Ø©ØŒ Ø­ÙˆØ§Ø¡ØŒ Ù„ÙƒÙŠ Ù„Ø§ ÙŠÙƒÙˆÙ† ÙˆØ­ÙŠØ¯Ù‹Ø§. ÙƒØ§Ù† Ø¨Ø¥Ù…ÙƒØ§Ù†Ù‡Ù…Ø§ Ø£ÙƒÙ„ Ù…Ø§ ÙŠØ´Ø§Ø¡Ø§Ù† Ù…Ø§ Ø¹Ø¯Ø§ Ø´Ø¬Ø±Ø© ÙˆØ§Ø­Ø¯Ø©. 

Ù„ÙƒÙ† Ø¥Ø¨Ù„ÙŠØ³ (Ø§Ù„Ø´ÙŠØ·Ø§Ù†) ÙƒØ§Ù† ÙŠØºØ§Ø± Ù…Ù† Ø¢Ø¯Ù…. ÙƒØ°Ø¨ Ø¹Ù„ÙŠÙ‡Ù…Ø§ ÙˆØ£Ø®Ø¨Ø±Ù‡Ù…Ø§ Ø£Ù† Ø§Ù„Ø´Ø¬Ø±Ø© Ø³ØªØ¬Ø¹Ù„Ù‡Ù…Ø§ ÙŠØ¹ÙŠØ´Ø§Ù† Ù„Ù„Ø£Ø¨Ø¯. Ù Ø£ÙƒÙ„Ø§ Ù…Ù†Ù‡Ø§. Ø«Ù… Ø£Ø¯Ø±ÙƒØ§ Ø®Ø·Ø£Ù‡Ù…Ø§ ÙˆØ¨ÙƒÙŠØ§ ÙˆØ·Ù„Ø¨Ø§ Ø§Ù„Ù…ØºÙ Ø±Ø©. ØºÙ Ø± Ø§Ù„Ù„Ù‡ Ù„Ù‡Ù…Ø§ Ù„Ø£Ù†Ù‡ Ø£Ø±Ø­Ù… Ø§Ù„Ø±Ø§Ø­Ù…ÙŠÙ†ØŒ Ø«Ù… Ø£Ø±Ø³Ù„Ù‡Ù…Ø§ Ø¥Ù„Ù‰ Ø§Ù„Ø£Ø±Ø¶ Ù„Ø¨Ø¯Ø¡ Ø­ÙŠØ§Ø© Ø§Ù„Ø¨Ø´Ø±ÙŠØ©.`,
        content_en: `A long, long time ago, before there were any people, houses, or cars, Allah created the Earth and the Heavens. Then, He decided to create something very special: the first human being! 
        
Allah asked the angels to gather soil and clay from all over the world. With this clay, Allah shaped the first man and breathed life into him. He named him Adam (peace be upon him).
        
Allah taught Adam the names of all things: the trees, the animals, the stars... When Allah asked the angels to name these things, they did not know. But Adam knew them all! This showed how intelligent the first human was.

Adam lived in a beautiful Paradise. Allah also created a wife for Adam, Hawa (Eve), so he wouldn't be alone. They could eat whatever they wanted in Paradise, except for the fruits of one special tree.

But Iblis (Shaytan) was very jealous of Adam. Iblis lied to Adam and Hawa, telling them the tree would make them live forever. So, they ate the fruit. Immediately, they realized they had made a mistake and asked Allah for forgiveness, crying and repenting.

Allah is the Most Merciful: He forgave Adam and Hawa! Then, Allah sent them to Earth to begin the life of humanity. From Adam and Hawa came all of us!`,
        moral: 'Tutti possono fare errori. La cosa importante è chiedere subito scusa ad Allah, perché Lui perdona sempre chi si pente sinceramente.',
        moral_ar: 'Ø§Ù„Ø¬Ù…ÙŠØ¹ ÙŠÙ…ÙƒÙ† Ø£Ù† ÙŠØ®Ø·Ø¦. Ø§Ù„Ø´ÙŠØ¡ Ø§Ù„Ù…Ù‡Ù… Ù‡Ùˆ Ø§Ù„Ø§Ø¹ØªØ°Ø§Ø± Ù„Ù„Ù‡ Ø¹Ù„Ù‰ Ø§Ù„Ù ÙˆØ±ØŒ Ù„Ø£Ù†Ù‡ ÙŠØºÙ Ø± Ø¯Ø§Ø¦Ù…Ù‹Ø§ Ù„Ù…Ù† ÙŠØªÙˆØ¨ Ø¨ØµØ¯Ù‚.',
        moral_en: 'Everyone makes mistakes. The important thing is to sincerely ask Allah for forgiveness, because He always forgives those who repent.',
        category: 'prophets',
        image_url: 'https://images.unsplash.com/photo-1542844111-ce151ed5dbe6?w=800',
        read_time: '3 min',
        age_group: '4-8'
    },
    {
        id: 'story-nuh',
        title: 'Il Profeta Nuh e la Grande Arca',
        title_ar: 'Ø§Ù„Ù†Ø¨ÙŠ Ù†ÙˆØ­ ÙˆØ§Ù„Ø³Ù ÙŠÙ†Ø© Ø§Ù„Ø¹Ø¸ÙŠÙ…Ø©',
        title_en: 'Prophet Nuh and the Great Ark',
        content: `Molto tempo dopo Adamo, le persone sulla Terra avevano iniziato a dimenticarsi di Allah e pregavano delle statue di pietra chiamate idoli. Allah mandò il Profeta Nuh (Noè) per ricordare loro di pregare solo Allah.

Nuh parlò loro per ben 950 anni! "Per favore, adorate solo Allah," diceva. Ma le persone lo prendevano in giro. Gli ridevano in faccia e si mettevano le dita nelle orecchie per non ascoltarlo. Solo pochissime persone e alcuni animali gli credettero.

Allah disse a Nuh di costruire una gigantesca Arca (una nave grandissima) di legno. Le persone cattive ridevano ancora di più: "Perché stai costruendo una nave sulla terra asciutta? Sei pazzo!" Ma Nuh continuò a obbedire ad Allah e lavorò duro.

Quando l'Arca fu pronta, Allah disse a Nuh di portare a bordo due animali di ogni specie (un maschio e una femmina) e tutti i credenti. All'improvviso, iniziò a piovere. Pioveva così tanto e l'acqua usciva anche dal suolo! In poco tempo, tutto il mondo si riempì di acqua. 

Le persone che avevano preso in giro Nuh cercarono di salvarsi salendo sulle montagne, ma l'acqua era troppo alta. Solo Nuh e coloro che erano sull'Arca furono salvati dall'acqua che galleggiava in alto, perché avevano ascoltato Allah.`,
        content_ar: `Ø¨Ø¹Ø¯ Ø¢Ø¯Ù… Ø¨ÙˆÙ‚Øª Ø·ÙˆÙŠÙ„ØŒ Ø¨Ø¯Ø£ Ø§Ù„Ù†Ø§Ø³ Ø¹Ù„Ù‰ Ø§Ù„Ø£Ø±Ø¶ ÙŠÙ†Ø³ÙˆÙ† Ø§Ù„Ù„Ù‡ ÙˆÙŠØ¹Ø¨Ø¯ÙˆÙ† ØªÙ…Ø§Ø«ÙŠÙ„ Ø­Ø¬Ø±ÙŠØ© ØªØ³Ù…Ù‰ Ø§Ù„Ø£ØµÙ†Ø§Ù…. Ø£Ø±Ø³Ù„ Ø§Ù„Ù„Ù‡ Ø§Ù„Ù†Ø¨ÙŠ Ù†ÙˆØ­ Ù„ÙŠØ°ÙƒØ±Ù‡Ù… Ø¨Ø¹Ø¨Ø§Ø¯Ø© Ø§Ù„Ù„Ù‡ ÙˆØ­Ø¯Ù‡.

ØªØ­Ø¯Ø« Ø¥Ù„ÙŠÙ‡Ù… Ù†ÙˆØ­ Ù„Ù…Ø¯Ø© 950 Ø¹Ø§Ù…Ù‹Ø§! ÙƒØ§Ù† ÙŠÙ‚ÙˆÙ„: "Ø£Ø±Ø¬ÙˆÙƒÙ…ØŒ Ø§Ø¹Ø¨Ø¯ÙˆØ§ Ø§Ù„Ù„Ù‡ ÙˆØ­Ø¯Ù‡". Ù„ÙƒÙ† Ø§Ù„Ù†Ø§Ø³ ÙƒØ§Ù†ÙˆØ§ ÙŠØ³Ø®Ø±ÙˆÙ† Ù…Ù†Ù‡ ÙˆÙŠØ¶Ø¹ÙˆÙ† Ø£ØµØ§Ø¨Ø¹Ù‡Ù… Ù ÙŠ Ø¢Ø°Ø§Ù†Ù‡Ù… Ù„ÙƒÙŠ Ù„Ø§ ÙŠØ³Ù…Ø¹ÙˆÙ‡. Ù„Ù… ÙŠØ¤Ù…Ù† Ø¨Ù‡ Ø³ÙˆÙ‰ Ù‚Ù„Ø© Ù‚Ù„ÙŠÙ„Ø©.

Ø£Ù…Ø± Ø§Ù„Ù„Ù‡ Ù†ÙˆØ­Ù‹Ø§ Ø£Ù† ÙŠØ¨Ù†ÙŠ Ø³Ù ÙŠÙ†Ø© Ø®Ø´Ø¨ÙŠØ© Ø¹Ù…Ù„Ø§Ù‚Ø©. Ø¶Ø­Ùƒ Ø§Ù„Ø£Ø´Ø±Ø§Ø± Ø£ÙƒØ«Ø±: "Ù„Ù…Ø§Ø°Ø§ ØªØ¨Ù†ÙŠ Ø³Ù ÙŠÙ†Ø© Ø¹Ù„Ù‰ Ø§Ù„ÙŠØ§Ø¨Ø³Ø©ØŸ!". Ù„ÙƒÙ† Ù†ÙˆØ­Ù‹Ø§ Ø§Ø³ØªÙ…Ø± Ù ÙŠ Ø·Ø§Ø¹Ø© Ø§Ù„Ù„Ù‡.

Ø¹Ù†Ø¯Ù…Ø§ Ø¬Ù‡Ø²Øª Ø§Ù„Ø³Ù ÙŠÙ†Ø©ØŒ Ø£Ù…Ø± Ø§Ù„Ù„Ù‡ Ù†ÙˆØ­Ù‹Ø§ Ø£Ù† ÙŠØ­Ù…Ù„ Ù…Ø¹Ù‡ Ø²ÙˆØ¬ÙŠÙ† Ù…Ù† ÙƒÙ„ Ø­ÙŠÙˆØ§Ù† ÙˆØ¬Ù…ÙŠØ¹ Ø§Ù„Ù…Ø¤Ù…Ù†ÙŠÙ†. Ù Ø¬Ø£Ø©ØŒ Ø¨Ø¯Ø£Øª ØªÙ…Ø·Ø± Ø¨ØºØ²Ø§Ø±Ø© ÙˆØ®Ø±Ø¬ Ø§Ù„Ù…Ø§Ø¡ Ù…Ù† Ø§Ù„Ø£Ø±Ø¶! Ù ÙŠ ÙˆÙ‚Øª Ù‚ØµÙŠØ±ØŒ ØºØ·Ù‰ Ø§Ù„Ù…Ø§Ø¡ Ø§Ù„Ø¹Ø§Ù„Ù… ÙƒÙ„Ù‡.

Ø§Ù„Ø°ÙŠÙ† Ø³Ø®Ø±ÙˆØ§ Ù…Ù† Ù†ÙˆØ­ ØºØ±Ù‚ÙˆØ§ØŒ Ø¨ÙŠÙ†Ù…Ø§ Ù†Ø¬Ø§ Ù†ÙˆØ­ ÙˆÙ…Ù† Ù…Ø¹Ù‡ Ù ÙŠ Ø§Ù„Ø³Ù ÙŠÙ†Ø© Ù„Ø£Ù†Ù‡Ù… Ø£Ø·Ø§Ø¹ÙˆØ§ Ø§Ù„Ù„Ù‡.`,
        content_en: `Long after Adam, people on Earth had started forgetting about Allah and prayed to stone statues called idols. Allah sent Prophet Nuh (Noah) to remind them to pray only to Allah.

Nuh talked to them for 950 years! "Please, worship only Allah," he would say. But the people made fun of him. They laughed in his face and put their fingers in their ears so they couldn't hear him. Only a very few people believed him.

Allah told Nuh to build a gigantic Ark (a very large boat) out of wood. The bad people laughed even more: "Why are you building a ship on dry land? You're crazy!" But Nuh continued to obey Allah and worked hard.

When the Ark was ready, Allah told Nuh to bring on board two animals of every species (a male and a female) and all the believers. Suddenly, it started to rain. It rained so much, and water even came out of the ground! Soon, the whole world filled with water. 

The people who had made fun of Nuh tried to save themselves by climbing mountains, but the water was too high. Only Nuh and those on the Ark were saved from the floods, floating safely above, because they had listened to Allah.`,
        moral: 'Non importa cosa dicono le altre persone: obbedire ad Allah e fare la cosa giusta, anche se gli altri ci ridono addosso, ci porta sempre alla salvezza.',
        moral_ar: 'Ù„Ø§ ÙŠÙ‡Ù… Ù…Ø§ ÙŠÙ‚ÙˆÙ„Ù‡ Ø§Ù„Ø¢Ø®Ø±ÙˆÙ†: Ø·Ø§Ø¹Ø© Ø§Ù„Ù„Ù‡ ÙˆÙ Ø¹Ù„ Ø§Ù„ØµÙˆØ§Ø¨ØŒ Ø­ØªÙ‰ Ù„Ùˆ Ø³Ø®Ø± Ù…Ù†Ø§ Ø§Ù„Ø¢Ø®Ø±ÙˆÙ†ØŒ ÙŠØ¤Ø¯ÙŠ Ø¯Ø§Ø¦Ù…Ù‹Ø§ Ø¥Ù„Ù‰ Ø§Ù„Ù†Ø¬Ø§Ø©.',
        moral_en: 'It does not matter what other people say: obeying Allah and doing the right thing, even if others laugh at us, always leads to salvation.',
        category: 'prophets',
        image_url: 'https://images.unsplash.com/photo-1594913210408-72b1d3d623b3?w=800',
        read_time: '4 min',
        age_group: '4-8'
    },
    {
        id: 'story-ibrahim-fire',
        title: 'Il Profeta Ibrahim e il Fuoco Freddo',
        title_ar: 'Ø§Ù„Ù†Ø¨ÙŠ Ø¥Ø¨Ø±Ø§Ù‡ÙŠÙ… ÙˆØ§Ù„Ù†Ø§Ø± Ø§Ù„Ø¨Ø§Ø±Ø¯Ø©',
        title_en: 'Prophet Ibrahim and the Cold Fire',
        content: `Il coraggioso Profeta Ibrahim (Abramo) viveva in una città in cui il Re Namrud e tutte le persone pregavano delle strane statue di pietra. Persino il papà di Ibrahim, Azar, faceva e vendeva queste statue!

Ibrahim sapeva che quelle statue non potevano né ascoltare, né parlare. Così, un giorno, quando tutti andarono a una festa fuori dalla città, Ibrahim prese un'ascia e ruppe tutte le statue, tranne la più grande. Mise l'ascia vicino alla statua grande.

Quando le persone tornarono, si arrabbiarono tantissimo! Chiesero a Ibrahim: "Hai distrutto i nostri dèi?". Ibrahim rispose: "Chiedete alla statua grande, ha lei l'ascia!". Le persone capirono di aver torto, perché sapevano che la statua non poteva muoversi, ma per l'orgoglio si rifiutarono di ammetterlo.

Invece di pentirsi, il cattivo Re ordinò di gettare Ibrahim in un fuoco gigantesco. Fecero un fuoco così grande che le fiamme toccavano il cielo. Le persone pensarono che per Ibrahim fosse finita.

Ma Ibrahim si fidava ciecamente di Allah. Disse: "Allah mi basta, ed Egli è il miglior protettore". E Allah ordinò al fuoco: "O fuoco, sii freddo e pacifico per Ibrahim!". Invece di bruciare, il fuoco divenne un posto fresco e rilassante per Ibrahim. Quando le fiamme si spensero, le persone rimasero a bocca aperta: Ibrahim era salvo e felice!`,
        content_ar: `ÙƒØ§Ù† Ø§Ù„Ù†Ø¨ÙŠ Ø¥Ø¨Ø±Ø§Ù‡ÙŠÙ… (Ø¹Ù„ÙŠÙ‡ Ø§Ù„Ø³Ù„Ø§Ù…) Ø§Ù„Ø´Ø¬Ø§Ø¹ ÙŠØ¹ÙŠØ´ Ù ÙŠ Ù…Ø¯ÙŠÙ†Ø© ÙŠØ¹Ø¨Ø¯ Ù ÙŠÙ‡Ø§ Ø§Ù„Ù…Ù„Ùƒ Ù†Ù…Ø±ÙˆØ¯ ÙˆØ§Ù„Ù†Ø§Ø³ Ø£ØµÙ†Ø§Ù…Ù‹Ø§ Ù…Ù† Ø§Ù„Ø­Ø¬Ø§Ø±Ø©. Ø­ØªÙ‰ ÙˆØ§Ù„Ø¯ Ø¥Ø¨Ø±Ø§Ù‡ÙŠÙ…ØŒ Ø¢Ø²Ø±ØŒ ÙƒØ§Ù† ÙŠØµÙ†Ø¹ Ù‡Ø°Ù‡ Ø§Ù„ØªÙ…Ø§Ø«ÙŠÙ„ ÙˆÙŠØ¨ÙŠØ¹Ù‡Ø§!

Ø¹Ø±Ù  Ø¥Ø¨Ø±Ø§Ù‡ÙŠÙ… Ø£Ù† Ù‡Ø°Ù‡ Ø§Ù„ØªÙ…Ø§Ø«ÙŠÙ„ Ù„Ø§ ÙŠÙ…ÙƒÙ†Ù‡Ø§ Ø£Ù† ØªØ³Ù…Ø¹ Ø£Ùˆ ØªØªÙƒÙ„Ù…. Ù„Ø°Ù„ÙƒØŒ Ù ÙŠ Ø£Ø­Ø¯ Ø§Ù„Ø£ÙŠØ§Ù…ØŒ Ø¹Ù†Ø¯Ù…Ø§ Ø°Ù‡Ø¨ Ø§Ù„Ø¬Ù…ÙŠØ¹ Ù„Ù„Ø§Ø­ØªÙ Ø§Ù„ Ø®Ø§Ø±Ø¬ Ø§Ù„Ù…Ø¯ÙŠÙ†Ø©ØŒ Ø£Ø®Ø° Ø¥Ø¨Ø±Ø§Ù‡ÙŠÙ… Ù Ø£Ø³Ù‹Ø§ ÙˆØ­Ø·Ù… Ø¬Ù…ÙŠØ¹ Ø§Ù„Ø£ØµÙ†Ø§Ù… Ø¨Ø§Ø³ØªØ«Ù†Ø§Ø¡ Ø§Ù„Ø£ÙƒØ¨Ø±. ÙˆÙˆØ¶Ø¹ Ø§Ù„Ù Ø£Ø³ Ø¨Ø¬Ø§Ù†Ø¨ Ø§Ù„ØµÙ†Ù… Ø§Ù„ÙƒØ¨ÙŠØ±.

Ø¹Ù†Ø¯Ù…Ø§ Ø¹Ø§Ø¯ Ø§Ù„Ù†Ø§Ø³ØŒ ØºØ¶Ø¨ÙˆØ§ Ø¬Ø¯Ù‹Ø§! ÙˆØ³Ø£Ù„ÙˆØ§ Ø¥Ø¨Ø±Ø§Ù‡ÙŠÙ…: "Ù‡Ù„ Ø¯Ù…Ø±Øª Ø¢Ù„Ù‡ØªÙ†Ø§ØŸ" Ù Ø£Ø¬Ø§Ø¨ Ø¥Ø¨Ø±Ø§Ù‡ÙŠÙ…: "Ø§Ø³Ø£Ù„ÙˆØ§ Ø§Ù„ØµÙ†Ù… Ø§Ù„ÙƒØ¨ÙŠØ±ØŒ Ù Ù‡Ùˆ ÙŠÙ…Ù„Ùƒ Ø§Ù„Ù Ø£Ø³!". Ø£Ø¯Ø±Ùƒ Ø§Ù„Ù†Ø§Ø³ Ø£Ù†Ù‡Ù… Ù…Ø®Ø·Ø¦ÙˆÙ†...

Ù„ÙƒÙ†Ù‡Ù… Ù‚Ø±Ø±ÙˆØ§ Ø¥Ù„Ù‚Ø§Ø¡Ù‡ Ù ÙŠ Ù†Ø§Ø± Ø¹Ø¸ÙŠÙ…Ø©. Ù„ÙƒÙ† Ø¥Ø¨Ø±Ø§Ù‡ÙŠÙ… ÙˆØ«Ù‚ Ø¨Ø§Ù„Ù„Ù‡. ÙˆØ£Ù…Ø± Ø§Ù„Ù„Ù‡ Ø§Ù„Ù†Ø§Ø±: "ÙŠØ§ Ù†Ø§Ø± ÙƒÙˆÙ†ÙŠ Ø¨Ø±Ø¯Ù‹Ø§ ÙˆØ³Ù„Ø§Ù…Ù‹Ø§ Ø¹Ù„Ù‰ Ø¥Ø¨Ø±Ø§Ù‡ÙŠÙ…". ÙˆØ®Ø±Ø¬ Ø³Ø§Ù„Ù…Ù‹Ø§!`,
        content_en: `The brave Prophet Ibrahim (Abraham) lived in a city where King Namrud and all the people prayed to strange stone statues. Even Ibrahim's father made and sold these statues!

Ibrahim knew that these statues could neither hear nor speak. So, one day, when everyone went to a festival outside the city, Ibrahim took an axe and broke all the statues except the biggest one. He put the axe next to the big statue.

When the people returned, they were very angry! They asked Ibrahim, "Did you destroy our gods?" Ibrahim replied, "Ask the big statue, he has the axe!" The people knew they were wrong, because the statue could not move.

Instead of repenting, the bad King ordered Ibrahim to be thrown into a giant fire. But Ibrahim trusted Allah entirely. He said, "Sufficient for me is Allah, and He is the best Disposer of affairs." And Allah commanded the fire, "O fire, be coolness and safety upon Ibrahim!" Instead of burning, the fire became a cool and relaxing place. Ibrahim was safe and happy!`,
        moral: 'Mettendo la nostra fiducia ciecamente in Allah ("Tawakkul"), Egli ci proteggerà sempre, anche quando le sfide sembrano impossibili e grandissime come un fuoco!',
        moral_ar: 'Ø¹Ù†Ø¯Ù…Ø§ Ù†Ø¶Ø¹ Ø«Ù‚ØªÙ†Ø§ Ø§Ù„ÙƒØ§Ù…Ù„Ø© Ù ÙŠ Ø§Ù„Ù„Ù‡ ("Ø§Ù„ØªÙˆÙƒÙ„")ØŒ Ù Ø¥Ù†Ù‡ Ø³ÙŠØ­Ù…ÙŠÙ†Ø§ Ø¯Ø§Ø¦Ù…Ù‹Ø§ØŒ Ø­ØªÙ‰ Ø¹Ù†Ø¯Ù…Ø§ ØªØ¨Ø¯Ùˆ Ø§Ù„ØªØ­Ø¯ÙŠØ§Øª Ù…Ø³ØªØ­ÙŠÙ„Ø©!',
        moral_en: 'By putting our trust completely in Allah ("Tawakkul"), He will always protect us, even when challenges seem impossible and as big as a fire!',
        category: 'prophets',
        image_url: 'https://images.unsplash.com/photo-1542810634-71277d95dcbb?w=800',
        read_time: '4 min',
        age_group: '6-10'
    },
    {
        id: 'story-musa-sea',
        title: 'Il Profeta Musa e il Mare Diviso',
        title_ar: 'Ø§Ù„Ù†Ø¨ÙŠ Ù…ÙˆØ³Ù‰ ÙˆØ§Ù†Ø´Ù‚Ø§Ù‚ Ø§Ù„Ø¨Ø­Ø±',
        title_en: 'Prophet Musa and the Parting of the Sea',
        content: `Il cattivo Faraone dell'Egitto costringeva il popolo (i Bambini di Israele) a lavorare come schiavi. Allah scelse il Profeta Musa (Mosè) per liberarli e guidarli.

Musa andò dal Faraone e gli chiese di liberare il suo popolo e di credere in Allah. Ma il Faraone era arrogante, diceva di essere lui stesso un dio, e si rifiutò. Così, nel cuore della notte, Musa guidò il suo popolo per scappare dall'Egitto.

Quando si accorsero che erano scappati, il Faraone e il suo forte esercito cominciarono a rincorrerli sui loro carri veloci. Il popolo di Musa arrivò davanti a un ostacolo enorme: il Mar Rosso! Dietro di loro c'era l'esercito cattivo e davanti c'era il mare profondo. Avevano molta paura e gridavano: "Siamo in trappola, verremo catturati!".

Musa sorrise e disse tranquillo: "No, il mio Signore è con me, Egli mi guiderà". Improvvisamente, Allah disse a Musa di colpire l'acqua con il suo bastone magico. Non appena Musa colpì l'acqua del mare, l'acqua si divise in due, formando due grandissimi muri altissimi e un sentiero piatto e asciutto in mezzo!

Il popolo camminò al sicuro fino all'altra parte. Quando il Faraone e i soldati provarono a seguirli su quel sentiero asciutto, Allah fece richiudere il mare su di loro. L'acqua crollò, ed essi furono sconfitti, mentre Musa e i credenti poterono cantare lodi ad Allah per essere stati salvati in modo miracoloso!`,
        content_ar: `ÙƒØ§Ù† Ù Ø±Ø¹ÙˆÙ† Ù…ØµØ± Ø§Ù„Ø´Ø±ÙŠØ± ÙŠØ¬Ø¨Ø± Ø¨Ù†ÙŠ Ø¥Ø³Ø±Ø§Ø¦ÙŠÙ„ Ø¹Ù„Ù‰ Ø§Ù„Ø¹Ù…Ù„ ÙƒØ¹Ø¨ÙŠØ¯. Ø§Ø®ØªØ§Ø± Ø§Ù„Ù„Ù‡ Ø§Ù„Ù†Ø¨ÙŠ Ù…ÙˆØ³Ù‰ (Ø¹Ù„ÙŠÙ‡ Ø§Ù„Ø³Ù„Ø§Ù…) Ù„ØªØ­Ø±ÙŠØ±Ù‡Ù….
        
Ø°Ù‡Ø¨ Ù…ÙˆØ³Ù‰ Ø¥Ù„Ù‰ Ù Ø±Ø¹ÙˆÙ† ÙˆØ·Ù„Ø¨ Ù…Ù†Ù‡ Ø£Ù† ÙŠØ¤Ù…Ù† Ø¨Ø§Ù„Ù„Ù‡ ÙˆÙŠØ­Ø±Ø± Ø´Ø¹Ø¨Ù‡. Ù„ÙƒÙ† Ù Ø±Ø¹ÙˆÙ† Ø±Ù Ø¶. Ù ÙŠ Ù…Ù†ØªØµÙ  Ø§Ù„Ù„ÙŠÙ„ØŒ Ù‚Ø§Ø¯ Ù…ÙˆØ³Ù‰ Ù‚ÙˆÙ…Ù‡ Ù„Ù„Ù‡Ø±Ø¨ Ù…Ù† Ù…ØµØ±. Ù„Ø­Ù‚ Ø¨Ù‡Ù… Ù Ø±Ø¹ÙˆÙ† ÙˆØ¬ÙŠØ´Ù‡.
        
ÙˆØµÙ„ Ù‚ÙˆÙ… Ù…ÙˆØ³Ù‰ Ø¥Ù„Ù‰ Ø§Ù„Ø¨Ø­Ø± Ø§Ù„Ø£Ø­Ù…Ø±. Ø®Ù„Ù Ù‡Ù… Ø§Ù„Ø¬ÙŠØ´ ÙˆØ£Ù…Ø§Ù…Ù‡Ù… Ø§Ù„Ø¨Ø­Ø±. Ø®Ø§Ù ÙˆØ§ ÙˆÙ‚Ø§Ù„ÙˆØ§: "Ø³ÙŠÙ‚Ø¨Ø¶ÙˆÙ† Ø¹Ù„ÙŠÙ†Ø§!". Ù„ÙƒÙ† Ù…ÙˆØ³Ù‰ Ù‚Ø§Ù„: "ÙƒÙ„Ø§ØŒ Ø¥Ù† Ù…Ø¹ÙŠ Ø±Ø¨ÙŠ Ø³ÙŠÙ‡Ø¯ÙŠÙ†".
        
Ø£Ù…Ø± Ø§Ù„Ù„Ù‡ Ù…ÙˆØ³Ù‰ Ø£Ù† ÙŠØ¶Ø±Ø¨ Ø§Ù„Ø¨Ø­Ø± Ø¨Ø¹ØµØ§Ù‡. Ù Ø§Ù†Ø´Ù‚ Ø§Ù„Ø¨Ø­Ø± ÙˆØ¸Ù‡Ø± Ù…Ù…Ø± ÙŠØ§Ø¨Ø³! Ø¹Ø¨Ø± Ø§Ù„Ù…Ø¤Ù…Ù†ÙˆÙ† Ø¨Ø£Ù…Ø§Ù†ØŒ ÙˆØ¹Ù†Ø¯Ù…Ø§ Ø­Ø§ÙˆÙ„ Ù Ø±Ø¹ÙˆÙ† ÙˆØ¬ÙŠØ´Ù‡ Ø§Ù„Ù„Ø­Ø§Ù‚ Ø¨Ù‡Ù…ØŒ Ø£ØºÙ„Ù‚ Ø§Ù„Ù„Ù‡ Ø§Ù„Ø¨Ø­Ø± Ø¹Ù„ÙŠÙ‡Ù… Ù ØºØ±Ù‚ÙˆØ§.`,
        content_en: `The evil Pharaoh of Egypt forced the people (the Children of Israel) to work as slaves. Allah chose Prophet Musa (Moses) to free them and guide them.

Musa went to Pharaoh and asked him to free his people and to believe in Allah. But Pharaoh was arrogant, claimed to be a god himself, and refused. So, in the middle of the night, Musa led his people to escape from Egypt.

When they realized they had escaped, Pharaoh and his strong army began to chase them on their fast chariots. Musa's people arrived in front of a huge obstacle: the Red Sea! Behind them was the evil army, and in front was the deep sea. They were very afraid and cried, "We are trapped, we will be caught!"

Musa smiled and said calmly, "No, indeed, with me is my Lord; He will guide me." Suddenly, Allah told Musa to strike the water with his magical staff. As soon as Musa struck the sea water, the water split in two, forming two huge, towering walls and a flat, dry path in the middle!

The people walked safely to the other side. When Pharaoh and the soldiers tried to follow them on that dry path, Allah caused the sea to close back over them. The water crashed down, and they were defeated, while Musa and the believers sang praises to Allah for being miraculously saved!`,
        moral: 'Non perdere mai la speranza! Anche quando i problemi sembrano muri giganti come il mare, Allah può aprire per te una strada asciutta incredibile se ha fiducia in Lui.',
        moral_ar: 'Ù„Ø§ ØªÙ Ù‚Ø¯ Ø§Ù„Ø£Ù…Ù„ Ø£Ø¨Ø¯Ù‹Ø§! Ø­ØªÙ‰ Ø¹Ù†Ø¯Ù…Ø§ ØªØ¨Ø¯Ùˆ Ø§Ù„Ù…Ø´Ø§ÙƒÙ„ Ù…Ø«Ù„ Ø§Ù„Ø¨Ø­Ø±ØŒ ÙŠÙ…ÙƒÙ† Ù„Ù„Ù‡ Ø£Ù† ÙŠØ´Ù‚ Ù„Ùƒ Ø·Ø±ÙŠÙ‚Ù‹Ø§ Ù…Ù Ø°Ù‡Ù„Ù‹Ø§ Ø¥Ø°Ø§ ÙˆØ«Ù‚Øª Ø¨Ù‡.',
        moral_en: 'Never lose hope! Even when problems seem like giant walls like the sea, Allah can open an incredible dry path for you if you trust in Him.',
        category: 'prophets',
        image_url: 'https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=800',
        read_time: '4 min',
        age_group: '6-10'
    }
];
