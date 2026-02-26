export interface ProphetStory {
    id: number;
    name: string;
    nameAr: string;
    summary: string;
    keyFacts: string[];
    era?: string;
}

export const prophetsData: ProphetStory[] = [
    {
        id: 1,
        name: "Adamo",
        nameAr: "آدم",
        summary: "Adamo è considerato il primo essere umano creato da Allah e il primo profeta dell'Islam. Allah lo plasmò dall'argilla e gli infuse lo spirito, insegnandogli i nomi di tutte le cose. Allah ordinò agli angeli di prostrarsi davanti a lui; tutti obbedirono tranne Iblis (Satana), che fu espulso per la sua arroganza. Adamo ed Eva vissero nel Paradiso fino a quando non furono tentati da Satana a mangiare il frutto dell'albero proibito. Dopo aver chiesto sinceramente perdono, furono inviati sulla Terra per iniziarvi la vita umana.",
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
        summary: "Noè fu inviato a un popolo che era caduto nell'idolatria. Per secoli li invitò a adorare un unico Dio, ma fu deriso e perseguitato. Allah gli ordinò di costruire un'immensa arca. Quando il diluvio ebbe inizio, Noè imbarcò i credenti e una coppia di ogni specie animale. Suo figlio scelse di restare con i miscredenti e perì tra le acque. Dopo il diluvio, la terra fu ripopolata dai sopravvissuti, rendendo Noè il 'secondo padre dell'umanità'.",
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
        summary: "Saleh fu inviato al popolo di Thamud, noto per scavare dimore nelle montagne. Come prova della sua missione, Allah fece scaturire miracolosamente una cammella da una roccia. Saleh avvertì il popolo di non farle del male, ma essi la uccisero. Come conseguenza, il popolo di Thamud fu distrutto da un boato improvviso, lasciando solo le loro case vuote come ammonimento.",
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
        summary: "Abramo è noto come 'Khalil-Allah' (l'amico di Dio). Rifiutò l'idolatria del suo popolo e fu condannato dal re Nimrod a essere bruciato vivo, ma Allah ordinò al fuoco di essere fresco e sicuro per lui. Insieme a suo figlio Ismaele, costruì la Kaaba alla Mecca. È considerato il padre di molti altri profeti attraverso i suoi figli Ismaele e Isacco.",
        keyFacts: [
            "Sopravvissuto miracolosamente a un enorme incendio.",
            "Insieme al figlio Ismaele, ricostruì la Kaaba alla Mecca.",
            "Fondatore del puro monoteismo abramitico."
        ]
    },
    {
        id: 5,
        name: "Giobbe",
        nameAr: "أيوب",
        summary: "Giobbe è il simbolo della pazienza. Inizialmente ricco, fu messo alla prova perdendo ogni possedimento, figli e salute per molti anni. Nonostante il dolore, non smise mai di ringraziare Dio. Allah gli ordinò poi di colpire il terreno con il piede, facendo scaturire una sorgente miracolosa che lo guarì completamente.",
        keyFacts: [
            "Esempio massimo di 'Sabr' (pazienza e costanza) nell'Islam.",
            "Provato per circa 18 anni con malattie e perdite materiali.",
            "Restaurato nella salute e nella ricchezza dopo aver superato la prova."
        ]
    },
    {
        id: 6,
        name: "Giuseppe",
        nameAr: "يوسف",
        summary: "Giuseppe, figlio prediletto di Giacobbe, fu gettato in un pozzo dai fratelli e venduto come schiavo. In Egitto, nonostante la prigionia, divenne tesoriere del Re grazie al dono di interpretare i sogni. Salvò la regione dalla carestia e alla fine si ricongiunse con la sua famiglia perdonando i fratelli.",
        keyFacts: [
            "Dotato del miracolo dell'interpretazione dei sogni.",
            "Divenne un potente ministro in Egitto dopo essere stato schiavo.",
            "Famoso per la sua straordinaria bellezza morale e fisica."
        ]
    },
    {
        id: 7,
        name: "Mosè",
        nameAr: "موسى",
        summary: "Mosè nacque durante la schiavitù degli Israeliti in Egitto. Ricevette la chiamata profetica presso il roveto ardente e liberò il suo popolo affrontando il Faraone. Il suo miracolo più celebre fu l'apertura del Mar Rosso. Ricevette la Torah sul Monte Sinai ed è noto come l'interlocutore di Dio.",
        keyFacts: [
            "Ebbe il privilegio di parlare direttamente con Allah (Kaleem Allah).",
            "Divise miracolosamente le acque del Mar Rosso con il suo bastone.",
            "Ricevuto la Torah (At-Tawrat) come guida per il suo popolo."
        ]
    },
    {
        id: 8,
        name: "Salomone",
        nameAr: "سليمان",
        summary: "Salomone ereditò il regno da suo padre Davide. Allah gli concesse il potere di comandare i venti, comprendere il linguaggio degli animali e avere autorità sui Jinn. Convertì la Regina di Saba al monoteismo dopo averla accolta in un palazzo di cristallo.",
        keyFacts: [
            "Profeta e Re che regnò su uomini, Jinn e natura.",
            "Poteva parlare con gli animali e navigare con l'aiuto del vento.",
            "Convertì la Regina di Saba all'adorazione dell'unico Dio."
        ]
    },
    {
        id: 9,
        name: "Gesù",
        nameAr: "عيسى",
        summary: "Gesù è nato miracolosamente dalla vergine Maria. Compì numerosi miracoli come guarire ciechi e lebbrosi e riportare in vita i morti col permesso di Dio. Portò il Vangelo (Injil). Secondo l'Islam, non fu crocifisso ma elevato al cielo da Allah.",
        keyFacts: [
            "Nato per miracolo da Maria attraverso la parola di Allah.",
            "Eseguì miracoli come resuscitare i morti o dar vita a uccellini di argilla.",
            "Considerato una delle figure più pure e devote a Dio."
        ]
    },
    {
        id: 10,
        name: "Maometto",
        nameAr: "محمد",
        summary: "Maometto è il 'Sigillo dei Profeti'. Ricevette la rivelazione del Corano all'età di 40 anni. Guidò la transizione al monoteismo per 23 anni, stabilendo a Medina il primo stato islamico. Portò il messaggio finale dell'Islam a tutta l'umanità.",
        keyFacts: [
            "Ricevuto il Corano, parola finale di Dio.",
            "Soprannominato 'Al-Amin' (Il Fidato).",
            "Fondatore della Ummah musulmana globale."
        ]
    }
];
