
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  History, 
  ArrowLeft, 
  Rocket, 
  Bug, 
  Zap, 
  Sparkles, 
  ShieldCheck, 
  ChevronRight,
  Monitor,
  Package,
  Calendar,
  Layers
} from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { HeroBackground } from '@/components/HeroBackground';
import { Tooltip } from '@/components/Tooltip';

const releases = [
  {
    version: "1.2.1",
    date: "July 15, 2024",
    tagline: "Performance & Platform Expansion",
    status: "Current",
    type: "Major",
    changes: [
      { type: 'feature', icon: <Monitor size={14} />, text: "Official macOS Universal Build support (Apple Silicon & Intel)." },
      { type: 'fix', icon: <Bug size={14} />, text: "Fixed CSV parsing error when handling quoted newlines." },
      { type: 'feature', icon: <Sparkles size={14} />, text: "Added Zod Schema generation to the Type Generator module." },
      { type: 'improvement', icon: <Zap size={14} />, text: "Improved Tree View rendering speed by 40% for files over 200MB." }
    ]
  },
  {
    version: "1.1.0",
    date: "June 02, 2024",
    tagline: "AI Intelligence Integration",
    status: "Stable",
    type: "Feature",
    changes: [
      { type: 'feature', icon: <Sparkles size={14} />, text: "Integrated Gemini 3 Pro for natural language data analysis." },
      { type: 'feature', icon: <Package size={14} />, text: "Added 'Export as JSON' option for CSV files." },
      { type: 'improvement', icon: <Zap size={14} />, text: "Reduced memory overhead for long-running sessions by 15%." }
    ]
  },
  {
    version: "1.0.0",
    date: "May 10, 2024",
    tagline: "Public Launch",
    status: "Stable",
    type: "Major",
    changes: [
      { type: 'feature', icon: <Rocket size={14} />, text: "Initial release of Tree File with core JSON/YAML engine." },
      { type: 'feature', icon: <ShieldCheck size={14} />, text: "Native 100% Local Execution architecture." },
      { type: 'feature', icon: <Zap size={14} />, text: "Virtualized Table View for high-performance dataset viewing." }
    ]
  }
];

export default function ChangelogPage() {
  const navigateBack = (e: React.MouseEvent) => {
    e.preventDefault();
    window.dispatchEvent(new CustomEvent('navigate', { detail: '/' }));
  };

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-white transition-colors duration-300">
      <Navbar />
      
      <main className="relative pt-32 pb-32 px-6 overflow-hidden">
        <HeroBackground />
        
        <div className="max-w-4xl mx-auto relative">
          
          {/* Back Button - Minimalist on the Left */}
          <div className="absolute -left-4 lg:-left-20 top-0">
            <Tooltip content="Back Home" side="right">
              <motion.button 
                onClick={navigateBack}
                whileHover={{ scale: 1.1, x: -4 }}
                whileTap={{ scale: 0.9 }}
                className="w-12 h-12 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 shadow-lg flex items-center justify-center text-slate-600 dark:text-slate-400 hover:text-teal-500 dark:hover:text-teal-400 transition-colors"
              >
                <ArrowLeft size={20} strokeWidth={2.5} />
              </motion.button>
            </Tooltip>
          </div>

          {/* Header Section - Improved Typography */}
          <header className="mb-24 lg:pl-4">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-8 bg-teal-500" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-teal-600 dark:text-teal-400">Release Journal</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-slate-900 dark:text-white mb-6">
              Building <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-emerald-500">Tree File.</span>
            </h1>
            
            <p className="text-xl text-slate-500 dark:text-slate-400 leading-relaxed max-w-2xl font-medium">
              A timeline of updates, bug fixes, and performance engineering. We ship fast and keep your data local.
            </p>
          </header>

          {/* Timeline Section */}
          <div className="relative space-y-32">
            {/* Professional Timeline Spine */}
            <div className="absolute left-[39px] top-10 bottom-0 w-[2px] bg-slate-100 dark:bg-white/5" />

            {releases.map((release, i) => (
              <motion.div 
                key={release.version}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
                className="relative pl-24 group"
              >
                {/* Timeline Node Icon */}
                <div className={`absolute left-0 top-0 w-20 h-20 rounded-[2.5rem] flex items-center justify-center border-8 border-white dark:border-slate-950 shadow-2xl z-10 transition-transform duration-500 group-hover:scale-110 ${
                  i === 0 
                    ? 'bg-slate-950 dark:bg-white text-white dark:text-slate-950' 
                    : 'bg-slate-100 dark:bg-slate-900 text-slate-400'
                }`}>
                  <History size={28} strokeWidth={2.5} />
                </div>

                <div className="space-y-8">
                  {/* Release Meta */}
                  <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-100 dark:border-white/5 pb-8">
                    <div>
                      <div className="flex items-center gap-4 mb-3">
                        <h2 className="text-4xl font-black tracking-tight text-slate-900 dark:text-white">
                          v{release.version}
                        </h2>
                        <div className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${
                          i === 0 
                            ? 'bg-teal-500 text-slate-950' 
                            : 'bg-slate-100 dark:bg-white/5 text-slate-500'
                        }`}>
                          {release.status}
                        </div>
                      </div>
                      <p className="text-xl font-bold text-slate-400 dark:text-slate-500 tracking-tight leading-none">
                        {release.tagline}
                      </p>
                    </div>
                    
                    <div className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10">
                      <Calendar size={14} className="text-teal-500" />
                      <span className="text-[11px] font-black text-slate-600 dark:text-slate-300 uppercase tracking-widest whitespace-nowrap">
                        {release.date}
                      </span>
                    </div>
                  </div>

                  {/* Change Items Card */}
                  <div className="grid grid-cols-1 gap-4">
                    {release.changes.map((change, j) => (
                      <motion.div 
                        key={j}
                        whileHover={{ x: 10 }}
                        className="flex items-start gap-6 p-6 rounded-[2rem] bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/5 shadow-sm hover:border-teal-500/30 transition-all"
                      >
                        <div className={`mt-0.5 p-3 rounded-xl shrink-0 ${
                          change.type === 'feature' ? 'bg-teal-500/10 text-teal-600 dark:text-teal-400' :
                          change.type === 'fix' ? 'bg-rose-500/10 text-rose-600 dark:text-rose-400' :
                          'bg-blue-500/10 text-blue-600 dark:text-blue-400'
                        }`}>
                          {/* Explicitly type the cloned element to allow 'size' prop and satisfy TS overload for Lucide icons */}
                          {React.cloneElement(change.icon as React.ReactElement<any>, { size: 18, strokeWidth: 2.5 })}
                        </div>
                        <div className="space-y-1">
                          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                            {change.type}
                          </span>
                          <p className="text-slate-700 dark:text-slate-200 font-medium leading-relaxed">
                            {change.text}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              {/* Corrected closing tag from fm.div to motion.div */}
              </motion.div>
            ))}
          </div>

          {/* Call to Action Footer */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-40 p-12 lg:p-20 rounded-[4rem] bg-slate-900 dark:bg-white text-white dark:text-slate-950 flex flex-col items-center text-center relative overflow-hidden shadow-2xl"
          >
            <div className="absolute top-0 right-0 w-80 h-80 bg-teal-500/20 blur-[100px] rounded-full -mr-40 -mt-40" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-500/10 blur-[100px] rounded-full -ml-40 -mb-40" />
            
            <div className="relative z-10 max-w-lg">
              <div className="w-20 h-20 bg-teal-500 rounded-3xl flex items-center justify-center text-slate-950 mx-auto mb-10 rotate-3">
                <Layers size={40} />
              </div>
              <h3 className="text-4xl font-black mb-6 tracking-tight">Stay updated.</h3>
              <p className="text-slate-400 dark:text-slate-600 mb-10 text-lg font-medium">
                We're constantly adding features to make Tree File the fastest data viewer in your toolkit. Suggest changes on GitHub.
              </p>
              <a 
                href="https://github.com/lokmanelouk/Tree-file" 
                target="_blank"
                className="inline-flex items-center gap-4 px-10 py-5 bg-teal-500 text-slate-950 rounded-[2rem] font-black text-lg hover:scale-105 transition-all shadow-xl shadow-teal-500/20"
              >
                GitHub Repository
                <ChevronRight size={20} />
              </a>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
