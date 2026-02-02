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
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const message = input;
    setInput('');

    if (isScholarMode) {
      // Direct Shamila Research (Non-streaming for now, as it's a deep lookup)
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

      <main className="container mx-auto px-4 py-8 pt-24 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 mb-4">
            <GraduationCap className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-4xl font-bold font-amiri text-primary mb-4">
            {t('aiAssistant')}
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
            {t('aiAssistantDesc')}
          </p>

          <div className="flex items-center justify-center gap-4 mb-8">
            <div className={`p-4 rounded-2xl glass border transition-all flex items-center gap-4 ${isScholarMode ? 'border-primary bg-primary/5 shadow-lg shadow-primary/10' : 'border-primary/10'}`}>
              <div className={`p-2 rounded-xl ${isScholarMode ? 'bg-primary/20' : 'bg-muted'}`}>
                <GraduationCap className={`w-5 h-5 ${isScholarMode ? 'text-primary' : 'text-muted-foreground'}`} />
              </div>
              <div className="text-left">
                <Label htmlFor="scholar-mode" className="text-sm font-bold cursor-pointer">{t('innovate')}</Label>
                <p className="text-[10px] text-muted-foreground">{t('scholarModeDesc') || 'Access high-fidelity research archives'}</p>
              </div>
              <Switch
                id="scholar-mode"
                checked={isScholarMode}
                onCheckedChange={setIsScholarMode}
              />
            </div>
          </div>
        </motion.div>

        <Card className="min-h-[60vh] flex flex-col">
          <ScrollArea className="flex-1 p-4" ref={scrollRef}>
            {messages.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center py-12">
                <Library className="w-12 h-12 text-primary/30 mb-4" />
                <p className="text-muted-foreground text-center mb-6">
                  {t('startAsking')}
                </p>
                <div className="flex flex-wrap gap-2 justify-center max-w-lg">
                  {questions.map((question, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      onClick={() => handleSuggestion(question)}
                      className="text-xs"
                    >
                      {question}
                    </Button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <AnimatePresence>
                  {messages.map((message, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      {message.role === 'assistant' && (
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <GraduationCap className="w-4 h-4 text-primary" />
                        </div>
                      )}
                      <div
                        className={`max-w-[80%] rounded-2xl px-4 py-3 ${message.role === 'user'
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted'
                          }`}
                      >
                        <p className="whitespace-pre-wrap text-base md:text-lg leading-relaxed">
                          {message.content}
                        </p>
                      </div>
                      {message.role === 'user' && (
                        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                          <User className="w-4 h-4 text-primary-foreground" />
                        </div>
                      )}
                    </motion.div>
                  ))}
                </AnimatePresence>

                {isLoading && messages[messages.length - 1]?.role === 'user' && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex gap-3"
                  >
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <GraduationCap className="w-4 h-4 text-primary" />
                    </div>
                    <div className="bg-muted rounded-2xl px-4 py-3">
                      <div className="flex gap-1">
                        <span className="w-2 h-2 bg-primary/40 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                        <span className="w-2 h-2 bg-primary/40 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                        <span className="w-2 h-2 bg-primary/40 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            )}

            {error && (
              <div className="bg-destructive/10 text-destructive p-4 rounded-lg mt-4">
                {error}
              </div>
            )}
          </ScrollArea>

          <CardContent className="border-t p-4">
            <form onSubmit={handleSubmit} className="flex gap-2">
              {messages.length > 0 && (
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={clearMessages}
                  className="flex-shrink-0"
                >
                  <Trash2 className="w-5 h-5" />
                </Button>
              )}
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={t('typeQuestion')}
                disabled={isLoading}
                className="flex-1"
              />
              <Button type="submit" disabled={isLoading || !input.trim()}>
                <Send className="w-5 h-5" />
              </Button>
            </form>
          </CardContent>
        </Card>
      </main>

      <Footer />
    </div>
  );
};

export default ScholarPage;
