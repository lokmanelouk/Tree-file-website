import React from 'react';
import { motion } from 'framer-motion';
import { Download, FileJson, Brain, Info, Terminal, AlertCircle, Laptop, Apple } from 'lucide-react';

const steps = [
  {
    icon: <Download className="text-blue-500" />,
    title: "Step 1: Download & Install",
    description: "Get the installer for your platform. Our desktop app is built with Electron for native performance.",
    tip: "Security Note: Tree File is independently developed. See the help card below if you get system warnings."
  },
  {
    icon: <FileJson className="text-emerald-500" />,
    title: "Step 2: Open Your Data",
    description: "Drag and drop any JSON, YAML, XML, or CSV file directly into the application window.",
    tip: "You can also associate Tree File as your default viewer for these file types."
  },
  {
    icon: <Brain className="text-purple-500" />,
    title: "Step 3: Analyze with AI",
    description: "Click the Brain icon or use the Command Palette to chat with your data using Gemini AI.",
    tip: "Ask complex questions like 'Find all users who haven't logged in this month' instantly."
  }
];

export const HowToUse: React.FC = () => {
  return (
    <section id="guide" className="py-24 px-6 bg-slate-50 dark:bg-slate-900/50 scroll-mt-24">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4 tracking-tight">Get Started in 3 Steps</h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">From download to deep data insights in less than 60 seconds.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-8 rounded-[2.5rem] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm dark:shadow-none"
            >
              <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-6">
                {step.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">{step.title}</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm mb-6 leading-relaxed">
                {step.description}
              </p>
              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex gap-3">
                <Info size={16} className="text-teal-500 shrink-0 mt-0.5" />
                <p className="text-xs text-slate-500 dark:text-slate-500 leading-relaxed italic">
                  {step.tip}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="max-w-4xl mx-auto p-8 md:p-12 rounded-[3rem] bg-slate-900 text-white relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/10 blur-[80px] rounded-full -mr-20 -mt-20" />
          
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-8">
              <AlertCircle className="text-teal-400" size={28} />
              <h3 className="text-2xl font-bold">Installation Help</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Laptop size={18} className="text-slate-400" />
                  <span className="font-bold text-slate-200">Windows SmartScreen</span>
                </div>
                <p className="text-slate-400 text-sm leading-relaxed mb-4">
                  If Windows shows a warning:
                </p>
                <div className="bg-slate-800/50 p-3 rounded-lg border border-slate-700 text-xs font-mono text-teal-300">
                  Click "More Info" &rarr; "Run Anyway"
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Apple size={18} className="text-slate-400" />
                  <span className="font-bold text-slate-200">macOS Gatekeeper</span>
                </div>
                <p className="text-slate-400 text-sm leading-relaxed mb-4">
                  If macOS says the app is "Damaged", run this in Terminal:
                </p>
                <div className="group relative">
                  <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 text-xs font-mono text-emerald-400 overflow-x-auto whitespace-nowrap">
                    xattr -cr /Applications/Tree\ File.app
                  </div>
                  <Terminal size={14} className="absolute right-3 top-3 text-slate-700" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};