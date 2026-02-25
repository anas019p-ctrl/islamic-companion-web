import { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
    AlertTriangle, CheckCircle2, XCircle, Info,
    Search, BookOpen, MessageSquare, Lightbulb, Sparkles
} from 'lucide-react';

const commonMistakes = [
    {
        category: 'Arkan al-Salat (I Pilastri)',
        categoryAr: 'Ø£Ø±ÙƒØ§Ù† Ø§Ù„ØµÙ„Ø§Ø©',
        categoryIt: 'Arkan al-Salat (I 14 Pilastri)',
        description: 'I pilastri sono le parti essenziali della preghiera. Se uno di questi viene omesso (intenzionalmente o per dimenticanza), la preghiera Ã¨ nulla e non puÃ² essere riparata solo con il Sujud al-Sahw; deve essere ripetuta la parte mancante o l\'intera preghiera.',
        mistakes: [
            {
                id: 101,
                severity: 'ARKAN (Fondamentale)',
                title: 'Mancanza di TranquillitÃ  (At-Tumanina)',
                titleAr: 'Ø¹Ø¯Ù… Ø§Ù„Ø·Ù…Ø£Ù†ÙŠÙ†Ø© ÙÙŠ Ø§Ù„ØµÙ„Ø§Ø©',
                titleIt: 'Mancanza di TranquillitÃ  (Tumanina)',
                description: 'Muoversi troppo velocemente tra le posizioni (Ruku, Sujud, I\'tidal) senza fermarsi abbastanza a lungo da permettere alle ossa di tornare in posizione.',
                descriptionAr: 'Ø§Ù„Ø¹Ø¬Ù„Ø© ÙÙŠ Ø§Ù„ØµÙ„Ø§Ø© ÙˆØ¹Ø¯Ù… Ø§Ù„Ø³ÙƒÙˆÙ† ÙÙŠ Ø§Ù„Ø±ÙƒÙˆØ¹ ÙˆØ§Ù„Ø³Ø¬ÙˆØ¯ ÙˆØ§Ù„Ø±ÙØ¹ Ù…Ù†Ù‡Ù…Ø§.',
                descriptionIt: 'Eseguire i movimenti della preghiera come un "corvo che becca il terreno", senza fermarsi stabilmente in ogni posizione.',
                correction: 'La Tumanina Ã¨ un pilastro in ogni movimento. Devi fermarti in ogni posizione per almeno il tempo necessario a dire il Dhikr prescritto con calma.',
                correctionAr: 'Ø§Ù„Ø·Ù…Ø£Ù†ÙŠÙ†Ø© Ø±ÙƒÙ†ØŒ ÙˆÙ‡ÙŠ Ø§Ù„Ø³ÙƒÙˆÙ† ÙˆØ¥Ù† Ù‚Ù„ ÙÙŠ ÙƒÙ„ Ø±ÙƒÙ† ÙØ¹Ù„ÙŠ. ÙŠØ¬Ø¨ Ø£Ù† ÙŠØ³ØªÙ‚Ø± ÙƒÙ„ Ø¹Ø¶Ùˆ ÙÙŠ Ù…ÙƒØ§Ù†Ù‡ Ù‚Ø¨Ù„ Ø§Ù„Ø§Ù†ØªÙ‚Ø§Ù„ Ù„Ù„Ø±ÙƒÙ† Ø§Ù„ØªØ§Ù„ÙŠ.',
                correctionIt: 'Devi assicurarti che ogni membro del corpo sia fermo e stabile prima di passare al movimento successivo. La stabilitÃ  deve durare almeno quanto un respiro calmo.',
                hadith: 'Il Profeta ï·º disse: "Il peggior ladro Ã¨ colui che ruba dalla sua preghiera... non completando i suoi inchini e prostrazioni."',
                hadithAr: 'Ù‚ÙˆÙ„ Ø§Ù„Ù†Ø¨ÙŠ ï·º: "Ø£Ø³ÙˆØ£ Ø§Ù„Ù†Ø§Ø³ Ø³Ø±Ù‚Ø© Ø§Ù„Ø°ÙŠ ÙŠØ³Ø±Ù‚ Ù…Ù† ØµÙ„Ø§ØªÙ‡... Ù„Ø§ ÙŠØªÙ… Ø±ÙƒÙˆØ¹Ù‡Ø§ ÙˆÙ„Ø§ Ø³Ø¬ÙˆØ¯Ù‡Ø§" (Ø£Ø­Ù…Ø¯)',
                hadithIt: 'Il Profeta ï·º disse: "Il peggior ladro tra gli uomini Ã¨ colui che ruba dalla sua preghiera." Dissero: "O Messaggero di Allah, come puÃ² rubare dalla sua preghiera?" Rispose: "Non completando i suoi inchini (Ruku) e le sue prostrazioni (Sujud)." (Musnad Ahmad).',
                impact: 'ARKAN'
            },
            {
                id: 102,
                severity: 'ARKAN (Fondamentale)',
                title: 'Omettere la Sura Al-Fatiha',
                titleAr: 'ØªØ±Ùƒ Ù‚Ø±Ø§Ø¡Ø© Ø§Ù„ÙØ§ØªØ­Ø©',
                titleIt: 'Omettere la Sura Al-Fatiha',
                description: 'Non recitare la Fatiha o recitarla solo mentalmente senza muovere la lingua.',
                descriptionAr: 'Ø¹Ø¯Ù… Ù‚Ø±Ø§Ø¡Ø© Ø§Ù„ÙØ§ØªØ­Ø© Ø£Ùˆ Ø§Ù„Ù„Ø­Ù† ÙÙŠÙ‡Ø§ Ù„Ø­Ù†Ø§Ù‹ ÙŠØºÙŠØ± Ø§Ù„Ù…Ø¹Ù†Ù‰.',
                descriptionIt: 'Dimenticare di recitare la Fatiha o non muovere le labbra e la lingua durante la recitazione.',
                correction: 'La recitazione della Fatiha Ã¨ obbligatoria in ogni Rak\'ah. Bisogna muovere le labbra perchÃ© sia considerata parola recitata.',
                correctionAr: 'Ù‚Ø±Ø§Ø¡Ø© Ø§Ù„ÙØ§ØªØ­Ø© Ø±ÙƒÙ† ÙÙŠ ÙƒÙ„ Ø±ÙƒØ¹Ø© Ù„Ù„Ø¥Ù…Ø§Ù… ÙˆØ§Ù„Ù…Ù†ÙØ±Ø¯. ÙˆÙŠØ¬Ø¨ ØªØ­Ø±ÙŠÙƒ Ø§Ù„Ù„Ø³Ø§Ù† ÙˆØ§Ù„Ø´ÙØªÙŠÙ†.',
                correctionIt: 'Recita la Fatiha con cura, assicurandoti di articolare ogni lettera. Ãˆ la chiave della preghiera.',
                hadith: 'Il Profeta ï·º disse: "Non c\'Ã¨ preghiera per chi non recita la Fatiha."',
                hadithAr: 'Ù‚ÙˆÙ„Ù‡ ï·º: "Ù„Ø§ ØµÙ„Ø§Ø© Ù„Ù…Ù† Ù„Ù… ÙŠÙ‚Ø±Ø£ Ø¨ÙØ§ØªØ­Ø© Ø§Ù„ÙƒØªØ§Ø¨" (Ø§Ù„Ø¨Ø®Ø§Ø±ÙŠ)',
                hadithIt: 'Il Profeta ï·º disse: "Non c\'Ã¨ preghiera (cioÃ¨ non Ã¨ valida) per chi non recita l\'Aprente del Libro (Al-Fatiha)." (Bukhari).',
                impact: 'ARKAN'
            },
            {
                id: 103,
                severity: 'ARKAN (Fondamentale)',
                title: 'Errore nel Sujud (I 7 Punti)',
                titleAr: 'Ø¹Ø¯Ù… Ø§Ù„Ø³Ø¬ÙˆØ¯ Ø¹Ù„Ù‰ Ø§Ù„Ø£Ø¹Ø¶Ø§Ø¡ Ø§Ù„Ø³Ø¨Ø¹Ø©',
                titleIt: 'Prostrazione incompleta (I 7 punti)',
                description: 'Sollevare i piedi o le mani da terra durante il Sujud, o non appoggiare il naso.',
                descriptionAr: 'Ø±ÙØ¹ Ø§Ù„Ù‚Ø¯Ù…ÙŠÙ† Ø£Ùˆ Ø§Ù„ÙŠØ¯ÙŠÙ† Ø¹Ù† Ø§Ù„Ø£Ø±Ø¶ Ø£Ø«Ù†Ø§Ø¡ Ø§Ù„Ø³Ø¬ÙˆØ¯ØŒ Ø£Ùˆ Ø¹Ø¯Ù… ØªÙ…ÙƒÙŠÙ† Ø§Ù„Ø¬Ø¨Ù‡Ø© ÙˆØ§Ù„Ø£Ù†Ù.',
                descriptionIt: 'Molti sollevano i piedi durante il Sujud. Se uno dei 7 punti non tocca terra per la durata del Sujud, il pilastro Ã¨ mancante.',
                correction: 'Devono toccare terra: Fronte/Naso, due Palmi, due Ginocchia, punte dei due Piedi.',
                correctionAr: 'Ø§Ù„Ø³Ø¬ÙˆØ¯ ÙŠØ¬Ø¨ Ø£Ù† ÙŠÙƒÙˆÙ† Ø¹Ù„Ù‰ Ø³Ø¨Ø¹Ø© Ø£Ø¹Ø¸Ù…: Ø§Ù„Ø¬Ø¨Ù‡Ø© ÙˆØ§Ù„Ø£Ù†ÙØŒ ÙˆØ§Ù„ÙƒÙÙŠÙ†ØŒ ÙˆØ§Ù„Ø±ÙƒØ¨ØªÙŠÙ†ØŒ ÙˆØ£Ø·Ø±Ø§Ù Ø§Ù„Ù‚Ø¯Ù…ÙŠÙ†.',
                correctionIt: 'Controlla che le dita dei piedi siano rivolte verso la Qibla e ben piantate a terra durante tutto il Sujud.',
                hadith: 'Il Profeta ï·º disse: "Mi Ã¨ stato ordinato di prostrarmi su sette ossa..."',
                hadithAr: 'Ù‚ÙˆÙ„Ù‡ ï·º: "Ø£Ù…Ø±Øª Ø£Ù† Ø£Ø³Ø¬Ø¯ Ø¹Ù„Ù‰ Ø³Ø¨Ø¹Ø© Ø£Ø¹Ø¸Ù…..." (Ø§Ù„Ø¨Ø®Ø§Ø±ÙŠ ÙˆÙ…Ø³Ù„Ù…)',
                hadithIt: 'Il Profeta ï·º disse: "Mi Ã¨ stato ordinato di prostrarmi su sette ossa: la fronte (e indicÃ² con la mano il naso), le due mani, le due ginocchia e le punte dei due piedi." (Bukhari & Muslim).',
                impact: 'ARKAN'
            },
            {
                id: 104,
                severity: 'ARKAN (Fondamentale)',
                title: 'Takbirat al-Ihram Errato',
                titleAr: 'Ø®Ø·Ø£ ÙÙŠ ØªÙƒØ¨ÙŠØ±Ø© Ø§Ù„Ø¥Ø­Ø±Ø§Ù…',
                titleIt: 'Errore nel Takbir Iniziale',
                description: 'Dire "Allah" senza completare "Akbar", o dirlo mentre ci si sta ancora inchinando per raggiungere l\'Imam.',
                descriptionAr: 'Ø§Ù„Ù†Ø·Ù‚ Ø¨ØªÙƒØ¨ÙŠØ±Ø© Ø§Ù„Ø¥Ø­Ø±Ø§Ù… Ø£Ø«Ù†Ø§Ø¡ Ø§Ù„Ø±ÙƒÙˆØ¹ Ø£Ùˆ Ø¹Ø¯Ù… Ø§Ù„Ø¥ØªÙŠØ§Ù† Ø¨Ù‡Ø§ Ù‚Ø§Ø¦Ù…Ø§Ù‹.',
                descriptionIt: 'Iniziare la preghiera mentre ci si muove giÃ  verso il Ruku senza aver prima stabilizzato la posizione eretta per il Takbir iniziale.',
                correction: 'Il Takbirat al-Ihram deve essere pronunciato stando completamente in piedi e immobili.',
                correctionAr: 'ØªÙƒØ¨ÙŠØ±Ø© Ø§Ù„Ø¥Ø­Ø±Ø§Ù… Ø±ÙƒÙ† ÙŠØ¬Ø¨ Ø§Ù„Ø¥ØªÙŠØ§Ù† Ø¨Ù‡Ø§ Ù…Ù† Ù‚ÙŠØ§Ù… ÙÙŠ Ø§Ù„ÙØ±ÙŠØ¶Ø©.',
                correctionIt: 'Fermati, stabilizzati, dichiara l\'intenzione nel cuore e pronuncia chiaramente "Allahu Akbar" stando dritto.',
                hadith: 'Il Profeta ï·º disse: "La chiave della preghiera Ã¨ la purificazione e la sua consacrazione Ã¨ il Takbir."',
                hadithAr: 'Ù‚ÙˆÙ„Ù‡ ï·º: "Ù…ÙØªØ§Ø­ Ø§Ù„ØµÙ„Ø§Ø© Ø§Ù„Ø·Ù‡ÙˆØ± ÙˆØªØ­Ø±ÙŠÙ…Ù‡Ø§ Ø§Ù„ØªÙƒØ¨ÙŠØ± ÙˆØªØ­Ù„ÙŠÙ„Ù‡Ø§ Ø§Ù„ØªØ³Ù„ÙŠÙ…" (Ø£Ø¨Ùˆ Ø¯Ø§ÙˆØ¯)',
                hadithIt: 'Il Profeta ï·º disse: "La chiave della preghiera Ã¨ la purificazione, la sua consacrazione (inizio) Ã¨ il Takbir e la sua conclusione Ã¨ il Taslim." (Abu Dawood).',
                impact: 'ARKAN'
            },
            {
                id: 105,
                severity: 'ARKAN (Fondamentale)',
                title: 'Praying without standing (Al-Qiyam)',
                titleAr: 'ØªØ±Ùƒ Ø§Ù„Ù‚ÙŠØ§Ù… ÙÙŠ Ø§Ù„ÙØ±ÙŠØ¶Ø©',
                titleIt: 'Pregare senza stare in piedi (Al-Qiyam)',
                description: 'Sitting or lying down during obligatory prayer when able to stand.',
                descriptionAr: 'Ø§Ù„ØµÙ„Ø§Ø© Ø¬Ø§Ù„Ø³Ø§Ù‹ Ù…Ø¹ Ø§Ù„Ù‚Ø¯Ø±Ø© Ø¹Ù„Ù‰ Ø§Ù„Ù‚ÙŠØ§Ù… ÙÙŠ Ø§Ù„ÙØ±ÙŠØ¶Ø©.',
                descriptionIt: 'Pregare seduti o sdraiati nelle preghiere obbligatorie quando si Ã¨ fisicamente in grado di stare in piedi.',
                correction: 'Standing is a pillar for those who can. Only the sick or unable may sit.',
                correctionAr: 'Ø§Ù„Ù‚ÙŠØ§Ù… Ø±ÙƒÙ† ÙÙŠ Ø§Ù„ÙØ±ÙŠØ¶Ø© Ø¹Ù„Ù‰ Ø§Ù„Ù‚Ø§Ø¯Ø±ØŒ ÙˆÙ…Ù† ØµÙ„Ù‰ Ø¬Ø§Ù„Ø³Ø§Ù‹ ÙˆÙ‡Ùˆ Ù‚Ø§Ø¯Ø± ÙØµÙ„ÙŠØªÙ‡ Ø¨Ø§Ø·Ù„Ø©.',
                correctionIt: 'Stare in piedi Ã¨ un pilastro nelle preghiere obbligatorie per chi ne Ã¨ capace. Se preghi seduto potendo stare in piedi, la preghiera non Ã¨ valida.',
                hadith: 'The Prophet ï·º said to a sick man: "Pray standing; if you cannot, then sitting..."',
                hadithAr: 'Ù‚ÙˆÙ„Ù‡ ï·º: "ØµÙ„ Ù‚Ø§Ø¦Ù…Ø§Ù‹ØŒ ÙØ¥Ù† Ù„Ù… ØªØ³ØªØ·Ø¹ ÙÙ‚Ø§Ø¹Ø¯Ø§Ù‹..." (Ø§Ù„Ø¨Ø®Ø§Ø±ÙŠ)',
                hadithIt: 'Il Profeta ï·º disse: "Prega in piedi; se non puoi, allora seduto; se non puoi, allora sul fianco." (Bukhari).',
                impact: 'ARKAN'
            },
            {
                id: 106,
                severity: 'ARKAN (Fondamentale)',
                title: 'Neglecting the Ruku (Bowing)',
                titleAr: 'ØªØ±Ùƒ Ø§Ù„Ø±ÙƒÙˆØ¹',
                titleIt: 'Omettere l\'Inchino (Ruku)',
                description: 'Moving directly from standing to prostration (Sujud) without bowing.',
                descriptionAr: 'Ø§Ù„Ø§Ù†ØªÙ‚Ø§Ù„ Ù…Ù† Ø§Ù„Ù‚ÙŠØ§Ù… Ø¥Ù„Ù‰ Ø§Ù„Ø³Ø¬ÙˆØ¯ Ù…Ø¨Ø§Ø´Ø±Ø© Ø¯ÙˆÙ† Ø±ÙƒÙˆØ¹.',
                descriptionIt: 'Passare direttamente dalla posizione eretta alla prostrazione senza eseguire l\'inchino.',
                correction: 'The Ruku is a pillar. You must bow until your hands reach your knees and your back is level.',
                correctionAr: 'Ø§Ù„Ø±ÙƒÙˆØ¹ Ø±ÙƒÙ†ØŒ ÙˆÙŠØ¬Ø¨ Ø§Ù„Ø§Ù†Ø­Ù†Ø§Ø¡ Ø­ØªÙ‰ ØªØµÙ„ Ø§Ù„ÙŠØ¯Ø§Ù† Ø¥Ù„Ù‰ Ø§Ù„Ø±ÙƒØ¨ØªÙŠÙ† Ù…Ø¹ Ø§Ø³ØªÙ‚Ø±Ø§Ø± Ø§Ù„Ø¸Ù‡Ø±.',
                correctionIt: 'L\'inchino Ã¨ un pilastro. Devi chinarti finchÃ© le mani non toccano le ginocchia e la schiena Ã¨ piatta.',
                hadith: 'The Prophet ï·º taught the man who prayed badly to bow until he was stable.',
                hadithAr: 'Ù‚ÙˆÙ„Ù‡ ï·º Ù„Ù„Ù…Ø³ÙŠØ¡ ØµÙ„Ø§ØªÙ‡: "Ø«Ù… Ø§Ø±ÙƒØ¹ Ø­ØªÙ‰ ØªØ·Ù…Ø¦Ù† Ø±Ø§ÙƒØ¹Ø§Ù‹" (Ø§Ù„Ø¨Ø®Ø§Ø±ÙŠ)',
                hadithIt: 'Il Profeta ï·º disse a chi pregava male: "Poi inchinati finchÃ© non sarai stabile nell\'inchino." (Bukhari).',
                impact: 'ARKAN'
            },
            {
                id: 107,
                severity: 'ARKAN (Fondamentale)',
                title: 'Neglecting I\'tidal (Rising from Ruku)',
                titleAr: 'ØªØ±Ùƒ Ø§Ù„Ø§Ø¹ØªØ¯Ø§Ù„ Ù…Ù† Ø§Ù„Ø±ÙƒÙˆØ¹',
                titleIt: 'Omettere l\'I\'tidal (Ritorno eretto)',
                description: 'Going to Sujud before fully standing up straight after bowing.',
                descriptionAr: 'Ø§Ù„Ù‡ÙˆÙŠ Ù„Ù„Ø³Ø¬ÙˆØ¯ Ù‚Ø¨Ù„ Ø§Ù„Ø§Ø¹ØªØ¯Ø§Ù„ ØªÙ…Ø§Ù…Ø§Ù‹ Ø¨Ø¹Ø¯ Ø§Ù„Ø±ÙƒÙˆØ¹.',
                descriptionIt: 'Andare in prostrazione prima di essersi raddrizzati completamente dopo l\'inchino.',
                correction: 'You must return to a full standing position where every vertebra returns to its place.',
                correctionAr: 'ÙŠØ¬Ø¨ Ø§Ù„Ø±ÙØ¹ Ù…Ù† Ø§Ù„Ø±ÙƒÙˆØ¹ ÙˆØ§Ù„Ø§Ø¹ØªØ¯Ø§Ù„ Ù‚Ø§Ø¦Ù…Ø§Ù‹ Ø­ØªÙ‰ ÙŠØ¹ÙˆØ¯ ÙƒÙ„ ÙÙ‚Ø§Ø± Ø¥Ù„Ù‰ Ù…ÙƒØ§Ù†Ù‡.',
                correctionIt: 'Devi tornare in posizione eretta completa finchÃ© ogni vertebra non torna al suo posto.',
                hadith: 'The Prophet ï·º would not prostrate until he had stood up straight.',
                hadithAr: 'ÙƒØ§Ù† ï·º Ø¥Ø°Ø§ Ø±ÙØ¹ Ø±Ø£Ø³Ù‡ Ù…Ù† Ø§Ù„Ø±ÙƒÙˆØ¹ Ù„Ù… ÙŠØ³Ø¬Ø¯ Ø­ØªÙ‰ ÙŠØ³ØªÙˆÙŠ Ù‚Ø§Ø¦Ù…Ø§Ù‹ (Ù…Ø³Ù„Ù…)',
                hadithIt: 'Il Profeta ï·º, quando sollevava la testa dall\'inchino, non si prostrava finchÃ© non era dritto in piedi. (Muslim).',
                impact: 'ARKAN'
            },
            {
                id: 108,
                severity: 'ARKAN (Fondamentale)',
                title: 'Omettere la Seduta tra i due Sujud',
                titleAr: 'ØªØ±Ùƒ Ø§Ù„Ø¬Ù„Ø³Ø© Ø¨ÙŠÙ† Ø§Ù„Ø³Ø¬Ø¯ØªÙŠÙ†',
                titleIt: 'Omettere la Seduta tra i due Sujud',
                description: 'Prostrating the second time immediately without sitting up from the first.',
                descriptionAr: 'Ø§Ù„Ø³Ø¬ÙˆØ¯ Ø§Ù„Ø³Ø¬Ø¯Ø© Ø§Ù„Ø«Ø§Ù†ÙŠØ© Ù…Ø¨Ø§Ø´Ø±Ø© Ø¯ÙˆÙ† Ø§Ù„Ø¬Ù„ÙˆØ³ Ù…Ù† Ø§Ù„Ø£ÙˆÙ„Ù‰.',
                descriptionIt: 'Eseguire la seconda prostrazione senza essersi prima seduti correttamente dopo la prima.',
                correction: 'Sitting between the two prostrations is a pillar. You must sit until stable.',
                correctionAr: 'Ø§Ù„Ø¬Ù„Ø³Ø© Ø¨ÙŠÙ† Ø§Ù„Ø³Ø¬Ø¯ØªÙŠÙ† Ø±ÙƒÙ†ØŒ ÙˆÙŠØ¬Ø¨ Ø§Ù„Ø³ÙƒÙˆÙ† ÙÙŠÙ‡Ø§ Ø­ØªÙ‰ ÙŠØ±Ø¬Ø¹ ÙƒÙ„ Ø¹Ø¸Ù… Ù„Ù…ÙƒØ§Ù†Ù‡.',
                correctionIt: 'Sedersi tra le due prostrazioni Ã¨ un pilastro. Devi sederti finchÃ© ogni osso non torna al suo posto.',
                hadith: 'The Prophet ï·º used to sit until every bone returned to its place.',
                hadithAr: 'ÙƒØ§Ù† ï·º ÙŠØ±ÙØ¹ Ø±Ø£Ø³Ù‡ Ù…Ù† Ø§Ù„Ø³Ø¬Ø¯Ø© ÙÙ„Ø§ ÙŠØ³Ø¬Ø¯ Ø­ØªÙ‰ ÙŠØ³ØªÙˆÙŠ Ø¬Ø§Ù„Ø³Ø§Ù‹ (Ø§Ù„Ø¨Ø®Ø§Ø±ÙŠ)',
                hadithIt: 'Il Profeta ï·º sollevava la testa dalla prostrazione e non si prostrava di nuovo finchÃ© non era seduto dritto. (Bukhari).',
                impact: 'ARKAN'
            },
            {
                id: 109,
                severity: 'ARKAN (Fondamentale)',
                title: 'Omettere il Tashahhud Finale',
                titleAr: 'ØªØ±Ùƒ Ø§Ù„ØªØ´Ù‡Ø¯ Ø§Ù„Ø£Ø®ÙŠØ±',
                titleIt: 'Omettere il Tashahhud Finale',
                description: 'Finishing the prayer with Taslim without reciting the final Tashahhud.',
                descriptionAr: 'Ø§Ù„ØªØ³Ù„ÙŠÙ… Ù…Ù† Ø§Ù„ØµÙ„Ø§Ø© Ø¯ÙˆÙ† Ø§Ù„Ø¥ØªÙŠØ§Ù† Ø¨Ø§Ù„ØªØ´Ù‡Ø¯ Ø§Ù„Ø£Ø®ÙŠØ±.',
                descriptionIt: 'Terminare la preghiera con il saluto finale senza aver recitato il Tashahhud obbligatorio.',
                correction: 'The final Tashahhud and the sitting for it are both pillars of the prayer.',
                correctionAr: 'Ø§Ù„ØªØ´Ù‡Ø¯ Ø§Ù„Ø£Ø®ÙŠØ± ÙˆØ§Ù„Ø¬Ù„ÙˆØ³ Ù„Ù‡ Ø±ÙƒÙ†Ø§Ù† Ù…Ù† Ø£Ø±ÙƒØ§Ù† Ø§Ù„ØµÙ„Ø§Ø©.',
                correctionIt: 'Il Tashahhud finale e la seduta per esso sono entrambi pilastri della preghiera.',
                hadith: 'Ibn Mas\'ud said: "Before the Tashahhud was made obligatory, we used to say..."',
                hadithAr: 'Ù‚ÙˆÙ„ Ø§Ø¨Ù† Ù…Ø³Ø¹ÙˆØ¯: "ÙƒÙ†Ø§ Ù†Ù‚ÙˆÙ„ Ù‚Ø¨Ù„ Ø£Ù† ÙŠÙØ±Ø¶ Ø¹Ù„ÙŠÙ†Ø§ Ø§Ù„ØªØ´Ù‡Ø¯..." (Ø§Ù„Ø¨Ø®Ø§Ø±ÙŠ)',
                hadithIt: 'Ibn Mas\'ud riferÃ¬: "Prima che il Tashahhud ci fosse imposto (come obbligo), eravamo soliti dire... (poi il Profeta ci insegnÃ² la forma corretta)." (Bukhari).',
                impact: 'ARKAN'
            },
            {
                id: 110,
                severity: 'ARKAN (Fondamentale)',
                title: 'Omettere il Saluto Finale (Taslim)',
                titleAr: 'ØªØ±Ùƒ Ø§Ù„ØªØ³Ù„ÙŠÙ…',
                titleIt: 'Omettere il Saluto Finale (Taslim)',
                description: 'Leaving the prayer without saying "Assalamu alaikum".',
                descriptionAr: 'Ø§Ù„Ø®Ø±ÙˆØ¬ Ù…Ù† Ø§Ù„ØµÙ„Ø§Ø© Ø¨Ø¯ÙˆÙ† Ù„ÙØ¸ Ø§Ù„ØªØ³Ù„ÙŠÙ….',
                descriptionIt: 'Uscire dalla preghiera senza pronunciare le parole del saluto finale.',
                correction: 'The first Taslim to the right is a pillar that exits you from the prayer.',
                correctionAr: 'Ø§Ù„ØªØ³Ù„ÙŠÙ…Ø© Ø§Ù„Ø£ÙˆÙ„Ù‰ Ø±ÙƒÙ†ØŒ ÙˆØ¨Ù‡Ø§ ÙŠØ®Ø±Ø¬ Ø§Ù„Ù…ØµÙ„ÙŠ Ù…Ù† ØµÙ„Ø§ØªÙ‡.',
                correctionIt: 'Il primo saluto (a destra) Ã¨ un pilastro che conclude formalmente la preghiera.',
                hadith: 'The Prophet ï·º said: "...and its conclusion is the Taslim."',
                hadithAr: 'Ù‚ÙˆÙ„Ù‡ ï·º: "...ÙˆØªØ­Ù„ÙŠÙ„Ù‡Ø§ Ø§Ù„ØªØ³Ù„ÙŠÙ…" (Ø£Ø¨Ùˆ Ø¯Ø§ÙˆØ¯ ÙˆØ§Ù„ØªØ±Ù…Ø°ÙŠ)',
                hadithIt: 'Il Profeta ï·º disse: "...e la sua conclusione (ciÃ² che la rende lecita) Ã¨ il saluto (Taslim)." (Abu Dawood).',
                impact: 'ARKAN'
            },
            {
                id: 111,
                severity: 'ARKAN (Fondamentale)',
                title: 'Mancanza di Ordine (At-Tartib)',
                titleAr: 'Ø¹Ø¯Ù… Ø§Ù„ØªØ±ØªÙŠØ¨ Ø¨ÙŠÙ† Ø§Ù„Ø£Ø±ÙƒØ§Ù†',
                titleIt: 'Mancanza di Ordine (Tartib)',
                description: 'Performing a pillar before its time, like prostrating before bowing.',
                descriptionAr: 'ØªÙ‚Ø¯ÙŠÙ… Ø±ÙƒÙ† Ø¹Ù„Ù‰ Ø±ÙƒÙ†ØŒ ÙƒØ§Ù„Ø³Ø¬ÙˆØ¯ Ù‚Ø¨Ù„ Ø§Ù„Ø±ÙƒÙˆØ¹ Ø¹Ù…Ø¯Ø§Ù‹.',
                descriptionIt: 'Eseguire un pilastro prima di un altro (es. prostrarsi prima di essersi inchinati).',
                correction: 'The prayer must be performed in the exact sequence taught by the Prophet ï·º.',
                correctionAr: 'ÙŠØ¬Ø¨ Ø§Ù„Ø¥ØªÙŠØ§Ù† Ø¨Ø§Ù„Ø£Ø±ÙƒØ§Ù† Ù…Ø±ØªØ¨Ø© ÙƒÙ…Ø§ ÙØ¹Ù„Ù‡Ø§ Ø§Ù„Ù†Ø¨ÙŠ ï·º ÙˆÙƒÙ…Ø§ Ø¹Ù„Ù…Ù‡Ø§ Ø£Ù…ØªÙ‡.',
                correctionIt: 'L\'ordine dei pilastri Ã¨ fondamentale. Se inverti l\'ordine intenzionalmente, la preghiera Ã¨ nulla.',
                hadith: 'The Prophet ï·º said: "Pray as you have seen me praying."',
                hadithAr: 'Ù‚ÙˆÙ„Ù‡ ï·º: "ØµÙ„ÙˆØ§ ÙƒÙ…Ø§ Ø±Ø£ÙŠØªÙ…ÙˆÙ†ÙŠ Ø£ØµÙ„ÙŠ" (Ø§Ù„Ø¨Ø®Ø§Ø±ÙŠ)',
                hadithIt: 'Il Profeta ï·º disse: "Pregate come mi avete visto pregare." (Bukhari).',
                impact: 'ARKAN'
            }
        ]
    },
    {
        category: 'Wajibat al-Salat (Gli Obblighi)',
        categoryAr: 'ÙˆØ§Ø¬Ø¨Ø§Øª Ø§Ù„ØµÙ„Ø§Ø©',
        categoryIt: 'Wajibat al-Salat (Gli 8 Obblighi)',
        description: 'Gli obblighi sono atti richiesti. Se omessi intenzionalmente, la preghiera Ã¨ nulla. Se omessi per dimenticanza, la preghiera rimane valida ma deve essere eseguito il Sujud al-Sahw (la prostrazione della dimenticanza) prima del saluto finale.',
        mistakes: [
            {
                id: 201,
                severity: 'WAJIB (Obbligatorio)',
                title: 'Omettere il Primo Tashahhud',
                titleAr: 'ØªØ±Ùƒ Ø§Ù„ØªØ´Ù‡Ø¯ Ø§Ù„Ø£ÙˆÙ„',
                titleIt: 'Dimenticare il Primo Tashahhud',
                description: 'Alzarsi direttamente per la terza Rak\'ah dimenticando di sedersi dopo la seconda.',
                descriptionAr: 'Ø§Ù„Ù‚ÙŠØ§Ù… Ù„Ù„Ø±ÙƒØ¹Ø© Ø§Ù„Ø«Ø§Ù„Ø«Ø© Ù†Ø³ÙŠØ§Ù† Ø§Ù„ØªØ´Ù‡Ø¯ Ø§Ù„Ø£ÙˆÙ„.',
                descriptionIt: 'Accade spesso nelle preghiere di 4 rak\'ah (Dhuhr, Asr, Isha).',
                correction: 'Se sei giÃ  in piedi, non tornare giÃ¹. Continua e fai Sujud al-Sahw prima del Salam.',
                correctionAr: 'Ù…Ù† Ù†Ø³ÙŠÙ‡ ÙÙ‚Ø§Ù… Ù„Ø²Ù…Ù‡ Ø§Ù„Ø³Ø¬ÙˆØ¯ Ù„Ù„Ø³Ù‡Ùˆ. ÙØ¥Ù† Ø°ÙƒØ±Ù‡ Ù‚Ø¨Ù„ Ø£Ù† ÙŠØ³ØªØªÙ… Ù‚Ø§Ø¦Ù…Ø§Ù‹ Ø±Ø¬Ø¹ ÙˆØ¬Ù„Ø³.',
                correctionIt: 'La Sunnah insegna che se ti alzi, completi la preghiera e compensi con le due prostrazioni alla fine.',
                hadith: 'Il Profeta ï·º una volta dimenticÃ² il Tashahhud e compensÃ² con il Sujud al-Sahw.',
                hadithAr: 'ÙØ¹Ù„ Ø§Ù„Ù†Ø¨ÙŠ ï·º Ø­ÙŠÙ† Ù†Ø³ÙŠ Ø§Ù„ØªØ´Ù‡Ø¯ Ø§Ù„Ø£ÙˆÙ„ ÙØ³Ø¬Ø¯ Ø³Ø¬Ø¯ØªÙŠÙ† Ù‚Ø¨Ù„ Ø£Ù† ÙŠØ³Ù„Ù… (Ø§Ù„Ø¨Ø®Ø§Ø±ÙŠ)',
                hadithIt: 'Abdullah ibn Buhaynah riferÃ¬ che il Profeta ï·º si alzÃ² dopo la seconda Rak\'ah senza sedersi; le persone si alzarono con lui. Alla fine della preghiera, fece il Sujud al-Sahw. (Bukhari).',
                impact: 'WAJIB'
            },
            {
                id: 202,
                severity: 'WAJIB (Obbligatorio)',
                title: 'Omettere il Tasbih nel Ruku/Sujud',
                titleAr: 'ØªØ±Ùƒ Ø§Ù„ØªØ³Ø¨ÙŠØ­ ÙÙŠ Ø§Ù„Ø±ÙƒÙˆØ¹ ÙˆØ§Ù„Ø³Ø¬ÙˆØ¯',
                titleIt: 'Omettere il Tasbih',
                description: 'Rimanere in silenzio durante l\'inchino o la prostrazione senza dire nulla.',
                descriptionAr: 'Ø¹Ø¯Ù… Ù‚ÙˆÙ„ "Ø³Ø¨Ø­Ø§Ù† Ø±Ø¨ÙŠ Ø§Ù„Ø¹Ø¸ÙŠÙ…" in Ø§Ù„Ø±ÙƒÙˆØ¹ o "Ø³Ø¨Ø­Ø§Ù† Ø±Ø¨ÙŠ Ø§Ù„Ø£Ø¹Ù„Ù‰" in Ø§Ù„Ø³Ø¬ÙˆØ¯.',
                descriptionIt: 'Molti pensano che il Dhikr interno sia opzionale, ma Ã¨ un obbligo.',
                correction: 'Ãˆ obbligatorio dire almeno una volta "Subhana Rabbiyal \'Adhim" nel Ruku e "Subhana Rabbiyal A\'la" nel Sujud.',
                correctionAr: 'ÙŠØ¬Ø¨ Ù‚ÙˆÙ„ "Ø³Ø¨Ø­Ø§Ù† Ø±Ø¨ÙŠ Ø§Ù„Ø¹Ø¸ÙŠÙ…" Ù…Ø±Ø© ÙÙŠ Ø§Ù„Ø±ÙƒÙˆØ¹ Ùˆ"Ø³Ø¨Ø­Ø§Ù† Ø±Ø¨ÙŠ Ø§Ù„Ø£Ø¹Ù„Ù‰" Ù…Ø±Ø© ÙÙŠ Ø§Ù„Ø³Ø¬ÙˆØ¯.',
                correctionIt: 'Pronuncia il Tasbih chiaramente. Il minimo Ã¨ una volta, la perfezione Ã¨ tre o piÃ¹ volte con meditazione.',
                hadith: 'Quando fu rivelato "Glorifica il nome del tuo Signore", il Profeta disse: "Dite questo nei vostri inchini."',
                hadithAr: 'Ù‚ÙˆÙ„Ù‡ ï·º Ù„Ù…Ø§ Ù†Ø²Ù„Øª (ÙØ³Ø¨Ø­ Ø¨Ø§Ø³Ù… Ø±Ø¨Ùƒ Ø§Ù„Ø¹Ø¸ÙŠÙ…): "Ø§Ø¬Ø¹Ù„ÙˆÙ‡Ø§ ÙÙŠ Ø±ÙƒÙˆØ¹ÙƒÙ…" (Ø£Ø¨Ùˆ Ø¯Ø§ÙˆØ¯)',
                hadithIt: 'Quando fu rivelato il versetto "Glorifica il Nome del tuo Signore Supremo", il Profeta ï·º disse: "Mettetelo nel vostro Ruku." (Abu Dawood).',
                impact: 'WAJIB'
            },
            {
                id: 203,
                severity: 'WAJIB (Obbligatorio)',
                title: 'Omettere i Takbirat di Transizione',
                titleAr: 'ØªØ±Ùƒ ØªÙƒØ¨ÙŠØ±Ø§Øª Ø§Ù„Ø§Ù†ØªÙ‚Ø§Ù„',
                titleIt: 'Omettere i Takbirat di Transizione',
                description: 'Moving between positions (e.g., from standing to Ruku) without saying "Allahu Akbar".',
                descriptionAr: 'Ø§Ù„Ø§Ù†ØªÙ‚Ø§Ù„ Ø¨ÙŠÙ† Ø§Ù„Ø£Ø±ÙƒØ§Ù† (Ù…Ø«Ù„Ø§Ù‹ Ù…Ù† Ø§Ù„Ù‚ÙŠØ§Ù… Ø¥Ù„Ù‰ Ø§Ù„Ø±ÙƒÙˆØ¹) Ø¯ÙˆÙ† Ù‚ÙˆÙ„ "Ø§Ù„Ù„Ù‡ Ø£ÙƒØ¨Ø±".',
                descriptionIt: 'Muoversi tra le posizioni (es. dalla posizione eretta all\'inchino) senza pronunciare "Allahu Akbar".',
                correction: 'All Takbirat (except the opening one) are Wajib. If forgotten, do Sujud al-Sahw.',
                correctionAr: 'ØªÙƒØ¨ÙŠØ±Ø§Øª Ø§Ù„Ø§Ù†ØªÙ‚Ø§Ù„ ÙˆØ§Ø¬Ø¨Ø©ØŒ ÙˆÙ…Ù† ØªØ±ÙƒÙ‡Ø§ Ù†Ø³ÙŠØ§Ù†Ø§Ù‹ Ø³Ø¬Ø¯ Ù„Ù„Ø³Ù‡Ùˆ.',
                correctionIt: 'Tutti i Takbir (tranne quello iniziale) sono obbligatori. Se dimenticati, esegui il Sujud al-Sahw.',
                hadith: 'The Prophet ï·º used to say Allahu Akbar whenever he lowered or raised himself.',
                hadithAr: 'ÙƒØ§Ù† ï·º ÙŠÙƒØ¨Ø± ÙÙŠ ÙƒÙ„ Ø®ÙØ¶ ÙˆØ±ÙØ¹ (Ø§Ù„Ø¨Ø®ari ÙˆÙ…Ø³Ù„Ù…)',
                hadithIt: 'Il Profeta ï·º pronunciava il Takbir ogni volta che si abbassava o si sollevava. (Bukhari & Muslim).',
                impact: 'WAJIB'
            },
            {
                id: 204,
                severity: 'WAJIB (Obbligatorio)',
                title: 'Omettere "Sami\'Allahu liman hamidah"',
                titleAr: 'ØªØ±Ùƒ Ù‚ÙˆÙ„ Ø³Ù…Ø¹ Ø§Ù„Ù„Ù‡ Ù„Ù…Ù† Ø­Ù…Ø¯Ù‡',
                titleIt: 'Omettere "Sami\'Allahu liman hamidah"',
                description: 'Rising from bowing (Ruku) without saying the prescribed phrase (for Imam and individual).',
                descriptionAr: 'Ø§Ù„Ø±ÙØ¹ Ù…Ù† Ø§Ù„Ø±ÙƒÙˆØ¹ Ø¯ÙˆÙ† Ù‚ÙˆÙ„ "Ø³Ù…Ø¹ Ø§Ù„Ù„Ù‡ Ù„Ù…Ù† Ø­Ù…Ø¯Ù‡" (Ù„Ù„Ø¥Ù…Ø§Ù… ÙˆØ§Ù„Ù…Ù†ÙØ±Ø¯).',
                descriptionIt: 'Sollevarsi dall\'inchino (Ruku) senza pronunciare la frase prescritta (per l\'Imam e chi prega solo).',
                correction: 'It is Wajib to say "Sami\'Allahu liman hamidah" when rising from Ruku.',
                correctionAr: 'Ù‚ÙˆÙ„ "Ø³Ù…Ø¹ Ø§Ù„Ù„Ù‡ Ù„Ù…Ù† Ø­Ù…Ø¯Ù‡" ÙˆØ§Ø¬Ø¨ Ø¹Ù†Ø¯ Ø§Ù„Ø±ÙØ¹ Ù…Ù† Ø§Ù„Ø±ÙƒÙˆØ¹.',
                correctionIt: 'Ãˆ obbligatorio dire "Sami\'Allahu liman hamidah" quando ci si solleva dal Ruku.',
                hadith: 'The Prophet ï·º said: "When he (the Imam) says Sami\'Allahu liman hamidah, say: Rabbana wa lakal hamd."',
                hadithAr: 'Ù‚ÙˆÙ„Ù‡ ï·º: "ÙˆØ¥Ø°Ø§ Ù‚Ø§Ù„: Ø³Ù…Ø¹ Ø§Ù„Ù„Ù‡ Ù„Ù…Ù† Ø­Ù…Ø¯Ù‡ØŒ ÙÙ‚ÙˆÙ„ÙˆØ§: Ø±Ø¨Ù†Ø§ ÙˆÙ„Ùƒ Ø§Ù„Ø­Ù…Ø¯" (Ø§Ù„Ø¨Ø®Ø§Ø±ÙŠ)',
                hadithIt: 'Il Profeta ï·º disse: "Quando l\'Imam dice Sami\'Allahu liman hamidah, dite: Rabbana wa lakal hamd." (Bukhari).',
                impact: 'WAJIB'
            },
            {
                id: 205,
                severity: 'WAJIB (Obbligatorio)',
                title: 'Omettere "Rabbana wa lakal hamd"',
                titleAr: 'ØªØ±Ùƒ Ù‚ÙˆÙ„ Ø±Ø¨Ù†Ø§ ÙˆÙ„Ùƒ Ø§Ù„Ø­Ù…Ø¯',
                titleIt: 'Omettere "Rabbana wa lakal hamd"',
                description: 'Standing up straight after Ruku without praising Allah.',
                descriptionAr: 'Ø§Ù„Ø§Ø¹ØªØ¯Ø§Ù„ Ù…Ù† Ø§Ù„Ø±ÙƒÙˆØ¹ Ø¯ÙˆÙ† Ù‚ÙˆÙ„ "Ø±Ø¨Ù†Ø§ ÙˆÙ„Ùƒ Ø§Ù„Ø­Ù…Ø¯".',
                descriptionIt: 'Stare in piedi dopo il Ruku senza lodare Allah con la frase prescritta.',
                correction: 'Every worshiper must say "Rabbana wa lakal hamd" after rising from Ruku.',
                correctionAr: 'ÙŠØ¬Ø¨ Ø¹Ù„Ù‰ ÙƒÙ„ Ù…ØµÙ„Ù Ù‚ÙˆÙ„ "Ø±Ø¨Ù†Ø§ ÙˆÙ„Ùƒ Ø§Ù„Ø­Ù…Ø¯" Ø¨Ø¹Ø¯ Ø§Ù„Ø§Ø¹ØªØ¯Ø§Ù„ Ù…Ù† Ø§Ù„Ø±ÙƒÙˆØ¹.',
                correctionIt: 'Ogni fedele deve dire "Rabbana wa lakal hamd" dopo essersi sollevato dal Ruku.',
                hadith: 'The Prophet ï·º and the Sahaba always recited this praise after rising.',
                hadithAr: 'ÙØ¹Ù„ Ø§Ù„Ù†Ø¨ÙŠ ï·º ÙˆØ£ØµØ­Ø§Ø¨Ù‡ (Ø§Ù„Ø¨Ø®Ø§Ø±ÙŠ ÙˆÙ…Ø³Ù„Ù…)',
                hadithIt: 'Ãˆ confermato dalla pratica del Profeta ï·º e dei suoi compagni. (Bukhari & Muslim).',
                impact: 'WAJIB'
            },
            {
                id: 206,
                severity: 'WAJIB (Obbligatorio)',
                title: 'Omettere "Rabbi-ghfirli" tra i Sujud',
                titleAr: 'ØªØ±Ùƒ Ø§Ù„Ø¯Ø¹Ø§Ø¡ Ø¨ÙŠÙ† Ø§Ù„Ø³Ø¬Ø¯ØªÙŠÙ†',
                titleIt: 'Omettere "Rabbi-ghfirli" tra i Sujud',
                description: 'Sitting between the two prostrations in silence without asking for forgiveness.',
                descriptionAr: 'Ø§Ù„Ø¬Ù„ÙˆØ³ Ø¨ÙŠÙ† Ø§Ù„Ø³Ø¬Ø¯ØªÙŠÙ† Ø¯ÙˆÙ† Ù‚ÙˆÙ„ "Ø±Ø¨ Ø§ØºÙØ± Ù„ÙŠ".',
                descriptionIt: 'Sedersi tra le due prostrazioni in silenzio senza chiedere perdono ad Allah.',
                correction: 'It is Wajib to say "Rabbi-ghfirli" (Lord, forgive me) at least once.',
                correctionAr: 'ÙŠØ¬Ø¨ Ù‚ÙˆÙ„ "Ø±Ø¨ Ø§ØºÙØ± Ù„ÙŠ" Ù…Ø±Ø© ÙˆØ§Ø­Ø¯Ø© Ø¹Ù„Ù‰ Ø§Ù„Ø£Ù‚Ù„ Ø¨ÙŠÙ† Ø§Ù„Ø³Ø¬Ø¯ØªÙŠÙ†.',
                correctionIt: 'Ãˆ obbligatorio dire "Rabbi-ghfirli" (Signore, perdonami) almeno una volta tra le prostrazioni.',
                hadith: 'The Prophet ï·º used to say between the two prostrations: "Rabbi-ghfirli, Rabbi-ghfirli."',
                hadithAr: 'ÙƒØ§Ù† ï·º ÙŠÙ‚ÙˆÙ„ Ø¨ÙŠÙ† Ø§Ù„Ø³Ø¬Ø¯ØªÙŠÙ†: "Ø±Ø¨ Ø§ØºÙØ± Ù„ÙŠØŒ Ø±Ø¨ Ø§ØºÙØ± Ù„ÙŠ" (Ø£Ø¨Ùˆ Ø¯Ø§ÙˆØ¯)',
                hadithIt: 'Il Profeta ï·º diceva tra le due prostrazioni: "Rabbi-ghfirli, Rabbi-ghfirli" (Signore perdonami). (Abu Dawood).',
                impact: 'WAJIB'
            }
        ]
    },
    {
        category: 'Fard al-Wudu (Pilastri del Wudu)',
        categoryAr: 'ÙØ±ÙˆØ¶ Ø§Ù„ÙˆØ¶ÙˆØ¡',
        categoryIt: 'Fard al-Wudu (I 6 Pilastri)',
        description: 'Il Wudu (abluzione) ha dei pilastri fondamentali senza i quali non Ã¨ valido. Se uno di questi viene omesso, la purificazione Ã¨ nulla e di conseguenza anche la preghiera.',
        mistakes: [
            {
                id: 401,
                severity: 'ARKAN (Fondamentale)',
                title: 'Mancanza di Intenzione (Niyyah)',
                titleAr: 'Ø¹Ø¯Ù… Ø§Ù„Ù†ÙŠØ© ÙÙŠ Ø§Ù„ÙˆØ¶ÙˆØ¡',
                titleIt: 'Mancanza di Intenzione (Niyyah)',
                description: 'Washing for cooling down or cleanliness without intending worship.',
                descriptionAr: 'Ø§Ù„ØºØ³Ù„ Ù„Ù„ØªØ¨Ø±Ø¯ Ø£Ùˆ Ø§Ù„ØªÙ†Ø¸Ù Ø¯ÙˆÙ† Ù†ÙŠØ© Ø§Ù„Ø¹Ø¨Ø§Ø¯Ø©.',
                descriptionIt: 'Lavarsi per rinfrescarsi o per pulizia senza l\'intenzione specifica di compiere l\'atto di adorazione.',
                correction: 'The intention is in the heart. You must intend to remove impurity for prayer.',
                correctionAr: 'Ø§Ù„Ù†ÙŠØ© Ù…Ø­Ù„Ù‡Ø§ Ø§Ù„Ù‚Ù„Ø¨ØŒ ÙˆÙŠØ¬Ø¨ Ø§Ø³ØªØ­Ø¶Ø§Ø± Ù†ÙŠØ© Ø±ÙØ¹ Ø§Ù„Ø­Ø¯Ø« Ù„Ù„Ø¹Ø¨Ø§Ø¯Ø©.',
                correctionIt: 'L\'intenzione Ã¨ nel cuore. Devi avere l\'intenzione di rimuovere lo stato di impuritÃ  per poter pregare.',
                hadith: 'The Prophet ï·º said: "Actions are but by intentions..."',
                hadithAr: 'Ù‚ÙˆÙ„Ù‡ ï·º: "Ø¥Ù†Ù…Ø§ Ø§Ù„Ø£Ø¹Ù…Ø§Ù„ Ø¨Ø§Ù„Ù†ÙŠØ§Øª..." (Ø§Ù„Ø¨Ø®Ø§Ø±ÙŠ ÙˆÙ…Ø³Ù„Ù…)',
                hadithIt: 'Il Profeta ï·º disse: "Le azioni non sono che secondo le intenzioni." (Bukhari & Muslim).',
                impact: 'ARKAN'
            },
            {
                id: 402,
                severity: 'ARKAN (Fondamentale)',
                title: 'Lavaggio parziale del viso',
                titleAr: 'Ø¹Ø¯Ù… ØºØ³Ù„ Ø§Ù„ÙˆØ¬Ù‡ ÙƒØ§Ù…Ù„Ø§Ù‹',
                titleIt: 'Lavaggio parziale del viso',
                description: 'Missing the area between the ear and the beard, or the forehead hair line.',
                descriptionAr: 'ØªØ±Ùƒ Ø£Ø¬Ø²Ø§Ø¡ Ù…Ù† Ø§Ù„ÙˆØ¬Ù‡ ÙƒÙ…Ù†Ø·Ù‚Ø© Ø¨ÙŠÙ† Ø§Ù„Ø£Ø°Ù† ÙˆØ§Ù„Ù„Ø­ÙŠØ© Ø£Ùˆ Ù…Ù†Ø§Ø¨Øª Ø§Ù„Ø´Ø¹Ø±.',
                descriptionIt: 'Non bagnare l\'area tra l\'orecchio e la barba, o la linea di inizio dei capelli sulla fronte.',
                correction: 'The face must be washed from hair line to chin, and ear to ear.',
                correctionAr: 'ÙŠØ¬Ø¨ ØºØ³Ù„ Ø§Ù„ÙˆØ¬Ù‡ Ù…Ù† Ù…Ù†Ø§Ø¨Øª Ø´Ø¹Ø± Ø§Ù„Ø±Ø£Ø³ Ø¥Ù„Ù‰ Ø£Ø³ÙÙ„ Ø§Ù„Ø°Ù‚Ù†ØŒ ÙˆÙ…Ù† Ø§Ù„Ø£Ø°Ù† Ø¥Ù„Ù‰ Ø§Ù„Ø£Ø°Ù†.',
                correctionIt: 'Il viso deve essere lavato dall\'inizio dei capelli al mento, e da orecchio a orecchio.',
                hadith: 'Allah says: "Wash your faces..." (Al-Ma\'idah: 6).',
                hadithAr: 'Ù‚ÙˆÙ„Ù‡ ØªØ¹Ø§Ù„Ù‰: "ÙØ§ØºØ³Ù„ÙˆØ§ ÙˆØ¬ÙˆÙ‡ÙƒÙ…" (Ø§Ù„Ù…Ø§Ø¦Ø¯Ø©: 6)',
                hadithIt: 'Allah dice: "Lavatevi i volti..." (Sura Al-Ma\'idah: 6).',
                impact: 'ARKAN'
            }
        ]
    },
    {
        category: 'Mubtilat al-Salat (Cosa Annulla)',
        categoryAr: 'Ù…Ø¨Ø·Ù„Ø§Øª Ø§Ù„ØµÙ„Ø§Ø©',
        categoryIt: 'Mubtilat (Azioni che annullano)',
        description: 'Queste azioni rendono la preghiera immediatamente non valida (Batil). Ãˆ obbligatorio interromperla e ricominciare da zero.',
        mistakes: [
            {
                id: 301,
                severity: 'MUBTIL (Annullamento)',
                title: 'Mangiare o Bere',
                titleAr: 'Ø§Ù„Ø£ÙƒÙ„ ÙˆØ§Ù„Ø´Ø±Ø¨ ÙÙŠ Ø§Ù„ØµÙ„Ø§Ø©',
                titleIt: 'Mangiare o Bere',
                description: 'Inghiottire residui di cibo rimasti in bocca intenzionalmente.',
                descriptionAr: 'ØªØ¹Ù…Ø¯ Ø§Ù„Ø£ÙƒÙ„ Ø£Ùˆ Ø§Ù„Ø´Ø±Ø¨ ÙˆÙ„Ùˆ ÙƒØ§Ù† ÙŠØ³ÙŠØ±Ø§Ù‹.',
                descriptionIt: 'Qualsiasi cosa che entri nello stomaco intenzionalmente durante la preghiera la annulla.',
                correction: 'Assicurati di sciacquare la bocca dopo mangiato prima di iniziare la Salat.',
                correctionAr: 'Ø§Ù„Ø£ÙƒÙ„ ÙˆØ§Ù„Ø´Ø±Ø¨ ÙŠØ¨Ø·Ù„Ø§Ù† Ø§Ù„ØµÙ„Ø§Ø© Ø¨Ø¥Ø¬Ù…Ø§Ø¹ Ø§Ù„Ø¹Ù„Ù…Ø§Ø¡.',
                correctionIt: 'La pulizia della bocca fa parte della preparazione. Se ingerisci qualcosa intenzionalmente, devi ricominciare.',
                hadith: 'C\'Ã¨ il consenso (Ijma) tra gli studiosi basato sull\'insegnamento profetico.',
                hadithAr: 'Ø£Ø¬Ù…Ø¹ Ø£Ù‡Ù„ Ø§Ù„Ø¹Ù„Ù… Ø¹Ù„Ù‰ Ø£Ù† Ù…Ù† Ø£ÙƒÙ„ Ø£Ùˆ Ø´Ø±Ø¨ ÙÙŠ ØµÙ„Ø§Ø© Ø§Ù„ÙØ±Ø¶ Ø¹Ø§Ù…Ø¯Ø§Ù‹ Ø£Ù† Ø¹Ù„ÙŠÙ‡ Ø§Ù„Ø¥Ø¹Ø§Ø¯Ø©.',
                hadithIt: 'Gli studiosi hanno concordato all\'unanimitÃ  che mangiare o bere intenzionalmente annulla la preghiera. (Ibn al-Mundhir).',
                impact: 'HIGH'
            },
            {
                id: 302,
                severity: 'MUBTIL (Annullamento)',
                title: 'Movimenti Eccessivi',
                titleAr: 'Ø§Ù„Ø­Ø±ÙƒØ© Ø§Ù„ÙƒØ«ÙŠØ±Ø© Ø§Ù„Ù…ØªÙˆØ§Ù„ÙŠØ©',
                titleIt: 'Movimenti Estranei Eccessivi',
                description: 'Fare tre o piÃ¹ movimenti grandi e consecutivi che non appartengono alla preghiera.',
                descriptionAr: 'Ø§Ù„Ø¹Ø¨Ø« Ø§Ù„ÙƒØ«ÙŠØ± Ø§Ù„Ù…ØªÙˆØ§Ù„ÙŠ Ù„ØºÙŠØ± Ø¶Ø±ÙˆØ±Ø©.',
                descriptionIt: 'Sistemarsi continuamente i vestiti, guardare l\'orologio o grattarsi senza una vera necessitÃ  impellente.',
                correction: 'Rimani immobile. I movimenti sono permessi solo se minimi o se necessari per la preghiera (es. chiudere un varco nella fila).',
                correctionAr: 'Ø§Ù„Ø­Ø±ÙƒØ© Ø§Ù„ÙƒØ«ÙŠØ±Ø© ×œØºÙŠØ± Ø¶Ø±ÙˆØ±Ø© ØªØ¨Ø·Ù„ Ø§Ù„ØµÙ„Ø§Ø© Ù„Ø£Ù†Ù‡Ø§ ØªÙ†Ø§ÙÙŠ Ø§Ù„Ø®Ø´ÙˆØ¹.',
                correctionIt: 'La calma Ã¨ l\'essenza del KhushÅ«\' (devozione). Immagina di stare davanti al Re dei Re.',
                hadith: 'Il Profeta ï·º vide un uomo che giocava con la sua barba e disse: "Se il suo cuore fosse devoto, le sue membra lo sarebbero."',
                hadithAr: 'Ù„Ùˆ Ø®Ø´Ø¹ Ù‚Ù„Ø¨ Ù‡Ø°Ø§ Ù„Ø®Ø´Ø¹Øª Ø¬ÙˆØ§Ø±Ø­Ù‡ (Ø£Ø«Ø±)',
                hadithIt: 'Sebbene sia un detto di un sapiente (Athaar), riflette perfettamente la Sunnah: "Se il cuore fosse in stato di sottomissione, anche il corpo rimarrebbe immobile." (Said ibn al-Musayyib).',
                impact: 'HIGH'
            }
        ]
    }
];

const CommonMistakesPage = () => {
    const { language, isRTL } = useLanguage();
    const [searchQuery, setSearchQuery] = useState('');
    const isArabic = language === 'ar';
    const isIt = language === 'it';

    const filteredMistakes = commonMistakes.map(cat => ({
        ...cat,
        mistakes: cat.mistakes.filter(m =>
            (isArabic ? m.titleAr : isIt && m.titleIt ? m.titleIt : m.title).toLowerCase().includes(searchQuery.toLowerCase()) ||
            (isArabic ? m.descriptionAr : isIt && m.descriptionIt ? m.descriptionIt : m.description).toLowerCase().includes(searchQuery.toLowerCase())
        )
    })).filter(cat => cat.mistakes.length > 0);

    return (
        <div className={`min-h-screen bg-slate-50 dark:bg-slate-950 ${isRTL ? 'rtl' : 'ltr'}`} dir={isRTL ? 'rtl' : 'ltr'}>
            <Header />
            <main className="container mx-auto px-4 py-8 pt-24 max-w-4xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12"
                >
                    <Badge variant="outline" className="mb-4 py-1 px-4 border-amber-500/50 text-amber-500 bg-amber-500/10">
                        <AlertTriangle className="w-4 h-4 mr-2" />
                        {isArabic ? 'ØªØµØ­ÙŠØ­ Ø§Ù„Ø¹Ø¨Ø§Ø¯Ø§Øª' : isIt ? 'Correzione Atti di Adorazione' : 'Correcting Acts of Worship'}
                    </Badge>
                    <h1 className="text-4xl sm:text-5xl font-bold mb-4 font-amiri tracking-tight text-slate-900 dark:text-white">
                        {isArabic ? 'Ø£Ø®Ø·Ø§Ø¡ Ø´Ø§Ø¦Ø¹Ø© ÙˆØªØµØ­ÙŠØ­Ù‡Ø§' : 'Guida al Predicatore: Errori e Arkan'}
                    </h1>
                    <p className="text-slate-700 dark:text-slate-300 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed">
                        {isArabic ? 'Ø¯Ù„ÙŠÙ„Ùƒ Ù„Ù„ØªØ¹Ù„Ù… Ù…Ù† Ø§Ù„Ø£Ø®Ø·Ø§Ø¡ Ø§Ù„Ø´Ø§Ø¦Ø¹Ø© ÙÙŠ Ø§Ù„Ø¹Ø¨Ø§Ø¯Ø§Øª Ø§Ù„ÙŠÙˆÙ…ÙŠØ© Ø¨Ù†Ø§Ø¡Ù‹ sulla Ø§Ù„Ø³Ù†Ø© Ø§Ù„Ù†Ø¨ÙˆÙŠØ© Ø§Ù„Ø´Ø±ÙŠÙØ©.' : 'Un percorso di formazione per correggere la pratica e avvicinarsi alla guida del Profeta ï·º attraverso lo studio di Arkan e Wajibat.'}
                    </p>

                    <div className="mt-8 max-w-md mx-auto relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <Input
                            placeholder={isArabic ? 'Ø§Ø¨Ø­Ø« Ø¹Ù† Ø®Ø·Ø£...' : isIt ? 'Cerca un errore o pilastro...' : 'Search for a mistake...'}
                            className="pl-10 h-12 glass border-amber-500/20"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </motion.div>

                <div className="space-y-12">
                    {filteredMistakes.map((category, idx) => (
                        <motion.section
                            key={category.category}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                        >
                            <div className="mb-6">
                                <h2 className="text-2xl font-bold flex items-center gap-2 border-b border-amber-500/20 pb-2">
                                    <BookOpen className="w-6 h-6 text-amber-500" />
                                    {isArabic ? category.categoryAr : isIt && category.categoryIt ? category.categoryIt : category.category}
                                </h2>
                                <p className="mt-2 text-sm text-muted-foreground italic bg-slate-100 dark:bg-slate-900 p-3 rounded-lg border-l-4 border-amber-500">
                                    {isArabic ? category.descriptionAr : isIt ? category.description : category.description}
                                </p>
                            </div>

                            <div className="grid gap-6">
                                {category.mistakes.map((mistake) => (
                                    <Card key={mistake.id} className="glass border-white/10 overflow-hidden group">
                                        <CardHeader className="bg-amber-500/5 border-b border-white/5">
                                            <div className="flex justify-between items-start gap-4">
                                                <CardTitle className="text-xl flex items-center gap-2 text-amber-600 dark:text-amber-400">
                                                    <XCircle className="w-5 h-5" />
                                                    {isArabic ? mistake.titleAr : isIt && mistake.titleIt ? mistake.titleIt : mistake.title}
                                                </CardTitle>
                                                <Badge variant="outline" className={`${mistake.impact === 'ARKAN' ? 'bg-red-500/20 text-red-500 border-red-500/30' : 'bg-amber-500/10 border-amber-500/20 text-amber-500'}`}>
                                                    {mistake.severity || `ID: #${mistake.id}`}
                                                </Badge>
                                            </div>
                                        </CardHeader>
                                        <CardContent className="pt-6 space-y-4">
                                            <div>
                                                <h4 className="flex items-center gap-2 font-semibold text-slate-800 dark:text-slate-200 mb-1">
                                                    <Info className="w-4 h-4 text-muted-foreground" />
                                                    {isArabic ? 'Ø§Ù„ÙˆØµÙ:' : isIt ? 'Analisi dell\'Errore:' : 'Description:'}
                                                </h4>
                                                <p className="text-muted-foreground">{isArabic ? mistake.descriptionAr : isIt && mistake.descriptionIt ? mistake.descriptionIt : mistake.description}</p>
                                            </div>

                                            <div className="p-4 sm:p-6 bg-emerald-500/10 border border-emerald-500/30 rounded-xl shadow-inner">
                                                <h4 className="flex items-center gap-2 font-bold text-emerald-700 dark:text-emerald-400 mb-2 text-lg">
                                                    <CheckCircle2 className="w-5 h-5" />
                                                    {isArabic ? 'Ø§Ù„ØªØµØ­ÙŠØ­:' : isIt ? 'La Guida Corretta (Sunnah):' : 'The Correction:'}
                                                </h4>
                                                <p className="text-slate-900 dark:text-slate-100 text-base sm:text-lg leading-relaxed font-medium">
                                                    {isArabic ? mistake.correctionAr : isIt && mistake.correctionIt ? mistake.correctionIt : mistake.correction}
                                                </p>
                                            </div>

                                            {mistake.hadith && (
                                                <div className="p-4 sm:p-6 bg-blue-500/10 border border-blue-500/30 rounded-xl italic relative overflow-hidden">
                                                    <div className="absolute top-0 right-0 p-2 opacity-10">
                                                        <MessageSquare className="w-12 h-12" />
                                                    </div>
                                                    <h4 className="flex items-center gap-2 font-bold text-blue-700 dark:text-blue-400 mb-2 not-italic text-lg">
                                                        <MessageSquare className="w-5 h-5" />
                                                        {isArabic ? 'Ø§Ù„Ø¯Ù„ÙŠÙ„:' : isIt ? 'Riferimento e Fonte:' : 'Evidence:'}
                                                    </h4>
                                                    <p className="text-slate-800 dark:text-slate-200 text-base sm:text-lg leading-relaxed relative z-10">
                                                        "{isArabic ? mistake.hadithAr : isIt && mistake.hadithIt ? mistake.hadithIt : mistake.hadith}"
                                                    </p>
                                                </div>
                                            )}
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </motion.section>
                    ))}
                </div>

                {filteredMistakes.length === 0 && (
                    <div className="text-center py-20">
                        <Lightbulb className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-20" />
                        <p className="text-muted-foreground text-lg">
                            {isArabic ? 'Ù„Ù… ÙŠØªÙ… Ø§Ù„Ø¹Ø«ÙˆØ± Ø¹Ù„Ù‰ Ø£Ø®Ø·Ø§Ø¡ ØªØ·Ø§Ø¨Ù‚ Ø¨Ø­Ø«Ùƒ.' : isIt ? 'Nessun errore trovato corrispondente alla ricerca.' : 'No mistakes found matching your search.'}
                        </p>
                    </div>
                )}
            </main>
            <Footer />
        </div>
    );
};

export default CommonMistakesPage;
