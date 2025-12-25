import React, { useState } from 'react';
import { GoogleGenAI } from '@google/genai';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Terminal, Send, Copy, Check, Info, Lightbulb, Box } from 'lucide-react';
import { Tooltip } from './Tooltip';

export const AIDemo: React.FC = () => {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const sampleJson = `{
  "user": "alex_dev",
  "permissions": ["read", "write"],
  "projects": [
    {"name": "TreeFile", "version": "1.2.1", "status": "stable"},
    {"name": "DataParser", "version": "0.8.0", "status": "beta"}
  ],
  "usage": { "cpu": "12%", "memory": "256MB" }
}`;

  const suggestions = [
    "What projects are listed?",
    "Check user permissions",
    "Identify current memory usage"
  ];

  const handleCopy = () => {
    navigator.clipboard.writeText(sampleJson);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleAskAI = async (customQuery?: string) => {
    const activeQuery = customQuery || query;
    if (!activeQuery.trim()) return;
    setIsLoading(true);
    setResponse(null);
    if (!customQuery) setQuery(activeQuery);

    try {
      // FIX 1: Use the correct VITE env variable
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
      if (!apiKey) throw new Error("API Key not configured");

      const ai = new GoogleGenAI({ apiKey });
      const prompt = `Given this JSON data: ${sampleJson}\n\nAnswer the following question in a short, professional sentence: ${activeQuery}`;
      
      const result = await ai.models.generateContent({
        // FIX 2: Use the stable model
        model: 'gemini-2.5-flash-lite',
        contents: prompt,
      });
      
      // FIX 3: Safe response handling
      const text = result.text || "No analysis available.";
      setResponse(text);

    } catch (error) {
      console.error("AI Error:", error);
      setResponse("AI insights require a configured API key. In the desktop app, this runs locally.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="ai-analyst" className="py-24 px-6 relative scroll-mt-24">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-600 dark:text-teal-400 text-[10px] font-black uppercase tracking-[0.2em] mb-6">
            <Sparkles size={14} />
            AI Native Intelligence
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white mb-6 tracking-tight">
            Ask your data <span className="text-teal-500">anything.</span>
          </h2>
          <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto text-lg">
            Stop digging through thousands of lines. Query complex structures using natural language and get instant semantic insights.
          </p>
        </div>

        <div className="rounded-[3rem] overflow-hidden border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900 shadow-2xl flex flex-col lg:flex-row min-h-[650px]">
          
          {/* --- Left Side: Data Workbench --- */}
          <div className="lg:w-1/2 p-8 border-b lg:border-b-0 lg:border-r border-slate-200 dark:border-white/5 relative bg-slate-50/50 dark:bg-slate-950/20">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/40" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/20 border border-amber-500/40" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/20 border border-emerald-500/40" />
                </div>
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest font-mono">analysis_context.json</span>
              </div>
              <Tooltip content="Copy JSON" side="top">
                <button 
                  onClick={handleCopy}
                  className="p-2 rounded-lg hover:bg-slate-200 dark:hover:bg-white/5 transition-colors text-slate-400 hover:text-teal-500"
                >
                  {copied ? <Check size={16} /> : <Copy size={16} />}
                </button>
              </Tooltip>
            </div>
            
            <div className="relative group h-[450px]">
              <div className="absolute inset-0 bg-teal-500/5 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              <pre className="relative z-10 font-mono text-[14px] text-teal-600 dark:text-teal-300 leading-relaxed overflow-auto p-6 rounded-2xl border border-slate-200 dark:border-white/5 bg-white dark:bg-slate-950/50 shadow-inner h-full scrollbar-thin scrollbar-thumb-slate-200 dark:scrollbar-thumb-slate-800">
                {sampleJson}
              </pre>
            </div>
            
            <div className="mt-6 flex items-start gap-3 p-4 rounded-2xl bg-teal-500/5 border border-teal-500/10 italic">
              <Box size={16} className="text-teal-500 shrink-0 mt-0.5" />
              <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                Tree File handles files up to 1GB locally. This web preview demonstrates the core semantic engine.
              </p>
            </div>
          </div>

          {/* --- Right Side: AI Assistant --- */}
          <div className="lg:w-1/2 p-8 md:p-12 flex flex-col justify-between bg-white dark:bg-slate-900 relative">
            <div className="absolute top-0 right-0 w-80 h-80 bg-teal-500/5 blur-[120px] rounded-full pointer-events-none" />
            
            <div className="relative z-10 flex flex-col h-full">
              <div className="flex items-center gap-4 mb-10">
                <div className="w-14 h-14 rounded-2xl bg-teal-500 flex items-center justify-center text-slate-950 shadow-lg shadow-teal-500/20 group hover:rotate-12 transition-transform">
                  <Sparkles size={28} />
                </div>
                <div>
                  <h3 className="text-2xl font-black text-slate-900 dark:text-white">Data Analyst</h3>
                  <p className="text-sm text-slate-500">Semantic parsing via Gemini 1.5</p>
                </div>
              </div>

              <div className="space-y-8 flex-grow">
                <div className="flex flex-wrap gap-2">
                  {suggestions.map((s, i) => (
                    <button
                      key={i}
                      onClick={() => handleAskAI(s)}
                      className="text-[12px] font-bold px-4 py-2 rounded-xl border border-slate-200 dark:border-white/10 text-slate-500 hover:text-teal-500 hover:border-teal-500/50 transition-all flex items-center gap-2 group bg-slate-50 dark:bg-white/5 active:scale-95"
                    >
                      <Lightbulb size={14} className="group-hover:fill-teal-500/20" />
                      {s}
                    </button>
                  ))}
                </div>

                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-teal-500 to-emerald-500 rounded-2xl blur opacity-20 group-focus-within:opacity-40 transition duration-500" />
                  <div className="relative flex items-center bg-white dark:bg-slate-950 rounded-2xl border border-slate-200 dark:border-white/10 shadow-sm overflow-hidden p-1.5">
                    <input
                      type="text"
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleAskAI()}
                      placeholder="e.g., What is the status of DataParser?"
                      className="w-full bg-transparent px-5 py-4 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none font-bold text-lg"
                    />
                    <button 
                      onClick={() => handleAskAI()}
                      disabled={isLoading}
                      className="p-4 bg-teal-500 hover:bg-teal-400 text-slate-950 rounded-xl transition-all disabled:opacity-50 flex items-center justify-center shadow-lg"
                    >
                      <Send size={24} />
                    </button>
                  </div>
                </div>

                <div className="relative min-h-[220px] rounded-[2.5rem] border-2 border-dashed border-slate-200 dark:border-white/10 flex flex-col items-center justify-center p-10 text-center bg-slate-50/30 dark:bg-white/5">
                  <AnimatePresence mode="wait">
                    {isLoading ? (
                      <motion.div 
                        key="loading"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex flex-col items-center gap-6"
                      >
                        <div className="flex gap-2">
                          <motion.div animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 1 }} className="w-3 h-3 rounded-full bg-teal-500" />
                          <motion.div animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} className="w-3 h-3 rounded-full bg-teal-500" />
                          <motion.div animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} className="w-3 h-3 rounded-full bg-teal-500" />
                        </div>
                        <span className="text-sm font-black text-teal-500 uppercase tracking-widest">Generating Insight...</span>
                      </motion.div>
                    ) : response ? (
                      <motion.div
                        key="response"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="space-y-6"
                      >
                        <p className="text-xl text-slate-800 dark:text-slate-100 font-bold leading-relaxed">
                          "{response}"
                        </p>
                        <div className="flex items-center justify-center gap-2">
                          <div className="h-[2px] w-8 bg-teal-500/20" />
                          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Verified Result</span>
                          <div className="h-[2px] w-8 bg-teal-500/20" />
                        </div>
                      </motion.div>
                    ) : (
                      <motion.div 
                        key="placeholder"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.6 }}
                        className="flex flex-col items-center"
                      >
                        <Sparkles size={48} className="text-slate-200 dark:text-slate-800 mb-6" />
                        <p className="text-sm font-bold text-slate-400 uppercase tracking-widest leading-relaxed">
                          Enter a query above to explore<br />
                          the semantic analysis engine.
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};