import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    question: "Why does Windows/Mac show a security warning?",
    answer: "Tree File is an independent open-source project. We haven't yet paid for expensive code-signing certificates from Microsoft or Apple. You can safely bypass these warnings by clicking 'More Info' on Windows or running a simple command in Terminal on macOS. Your data remains perfectly safe."
  },
  {
    question: "Is my data safe?",
    answer: "Absolutely. Tree File is strictly local-first. All parsing, AI analysis (via local SDK), and visualization happen entirely on your machine. No data is ever uploaded to our servers, and it works completely offline."
  },
  {
    question: "Is it really free?",
    answer: "Yes! Tree File is open-source under the MIT License. It is free for personal, academic, and commercial use. You can even contribute to its development on GitHub."
  },
  {
    question: "Does it support huge files?",
    answer: "Yes, it is built with an optimized Electron core capable of handling JSON and CSV files up to 500MB without performance degradation, using virtualization for the tree views."
  }
];

export const FAQ: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="py-24 px-6 bg-slate-50 dark:bg-slate-900/30 scroll-mt-24">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black text-slate-900 dark:text-white mb-4">Common Questions</h2>
          <p className="text-slate-500 dark:text-slate-400">Everything you need to know about getting started with Tree File.</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div 
              key={i} 
              className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-sm dark:shadow-none transition-all hover:border-teal-500/30"
            >
              <button
                onClick={() => setActiveIndex(activeIndex === i ? null : i)}
                className="w-full flex items-center justify-between p-6 text-left"
              >
                <span className="font-bold text-lg text-slate-900 dark:text-white pr-8 leading-snug">
                  {faq.question}
                </span>
                <motion.div
                  animate={{ rotate: activeIndex === i ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown className="text-slate-400" />
                </motion.div>
              </button>
              <AnimatePresence>
                {activeIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <div className="p-6 pt-0 text-slate-600 dark:text-slate-400 leading-relaxed">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
