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
    category: 'Prayer',
    categoryAr: 'الصلاة',
    mistakes: [
      {
        id: 1,
        title: 'Moving too fast in Sujud',
        titleAr: 'السرعة في السجود',
        description: 'Not staying long enough in prostration to find tranquility.',
        descriptionAr: 'عدم المكوث طويلاً في السجود لتحقيق الطمأنينة.',
        correction: 'Ensure you stay in Sujud long enough to say "Subhana Rabbiyal A\'la" three times slowly.',
        correctionAr: 'تأكد من البقاء في السجود لفترة كافية لقول "سبحان ربي الأعلى" ثلاث مرات ببطء.',
        hadith: 'The Prophet (ﷺ) said: "The worst thief is the one who steals from his prayer..." (Ahmad)',
        hadithAr: 'قال النبي ﷺ: "أسوأ الناس سرقة الذي يسرق من صلاته..." (أحمد)'
      }
    ]
  },
  {
    category: 'Wudu',
    categoryAr: 'الوضوء',
    mistakes: [
      {
        id: 2,
        title: 'Wasting too much water',
        titleAr: 'الإسراف في الماء',
        description: 'Using excessive amounts of water during ablution.',
        descriptionAr: 'استخدام كميات كبيرة من الماء أثناء الوضوء.',
        correction: 'Use only as much water as needed. The Prophet (ﷺ) used a small amount of water for Wudu.',
        correctionAr: 'استخدم فقط قدر حاجتك من الماء. كان النبي ﷺ يتوضأ بالمد.',
        hadith: 'The Prophet (ﷺ) passed by Sa\'d when he was performing wudu and said: "What is this extravagance?" (Ibn Majah)',
        hadithAr: 'مر النبي ﷺ بسعد وهو يتوضأ فقال: "ما هذا السرف؟" (ابن ماجه)'
      }
    ]
  }
];

const CommonMistakesPage = () => {
  const { language, isRTL } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const isArabic = language === 'ar';

  const filteredMistakes = commonMistakes.map(cat => ({
    ...cat,
    mistakes: cat.mistakes.filter(m =>
      (isArabic ? m.titleAr : m.title).toLowerCase().includes(searchQuery.toLowerCase()) ||
      (isArabic ? m.descriptionAr : m.description).toLowerCase().includes(searchQuery.toLowerCase())
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
            {isArabic ? 'تصحيح العبادات' : 'Correcting Acts of Worship'}
          </Badge>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 font-amiri tracking-tight">
            {isArabic ? 'أخطاء شائعة وتصحيحها' : 'Common Mistakes & Corrections'}
          </h1>
          <p className="text-muted-foreground text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed">
            {isArabic ? 'دليلك للتعلم من الأخطاء الشائعة في العبادات اليومية بناءً على السنة النبوية الشريفة.' : 'La tua guida per imparare dagli errori comuni nelle adorazioni quotidiane basata sulla Sunnah.'}
          </p>

          <div className="mt-8 max-w-md mx-auto relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder={isArabic ? 'ابحث عن خطأ...' : 'Search for a mistake...'}
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
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 border-b border-amber-500/20 pb-2">
                <BookOpen className="w-6 h-6 text-amber-500" />
                {isArabic ? category.categoryAr : category.category}
              </h2>

              <div className="grid gap-6">
                {category.mistakes.map((mistake) => (
                  <Card key={mistake.id} className="glass border-white/10 overflow-hidden group">
                    <CardHeader className="bg-amber-500/5 border-b border-white/5">
                      <div className="flex justify-between items-start gap-4">
                        <CardTitle className="text-xl flex items-center gap-2 text-amber-600 dark:text-amber-400">
                          <XCircle className="w-5 h-5" />
                          {isArabic ? mistake.titleAr : mistake.title}
                        </CardTitle>
                        <Badge variant="outline" className="bg-amber-500/10 border-amber-500/20 text-amber-500">
                          ID: #{mistake.id}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-6 space-y-4">
                      <div>
                        <h4 className="flex items-center gap-2 font-semibold text-slate-800 dark:text-slate-200 mb-1">
                          <Info className="w-4 h-4 text-muted-foreground" />
                          {isArabic ? 'الوصف:' : 'Description:'}
                        </h4>
                        <p className="text-muted-foreground">{isArabic ? mistake.descriptionAr : mistake.description}</p>
                      </div>

                      <div className="p-4 sm:p-6 bg-emerald-500/10 border border-emerald-500/30 rounded-xl shadow-inner">
                        <h4 className="flex items-center gap-2 font-bold text-emerald-700 dark:text-emerald-400 mb-2 text-lg">
                          <CheckCircle2 className="w-5 h-5" />
                          {isArabic ? 'التصحيح:' : 'The Correction:'}
                        </h4>
                        <p className="text-slate-900 dark:text-slate-100 text-base sm:text-lg leading-relaxed font-medium">
                          {isArabic ? mistake.correctionAr : mistake.correction}
                        </p>
                      </div>

                      {mistake.hadith && (
                        <div className="p-4 sm:p-6 bg-blue-500/10 border border-blue-500/30 rounded-xl italic relative overflow-hidden">
                          <div className="absolute top-0 right-0 p-2 opacity-10">
                            <MessageSquare className="w-12 h-12" />
                          </div>
                          <h4 className="flex items-center gap-2 font-bold text-blue-700 dark:text-blue-400 mb-2 not-italic text-lg">
                            <MessageSquare className="w-5 h-5" />
                            {isArabic ? 'الدليل:' : 'Evidence:'}
                          </h4>
                          <p className="text-slate-800 dark:text-slate-200 text-base sm:text-lg leading-relaxed relative z-10">
                            "{isArabic ? mistake.hadithAr : mistake.hadith}"
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
              {isArabic ? 'لم يتم العثور على أخطاء تطابق بحثك.' : 'No mistakes found matching your search.'}
            </p>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default CommonMistakesPage;
