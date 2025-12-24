
import React from 'react';
import { motion, Variants } from 'framer-motion';
import { Layers, Sparkles, Split, Wand2, FileCode, Zap } from 'lucide-react';

const featureList = [
  {
    title: "Tree & Raw Views",
    description: "Switch instantly between a structured visual hierarchy and raw text editing. Best of both worlds.",
    icon: <Layers className="text-teal-600 dark:text-teal-400" />,
    className: "md:col-span-2 md:row-span-1",
    gradient: "from-teal-500/10 dark:from-teal-500/20 to-transparent"
  },
  {
    title: "AI Assistant",
    description: "Ask natural language questions about your data structures using Gemini.",
    icon: <Sparkles className="text-emerald-600 dark:text-emerald-400" />,
    className: "md:col-span-1 md:row-span-2",
    gradient: "from-emerald-500/10 dark:from-emerald-500/20 to-transparent"
  },
  {
    title: "Smart Diff",
    description: "Compare complex JSON/YAML files side-by-side with structural highlighting.",
    icon: <Split className="text-blue-600 dark:text-blue-400" />,
    className: "md:col-span-1 md:row-span-1",
    gradient: "from-blue-500/10 dark:from-blue-500/20 to-transparent"
  },
  {
    title: "Data Cleanup",
    description: "One-click tools to sort keys, trim whitespace, and minify massive files.",
    icon: <Wand2 className="text-purple-600 dark:text-purple-400" />,
    className: "md:col-span-1 md:row-span-1",
    gradient: "from-purple-500/10 dark:from-purple-500/20 to-transparent"
  },
  {
    title: "Type Generator",
    description: "Instantly turn any data structure into clean TypeScript interfaces or Zod schemas.",
    icon: <FileCode className="text-orange-600 dark:text-orange-400" />,
    className: "md:col-span-2 md:row-span-1",
    gradient: "from-orange-500/10 dark:from-orange-500/20 to-transparent"
  }
];

// Explicitly type cardVariants as Variants and cast 'ease' to a fixed-size tuple
// to satisfy strict Framer Motion and TypeScript easing definitions.
const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.7,
      ease: [0.21, 0.47, 0.32, 0.98] as [number, number, number, number],
    },
  }),
};

export const Features: React.FC = () => {
  return (
    <section id="features" className="py-24 px-6 relative scroll-mt-20">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4 tracking-tighter">Precision tools for modern dev.</h2>
          <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">Everything you need to handle massive, complex data sets without losing your mind.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featureList.map((f, i) => (
            <motion.div
              key={i}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={cardVariants}
              whileHover={{ y: -5 }}
              className={`relative overflow-hidden p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col justify-between group shadow-sm dark:shadow-none transition-all duration-300 ${f.className}`}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${f.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  {f.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-3">{f.title}</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{f.description}</p>
              </div>

              <div className="absolute top-4 right-4 text-slate-200 dark:text-slate-800 pointer-events-none transition-colors">
                <Zap size={24} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
