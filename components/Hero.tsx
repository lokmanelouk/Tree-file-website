import React from 'react';
import { motion } from 'framer-motion';
import { Laptop, Apple, ArrowRight, ChevronDown, ChevronRight, Github } from 'lucide-react';
import { HeroBackground } from './HeroBackground';

export const Hero: React.FC = () => {
  return (
    <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden px-6">
      <HeroBackground />
      
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
        
        {/* Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative z-10 text-center lg:text-left pt-10"
        >
          <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-slate-100 dark:bg-teal-500/10 border border-slate-200 dark:border-teal-500/20 text-slate-600 dark:text-teal-400 text-[10px] font-black uppercase tracking-[0.2em] mb-10 backdrop-blur-sm">
            ✨ Version 1.2.0 Now Available
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-[5.2rem] font-black text-slate-900 dark:text-white leading-[1.1] mb-8 tracking-tight">
            The Modern Data Viewer for <br className="hidden xl:block" /> 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-emerald-600 dark:from-teal-400 dark:to-emerald-500">Developers.</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 mb-12 max-w-xl mx-auto lg:mx-0 leading-relaxed font-medium">
            Visualize, Edit, and Analyze complex nested structures with lightning speed. Designed specifically for massive JSON, YAML, and XML trees.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-5">
            <motion.a 
              href="/download"
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="w-full sm:w-auto px-10 py-5 bg-teal-500 hover:bg-teal-400 text-slate-950 rounded-2xl font-black text-lg flex items-center justify-center gap-3 transition-all hover:shadow-[0_0_30px_rgba(20,184,166,0.4)] shadow-xl shadow-teal-500/5 group"
            >
              <Laptop size={24} />
              Download App
              <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
            </motion.a>
            
            <motion.a 
              href="https://github.com/lokmanelouk/Tree-file"
              target="_blank"
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="w-full sm:w-auto px-10 py-5 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-900 dark:text-white rounded-2xl font-black text-lg border-2 border-slate-200 dark:border-slate-800 hover:border-teal-500/50 flex items-center justify-center gap-3 transition-all shadow-sm dark:shadow-none"
            >
              <Github size={24} />
              Star on GitHub
            </motion.a>
          </div>
          
          <p className="mt-10 text-slate-400 dark:text-slate-500 text-sm font-bold flex items-center justify-center lg:justify-start gap-2 uppercase tracking-widest">
            <span className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-pulse" />
            100% Privacy Focused • Works Offline
          </p>
        </motion.div>

        {/* Visual / UI Mockup - Shifted down slightly per user request */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative lg:pt-20 flex items-center justify-center"
        >
          {/* Backdrop Glow */}
          <div className="absolute top-[60%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] bg-teal-500/5 dark:bg-teal-500/10 blur-[100px] rounded-full" />
          
          <div className="relative w-full max-w-2xl bg-[#0d1117] rounded-[2.5rem] border border-slate-800 shadow-2xl overflow-hidden group">
            {/* Window Header */}
            <div className="h-12 bg-[#161b22] flex items-center px-6 gap-2 border-b border-slate-800/50">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
              </div>
              <div className="ml-4 text-[11px] text-slate-500 font-mono tracking-wide">
                cluster_manifest_v2.json
              </div>
            </div>
            
            {/* Precision Tree View Logic */}
            <div className="p-10 font-mono text-[13px] leading-relaxed select-none h-[450px] bg-[#0d1117] overflow-hidden">
              {/* deployment_nodes root */}
              <div className="flex items-center gap-2 mb-1">
                <ChevronDown size={14} className="text-slate-500" />
                <span className="text-[#79c0ff] font-bold">deployment_nodes:</span>
                <span className="text-slate-500 italic">Array(2)</span>
              </div>

              {/* Index 0 */}
              <div className="relative ml-[7px] pl-6 pt-1">
                <div className="absolute left-0 top-0 bottom-4 w-px bg-white/10" />
                
                <div className="relative flex items-center gap-2 mb-1 h-7">
                  <div className="absolute -left-6 top-1/2 -translate-y-1/2 w-4 h-px bg-white/10" />
                  <ChevronDown size={14} className="text-slate-500" />
                  <span className="text-[#79c0ff] font-bold">0:</span>
                  <span className="text-slate-500 italic">Object</span>
                </div>

                {/* Sub-object contents */}
                <div className="relative ml-[7px] pl-6 space-y-0.5">
                  <div className="absolute left-0 top-0 bottom-4 w-px bg-white/10" />
                  
                  <div className="relative flex items-center gap-2 h-6">
                    <div className="absolute -left-6 top-1/2 -translate-y-1/2 w-4 h-px bg-white/10" />
                    <span className="text-[#79c0ff] font-bold">region:</span>
                    <span className="text-[#a5d6ff]">"us-east-1-production"</span>
                  </div>
                  
                  <div className="relative flex items-center gap-2 h-6">
                    <div className="absolute -left-6 top-1/2 -translate-y-1/2 w-4 h-px bg-white/10" />
                    <span className="text-[#79c0ff] font-bold">instance_type:</span>
                    <span className="text-[#a5d6ff]">"c6g.2xlarge"</span>
                  </div>

                  {/* auto_scaling nested object */}
                  <div className="relative py-1">
                    <div className="absolute -left-6 top-[18px] w-4 h-px bg-white/10" />
                    <div className="flex items-center gap-2 h-7">
                      <ChevronDown size={14} className="text-slate-500" />
                      <span className="text-[#79c0ff] font-bold">auto_scaling:</span>
                      <span className="text-slate-500 italic">Object</span>
                    </div>

                    <div className="relative ml-[7px] pl-6 space-y-0.5 pt-1">
                      <div className="absolute left-0 top-0 bottom-3 w-px bg-white/10" />
                      
                      <div className="relative flex items-center gap-2 h-6">
                        <div className="absolute -left-6 top-1/2 -translate-y-1/2 w-4 h-px bg-white/10" />
                        <span className="text-[#79c0ff]">min_nodes:</span>
                        <span className="text-[#ff7b72]">4</span>
                      </div>
                      <div className="relative flex items-center gap-2 h-6">
                        <div className="absolute -left-6 top-1/2 -translate-y-1/2 w-4 h-px bg-white/10" />
                        <span className="text-[#79c0ff]">max_nodes:</span>
                        <span className="text-[#ff7b72]">24</span>
                      </div>
                    </div>
                  </div>

                  <div className="relative flex items-center gap-2 h-7 opacity-50">
                    <div className="absolute -left-6 top-1/2 -translate-y-1/2 w-4 h-px bg-white/10" />
                    <ChevronRight size={14} className="text-slate-500" />
                    <span className="text-[#79c0ff] font-bold">active_services:</span>
                    <span className="text-slate-500 italic">Array(112)</span>
                  </div>
                </div>
              </div>

              {/* Floating AI Insight Prompt */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.6 }}
                className="absolute bottom-10 right-10 bg-teal-500/10 backdrop-blur-xl border border-teal-500/30 p-5 rounded-[2.5rem] shadow-2xl max-w-[240px] transform hover:-translate-y-1 transition-transform"
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 rounded-full bg-teal-500 animate-pulse" />
                  <span className="text-[10px] font-black text-teal-400 uppercase tracking-widest">Local Insight</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed font-medium">
                  Analysis complete: <span className="text-teal-400 font-bold">12 orphan services</span> detected. Optimize cluster?
                </p>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};