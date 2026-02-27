import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { supabase } from '@/integrations/supabase/client';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { ChevronLeft, ChevronRight, Book, Star, Clock, Heart, Shield, Loader2, BookOpen, Volume2, Download, FileText, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { ScholarService } from '@/lib/ScholarService';
import AudioService from '@/lib/AudioService';
import { ShamilaService } from '@/lib/ShamilaService';
import { BackButton } from '@/components/BackButton';

interface Prophet {
  id: string;
  name_ar: string;
  name_en: string;
  translations: Record<string, string>;
  story_ar: string;
  story_translations: Record<string, string>;
  quranic_verses: string[] | null;
  moral_lessons: Record<string, string[]>;
  timeline_order: number;
  era: string | null;
}

const prophetsFallback: Prophet[] = [
  {
    id: '1',
    name_ar: 'آدم عليه السلام',
    name_en: 'Adam (AS)',
    translations: { it: 'Adamo (AS)' },
    timeline_order: 1,
    era: 'L\'Inizio dell\'Umanità',
    story_ar: 'أول البشر وخليفة الله في الأرض، خلقه الله من طين ونفخ فيه من روحه، وعلمه الأسماء كلها. أسكنه الله الجنة مع حواء، ثم هبطا إلى الأرض لتبدأ رحلة الاستخلاف والعبادة بعد توبتهما الصادقة.',
    story_translations: {
      it: 'Il primo essere umano e il primo Profeta creato da Allah. Formato dall\'argilla e dotato dell\'anima divina, gli fu insegnata la natura di tutte le cose. Dopo il soggiorno in Paradiso e la prova dell\'albero, scese sulla Terra come vicario di Dio, portando il messaggio del monoteismo e del pentimento sincero.',
      en: 'The first human and Prophet created by Allah. Formed from clay and endowed with the divine soul, he was taught the nature of all things.'
    },
    quranic_verses: ['2:31', '2:37', '20:122'],
    moral_lessons: { it: ['Pentimento Sincero', 'Responsabilità'], en: ['Sincere Repentance', 'Responsibility'] }
  },
  {
    id: '2',
    name_ar: 'إدريس عليه السلام',
    name_en: 'Idris (AS)',
    translations: { it: 'Idris (AS)' },
    timeline_order: 1.5,
    era: 'Antichità Primeva',
    story_ar: 'ثاني الأنبياء بعد آدم، كان صديقاً نبياً وأول من خط بالقلم وعلم الناس علم النجوم والحساب. رفعه الله مكاناً علياً لتقواه وصبره على دعوة قومه للحق.',
    story_translations: {
      it: 'Il Profeta Idris, nipote di Adamo, fu il pioniere della scrittura e delle scienze. Conosciuto per la sua immensa saggezza e devozione, fu sollevato da Allah a un alto rango spirituale. Predicò l\'onestà e il timore di Dio in un\'epoca di transizione per l\'umanità.',
      en: 'Prophet Idris, descendant of Adam, was the pioneer of writing and science.'
    },
    quranic_verses: ['19:56', '21:85'],
    moral_lessons: { it: ['Ricerca della Sapienza', 'Pazienza'], en: ['Pursuit of Knowledge', 'Patience'] }
  },
  {
    id: '3',
    name_ar: 'نوح عليه السلام',
    name_en: 'Nuh (AS)',
    translations: { it: 'Noè (AS)' },
    timeline_order: 2,
    era: 'L\'Epoca del Diluvio',
    story_ar: 'شيخ المرسلين، دعا قومه لله 950 عاماً بصبر لا يلين. بنى السفينة بأمر الله وسط سخرية المشركين، حتى جاء أمر الله وغرق العالم ونجا المؤمنون لتبدأ الحياة من جديد.',
    story_translations: {
      it: 'Noè è il pilastro della fede in tempi di oscurità. Predicò per quasi un millennio sopportando derisioni e persecuzioni. La costruzione dell\'Arca divenne il simbolo della salvezza divina. Attraverso il Diluvio universale, Allah purificò la terra e Noè divenne il secondo padre dell\'umanità.',
      en: 'Noah is the pillar of faith in dark times. He preached for nearly a millennium, enduring derision and persecution.'
    },
    quranic_verses: ['11:37', '71:1', '54:13'],
    moral_lessons: { it: ['Pazienza Infinita', 'Fiducia in Allah'], en: ['Endless Patience', 'Trust in Allah'] }
  },
  { id: '4', name_ar: 'هود عليه السلام', name_en: 'Hud (AS)', translations: { it: 'Hud (AS)' }, timeline_order: 2.2, era: 'Il popolo di Aad', story_ar: 'أرسله الله إلى قوم عاد الذين اغتروا بقوتهم وبنوا في كل ريع آية. حذرهم من عذاب الله ودعاهم للتوحيد، حتى أرسل الله عليهم ريحاً صرصراً عاتية.', story_translations: { it: 'Inviato al popolo di Aad, giganti orgogliosi della loro forza e delle loro costruzioni imponenti. Hud li ammonì contro l\'arroganza, ricordando loro che la vera forza appartiene solo ad Allah.', en: 'Sent to the people of Aad, giants proud of their strength and imposing buildings.' }, quranic_verses: ['11:50', '26:123'], moral_lessons: { it: ['Umiltà'], en: ['Humility'] } },
  { id: '5', name_ar: 'صالح عليه السلام', name_en: 'Salih (AS)', translations: { it: 'Salih (AS)' }, timeline_order: 2.5, era: 'Il popolo di Thamud', story_ar: 'نبي الله لثمود، أخرج لهم الله ناقة من الصخر كآية ومعجزة. تآمر القوم وقتلوا الناقة فابتلاهم الله بالصيحة التي أخرست كبرهم.', story_translations: { it: 'Il profeta Sale (Salih) fu inviato ai Thamud, che scolpivano case nelle montagne. Allah fece scaturire una cammella miracolosa come segno, ma il popolo la uccise, attirando su di sé la punizione divina.', en: 'Prophet Salih was sent to Thamud, who carved houses in the mountains. Allah brought forth a miraculous camel as a sign.' }, quranic_verses: ['7:73', '11:61'], moral_lessons: { it: ['Rispetto dei Segni Divini'], en: ['Respect for Divine Signs'] } },
  {
    id: '6',
    name_ar: 'إبراهيم عليه السلام',
    name_en: 'Ibrahim (AS)',
    translations: { it: 'Abramo (AS)' },
    timeline_order: 3,
    era: 'Padre dei Profeti',
    story_ar: 'خليل الرحمن الذي حطم الأصنام وواجه النمرود. ألقي في النار فكانت برداً وسلاماً. بنى الكعبة مع إسماعيل وهو جد النبي محمد والأنبياء من بعده.',
    story_translations: {
      it: 'Abramo è l\'amico prediletto di Allah e il modello assoluto del monoteismo. Sopravvissuto miracolosamente al fuoco, fu messo alla prova con sacrifici immensi. Insieme al figlio Ismaele, costruì la Kaaba alla Mecca, stabilendo i riti del pellegrinaggio per tutta l\'umanità credente.',
      en: 'Abraham is the beloved friend of Allah and the absolute model of monotheism.'
    },
    quranic_verses: ['2:124', '16:120', '21:69'],
    moral_lessons: { it: ['Monoteismo Puro', 'Sacrificio'], en: ['Pure Monotheism', 'Sacrifice'] }
  },
  { id: '7', name_ar: 'لوط عليه السلام', name_en: 'Lut (AS)', translations: { it: 'Lot (AS)' }, timeline_order: 3.1, era: 'Sodoma e Gomorra', story_ar: 'ابن أخي إبراهيم، أرسله الله إلى قوم غرقوا في الفواحش. دعاهم للطهارة والخلق الكريم حتى نجاه الله وأهله إلا امرأته غبرت مع الغابرين.', story_translations: { it: 'Nipote di Abramo, lottò coraggiosamente contro la depravazione morale della sua società. Lot è l\'esempio del credente che rimane puro in un ambiente ostile e corrotto.', en: 'Nephew of Abraham, he bravely fought against the moral depravity of his society.' }, quranic_verses: ['7:80', '26:160'], moral_lessons: { it: ['Integrità Morale'], en: ['Moral Integrity'] } },
  { id: '8', name_ar: 'إسماعيل عليه السلام', name_en: 'Ismail (AS)', translations: { it: 'Ismaele (AS)' }, timeline_order: 3.2, era: 'L\'Origine della Mecca', story_ar: 'الذبيح المفتدى، الذي صبر على أمر الله طفلاً وشاباً. ساعد أباه في بناء الكعبة وهو جد العرب العدنانية ومن نسله جاء خير الأنام.', story_translations: { it: 'Il figlio di Abramo e Agar, protagonista del miracolo della sorgente di Zamzam. La sua prontezza al sacrificio è l\'essenza dell\'Islam (sottomissione). Antenato del Profeta Muhammad (S).', en: 'The son of Abraham and Hagar, protagonist of the Zamzam miracle.' }, quranic_verses: ['19:54', '37:101'], moral_lessons: { it: ['Pazienza', 'Obbedienza'], en: ['Patience', 'Obedience'] } },
  { id: '9', name_ar: 'إسحاق عليه السلام', name_en: 'Ishaq (AS)', translations: { it: 'Isacco (AS)' }, timeline_order: 3.3, era: 'Terra Santa', story_ar: 'بشرت به الملائكة إبراهيم وسارة في كبرهما. نبي بار ومبارك، ومن نسله تسلسلت النبوة في بني إسرائيل.', story_translations: { it: 'Nato miracolosamente da Sara in tarda età, Isacco fu il depositario della promessa divina. Padre di Giacobbe, aprì la stirpe dei profeti che avrebbero guidato i figli d\'Israele per millenni.', en: 'Miraculously born to Sarah in old age, Isaac was the keeper of the divine promise.' }, quranic_verses: ['11:71', '37:112'], moral_lessons: { it: ['Speranza nella Divina Provvidenza'], en: ['Hope in Divine Providence'] } },
  { id: '10', name_ar: 'يعقوب عليه السلام', name_en: 'Yaqub (AS)', translations: { it: 'Giacobbe (AS)' }, timeline_order: 3.4, era: 'Terra di Canaan', story_ar: 'إسرائيل الله، والد الأسباط الإثني عشر. صبر على فقده ليوسف حتى ابيضت عيناه من الحزن، لكنه لم ييأس من روح الله حتى اجتمع شمله بأبنائه.', story_translations: { it: 'Giacobbe, noto anche come Israele, visse una vita di prove familiari. La sua incrollabile speranza durante la lunga separazione dal figlio Yusuf è una lezione di fiducia eterna in Allah.', en: 'Jacob, also known as Israel, lived a life of family trials.' }, quranic_verses: ['12:86', '19:49'], moral_lessons: { it: ['Fiducia Incondizionata'], en: ['Unconditional Trust'] } },
  {
    id: '11',
    name_ar: 'يوسف عليه السلام',
    name_en: 'Yusuf (AS)',
    translations: { it: 'Giuseppe (AS)' },
    timeline_order: 3.5,
    era: 'Egitto faraonico',
    story_ar: 'صاحب أحسن القصص، ابتلي بالحسد والرق والسجن فصبر، حتى مكن الله له في الأرض وأصبح عزيز مصر. عفى عن إخوته وجمع شمل أهله في مشهد مهيب.',
    story_translations: {
      it: 'Giuseppe è il profeta della bellezza esteriore ed interiore. Tradito dai fratelli e venduto come schiavo, ascese ai vertici del potere in Egitto grazie alla sua saggezza e rettitudine. Il suo perdono verso chi lo ha ferito rimane uno dei momenti più alti della storia profetica.',
      en: 'Joseph is the prophet of both outer and inner beauty. Betrayed by his brothers, he rose to power in Egypt.'
    },
    quranic_verses: ['12:4', '12:90', '12:101'],
    moral_lessons: { it: ['Perdono', 'Purezza'], en: ['Forgiveness', 'Purity'] }
  },
  { id: '12', name_ar: 'أيوب عليه السلام', name_en: 'Ayyub (AS)', translations: { it: 'Giobbe (AS)' }, timeline_order: 3.6, era: 'L\'Esempio della Pazienza', story_ar: 'نبي الله الذي ضرب به المثل في الصبر. فقد ماله وولده وصحته لثمانية عشر عاماً فماترك شكر الله ولا ذكره حتى كشف الله ضره بمغسل بارد وشراب.', story_translations: { it: 'Giobbe sopportò la perdita di tutto ciò che possedeva, inclusa la salute, per molti anni senza mai lamentarsi. La sua guarigione miracolosa è la prova che Allah non abbandona mai i Suoi servi pazienti.', en: 'Job endured the loss of everything he owned, including his health, for many years.' }, quranic_verses: ['21:83', '38:41'], moral_lessons: { it: ['Pazienza Eroica'], en: ['Heroic Patience'] } },
  { id: '13', name_ar: 'شعيب عليه السلام', name_en: 'Shuayb (AS)', translations: { it: 'Shuayb (AS)' }, timeline_order: 3.7, era: 'Popolo di Madyan', story_ar: 'خطيب الأنبياء، دعا قومه للعدل في المكيال والميزان وترك الفساد في الأرض. حذرهم من عاقبة الطغيان حتى أخذتهم الرجفة في ديارهم.', story_translations: { it: 'L\'oratore dei Profeti, Shuayb combatté la corruzione economica e l\'ingiustizia sociale. Predicò che la rettitudine negli affari è parte integrante della fede in Dio.', en: 'The orator of the Prophets, Shuayb fought against economic corruption and social injustice.' }, quranic_verses: ['7:85', '11:84'], moral_lessons: { it: ['Onestà negli Affari'], en: ['Honesty in Business'] } },
  {
    id: '14',
    name_ar: 'موسى عليه السلام',
    name_en: 'Musa (AS)',
    translations: { it: 'Mosè (AS)' },
    timeline_order: 4,
    era: 'Egitto e Deserto',
    story_ar: 'كليم الله الذي واجه فرعون بمعجزات كبرى كالعصا واليد البيضاء. فلق له الله البحر لينجو بنو إسرائيل، وتلقى التوراة في جبل طور سيناء.',
    story_translations: {
      it: 'Mosè è il profeta della legge e della liberazione. Affrontò il tiranno più potente della terra con la sola forza della fede. Attraverso di lui, Allah operò miracoli sconvolgenti come l\'apertura del Mar Rosso e la rivelazione della Torah.',
      en: 'Moses is the prophet of law and liberation. He faced the most powerful tyrant with only faith.'
    },
    quranic_verses: ['7:104', '20:17', '28:30'],
    moral_lessons: { it: ['Coraggio contro l\'Ingiustizia'], en: ['Courage against Injustice'] }
  },
  { id: '15', name_ar: 'هارون عليه السلام', name_en: 'Harun (AS)', translations: { it: 'Aronne (AS)' }, timeline_order: 4.1, era: 'Egitto', story_ar: 'شقيق موسى ووزيره، كان أفصح منه لساناً وأعانه في مواجهة فرعون. كان نبياً حليماً ورفيقاً باراً في رحلة التيه.', story_translations: { it: 'Fratello di Mosè e suo vice, Aronne fu il compagno eloquente e saggio nella difficile missione di guidare i Figli d\'Israele. La sua abilità nel comunicare e la sua mitezza furono essenziali per la Ummah.', en: 'Brother of Moses and his deputy, Aaron was the eloquent and wise companion.' }, quranic_verses: ['19:53', '20:30'], moral_lessons: { it: ['Fratellanza e Supporto'], en: ['Brotherhood and Support'] } },
  { id: '16', name_ar: 'داوود عليه السلام', name_en: 'Dawud (AS)', translations: { it: 'Davide (AS)' }, timeline_order: 4.2, era: 'Regno d\'Israele', story_ar: 'الملك النبي الذي آتاه الله الزبور وألان له الحديد. كان يقسم وقته بين العبادة والقضاء، وكان صوته في التسبيح يجعل الجبال والطير تسبح معه.', story_translations: { it: 'Re e Guerriero, Davide ricevette il dono della lode melodiosa e il miracolo del ferro malleabile. È ricordato per il suo equilibrio tra potere temporale e devozione spirituale assoluta.', en: 'King and Warrior, David received the gift of melodious praise and the miracle of malleable iron.' }, quranic_verses: ['4:163', '34:10', '38:17'], moral_lessons: { it: ['Equilibrio tra Lavoro e Preghiera'], en: ['Balance between Work and Prayer'] } },
  { id: '17', name_ar: 'سليمان عليه السلام', name_en: 'Sulayman (AS)', translations: { it: 'Salomone (AS)' }, timeline_order: 4.3, era: 'Regno d\'Israele', story_ar: 'ابن داوود، ملك الأنس والجن والطير. علمه الله منطق الطير وسخر له الريح. بنى بيت المقدس وكان ملكاً شاكراً حكيماً لم يؤت أحد ملكاً مثل ملكه.', story_translations: { it: 'Allah concesse a Salomone un potere senza eguali, permettendogli di parlare con gli animali e comandare i Jinn. Nonostante la sua immensa ricchezza, rimase un servo umile e grato, governando con giustizia universale.', en: 'Allah granted Solomon unparalleled power, allowing him to speak with animals and command Jinn.' }, quranic_verses: ['21:81', '27:15', '38:30'], moral_lessons: { it: ['Gratitudine nel Successo'], en: ['Gratitude in Success'] } },
  { id: '18', name_ar: 'إلياس عليه السلام', name_en: 'Ilyas (AS)', translations: { it: 'Elia (AS)' }, timeline_order: 4.4, era: 'Israele', story_ar: 'أرسله الله ليرد بني إسرائيل عن عبادة الأصنام (بعل). كان رجلاً صالحاً زاهداً، دعا قومه للحق حتى نجاه الله من كيدهم.', story_translations: { it: 'Il profeta Elia combatté contro l\'idolatria oppressiva del suo tempo. La sua vita fu una testimonianza di fermezza nel difendere il monoteismo contro ogni minaccia reale.', en: 'The prophet Elijah fought against the oppressive idolatry of his time.' }, quranic_verses: ['6:85', '37:123'], moral_lessons: { it: ['Zelo per la Verità'], en: ['Zeal for Truth'] } },
  { id: '19', name_ar: 'اليسع عليه السلام', name_en: 'Al-Yasa (AS)', translations: { it: 'Eliseo (AS)' }, timeline_order: 4.5, era: 'Israele', story_ar: 'خلف إلياس في دعوة بني إسرائيل، وآتاه الله الحكمة والنبوة ليكون سراجاً للمؤمنين في أوقات المحن.', story_translations: { it: 'Successore di Elia, Eliseo fu un profeta di grande autorità spirituale. La sua missione fu quella di mantenere viva la fiamma della rivelazione tra il suo popolo smarrito.', en: 'Successor to Elijah, Elisha was a prophet of great spiritual authority.' }, quranic_verses: ['6:86', '38:48'], moral_lessons: { it: ['Continuità della Guida'], en: ['Continuity of Guidance'] } },
  { id: '20', name_ar: 'يونس عليه السلام', name_en: 'Yunus (AS)', translations: { it: 'Giona (AS)' }, timeline_order: 4.6, era: 'Assiria (Ninive)', story_ar: 'صاحب الحوت، الذي غادر قومه مغاضباً فالتقمه الحوت في ظلمات ثلاث. نادى "لا إله إلا أنت سبحانك إني كنت من الظالمين" فنجاه الله وآمن بسببه مائة ألف أو يزيدون.', story_translations: { it: 'Giona imparò che il messaggio di Allah non può essere abbandonato. Dopo la terribile prova dentro la balena, la sua preghiera di pentimento lo liberò, portando l\'intera città di Ninive alla conversione.', en: 'Jonah learned that Allah\'s message cannot be abandoned.' }, quranic_verses: ['37:139', '10:98', '21:87'], moral_lessons: { it: ['Potere del Pentimento'], en: ['Power of Repentance'] } },
  { id: '21', name_ar: 'زكريا عليه السلام', name_en: 'Zakariya (AS)', translations: { it: 'Zaccaria (AS)' }, timeline_order: 4.7, era: 'Palestina', story_ar: 'كافل مريم العذراء، دعا ربه بقلب خاشع أن يهبه ولداً رغم كبر سنه وعقم امرأته. فاستجاب الله له وبشره بيحيى وهو قادم في المحراب.', story_translations: { it: 'Zaccaria visse una vita di servizio nel tempio. La sua preghiera silenziosa e devota per un figlio fu accolta miracolosamente, dimostrando che nulla è impossibile per il Creatore del mondo.', en: 'Zechariah lived a life of service in the temple.' }, quranic_verses: ['3:38', '19:2', '21:89'], moral_lessons: { it: ['Forza della Dua'], en: ['Power of Dua'] } },
  { id: '22', name_ar: 'يحيى عليه السلام', name_en: 'Yahya (AS)', translations: { it: 'Giovanni (AS)' }, timeline_order: 4.8, era: 'Palestina', story_ar: 'نبي طهر زكي، آتاه الله الحكم صبياً. كان ورعاً زاهداً، لا يخشى في الله لومة لائم، وكان مصدقاً بكلمة من الله هو عيسى عليه السلام.', story_translations: { it: 'Giovanni il Battista (Yahya) fu un profeta di purezza e rigore morale fin dalla giovane età. Preparò la strada per il Messia, insegnando l\'umiltà e la dedizione assoluta a Dio.', en: 'John the Baptist (Yahya) was a prophet of purity and moral rigor.' }, quranic_verses: ['3:39', '19:12'], moral_lessons: { it: ['Carattere Integro'], en: ['Integrity of Character'] } },
  {
    id: '23',
    name_ar: 'عيسى عليه السلام',
    name_en: 'Isa (AS)',
    translations: { it: 'Gesù (AS)' },
    timeline_order: 5,
    era: 'Palestina Romana',
    story_ar: 'كلمة الله وروح منه، ولد من مريم العذراء بدون أب بكلمة "كن". أنزل الله عليه الإنجيل وجعله يحيي الموتى ويبرئ الأكمه والأبرص بإذن الله. رفعه الله إليه وسينزل في آخر الزمان.',
    story_translations: {
      it: 'Gesù è il Messia nato miracolosamente da Maria. Portatore di un messaggio di amore e spirito, compì guarigioni prodigiose solo per volontà di Allah. Per l\'Islam, non fu crocifisso ma elevato in cielo, da dove tornerà per stabilire la giustizia finale sulla terra.',
      en: 'Jesus is the Messiah miraculously born to Mary. He brought a message of love and spirit.'
    },
    quranic_verses: ['3:45', '19:30', '4:157'],
    moral_lessons: { it: ['Amore e Misericordia'], en: ['Love and Mercy'] }
  },
  {
    id: '24',
    name_ar: 'محمد صلى الله عليه وسلم',
    name_en: 'Muhammad (PBUH)',
    translations: { it: 'Muhammad (S)' },
    timeline_order: 6,
    era: 'L\'Alba dell\'Islam',
    story_ar: 'خاتم الأنبياء والرسل، المبعوث رحمة للعالمين. نزل عليه القرآن الكريم ليبدل ظلمات الجهل بنور التوحيد. أسس دولة العدل والأخلاق في المدينة وفتح مكة بسلام، وترك فينا ما إن تمسكنا به لن نضل أبداً.',
    story_translations: {
      it: 'Il Sigillo dei Profeti e la Misericordia per i mondi. Ricevette la rivelazione finale del Corano nell\'arco di 23 anni, trasformando un\'intera società. Il suo carattere "era il Corano stesso", un modello perfetto di guida, leadership e spiritualità per tutta l\'umanità fino alla fine dei tempi.',
      en: 'The Seal of the Prophets and Mercy for the worlds. He received the final revelation of the Quran over 23 years.'
    },
    quranic_verses: ['33:40', '48:29', '68:4'],
    moral_lessons: { it: ['Perfezione del Carattere', 'Umiltà'], en: ['Perfection of Character', 'Humility'] }
  },
  { id: '25', name_ar: 'ذو الكفل عليه السلام', name_en: 'Dhul-Kifl (AS)', translations: { it: 'Dhul-Kifl (AS)' }, timeline_order: 4.9, era: 'Antichità', story_ar: 'نبي من الصابرين الذين وفوا بعهودهم لله. كفل قومه في القضاء والعدل وصبر على طاعة الله في كل أحواله.', story_translations: { it: 'Famoso per aver mantenuto ogni promessa fatta ad Allah e al suo popolo. Dhul-Kifl incarna la costanza nella pratica religiosa e l\'affidabilità nelle responsabilità umane.', en: 'Famous for keeping every promise made to Allah and his people.' }, quranic_verses: ['21:85', '38:48'], moral_lessons: { it: ['Integrità'], en: ['Integrity'] } }
];

const ProphetsPage = () => {
  const { language, t } = useLanguage();
  const { toast } = useToast();
  const { data: prophets = [], isLoading } = useQuery({
    queryKey: ['prophets'],
    queryFn: async () => {
      // Prioritize local data for consistency with provided PDF
      const { prophetsData } = await import('@/data/prophetsData');

      const { data, error } = await supabase
        .from('prophets')
        .select('*')
        .order('timeline_order');

      // Merge Supabase entries with local enriched data
      const merged = (data || []).map(dbProphet => {
        const translations = (dbProphet.story_translations || {}) as Record<string, string>;
        const local = prophetsData.find(p => p.id.toString() === dbProphet.id.toString() || p.name === dbProphet.name_en);
        if (local) {
          return {
            ...dbProphet,
            story_translations: {
              ...translations,
              it: local.fullStoryIt || translations.it
            },
            era: local.era || dbProphet.era
          };
        }
        return dbProphet;
      });

      if (merged.length < 5) {
        // Map local data to the Prophet interface format
        return prophetsData.map(p => ({
          id: p.id.toString(),
          name_ar: p.nameAr,
          name_en: p.name,
          translations: { it: p.name },
          story_ar: "",
          story_translations: { it: p.fullStoryIt, en: p.summary },
          quranic_verses: [],
          moral_lessons: { it: p.keyFacts },
          timeline_order: p.id,
          era: p.era || null
        })) as Prophet[];
      }
      return merged as Prophet[];
    },
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
  });

  const [selectedProphet, setSelectedProphet] = useState<Prophet | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [deepStories, setDeepStories] = useState<Record<string, string>>({});

  const getProphetName = (prophet: Prophet) => {
    if (language === 'ar') return prophet.name_ar;
    return prophet.translations?.[language] || prophet.name_en;
  };

  const getProphetStory = (prophet: Prophet) => {
    if (language === 'ar' && prophet.story_ar) return prophet.story_ar;
    return prophet.story_translations?.[language] || prophet.story_translations?.en || prophet.story_ar;
  };

  const getMoralLessons = (prophet: Prophet) => {
    return prophet.moral_lessons?.[language] || prophet.moral_lessons?.en || [];
  };

  const handleDownloadPDF = (prophet: Prophet) => {
    window.print();
    toast({
      title: language === 'ar' ? 'جاري تحضير PDF' : 'PDF Export Initiated',
      description: language === 'ar' ? 'تم تجهيز مستند قصة النبي' : 'Preparing prophet story document...',
    });
  };

  const handleShamilaResearch = async (prophet: Prophet) => {
    if (deepStories[prophet.id]) return;

    setIsGenerating(true);
    try {
      const promptTitles: Record<string, string> = {
        ar: "بحث عميق في قصص الأنبياء",
        it: "Ricerca approfondita Profezia",
        en: "Deep Prophetic Research"
      };
      const title = promptTitles[language] || promptTitles.en;
      const query = `${title}: ${prophet.name_en} (${prophet.name_ar}). Fonti: Al-Maktaba Al-Shamila, Qisas al-Anbiya, Tafsir.`;
      const result = await ShamilaService.research(query, language);
      setDeepStories(prev => ({ ...prev, [prophet.id]: result.content }));

      toast({
        title: language === 'ar' ? 'اكتمل البحث' : 'Shamila Integrated',
        description: language === 'ar' ? 'تم استرجاع البيانات' : `Dati recuperati da: ${result.source}`,
      });
    } catch (error) {
      toast({
        title: "Errore",
        description: "Impossibile accedere agli archivi Shamila.",
        variant: "destructive"
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const isRTL = language === 'ar';

  return (
    <div className={`min-h-screen bg-background text-foreground ${isRTL ? 'rtl' : 'ltr'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      <Header />
      <main className="container mx-auto px-4 py-8 pt-24">
        <BackButton />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 mb-6">
            <Star className="w-5 h-5 text-primary" />
            <span className="text-xs font-bold text-primary uppercase tracking-[0.3em]">{t('propheticLineage')}</span>
          </div>
          <h1 className="text-4xl md:text-7xl font-bold font-amiri text-gradient-gold mb-4">
            {t('messengersOfLight')}
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            {t('prophetsIntro')}
          </p>
        </motion.div>

        {isLoading ? (
          <div className="flex justify-center py-24">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-primary"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {prophets.map((prophet, index) => (
              <motion.div
                key={prophet.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => setSelectedProphet(prophet)}
              >
                <Card className="futuristic-card group cursor-pointer h-full border-primary/10 hover:border-primary/40">
                  <CardHeader className="text-center pb-2">
                    <div className="w-16 h-16 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-all">
                      <span className="text-primary font-bold">{prophet.timeline_order}</span>
                    </div>
                    <CardTitle className="font-amiri text-3xl mb-1">{prophet.name_ar}</CardTitle>
                    <p className="text-xs uppercase tracking-widest text-primary/70">{getProphetName(prophet)}</p>
                  </CardHeader>
                  <CardContent className="text-center space-y-4">
                    <div className="flex items-center justify-center gap-2 text-[10px] text-muted-foreground uppercase opacity-50">
                      <Clock className="w-3 h-3" />
                      {prophet.era}
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">
                      {getProphetStory(prophet)}
                    </p>
                    <Button variant="ghost" className="w-full border border-primary/5 hover:bg-primary/10 text-[10px] uppercase tracking-widest">
                      {t('enterLegacy')}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}

        {/* Modal */}
        <AnimatePresence>
          {selectedProphet && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-background/95 backdrop-blur-2xl z-[100] flex items-center justify-center p-4"
              onClick={() => setSelectedProphet(null)}
            >
              <motion.div
                initial={{ scale: 0.9, y: 50 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 50 }}
                className="bg-card glass border border-white/10 rounded-[2.5rem] shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-10 pb-4 flex justify-between items-center bg-primary/5">
                  <div>
                    <h2 className="text-5xl font-amiri text-gradient-gold">{selectedProphet.name_ar}</h2>
                    <p className="text-muted-foreground uppercase tracking-widest text-xs mt-2">{getProphetName(selectedProphet)}</p>
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => setSelectedProphet(null)} className="h-12 w-12 rounded-2xl">
                    <X className="w-6 h-6" />
                  </Button>
                </div>

                <ScrollArea className="flex-1">
                  <div className="p-10 grid md:grid-cols-2 gap-10">
                    <div className="space-y-6">
                      <section>
                        <div className="flex justify-between items-center mb-4">
                          <h4 className="flex items-center gap-2 text-xs uppercase font-bold text-primary">
                            <Book className="w-4 h-4" /> {t('storyGreatness')}
                          </h4>
                          <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full hover:bg-primary/20" onClick={() => AudioService.speak(selectedProphet.story_ar, 'ar-SA')}>
                            <Volume2 className="w-4 h-4 text-primary" />
                          </Button>
                        </div>
                        <p className="text-lg font-amiri leading-[2.2] text-right bg-primary/5 p-8 rounded-[2rem] border border-primary/10" dir="rtl">
                          {selectedProphet.story_ar}
                        </p>
                      </section>

                      <section>
                        <div className="flex justify-between items-center mb-4">
                          <h4 className="flex items-center gap-2 text-xs uppercase font-bold text-muted-foreground">
                            <Book className="w-4 h-4 text-primary" /> {t('westernAccount')}
                          </h4>
                          <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full hover:bg-primary/20" onClick={() => {
                            const langToSpeak = language === 'ar' ? 'ar-SA' : (language === 'it' ? 'it-IT' : 'en-US');
                            AudioService.speak(getProphetStory(selectedProphet), langToSpeak);
                          }}>
                            <Volume2 className="w-4 h-4 text-muted-foreground" />
                          </Button>
                        </div>
                        <p className="text-muted-foreground leading-relaxed text-sm bg-secondary/30 p-6 rounded-[2rem] border border-white/5 italic">
                          {getProphetStory(selectedProphet)}
                        </p>
                      </section>

                      <div className="p-8 rounded-[2rem] bg-primary/5 border border-primary/20 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-100 transition-opacity">
                          <BookOpen className="w-10 h-10 text-primary" />
                        </div>
                        <h4 className="text-xs uppercase tracking-widest text-primary font-bold mb-6 flex items-center gap-2">
                          <BookOpen className="w-4 h-4" /> {t('sacredChronicles')}
                        </h4>

                        {!deepStories[selectedProphet.id] ? (
                          <div className="space-y-6">
                            <p className="text-[10px] text-muted-foreground leading-relaxed">
                              Accedi a una narrazione espansa e dettagliata attinta direttamente da <strong>Al-Maktaba Al-Shamila</strong> e dalle fonti classiche.
                            </p>
                            <div className="grid grid-cols-1 gap-3">
                              <Button
                                onClick={() => handleShamilaResearch(selectedProphet)}
                                disabled={isGenerating}
                                className="h-12 rounded-xl text-[9px] uppercase font-bold tracking-[0.2em] shadow-lg shadow-primary/10"
                              >
                                {isGenerating ? (
                                  <>
                                    <Loader2 className="w-3 h-3 mr-2 animate-spin" />
                                    {t('loading')}
                                  </>
                                ) : (
                                  <>
                                    {t('aiExplanation')}
                                  </>
                                )}
                              </Button>
                              <Button
                                variant="outline"
                                onClick={() => handleDownloadPDF(selectedProphet)}
                                className="h-12 rounded-xl text-[9px] uppercase font-bold tracking-[0.2em] border-primary/20 hover:bg-primary/10 no-print"
                              >
                                <Download className="w-3 h-3 mr-2" />
                                {language === 'ar' ? 'تصدير PDF' : (language === 'it' ? 'Esporta PDF' : 'Export PDF')}
                              </Button>
                            </div>
                          </div>
                        ) : (
                          <div className="space-y-6">
                            <ScrollArea className="h-64 pr-4">
                              <div className="text-[11px] text-foreground/80 leading-[1.8] whitespace-pre-line font-medium print:text-black print:text-sm">
                                {deepStories[selectedProphet.id]}
                              </div>
                            </ScrollArea>
                            <div className="grid grid-cols-2 gap-3 no-print">
                              <Button
                                variant="secondary"
                                onClick={() => {
                                  const langToSpeak = language === 'ar' ? 'ar-SA' : (language === 'it' ? 'it-IT' : 'en-US');
                                  AudioService.speak(deepStories[selectedProphet.id], langToSpeak);
                                }}
                                className="h-10 rounded-lg text-[9px] uppercase font-bold tracking-widest"
                              >
                                <Volume2 className="w-3 h-3 mr-2" />
                                {t('listen')}
                              </Button>
                              <Button
                                variant="outline"
                                onClick={() => handleDownloadPDF(selectedProphet)}
                                className="h-10 rounded-lg text-[9px] uppercase font-bold tracking-widest border-primary/20"
                              >
                                <FileText className="w-3 h-3 mr-2" />
                                PDF
                              </Button>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="space-y-8">
                      <section>
                        <h4 className="flex items-center gap-2 text-xs uppercase font-bold text-muted-foreground mb-4">
                          <Shield className="w-4 h-4" /> {t('moralArchitecture')}
                        </h4>
                        <div className="space-y-4">
                          {getMoralLessons(selectedProphet).map((l, i) => (
                            <div key={i} className="flex gap-4 p-4 rounded-2xl glass border border-white/5">
                              <span className="text-primary font-bold">0{i + 1}</span>
                              <p className="text-sm">{l}</p>
                            </div>
                          ))}
                        </div>
                      </section>

                      <section>
                        <h4 className="flex items-center gap-2 text-xs uppercase font-bold text-muted-foreground mb-4">
                          <Star className="w-4 h-4" /> {t('quranicCoordinates')}
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {selectedProphet.quranic_verses?.map(v => (
                            <Badge key={v} variant="outline" className="border-primary/20 bg-primary/5">{v}</Badge>
                          ))}
                        </div>
                      </section>
                    </div>
                  </div>
                </ScrollArea>

                <div className="p-10 border-t border-white/5 bg-background/50">
                  <Button className="w-full h-14 rounded-2xl font-bold uppercase tracking-widest shadow-xl shadow-primary/20" onClick={() => setSelectedProphet(null)}>
                    {t('closeVision')}
                  </Button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  );
};

export default ProphetsPage;
