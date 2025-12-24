
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { FolderTree, Github, Download, Menu, X, ChevronRight, Zap, Sparkles, BookOpen } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { Tooltip } from './Tooltip';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hoveredPath, setHoveredPath] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState<string>('');

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const navLinks = [
    { name: 'Comparison', href: '/#comparison', id: 'comparison' },
    { name: 'Why TreeFile', href: '/#philosophy', id: 'philosophy' },
    { name: 'Showcase', href: '/#showcase', id: 'showcase' },
    { name: 'AI Insight', href: '/#ai-analyst', id: 'ai-analyst', badge: 'New' },
    { name: 'Guide', href: '/#guide', id: 'guide' },
    { name: 'FAQ', href: '/#faq', id: 'faq' },
    { name: 'Downloads', href: '/download', id: 'download' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      const scrollPosition = window.scrollY + 150;
      
      for (const link of navLinks) {
        if (!link.href.startsWith('/#')) continue;
        const id = link.href.split('#')[1];
        const element = document.getElementById(id);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(id);
            return;
          }
        }
      }
      if (window.scrollY < 100) setActiveSection('');
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const currentPath = typeof window !== 'undefined' ? window.location.pathname : '/';

  const navigate = (e: React.MouseEvent, href: string) => {
    // Only intercept internal full paths, let hashes behave normally or handle them
    if (href.startsWith('/#')) return;
    
    e.preventDefault();
    const navEvent = new CustomEvent('navigate', { detail: href });
    window.dispatchEvent(navEvent);
  };

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ease-in-out flex items-center ${
        isScrolled 
          ? 'bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-slate-200/40 dark:border-white/5 h-16' 
          : 'bg-transparent h-20'
      }`}
    >
      <div className="w-full px-4 md:px-8 lg:px-12 flex items-center justify-between gap-4">
        {/* --- Logo & Status Badge --- */}
        <div className="flex items-center gap-4">
          <motion.a 
            href="/" 
            onClick={(e) => navigate(e, '/')}
            className="flex items-center gap-2.5 md:gap-3 group flex-shrink-0"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <motion.div className="relative" layoutId="app-logo-container">
              <motion.div 
                layoutId="app-logo-box"
                className="w-9 h-9 flex items-center justify-center bg-slate-950 dark:bg-white rounded-xl shadow-lg border border-white/10 dark:border-slate-200/20 group-hover:shadow-teal-500/20 transition-all"
                whileHover={{ rotate: 12 }}
              >
                <FolderTree className="text-white dark:text-slate-950" size={18} strokeWidth={2.5} />
              </motion.div>
            </motion.div>
            <div className="flex flex-col">
              <motion.span 
                layoutId="app-logo-text"
                className="text-xl md:text-2xl font-black tracking-tighter text-slate-900 dark:text-white leading-none"
              >
                Tree<span className="text-teal-500">File</span>
              </motion.span>
            </div>
          </motion.a>

          {/* Version Badge */}
          <div className="hidden sm:flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
            </span>
            <span className="text-emerald-500 text-[10px] font-black tracking-wider uppercase">v1.2.1</span>
          </div>
        </div>

        {/* --- Desktop Links --- */}
        <div className="hidden xl:flex items-center bg-slate-100/30 dark:bg-white/5 px-1.5 py-1 rounded-2xl border border-slate-200/30 dark:border-white/5 backdrop-blur-md">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id || (link.href === currentPath);
            return (
              <a 
                key={link.name} 
                href={link.href} 
                onClick={(e) => navigate(e, link.href)}
                onMouseEnter={() => setHoveredPath(link.name)}
                onMouseLeave={() => setHoveredPath(null)}
                className={`relative px-4 py-2 text-[13px] font-bold transition-colors flex items-center gap-1.5 ${
                  isActive
                    ? 'text-teal-600 dark:text-teal-400' 
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {(hoveredPath === link.name || isActive) && (
                  <motion.div
                    layoutId="nav-pill"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
                    className="absolute inset-0 rounded-xl bg-white dark:bg-slate-800 border border-slate-200/50 dark:border-white/10 shadow-sm"
                  />
                )}
                <span className="relative z-10">{link.name}</span>
                {link.badge && (
                  <span className="relative z-10 px-1.5 py-0.5 rounded-md bg-teal-500 text-slate-950 text-[8px] font-black uppercase">
                    {link.badge}
                  </span>
                )}
              </a>
            );
          })}
        </div>

        {/* --- Action Icons --- */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-3">
            <Tooltip content="Read Documentation" side="bottom">
              <motion.a 
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
                href="/docs" 
                onClick={(e) => navigate(e, '/docs')}
                className="p-2.5 rounded-xl bg-slate-50/50 dark:bg-slate-900/50 border border-slate-200/50 dark:border-slate-800 text-slate-900 dark:text-slate-100 hover:text-teal-500 dark:hover:text-teal-400 transition-all shadow-sm"
              >
                <BookOpen size={20} />
              </motion.a>
            </Tooltip>

            <Tooltip content="Source on GitHub" side="bottom">
              <motion.a 
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
                href="https://github.com/lokmanelouk/Tree-file" 
                target="_blank" 
                className="p-2.5 rounded-xl bg-slate-50/50 dark:bg-slate-900/50 border border-slate-200/50 dark:border-slate-800 text-slate-900 dark:text-slate-100 hover:text-teal-500 dark:hover:text-teal-400 transition-all shadow-sm"
              >
                <Github size={20} />
              </motion.a>
            </Tooltip>

            <ThemeToggle />
          </div>
          
          <div className="hidden sm:block w-px h-6 bg-slate-200/50 dark:bg-slate-800/50 mx-1" />
          
          <Tooltip content="Download Now" side="bottom">
            <motion.a 
              whileHover={{ y: -2, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              href="/download" 
              onClick={(e) => navigate(e, '/download')}
              className="hidden md:flex bg-slate-950 dark:bg-white text-white dark:text-slate-950 px-5 py-2.5 rounded-xl text-sm font-black items-center gap-2 border border-white/10 dark:border-slate-200/20 shadow-lg shadow-teal-500/10"
            >
              <Download size={16} strokeWidth={3} className="text-teal-400 dark:text-teal-600" />
              <span>Get App</span>
            </motion.a>
          </Tooltip>

          <button 
            className="xl:hidden w-11 h-11 flex items-center justify-center rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* --- Scroll Progress Line --- */}
      <motion.div 
        className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-teal-500 to-transparent origin-left"
        style={{ scaleX }}
      />

      {/* --- Mobile Menu --- */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 right-0 bg-white/95 dark:bg-slate-950/95 backdrop-blur-xl border-b border-slate-200 dark:border-white/10 px-4 py-8 xl:hidden shadow-2xl"
          >
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href} 
                  onClick={(e) => {
                    setIsMobileMenuOpen(false);
                    navigate(e, link.href);
                  }}
                  className="p-4 rounded-2xl bg-slate-50/50 dark:bg-white/5 text-lg font-bold border border-transparent hover:border-teal-500/30 transition-all flex items-center justify-between"
                >
                  <div className="flex items-center gap-2">
                    {link.name}
                    {link.badge && (
                      <span className="px-1.5 py-0.5 rounded-md bg-teal-500 text-slate-950 text-[8px] font-black uppercase">
                        {link.badge}
                      </span>
                    )}
                  </div>
                  <ChevronRight size={18} className="text-slate-400" />
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
