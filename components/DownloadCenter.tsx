import React, { useState } from 'react';
import { Apple, Laptop, Github, ChevronRight, Download, Terminal, Fingerprint, Shield } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Tooltip } from './Tooltip';

export const DownloadCenter: React.FC = () => {
  const versions = [
    {
      version: "1.2.0",
      date: "Latest Stable (december 2025)",
      platforms: [
        { name: "Windows", ext: ".exe", link: "#", icon: <Laptop size={18} />, checksum: "sha256: 4f8a...92b1" },
        { name: "macOS", ext: ".dmg", link: "#", icon: <Apple size={18} />, checksum: "sha256: 1d2c...f4e8" },
        { name: "Linux", ext: ".AppImage", link: "#", icon: <Terminal size={18} />, checksum: "sha256: 7b3e...c90a" }
      ],
      isLatest: true
    },
    {
      version: "1.0.0",
      date: "Initial Release (May 2024)",
      platforms: [
        { name: "Windows", ext: ".exe", link: "#", icon: <Laptop size={18} />, checksum: "sha256: a1b2...c3d4" }
      ],
      isLatest: false
    }
  ];

  return (
    <section id="download" className="py-24 px-6 relative scroll-mt-24">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <div className="w-16 h-16 bg-teal-500/10 rounded-2xl flex items-center justify-center text-teal-500 mx-auto mb-6">
            <Download size={32} />
          </div>
          <h2 className="text-4xl font-black text-slate-900 dark:text-white mb-4 tracking-tight">Download Center</h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-xl mx-auto text-lg">Choose your platform. All builds are cryptographically signed for your protection.</p>
        </div>

        <div className="space-y-6">
          {versions.map((v, i) => (
            <div 
              key={i} 
              className={`group relative p-8 rounded-[2.5rem] border transition-all duration-500 ${
                v.isLatest 
                  ? 'bg-white dark:bg-slate-900 border-teal-500/30 shadow-2xl shadow-teal-500/5' 
                  : 'bg-slate-50 dark:bg-slate-900/40 border-slate-200 dark:border-slate-800'
              }`}
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
                <div>
                  <div className="flex items-center gap-4 mb-2">
                    <h3 className="text-3xl font-black text-slate-900 dark:text-white">v{v.version}</h3>
                    {v.isLatest && (
                      <span className="bg-emerald-500 text-slate-950 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest shadow-lg shadow-emerald-500/20">
                        Recommended
                      </span>
                    )}
                  </div>
                  <p className="text-sm font-bold text-slate-500 flex items-center gap-2">
                    <Shield size={14} className="text-teal-500" />
                    {v.date}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-4">
                  {v.platforms.map((p, j) => (
                    <DownloadButton key={j} platform={p} />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <a href="https://github.com/lokmanelouk/Tree-file" className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-slate-100 dark:bg-white/5 text-slate-500 hover:text-teal-600 dark:hover:text-teal-400 transition-all text-sm font-black border border-transparent hover:border-teal-500/30">
            <Github size={20} />
            Browse Source & Checksums on GitHub
          </a>
        </div>
      </div>
    </section>
  );
};

const DownloadButton = ({ platform }: { platform: any }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.a 
      href={platform.link}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.02, y: -4 }}
      whileTap={{ scale: 0.98 }}
      className="relative flex items-center gap-3 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-100 px-6 py-4 rounded-2xl text-base font-black border border-slate-200 dark:border-slate-700 transition-all group overflow-hidden shadow-sm"
    >
      <div className="text-teal-500 group-hover:scale-110 transition-transform">
        {platform.icon}
      </div>
      <div className="flex flex-col items-start leading-none">
        <span className="text-sm">{platform.name}</span>
        <span className="text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-widest">{platform.ext}</span>
      </div>
      
      {/* Checksum Tooltip/Reveal */}
      <AnimatePresence>
        {isHovered && (
          <motion.div 
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            className="absolute right-4 flex items-center gap-2 bg-teal-500/10 px-3 py-1.5 rounded-lg border border-teal-500/20 backdrop-blur-md"
          >
            <Fingerprint size={12} className="text-teal-500" />
            <span className="text-[9px] font-mono text-teal-600 dark:text-teal-400">{platform.checksum}</span>
          </motion.div>
        )}
      </AnimatePresence>
      
      {!isHovered && <ChevronRight size={16} className="text-slate-300 ml-2" />}
    </motion.a>
  );
};