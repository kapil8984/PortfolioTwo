import React, { useState, useEffect, useRef } from 'react';
import { Bot, X, Send, RotateCcw, Copy, Check, Sparkles, ExternalLink, Trash2 } from 'lucide-react';
import { ChatMessage } from '../types/portfolio';
import { sendChatMessage } from '../services/aiClient';

interface AIChatModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SUGGESTED_PROMPTS = [
  "Tell me about Swati's .NET experience.",
  "Explain the Viberent project.",
  "What technologies did Swati use in Mommyist?",
  "Explain The Great Ayurveda architecture.",
  "What is the difference between MVC and Web API?",
  "Who is the current president of the United States?",
  "What are the latest news updates from Delhi?",
];

const INITIAL_MESSAGE: ChatMessage = {
  id: 'welcome-1',
  role: 'assistant',
  content: `Hello! I'm **Swati's AI Assistant**.\n\nYou can ask me anything about Swati's verified .NET full-stack experience, mobile applications (Viberent, Mommyist), Clean Architecture on The Great Ayurveda, or any general technical & knowledge questions!`,
  timestamp: Date.now(),
};

export const AIChatModal: React.FC<AIChatModalProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    try {
      const saved = sessionStorage.getItem('swati_ai_chat_history');
      if (saved) return JSON.parse(saved);
    } catch {}
    return [INITIAL_MESSAGE];
  });

  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    try {
      sessionStorage.setItem('swati_ai_chat_history', JSON.stringify(messages));
    } catch {}
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const handleSend = async (userText?: string) => {
    const query = (userText || input).trim();
    if (!query || isLoading) return;

    const userMessage: ChatMessage = {
      id: `u-${Date.now()}`,
      role: 'user',
      content: query,
      timestamp: Date.now(),
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    try {
      // Send conversation context (strip ids and sources for payload)
      const payload = newMessages
        .slice(-10)
        .map((m) => ({ role: m.role, content: m.content }));

      const data = await sendChatMessage(payload);

      const assistantMessage: ChatMessage = {
        id: `a-${Date.now()}`,
        role: 'assistant',
        content: data.reply,
        sources: data.sources,
        timestamp: Date.now(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err: any) {
      const errorMessage: ChatMessage = {
        id: `err-${Date.now()}`,
        role: 'assistant',
        content: `Error: ${err.message || 'Unable to connect to AI service. Please verify that server environment variables are configured.'}`,
        timestamp: Date.now(),
        isError: true,
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleClear = () => {
    setMessages([INITIAL_MESSAGE]);
    sessionStorage.removeItem('swati_ai_chat_history');
  };

  const handleRetry = () => {
    const lastUserMessage = [...messages].reverse().find((m) => m.role === 'user');
    if (lastUserMessage) {
      handleSend(lastUserMessage.content);
    }
  };

  if (!isOpen) return null;

  // Render markdown formatting simply and cleanly
  const renderFormattedContent = (content: string) => {
    const lines = content.split('\n');
    return lines.map((line, idx) => {
      // Code block lines or bold headings
      if (line.startsWith('```')) {
        return (
          <div key={idx} className="font-mono text-xs text-brand-primary dark:text-[#35D0BA] my-1 py-1 px-2 rounded bg-black/10 dark:bg-black/40">
            {line.replace(/```/g, '')}
          </div>
        );
      }
      if (line.startsWith('• ') || line.startsWith('- ')) {
        const itemText = line.replace(/^[-•]\s*/, '');
        return (
          <div key={idx} className="flex items-start gap-2 my-1 pl-1">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-primary dark:bg-[#35D0BA] mt-2 shrink-0" />
            <span dangerouslySetInnerHTML={{ __html: formatInline(itemText) }} />
          </div>
        );
      }
      if (line.trim() === '') {
        return <div key={idx} className="h-2" />;
      }
      return (
        <p key={idx} className="leading-relaxed my-1" dangerouslySetInnerHTML={{ __html: formatInline(line) }} />
      );
    });
  };

  const formatInline = (text: string) => {
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/`([^`]+)`/g, '<code class="px-1 py-0.5 rounded bg-black/10 dark:bg-white/10 font-mono text-xs">$1</code>');
  };

  return (
    <div
      className="fixed inset-0 z-50 overflow-hidden bg-black/70 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="ai-chat-title"
    >
      <div className="relative w-full sm:max-w-2xl h-[95vh] sm:h-[650px] bg-white dark:bg-[#121722] border border-light-border dark:border-dark-border rounded-t-2xl sm:rounded-2xl shadow-2xl flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-light-border dark:border-dark-border bg-white/80 dark:bg-[#121722]/80 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#7C5CFC] to-[#35D0BA] p-[1.5px] flex items-center justify-center">
              <div className="w-full h-full bg-[#121722] rounded-[9px] flex items-center justify-center">
                <Bot className="w-5 h-5 text-[#35D0BA]" />
              </div>
            </div>
            <div>
              <h2 id="ai-chat-title" className="font-bold text-sm sm:text-base text-light-textHeading dark:text-white leading-tight">
                Swati's AI Assistant
              </h2>
              <span className="flex items-center gap-1.5 text-[11px] text-light-textMuted dark:text-dark-textMuted">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Powered by Groq • Verified Knowledge</span>
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1 sm:gap-2">
            <button
              onClick={handleClear}
              className="p-2 rounded-lg text-light-textMuted dark:text-dark-textMuted hover:text-light-textHeading dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
              title="Clear conversation"
              aria-label="Clear conversation"
            >
              <Trash2 className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-lg text-light-textMuted dark:text-dark-textMuted hover:text-light-textHeading dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
              aria-label="Close assistant"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Messages Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
            >
              <div
                className={`max-w-[85%] sm:max-w-[80%] rounded-2xl px-4 py-3 text-sm shadow-sm ${
                  msg.role === 'user'
                    ? 'bg-brand-primary text-white rounded-br-sm'
                    : msg.isError
                    ? 'bg-red-500/10 text-red-600 dark:text-red-300 border border-red-500/30 rounded-bl-sm'
                    : 'bg-black/5 dark:bg-[#161D2C] text-light-textHeading dark:text-white border border-light-border dark:border-dark-border/80 rounded-bl-sm'
                }`}
              >
                {renderFormattedContent(msg.content)}

                {/* Optional Citations / Sources */}
                {msg.sources && msg.sources.length > 0 && (
                  <div className="mt-3 pt-2 border-t border-light-border/40 dark:border-dark-border/40 text-xs">
                    <span className="font-semibold block mb-1 text-light-textMuted dark:text-dark-textMuted">Sources:</span>
                    <div className="space-y-1">
                      {msg.sources.map((src, sIdx) => (
                        <a
                          key={sIdx}
                          href={src.url || '#'}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 text-brand-primary dark:text-[#35D0BA] hover:underline truncate"
                        >
                          <ExternalLink className="w-3 h-3 shrink-0" />
                          <span className="truncate">{src.title || src.url}</span>
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Message metadata & actions */}
              <div className="flex items-center gap-2 mt-1 px-1 text-[11px] text-light-textMuted dark:text-dark-textMuted">
                <span>{new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                {msg.role === 'assistant' && !msg.isError && (
                  <button
                    onClick={() => handleCopy(msg.id, msg.content)}
                    className="hover:text-light-textHeading dark:hover:text-white flex items-center gap-1 transition-colors"
                    title="Copy message"
                  >
                    {copiedId === msg.id ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-500" />
                        <span>Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                )}
                {msg.isError && (
                  <button
                    onClick={handleRetry}
                    className="hover:text-brand-primary dark:hover:text-[#35D0BA] flex items-center gap-1 transition-colors text-red-500"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>Retry</span>
                  </button>
                )}
              </div>
            </div>
          ))}

          {/* Typing Indicator */}
          {isLoading && (
            <div className="flex items-center gap-2 text-light-textMuted dark:text-dark-textMuted text-xs p-2">
              <div className="w-7 h-7 rounded-lg bg-brand-primary/10 flex items-center justify-center text-brand-primary dark:text-[#35D0BA]">
                <Bot className="w-4 h-4 animate-spin" />
              </div>
              <div className="flex items-center gap-1 bg-black/5 dark:bg-[#161D2C] px-3 py-2 rounded-xl border border-light-border dark:border-dark-border">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-primary animate-bounce [animation-delay:-0.3s]" />
                <span className="w-1.5 h-1.5 rounded-full bg-brand-primary animate-bounce [animation-delay:-0.15s]" />
                <span className="w-1.5 h-1.5 rounded-full bg-brand-primary animate-bounce" />
                <span className="ml-2 font-mono text-[11px]">Formulating response...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Suggested Prompts Carousel */}
        {messages.length <= 3 && !isLoading && (
          <div className="px-4 py-2 border-t border-light-border/60 dark:border-dark-border/60 bg-black/5 dark:bg-black/20">
            <p className="text-[11px] font-semibold text-light-textMuted dark:text-dark-textMuted mb-2 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-brand-primary dark:text-[#35D0BA]" />
              Suggested Questions
            </p>
            <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
              {SUGGESTED_PROMPTS.map((prompt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(prompt)}
                  className="shrink-0 px-3 py-1.5 rounded-lg text-xs bg-white dark:bg-[#161D2C] text-light-textHeading dark:text-white border border-light-border dark:border-dark-border hover:border-brand-primary dark:hover:border-[#35D0BA] transition-colors whitespace-nowrap"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input Bar */}
        <div className="p-3 sm:p-4 border-t border-light-border dark:border-dark-border bg-white/95 dark:bg-[#121722]/95">
          <div className="flex items-end gap-2 bg-black/5 dark:bg-[#161D2C] border border-light-border dark:border-dark-border rounded-xl p-2 focus-within:ring-2 focus-within:ring-brand-primary">
            <textarea
              ref={inputRef}
              rows={1}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask anything about Swati's projects, tech stack, or general topics..."
              className="flex-1 bg-transparent border-0 text-sm text-light-textHeading dark:text-white placeholder-light-textMuted/60 dark:placeholder-dark-textMuted/60 focus:outline-none resize-none max-h-32 p-1"
            />

            <button
              onClick={() => handleSend()}
              disabled={!input.trim() || isLoading}
              className="p-2 rounded-lg bg-brand-primary text-white hover:bg-brand-primaryHover disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-sm"
              aria-label="Send question"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
          <p className="text-[10px] text-light-textMuted dark:text-dark-textMuted text-center mt-2">
            Enter to send • Shift + Enter for new line • Factually grounded in verified documents
          </p>
        </div>
      </div>
    </div>
  );
};
