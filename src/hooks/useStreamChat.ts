import { useState, useCallback } from 'react';

type Message = { role: 'user' | 'assistant'; content: string };

const ScholarServiceNamespace = import('@/lib/ScholarService');

export function useStreamChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const streamChat = useCallback(async (userMessage: string) => {
    const userMsg: Message = { role: 'user', content: userMessage };
    setMessages(prev => [...prev, userMsg]);
    setIsLoading(true);
    setError(null);

    let assistantSoFar = '';
    const upsertAssistant = (nextChunk: string) => {
      assistantSoFar += nextChunk;
      setMessages(prev => {
        const last = prev[prev.length - 1];
        if (last?.role === 'assistant') {
          return prev.map((m, i) => (i === prev.length - 1 ? { ...m, content: assistantSoFar } : m));
        }
        return [...prev, { role: 'assistant', content: assistantSoFar }];
      });
    };

    try {
      const { ScholarService } = await ScholarServiceNamespace;
      const fullContent = await ScholarService.generateContent(userMessage);
      upsertAssistant(fullContent);
    } catch (e) {
      console.error("Direct chat error:", e);
      setError(e instanceof Error ? e.message : 'Impossibile connettersi all\'Archivio.');
    } finally {
      setIsLoading(false);
    }
  }, [messages]);

  const clearMessages = useCallback(() => {
    setMessages([]);
    setError(null);
  }, []);

  return { messages, isLoading, error, streamChat, clearMessages, setMessages };
}
