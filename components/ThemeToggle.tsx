import React, { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Tooltip } from './Tooltip';

export const ThemeToggle: React.FC = () => {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-900 animate-pulse" />;

  const toggleTheme = () => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
  };

  return (
    <Tooltip content={`Switch to ${resolvedTheme === 'dark' ? 'Light' : 'Dark'} Mode`} side="bottom">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.9 }}
        onClick={toggleTheme}
        className={`relative w-10 h-10 rounded-xl border transition-colors duration-500 flex items-center justify-center overflow-hidden shadow-sm
          ${resolvedTheme === 'dark' 
            ? 'bg-slate-900 border-slate-800' 
            : 'bg-indigo-50 border-indigo-100'
          }`}
      >
        {/* We use popLayout so the icons swap at the exact same time */}
        <AnimatePresence mode="popLayout" initial={false}>
          {resolvedTheme === 'dark' ? (
            <motion.div
              key="sun"
              initial={{ scale: 0, rotate: -90, opacity: 0 }}
              animate={{ scale: 1, rotate: 0, opacity: 1 }}
              exit={{ scale: 0, rotate: 90, opacity: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
              className="absolute" // Absolute keeps it centered during the swap
            >
              <Sun size={20} className="text-amber-400" fill="currentColor" />
            </motion.div>
          ) : (
            <motion.div
              key="moon"
              initial={{ scale: 0, rotate: 90, opacity: 0 }}
              animate={{ scale: 1, rotate: 0, opacity: 1 }}
              exit={{ scale: 0, rotate: -90, opacity: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
              className="absolute"
            >
              <Moon 
                size={20} 
                className="text-indigo-600" 
                fill="currentColor" 
                style={{ filter: 'drop-shadow(0 0 4px rgba(79, 70, 229, 0.4))' }} 
              />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </Tooltip>
  );
};