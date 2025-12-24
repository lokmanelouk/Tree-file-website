'use client';

import React, { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { motion, Variants } from 'framer-motion';
import { 
  FolderTree, 
  Github, 
  Twitter, 
  Linkedin
} from 'lucide-react';

import { Tooltip } from '@/components/Tooltip';
import { TrustBanner } from '@/components/TrustBanner';
import { Features } from '@/components/Features';
import { FeatureShowcase } from '@/components/FeatureShowcase';
import { BentoGrid } from '@/components/BentoGrid';
import { ComparisonSlider } from '@/components/ComparisonSlider';
import { BottomCTA } from '@/components/BottomCTA';
import { Navbar } from '@/components/Navbar';
import { AIDemo } from '@/components/AIDemo';
import { FAQ } from '@/components/FAQ';
import { HowToUse } from '@/components/HowToUse';
import { Hero } from '@/components/Hero';

const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.8, 
      ease: [0.21, 0.47, 0.32, 0.98] as [number, number, number, number]
    }
  }
};

export default function LandingPage() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="relative min-h-screen font-sans selection:bg-teal-500/10 selection:text-teal-900 dark:selection:bg-teal-500/30 dark:selection:text-teal-200 bg-[#fcfcfd] dark:bg-slate-950 text-slate-900 dark:text-white transition-colors duration-500 overflow-x-hidden">
      <Navbar />
      
      {/* --- Dynamic Ambient Backgrounds --- */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-5%] left-[-5%] w-[60%] h-[60%] bg-teal-500/[0.03] dark:bg-teal-500/10 blur-[120px] rounded-full opacity-60" />
        <div className="absolute top-[25%] right-[-10%] w-[45%] h-[45%] bg-emerald-500/[0.03] dark:bg-emerald-500/10 blur-[140px] rounded-full opacity-40" />
        <div className="absolute bottom-[10%] left-[15%] w-[50%] h-[50%] bg-blue-500/[0.02] dark:bg-blue-500/5 blur-[160px] rounded-full opacity-30" />
      </div>

      <main className="relative z-10">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
          }}
        >
          <Hero />
        </motion.div>
        
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={sectionVariants}
          className="py-12 md:py-16"
        >
          <TrustBanner />
        </motion.section>
        
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={sectionVariants}
          className="py-16 md:py-20"
        >
          <ComparisonSlider />
        </motion.section>
        
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={sectionVariants}
          className="py-12 md:py-16"
        >
          <BentoGrid />
        </motion.section>
        
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={sectionVariants}
          className="py-16 md:py-24"
        >
          <FeatureShowcase />
        </motion.section>
        
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={sectionVariants}
          className="py-16 md:py-24"
        >
          <AIDemo />
        </motion.section>
        
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={sectionVariants}
          className="py-16 md:py-20"
        >
          <Features />
        </motion.section>
        
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={sectionVariants}
          className="py-16 md:py-20"
        >
          <HowToUse />
        </motion.section>
        
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={sectionVariants}
          className="py-16 md:py-20"
        >
          <FAQ />
        </motion.section>
        
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={sectionVariants}
          className="py-24 md:py-32 pb-48"
        >
          <BottomCTA />
        </motion.section>
      </main>

      <footer className="py-24 px-6 border-t border-slate-200 dark:border-white/5 bg-white/40 dark:bg-slate-950/50 backdrop-blur-md relative z-20">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <div className="flex items-center space-x-3 mb-6">
              <div className="bg-teal-500 p-2 rounded-xl shadow-xl shadow-teal-500/20">
                <FolderTree className="text-white" size={24} />
              </div>
              <span className="text-2xl font-black tracking-tighter text-slate-900 dark:text-white">Tree File</span>
            </div>
            <p className="text-slate-500 dark:text-slate-400 max-w-sm text-sm leading-relaxed mb-8 font-medium">
              The professional data viewer that treats your complex structures with the respect they deserve. Local-first, privacy-driven.
            </p>
            <div className="flex items-center gap-3">
              <Tooltip content="GitHub" side="top">
                <a href="https://github.com/lokmanelouk/Tree-file" target="_blank" className="p-3 rounded-2xl bg-white dark:bg-white/5 border border-slate-200 dark:border-transparent text-slate-400 hover:text-slate-900 dark:hover:text-white hover:border-teal-500/50 transition-all shadow-sm"><Github size={20} /></a>
              </Tooltip>
              <Tooltip content="Twitter" side="top">
                <a href="#" className="p-3 rounded-2xl bg-white dark:bg-white/5 border border-slate-200 dark:border-transparent text-slate-400 hover:text-[#1DA1F2] hover:border-[#1DA1F2]/50 transition-all shadow-sm"><Twitter size={20} fill="currentColor" /></a>
              </Tooltip>
              <Tooltip content="LinkedIn" side="top">
                <a href="#" className="p-3 rounded-2xl bg-white dark:bg-white/5 border border-slate-200 dark:border-transparent text-slate-400 hover:text-[#0A66C2] hover:border-[#0A66C2]/50 transition-all shadow-sm"><Linkedin size={20} fill="currentColor" /></a>
              </Tooltip>
            </div>
          </div>
          
          <div className="flex flex-col md:items-end text-sm text-slate-500 space-y-4">
            <p className="font-black text-slate-900 dark:text-white mb-2 uppercase tracking-widest text-[10px]">Resources</p>
            <a href="/docs" className="hover:text-teal-600 dark:hover:text-teal-500 transition-colors font-bold">Documentation</a>
            <a href="/download" className="hover:text-teal-600 dark:hover:text-teal-500 transition-colors font-bold">Downloads</a>
            <a href="/privacy" className="hover:text-teal-600 dark:hover:text-teal-500 transition-colors font-bold">Privacy Policy</a>
            <p className="pt-6 opacity-60 text-xs">&copy; {new Date().getFullYear()} Tree File Project. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}