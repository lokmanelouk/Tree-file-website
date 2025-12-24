'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { 
  Terminal, 
  ShieldAlert, 
  Apple, 
  Laptop, 
  BookOpen, 
  Download, 
  Sparkles, 
  ChevronRight,
  ExternalLink,
  Code2,
  FileJson,
  Layout,
  Table as TableIcon,
  Keyboard,
  Zap,
  ShieldCheck,
  EyeOff,
  Search,
  Key,
  Database,
  History,
  FileSpreadsheet,
  FlaskConical,
  Braces,
  FileType
} from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { HeroBackground } from '@/components/HeroBackground';
import { DocChat } from '@/components/DocChat';
// Use public directory images via string paths in Next.js
const hero_main = '/screenshots/hero-main.png';
const feature_tree = '/screenshots/feature-tree.png';

const sections = [
  { id: 'getting-started', title: 'Getting Started', icon: <Download size={18} /> },
  { id: 'formats-views', title: 'Formats & Views', icon: <Layout size={18} /> },
  { id: 'ai-feature', title: 'AI Neural Engine', icon: <Sparkles size={18} /> },
  { id: 'type-gen', title: 'Type Generator', icon: <Code2 size={18} /> },
  { id: 'recipes', title: 'Advanced Recipes', icon: <FlaskConical size={18} /> },
  { id: 'shortcuts', title: 'Shortcuts', icon: <Keyboard size={18} /> },
  { id: 'performance', title: 'Performance', icon: <Zap size={18} /> },
  { id: 'privacy', title: 'Privacy & Data', icon: <ShieldCheck size={18} /> },
  { id: 'platform-fixes', title: 'Security Fixes', icon: <ShieldAlert size={18} /> },
];

export default function DocsPage() {
  const [activeSection, setActiveSection] = useState('getting-started');
  const [search, setSearch] = useState('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.2, rootMargin: '-10% 0px -40% 0px' }
    );

    sections.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const navigateTo = (e: React.MouseEvent, path: string) => {
    e.preventDefault();
    window.dispatchEvent(new CustomEvent('navigate', { detail: path }));
  };

  // Compile documentation context for the AI Assistant
  const docContext = useMemo(() => {
    return `Tree File Documentation context loaded.`;
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white transition-colors duration-300">
      <Navbar />
      
      <main className="relative pt-32 pb-24 px-6">
        <HeroBackground />
        
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12">
          
          {/* --- Left Sidebar: Sticky Navigation --- */}
          <aside className="lg:w-1/4">
            <div className="lg:sticky lg:top-32 space-y-8">
              <div className="flex items-center gap-3 px-4 py-2 rounded-2xl bg-white dark:bg-teal-500/10 border border-slate-200 dark:border-teal-500/20 text-teal-600 dark:text-teal-400 w-fit shadow-sm">
                <BookOpen size={16} />
                <span className="text-xs font-black uppercase tracking-widest">Documentation</span>
              </div>
              
              <div className="mb-2 px-2">
                <input
                  type="text"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="Search docs..."
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 transition"
                />
              </div>
              <nav className="flex flex-col gap-1 max-h-[50vh] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-teal-500/10 hover:scrollbar-thumb-teal-500/30 scrollbar-track-transparent">
                {sections
                  .filter(section => section.title.toLowerCase().includes(search.toLowerCase()))
                  .map((section) => (
                    <button
                      key={section.id}
                      onClick={() => scrollTo(section.id)}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all text-left ${
                        activeSection === section.id
                          ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-950 shadow-lg'
                          : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-white/5'
                      }`}
                    >
                      {section.icon}
                      {section.title}
                      {activeSection === section.id && (
                        <motion.div layoutId="arrow" className="ml-auto">
                          <ChevronRight size={14} />
                        </motion.div>
                      )}
                    </button>
                  ))}
              </nav>

              <div className="p-6 rounded-[2rem] bg-white dark:bg-white/5 border border-slate-200 dark:border-white/5 shadow-sm">
                <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3">Community</h4>
                <div className="space-y-3">
                  <a href="https://github.com/lokmanelouk/Tree-file" target="_blank" className="flex items-center justify-between text-sm font-bold text-slate-600 dark:text-slate-300 hover:text-teal-500 transition-colors group">
                    GitHub Repository
                    <ExternalLink size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                  <a href="/changelog" onClick={(e) => navigateTo(e, '/changelog')} className="flex items-center justify-between text-sm font-bold text-slate-600 dark:text-slate-300 hover:text-teal-500 transition-colors group">
                    Changelog
                    <History size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </div>
              </div>
            </div>
          </aside>

          {/* --- Right Content Area --- */}
          <div className="lg:w-3/4 space-y-32">
            
            {/* Section: Getting Started */}
            <section id="getting-started" className="scroll-mt-32">
              <h1 className="text-4xl md:text-6xl font-black mb-8 tracking-tight">Getting Started</h1>
              <p className="text-xl text-slate-500 dark:text-slate-400 leading-relaxed mb-8">
                Tree File is a high-performance desktop application for exploring complex data structures. Built for speed, privacy, and deep structural analysis.
              </p>

              <div className="mb-12 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-800 overflow-hidden bg-white dark:bg-slate-900">
                <img 
                  src={hero_main}
                  alt="Tree File Interface" 
                  className="w-full h-auto"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                <div className="p-8 rounded-[2.5rem] bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/5 shadow-sm">
                  <div className="w-12 h-12 rounded-2xl bg-teal-500/10 text-teal-500 flex items-center justify-center mb-6">
                    <Download size={24} />
                  </div>
                  <h3 className="text-2xl font-black mb-3">Installation</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">
                    Download the latest version for your OS from the <a href="/download" onClick={(e) => navigateTo(e, '/download')} className="text-teal-500 font-bold hover:underline">Download Center</a>. 
                    Run the installer and follow the prompt. For security bypass instructions, see the <button onClick={() => scrollTo('platform-fixes')} className="text-teal-500 font-bold hover:underline">Security Fixes</button> section.
                  </p>
                </div>
                <div className="p-8 rounded-[2.5rem] bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/5 shadow-sm">
                  <div className="w-12 h-12 rounded-2xl bg-blue-500/10 text-blue-500 flex items-center justify-center mb-6">
                    <FileJson size={24} />
                  </div>
                  <h3 className="text-2xl font-black mb-3">Supported Formats</h3>
                  <div className="flex flex-wrap gap-2">
                    {['JSON', 'YAML', 'XML', 'CSV'].map(format => (
                      <span key={format} className="px-3 py-1 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-white/10 text-xs font-black tracking-widest text-slate-500">
                        {format}
                      </span>
                    ))}
                  </div>
                  <p className="text-slate-500 text-sm leading-relaxed mt-4">
                    Tree File automatically detects the schema and chooses the optimal visualization mode for your file type.
                  </p>
                </div>
              </div>
            </section>

            {/* Section: Formats & Views */}
            <section id="formats-views" className="scroll-mt-32">
              <div className="flex items-center gap-4 mb-10">
                <div className="p-3 rounded-2xl bg-slate-100 dark:bg-white/5 text-slate-900 dark:text-white border border-slate-200 dark:border-white/10">
                  <Layout size={28} />
                </div>
                <h2 className="text-4xl font-black tracking-tight">Visualization Modes</h2>
              </div>

              <div className="mb-12 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-800 overflow-hidden bg-white dark:bg-slate-900">
                <img 
                  src={feature_tree}
                  alt="Visualization Modes Comparison" 
                  className="w-full h-auto"
                />
              </div>

              <div className="space-y-6">
                <div className="p-10 rounded-[2.5rem] bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/5 flex flex-col md:flex-row gap-8 items-center shadow-sm">
                  <div className="w-20 h-20 rounded-3xl bg-teal-500/10 text-teal-500 flex items-center justify-center shrink-0">
                    <Database size={40} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black mb-2">Tree View (Hierarchy)</h3>
                    <p className="text-slate-500 leading-relaxed">
                      The default mode for JSON, YAML, and XML. Navigate deep structures with collapsible nodes, breadcrumbs, and instant key searching. Perfect for large configuration manifests.
                    </p>
                  </div>
                </div>

                <div className="p-10 rounded-[2.5rem] bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/5 flex flex-col md:flex-row gap-8 items-center shadow-sm">
                  <div className="w-20 h-20 rounded-3xl bg-blue-500/10 text-blue-500 flex items-center justify-center shrink-0">
                    <Terminal size={40} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black mb-2">Raw View (Code Editor)</h3>
                    <p className="text-slate-500 leading-relaxed">
                      A full-featured code editor with syntax highlighting and linting. Make quick edits to your data and see the tree update in real-time.
                    </p>
                  </div>
                </div>

                <div className="p-10 rounded-[2.5rem] bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/5 flex flex-col md:flex-row gap-8 items-center shadow-sm">
                  <div className="w-20 h-20 rounded-3xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center shrink-0">
                    <TableIcon size={40} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black mb-2">Table View (Datasets)</h3>
                    <p className="text-slate-500 leading-relaxed">
                      Automatically enabled for CSV files or large flat arrays. Features high-performance virtualization, column sorting, and row filtering for massive datasets.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Section: AI Neural Engine */}
            <section id="ai-feature" className="scroll-mt-32">
              <div className="flex items-center gap-4 mb-10">
                <div className="p-3 rounded-2xl bg-teal-500 text-slate-950">
                  <Sparkles size={28} />
                </div>
                <h2 className="text-4xl font-black tracking-tight">AI Neural Engine</h2>
              </div>

              <div className="p-10 rounded-[3rem] bg-slate-900 text-white relative overflow-hidden shadow-2xl">
                <div className="absolute top-0 right-0 w-80 h-80 bg-teal-500/10 blur-[120px] rounded-full -mr-20 -mt-20" />
                
                <div className="relative z-10 space-y-12">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    <div>
                      <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                        <Key className="text-teal-400" />
                        Integrated Intelligence
                      </h3>
                      <p className="text-slate-400 leading-relaxed mb-6">
                        Tree File features a built-in AI Assistant powered by Google Gemini. It can read your currently open file and answer complex structural questions.
                      </p>
                      <ul className="space-y-4">
                        <li className="flex items-start gap-3">
                          <div className="p-1 bg-teal-500/20 rounded text-teal-400 mt-1"><Search size={14} /></div>
                          <span className="text-slate-300 text-sm">"Find all users where 'active' is false and list their IDs."</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <div className="p-1 bg-teal-500/20 rounded text-teal-400 mt-1"><ShieldCheck size={14} /></div>
                          <span className="text-slate-300 text-sm">"Scan this config file for security misconfigurations."</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div className="bg-slate-800/50 rounded-2xl border border-white/10 p-6">
                      <div className="flex items-center gap-2 mb-4 border-b border-white/5 pb-4">
                        <div className="w-3 h-3 rounded-full bg-red-500"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                        <span className="ml-auto text-[10px] text-slate-500 uppercase tracking-widest font-bold">Preview</span>
                      </div>
                      <div className="space-y-4 font-mono text-xs">
                        <div className="flex gap-3">
                          <span className="text-teal-400 font-bold shrink-0">User:</span>
                          <span className="text-slate-300">Summarize the schema of this JSON file.</span>
                        </div>
                        <div className="flex gap-3">
                          <span className="text-purple-400 font-bold shrink-0">AI:</span>
                          <span className="text-slate-400">
                            This file represents a list of <strong>Products</strong>. Each object contains:
                            <br/>- <code>id</code> (Number)
                            <br/>- <code>name</code> (String)
                            <br/>- <code>attributes</code> (Nested Object)
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Section: Type Generator */}
            <section id="type-gen" className="scroll-mt-32">
              <div className="flex items-center gap-4 mb-10">
                <div className="p-3 rounded-2xl bg-indigo-500/10 text-indigo-500 border border-indigo-500/20">
                  <Code2 size={28} />
                </div>
                <h2 className="text-4xl font-black tracking-tight">Type Generator</h2>
              </div>
              <p className="text-lg text-slate-500 mb-12">
                Instantly convert your static data files into type-safe code definitions for your projects.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="group p-10 rounded-[2.5rem] bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/5 hover:border-indigo-500/30 transition-all shadow-sm">
                  <div className="mb-6 w-14 h-14 rounded-2xl bg-indigo-500/10 text-indigo-500 flex items-center justify-center">
                    <Braces size={28} />
                  </div>
                  <h3 className="text-2xl font-black mb-4">JSON to TypeScript</h3>
                  <p className="text-slate-500 mb-6 leading-relaxed text-sm">
                    Stop manually typing interfaces. Click the <strong>"Get Types"</strong> button to generate strict TypeScript interfaces based on your current file's structure.
                  </p>
                  <div className="bg-slate-950 rounded-xl p-4 font-mono text-[10px] text-indigo-300 border border-white/5 overflow-hidden">
                    <span className="text-purple-400">interface</span> <span className="text-yellow-200">User</span> {'{'} <br/>
                    &nbsp;&nbsp;id: <span className="text-blue-400">number</span>;<br/>
                    &nbsp;&nbsp;name: <span className="text-blue-400">string</span>;<br/>
                    &nbsp;&nbsp;roles: <span className="text-blue-400">string</span>[];<br/>
                    {'}'}
                  </div>
                </div>

                <div className="group p-10 rounded-[2.5rem] bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/5 hover:border-blue-500/30 transition-all shadow-sm">
                  <div className="mb-6 w-14 h-14 rounded-2xl bg-blue-500/10 text-blue-500 flex items-center justify-center">
                    <FileType size={28} />
                  </div>
                  <h3 className="text-2xl font-black mb-4">Format Conversion</h3>
                  <p className="text-slate-500 mb-6 leading-relaxed text-sm">
                    Need to send XML to a REST API? Or convert a config from YAML to JSON? Tree File handles bi-directional conversion between all supported formats instantly.
                  </p>
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest mt-auto">
                    <span>JSON</span> <ChevronRight size={12} /> <span>YAML</span> <ChevronRight size={12} /> <span>XML</span>
                  </div>
                </div>
              </div>
            </section>

            {/* Section: Advanced Recipes */}
            <section id="recipes" className="scroll-mt-32">
              <div className="flex items-center gap-4 mb-10">
                <div className="p-3 rounded-2xl bg-purple-500/10 text-purple-500 border border-purple-500/20">
                  <FlaskConical size={28} />
                </div>
                <h2 className="text-4xl font-black tracking-tight">Advanced Recipes</h2>
              </div>
              
              <div className="space-y-12">
                <div className="relative p-10 rounded-[3rem] bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-white/5">
                  <div className="flex items-start gap-6 mb-8">
                    <div className="w-14 h-14 rounded-2xl bg-white dark:bg-slate-800 shadow-sm flex items-center justify-center text-purple-500">
                      <FileSpreadsheet size={28} />
                    </div>
                    <div>
                      <h3 className="text-2xl font-black">Flattening Nested JSON</h3>
                      <p className="text-slate-500 text-sm">Convert complex hierarchies into flat structures.</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex gap-4">
                      <span className="w-8 h-8 rounded-full bg-purple-500 text-white flex items-center justify-center text-xs font-black shrink-0">1</span>
                      <p className="text-slate-600 dark:text-slate-400 text-sm py-1">Open your nested JSON file.</p>
                    </div>
                    <div className="flex gap-4">
                      <span className="w-8 h-8 rounded-full bg-purple-500 text-white flex items-center justify-center text-xs font-black shrink-0">2</span>
                      <p className="text-slate-600 dark:text-slate-400 text-sm py-1">Ask AI: <code className="bg-purple-500/10 text-purple-600 dark:text-purple-400 px-2 py-0.5 rounded italic">"Flatten this structure using dot notation."</code></p>
                    </div>
                  </div>
                </div>

                <div className="relative p-10 rounded-[3rem] bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-white/5">
                  <div className="flex items-start gap-6 mb-8">
                    <div className="w-14 h-14 rounded-2xl bg-white dark:bg-slate-800 shadow-sm flex items-center justify-center text-teal-500">
                      <ShieldCheck size={28} />
                    </div>
                    <div>
                      <h3 className="text-2xl font-black">Sanitizing Data</h3>
                      <p className="text-slate-500 text-sm">Anonymize PII before sharing files.</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex gap-4">
                      <span className="w-8 h-8 rounded-full bg-teal-500 text-slate-950 flex items-center justify-center text-xs font-black shrink-0">1</span>
                      <p className="text-slate-600 dark:text-slate-400 text-sm py-1">Paste your JSON into a new file (<kbd className="bg-slate-200 dark:bg-slate-800 px-1.5 py-0.5 rounded text-[10px]">Ctrl+N</kbd>).</p>
                    </div>
                    <div className="flex gap-4">
                      <span className="w-8 h-8 rounded-full bg-teal-500 text-slate-950 flex items-center justify-center text-xs font-black shrink-0">2</span>
                      <p className="text-slate-600 dark:text-slate-400 text-sm py-1">Ask AI: <code className="bg-teal-500/10 text-teal-600 dark:text-teal-400 px-2 py-0.5 rounded italic">"Replace emails with fake data."</code></p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Section: Keyboard Shortcuts */}
            <section id="shortcuts" className="scroll-mt-32">
              <div className="flex items-center gap-4 mb-10">
                <div className="p-3 rounded-2xl bg-slate-100 dark:bg-white/5 text-slate-900 dark:text-white border border-slate-200 dark:border-white/10">
                  <Keyboard size={28} />
                </div>
                <h2 className="text-4xl font-black tracking-tight">Keyboard Shortcuts</h2>
              </div>

              <div className="overflow-hidden rounded-[2.5rem] border border-slate-200 dark:border-white/5 bg-white dark:bg-slate-900 shadow-sm">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 dark:bg-white/5 border-b border-slate-200 dark:border-white/5">
                      <th className="px-8 py-5 text-sm font-black uppercase tracking-widest text-slate-400">Action</th>
                      <th className="px-8 py-5 text-sm font-black uppercase tracking-widest text-slate-400 text-right">Shortcut</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                    {[
                      { action: "Open File", keys: ["Ctrl", "O"] },
                      { action: "Save Changes", keys: ["Ctrl", "S"] },
                      { action: "Command Palette", keys: ["Ctrl", "K"] },
                      { action: "Search in File", keys: ["Ctrl", "F"] },
                      { action: "Toggle Sidebar", keys: ["Ctrl", "B"] },
                      { action: "AI Prompt", keys: ["Ctrl", "Space"] },
                      { action: "Toggle Theme", keys: ["Ctrl", "Shift", "T"] },
                    ].map((row, i) => (
                      <tr key={i} className="group hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
                        <td className="px-8 py-5 text-slate-900 dark:text-slate-200 font-bold">{row.action}</td>
                        <td className="px-8 py-5 text-right">
                          <div className="flex gap-1 justify-end">
                            {row.keys.map(key => (
                              <kbd key={key} className="px-2 py-1 rounded-md bg-slate-100 dark:bg-white/10 border border-slate-300 dark:border-white/10 text-[11px] font-black text-slate-600 dark:text-slate-400 shadow-sm">
                                {key}
                              </kbd>
                            ))}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* Section: Performance */}
            <section id="performance" className="scroll-mt-32">
              <div className="flex items-center gap-4 mb-10">
                <div className="p-3 rounded-2xl bg-amber-500 text-slate-950">
                  <Zap size={28} />
                </div>
                <h2 className="text-4xl font-black tracking-tight">Performance & Limits</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="p-10 rounded-[2.5rem] border border-slate-200 dark:border-white/5 bg-slate-50/50 dark:bg-slate-900/50">
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <TableIcon className="text-amber-500" size={20} />
                    Automatic Table Mode
                  </h3>
                  <p className="text-sm text-slate-500 leading-relaxed">
                    When opening a CSV file or a flat JSON array with more than <strong>300 rows</strong>, Tree File automatically switches to Table View. 
                    This ensures the UI remains responsive and memory consumption is minimized.
                  </p>
                </div>
                <div className="p-10 rounded-[2.5rem] border border-slate-200 dark:border-white/5 bg-slate-50/50 dark:bg-slate-900/50">
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <ShieldAlert className="text-amber-500" size={20} />
                    Massive File Handling
                  </h3>
                  <p className="text-sm text-slate-500 leading-relaxed">
                    Files over <strong>500MB</strong> may have Tree View disabled by default. We recommend using the Search and Filter tools in Raw View for files of this magnitude to prevent main-thread freezing.
                  </p>
                </div>
              </div>
            </section>

            {/* Section: Privacy & Data */}
            <section id="privacy" className="scroll-mt-32">
              <div className="p-12 rounded-[3rem] bg-emerald-500/5 border border-emerald-500/20 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 blur-[80px] rounded-full -mr-20 -mt-20" />
                
                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="p-3 rounded-2xl bg-emerald-500 text-white">
                      <ShieldCheck size={28} />
                    </div>
                    <h2 className="text-4xl font-black tracking-tight">Privacy & Data Governance</h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-slate-600 dark:text-slate-300">
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 font-black text-xs uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
                        <EyeOff size={16} />
                        No Telemetry
                      </div>
                      <p className="text-sm leading-relaxed">We don't collect usage statistics, crash reports, or feature analytics. Your interaction with the app is private.</p>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 font-black text-xs uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
                        <Database size={16} />
                        Offline First
                      </div>
                      <p className="text-sm leading-relaxed">Tree File is 100% functional without an internet connection. Your local environment remains air-gapped.</p>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 font-black text-xs uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
                        <Sparkles size={16} />
                        Secure AI
                      </div>
                      <p className="text-sm leading-relaxed">Data is only sent to AI providers when you explicitly use the Chat feature. We never pre-scan your files.</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Section: Security Fixes */}
            <section id="platform-fixes" className="scroll-mt-32">
              <div className="flex items-center gap-4 mb-10">
                <div className="p-3 rounded-2xl bg-slate-900 dark:bg-white text-white dark:text-slate-950">
                  <ShieldAlert size={28} />
                </div>
                <h2 className="text-4xl font-black tracking-tight">System Security Fixes</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                    <Laptop className="text-blue-500" />
                    <h3 className="text-xl font-bold">Windows SmartScreen</h3>
                  </div>
                  <p className="text-sm text-slate-500 leading-relaxed">
                    If Windows says "Windows protected your PC", click <strong>"More info"</strong> and then <strong>"Run anyway"</strong>. This appears because the app is independently signed.
                  </p>
                </div>

                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                    <Apple className="text-slate-400" />
                    <h3 className="text-xl font-bold">macOS Gatekeeper</h3>
                  </div>
                  <p className="text-sm text-slate-500 leading-relaxed">
                    If macOS says the app is damaged, run this in Terminal:
                  </p>
                  <div className="p-4 bg-slate-900 rounded-xl font-mono text-[11px] text-emerald-400 border border-slate-800 break-all">
                    xattr -cr /Applications/"Tree File.app"
                  </div>
                </div>
              </div>
            </section>

          </div>
        </div>
      </main>

      {/* Floating Documentation AI Chatbot */}
      <DocChat context={docContext} />

      <Footer />
    </div>
  );
}

function CheckCircle2({ size, className }: { size?: number; className?: string }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={size || 24} 
      height={size || 24} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/>
    </svg>
  );
}