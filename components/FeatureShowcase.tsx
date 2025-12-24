import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Split, FileCode, CheckCircle2 } from 'lucide-react';

const showcaseFeatures = [
  {
    id: 0,
    title: "AI Analyst",
    tagline: "Chat with your data using Gemini.",
    description: "Ask natural language questions to extract insights from massive files without manual searching or complex regex. Tree File uses Gemini 3 Pro to understand your structures.",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=1200",
    icon: <Sparkles size={24} />,
    bulletPoints: ["Semantic Search", "Complex Query Handling", "Data Schema Inference"]
  },
  {
    id: 1,
    title: "Smart Diff",
    tagline: "Compare files with color-coded diffs.",
    description: "Deep structural comparison that understands data hierarchy, highlighting real changes even when keys are reordered. Perfect for dev/prod environment comparisons.",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=1200",
    icon: <Split size={24} />,
    bulletPoints: ["Visual Conflict Resolution", "Hierarchy Awareness", "Exportable Diff Reports"]
  },
  {
    id: 2,
    title: "Type Generator",
    tagline: "Get TypeScript interfaces instantly.",
    description: "Automatically generate production-ready Zod schemas, TypeScript types, or Go structs from any data sample. One click to get a perfectly typed codebase.",
    image: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?auto=format&fit=crop&q=80&w=1200",
    icon: <FileCode size={24} />,
    bulletPoints: ["Supports TypeScript & Zod", "Go Struct Generation", "Custom Naming Rules"]
  }
];

export const FeatureShowcase: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section id="showcase" className="py-16 px-6 md:px-12 lg:px-24 overflow-hidden scroll-mt-24">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-start">
          {/* Left Side: Navigation & Info */}
          <div className="w-full lg:w-5/12 space-y-6">
            <div className="space-y-3">
              <h2 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
                Designed for the <br /> modern developer.
              </h2>
              <p className="text-base text-slate-500 dark:text-slate-400 leading-relaxed max-w-lg">
                Tree File gives you the tools to handle complex data structures with zero friction.
              </p>
            </div>

            <div className="space-y-3">
              {showcaseFeatures.map((f, i) => (
                <button
                  key={i}
                  onMouseEnter={() => setActiveTab(i)}
                  onClick={() => setActiveTab(i)}
                  className={`w-full text-left p-5 rounded-[1.5rem] transition-all duration-300 border group ${
                    activeTab === i 
                      ? 'bg-white dark:bg-slate-900 border-teal-500/50 shadow-xl shadow-teal-500/10' 
                      : 'border-transparent hover:bg-slate-50 dark:hover:bg-slate-900/30'
                  }`}
                >
                  <div className="flex gap-4">
                    <div className={`p-2.5 rounded-xl transition-all duration-300 shrink-0 ${
                      activeTab === i 
                        ? 'bg-teal-500 text-white' 
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-400 group-hover:text-teal-500'
                    }`}>
                      {/* Fix: Explicitly type the cloned element to allow 'size' prop and satisfy TS overload for Lucide icons */}
                      {React.cloneElement(f.icon as React.ReactElement<any>, { size: 20 })}
                    </div>
                    <div>
                      <h3 className={`font-bold text-lg mb-0.5 ${activeTab === i ? 'text-slate-900 dark:text-white' : 'text-slate-500'}`}>
                        {f.title}
                      </h3>
                      <p className={`text-xs transition-all ${
                        activeTab === i ? 'text-slate-600 dark:text-slate-400 opacity-100' : 'text-slate-400 opacity-60'
                      }`}>
                        {f.tagline}
                      </p>
                      
                      {activeTab === i && (
                        <motion.div 
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          className="mt-4 space-y-2.5"
                        >
                          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed italic">
                            {f.description}
                          </p>
                          <div className="flex flex-wrap gap-x-3 gap-y-1.5 pt-1">
                            {f.bulletPoints.map((bp, j) => (
                              <div key={j} className="flex items-center gap-1.5">
                                <CheckCircle2 size={12} className="text-teal-500" />
                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{bp}</span>
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Right Side: Visual Image Showcase - OPTIMIZED FOR SCREEN SIZE */}
          <div className="w-full lg:w-7/12 relative lg:sticky lg:top-32">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, scale: 0.98, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98, y: -20 }}
                transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
                className="aspect-[16/10] w-full max-h-[480px] rounded-[2.5rem] overflow-hidden border border-slate-200 dark:border-slate-800 shadow-[0_40px_80px_-15px_rgba(0,0,0,0.2)] relative bg-slate-100 dark:bg-slate-900"
              >
                <img 
                  src={showcaseFeatures[activeTab].image} 
                  alt={showcaseFeatures[activeTab].title}
                  className="w-full h-full object-cover transition-transform duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent p-8 flex flex-col justify-end">
                   <div className="bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-2xl shadow-2xl max-w-[280px]">
                     <span className="text-[9px] font-black text-teal-400 uppercase tracking-widest block mb-1">Module Live</span>
                     <p className="text-white text-sm font-bold leading-snug">
                       Active session: {showcaseFeatures[activeTab].title}
                     </p>
                   </div>
                </div>
              </motion.div>
            </AnimatePresence>
            
            {/* Background Glows */}
            <div className="absolute -z-10 -top-8 -right-8 w-64 h-64 bg-teal-500/15 blur-[100px] rounded-full" />
            <div className="absolute -z-10 -bottom-8 -left-8 w-64 h-64 bg-emerald-500/15 blur-[100px] rounded-full" />
          </div>
        </div>
      </div>
    </section>
  );
};