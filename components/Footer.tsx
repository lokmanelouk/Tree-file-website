import React from "react";
import { Github, Twitter, Linkedin, FolderTree } from "lucide-react";
import { motion } from "framer-motion";
import { Tooltip } from "./Tooltip";

export const Footer: React.FC = () => {
  const navigateTo = (e: React.MouseEvent, path: string) => {
    if (path.startsWith("http") || path.startsWith("#")) return;
    e.preventDefault();
    window.dispatchEvent(new CustomEvent("navigate", { detail: path }));
  };

  const LOGOS = {
    light: "/dark-logo.png", // The logo to show when the theme is light
    dark: "/logo.png", // The logo to show when the theme is dark
  };

  return (
    <footer className="py-24 px-6 border-t border-slate-200 dark:border-white/5 bg-white/40 dark:bg-slate-950/50 backdrop-blur-md relative z-20">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-12">
        {/* Brand & Socials Section */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left flex-1">
          <a
            href="/"
            onClick={(e) => navigateTo(e, "/")}
            className="flex items-center space-x-3 mb-6 group"
          >
            <motion.div
              layoutId="app-logo-box"
              className="w-10 h-10 flex items-center justify-center"
            >
              {/* Light Mode Logo */}
              <img
                src={LOGOS.light}
                alt="Tree File Logo"
                className="w-full h-full rounded-md object-contain block dark:hidden drop-shadow-md"
              />

              {/* Dark Mode Logo */}
              <img
                src={LOGOS.dark}
                alt="Tree File Logo"
                className="w-full h-full rounded-md object-contain hidden dark:block drop-shadow-md"
              />
            </motion.div>
            <div className="flex flex-col">
              <motion.span
                // Remove or Comment out the line below:
                // layoutId="app-logo-text"
                className="text-xl md:text-2xl font-black tracking-tighter text-slate-900 dark:text-white leading-none"
              >
                Tree<span className="text-teal-500">File</span>
              </motion.span>
            </div>
          </a>
          <p className="text-slate-500 dark:text-slate-400 max-w-sm text-sm leading-relaxed mb-8 font-medium">
            The professional data viewer that treats your complex structures
            with the respect they deserve. Local-first, privacy-driven, and
            built for speed.
          </p>

          <div className="flex items-center gap-3">
            <Tooltip content="GitHub" side="top">
              <a
                href="https://github.com/tree-file"
                target="_blank"
                className="p-3 rounded-2xl bg-white dark:bg-white/5 border border-slate-200 dark:border-transparent text-slate-400 hover:text-slate-900 dark:hover:text-white hover:border-teal-500/50 transition-all shadow-sm"
              >
                <Github size={20} />
              </a>
            </Tooltip>
            <Tooltip content="Twitter" side="top">
              <a
                href="#"
                className="p-3 rounded-2xl bg-white dark:bg-white/5 border border-slate-200 dark:border-transparent text-slate-400 hover:text-[#1DA1F2] hover:border-[#1DA1F2]/50 transition-all shadow-sm"
              >
                <Twitter size={20} fill="currentColor" />
              </a>
            </Tooltip>
            <Tooltip content="LinkedIn" side="top">
              <a
                href="#"
                className="p-3 rounded-2xl bg-white dark:bg-white/5 border border-slate-200 dark:border-transparent text-slate-400 hover:text-[#0A66C2] hover:border-[#0A66C2]/50 transition-all shadow-sm"
              >
                <Linkedin size={20} fill="currentColor" />
              </a>
            </Tooltip>
          </div>
        </div>

        {/* Navigation Links Grid */}
        <div className="grid grid-cols-2 gap-12 md:gap-24 w-full md:w-auto">
          <div className="flex flex-col space-y-4">
            <p className="font-black text-slate-900 dark:text-white mb-2 uppercase tracking-widest text-[10px]">
              Resources
            </p>
            <a
              href="/docs"
              onClick={(e) => navigateTo(e, "/docs")}
              className="text-slate-500 dark:text-slate-400 hover:text-teal-600 dark:hover:text-teal-500 transition-colors text-sm font-bold"
            >
              Documentation
            </a>
            <a
              href="/download"
              onClick={(e) => navigateTo(e, "/download")}
              className="text-slate-500 dark:text-slate-400 hover:text-teal-600 dark:hover:text-teal-500 transition-colors text-sm font-bold"
            >
              Downloads
            </a>
            <a
              href="/changelog"
              onClick={(e) => navigateTo(e, "/changelog")}
              className="text-slate-500 dark:text-slate-400 hover:text-teal-600 dark:hover:text-teal-500 transition-colors text-sm font-bold"
            >
              Changelog
            </a>
          </div>

          <div className="flex flex-col space-y-4 md:items-end">
            <p className="font-black text-slate-900 dark:text-white mb-2 uppercase tracking-widest text-[10px]">
              Legal
            </p>
            <a
              href="/privacy"
              onClick={(e) => navigateTo(e, "/privacy")}
              className="text-slate-500 dark:text-slate-400 hover:text-teal-600 dark:hover:text-teal-500 transition-colors text-sm font-bold"
            >
              Privacy Policy
            </a>
            <a
              href="/terms"
              onClick={(e) => navigateTo(e, "/terms")}
              className="text-slate-500 dark:text-slate-400 hover:text-teal-600 dark:hover:text-teal-500 transition-colors text-sm font-bold"
            >
              Terms of Use
            </a>
            <a
              href="/license"
              onClick={(e) => navigateTo(e, "/license")}
              className="text-slate-500 dark:text-slate-400 hover:text-teal-600 dark:hover:text-teal-500 transition-colors text-sm font-bold"
            >
              MIT License
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Copyright */}
      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-slate-200 dark:border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-medium text-slate-400">
        <p>
          &copy; {new Date().getFullYear()} Tree File Project. All rights
          reserved.
        </p>
        <p className="opacity-60 italic">
          Built for developers, by developers.
        </p>
      </div>
    </footer>
  );
};
