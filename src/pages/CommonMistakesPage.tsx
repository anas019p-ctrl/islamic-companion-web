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
        categoryAr: 'أركان الصلاة',
        categoryIt: 'Arkan al-Salat (I 14 Pilastri)',
        description: 'I pilastri sono le parti essenziali della preghiera. Se uno di questi viene omesso (intenzionalmente o per dimenticanza), la preghiera è nulla e non può essere riparata solo con il Sujud al-Sahw; deve essere ripetuta la parte mancante o l\'intera preghiera.',
        mistakes: [
            {
                id: 101,
                severity: 'ARKAN (Fondamentale)',
                title: 'Mancanza di Tranquillità (At-Tumanina)',
                titleAr: 'عدم الطمأنينة في الصلاة',
                titleIt: 'Mancanza di Tranquillità (Tumanina)',
                description: 'Muoversi troppo velocemente tra le posizioni (Ruku, Sujud, I\'tidal) senza fermarsi abbastanza a lungo da permettere alle ossa di tornare in posizione.',
                descriptionAr: 'العجلة في الصلاة وعدم السكون في الركوع والسجود والرفع منهما.',
                descriptionIt: 'Eseguire i movimenti della preghiera come un "corvo che becca il terreno", senza fermarsi stabilmente in ogni posizione.',
                correction: 'La Tumanina è un pilastro in ogni movimento. Devi fermarti in ogni posizione per almeno il tempo necessario a dire il Dhikr prescritto con calma.',
                correctionAr: 'الطمأنينة ركن، وهي السكون وإن قل في كل ركن فعلي. يجب أن يستقر كل عضو في مكانه قبل الانتقال للركن التالي.',
                correctionIt: 'Devi assicurarti che ogni membro del corpo sia fermo e stabile prima di passare al movimento successivo. La stabilità deve durare almeno quanto un respiro calmo.',
                hadith: 'Il Profeta ﷺ disse: "Il peggior ladro è colui che ruba dalla sua preghiera... non completando i suoi inchini e prostrazioni."',
                hadithAr: 'قول النبي ﷺ: "أسوأ الناس سرقة الذي يسرق من صلاته... لا يتم ركوعها ولا سجودها" (أحمد)',
                hadithIt: 'Il Profeta ﷺ disse: "Il peggior ladro tra gli uomini è colui che ruba dalla sua preghiera." Dissero: "O Messaggero di Allah, come può rubare dalla sua preghiera?" Rispose: "Non completando i suoi inchini (Ruku) e le sue prostrazioni (Sujud)." (Musnad Ahmad).',
                impact: 'ARKAN'
            },
            {
                id: 102,
                severity: 'ARKAN (Fondamentale)',
                title: 'Omettere la Sura Al-Fatiha',
                titleAr: 'ترك قراءة الفاتحة',
                titleIt: 'Omettere la Sura Al-Fatiha',
                description: 'Non recitare la Fatiha o recitarla solo mentalmente senza muovere la lingua.',
                descriptionAr: 'عدم قراءة الفاتحة أو اللحن فيها لحناً يغير المعنى.',
                descriptionIt: 'Dimenticare di recitare la Fatiha o non muovere le labbra e la lingua durante la recitazione.',
                correction: 'La recitazione della Fatiha è obbligatoria in ogni Rak\'ah. Bisogna muovere le labbra perché sia considerata parola recitata.',
                correctionAr: 'قراءة الفاتحة ركن في كل ركعة للإمام والمنفرد. ويجب تحريك اللسان والشفتين.',
                correctionIt: 'Recita la Fatiha con cura, assicurandoti di articolare ogni lettera. È la chiave della preghiera.',
                hadith: 'Il Profeta ﷺ disse: "Non c\'è preghiera per chi non recita la Fatiha."',
                hadithAr: 'قوله ﷺ: "لا صلاة لمن لم يقرأ بفاتحة الكتاب" (البخاري)',
                hadithIt: 'Il Profeta ﷺ disse: "Non c\'è preghiera (cioè non è valida) per chi non recita l\'Aprente del Libro (Al-Fatiha)." (Bukhari).',
                impact: 'ARKAN'
            },
            {
                id: 103,
                severity: 'ARKAN (Fondamentale)',
                title: 'Errore nel Sujud (I 7 Punti)',
                titleAr: 'عدم السجود على الأعضاء السبعة',
                titleIt: 'Prostrazione incompleta (I 7 punti)',
                description: 'Sollevare i piedi o le mani da terra durante il Sujud, o non appoggiare il naso.',
                descriptionAr: 'رفع القدمين أو اليدين عن الأرض أثناء السجود، أو عدم تمكين الجبهة والأنف.',
                descriptionIt: 'Molti sollevano i piedi durante il Sujud. Se uno dei 7 punti non tocca terra per la durata del Sujud, il pilastro è mancante.',
                correction: 'Devono toccare terra: Fronte/Naso, due Palmi, due Ginocchia, punte dei due Piedi.',
                correctionAr: 'السجود يجب أن يكون على سبعة أعظم: الجبهة والأنف، والكفين، والركبتين، وأطراف القدمين.',
                correctionIt: 'Controlla che le dita dei piedi siano rivolte verso la Qibla e ben piantate a terra durante tutto il Sujud.',
                hadith: 'Il Profeta ﷺ disse: "Mi è stato ordinato di prostrarmi su sette ossa..."',
                hadithAr: 'قوله ﷺ: "أمرت أن أسجد على سبعة أعظم..." (البخاري ومسلم)',
                hadithIt: 'Il Profeta ﷺ disse: "Mi è stato ordinato di prostrarmi su sette ossa: la fronte (e indicò con la mano il naso), le due mani, le due ginocchia e le punte dei due piedi." (Bukhari & Muslim).',
                impact: 'ARKAN'
            },
            {
                id: 104,
                severity: 'ARKAN (Fondamentale)',
                title: 'Takbirat al-Ihram Errato',
                titleAr: 'خطأ في تكبيرة الإحرام',
                titleIt: 'Errore nel Takbir Iniziale',
                description: 'Dire "Allah" senza completare "Akbar", o dirlo mentre ci si sta ancora inchinando per raggiungere l\'Imam.',
                descriptionAr: 'النطق بتكبيرة الإحرام أثناء الركوع أو عدم الإتيان بها قائماً.',
                descriptionIt: 'Iniziare la preghiera mentre ci si muove già verso il Ruku senza aver prima stabilizzato la posizione eretta per il Takbir iniziale.',
                correction: 'Il Takbirat al-Ihram deve essere pronunciato stando completamente in piedi e immobili.',
                correctionAr: 'تكبيرة الإحرام ركن يجب الإتيان بها من قيام في الفريضة.',
                correctionIt: 'Fermati, stabilizzati, dichiara l\'intenzione nel cuore e pronuncia chiaramente "Allahu Akbar" stando dritto.',
                hadith: 'Il Profeta ﷺ disse: "La chiave della preghiera è la purificazione e la sua consacrazione è il Takbir."',
                hadithAr: 'قوله ﷺ: "مفتاح الصلاة الطهور وتحريمها التكبير وتحليلها التسليم" (أبو داود)',
                hadithIt: 'Il Profeta ﷺ disse: "La chiave della preghiera è la purificazione, la sua consacrazione (inizio) è il Takbir e la sua conclusione è il Taslim." (Abu Dawood).',
                impact: 'ARKAN'
            },
            {
                id: 105,
                severity: 'ARKAN (Fondamentale)',
                title: 'Praying without standing (Al-Qiyam)',
                titleAr: 'ترك القيام في الفريضة',
                titleIt: 'Pregare senza stare in piedi (Al-Qiyam)',
                description: 'Sitting or lying down during obligatory prayer when able to stand.',
                descriptionAr: 'الصلاة جالساً مع القدرة على القيام في الفريضة.',
                descriptionIt: 'Pregare seduti o sdraiati nelle preghiere obbligatorie quando si è fisicamente in grado di stare in piedi.',
                correction: 'Standing is a pillar for those who can. Only the sick or unable may sit.',
                correctionAr: 'القيام ركن في الفريضة على القادر، ومن صلى جالساً وهو قادر فصليته باطلة.',
                correctionIt: 'Stare in piedi è un pilastro nelle preghiere obbligatorie per chi ne è capace. Se preghi seduto potendo stare in piedi, la preghiera non è valida.',
                hadith: 'The Prophet ﷺ said to a sick man: "Pray standing; if you cannot, then sitting..."',
                hadithAr: 'قوله ﷺ: "صل قائماً، فإن لم تستطع فقاعداً..." (البخاري)',
                hadithIt: 'Il Profeta ﷺ disse: "Prega in piedi; se non puoi, allora seduto; se non puoi, allora sul fianco." (Bukhari).',
                impact: 'ARKAN'
            },
            {
                id: 106,
                severity: 'ARKAN (Fondamentale)',
                title: 'Neglecting the Ruku (Bowing)',
                titleAr: 'ترك الركوع',
                titleIt: 'Omettere l\'Inchino (Ruku)',
                description: 'Moving directly from standing to prostration (Sujud) without bowing.',
                descriptionAr: 'الانتقال من القيام إلى السجود مباشرة دون ركوع.',
                descriptionIt: 'Passare direttamente dalla posizione eretta alla prostrazione senza eseguire l\'inchino.',
                correction: 'The Ruku is a pillar. You must bow until your hands reach your knees and your back is level.',
                correctionAr: 'الركوع ركن، ويجب الانحناء حتى تصل اليدان إلى الركبتين مع استقرار الظهر.',
                correctionIt: 'L\'inchino è un pilastro. Devi chinarti finché le mani non toccano le ginocchia e la schiena è piatta.',
                hadith: 'The Prophet ﷺ taught the man who prayed badly to bow until he was stable.',
                hadithAr: 'قوله ﷺ للمسيء صلاته: "ثم اركع حتى تطمئن راكعاً" (البخاري)',
                hadithIt: 'Il Profeta ﷺ disse a chi pregava male: "Poi inchinati finché non sarai stabile nell\'inchino." (Bukhari).',
                impact: 'ARKAN'
            },
            {
                id: 107,
                severity: 'ARKAN (Fondamentale)',
                title: 'Neglecting I\'tidal (Rising from Ruku)',
                titleAr: 'ترك الاعتدال من الركوع',
                titleIt: 'Omettere l\'I\'tidal (Ritorno eretto)',
                description: 'Going to Sujud before fully standing up straight after bowing.',
                descriptionAr: 'الهوي للسجود قبل الاعتدال تماماً بعد الركوع.',
                descriptionIt: 'Andare in prostrazione prima di essersi raddrizzati completamente dopo l\'inchino.',
                correction: 'You must return to a full standing position where every vertebra returns to its place.',
                correctionAr: 'يجب الرفع من الركوع والاعتدال قائماً حتى يعود كل فقار إلى مكانه.',
                correctionIt: 'Devi tornare in posizione eretta completa finché ogni vertebra non torna al suo posto.',
                hadith: 'The Prophet ﷺ would not prostrate until he had stood up straight.',
                hadithAr: 'كان ﷺ إذا رفع رأسه من الركوع لم يسجد حتى يستوي قائماً (مسلم)',
                hadithIt: 'Il Profeta ﷺ, quando sollevava la testa dall\'inchino, non si prostrava finché non era dritto in piedi. (Muslim).',
                impact: 'ARKAN'
            },
            {
                id: 108,
                severity: 'ARKAN (Fondamentale)',
                title: 'Omettere la Seduta tra i due Sujud',
                titleAr: 'ترك الجلسة بين السجدتين',
                titleIt: 'Omettere la Seduta tra i due Sujud',
                description: 'Prostrating the second time immediately without sitting up from the first.',
                descriptionAr: 'السجود السجدة الثانية مباشرة دون الجلوس من الأولى.',
                descriptionIt: 'Eseguire la seconda prostrazione senza essersi prima seduti correttamente dopo la prima.',
                correction: 'Sitting between the two prostrations is a pillar. You must sit until stable.',
                correctionAr: 'الجلسة بين السجدتين ركن، ويجب السكون فيها حتى يرجع كل عظم لمكانه.',
                correctionIt: 'Sedersi tra le due prostrazioni è un pilastro. Devi sederti finché ogni osso non torna al suo posto.',
                hadith: 'The Prophet ﷺ used to sit until every bone returned to its place.',
                hadithAr: 'كان ﷺ يرفع رأسه من السجدة فلا يسجد حتى يستوي جالساً (البخاري)',
                hadithIt: 'Il Profeta ﷺ sollevava la testa dalla prostrazione e non si prostrava di nuovo finché non era seduto dritto. (Bukhari).',
                impact: 'ARKAN'
            },
            {
                id: 109,
                severity: 'ARKAN (Fondamentale)',
                title: 'Omettere il Tashahhud Finale',
                titleAr: 'ترك التشهد الأخير',
                titleIt: 'Omettere il Tashahhud Finale',
                description: 'Finishing the prayer with Taslim without reciting the final Tashahhud.',
                descriptionAr: 'التسليم من الصلاة دون الإتيان بالتشهد الأخير.',
                descriptionIt: 'Terminare la preghiera con il saluto finale senza aver recitato il Tashahhud obbligatorio.',
                correction: 'The final Tashahhud and the sitting for it are both pillars of the prayer.',
                correctionAr: 'التشهد الأخير والجلوس له ركنان من أركان الصلاة.',
                correctionIt: 'Il Tashahhud finale e la seduta per esso sono entrambi pilastri della preghiera.',
                hadith: 'Ibn Mas\'ud said: "Before the Tashahhud was made obligatory, we used to say..."',
                hadithAr: 'قول ابن مسعود: "كنا نقول قبل أن يفرض علينا التشهد..." (البخاري)',
                hadithIt: 'Ibn Mas\'ud riferì: "Prima che il Tashahhud ci fosse imposto (come obbligo), eravamo soliti dire... (poi il Profeta ci insegnò la forma corretta)." (Bukhari).',
                impact: 'ARKAN'
            },
            {
                id: 110,
                severity: 'ARKAN (Fondamentale)',
                title: 'Omettere il Saluto Finale (Taslim)',
                titleAr: 'ترك التسليم',
                titleIt: 'Omettere il Saluto Finale (Taslim)',
                description: 'Leaving the prayer without saying "Assalamu alaikum".',
                descriptionAr: 'الخروج من الصلاة بدون لفظ التسليم.',
                descriptionIt: 'Uscire dalla preghiera senza pronunciare le parole del saluto finale.',
                correction: 'The first Taslim to the right is a pillar that exits you from the prayer.',
                correctionAr: 'التسليمة الأولى ركن، وبها يخرج المصلي من صلاته.',
                correctionIt: 'Il primo saluto (a destra) è un pilastro che conclude formalmente la preghiera.',
                hadith: 'The Prophet ﷺ said: "...and its conclusion is the Taslim."',
                hadithAr: 'قوله ﷺ: "...وتحليلها التسليم" (أبو داود والترمذي)',
                hadithIt: 'Il Profeta ﷺ disse: "...e la sua conclusione (ciò che la rende lecita) è il saluto (Taslim)." (Abu Dawood).',
                impact: 'ARKAN'
            },
            {
                id: 111,
                severity: 'ARKAN (Fondamentale)',
                title: 'Mancanza di Ordine (At-Tartib)',
                titleAr: 'عدم الترتيب بين الأركان',
                titleIt: 'Mancanza di Ordine (Tartib)',
                description: 'Performing a pillar before its time, like prostrating before bowing.',
                descriptionAr: 'تقديم ركن على ركن، كالسجود قبل الركوع عمداً.',
                descriptionIt: 'Eseguire un pilastro prima di un altro (es. prostrarsi prima di essersi inchinati).',
                correction: 'The prayer must be performed in the exact sequence taught by the Prophet ﷺ.',
                correctionAr: 'يجب الإتيان بالأركان مرتبة كما فعلها النبي ﷺ وكما علمها أمته.',
                correctionIt: 'L\'ordine dei pilastri è fondamentale. Se inverti l\'ordine intenzionalmente, la preghiera è nulla.',
                hadith: 'The Prophet ﷺ said: "Pray as you have seen me praying."',
                hadithAr: 'قوله ﷺ: "صلوا كما رأيتموني أصلي" (البخاري)',
                hadithIt: 'Il Profeta ﷺ disse: "Pregate come mi avete visto pregare." (Bukhari).',
                impact: 'ARKAN'
            }
        ]
    },
    {
        category: 'Wajibat al-Salat (Gli Obblighi)',
        categoryAr: 'واجبات الصلاة',
        categoryIt: 'Wajibat al-Salat (Gli 8 Obblighi)',
        description: 'Gli obblighi sono atti richiesti. Se omessi intenzionalmente, la preghiera è nulla. Se omessi per dimenticanza, la preghiera rimane valida ma deve essere eseguito il Sujud al-Sahw (la prostrazione della dimenticanza) prima del saluto finale.',
        mistakes: [
            {
                id: 201,
                severity: 'WAJIB (Obbligatorio)',
                title: 'Omettere il Primo Tashahhud',
                titleAr: 'ترك التشهد الأول',
                titleIt: 'Dimenticare il Primo Tashahhud',
                description: 'Alzarsi direttamente per la terza Rak\'ah dimenticando di sedersi dopo la seconda.',
                descriptionAr: 'القيام للركعة الثالثة نسيان التشهد الأول.',
                descriptionIt: 'Accade spesso nelle preghiere di 4 rak\'ah (Dhuhr, Asr, Isha).',
                correction: 'Se sei già in piedi, non tornare giù. Continua e fai Sujud al-Sahw prima del Salam.',
                correctionAr: 'من نسيه فقام لزمه السجود للسهو. فإن ذكره قبل أن يستتم قائماً رجع وجلس.',
                correctionIt: 'La Sunnah insegna che se ti alzi, completi la preghiera e compensi con le due prostrazioni alla fine.',
                hadith: 'Il Profeta ﷺ una volta dimenticò il Tashahhud e compensò con il Sujud al-Sahw.',
                hadithAr: 'فعل النبي ﷺ حين نسي التشهد الأول فسجد سجدتين قبل أن يسلم (البخاري)',
                hadithIt: 'Abdullah ibn Buhaynah riferì che il Profeta ﷺ si alzò dopo la seconda Rak\'ah senza sedersi; le persone si alzarono con lui. Alla fine della preghiera, fece il Sujud al-Sahw. (Bukhari).',
                impact: 'WAJIB'
            },
            {
                id: 202,
                severity: 'WAJIB (Obbligatorio)',
                title: 'Omettere il Tasbih nel Ruku/Sujud',
                titleAr: 'ترك التسبيح في الركوع والسجود',
                titleIt: 'Omettere il Tasbih',
                description: 'Rimanere in silenzio durante l\'inchino o la prostrazione senza dire nulla.',
                descriptionAr: 'عدم قول "سبحان ربي العظيم" in الركوع o "سبحان ربي الأعلى" in السجود.',
                descriptionIt: 'Molti pensano che il Dhikr interno sia opzionale, ma è un obbligo.',
                correction: 'È obbligatorio dire almeno una volta "Subhana Rabbiyal \'Adhim" nel Ruku e "Subhana Rabbiyal A\'la" nel Sujud.',
                correctionAr: 'يجب قول "سبحان ربي العظيم" مرة في الركوع و"سبحان ربي الأعلى" مرة في السجود.',
                correctionIt: 'Pronuncia il Tasbih chiaramente. Il minimo è una volta, la perfezione è tre o più volte con meditazione.',
                hadith: 'Quando fu rivelato "Glorifica il nome del tuo Signore", il Profeta disse: "Dite questo nei vostri inchini."',
                hadithAr: 'قوله ﷺ لما نزلت (فسبح باسم ربك العظيم): "اجعلوها في ركوعكم" (أبو داود)',
                hadithIt: 'Quando fu rivelato il versetto "Glorifica il Nome del tuo Signore Supremo", il Profeta ﷺ disse: "Mettetelo nel vostro Ruku." (Abu Dawood).',
                impact: 'WAJIB'
            },
            {
                id: 203,
                severity: 'WAJIB (Obbligatorio)',
                title: 'Omettere i Takbirat di Transizione',
                titleAr: 'ترك تكبيرات الانتقال',
                titleIt: 'Omettere i Takbirat di Transizione',
                description: 'Moving between positions (e.g., from standing to Ruku) without saying "Allahu Akbar".',
                descriptionAr: 'الانتقال بين الأركان (مثلاً من القيام إلى الركوع) دون قول "الله أكبر".',
                descriptionIt: 'Muoversi tra le posizioni (es. dalla posizione eretta all\'inchino) senza pronunciare "Allahu Akbar".',
                correction: 'All Takbirat (except the opening one) are Wajib. If forgotten, do Sujud al-Sahw.',
                correctionAr: 'تكبيرات الانتقال واجبة، ومن تركها نسياناً سجد للسهو.',
                correctionIt: 'Tutti i Takbir (tranne quello iniziale) sono obbligatori. Se dimenticati, esegui il Sujud al-Sahw.',
                hadith: 'The Prophet ﷺ used to say Allahu Akbar whenever he lowered or raised himself.',
                hadithAr: 'كان ﷺ يكبر في كل خفض ورفع (البخari ومسلم)',
                hadithIt: 'Il Profeta ﷺ pronunciava il Takbir ogni volta che si abbassava o si sollevava. (Bukhari & Muslim).',
                impact: 'WAJIB'
            },
            {
                id: 204,
                severity: 'WAJIB (Obbligatorio)',
                title: 'Omettere "Sami\'Allahu liman hamidah"',
                titleAr: 'ترك قول سمع الله لمن حمده',
                titleIt: 'Omettere "Sami\'Allahu liman hamidah"',
                description: 'Rising from bowing (Ruku) without saying the prescribed phrase (for Imam and individual).',
                descriptionAr: 'الرفع من الركوع دون قول "سمع الله لمن حمده" (للإمام والمنفرد).',
                descriptionIt: 'Sollevarsi dall\'inchino (Ruku) senza pronunciare la frase prescritta (per l\'Imam e chi prega solo).',
                correction: 'It is Wajib to say "Sami\'Allahu liman hamidah" when rising from Ruku.',
                correctionAr: 'قول "سمع الله لمن حمده" واجب عند الرفع من الركوع.',
                correctionIt: 'È obbligatorio dire "Sami\'Allahu liman hamidah" quando ci si solleva dal Ruku.',
                hadith: 'The Prophet ﷺ said: "When he (the Imam) says Sami\'Allahu liman hamidah, say: Rabbana wa lakal hamd."',
                hadithAr: 'قوله ﷺ: "وإذا قال: سمع الله لمن حمده، فقولوا: ربنا ولك الحمد" (البخاري)',
                hadithIt: 'Il Profeta ﷺ disse: "Quando l\'Imam dice Sami\'Allahu liman hamidah, dite: Rabbana wa lakal hamd." (Bukhari).',
                impact: 'WAJIB'
            },
            {
                id: 205,
                severity: 'WAJIB (Obbligatorio)',
                title: 'Omettere "Rabbana wa lakal hamd"',
                titleAr: 'ترك قول ربنا ولك الحمد',
                titleIt: 'Omettere "Rabbana wa lakal hamd"',
                description: 'Standing up straight after Ruku without praising Allah.',
                descriptionAr: 'الاعتدال من الركوع دون قول "ربنا ولك الحمد".',
                descriptionIt: 'Stare in piedi dopo il Ruku senza lodare Allah con la frase prescritta.',
                correction: 'Every worshiper must say "Rabbana wa lakal hamd" after rising from Ruku.',
                correctionAr: 'يجب على كل مصلٍ قول "ربنا ولك الحمد" بعد الاعتدال من الركوع.',
                correctionIt: 'Ogni fedele deve dire "Rabbana wa lakal hamd" dopo essersi sollevato dal Ruku.',
                hadith: 'The Prophet ﷺ and the Sahaba always recited this praise after rising.',
                hadithAr: 'فعل النبي ﷺ وأصحابه (البخاري ومسلم)',
                hadithIt: 'È confermato dalla pratica del Profeta ﷺ e dei suoi compagni. (Bukhari & Muslim).',
                impact: 'WAJIB'
            },
            {
                id: 206,
                severity: 'WAJIB (Obbligatorio)',
                title: 'Omettere "Rabbi-ghfirli" tra i Sujud',
                titleAr: 'ترك الدعاء بين السجدتين',
                titleIt: 'Omettere "Rabbi-ghfirli" tra i Sujud',
                description: 'Sitting between the two prostrations in silence without asking for forgiveness.',
                descriptionAr: 'الجلوس بين السجدتين دون قول "رب اغفر لي".',
                descriptionIt: 'Sedersi tra le due prostrazioni in silenzio senza chiedere perdono ad Allah.',
                correction: 'It is Wajib to say "Rabbi-ghfirli" (Lord, forgive me) at least once.',
                correctionAr: 'يجب قول "رب اغفر لي" مرة واحدة على الأقل بين السجدتين.',
                correctionIt: 'È obbligatorio dire "Rabbi-ghfirli" (Signore, perdonami) almeno una volta tra le prostrazioni.',
                hadith: 'The Prophet ﷺ used to say between the two prostrations: "Rabbi-ghfirli, Rabbi-ghfirli."',
                hadithAr: 'كان ﷺ يقول بين السجدتين: "رب اغفر لي، رب اغفر لي" (أبو داود)',
                hadithIt: 'Il Profeta ﷺ diceva tra le due prostrazioni: "Rabbi-ghfirli, Rabbi-ghfirli" (Signore perdonami). (Abu Dawood).',
                impact: 'WAJIB'
            }
        ]
    },
    {
        category: 'Fard al-Wudu (Pilastri del Wudu)',
        categoryAr: 'فروض الوضوء',
        categoryIt: 'Fard al-Wudu (I 6 Pilastri)',
        description: 'Il Wudu (abluzione) ha dei pilastri fondamentali senza i quali non è valido. Se uno di questi viene omesso, la purificazione è nulla e di conseguenza anche la preghiera.',
        mistakes: [
            {
                id: 401,
                severity: 'ARKAN (Fondamentale)',
                title: 'Mancanza di Intenzione (Niyyah)',
                titleAr: 'عدم النية في الوضوء',
                titleIt: 'Mancanza di Intenzione (Niyyah)',
                description: 'Washing for cooling down or cleanliness without intending worship.',
                descriptionAr: 'الغسل للتبرد أو التنظف دون نية العبادة.',
                descriptionIt: 'Lavarsi per rinfrescarsi o per pulizia senza l\'intenzione specifica di compiere l\'atto di adorazione.',
                correction: 'The intention is in the heart. You must intend to remove impurity for prayer.',
                correctionAr: 'النية محلها القلب، ويجب استحضار نية رفع الحدث للعبادة.',
                correctionIt: 'L\'intenzione è nel cuore. Devi avere l\'intenzione di rimuovere lo stato di impurità per poter pregare.',
                hadith: 'The Prophet ﷺ said: "Actions are but by intentions..."',
                hadithAr: 'قوله ﷺ: "إنما الأعمال بالنيات..." (البخاري ومسلم)',
                hadithIt: 'Il Profeta ﷺ disse: "Le azioni non sono che secondo le intenzioni." (Bukhari & Muslim).',
                impact: 'ARKAN'
            },
            {
                id: 402,
                severity: 'ARKAN (Fondamentale)',
                title: 'Lavaggio parziale del viso',
                titleAr: 'عدم غسل الوجه كاملاً',
                titleIt: 'Lavaggio parziale del viso',
                description: 'Missing the area between the ear and the beard, or the forehead hair line.',
                descriptionAr: 'ترك أجزاء من الوجه كمنطقة بين الأذن واللحية أو منابت الشعر.',
                descriptionIt: 'Non bagnare l\'area tra l\'orecchio e la barba, o la linea di inizio dei capelli sulla fronte.',
                correction: 'The face must be washed from hair line to chin, and ear to ear.',
                correctionAr: 'يجب غسل الوجه من منابت شعر الرأس إلى أسفل الذقن، ومن الأذن إلى الأذن.',
                correctionIt: 'Il viso deve essere lavato dall\'inizio dei capelli al mento, e da orecchio a orecchio.',
                hadith: 'Allah says: "Wash your faces..." (Al-Ma\'idah: 6).',
                hadithAr: 'قوله تعالى: "فاغسلوا وجوهكم" (المائدة: 6)',
                hadithIt: 'Allah dice: "Lavatevi i volti..." (Sura Al-Ma\'idah: 6).',
                impact: 'ARKAN'
            }
        ]
    },
    {
        category: 'Mubtilat al-Salat (Cosa Annulla)',
        categoryAr: 'مبطلات الصلاة',
        categoryIt: 'Mubtilat (Azioni che annullano)',
        description: 'Queste azioni rendono la preghiera immediatamente non valida (Batil). È obbligatorio interromperla e ricominciare da zero.',
        mistakes: [
            {
                id: 301,
                severity: 'MUBTIL (Annullamento)',
                title: 'Mangiare o Bere',
                titleAr: 'الأكل والشرب في الصلاة',
                titleIt: 'Mangiare o Bere',
                description: 'Inghiottire residui di cibo rimasti in bocca intenzionalmente.',
                descriptionAr: 'تعمد الأكل أو الشرب ولو كان يسيراً.',
                descriptionIt: 'Qualsiasi cosa che entri nello stomaco intenzionalmente durante la preghiera la annulla.',
                correction: 'Assicurati di sciacquare la bocca dopo mangiato prima di iniziare la Salat.',
                correctionAr: 'الأكل والشرب يبطلان الصلاة بإجماع العلماء.',
                correctionIt: 'La pulizia della bocca fa parte della preparazione. Se ingerisci qualcosa intenzionalmente, devi ricominciare.',
                hadith: 'C\'è il consenso (Ijma) tra gli studiosi basato sull\'insegnamento profetico.',
                hadithAr: 'أجمع أهل العلم على أن من أكل أو شرب في صلاة الفرض عامداً أن عليه الإعادة.',
                hadithIt: 'Gli studiosi hanno concordato all\'unanimità che mangiare o bere intenzionalmente annulla la preghiera. (Ibn al-Mundhir).',
                impact: 'HIGH'
            },
            {
                id: 302,
                severity: 'MUBTIL (Annullamento)',
                title: 'Movimenti Eccessivi',
                titleAr: 'الحركة الكثيرة المتوالية',
                titleIt: 'Movimenti Estranei Eccessivi',
                description: 'Fare tre o più movimenti grandi e consecutivi che non appartengono alla preghiera.',
                descriptionAr: 'العبث الكثير المتوالي لغير ضرورة.',
                descriptionIt: 'Sistemarsi continuamente i vestiti, guardare l\'orologio o grattarsi senza una vera necessità impellente.',
                correction: 'Rimani immobile. I movimenti sono permessi solo se minimi o se necessari per la preghiera (es. chiudere un varco nella fila).',
                correctionAr: 'الحركة الكثيرة לغير ضرورة تبطل الصلاة لأنها تنافي الخشوع.',
                correctionIt: 'La calma è l\'essenza del Khushū\' (devozione). Immagina di stare davanti al Re dei Re.',
                hadith: 'Il Profeta ﷺ vide un uomo che giocava con la sua barba e disse: "Se il suo cuore fosse devoto, le sue membra lo sarebbero."',
                hadithAr: 'لو خشع قلب هذا لخشعت جوارحه (أثر)',
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
                        {isArabic ? 'تصحيح العبادات' : isIt ? 'Correzione Atti di Adorazione' : 'Correcting Acts of Worship'}
                    </Badge>
                    <h1 className="text-4xl sm:text-5xl font-bold mb-4 font-amiri tracking-tight text-slate-900 dark:text-white">
                        {isArabic ? 'أخطاء شائعة وتصحيحها' : 'Guida al Predicatore: Errori e Arkan'}
                    </h1>
                    <p className="text-slate-700 dark:text-slate-300 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed">
                        {isArabic ? 'دليلك للتعلم من الأخطاء الشائعة في العبادات اليومية بناءً sulla السنة النبوية الشريفة.' : 'Un percorso di formazione per correggere la pratica e avvicinarsi alla guida del Profeta ﷺ attraverso lo studio di Arkan e Wajibat.'}
                    </p>

                    <div className="mt-8 max-w-md mx-auto relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <Input
                            placeholder={isArabic ? 'ابحث عن خطأ...' : isIt ? 'Cerca un errore o pilastro...' : 'Search for a mistake...'}
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
                                                    {isArabic ? 'الوصف:' : isIt ? 'Analisi dell\'Errore:' : 'Description:'}
                                                </h4>
                                                <p className="text-muted-foreground">{isArabic ? mistake.descriptionAr : isIt && mistake.descriptionIt ? mistake.descriptionIt : mistake.description}</p>
                                            </div>

                                            <div className="p-4 sm:p-6 bg-emerald-500/10 border border-emerald-500/30 rounded-xl shadow-inner">
                                                <h4 className="flex items-center gap-2 font-bold text-emerald-700 dark:text-emerald-400 mb-2 text-lg">
                                                    <CheckCircle2 className="w-5 h-5" />
                                                    {isArabic ? 'التصحيح:' : isIt ? 'La Guida Corretta (Sunnah):' : 'The Correction:'}
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
                                                        {isArabic ? 'الدليل:' : isIt ? 'Riferimento e Fonte:' : 'Evidence:'}
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
                            {isArabic ? 'لم يتم العثور على أخطاء تطابق بحثك.' : isIt ? 'Nessun errore trovato corrispondente alla ricerca.' : 'No mistakes found matching your search.'}
                        </p>
                    </div>
                )}
            </main>
            <Footer />
        </div>
    );
};

export default CommonMistakesPage;
