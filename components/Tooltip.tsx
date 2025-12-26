import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TooltipProps {
  children?: React.ReactNode;
  content: string;
  side?: 'top' | 'bottom' | 'left' | 'right';
}

export const Tooltip: React.FC<TooltipProps> = ({ children, content, side = 'top' }) => {
  const [isVisible, setIsVisible] = useState(false);

  // Position containers using Flexbox instead of translate to avoid Framer conflicts
  const positionStyles: Record<string, string> = {
    top: 'bottom-full left-0 right-0 flex justify-center mb-2.5',
    bottom: 'top-full left-0 right-0 flex justify-center mt-2.5',
    left: 'right-full top-0 bottom-0 flex items-center justify-end mr-2.5',
    right: 'left-full top-0 bottom-0 flex items-center justify-start ml-2.5',
  };

  // Arrow positioning (standard absolute)
  const arrowStyles: Record<string, string> = {
    top: 'top-full left-1/2 -translate-x-1/2 border-x-[5px] border-x-transparent border-t-[5px] border-t-white/80 dark:border-t-slate-800/90',
    bottom: 'bottom-full left-1/2 -translate-x-1/2 border-x-[5px] border-x-transparent border-b-[5px] border-b-white/80 dark:border-b-slate-800/90',
    left: 'left-full top-1/2 -translate-y-1/2 border-y-[5px] border-y-transparent border-l-[5px] border-l-white/80 dark:border-l-slate-800/90',
    right: 'right-full top-1/2 -translate-y-1/2 border-y-[5px] border-y-transparent border-r-[5px] border-r-white/80 dark:border-r-slate-800/90',
  };

  const variants = {
    initial: { 
      opacity: 0, 
      scale: 0.95,
      y: side === 'top' ? 4 : (side === 'bottom' ? -4 : 0),
      x: side === 'left' ? 4 : (side === 'right' ? -4 : 0),
    },
    animate: { 
      opacity: 1, 
      scale: 1, 
      y: 0, 
      x: 0 
    },
    exit: { 
      opacity: 0, 
      scale: 0.95,
      y: side === 'top' ? 2 : (side === 'bottom' ? -2 : 0),
      x: side === 'left' ? 2 : (side === 'right' ? -2 : 0),
    }
  };

  return (
    <div 
      className="relative inline-flex items-center justify-center"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
      onFocus={() => setIsVisible(true)}
      onBlur={() => setIsVisible(false)}
    >
      {children}
      <AnimatePresence>
        {isVisible && (
          <div className={`absolute ${positionStyles[side]} z-[500] pointer-events-none`}>
            <motion.div
              initial="initial"
              animate="animate"
              exit="exit"
              variants={variants}
              transition={{ duration: 0.15, ease: "easeOut" }}
              className="whitespace-nowrap"
            >
              <div className="relative px-2.5 py-1.5 bg-white/90 dark:bg-slate-800/95 backdrop-blur-md text-slate-900 dark:text-slate-100 text-[11px] font-bold rounded-lg shadow-xl border border-slate-200/50 dark:border-white/10 tracking-tight">
                {content}
                <div className={`absolute ${arrowStyles[side]}`} />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};