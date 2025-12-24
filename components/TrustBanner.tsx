import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Github, WifiOff, Globe, Lock, Cpu, ServerOff } from 'lucide-react';

const trustItems = [
  { 
    icon: <ServerOff size={32} />, 
    label: "100% Local Execution", 
    sub: "Your data stays on your metal. We don't have servers that store your files—everything happens in a sandboxed local environment.",
    gradient: "from-teal-500/10 to-transparent",
    accent: "text-teal-500",
    border: "border-teal-500/20"
  },
  { 
    icon: <Github size={32} />, 
    label: "Open Source Verified", 
    sub: "Total transparency. Audit the core renderer, the security model, and the AI integration directly on GitHub anytime.",
    gradient: "from-blue-500/10 to-transparent",
    accent: "text-blue-500",
    border: "border-blue-500/20"
  },
  { 
    icon: <WifiOff size={32} />, 
    label: "Full Offline Autonomy", 
    sub: "Zero dependencies on cloud connectivity. Tree File is the perfect companion for air-gapped dev environments and sensitive ops.",
    gradient: "from-emerald-500/10 to-transparent",
    accent: "text-emerald-500",
    border: "border-emerald-500/20"
  },
];

export const TrustBanner: React.FC = () => {
  return (
    <section className="py-12 md:py-20 px-6 relative overflow-hidden bg-slate-50/30 dark:bg-slate-950/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white mb-6 tracking-tight">
            Engineered for <span className="text-teal-500">Security.</span>
          </h2>
          <p className="text-slate-500 dark:text-slate-400 max-w-xl mx-auto text-lg font-medium">
            We built Tree File because professional developers shouldn't have to choose between convenience and security.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {trustItems.map((item, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.8 }}
              className={`relative group p-10 rounded-[3rem] bg-white dark:bg-slate-900 border ${item.border} hover:shadow-2xl transition-all duration-500`}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-100 transition-opacity rounded-[3rem]`} />
              
              <div className="relative z-10">
                <div className={`w-20 h-20 rounded-[2rem] bg-slate-100 dark:bg-white/5 flex items-center justify-center ${item.accent} mb-8 group-hover:scale-110 transition-transform duration-500`}>
                  {item.icon}
                </div>
                <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-4 leading-tight">
                  {item.label}
                </h3>
                <p className="text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                  {item.sub}
                </p>
              </div>

              <div className="absolute top-6 right-6 opacity-5 group-hover:opacity-10 transition-opacity">
                <Lock size={64} className={item.accent} />
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 flex flex-wrap items-center justify-center gap-x-12 gap-y-8 grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-700">
           <div className="flex items-center gap-3 text-sm font-black uppercase tracking-widest text-slate-400">
              <ShieldCheck size={20} className="text-teal-500" />
              SOC2 COMPLIANT STACK
           </div>
           <div className="flex items-center gap-3 text-sm font-black uppercase tracking-widest text-slate-400">
              <Globe size={20} className="text-blue-500" />
              GLOBAL DEV STANDARD
           </div>
           <div className="flex items-center gap-3 text-sm font-black uppercase tracking-widest text-slate-400">
              <Cpu size={20} className="text-emerald-500" />
              ZERO LATENCY CORE
           </div>
        </div>
      </div>
    </section>
  );
};
