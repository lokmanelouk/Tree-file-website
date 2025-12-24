import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Command, Palette, Zap, Globe, Keyboard } from 'lucide-react';

const BentoCard = ({ children, className, delay = 0 }: { children?: React.ReactNode, className?: string, delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay }}
    whileHover={{ y: -5 }}
    className={`relative overflow-hidden rounded-[2.5rem] border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900/50 backdrop-blur-xl p-8 group transition-all duration-300 hover:shadow-2xl hover:shadow-teal-500/10 ${className}`}
  >
    <div className="absolute inset-0 bg-gradient-to-br from-teal-500/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    {children}
  </motion.div>
);

export const BentoGrid: React.FC = () => {
  return (
    <section id="philosophy" className="py-12 px-6 max-w-7xl mx-auto scroll-mt-24">
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-4 tracking-tight">Built different.</h2>
        <p className="text-slate-500 dark:text-slate-400 text-lg max-w-xl mx-auto font-medium">The details that make Tree File the preferred tool for senior engineers.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-6">
        <BentoCard className="md:col-span-2 md:row-span-2 flex flex-col justify-end min-h-[400px]">
          <div className="mb-8 w-14 h-14 rounded-2xl bg-teal-500/10 flex items-center justify-center text-teal-600 dark:text-teal-400">
            <Shield size={32} strokeWidth={2.5} />
          </div>
          <h3 className="text-3xl font-black text-slate-900 dark:text-white mb-4">100% Local First</h3>
          <p className="text-slate-500 dark:text-slate-400 text-lg leading-relaxed font-medium">
            Your data never touches the cloud. All parsing and AI analysis happens right on your machine. Privacy isn't a feature; it's our foundation.
          </p>
          <div className="mt-8 flex gap-3">
            <div className="px-4 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400">No Servers</div>
            <div className="px-4 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400">Offline Ready</div>
          </div>
        </BentoCard>

        <BentoCard className="md:col-span-1 md:row-span-1 flex flex-col items-center justify-center text-center py-10" delay={0.1}>
          <div className="mb-6 p-4 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/5 flex items-center gap-2 font-mono text-sm font-black shadow-inner">
            <Command size={16} />
            <span>K</span>
          </div>
          <h4 className="font-black text-slate-900 dark:text-white text-base">Keyboard Power</h4>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 px-4 font-medium">Lightning fast command palette for every action.</p>
        </BentoCard>

        <BentoCard className="md:col-span-1 md:row-span-1 flex flex-col items-center justify-center text-center py-10" delay={0.2}>
          <div className="relative w-12 h-12 mb-6">
            <div className="absolute inset-0 rounded-2xl border-2 border-slate-200 dark:border-slate-700 overflow-hidden bg-slate-50 dark:bg-slate-800">
               <div className="absolute inset-0 w-1/2 bg-slate-900 dark:bg-white" />
            </div>
          </div>
          <h4 className="font-black text-slate-900 dark:text-white text-base">Full Control</h4>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 px-4 font-medium">Deep dark modes and vibrant light themes.</p>
        </BentoCard>

        <BentoCard className="md:col-span-2 md:row-span-1 flex items-center gap-8" delay={0.3}>
          <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shrink-0">
            <Zap size={28} />
          </div>
          <div>
            <h4 className="font-black text-xl text-slate-900 dark:text-white">Instant Parsing</h4>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 leading-relaxed font-medium">
              Optimized Electron core handles 50MB+ JSON files in milliseconds without freezing.
            </p>
          </div>
        </BentoCard>
      </div>
    </section>
  );
};