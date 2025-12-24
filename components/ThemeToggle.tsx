import React, { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { Sun, Moon } from 'lucide-react';
import { motion } from 'framer-motion';
import { Tooltip } from './Tooltip';

export const ThemeToggle: React.FC = () => {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-900 animate-pulse" />;

  const toggleTheme = () => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
  };

  return (
    <Tooltip content={`Switch to ${resolvedTheme === 'dark' ? 'Light' : 'Dark'} Mode`} side="bottom">
      <motion.button
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.95 }}
        onClick={toggleTheme}
        className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 transition-all shadow-sm flex items-center justify-center"
        aria-label="Toggle theme"
      >
        {resolvedTheme === 'dark' ? (
          <Sun size={20} className="text-amber-400" fill="currentColor" />
        ) : (
          <Moon size={20} className="text-slate-700" fill="currentColor" />
        )}
      </motion.button>
    </Tooltip>
  );
};