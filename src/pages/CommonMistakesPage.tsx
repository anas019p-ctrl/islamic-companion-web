import { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertTriangle, CheckCircle2, BookOpen, Users, Info } from 'lucide-react';

interface Mistake {
  id: number;
  category: string;
  wrong: string;
  wrongAr: string;
  correct: string;
  correctAr: string;
  explanation: string;
  explanationAr: string;
  source: string;
  severity: 'high' | 'medium' | 'low';
}

const commonMistakes: Mistake[] = [
  {
    id: 1,
    category: 'hadith',
    wrong: '"Cleanliness is half of faith"',
    wrongAr: '"النظافة نصف الإيمان"',
    correct: '"Purification (طُهُور) is half of faith"',
    correctAr: '"الطُّهُورُ شَطْرُ الإِيمَانِ" (الطهارة الروحية والجسدية)',
    explanation: 'The hadith refers to SPIRITUAL and physical purification (wudu, ghusl), not general cleanliness. The word "طُهُور" (tahur) means ritual purification.',
    explanationAr: 'الحديث يتحدث عن الطهارة الروحية والجسدية (الوضوء، الغسل)، وليس النظافة العامة. كلمة "طُهُور" تعني الطهارة الشرعية.',
    source: 'Sahih Muslim 223',
    severity: 'medium'
  },
  {
    id: 2,
    category: 'hadith',
    wrong: '"Seek knowledge even if you have to go to China"',
    wrongAr: '"اطلب العلم ولو في الصين"',
    correct: 'This hadith is DA\'IF (weak) and NOT authentic',
    correctAr: 'هذا الحديث ضعيف وليس صحيحاً',
    explanation: 'This popular saying is NOT from authentic hadith collections. It\'s a FABRICATED (موضوع) hadith. The authentic teaching is: "Seeking knowledge is obligatory upon every Muslim" (Ibn Majah, Hassan).',
    explanationAr: 'هذا القول المشهور ليس من الأحاديث الصحيحة. إنه حديث موضوع (مكذوب). الحديث الصحيح: "طَلَبُ الْعِلْمِ فَرِيضَةٌ عَلَى كُلِّ مُسْلِمٍ" (ابن ماجه، حسن).',
    source: 'Scholars of Hadith - Fabricated',
    severity: 'high'
  },
  {
    id: 3,
    category: 'hadith',
    wrong: '"Paradise lies at the feet of mothers"',
    wrongAr: '"الجنة تحت أقدام الأمهات"',
    correct: 'The AUTHENTIC hadith says: "Paradise is under the feet of mothers" but it\'s DA\'IF (weak)',
    correctAr: 'الحديث الأصلي يقول: "الجنة تحت أقدام الأمهات" لكنه ضعيف',
    explanation: 'While the sentiment is beautiful and honored in Islam, this exact wording is from a WEAK hadith (Ahmad, Al-Hakim - Daif). The AUTHENTIC teaching: "Your mother, then your mother, then your mother, then your father" (Bukhari & Muslim) emphasizes mothers\' rights.',
    explanationAr: 'رغم أن المعنى جميل ومُكرَّم في الإسلام، هذا اللفظ من حديث ضعيف (أحمد، الحاكم). الحديث الصحيح: "أُمَّكَ ثُمَّ أُمَّكَ ثُمَّ أُمَّكَ ثُمَّ أَبَاكَ" (البخاري ومسلم) يؤكد حق الأم.',
    source: 'Musnad Ahmad (Weak)',
    severity: 'medium'
  },
  {
    id: 4,
    category: 'practice',
    wrong: 'Praying Taraweeh with 8 rakats is bidah (innovation)',
    wrongAr: 'صلاة التراويح 8 ركعات بدعة',
    correct: 'Both 8 and 20 rakats are VALID according to scholars',
    correctAr: 'كلا من 8 و20 ركعة صحيح حسب العلماء',
    explanation: 'The Prophet (ﷺ) prayed 8-11 rakats at night (Aisha - Bukhari). The Sahaba prayed 20 during Umar\'s time (Malik, Abdur-Razzaq). Both are AUTHENTIC practices. Respect both views.',
    explanationAr: 'النبي ﷺ صلى 8-11 ركعة في الليل (عائشة - البخاري). الصحابة صلوا 20 في عهد عمر (مالك، عبد الرزاق). كلاهما ممارسات صحيحة. احترم كلا الرأيين.',
    source: 'Bukhari, Malik, Scholarly Consensus',
    severity: 'low'
  },
  {
    id: 5,
    category: 'belief',
    wrong: 'Muslims worship the Kaaba',
    wrongAr: 'المسلمون يعبدون الكعبة',
    correct: 'Muslims worship ONLY Allah. The Kaaba is the QIBLA (direction of prayer)',
    correctAr: 'المسلمون يعبدون الله فقط. الكعبة هي القِبلة (اتجاه الصلاة)',
    explanation: 'The Kaaba is NOT worshipped. It\'s the direction (Qibla) to unify Muslims worldwide. Umar ibn Al-Khattab kissed the Black Stone and said: "I know you are a stone that can neither benefit nor harm. If I had not seen the Prophet kissing you, I would not kiss you" (Bukhari).',
    explanationAr: 'الكعبة ليست معبودة. إنها الاتجاه (القبلة) لتوحيد المسلمين في العالم. قال عمر بن الخطاب عند تقبيل الحجر الأسود: "إني أعلم أنك حجر لا تضر ولا تنفع، ولولا أني رأيت النبي يقبلك ما قبلتك" (البخاري).',
    source: 'Quran 2:144, Bukhari 1610',
    severity: 'high'
  },
  {
    id: 6,
    category: 'hadith',
    wrong: '"Love of one\'s country is part of faith"',
    wrongAr: '"حب الوطن من الإيمان"',
    correct: 'This is NOT an authentic hadith. It\'s FABRICATED.',
    correctAr: 'هذا ليس حديثاً صحيحاً. إنه موضوع (مكذوب).',
    explanation: 'No chain of narration exists for this saying. It\'s NOT found in any authentic hadith collection. Scholars like Al-Albani, Al-Sakhawi declared it fabricated. Loving your land is natural, but don\'t attribute false statements to the Prophet (ﷺ).',
    explanationAr: 'لا يوجد سند لهذا القول. لا يوجد في أي مجموعة أحاديث صحيحة. العلماء مثل الألباني والسخاوي أعلنوه موضوعاً. حب الوطن أمر طبيعي، لكن لا تنسب أقوالاً كاذبة للنبي ﷺ.',
    source: 'Declared Fabricated by Hadith Scholars',
    severity: 'high'
  },
  {
    id: 7,
    category: 'practice',
    wrong: 'Saying "Jummah Mubarak" is bidah',
    wrongAr: 'قول "جمعة مباركة" بدعة',
    correct: 'Greeting with good wishes on Friday is PERMISSIBLE',
    correctAr: 'التهنئة بيوم الجمعة جائزة',
    explanation: 'There\'s NO evidence that saying "Jummah Mubarak" is forbidden. It\'s a du\'a (supplication) wishing blessings, similar to saying "Assalamu Alaikum". What\'s prohibited is treating it as an obligatory ritual. Scholars like Sh. Bin Baz, Sh. Al-Uthaymin allowed it as long as it\'s not seen as Sunnah.',
    explanationAr: 'لا يوجد دليل على تحريم قول "جمعة مباركة". إنها دعاء بالبركة، مثل "السلام عليكم". المحرم هو اعتبارها عبادة واجبة. العلماء مثل الشيخ ابن باز والشيخ العثيمين أجازوها ما لم تُعتبر سنة.',
    source: 'Contemporary Scholarly Opinion',
    severity: 'low'
  },
  {
    id: 8,
    category: 'hadith',
    wrong: '"He who does not love his country is not a believer"',
    wrongAr: '"من لم يحب وطنه فليس بمؤمن"',
    correct: 'FABRICATED - No such hadith exists',
    correctAr: 'موضوع - لا يوجد مثل هذا الحديث',
    explanation: 'This is completely FABRICATED. Faith (Iman) is defined in Quran & Sunnah: believing in Allah, His Angels, Books, Prophets, the Last Day, and Qadr. Loving one\'s country is not a pillar of faith.',
    explanationAr: 'هذا موضوع تماماً. الإيمان محدد في القرآن والسنة: الإيمان بالله، ملائكته، كتبه، رسله، اليوم الآخر، والقدر. حب الوطن ليس من أركان الإيمان.',
    source: 'No authentic source',
    severity: 'high'
  },
  {
    id: 9,
    category: 'belief',
    wrong: 'Celebrating the Prophet\'s birthday (Mawlid) is sunnah',
    wrongAr: 'الاحتفال بالمولد النبوي سُنّة',
    correct: 'Mawlid is NOT from the Sunnah. Scholars differ on its permissibility.',
    correctAr: 'المولد النبوي ليس من السُنّة. العلماء مختلفون في جوازه.',
    explanation: 'The Prophet (ﷺ), the Sahaba, and the first three generations did NOT celebrate Mawlid. It started centuries later. Some scholars permit it as a cultural expression of love for the Prophet (if done correctly), while others reject it as bidah. Respect both views and don\'t cause division.',
    explanationAr: 'النبي ﷺ والصحابة والقرون الثلاثة الأولى لم يحتفلوا بالمولد. بدأ بعد قرون. بعض العلماء يجيزونه كتعبير ثقافي عن حب النبي (إن فُعل بشكل صحيح)، والبعض يرفضونه كبدعة. احترم كلا الرأيين ولا تسبب الفرقة.',
    source: 'Historical Fact & Scholarly Debate',
    severity: 'medium'
  }
];

const CommonMistakesPage = () => {
  const { t, language, isRTL } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const isArabic = language === 'ar';

  const categories = [
    { id: 'all', nameEn: 'All Mistakes', nameAr: 'كل الأخطاء', icon: '📚' },
    { id: 'hadith', nameEn: 'Weak/Fabricated Hadith', nameAr: 'أحاديث ضعيفة/موضوعة', icon: '📜' },
    { id: 'belief', nameEn: 'Misconceptions in Belief', nameAr: 'مفاهيم خاطئة في العقيدة', icon: '🕌' },
    { id: 'practice', nameEn: 'Practice Errors', nameAr: 'أخطاء في الممارسة', icon: '🤲' }
  ];

  const filteredMistakes = selectedCategory === 'all' 
    ? commonMistakes 
    : commonMistakes.filter(m => m.category === selectedCategory);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'bg-red-500/20 text-red-700 dark:text-red-400 border-red-500';
      case 'medium': return 'bg-orange-500/20 text-orange-700 dark:text-orange-400 border-orange-500';
      case 'low': return 'bg-yellow-500/20 text-yellow-700 dark:text-yellow-400 border-yellow-500';
      default: return 'bg-gray-500/20 text-gray-700 dark:text-gray-400';
    }
  };

  return (
    <div className={`min-h-screen bg-transparent ${isRTL ? 'rtl' : 'ltr'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      <Header />
      <main className="container mx-auto px-4 py-8 pt-24 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-4 font-amiri text-primary">
            {isArabic ? '⚠️ الأخطاء الشائعة والأحاديث الضعيفة' : '⚠️ Common Mistakes & Weak Hadiths'}
          </h1>
          <p className="text-lg text-muted-foreground mb-6">
            {isArabic 
              ? 'تصحيح المفاهيم الخاطئة مع المصادر الأصلية'
              : 'Correcting misconceptions with authentic sources'
            }
          </p>

          <Alert className="max-w-2xl mx-auto mb-6 border-amber-500/50 bg-amber-500/10">
            <Info className="h-5 w-5 text-amber-600" />
            <AlertDescription className="text-sm">
              {isArabic
                ? '⚡ تحذير: كل ما هنا موثق من المصادر الأصلية. لا تنشر ما لم تتحقق!'
                : '⚡ Warning: Everything here is documented from authentic sources. Don\'t spread without verification!'
              }
            </AlertDescription>
          </Alert>
        </motion.div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {categories.map((cat) => (
            <Button
              key={cat.id}
              variant={selectedCategory === cat.id ? 'default' : 'outline'}
              onClick={() => setSelectedCategory(cat.id)}
              className="rounded-full"
            >
              <span className="mr-2">{cat.icon}</span>
              {isArabic ? cat.nameAr : cat.nameEn}
            </Button>
          ))}
        </div>

        {/* Mistakes List */}
        <div className="space-y-6">
          {filteredMistakes.map((mistake, index) => (
            <motion.div
              key={mistake.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className="glass-premium border-l-4 border-l-primary">
                <CardHeader>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <Badge className={`mb-3 ${getSeverityColor(mistake.severity)}`}>
                        {mistake.severity === 'high' ? '🔴' : mistake.severity === 'medium' ? '🟠' : '🟡'}
                        {' '}
                        {mistake.severity.toUpperCase()}
                        {' - '}
                        {mistake.category.toUpperCase()}
                      </Badge>
                      
                      <CardTitle className="text-xl mb-2 flex items-start gap-2">
                        <AlertTriangle className="w-6 h-6 text-red-500 shrink-0 mt-1" />
                        <div>
                          <div className="text-red-600 dark:text-red-400 mb-2 font-amiri">
                            {isArabic ? mistake.wrongAr : mistake.wrong}
                          </div>
                        </div>
                      </CardTitle>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Correct Version */}
                  <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-6 h-6 text-green-600 shrink-0 mt-1" />
                      <div className="flex-1">
                        <h4 className="font-semibold text-green-700 dark:text-green-400 mb-2">
                          {isArabic ? '✅ الصحيح:' : '✅ CORRECT:'}
                        </h4>
                        <p className="font-amiri text-lg text-green-800 dark:text-green-300">
                          {isArabic ? mistake.correctAr : mistake.correct}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Explanation */}
                  <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <BookOpen className="w-6 h-6 text-blue-600 shrink-0 mt-1" />
                      <div className="flex-1">
                        <h4 className="font-semibold text-blue-700 dark:text-blue-400 mb-2">
                          {isArabic ? '📖 التفسير:' : '📖 EXPLANATION:'}
                        </h4>
                        <p className="text-muted-foreground leading-relaxed">
                          {isArabic ? mistake.explanationAr : mistake.explanation}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Source */}
                  <div className="flex items-center gap-2 text-sm text-muted-foreground pt-2">
                    <Badge variant="outline" className="font-mono">
                      📚 {isArabic ? 'المصدر:' : 'Source:'} {mistake.source}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Disclaimer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-12"
        >
          <Card className="glass-premium border-primary/30">
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Info className="w-6 h-6 text-primary" />
                {isArabic ? 'ملاحظة مهمة' : 'Important Note'}
              </h3>
              <div className="space-y-3 text-muted-foreground">
                <p>
                  {isArabic
                    ? '🔍 كل المعلومات هنا مستندة إلى علماء الحديث المعتمدين (الألباني، ابن باز، ابن عثيمين، وغيرهم).'
                    : '🔍 All information here is based on trusted hadith scholars (Al-Albani, Ibn Baz, Ibn Uthaymin, and others).'
                  }
                </p>
                <p>
                  {isArabic
                    ? '⚖️ في المسائل الخلافية، نحترم جميع الآراء الشرعية ولا نفرض رأياً واحداً.'
                    : '⚖️ On matters of scholarly difference, we respect all valid opinions and don\'t impose a single view.'
                  }
                </p>
                <p>
                  {isArabic
                    ? '📚 للاستزادة، ارجع لكتب: "سلسلة الأحاديث الضعيفة والموضوعة" للألباني.'
                    : '📚 For more, refer to: "Silsilat al-Ahadith ad-Da\'ifah wal-Mawdu\'ah" by Al-Albani.'
                  }
                </p>
                <p className="font-semibold text-primary">
                  {isArabic
                    ? '💚 الهدف: حماية السنة النبوية من الدس والتحريف، والله الموفق.'
                    : '💚 Goal: Protecting the Prophetic Sunnah from fabrication and distortion, with Allah\'s guidance.'
                  }
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
};

export default CommonMistakesPage;
