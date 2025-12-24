
import React from 'react';
import { FolderTree } from 'lucide-react';

export const Footer: React.FC = () => {
  const navigateTo = (e: React.MouseEvent, path: string) => {
    e.preventDefault();
    window.dispatchEvent(new CustomEvent('navigate', { detail: path }));
  };

  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 py-12 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand Column: Left Side */}
          <div className="md:col-span-2 space-y-6">
            <a href="/" onClick={(e) => navigateTo(e, '/')} className="flex items-center space-x-2 group">
              <div className="bg-teal-500 p-1.5 rounded-lg group-hover:scale-110 transition-transform shadow-lg shadow-teal-500/20">
                <FolderTree className="text-white" size={20} />
              </div>
              <span className="text-xl font-black tracking-tight text-slate-900 dark:text-white">Tree File</span>
            </a>
            <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed max-w-sm">
              The high-performance open-source data viewer built for developers who need speed and clarity. Privacy-first, local-only execution.
            </p>
            <p className="text-slate-400 dark:text-slate-600 text-xs font-medium">
              &copy; {new Date().getFullYear()} Tree File Project. Built for the community.
            </p>
          </div>

          {/* Link Columns: Right Side */}
          {/* RESOURCES Column */}
          <div className="space-y-6">
            <h3 className="font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider text-xs">Resources</h3>
            <ul className="space-y-4">
              <li>
                <a href="/#features" className="text-slate-500 hover:text-emerald-500 transition-colors text-sm font-medium">
                  Features
                </a>
              </li>
              <li>
                <a href="/docs" onClick={(e) => navigateTo(e, '/docs')} className="text-slate-500 hover:text-emerald-500 transition-colors text-sm font-medium">
                  Guide
                </a>
              </li>
              <li>
                <a href="/changelog" onClick={(e) => navigateTo(e, '/changelog')} className="text-slate-500 hover:text-emerald-500 transition-colors text-sm font-medium">
                  What's New
                </a>
              </li>
              <li>
                <a 
                  href="https://github.com/lokmanelouk/Tree-file/issues" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-slate-500 hover:text-emerald-500 transition-colors text-sm font-medium"
                >
                  Support
                </a>
              </li>
            </ul>
          </div>

          {/* COMPANY Column */}
          <div className="space-y-6">
            <h3 className="font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider text-xs">Company</h3>
            <ul className="space-y-4">
              <li>
                <a href="/privacy" onClick={(e) => navigateTo(e, '/privacy')} className="text-slate-500 hover:text-emerald-500 transition-colors text-sm font-medium">
                  Privacy
                </a>
              </li>
              <li>
                <a href="/terms" onClick={(e) => navigateTo(e, '/terms')} className="text-slate-500 hover:text-emerald-500 transition-colors text-sm font-medium">
                  Terms
                </a>
              </li>
              <li>
                <a href="/license" onClick={(e) => navigateTo(e, '/license')} className="text-slate-500 hover:text-emerald-500 transition-colors text-sm font-medium">
                  License
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};
