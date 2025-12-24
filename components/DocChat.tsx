
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Send, 
  Bot, 
  User, 
  Loader2, 
  Codesandbox, 
  Sparkles, 
  AlertCircle,
  MessageCircleQuestion,
  Terminal,
  Copy,
  Check,
  Zap,
  ShieldAlert,
  ArrowRight
} from 'lucide-react';
import { GoogleGenAI } from '@google/genai';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  isError?: boolean;
}

const CodeBlock = ({ code }: { code: string }) => {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group/code my-4">
      <div className="absolute top-3 left-4 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-500 pointer-events-none">
        <Terminal size={12} />
        System Shell
      </div>
      <button 
        onClick={handleCopy}
        className="absolute top-2 right-2 p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 transition-colors"
      >
        {copied ? <Check size={14} className="text-teal-500" /> : <Copy size={14} />}
      </button>
      <pre className="bg-slate-950 text-emerald-400 p-10 pt-12 rounded-2xl font-mono text-xs overflow-x-auto shadow-inner border border-white/5">
        {code}
      </pre>
    </div>
  );
};

const MarkdownContent = ({ content }: { content: string }) => {
  const parts = content.split(/(```[\s\S]*?```)/);
  
  return (
    <div className="space-y-3">
      {parts.map((part, i) => {
        if (part.startsWith('```')) {
          const code = part.replace(/```/g, '').trim();
          return <CodeBlock key={i} code={code} />;
        }

        const lines = part.split('\n');
        return (
          <div key={i} className="space-y-2">
            {lines.map((line, lIdx) => {
              if (line.trim().startsWith('- ') || line.trim().startsWith('* ')) {
                return (
                  <div key={lIdx} className="flex gap-2 pl-1 items-start">
                    <span className="text-teal-500 font-black mt-1.5 shrink-0">•</span>
                    <span className="leading-relaxed">{line.trim().substring(2)}</span>
                  </div>
                );
              }
              if (/^\d+\./.test(line.trim())) {
                return (
                  <div key={lIdx} className="flex gap-2 pl-1 items-start">
                    <span className="text-teal-500 font-mono font-black mt-0.5 shrink-0">{line.trim().split('.')[0]}.</span>
                    <span className="leading-relaxed">{line.trim().split('.').slice(1).join('.')}</span>
                  </div>
                );
              }
              const inlineParts = line.split(/(`[^`]+`)/);
              return (
                <p key={lIdx} className="leading-relaxed">
                  {inlineParts.map((ip, pIdx) => {
                    if (ip.startsWith('`') && ip.endsWith('`')) {
                      return (
                        <code key={pIdx} className="bg-slate-950/20 dark:bg-slate-950 px-1.5 py-0.5 rounded font-mono text-xs text-teal-600 dark:text-teal-400 font-black mx-0.5">
                          {ip.slice(1, -1)}
                        </code>
                      );
                    }
                    return ip;
                  })}
                </p>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export const DocChat: React.FC<{ context: string }> = ({ context }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: "Hi! I'm the Tree File documentation expert. Ask me about file limits, formatting, or security troubleshooting!" }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const quickReplies = [
    { text: "Fix macOS 'Damaged' error", icon: <ShieldAlert size={14} /> },
    { text: "Large file limits?", icon: <Zap size={14} /> },
    { text: "Gemini API setup", icon: <Sparkles size={14} /> }
  ];

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async (customMessage?: string) => {
    const textToSend = customMessage || input;
    if (!textToSend.trim() || isTyping) return;

    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: textToSend }]);
    setIsTyping(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const prompt = `
        You are the "Tree File" Documentation Expert. 
        CONTEXT: ${context}
        QUESTION: ${textToSend}
        RULES: Use info from context. Be technical. Use markdown code blocks for terminal commands. Focus on file types, security fixes, and performance.
      `;

      const result = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
      });

      setMessages(prev => [...prev, { role: 'assistant', content: result.text || "No response." }]);
    } catch (error) {
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: "Error: Failed to reach AI engine. Check connection.",
        isError: true 
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[200]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            className="absolute bottom-0 right-0 w-[94vw] md:w-[450px] h-[650px] max-h-[85vh] bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-[2.5rem] shadow-[0_32px_128px_-16px_rgba(0,0,0,0.3)] flex flex-col overflow-hidden backdrop-blur-3xl"
          >
            {/* Header */}
            <div className="px-6 py-5 border-b border-slate-100 dark:border-white/5 bg-slate-50/80 dark:bg-slate-800/50 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-teal-500 flex items-center justify-center text-slate-950 shadow-lg shadow-teal-500/20">
                  <Codesandbox size={22} strokeWidth={2.5} />
                </div>
                <div>
                  <h3 className="text-sm font-black tracking-tight text-slate-900 dark:text-white">Expert Assistant</h3>
                  <div className="flex items-center gap-1.5">
                    <Sparkles size={10} className="text-teal-500 animate-pulse" />
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Doc Engine v1.2</span>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-2.5 rounded-xl bg-slate-200/50 dark:bg-white/10 hover:bg-slate-200 dark:hover:bg-white/20 transition-all text-slate-500 hover:text-slate-900 dark:hover:text-white"
              >
                <X size={20} strokeWidth={3} />
              </button>
            </div>

            {/* Chat Messages */}
            <div 
              ref={scrollRef}
              className="flex-grow overflow-y-auto p-6 space-y-6 scroll-smooth scrollbar-thin scrollbar-thumb-teal-500/10 hover:scrollbar-thumb-teal-500/30 scrollbar-track-transparent"
            >
              {messages.map((msg, i) => (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  key={i} 
                  className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
                >
                  <div className={`w-9 h-9 rounded-xl shrink-0 flex items-center justify-center ${
                    msg.role === 'assistant' 
                      ? (msg.isError ? 'bg-rose-500/10 text-rose-500' : 'bg-teal-500/10 text-teal-500') 
                      : 'bg-slate-900 dark:bg-white text-white dark:text-slate-950 shadow-md'
                  }`}>
                    {msg.role === 'assistant' ? (msg.isError ? <AlertCircle size={18} /> : <Bot size={18} />) : <User size={18} />}
                  </div>
                  <div className={`max-w-[88%] p-4 rounded-2xl text-[13px] leading-relaxed shadow-sm ${
                    msg.role === 'assistant' 
                      ? (msg.isError ? 'bg-rose-500/5 dark:bg-rose-500/10 text-rose-700 dark:text-rose-400 border border-rose-500/20' : 'bg-slate-50 dark:bg-white/5 text-slate-700 dark:text-slate-200 border border-slate-100 dark:border-white/5') 
                      : 'bg-teal-500 text-slate-950 font-black'
                  }`}>
                    <MarkdownContent content={msg.content} />
                  </div>
                </motion.div>
              ))}
              
              {isTyping && (
                <div className="flex gap-3">
                  <div className="w-9 h-9 rounded-xl bg-teal-500/10 text-teal-500 flex items-center justify-center"><Loader2 size={18} className="animate-spin" /></div>
                  <div className="bg-slate-50 dark:bg-white/5 p-4 rounded-2xl border border-slate-100 dark:border-white/5 flex gap-1.5 items-center">
                    <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1 }} className="w-1.5 h-1.5 rounded-full bg-teal-500" />
                    <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} className="w-1.5 h-1.5 rounded-full bg-teal-500" />
                    <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} className="w-1.5 h-1.5 rounded-full bg-teal-500" />
                  </div>
                </div>
              )}
            </div>

            {/* Contextual Quick Replies */}
            <AnimatePresence>
              {!isTyping && messages.length < 5 && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="px-6 py-3 flex flex-wrap gap-2 shrink-0 overflow-x-auto no-scrollbar"
                >
                  {quickReplies.map((qr, i) => (
                    <button
                      key={i}
                      onClick={() => handleSend(qr.text)}
                      className="flex items-center gap-2 px-3 py-1.5 bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl text-[11px] font-bold text-slate-600 dark:text-slate-400 hover:border-teal-500/50 hover:text-teal-500 transition-all whitespace-nowrap active:scale-95 shadow-sm"
                    >
                      {qr.icon}
                      {qr.text}
                      <ArrowRight size={10} className="opacity-40" />
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Input Area */}
            <div className="p-6 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-white/5 shrink-0">
              <div className="relative flex items-center bg-slate-100 dark:bg-slate-950 rounded-2xl border border-transparent focus-within:border-teal-500/50 focus-within:ring-4 focus-within:ring-teal-500/10 transition-all p-1.5">
                <input 
                  type="text" 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask about fixing macOS errors..."
                  className="flex-grow bg-transparent px-4 py-2 text-sm outline-none placeholder:text-slate-400 dark:text-white font-medium"
                />
                <button 
                  onClick={() => handleSend()}
                  disabled={!input.trim() || isTyping}
                  className={`p-3 rounded-xl transition-all shadow-lg active:scale-95 ${
                    !input.trim() || isTyping ? 'bg-slate-200 dark:bg-slate-800 text-slate-400' : 'bg-teal-500 text-slate-950 hover:bg-teal-400'
                  }`}
                >
                  {isTyping ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} strokeWidth={2.5} />}
                </button>
              </div>
              <div className="flex items-center justify-center gap-2 mt-4 opacity-40">
                <MessageCircleQuestion size={10} />
                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">
                  AI Trained on Tree File Core Documentation
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {!isOpen && (
          <motion.button
            key="toggle-button"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            whileHover={{ scale: 1.1, rotate: 5, y: -4 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(true)}
            className="w-16 h-16 rounded-[1.75rem] flex items-center justify-center shadow-[0_20px_50px_rgba(20,184,166,0.3)] transition-all duration-300 bg-teal-500 text-slate-950 hover:bg-teal-400"
          >
            <Codesandbox size={28} strokeWidth={2.5} />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};
