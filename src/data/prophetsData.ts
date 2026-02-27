export interface ProphetStory {
    id: number;
    name: string;
    nameAr: string;
    summary: string;
    keyFacts: string[];
    era?: string;
    fullStoryIt?: string; // Detailed story in Italian from PDF
}

export const prophetsData: ProphetStory[] = [
    {
        id: 1,
        name: "Adamo",
        nameAr: "آدم",
        era: "L'Inizio dell'Umanità",
        summary: "Il primo essere umano e il primo profeta creato da Allah. Formato dall'argilla e dotato dell'anima divina, gli fu insegnata la natura di tutte le cose.",
        fullStoryIt: "Adamo è considerato il primo essere umano creato da Allah e il primo profeta dell'Islam. Allah lo plasmò dall'argilla e gli infuse lo spirito, insegnandogli i nomi di tutte le cose. Allah ordinò agli angeli di prostrarsi davanti a lui; tutti obbedirono tranne Iblis (Satana), che fu espulso per la sua arroganza. Adamo ed Eva vissero nel Paradiso fino a quando non furono tentati da Satana a mangiare il frutto dell'albero proibito. Dopo aver chiesto sinceramente perdono, furono inviati sulla Terra per iniziarvi la vita umana.",
        keyFacts: [
            "Creato direttamente da Allah dall'argilla.",
            "Primo uomo e primo profeta a ricevere la guida divina.",
            "Padre dell'umanità."
        ]
    },
    {
        id: 2,
        name: "Noè",
        nameAr: "نوح",
        era: "L'Epoca del Diluvio",
        summary: "Noè fu inviato a un popolo che era caduto nell'idolatria. Costruì l'Arca per salvare i credenti dal Diluvio Universale.",
        fullStoryIt: "Noè fu inviato a un popolo che era caduto nell'idolatria. Per secoli li invitò a adorare un unico Dio, ma fu deriso e perseguitato. Allah gli ordinò di costruire un'immensa arca. Quando il diluvio ebbe inizio, Noè imbarcò i credenti e una coppia di ogni specie animale. Suo figlio scelse di restare con i miscredenti e perì tra le acque. Dopo il diluvio, la terra fu ripopolata dai sopravvissuti, rendendo Noè il 'secondo padre dell'umanità'.",
        keyFacts: [
            "Costruì l'Arca per salvare i credenti dal Diluvio Universale.",
            "Pazientò per circa 950 anni chiamando il suo popolo alla fede.",
            "Considerato uno dei profeti più determinati (Ulul-Azm)."
        ]
    },
    {
        id: 3,
        name: "Saleh",
        nameAr: "صالح",
        era: "Il popolo di Thamud",
        summary: "Saleh fu inviato al popolo di Thamud. Il suo miracolo fu una cammella divina nata miracolosamente da una roccia.",
        fullStoryIt: "Saleh fu inviato al popolo di Thamud, noto per scavare dimore nelle montagne. Come prova della sua missione, Allah fece scaturire miracolosamente una cammella da una roccia. Saleh avvertì il popolo di non farle del male, ma essi la uccisero. Come conseguenza, il popolo di Thamud fu distrutto da un boato improvviso e un terremoto, lasciando solo le loro case vuote come ammonimento. Saleh lasciò il villaggio con i fedeli e andò a vivere in Palestina.",
        keyFacts: [
            "Inviato al popolo di Thamud (abitanti delle montagne).",
            "Il suo miracolo fu una cammella divina nata da una roccia.",
            "Il popolo fu distrutto per aver ucciso l'animale sacro."
        ]
    },
    {
        id: 4,
        name: "Abramo",
        nameAr: "إبراهيم",
        era: "Padre dei Profeti",
        summary: "Abramo è noto come 'Khalil-Allah' (l'amico di Dio). Fondatore del puro monoteismo e costruttore della Kaaba.",
        fullStoryIt: "Abramo è l'Amico intimo di Allah (Khalil Allah). Rifiutò l'idolatria del suo popolo e fu condannato dal re Nimrod a essere bruciato vivo, ma Allah ordinò al fuoco di essere fresco e sicuro per lui. Insieme a suo figlio Ismaele, costruì la Kaaba alla Mecca. È il padre di tutti i Profeti venuti dopo di lui attraverso i suoi figli Ismaele e Isacco. Allah gli spalancò i sette cieli fino al Trono, mostrandogli la Sua luce in tutto il creato.",
        keyFacts: [
            "Sopravvissuto miracolosamente a un enorme incendio.",
            "Insieme al figlio Ismaele, ricostruì la Kaaba alla Mecca.",
            "Padre di Ismaele e Isacco, antenato di molti profeti."
        ]
    },
    {
        id: 5,
        name: "Giuseppe",
        nameAr: "يوسف",
        era: "Egitto faraonico",
        summary: "Giuseppe, figlio di Giacobbe, tradito dai fratelli e venduto come schiavo, divenne un potente ministro in Egitto.",
        fullStoryIt: "Giuseppe è il profeta della bellezza esteriore ed interiore. Tradito dai fratelli e venduto come schiavo, ascese ai vertici del potere in Egitto grazie alla sua saggezza e rettitudine. Dotato del miracolo dell'interpretazione dei sogni, salvò la regione dalla carestia e perdonò i suoi fratelli in un momento di grande nobiltà.",
        keyFacts: [
            "Dotato del miracolo dell'interpretazione dei sogni.",
            "Divenne un potente ministro in Egitto dopo essere stato schiavo.",
            "Famoso per la sua straordinaria bellezza morale e fisica."
        ]
    },
    {
        id: 6,
        name: "Mosa",
        nameAr: "موسى",
        era: "Egitto e Deserto",
        summary: "Mosè liberò gli Israeliti affrontando il Faraone. Ricevuto la Torah sul Monte Sinai.",
        fullStoryIt: "Mosè è il profeta della legge e della liberazione. Affrontò il tiranno più potente della terra con la sola forza della fede. Allah operò miracoli come l'apertura del Mar Rosso e la rivelazione della Torah. Ebbe il privilegio di parlare direttamente con Allah (Kaleem Allah).",
        keyFacts: [
            "Ebbe il privilegio di parlare direttamente con Allah (Kaleem Allah).",
            "Divise miracolosamente le acque del Mar Rosso con il suo bastone.",
            "Ricevuto la Torah (At-Tawrat) come guida per il suo popolo."
        ]
    },
    {
        id: 7,
        name: "Gesù",
        nameAr: "عيسى",
        era: "Palestina Romana",
        summary: "Gesù nacque miracolosamente da Maria. Portatore dell'Ingil e autore di grandi miracoli per volontà di Allah.",
        fullStoryIt: "Gesù è il Messia nato miracolosamente da Maria. Compì guarigioni prodigiose e riportò in vita i morti solo per volontà di Allah. Per l'Islam, non fu crocifisso ma elevato in cielo, da dove tornerà per stabilire la giustizia finale sulla terra.",
        keyFacts: [
            "Nato per miracolo da Maria attraverso la parola di Allah.",
            "Eseguì miracoli come resuscitare i morti col permesso di Dio.",
            "Ricevette l'Injil (Vangelo) come rivelazione."
        ]
    },
    {
        id: 9,
        name: "Giobbe",
        nameAr: "أيوب",
        era: "Pazienza e Fede",
        summary: "Esempio supremo di pazienza e fiducia in Allah durante le prove più dure.",
        fullStoryIt: "Giobbe (Ayyub) era un uomo ricco e prospero che fu messo alla prova con la perdita dei beni, dei figli e della salute. Nonostante anni di sofferenze estreme, non mormorò mai contro Allah, dimostrando una pazienza leggendaria. Alla fine della prova, Allah gli restituì tutto ciò che aveva perso e raddoppiò le sue benedizioni.",
        keyFacts: [
            "Simbolo universale della pazienza (Sabr).",
            "Mantenuto la fede incrollabile nonostante prove fisiche ed economiche.",
            "Restaurato in salute e ricchezza per ordine divino."
        ]
    },
    {
        id: 10,
        name: "Giona",
        nameAr: "يونس",
        era: "Ninive",
        summary: "Il profeta della balena. Insegnò che il perdono di Allah è sempre possibile attraverso il pentimento sincero.",
        fullStoryIt: "Giona (Yunus) fu inviato al popolo di Ninive. Preso dallo sconforto per il loro rifiuto, lasciò la città senza il permesso divino e finì nel ventre di una balena per tre giorni. Lì recitò la famosa preghiera di pentimento: 'Non c'è altro Dio che Te, Gloria a Te, sono stato uno degli ingiusti'. Allah lo salvò e il suo intero popolo si convertì.",
        keyFacts: [
            "Sopravvissuto tre giorni nel ventre di una balena.",
            "L'unico profeta il cui intero popolo si pentì e fu salvato dal castigo.",
            "Esempio del potere dell'invocazione sincera."
        ]
    },
    {
        id: 11,
        name: "Zaccaria",
        nameAr: "زكريا",
        era: "Gerusalemme",
        summary: "Guardiano di Maria e padre di Giovanni Battista. Chiese un erede ad Allah in età molto avanzata.",
        fullStoryIt: "Zaccaria (Zakariyya) era un pio sacerdote che si prendeva cura di Maria nella casa del Signore. Nonostante lui e sua moglie fossero anziani e sterili, chiese ad Allah un erede che continuasse la sua missione. Allah esaudì la sua preghiera donandogli Giovanni (Yahya).",
        keyFacts: [
            "Padre di Giovanni Battista (Yahya).",
            "Custode di Maria (madre di Gesù) nel Tempio.",
            "Esaudito miracolosamente con un figlio nella vecchiaia."
        ]
    },
    {
        id: 12,
        name: "Giovanni Battista",
        nameAr: "يحيى",
        era: "Giudea",
        summary: "Conosciuto per la sua pietà, purezza e castità fin dall'infanzia.",
        fullStoryIt: "Giovanni (Yahya) fu un profeta colmo di saggezza fin da bambino. Era noto per il suo ascetismo, la sua gentilezza verso i genitori e la sua purezza di cuore. Preparò il popolo all'arrivo di Gesù (Isa).",
        keyFacts: [
            "Dotato di saggezza e compassione fin dall'infanzia.",
            "Figlio di Zaccaria e parente di Gesù.",
            "Vissuto una vita di purezza e ascetismo estremo."
        ]
    },
    {
        id: 13,
        name: "Gesù",
        nameAr: "عيسى",
        era: "Il Messia",
        summary: "Il Messia, Parola e Spirito da Allah, nato miracolosamente da Maria.",
        fullStoryIt: "Gesù (Isa) è uno dei profeti più importanti dell'Islam. Nato miracolosamente dalla Vergine Maria (Maryam) senza padre, parlò dalla culla per difendere l'onore di sua madre. Compì straordinari miracoli con il permesso di Allah: guarì i ciechi, i lebbrosi e risuscitò i morti. Non fu crocifisso, ma Allah lo elevò a Sé e tornerà prima del Giorno del Giudizio.",
        keyFacts: [
            "Nato miracolosamente dalla Vergine Maria.",
            "Parlò dalla culla e compì miracoli eccezionali.",
            "Elevato al cielo e destinato a tornare sulla terra."
        ]
    }
];
