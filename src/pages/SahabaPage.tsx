import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { ChevronLeft, ChevronRight, Book, Users, Star, Shield, Heart, Gem, Loader2, BookOpen, Volume2, Search, Download, FileText, X, GraduationCap } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { ScholarService } from '@/lib/ScholarService';
import { VoiceService } from '@/lib/VoiceService';
import { ShamilaService } from '@/lib/ShamilaService';
import { BackButton } from '@/components/BackButton';

interface Sahaba {
    id: string;
    name_ar: string;
    name_en: string;
    translations: Record<string, string>;
    story_ar: string;
    story_translations: Record<string, string>;
    category: 'caliph' | 'warrior' | 'woman' | 'companion';
}

const sahabaData: Sahaba[] = [
    {
        id: '1',
        name_ar: 'أبو بكر الصديق',
        name_en: 'Abu Bakr As-Siddiq',
        translations: { it: 'Abu Bakr As-Siddiq' },
        category: 'caliph',
        story_ar: 'عبد الله بن أبي قحافة، الملقب بالصديق، هو أول الخلفاء الراشدين ورفيق النبي محمد في الهجرة. كان أعز قريش وأكثرهم بسطة في العلم والمال، سخر كل ثروته لنصرة الإسلام وإعتاق العبيد أمثال بلال بن رباح. اشتهر بحكمته وثباته يوم وفاة النبي، وقاد حروب الردة لتوحيد الأمة.',
        story_translations: {
            it: 'Il primo dei Califfi Ben Guidati e il compagno più stretto del Profeta Muhammad (S). Noto come Al-Siddiq per la sua fede incrollabile. Abu Bakr fu il primo uomo a convertirsi all\'Islam e dedicò tutta la sua ricchezza alla causa di Allah, riscattando schiavi come Bilal. Guidò la Ummah con saggezza e fermezza durante le guerre della Ridda.',
            en: 'The first of the Rightly Guided Caliphs and the closest companion of Prophet Muhammad (PBUH). Known as Al-Siddiq for his truthfulness.'
        }
    },
    {
        id: '2',
        name_ar: 'عمر بن الخطاب',
        name_en: 'Umar ibn al-Khattab',
        translations: { it: 'Umar ibn al-Khattab' },
        category: 'caliph',
        story_ar: 'الفاروق الذي فرق الله به بين الحق والباطل. كان إسلامه فتحاً وهجرته نصراً وخلافته رحمة. في عهده فُتحت بلاد الشام والعراق وفارس والقدس. وضع الدواوين وأسس نظام العدالة الذي لا يفرق بين قوي وضعيف.',
        story_translations: {
            it: 'Al-Farooq, colui che distingue il vero dal falso. Il suo ingresso nell\'Islam fu un punto di svolta. Sotto il suo califfato, l\'impero islamico si espanse enormemente e fu stabilito un sistema di giustizia e amministrazione leggendario.',
            en: 'Al-Farooq, who distinguished truth from falsehood. Under his rule, the Islamic state expanded and justice was established.'
        }
    },
    {
        id: '3',
        name_ar: 'عثمان بن عفان',
        name_en: 'Uthman ibn Affan',
        translations: { it: 'Uthman ibn Affan' },
        category: 'caliph',
        story_ar: 'ذو النورين، الملقب بذلك لزواجه من بنتي النبي. عرف بالحياء الشديد والكرم الذي لا ينقطع، حيث جهز جيش العسرة واشترى بئر رومة للمسلمين. في عهده جُمع القرآن في مصحف واحد لتوحيد قراءة الأمة.',
        story_translations: {
            it: 'Dhu al-Nurayn, noto per la sua modestia e immensa generosità. Finanziò l\'esercito di Tabuk e acquistò il pozzo di Rumiyah per i musulmani. Sotto il suo mandato, il Corano fu standardizzato in un unico volume.',
            en: 'Dhu al-Nurayn, known for his modesty and generosity. He oversaw the compilation of the Quran into a single volume.'
        }
    },
    {
        id: '4',
        name_ar: 'علي بن أبي طالب',
        name_en: 'Ali ibn Abi Talib',
        translations: { it: 'Ali ibn Abi Talib' },
        category: 'caliph',
        story_ar: 'ابن عم النبي وصهره، وأول من آمن من الصبيان. بطل معارك الإسلام وحامل لواء الرسول. اتسم بالشجاعة الفائقة والبلاغة المنقطعة النظير وهو أبو الحسن والحسين سيدا شباب أهل الجنة.',
        story_translations: {
            it: 'Il cugino e genero del Profeta, famoso per il suo coraggio sovrumano in battaglia e la sua profonda sapienza. Fu il primo bambino a convertirsi e fu il custode della casa del Profeta durante l\'Egira.',
            en: 'Cousin and son-in-law of the Prophet, famous for his bravery in battle and deep spiritual knowledge.'
        }
    },
    {
        id: '5',
        name_ar: 'خالد بن الوليد',
        name_en: 'Khalid ibn al-Walid',
        translations: { it: 'Khalid ibn al-Walid' },
        category: 'warrior',
        story_ar: 'سيف الله المسلول، القائد العسكري العبقري الذي لم يُهزم في أكثر من مائة معركة. كان له الدور الحاسم في معركة اليرموك التي فتحت بلاد الشام للمسلمين.',
        story_translations: {
            it: 'La Spada di Allah. Uno dei più grandi geni militari della storia dell\'umanità. Imbattuto in oltre cento battaglie, fu fondamentale nella conquista della Siria e della Mesopotamia.',
            en: 'The Sword of Allah. One of the greatest military geniuses in history, undefeated in over a hundred battles.'
        }
    },
    {
        id: '6',
        name_ar: 'حمزة بن عبد المطلب',
        name_en: 'Hamza ibn Abd al-Muttalib',
        translations: { it: 'Hamza ibn Abd al-Muttalib' },
        category: 'warrior',
        story_ar: 'أسد الله وسيد الشهداء، عم النبي وأخوه من الرضاعة. كان من أشد رجال قريش شجاعة ومن أعزهم نفساً. استشهد في معركة أحد مقبلاً غير مدبر.',
        story_translations: {
            it: 'Il "Leone di Allah" e lo "Zio dei Martiri". Uno dei guerrieri più temuti e nobili, la cui conversione diede dignità e forza ai musulmani alla Mecca.',
            en: 'The Lion of Allah and Master of Martyrs. A brave warrior who defended Islam in its earliest days.'
        }
    },
    {
        id: '7',
        name_ar: 'بلال بن رباح',
        name_en: 'Bilal ibn Rabah',
        translations: { it: 'Bilal ibn Rabah' },
        category: 'companion',
        story_ar: 'مؤذن الرسول وصاحب الصوت الشجي. كان عبداً يُعذب في رمضاء مكة ويقول "أحد أحد"، فأعتقه أبو بكر. أصبح من سادة المسلمين ومن المقربين للرسول.',
        story_translations: {
            it: 'Il primo muezzin dell\'Islam. Un ex schiavo che sopportò torture estreme per la sua fede ("Ahad, Ahad"). Fu liberato da Abu Bakr e divenne la voce ufficiale della chiamata alla preghiera.',
            en: 'The first muezzin of Islam. An Ethiopian who endured immense suffering for his faith and became a beloved companion.'
        }
    },
    {
        id: '8',
        name_ar: 'خديجة بنت خويلد',
        name_en: 'Khadija bint Khuwaylid',
        translations: { it: 'Khadija bint Khuwaylid' },
        category: 'woman',
        story_ar: 'أم المؤمنين وأول الناس إيماناً بالنبي. ساندته بمالها ونفسها حين كذبه الناس، وبشرها الله ببيت في الجنة من قصب لا صخب فيه ولا نصب.',
        story_translations: {
            it: 'La prima moglie del Profeta e la prima a credere in Allah e nel Suo Messaggero. Fu il pilastro di sostegno per Maometto (S) nei momenti più difficili della rivelazione.',
            en: 'The first wife of the Prophet and the first to believe in his message. She provided crucial support during the early days.'
        }
    },
    {
        id: '9',
        name_ar: 'عائشة بنت أبي بكر',
        name_en: 'Aisha bint Abi Bakr',
        translations: { it: 'Aisha bint Abi Bakr' },
        category: 'woman',
        story_ar: 'أم المؤمنين وعالمة النساء. كانت المرجع الأول للصحابة في الفقه والحديث بعد وفاه النبي، روت أكثر من ألفي حديث عن رسول الله.',
        story_translations: {
            it: 'La "Madre dei Credenti", eccezionale studiosa e giurista. Trasmise la gran parte della conoscenza intima e quotidiana del Profeta attraverso migliaia di Hadith.',
            en: 'The Mother of the Believers and a brilliant scholar. She narrated thousands of Hadiths and was a key source of knowledge.'
        }
    },
    {
        id: '10',
        name_ar: 'جعفر بن أبي طالب',
        name_en: 'Jafar ibn Abi Talib',
        translations: { it: 'Jafar ibn Abi Talib' },
        category: 'companion',
        story_ar: 'جعفر الطيار، ذو الجناحين. كان خطيب المسلمين المفوه أمام النجاشي ملك الحبشة، واستشهد في معركة مؤتة وهو يذود عن راية الإسلام.',
        story_translations: {
            it: 'Noto come Jafar il Volante. Portavoce dei musulmani in Abissinia, difese la purezza del messaggio coranico davanti al Re Negus. Morì martire a Mutah.',
            en: 'Known as Jafar the Flyer. He was the spokesperson for Muslims in Abyssinia and died at the Battle of Mutah.'
        }
    },
    {
        id: '11',
        name_ar: 'عبد الرحمن بن عوف',
        name_en: 'Abd al-Rahman ibn Awf',
        translations: { it: 'Abd al-Rahman ibn Awf' },
        category: 'companion',
        story_ar: 'الصحابي التاجر الذي بارك الله in ماله حتى صار أغنى الصحابة، لكنه جهز القوافل والجيوش في سبيل الله بماله كله، وهو أحد العشرة المبشرين بالجنة.',
        story_translations: {
            it: 'Uno dei dieci promessi del Paradiso. Mercante incredibile che usò la sua fortuna per finanziare le battaglie difensive dell\'Islam e sfamare i poveri di Medina.',
            en: 'One of the ten promised Paradise. A successful merchant who used his wealth for charity and the cause of Islam.'
        }
    },
    {
        id: '12',
        name_ar: 'سعد بن أبي وقاص',
        name_en: 'Sa\'d ibn Abi Waqqas',
        translations: { it: 'Sa\'d ibn Abi Waqqas' },
        category: 'warrior',
        story_ar: 'خال النبي وأول من رمى بسهم في سبيل الله. كان مستجاب الدعوة ببركة دعاء النبي له، وهو فاتح بلاد فارس وقائد معركة القادسية الخالدة.',
        story_translations: {
            it: 'Lo zio materno del Profeta e vincitore della battaglia di al-Qadisiyyah contro l\'impero persiano. Fu il primo a scoccare una freccia per l\'Islam.',
            en: 'The maternal uncle of the Prophet and the conqueror of Persia at the Battle of Qadisiyyah.'
        }
    },
    {
        id: '13',
        name_ar: 'طلحة بن عبيد الله',
        name_en: 'Talha ibn Ubaydullah',
        translations: { it: 'Talha ibn Ubaydullah' },
        category: 'companion',
        story_ar: 'طلحة الخير والجود، الذي فدى النبي بنفسه في يوم أحد حتى شلت يده. كان من أجود الناس وأسرعهم لنجدة المحتاجين، وهو أحد العشرة المبشرين بالجنة.',
        story_translations: {
            it: 'Famoso per la sua generosità e per aver protetto fisicamente il Profeta durante la battaglia di Uhud, riportando 70 ferite pur di non farlo colpire.',
            en: 'Famous for his extreme generosity and for shielding the Prophet at the Battle of Uhud.'
        }
    },
    {
        id: '14',
        name_ar: 'الزبير بن العوام',
        name_en: 'Zubayr ibn al-Awwam',
        translations: { it: 'Zubayr ibn al-Awwam' },
        category: 'warrior',
        story_ar: 'حواري رسول الله وأحد العشرة المبشرين بالجنة. كان مقداماً في المعارك وأول من سل سيفه في سبيل الله دفاعاً عن الإسلام.',
        story_translations: {
            it: 'Il fedele apostolo del Profeta. Un guerriero valoroso e primo a sguainare la spada per difendere la fede. Fu tra i partecipanti di tutte le battaglie chiave.',
            en: 'Cousin of the Prophet and his devoted disciple. He was the first to draw his sword in the path of Allah.'
        }
    },
    {
        id: '15',
        name_ar: 'أبو عبيدة بن الجراح',
        name_en: 'Abu Ubayda ibn al-Jarrah',
        translations: { it: 'Abu Ubayda ibn al-Jarrah' },
        category: 'companion',
        story_ar: 'أمين هذه الأمة، الذي قال عنه النبي "لكل أمة أمين وأمين هذه الأمة أبو عبيدة". قاد المسلمين في فتح الشام بشجاعة وتواضع نادرين.',
        story_translations: {
            it: 'L\'uomo più affidabile della Ummah. Guidò le campagne vittoriose in Siria rimanendo fedele alla sua vita ascetica e umile nonostante il potere.',
            en: 'The "Trustworthy of the Ummah". He led the conquest of the Levant and lived a life of profound simplicity.'
        }
    },
    {
        id: '16',
        name_ar: 'مصعب بن عمير',
        name_en: 'Mus\'ab ibn Umayr',
        translations: { it: 'Mus\'ab ibn Umayr' },
        category: 'companion',
        story_ar: 'سفير الإسلام الأول، الذي أُرسل للمدينة ليعلم أهلها القرآن قبل الهجرة. ترك حياة الترف والنعيم في مكة لخدمة الإسلام، واستشهد في أحد.',
        story_translations: {
            it: 'Il primo ambasciatore dell\'Islam. Inviato a Medina per preparare l\'Egira, convertì i capi delle tribù con la sua eloquenza e la sua grazia.',
            en: 'The first ambassador of Islam. He paved the way for the Migration by teaching the people of Medina.'
        }
    },
    {
        id: '17',
        name_ar: 'سلمان الفارسي',
        name_en: 'Salman al-Farsi',
        translations: { it: 'Salman al-Farsi' },
        category: 'companion',
        story_ar: 'الباحث عن الحقيقة الذي سافر من بلاد فارس وعبر بلاد الروم والشام حتى وصل للمدينة. صاحب فكرة حفر الخندق في غزوة الأحزاب.',
        story_translations: {
            it: 'Ricercatore della verità, viaggiò dalla Persia attraverso il mondo conosciuto per trovare il Profeta. Sua fu l\'idea del fossato che salvò Medina.',
            en: 'The seeker of truth who traveled from Persia across many lands until he found the Prophet.'
        }
    },
    {
        id: '18',
        name_ar: 'معاذ بن جبل',
        name_en: 'Muadh ibn Jabal',
        translations: { it: 'Muadh ibn Jabal' },
        category: 'companion',
        story_ar: 'أعلم الأمة بالحلال والحرام. بعثه النبي لليمن ليعلم الناس، وقال عنه إنه يُبعث يوم القيامة أمام العلماء برتبة "رتوة".',
        story_translations: {
            it: 'Massimo esperto di legge islamica. Inviato dal Profeta nello Yemen come insegnante e giudice per la sua profonda conoscenza della Sharia.',
            en: 'The most knowledgeable of the Ummah regarding Halal and Haram. He was sent as a teacher to Yemen.'
        }
    },
    {
        id: '19',
        name_ar: 'أبو هريرة',
        name_en: 'Abu Hurayra',
        translations: { it: 'Abu Hurayra' },
        category: 'companion',
        story_ar: 'حافظ الأمة، لازم النبي لسنوات وكان أكثر الصحابة رواية للحديث بفضل دعاء النبي له بقوة الحفظ والذاكرة.',
        story_translations: {
            it: 'Il custode del patrimonio profetico. Memorizzò migliaia di detti del Profeta garantendo la trasmissione della Sunnah alle generazioni future.',
            en: 'The preserver of the Sunnah, he narrated the largest number of Hadiths due to his exceptional memory.'
        }
    },
    {
        id: '20',
        name_ar: 'عمار بن ياسر',
        name_en: 'Ammar ibn Yasir',
        translations: { it: 'Ammar ibn Yasir' },
        category: 'companion',
        story_ar: 'أحد السابقين للإسلام الذين عُذبوا في الله. قال عنه النبي "عمار مُلئ إيماناً إلى مشاشه"، وهو ممن اشتاقت لهم الجنة.',
        story_translations: {
            it: 'Simbolo di perseveranza. Figlio dei primi martiri dell\'Islam, sopportò il fuoco e le fruste senza mai rinnegare la sua fede in Allah.',
            en: 'Son of Yasir and Sumayya, the first martyrs. He was among those who built the first mosque.'
        }
    },
    {
        id: '21',
        name_ar: 'الأسود بن أبي الأسود',
        name_en: 'As-Suwad ibn Abi Al-Suwad',
        translations: { it: 'As-Suwad' },
        category: 'warrior',
        story_ar: 'صحابي جليل اشتهر بشجاعته في المعارك وكان من المجاهدين الصادقين في سبيل الله.',
        story_translations: {
            it: 'Un nobile compagno e guerriero, noto per il suo coraggio nelle battaglie cruciali dei primi anni dell\'Islam.',
            en: 'A noble companion and warrior, known for his bravery in the crucial battles of early Islam.'
        }
    },
    {
        id: '22',
        name_ar: 'أم عمارة نُسيبة بنت كعب',
        name_en: 'Nusayba bint Ka\'ab',
        translations: { it: 'Nusayba bint Ka\'ab' },
        category: 'woman',
        story_ar: 'المجاهدة التي دافعت عن النبي في معركة أحد حتى أُثخنت بالجراح. قال عنها النبي "ما التفت يميناً ولا شمالاً إلا وأراها تقاتل دُوني".',
        story_translations: {
            it: 'L\'eroina di Uhud. Impugnò la spada per difendere il Profeta (S) quando la maggior parte degli uomini era fuggita, riportando dodici ferite gravi.',
            en: 'The heroine of Uhud. She fought with the sword to defend the Prophet when others retreated.'
        }
    },
    {
        id: '23',
        name_ar: 'سعد بن معاذ',
        name_en: 'Sa\'d ibn Mu\'adh',
        translations: { it: 'Sa\'d ibn Mu\'adh' },
        category: 'companion',
        story_ar: 'سيد الأوس الذي اهتز لوفاته عرش الرحمن. كان قائداً حكيماً وقوياً، مات متأثراً بجراحه في غزوة الخندق.',
        story_translations: {
            it: 'Leader degli Aws a Medina. Il Trono di Allah tremò per la sua morte. La sua fede e le sue decisioni furono vitali per la sopravvivenza dei musulmani.',
            en: 'Leader of the Aws in Medina. The Throne of Allah shook at his death. His faith was vital for the Ummah.'
        }
    },
    {
        id: '24',
        name_ar: 'أبو ذر الغفاري',
        name_en: 'Abu Dharr al-Ghifari',
        translations: { it: 'Abu Dharr al-Ghifari' },
        category: 'companion',
        story_ar: 'الصحابي الزاهد وصادق اللهجة. كان رابع أو خامس من أسلم، واشتهر بدعوته للزهد ومحاسبة الأغنياء.',
        story_translations: {
            it: 'L\'asceta veritiero. Fu tra i primi cinque a convertirsi e divenne simbolo di povertà scelta e di critica sociale verso l\'ostentazione della ricchezza.',
            en: 'The truthful ascetic. Among the first five to convert, he became a symbol of voluntary poverty.'
        }
    },
    {
        id: '25',
        name_ar: 'خالد بن سعيد',
        name_en: 'Khalid ibn Sa\'id',
        translations: { it: 'Khalid ibn Sa\'id' },
        category: 'companion',
        story_ar: 'من السابقين الأولين للإسلام، رأى رؤيا كانت سبباً في إسلامه. هاجر للحبشة وكان كاتباً لرسول الله.',
        story_translations: {
            it: 'Uno dei primi convertiti assoluti. Emigrò in Abissinia per sfuggire alle persecuzioni e fu uno stimato scrivano del Messaggero di Allah.',
            en: 'One of the earliest converts, he migrated to Abyssinia and served as a scribe for the Messenger.'
        }
    },
    {
        id: '26',
        name_ar: 'عبد الله بن عمر',
        name_en: 'Abdullah ibn Umar',
        translations: { it: 'Abdullah ibn Umar' },
        category: 'companion',
        story_ar: 'ابن الفاروق، الصحabi الذي كان شديد الاتباع لآثار النبي في كل شيء، واشتهر بالورع والزهد والابتعاد عن الفتن.',
        story_translations: {
            it: 'Il figlio di Umar. Famoso per la sua meticolosità nel seguire ogni gesto del Profeta e per la sua fuga da ogni posizione di potere o fitna.',
            en: 'Son of Umar. Famous for following every gesture of the Prophet and avoiding political strife.'
        }
    },
    {
        id: '27',
        name_ar: 'زيد بن حارثة',
        name_en: 'Zaid ibn Harithah',
        translations: { it: 'Zaid ibn Harithah' },
        category: 'companion',
        story_ar: 'الصحابي الوحيد الذي ذُكر اسمه في القرآن. كان النبي يحبه حباً شديداً وكان يُلقب بـ "حب رسول الله". استشهد قائداً في مؤتة.',
        story_translations: {
            it: 'L\'unico Sahabi citato per nome nel Corano. Amatissimo dal Profeta come un figlio, guidò l\'esercito musulmano a Mutah dove fu martirizzato.',
            en: 'The only companion mentioned by name in the Quran. Deeply loved by the Prophet, he died at Mutah.'
        }
    },
    {
        id: '28',
        name_ar: 'فاطمة بنت الخطاب',
        name_en: 'Fatima bint al-Khattab',
        translations: { it: 'Fatima bint al-Khattab' },
        category: 'woman',
        story_ar: 'أخت عمر بن الخطاب، كانت سبباً في إسلام أخيها بفضل ثباتها على دين الله وقراءتها للقرآن أمامه.',
        story_translations: {
            it: 'Sorella di Umar. La sua forza d\'animo e la sua recitazione del Corano furono la scintilla che portò Umar alla conversione all\'Islam.',
            en: 'Sister of Umar. Her spiritual strength and Quranic recitation led her brother to Islam.'
        }
    },
    {
        id: '29',
        name_ar: 'سالم مولى أبي حذيفة',
        name_en: 'Salim Mawla Abi Hudhayfa',
        translations: { it: 'Salim' },
        category: 'companion',
        story_ar: 'من أفضل قراء القرآن الكريم، قال النبي عنه "التمسوا القرآن من أربعة... ومنهم سالم مولى أبي حذيفة".',
        story_translations: {
            it: 'Uno dei più grandi esperti di recitazione coranica. Il Profeta raccomandò di imparare il Corano da lui per la sua precisione e bellezza.',
            en: 'One of the best Quran reciters. The Prophet recommended learning the Quran from him.'
        }
    },
    {
        id: '30',
        name_ar: 'خباب بن الأرت',
        name_en: 'Khabbab ibn al-Aratt',
        translations: { it: 'Khabbab ibn al-Aratt' },
        category: 'companion',
        story_ar: 'من أوائل المعذبين في الله، كان يُكوى في ظهره بالنار ليترك دينه فما زاده ذلك إلا إيماناً وثباتاً.',
        story_translations: {
            it: 'Il fabbro dell\'Islam. Subì torture atroci, venendo steso sui carboni ardenti, ma la sua fede rimase più dura del ferro che batteva.',
            en: 'The blacksmith of Islam. He endured horrific torture but his faith remained unbreakable.'
        }
    }
];

const categoryIcons = {
    caliph: Gem,
    warrior: Shield,
    woman: Heart,
    companion: Users
};

const SahabaPage = () => {
    const { t, language } = useLanguage();
    const [sahaba, setSahaba] = useState<Sahaba[]>(sahabaData);
    const [selectedSahbi, setSelectedSahbi] = useState<Sahaba | null>(null);
    const [activeCategory, setActiveCategory] = useState<string | null>(null);
    const [isGenerating, setIsGenerating] = useState(false);
    const [deepStories, setDeepStories] = useState<Record<string, string>>({});
    const [searchQuery, setSearchQuery] = useState('');
    const { toast } = useToast();

    const filteredSahaba = sahaba.filter(s => {
        const matchesCategory = !activeCategory || s.category === activeCategory;
        const matchesSearch = s.name_en.toLowerCase().includes(searchQuery.toLowerCase()) ||
            s.name_ar.includes(searchQuery) ||
            (s.translations?.[language]?.toLowerCase() || '').includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    const getName = (item: Sahaba) => {
        if (language === 'ar') return item.name_ar;
        return item.translations?.[language] || item.name_en;
    };

    const getStory = (item: Sahaba) => {
        if (language === 'ar') return item.story_ar;
        return item.story_translations?.[language] || item.story_translations?.en || item.story_ar;
    };

    const handleGenerateDeepStory = async (sahbi: Sahaba) => {
        if (deepStories[sahbi.id]) return;

        setIsGenerating(true);
        try {
            const prompt = `Genera una biografia professionale, estremamente dettagliata e lunga (almeno 10-15 paragrafi) su ${sahbi.name_en} (${sahbi.name_ar}). 
            Includi obbligatoriamente le seguenti sezioni:
            - **Introduzione e Origini**: nascita, famiglia e contesto tribale.
            - **L'incontro con l'Islam**: come ha accettato la fede e i sacrifici compiuti.
            - **Legame con il Profeta (S)**: eventi chiave vissuti insieme, aneddoti e testimonianze.
            - **Contributo alla Storia Islamica**: battaglie, missioni, sapienza trasmessa o ruoli amministrativi.
            - **Qualità Morali e Caratteriali**: cosa lo/la rendeva speciale e amato/a.
            - **Hadith Relativi**: cita almeno un Hadith autentico in cui viene menzionato/a.
            - **La Morte e l'Eredità**: ultimi anni, lascito spirituale e importanza oggi.
            
            Usa un tono narrativo ma accademico, basandoti su fonti classiche come Ibn Ishaq o Al-Dhahabi. Rispondi in ${language}.`;

            const story = await ScholarService.generateContent(prompt, language);
            setDeepStories(prev => ({ ...prev, [sahbi.id]: story }));
        } catch (error) {
            console.error("Sahaba Story Generation Error:", error);
            toast({
                title: language === 'ar' ? 'خطأ' : 'Error',
                description: language === 'ar' ? 'تعذر توليد القصة' : "Could not generate story. Please try again.",
                variant: "destructive"
            });
        } finally {
            setIsGenerating(false);
        }
    };

    const handleDownloadPDF = (sahaba: Sahaba) => {
        window.print();
        toast({
            title: language === 'ar' ? 'جاري تحضير PDF' : 'PDF Export Initiated',
            description: language === 'ar' ? 'تم تجهيز مستند السيرة' : 'Preparing biography document...',
        });
    };

    const handleShamilaResearch = async (sahabi: Sahaba) => {
        if (deepStories[sahabi.id]) return;

        setIsGenerating(true);
        try {
            const promptTitles: Record<string, string> = {
                ar: "بحث عميق في سيرة الصحابي",
                it: "Ricerca approfondita Sahaba",
                en: "Deep Sahaba Research"
            };

            const title = promptTitles[language] || promptTitles.en;
            const query = `${title}: ${sahabi.name_en} (${sahabi.name_ar}). Fonti: Al-Maktaba Al-Shamila, Sirah, Tabari.`;
            const result = await ShamilaService.research(query, language);
            setDeepStories(prev => ({ ...prev, [sahabi.id]: result.content }));

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
        <div className={`min-h-screen bg-transparent text-foreground ${isRTL ? 'rtl' : 'ltr'}`} dir={isRTL ? 'rtl' : 'ltr'}>
            <Header />
            <main className="container mx-auto px-4 py-8 pt-24">
                <BackButton />
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center mb-16"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 mb-6">
                        <Users className="w-5 h-5 text-primary" />
                        <span className="text-xs font-bold text-primary uppercase tracking-[0.3em]">{t('starsOfGuidance')}</span>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-bold font-amiri text-gradient-gold mb-4">
                        {t('sahabaStories')}
                    </h1>
                    <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                        {t('sahabaIntro')}
                    </p>
                </motion.div>

                {/* Category Filters */}
                <div className="flex flex-wrap justify-center gap-4 mb-12">
                    {['all', 'caliph', 'warrior', 'woman', 'companion'].map((cat) => (
                        <Button
                            key={cat}
                            variant={activeCategory === (cat === 'all' ? null : cat) ? 'default' : 'outline'}
                            onClick={() => setActiveCategory(cat === 'all' ? null : cat)}
                            className="rounded-2xl px-6 h-10 gap-2 glass capitalize"
                        >
                            {t(cat)}
                        </Button>
                    ))}
                </div>

                {/* Search Bar */}
                <div className="max-w-xl mx-auto mb-12 relative px-4">
                    <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                        placeholder={t('searchSahaba')}
                        className="glass h-14 pl-12 pr-4 rounded-2xl border-primary/20 text-lg"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    <AnimatePresence>
                        {filteredSahaba.map((item, index) => {
                            const Icon = categoryIcons[item.category];
                            return (
                                <motion.div
                                    key={item.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ delay: index * 0.05 }}
                                    onClick={() => setSelectedSahbi(item)}
                                >
                                    <Card className="futuristic-card group cursor-pointer overflow-hidden h-full">
                                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-100 transition-opacity">
                                            <Icon className="w-8 h-8 text-primary" />
                                        </div>
                                        <CardContent className="p-8 flex flex-col items-center text-center space-y-4">
                                            <div className="w-20 h-20 rounded-3xl bg-primary/5 border border-primary/10 flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                                                <Icon className="w-10 h-10 text-primary" />
                                            </div>
                                            <div>
                                                <h3 className="font-amiri text-3xl text-foreground mb-1">{item.name_ar}</h3>
                                                <p className="text-xs uppercase tracking-widest text-primary font-bold">{getName(item)}</p>
                                            </div>
                                            <Badge variant="outline" className="text-[8px] uppercase tracking-tighter opacity-50">{item.category}</Badge>
                                            <p className="text-xs text-muted-foreground line-clamp-3 leading-relaxed">
                                                {getStory(item)}
                                            </p>
                                            <Button variant="ghost" className="w-full mt-4 border border-primary/10 group-hover:bg-primary/10 text-[10px] uppercase tracking-widest">
                                                {t('discoverLegacy')}
                                            </Button>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            );
                        })}
                    </AnimatePresence>
                </div>

                {/* Digital scholar fallback */}
                {searchQuery && filteredSahaba.length === 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center py-20 px-4"
                    >
                        <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                            <BookOpen className="w-10 h-10 text-primary animate-pulse" />
                        </div>
                        <h3 className="text-2xl font-bold mb-2">{t('notFoundAi')}</h3>
                        <p className="text-muted-foreground max-w-md mx-auto mb-8">
                            {t('notFoundAiDesc')}
                        </p>
                        <Button
                            className="rounded-xl h-12 px-8 font-bold uppercase tracking-widest gap-2"
                            onClick={async () => {
                                setIsGenerating(true);
                                try {
                                    const prompt = `Genera una biografia professionale, estremamente dettagliata e lunga 15 paragrafi su ${searchQuery}, un Sahabi del Profeta (S). Includi discendenza, vita, ruolo nell'Islam e eredità. Se non è un Sahabi, spiega chi è o correggi gentilmente.`;
                                    const story = await ScholarService.generateContent(prompt, language);
                                    // Create a temporary "Scholar Sahabi" to show
                                    const aiSahbi: Sahaba = {
                                        id: 'ai-gen',
                                        name_ar: searchQuery,
                                        name_en: searchQuery,
                                        translations: { [language]: searchQuery },
                                        category: 'companion',
                                        story_ar: story.substring(0, 200) + '...',
                                        story_translations: { [language]: story.substring(0, 200) + '...' }
                                    };
                                    setDeepStories(prev => ({ ...prev, ['ai-gen']: story }));
                                    setSelectedSahbi(aiSahbi);
                                } catch (e) {
                                    toast({ title: "Errore", description: "Impossibile caricare il profilo ricercato.", variant: "destructive" });
                                } finally {
                                    setIsGenerating(false);
                                }
                            }}
                        >
                            <GraduationCap className="w-4 h-4" />
                            {t('generateAiBio')}
                        </Button>
                    </motion.div>
                )}

                {/* Detail Modal */}
                <AnimatePresence>
                    {selectedSahbi && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-background/95 backdrop-blur-2xl z-[100] flex items-center justify-center p-4"
                            onClick={() => setSelectedSahbi(null)}
                        >
                            <motion.div
                                initial={{ scale: 0.9, y: 50 }}
                                animate={{ scale: 1, y: 0 }}
                                exit={{ scale: 0.9, y: 50 }}
                                className="bg-card glass border border-white/10 rounded-[2.5rem] shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col print:max-h-none print:overflow-visible print:shadow-none print:border-none"
                                onClick={(e) => e.stopPropagation()}
                            >
                                {/* Print Header */}
                                <div className="hidden print:block text-center mb-8 pt-8 no-screen">
                                    <h1 className="text-4xl font-bold mb-2">The Islamic Companion</h1>
                                    <div className="w-24 h-1 bg-black mx-auto mb-4"></div>
                                    <p className="text-sm text-gray-500">Biography of {selectedSahbi.name_en}</p>
                                </div>

                                <div className="p-10 pb-0 flex justify-between items-start print:p-0">
                                    <div className="space-y-2">
                                        <Badge className="bg-primary/20 text-primary border-primary/30 uppercase text-[9px] px-4 py-1">
                                            {t(selectedSahbi.category)}
                                        </Badge>
                                        <h2 className="text-5xl font-amiri text-gradient-gold">{selectedSahbi.name_ar}</h2>
                                        <p className="text-xl text-muted-foreground">{getName(selectedSahbi)}</p>
                                    </div>
                                    <Button variant="ghost" size="icon" onClick={() => setSelectedSahbi(null)} className="h-12 w-12 rounded-2xl hover:bg-white/5">
                                        <X className="w-6 h-6" />
                                    </Button>
                                </div>

                                <ScrollArea className="flex-1">
                                    <div className="p-10 grid md:grid-cols-2 gap-10">
                                        <div className="space-y-6">
                                            <div className="p-6 rounded-3xl bg-primary/5 border border-primary/10">
                                                <div className="flex justify-between items-center mb-4">
                                                    <h4 className="text-xs uppercase tracking-widest text-primary font-bold flex items-center gap-2">
                                                        <Star className="w-4 h-4" /> {t('storyGreatness')}
                                                    </h4>
                                                    <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full hover:bg-primary/20" onClick={() => VoiceService.speak(selectedSahbi.story_ar, 'ar')}>
                                                        <Volume2 className="w-4 h-4 text-primary" />
                                                    </Button>
                                                </div>
                                                <p className="text-lg font-amiri leading-[2.2] text-right" dir="rtl">
                                                    {selectedSahbi.story_ar}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="space-y-6">
                                            <div className="p-6 rounded-3xl bg-secondary/30 border border-white/5">
                                                <div className="flex justify-between items-center mb-4">
                                                    <h4 className="text-xs uppercase tracking-widest text-muted-foreground font-bold flex items-center gap-2">
                                                        <Book className="w-4 h-4" /> {t('westernAccount')}
                                                    </h4>
                                                    <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full hover:bg-neutral-500/20"
                                                        onClick={() => {
                                                            VoiceService.speak(getStory(selectedSahbi), language);
                                                        }}>
                                                        <Volume2 className="w-4 h-4 text-muted-foreground" />
                                                    </Button>
                                                </div>
                                                <p className="text-muted-foreground leading-relaxed text-sm">
                                                    {getStory(selectedSahbi)}
                                                </p>
                                            </div>

                                            <div className="p-8 rounded-[2rem] bg-primary/5 border border-primary/20 relative overflow-hidden group">
                                                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-100 transition-opacity">
                                                    <BookOpen className="w-10 h-10 text-primary" />
                                                </div>
                                                <h4 className="text-xs uppercase tracking-widest text-primary font-bold mb-6 flex items-center gap-2">
                                                    <BookOpen className="w-4 h-4" /> {t('sacredChronicles')}
                                                </h4>

                                                {!deepStories[selectedSahbi.id] ? (
                                                    <div className="space-y-6">
                                                        <p className="text-[10px] text-muted-foreground leading-relaxed">
                                                            Accedi a una narrazione espansa e dettagliata attinta direttamente da <strong>Al-Maktaba Al-Shamila</strong> e dalle fonti classiche.
                                                        </p>
                                                        <div className="grid grid-cols-1 gap-3">
                                                            <Button
                                                                onClick={() => handleShamilaResearch(selectedSahbi)}
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
                                                                onClick={() => handleDownloadPDF(selectedSahbi)}
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
                                                                {deepStories[selectedSahbi.id]}
                                                            </div>
                                                        </ScrollArea>
                                                        <div className="grid grid-cols-2 gap-3 no-print">
                                                            <Button
                                                                variant="secondary"
                                                                onClick={() => {
                                                                    const langToSpeak = language === 'ar' ? 'ar' : (language === 'it' ? 'it' : 'en');
                                                                    VoiceService.speak(deepStories[selectedSahbi.id], langToSpeak);
                                                                }}
                                                                className="h-10 rounded-lg text-[9px] uppercase font-bold tracking-widest"
                                                            >
                                                                <Volume2 className="w-3 h-3 mr-2" />
                                                                {t('listen')}
                                                            </Button>
                                                            <Button
                                                                variant="outline"
                                                                onClick={() => handleDownloadPDF(selectedSahbi)}
                                                                className="h-10 rounded-lg text-[9px] uppercase font-bold tracking-widest border-primary/20"
                                                            >
                                                                <FileText className="w-3 h-3 mr-2" />
                                                                PDF
                                                            </Button>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>

                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="p-4 rounded-2xl border border-white/5 glass text-center">
                                                    <p className="text-[10px] uppercase opacity-50 mb-1">{t('rank')}</p>
                                                    <p className="font-bold text-xs">Major Sahbi</p>
                                                </div>
                                                <div className="p-4 rounded-2xl border border-white/5 glass text-center">
                                                    <p className="text-[10px] uppercase opacity-50 mb-1">{t('status')}</p>
                                                    <p className="font-bold text-xs text-emerald-500">Promised Jannah</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </ScrollArea>
                                <div className="p-10 pt-4">
                                    <Button className="w-full h-14 rounded-2xl text-[12px] uppercase tracking-widest font-bold shadow-lg shadow-primary/20" onClick={() => setSelectedSahbi(null)}>
                                        {t('backToGalaxy')}
                                    </Button>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </main>
            <Footer />
        </div >
    );
};

export default SahabaPage;
