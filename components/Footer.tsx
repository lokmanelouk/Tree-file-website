import React from "react";
import { Github, Twitter, Linkedin } from "lucide-react";
import { motion } from "framer-motion";
import { Tooltip } from "./Tooltip";

export const Footer: React.FC = () => {
  const navigateTo = (e: React.MouseEvent, path: string) => {
    if (path.startsWith("http") || path.startsWith("#")) return;
    e.preventDefault();
    window.dispatchEvent(new CustomEvent("navigate", { detail: path }));
  };

  const LOGOS = {
    light: "/dark-logo.png",
    dark: "/logo.png",
  };

  // Define Socials with their permanent Brand Colors
  const socials = [
    {
      name: "GitHub",
      icon: <Github size={20} />,
      href: "https://github.com/tree-file",
      // Light Mode Colors: Dark Gray icon on light gray bg
      colorClass: "text-[#181717] dark:text-white",
      bgClass: "bg-slate-200/50 dark:bg-white/5",
      borderClass: "border-slate-300/50 dark:border-transparent",
    },
    {
      name: "Twitter",
      icon: <Twitter size={20} fill="currentColor" />,
      href: "#",
      // Light Mode Colors: Blue icon on light blue bg
      colorClass: "text-[#1DA1F2]",
      bgClass: "bg-[#1DA1F2]/10 dark:bg-[#1DA1F2]/5",
      borderClass: "border-[#1DA1F2]/20 dark:border-transparent",
    },
    {
      name: "LinkedIn",
      icon: <Linkedin size={20} fill="currentColor" />,
      href: "#",
      // Light Mode Colors: Blue icon on light blue bg
      colorClass: "text-[#0A66C2]",
      bgClass: "bg-[#0A66C2]/10 dark:bg-[#0A66C2]/5",
      borderClass: "border-[#0A66C2]/20 dark:border-transparent",
    },
  ];

  return (
    <footer className="relative z-20 border-t border-slate-200 dark:border-white/5 bg-slate-50/90 dark:bg-slate-950/50 backdrop-blur-xl">
      {/* Top Accent Line */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-teal-500/30 to-transparent" />

      <div className="max-w-7xl mx-auto py-20 px-6">
        <div className="flex flex-col md:flex-row justify-between items-start gap-12">
          
          {/* Brand & Socials */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left flex-1">
            <a
              href="/"
              onClick={(e) => navigateTo(e, "/")}
              className="flex items-center space-x-3 mb-6 group"
            >
              {/* FIXED: Removed layoutId to prevent logo jumping up during navigation */}
              <div className="w-10 h-10 flex items-center justify-center">
                <img
                  src={LOGOS.light}
                  alt="Logo"
                  className="w-full h-full rounded-md object-contain block dark:hidden drop-shadow-sm"
                />
                <img
                  src={LOGOS.dark}
                  alt="Logo"
                  className="w-full h-full rounded-md object-contain hidden dark:block drop-shadow-md"
                />
              </div>
              
              <div className="flex flex-col">
                <span className="text-xl md:text-2xl font-black tracking-tighter text-slate-900 dark:text-white leading-none">
                  Tree<span className="text-teal-500">File</span>
                </span>
              </div>
            </a>
            
            <p className="text-slate-600 dark:text-slate-400 max-w-sm text-sm leading-relaxed mb-8 font-medium">
              The professional data viewer that treats your complex structures
              with the respect they deserve. Local-first, privacy-driven, and
              built for speed.
            </p>

            {/* Social Icons showing permanent brand colors */}
            <div className="flex items-center gap-3">
              {socials.map((social) => (
                <Tooltip key={social.name} content={social.name} side="top">
                  <motion.a
                    href={social.href}
                    target="_blank"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className={`p-3 rounded-xl border transition-all shadow-sm flex items-center justify-center 
                      ${social.colorClass} ${social.bgClass} ${social.borderClass}`}
                  >
                    {social.icon}
                  </motion.a>
                </Tooltip>
              ))}
            </div>
          </div>

          {/* Navigation Grid */}
          <div className="grid grid-cols-2 gap-12 md:gap-24 w-full md:w-auto">
            <div className="flex flex-col space-y-4">
              <p className="font-black text-slate-900 dark:text-white mb-2 uppercase tracking-widest text-[10px] opacity-40 dark:opacity-100">
                Resources
              </p>
              {['Documentation', 'Downloads', 'Changelog'].map((item) => (
                <a
                  key={item}
                  href={`/${item.toLowerCase()}`}
                  className="text-slate-600 dark:text-slate-400 hover:text-teal-600 dark:hover:text-teal-500 transition-colors text-sm font-bold"
                >
                  {item}
                </a>
              ))}
            </div>

            <div className="flex flex-col space-y-4 md:items-end">
              <p className="font-black text-slate-900 dark:text-white mb-2 uppercase tracking-widest text-[10px] dark:opacity-100">
                Legal
              </p>
              {['Privacy Policy', 'Terms of Use', 'MIT License'].map((item) => (
                <a
                  key={item}
                  href={`/${item.toLowerCase().split(' ')[0]}`}
                  className="text-slate-600 dark:text-slate-400 hover:text-teal-600 dark:hover:text-teal-500 transition-colors text-sm font-bold"
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-16 pt-8 border-t border-slate-200 dark:border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-medium text-slate-500">
          <p>&copy; {new Date().getFullYear()} Tree File Project. All rights reserved.</p>
          <p className="italic opacity-50">Built for developers, by developers.</p>
        </div>
      </div>
    </footer>
  );
};