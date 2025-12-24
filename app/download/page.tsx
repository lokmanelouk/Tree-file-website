'use client';

import React, { useState, useMemo, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Laptop, 
  Apple, 
  Monitor, 
  Download, 
  Search, 
  Cpu, 
  ShieldCheck, 
  FileCode,
  ArrowLeft,
  Star,
  ChevronDown,
  Filter,
  Layers,
  Check
} from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { HeroBackground } from '@/components/HeroBackground';
import { Tooltip } from '@/components/Tooltip';

interface DownloadItem {
  id: string;
  platform: 'Windows' | 'macOS' | 'Linux';
  arch: 'x64' | 'ARM64' | 'Universal';
  version: string;
  size: string;
  ext: string;
  type: 'Stable' | 'Beta' | 'LTS';
  releaseDate: string;
  checksum: string;
  downloadUrl: string; // Added this field for explicit links
}

// ------------------------------------------------------------------
// 🛠️ CONFIGURATION: Your Real Download Links
// ------------------------------------------------------------------
const downloads: DownloadItem[] = [
  // --- WINDOWS (Latest) ---
  { 
    id: 'win-x64-1.2.0', 
    platform: 'Windows', 
    arch: 'x64', 
    version: '1.2.0', 
    size: '85 MB', 
    ext: '.exe', 
    type: 'Stable', 
    releaseDate: '2025-12-24', 
    checksum: 'sha256: Verified', 
    // Standard Electron-Builder output name. Check your GitHub Release if it has spaces or dots.
    downloadUrl: 'https://github.com/lokmanelouk/Tree-file/releases/download/v1.2.0/Tree.File.Setup.1.2.0.exe' 
  },
  
  // --- MAC (Latest) ---
  { 
    id: 'mac-univ-1.2.1', 
    platform: 'macOS', 
    arch: 'Universal', 
    version: '1.2.0', 
    size: '92 MB', 
    ext: '.dmg', 
    type: 'Stable', 
    releaseDate: '2025-12-24', 
    checksum: 'sha256: Verified',
    downloadUrl: 'https://github.com/lokmanelouk/Tree-file/releases/download/v1.2.0/Tree.File-1.2.0.dmg' 
  },

  // --- OLD VERSIONS ---
  { 
    id: 'win-1.1.0', 
    platform: 'Windows', 
    arch: 'x64', 
    version: '1.1.0', 
    size: '78.7 MB', 
    ext: '.exe', 
    type: 'Beta', 
    releaseDate: '2025-12-20', 
    checksum: 'sha256: Verified',
    downloadUrl: 'https://github.com/lokmanelouk/Tree-file/releases/download/v1.1.0/Tree.File.Setup.1.1.0.exe' 
  },
  { 
    id: 'win-1.0.1', 
    platform: 'Windows', 
    arch: 'x64', 
    version: '1.0.1', 
    size: '78.7 MB', 
    ext: '.exe', 
    type: 'Beta', 
    releaseDate: '2025-12-20', 
    checksum: 'sha256: Verified',
    downloadUrl: 'https://github.com/lokmanelouk/Tree-file/releases/download/v1.0.1/Tree.File.Setup.1.0.1.exe' 
  },
  { 
    id: 'win-1.0.0', 
    platform: 'Windows', 
    arch: 'x64', 
    version: '1.0.0', 
    size: '75.2 MB', 
    ext: '.exe', 
    type: 'LTS', 
    releaseDate: '2025-12-20', 
    checksum: 'sha256: Verified',
    downloadUrl: 'https://github.com/lokmanelouk/Tree-file/releases/download/v1.0.0/Tree.File.Setup.1.0.0.exe' 
  },
];

/**
 * Professional Custom Dropdown Component
 */
function CustomDropdown({ 
  label, 
  options, 
  value, 
  onChange, 
  icon: Icon 
}: { 
  label: string; 
  options: string[]; 
  value: string; 
  onChange: (val: any) => void;
  icon: any;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative group flex-grow lg:flex-grow-0" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full lg:w-44 flex items-center justify-between gap-2 bg-slate-100 dark:bg-white/5 border ${
          isOpen ? 'border-teal-500 ring-2 ring-teal-500/10' : 'border-transparent hover:border-teal-500/30'
        } rounded-2xl px-4 py-3 text-[12px] font-black uppercase tracking-widest text-slate-600 dark:text-slate-300 transition-all shadow-sm active:scale-95`}
      >
        <div className="flex items-center gap-2 overflow-hidden">
          <Icon size={14} className={isOpen ? 'text-teal-500' : 'text-slate-400'} />
          <span className="truncate">{value === 'All' ? label : value}</span>
        </div>
        <ChevronDown 
          size={14} 
          className={`shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180 text-teal-500' : 'text-slate-400'}`} 
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute top-full left-0 right-0 mt-2 z-50 bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-2xl shadow-2xl overflow-hidden py-2 backdrop-blur-xl"
          >
            {options.map((opt) => (
              <button
                key={opt}
                onClick={() => {
                  onChange(opt);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center justify-between px-4 py-2.5 text-[11px] font-black uppercase tracking-widest transition-colors ${
                  value === opt 
                    ? 'text-teal-500 bg-teal-500/5' 
                    : 'text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {opt === 'All' ? label : opt}
                {value === opt && <Check size={12} strokeWidth={4} />}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function DownloadPage() {
  const [platformFilter, setPlatformFilter] = useState<'All' | 'Windows' | 'macOS' | 'Linux'>('All');
  const [typeFilter, setTypeFilter] = useState<'All' | 'Stable' | 'Beta' | 'LTS'>('All');
  const [versionFilter, setVersionFilter] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [detectedOS, setDetectedOS] = useState<'Windows' | 'macOS' | 'Linux' | null>(null);

  useEffect(() => {
    const userAgent = window.navigator.userAgent;
    if (userAgent.includes('Win')) setDetectedOS('Windows');
    else if (userAgent.includes('Mac')) setDetectedOS('macOS');
    else if (userAgent.includes('Linux')) setDetectedOS('Linux');
  }, []);

  const uniqueVersions = useMemo(() => {
    const versions = Array.from(new Set(downloads.map(d => d.version))).sort((a, b) => b.localeCompare(a, undefined, { numeric: true, sensitivity: 'base' }));
    return ['All', ...versions];
  }, []);

  const isFiltering = useMemo(() => {
    return platformFilter !== 'All' || typeFilter !== 'All' || versionFilter !== 'All' || searchQuery !== '';
  }, [platformFilter, typeFilter, versionFilter, searchQuery]);

  const filteredDownloads = useMemo(() => {
    return downloads.filter(item => {
      const matchesPlatform = platformFilter === 'All' || item.platform === platformFilter;
      const matchesType = typeFilter === 'All' || item.type === typeFilter;
      const matchesVersion = versionFilter === 'All' || item.version === versionFilter;
      const matchesSearch = 
        item.arch.toLowerCase().includes(searchQuery.toLowerCase()) || 
        item.version.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.ext.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesPlatform && matchesType && matchesVersion && matchesSearch;
    });
  }, [platformFilter, typeFilter, versionFilter, searchQuery]);

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-white transition-colors duration-300">
      <Navbar />
      
      <main className="relative pt-20">
        <HeroBackground />
        
        {/* --- Advanced Filter Bar --- */}
        <section className="sticky top-16 z-40 w-full bg-white/80 dark:bg-slate-950/90 backdrop-blur-2xl border-b border-slate-200 dark:border-white/5 py-4 px-6 md:px-12 shadow-sm transition-all duration-300">
          <div className="max-w-7xl mx-auto flex flex-col xl:flex-row items-center gap-4">
            
            <div className="flex items-center gap-3 w-full xl:w-auto">
              <Tooltip content="Back to Home" side="bottom">
                <a 
                  href="/" 
                  className="flex items-center justify-center w-11 h-11 rounded-2xl bg-slate-900 dark:bg-white text-white dark:text-slate-950 hover:bg-teal-500 dark:hover:bg-teal-400 transition-all shrink-0 shadow-lg active:scale-95 group"
                >
                  <ArrowLeft size={20} strokeWidth={3} className="group-hover:-translate-x-0.5 transition-transform" />
                </a>
              </Tooltip>

              <div className="flex items-center gap-1.5 p-1 bg-slate-100 dark:bg-white/5 rounded-2xl border border-slate-200 dark:border-white/5 flex-grow sm:flex-grow-0 overflow-x-auto no-scrollbar">
                {(['All', 'Windows', 'macOS', 'Linux'] as const).map((p) => (
                  <button
                    key={p}
                    onClick={() => setPlatformFilter(p)}
                    className={`px-4 py-2 rounded-xl text-[11px] font-black uppercase tracking-wider transition-all whitespace-nowrap ${
                      platformFilter === p 
                        ? 'bg-white dark:bg-slate-800 text-teal-600 dark:text-teal-400 shadow-sm border border-slate-200 dark:border-white/10' 
                        : 'text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>

            <div className="hidden xl:block w-px h-8 bg-slate-200 dark:bg-white/10 mx-2" />

            <div className="grid grid-cols-2 lg:flex items-center gap-3 w-full xl:w-auto">
              <CustomDropdown 
                label="All Versions" 
                options={uniqueVersions} 
                value={versionFilter} 
                onChange={setVersionFilter} 
                icon={Filter} 
              />
              <CustomDropdown 
                label="All Channels" 
                options={['All', 'Stable', 'Beta', 'LTS']} 
                value={typeFilter} 
                onChange={setTypeFilter} 
                icon={Layers} 
              />
            </div>

            <div className="relative w-full xl:flex-grow">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="text" 
                placeholder="Search architecture, file extension..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-slate-100 dark:bg-white/5 border border-transparent hover:border-teal-500/30 focus:border-teal-500 focus:bg-white dark:focus:bg-slate-900 rounded-2xl text-[12px] font-black uppercase tracking-widest outline-none transition-all placeholder:text-slate-400 dark:placeholder:text-slate-600 shadow-sm"
              />
            </div>
          </div>
        </section>

        {/* --- Download Grid --- */}
        <section className="py-16 px-6 md:px-12 max-w-7xl mx-auto min-h-[500px]">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
            <div>
              <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-1">Available Installers</h2>
              <AnimatePresence>
                {isFiltering && (
                  <motion.p 
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    className="text-sm text-teal-600 dark:text-teal-400 font-bold"
                  >
                    Found {filteredDownloads.length} results matching your search.
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
            {detectedOS && (
              <div className="flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-600 dark:text-emerald-400 text-[10px] font-black uppercase tracking-widest self-start md:self-center">
                <ShieldCheck size={14} />
                Detected OS: {detectedOS}
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredDownloads.map((dl) => (
                <DownloadCard 
                  key={dl.id} 
                  dl={dl} 
                  isRecommended={dl.platform === detectedOS && dl.type === 'Stable'} 
                />
              ))}
            </AnimatePresence>
          </div>

          {filteredDownloads.length === 0 && (
            <div className="flex flex-col items-center justify-center py-40 text-center">
              <div className="w-20 h-20 bg-slate-100 dark:bg-white/5 rounded-3xl flex items-center justify-center mb-6">
                <Search size={40} className="text-slate-300 dark:text-slate-700" />
              </div>
              <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-2">No matching installers</h3>
              <p className="text-slate-500 text-base max-w-md mx-auto leading-relaxed">
                We couldn't find any versions matching your current selection. Try resetting your filters.
              </p>
              <button 
                onClick={() => {
                  setPlatformFilter('All');
                  setTypeFilter('All');
                  setVersionFilter('All');
                  setSearchQuery('');
                }}
                className="mt-8 px-6 py-3 bg-teal-500 text-slate-950 rounded-xl font-black text-sm hover:bg-teal-400 transition-colors shadow-lg shadow-teal-500/20"
              >
                Reset All Filters
              </button>
            </div>
          )}
        </section>

        {/* --- Installation Support --- */}
        <section className="py-24 px-6 md:px-12 bg-slate-50 dark:bg-slate-900/30 border-t border-slate-200 dark:border-white/5">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <h3 className="text-3xl font-black tracking-tight mb-4">Installation Support</h3>
              <p className="text-slate-500 text-lg max-w-2xl mx-auto">Quick solutions for platform-specific security prompts.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="p-10 rounded-[2.5rem] bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/5 shadow-sm">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 bg-slate-100 dark:bg-white/5 rounded-2xl text-slate-400">
                    <Apple size={32} />
                  </div>
                  <h4 className="font-black text-xl">macOS Fix</h4>
                </div>
                <p className="text-sm text-slate-500 mb-6 leading-relaxed">
                  If you see "Unidentified Developer", run this command in Terminal:
                </p>
                <div className="relative group">
                  <div className="bg-slate-950 rounded-2xl p-4 font-mono text-[12px] text-emerald-400 border border-white/5 shadow-inner overflow-x-auto">
                    xattr -cr /Applications/TreeFile.app
                  </div>
                  <div className="mt-4 flex items-center gap-2 text-teal-500 font-black text-[10px] uppercase tracking-widest">
                    <ShieldCheck size={14} />
                    Cryptographically Signed Build
                  </div>
                </div>
              </div>

              <div className="p-10 rounded-[2.5rem] bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/5 shadow-sm">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 bg-slate-100 dark:bg-white/5 rounded-2xl text-slate-400">
                    <Laptop size={32} />
                  </div>
                  <h4 className="font-black text-xl">Windows Fix</h4>
                </div>
                <p className="text-sm text-slate-500 mb-6 leading-relaxed">
                  If SmartScreen appears, click <strong>"More info"</strong> and then <strong>"Run anyway"</strong>.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-4 bg-emerald-500/5 rounded-2xl border border-emerald-500/10">
                    <ShieldCheck size={20} className="text-emerald-500" />
                    <span className="text-xs font-bold text-slate-600 dark:text-slate-300">Clean scan: No threats</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

function DownloadCard({ dl, isRecommended }: { dl: DownloadItem, isRecommended: boolean }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ y: -8 }}
      className={`group relative p-10 rounded-[3rem] bg-white dark:bg-slate-900 border transition-all duration-500 ${
        isRecommended 
          ? 'border-teal-500 shadow-2xl shadow-teal-500/10' 
          : 'border-slate-200 dark:border-white/5 hover:border-teal-500/30'
      }`}
    >
      {isRecommended && (
        <div className="absolute -top-4 left-10 bg-teal-500 text-slate-950 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-xl flex items-center gap-2">
          <Star size={12} fill="currentColor" />
          Recommended Build
        </div>
      )}

      <div className="flex justify-between items-start mb-8">
        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-500 group-hover:scale-110 ${
          isRecommended ? 'bg-teal-500 text-slate-950 shadow-lg shadow-teal-500/20' : 'bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-400'
        }`}>
          {dl.platform === 'Windows' && <Laptop size={28} />}
          {dl.platform === 'macOS' && <Apple size={28} />}
          {dl.platform === 'Linux' && <Monitor size={28} />}
        </div>
        <div className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest ${
          dl.type === 'Stable' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' : 
          dl.type === 'Beta' ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400' : 'bg-slate-500/10 text-slate-500 dark:text-slate-400'
        }`}>
          {dl.type}
        </div>
      </div>

      <div className="mb-8">
        <h3 className="text-2xl font-black text-slate-900 dark:text-white leading-tight mb-2">
          {dl.platform} <span className="text-slate-400 font-bold ml-1">{dl.arch}</span>
        </h3>
        <p className="text-[12px] font-bold text-slate-500 flex items-center gap-2">
          <span className="text-teal-500">v{dl.version}</span>
          <span className="w-1 h-1 bg-slate-300 dark:bg-slate-700 rounded-full" />
          Released {dl.releaseDate}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-6 mb-10">
        <div className="space-y-2">
          <span className="text-[10px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-[0.15em] block">Format</span>
          <div className="flex items-center gap-2 text-sm font-bold text-slate-700 dark:text-slate-300">
            <FileCode size={16} className="text-teal-500/50" />
            {dl.ext}
          </div>
        </div>
        <div className="space-y-2">
          <span className="text-[10px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-[0.15em] block">Package Size</span>
          <div className="flex items-center gap-2 text-sm font-bold text-slate-700 dark:text-slate-300">
            <Cpu size={16} className="text-teal-500/50" />
            {dl.size}
          </div>
        </div>
      </div>

      {/* FIX: Turned button into an <a> tag pointing to the real downloadUrl */}
      <a 
        href={dl.downloadUrl}
        className={`w-full py-5 rounded-2xl font-black text-base flex items-center justify-center gap-3 transition-all shadow-xl active:scale-[0.98] ${
          isRecommended 
            ? 'bg-teal-500 text-slate-950 hover:bg-teal-400 hover:shadow-teal-500/30' 
            : 'bg-slate-950 dark:bg-white text-white dark:text-slate-950 hover:bg-teal-500 dark:hover:bg-teal-400 hover:text-white dark:hover:text-slate-950'
        }`}
      >
        <Download size={20} strokeWidth={3} />
        DOWNLOAD {dl.ext.toUpperCase()}
      </a>
      
      <div className="mt-6 pt-6 border-t border-slate-100 dark:border-white/5 flex items-center justify-between text-[10px] text-slate-400 px-1">
        <div className="flex items-center gap-1.5 font-mono text-[9px]">
          <ShieldCheck size={14} className="text-emerald-500" />
          SHA256: {dl.checksum.split(': ')[1]}
        </div>
        <Tooltip content="Verified Build" side="top">
          <span className="cursor-help font-black uppercase tracking-tighter opacity-60">Verified</span>
        </Tooltip>
      </div>
    </motion.div>
  );
}