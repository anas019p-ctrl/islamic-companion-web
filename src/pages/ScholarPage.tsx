import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { useStreamChat } from '@/hooks/useStreamChat';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Send, User, Trash2, GraduationCap, Library, BookOpen } from 'lucide-react';
import { ShamilaService } from '@/lib/ShamilaService';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

const suggestedQuestions = {
  ar: [
    'ما هي أهمية الأندلس التاريخية؟',
    'حدثني عن سيرة النبي محمد ﷺ باختصار.',
    'كيف ساهم الإسلام في العلوم؟',
    'ما هي حقوق العائلة في الإسلام؟',
    'حدثني عن قدسية المسجد الأقصى والقدس.',
  ],
  en: [
    'What is the historical importance of Al-Andalus?',
    'Tell me a brief Seerah of Prophet Muhammad (PBUH).',
    'How did Islam contribute to science?',
    'What are family rights in Islam?',
    'Tell me about the sanctity of Al-Quds (Jerusalem).',
  ],
  it: [
    'Qual è l\'importanza storica di Al-Andalus?',
    'Raccontami la vita del Profeta Muhammad (psdl) in breve.',
    'Come ha contribuito l\'Islam alla scienza?',
    'Quali sono i diritti della famiglia nell\'Islam?',
    'Parlami della sacralità di Al-Quds (Gerusalemme).',
  ],
};

const ScholarPage = () => {
  const { t, language } = useLanguage();
  const { messages, isLoading, error, streamChat, clearMessages, setMessages } = useStreamChat();
  const [input, setInput] = useState('');
  const [isScholarMode, setIsScholarMode] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      const scrollArea = scrollRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollArea) {
        scrollArea.scrollTop = scrollArea.scrollHeight;
      }
    }
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const message = input;
    setInput('');

    if (isScholarMode) {
      setMessages(prev => [...prev, { role: 'user', content: message }]);
      try {
        const result = await ShamilaService.research(message, language);
        setMessages(prev => [...prev, { role: 'assistant', content: result.content }]);
      } catch (err) {
        setMessages(prev => [...prev, { role: 'assistant', content: t('shamilaError') }]);
      }
    } else {
      await streamChat(message);
    }
  };

  const handleSuggestion = async (question: string) => {
    if (isLoading) return;
    if (isScholarMode) {
      setMessages(prev => [...prev, { role: 'user', content: question }]);
      const result = await ShamilaService.research(question, language);
      setMessages(prev => [...prev, { role: 'assistant', content: result.content }]);
    } else {
      await streamChat(question);
    }
  };

  const isRTL = language === 'ar' || language === 'ur';
  const questions = suggestedQuestions[language as keyof typeof suggestedQuestions] || suggestedQuestions.en;

  return (
    <div className={`min-h-screen bg-transparent ${isRTL ? 'rtl' : 'ltr'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      <Header />

      <main className="container mx-auto px-4 py-8 pt-24 max-w-4xl relative">
        {/* Decorative Background Elements */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
          <div className="absolute top-1/4 -left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute bottom-1/4 -right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-[120px] animate-pulse" />
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center justify-center p-1 rounded-full bg-gradient-to-br from-primary via-accent to-primary mb-6 shadow-xl shadow-primary/20">
            <div className="w-20 h-20 rounded-full bg-background flex items-center justify-center">
              <GraduationCap className="w-10 h-10 text-primary animate-float" />
            </div>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold font-amiri bg-clip-text text-transparent bg-gradient-to-r from-primary via-accent to-primary mb-4">
            {t('aiAssistant')}
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8 font-medium">
            {t('aiAssistantDesc')}
          </p>

          <div className="flex flex-col items-center gap-6 mb-12">
            <div className={`group relative p-[1px] rounded-[2rem] transition-all duration-500 max-w-md w-full ${isScholarMode ? 'bg-gradient-to-r from-primary via-accent to-primary shadow-2xl shadow-primary/20' : 'bg-primary/10'}`}>
              <div className="bg-background rounded-[2rem] p-5 flex items-center gap-4">
                <div className={`p-3 rounded-2xl transition-colors ${isScholarMode ? 'bg-primary/20 text-primary' : 'bg-muted text-muted-foreground'}`}>
                  <BookOpen className="w-6 h-6" />
                </div>
                <div className="flex-1 text-left">
                  <Label htmlFor="scholar-mode" className="text-base font-bold cursor-pointer block">{t('scholarMode') || 'Shamila Brain'}</Label>
                  <p className="text-xs text-muted-foreground leading-tight">
                    {t('scholarModeDesc') || 'Deep research through 100,000+ classical Islamic volumes'}
                  </p>
                </div>
                <Switch
                  id="scholar-mode"
                  checked={isScholarMode}
                  onCheckedChange={setIsScholarMode}
                  className="data-[state=checked]:bg-primary"
                />
              </div>
            </div>
          </div>
        </motion.div>

        <Card className="border-none shadow-2xl glass-premium overflow-hidden h-[65vh] md:h-[70vh] flex flex-col rounded-[2.5rem] relative">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary/30 via-accent/30 to-primary/30" />

          <ScrollArea className="flex-1 px-4 py-6" ref={scrollRef}>
            <AnimatePresence mode="popLayout">
              {messages.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="h-full flex flex-col items-center justify-center text-center space-y-8 py-12"
                >
                  <div className="w-24 h-24 rounded-full bg-muted/50 flex items-center justify-center relative">
                    <Library className="w-10 h-10 text-primary/40" />
                    <div className="absolute inset-0 border-2 border-dashed border-primary/20 rounded-full animate-spin-slow" />
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-primary">{t('startAsking')}</h3>
                    <p className="text-muted-foreground text-sm max-w-sm mx-auto">{t('assistantHelpText') || 'Ask anything about Fiqh, Hadith, History, or Quranic wisdom'}</p>
                  </div>

                  <div className="flex flex-wrap gap-2 justify-center max-w-2xl px-4">
                    {questions.map((question, index) => (
                      <motion.div
                        key={index}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleSuggestion(question)}
                          className="rounded-full border-primary/20 hover:border-primary/50 hover:bg-primary/5 text-xs font-semibold py-5 px-6 whitespace-normal h-auto text-left transition-all"
                        >
                          {question}
                        </Button>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              ) : (
                <div className="space-y-6 max-w-3xl mx-auto w-full">
                  {messages.map((message, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: message.role === 'user' ? 20 : -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className={`flex gap-4 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      {message.role === 'assistant' && (
                        <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center flex-shrink-0 shadow-lg translate-y-2">
                          <GraduationCap className="w-5 h-5 text-white" />
                        </div>
                      )}

                      <div
                        className={`max-w-[85%] rounded-[2rem] px-6 py-4 shadow-sm border border-transparent ${message.role === 'user'
                            ? 'bg-gradient-to-br from-primary to-primary/80 text-primary-foreground rounded-tr-none'
                            : 'bg-background/80 backdrop-blur-md border-primary/5 rounded-tl-none shadow-xl'
                          }`}
                      >
                        <p className="whitespace-pre-wrap text-base md:text-lg leading-relaxed font-medium">
                          {message.content}
                        </p>
                      </div>

                      {message.role === 'user' && (
                        <div className="w-10 h-10 rounded-2xl bg-muted border border-muted-foreground/10 flex items-center justify-center flex-shrink-0 shadow-sm translate-y-2">
                          <User className="w-5 h-5 text-muted-foreground" />
                        </div>
                      )}
                    </motion.div>
                  ))}

                  {isLoading && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex gap-4"
                    >
                      <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center flex-shrink-0">
                        <GraduationCap className="w-5 h-5 text-white animate-pulse" />
                      </div>
                      <div className="bg-background/80 backdrop-blur-md rounded-[2rem] rounded-tl-none px-6 py-4 border border-primary/5 shadow-xl">
                        <div className="flex gap-2">
                          <span className="w-2.5 h-2.5 bg-primary/40 rounded-full animate-bounce [animation-delay:-0.3s]" />
                          <span className="w-2.5 h-2.5 bg-primary/40 rounded-full animate-bounce [animation-delay:-0.15s]" />
                          <span className="w-2.5 h-2.5 bg-primary/40 rounded-full animate-bounce" />
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>
              )}
            </AnimatePresence>
          </ScrollArea>

          <CardContent className="p-6 bg-muted/30 backdrop-blur-md border-t border-primary/5">
            <form onSubmit={handleSubmit} className="flex gap-3 max-w-4xl mx-auto">
              {messages.length > 0 && (
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={clearMessages}
                  className="flex-shrink-0 rounded-2xl hover:bg-destructive/10 hover:text-destructive h-14 w-14 transition-colors"
                >
                  <Trash2 className="w-6 h-6" />
                </Button>
              )}
              <div className="relative flex-1 group">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={t('typeQuestion')}
                  disabled={isLoading}
                  className="flex-1 h-14 pl-6 pr-14 rounded-2xl border-primary/20 focus:border-primary focus:ring-primary/20 bg-background/50 text-lg transition-all"
                />
                <Button
                  type="submit"
                  disabled={isLoading || !input.trim()}
                  className="absolute right-2 top-2 h-10 w-10 p-0 rounded-xl bg-gradient-to-r from-primary to-accent hover:opacity-90 shadow-lg shadow-primary/20 transition-all active:scale-95"
                >
                  <Send className="w-5 h-5" />
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </main>

      <Footer />
    </div>
  );
};

export default ScholarPage;
      </main >

  <Footer />
    </div >
  );
};

export default ScholarPage;
