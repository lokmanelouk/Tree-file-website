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
import { Footer } from '@/components/Footer';

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
      <Footer/>
    </div>
  );
}