import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, FileJson, Terminal, Search, MoreHorizontal } from 'lucide-react';

export const ComparisonSlider: React.FC = () => {
  const [sliderPosition, setSliderPosition] = useState(55);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (event: React.MouseEvent | React.TouchEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = 'touches' in event ? event.touches[0].clientX : (event as React.MouseEvent).clientX;
    const position = ((x - rect.left) / rect.width) * 100;
    setSliderPosition(Math.max(0, Math.min(100, position)));
  };

  return (
    <section id="comparison" className="py-12 md:py-20 px-6 max-w-7xl mx-auto relative overflow-hidden scroll-mt-24">
      <div className="text-center mb-12 relative z-10">
        <h2 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white mb-6 tracking-tight leading-tight">
          Stop squinting at <br /> <span className="text-teal-500 font-extrabold italic">raw text nightmares.</span>
        </h2>
        <p className="text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto font-medium">
          Tree File maps your data into a logical architecture. Drag the slider to witness the clarity.
        </p>
      </div>

      <motion.div 
        ref={containerRef}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative h-[650px] w-full rounded-[3.5rem] overflow-hidden border border-slate-200 dark:border-white/10 shadow-[0_32px_64px_-12px_rgba(0,0,0,0.15)] cursor-ew-resize select-none"
        onMouseMove={handleMove}
        onTouchMove={handleMove}
      >
        {/* --- BEFORE: Raw Data Side --- */}
        <div className="absolute inset-0 bg-slate-50 dark:bg-[#0b0e14] p-10 md:p-16 overflow-hidden">
          <div className="font-mono text-[11px] leading-tight text-slate-400 dark:text-slate-700 opacity-30 select-none uppercase tracking-tighter break-all">
            {`{"config":{"theme":"dark","version":"1.2.0","users":{"count":20000,"data":[{"id":101,"name":"Lokman","role":"admin","perms":["*"]},{"id":102,"name":"Guest","role":"viewer","perms":["read"]}]},"active":true}}`.repeat(20)}
          </div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center opacity-10 pointer-events-none">
            <Terminal size={140} className="text-slate-400" />
            <span className="text-xl font-black uppercase tracking-[1.5em] mt-4">Wall of Text</span>
          </div>
        </div>

        {/* --- AFTER: Requested Tree View UI --- */}
        <div 
          className="absolute inset-0 bg-white dark:bg-[#0d1117] font-mono text-[13px] overflow-hidden pointer-events-none"
          style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
        >
          {/* Editor Header */}
          <div className="h-14 bg-slate-100 dark:bg-[#161b22] border-b border-slate-200 dark:border-white/5 flex items-center px-8 justify-between">
            <div className="flex items-center gap-3">
              <FileJson size={16} className="text-teal-500" />
              <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">application_config.json</span>
            </div>
            <div className="flex items-center gap-6">
               <div className="flex items-center gap-2 text-slate-400 text-[10px] font-bold">
                 <Search size={14} />
                 <span>Find key...</span>
               </div>
               <div className="flex gap-1.5">
                 <div className="w-3 h-3 rounded-full bg-slate-300 dark:bg-white/10" />
                 <div className="w-3 h-3 rounded-full bg-slate-300 dark:bg-white/10" />
                 <div className="w-3 h-3 rounded-full bg-slate-300 dark:bg-white/10" />
               </div>
            </div>
          </div>

          {/* Tree View Mockup */}
          <div className="p-10 space-y-1 overflow-auto h-full bg-white dark:bg-[#0d1117]">
            
            {/* config root */}
            <div className="flex items-center gap-2">
              <ChevronDown size={14} className="text-slate-400 dark:text-slate-500" />
              <span className="text-[#005cc5] dark:text-[#79c0ff] font-bold">config</span>
            </div>

            {/* Level 1 Wrapper */}
            <div className="relative ml-[7px] pl-6 py-1">
              {/* Vertical Continuity Line */}
              <div className="absolute left-0 top-0 bottom-4 w-px bg-slate-200 dark:bg-white/10" />

              {/* theme leaf */}
              <div className="relative flex items-center gap-2 h-7">
                <div className="absolute -left-6 top-1/2 -translate-y-1/2 w-4 h-px bg-slate-200 dark:bg-white/10" />
                <span className="text-[#005cc5] dark:text-[#79c0ff] font-bold">theme:</span>
                <span className="text-[#22863a] dark:text-[#a5d6ff]">"dark"</span>
              </div>

              {/* version leaf */}
              <div className="relative flex items-center gap-2 h-7">
                <div className="absolute -left-6 top-1/2 -translate-y-1/2 w-4 h-px bg-slate-200 dark:bg-white/10" />
                <span className="text-[#005cc5] dark:text-[#79c0ff] font-bold">version:</span>
                <span className="text-[#d73a49] dark:text-[#ff7b72]">1.2.0</span>
              </div>

              {/* users array root */}
              <div className="relative py-1">
                <div className="absolute -left-6 top-[18px] w-4 h-px bg-slate-200 dark:bg-white/10" />
                <div className="flex items-center gap-2 h-7">
                  <ChevronDown size={14} className="text-slate-400 dark:text-slate-500" />
                  <span className="text-[#005cc5] dark:text-[#79c0ff] font-bold">users</span>
                  <span className="text-slate-400 dark:text-slate-500 italic">(Array [20,000 items])</span>
                </div>

                {/* Level 2 Wrapper (Inside users array) */}
                <div className="relative ml-[7px] pl-6 pt-1 space-y-1">
                   {/* Vertical line for users array children */}
                   <div className="absolute left-0 top-0 bottom-4 w-px bg-slate-200 dark:bg-white/10" />
                   
                   {/* User 0 */}
                   <div className="relative">
                      <div className="absolute -left-6 top-[14px] w-4 h-px bg-slate-200 dark:bg-white/10" />
                      <div className="flex items-center gap-2 h-7">
                        <ChevronDown size={14} className="text-slate-400 dark:text-slate-500" />
                        <span className="text-[#005cc5] dark:text-[#79c0ff] font-bold">0</span>
                      </div>
                      
                      {/* Level 3 Wrapper (Inside user 0 object) */}
                      <div className="relative ml-[7px] pl-6 space-y-0.5">
                        <div className="absolute left-0 top-0 bottom-3 w-px bg-slate-200 dark:bg-white/10" />
                        <div className="relative flex items-center gap-2 h-6">
                          <div className="absolute -left-6 top-1/2 -translate-y-1/2 w-4 h-px bg-slate-200 dark:bg-white/10" />
                          <span className="text-[#005cc5] dark:text-[#79c0ff] font-bold">id:</span>
                          <span className="text-[#d73a49] dark:text-[#ff7b72]">101</span>
                        </div>
                        <div className="relative flex items-center gap-2 h-6">
                          <div className="absolute -left-6 top-1/2 -translate-y-1/2 w-4 h-px bg-slate-200 dark:bg-white/10" />
                          <span className="text-[#005cc5] dark:text-[#79c0ff] font-bold">name:</span>
                          <span className="text-[#22863a] dark:text-[#a5d6ff]">"Lokman"</span>
                        </div>
                      </div>
                   </div>

                   {/* User 1 */}
                   <div className="relative mt-2">
                      <div className="absolute -left-6 top-[14px] w-4 h-px bg-slate-200 dark:bg-white/10" />
                      <div className="flex items-center gap-2 h-7">
                        <ChevronDown size={14} className="text-slate-400 dark:text-slate-500" />
                        <span className="text-[#005cc5] dark:text-[#79c0ff] font-bold">1</span>
                      </div>
                      
                      <div className="relative ml-[7px] pl-6 space-y-0.5">
                        <div className="absolute left-0 top-0 bottom-3 w-px bg-slate-200 dark:bg-white/10" />
                        <div className="relative flex items-center gap-2 h-6">
                          <div className="absolute -left-6 top-1/2 -translate-y-1/2 w-4 h-px bg-slate-200 dark:bg-white/10" />
                          <span className="text-[#005cc5] dark:text-[#79c0ff] font-bold">id:</span>
                          <span className="text-[#d73a49] dark:text-[#ff7b72]">102</span>
                        </div>
                        <div className="relative flex items-center gap-2 h-6">
                          <div className="absolute -left-6 top-1/2 -translate-y-1/2 w-4 h-px bg-white/10" />
                          <span className="text-[#005cc5] dark:text-[#79c0ff] font-bold">name:</span>
                          <span className="text-[#22863a] dark:text-[#a5d6ff]">"Guest"</span>
                        </div>
                      </div>
                   </div>

                   {/* PAGINATION: The "Next items" part */}
                   <div className="relative mt-4 flex items-center gap-2 h-8 group/paginator">
                      <div className="absolute -left-6 top-1/2 -translate-y-1/2 w-4 h-px bg-slate-200 dark:bg-white/10" />
                      <div className="flex items-center gap-3 px-3 py-1.5 rounded-lg bg-teal-500/5 dark:bg-teal-500/10 border border-teal-500/20 text-teal-600 dark:text-teal-400 text-[11px] font-bold uppercase tracking-wider cursor-pointer hover:bg-teal-500/20 transition-colors">
                        <MoreHorizontal size={14} />
                        ... (Show next 50 items)
                      </div>
                   </div>
                </div>
              </div>

              {/* active leaf */}
              <div className="relative flex items-center gap-2 h-7 mt-2">
                {/* Last elbow connector for the config level */}
                <div className="absolute -left-6 top-1/2 -translate-y-1/2 w-4 h-px bg-slate-200 dark:bg-white/10" />
                <span className="text-[#005cc5] dark:text-[#79c0ff] font-bold">active:</span>
                <span className="text-[#005cc5] dark:text-[#79c0ff]">true</span>
              </div>
            </div>
          </div>

          <div className="absolute bottom-12 left-12 px-8 py-3 bg-teal-500 text-slate-950 text-sm font-black rounded-full shadow-[0_10px_40px_rgba(20,184,166,0.5)]">
             OPTIMIZED PERFORMANCE
          </div>
        </div>

        {/* --- DYNAMIC SLIDER HANDLE --- */}
        <div 
          className="absolute inset-y-0 w-1 bg-teal-500 shadow-[0_0_40px_rgba(20,184,166,1)] z-50 pointer-events-none flex items-center justify-center"
          style={{ left: `${sliderPosition}%` }}
        >
          <div className="w-12 h-12 bg-white dark:bg-[#161b22] border-4 border-teal-500 rounded-2xl flex items-center justify-center text-teal-500 shadow-2xl">
            <div className="flex flex-col gap-1 items-center">
              <div className="flex gap-1">
                <div className="w-0.5 h-3 bg-teal-500 rounded-full" />
                <div className="w-0.5 h-3 bg-teal-500 rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};
