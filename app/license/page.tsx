import React from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { FileCode, Terminal } from 'lucide-react';

export default function LicensePage() {
  const mitText = `MIT License

Copyright (c) 2024 Tree File Project

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.`;

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-white transition-colors duration-300">
      <Navbar />
      <main className="pt-32 pb-24 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-600 dark:text-orange-400 text-xs font-black uppercase tracking-[0.2em] mb-6">
              <FileCode size={14} />
              Open Source
            </div>
            <h1 className="text-5xl font-black mb-6 tracking-tight">MIT License</h1>
            <p className="text-xl text-slate-500 dark:text-slate-400">
              Free to use, modify, and distribute.
            </p>
          </div>

          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-teal-500 to-emerald-500 rounded-3xl blur opacity-20 group-hover:opacity-30 transition duration-1000"></div>
            <div className="relative bg-slate-950 rounded-3xl border border-slate-800 shadow-2xl overflow-hidden">
              <div className="flex items-center justify-between px-8 py-4 bg-slate-900/50 border-b border-slate-800">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-slate-800" />
                  <div className="w-3 h-3 rounded-full bg-slate-800" />
                  <div className="w-3 h-3 rounded-full bg-slate-800" />
                </div>
                <div className="flex items-center gap-2 text-slate-500 font-mono text-[10px] uppercase tracking-widest">
                  <Terminal size={14} />
                  LICENSE.txt
                </div>
              </div>
              <pre className="p-8 md:p-12 text-slate-300 font-mono text-sm leading-relaxed overflow-x-auto whitespace-pre-wrap selection:bg-teal-500/30">
                {mitText}
              </pre>
            </div>
          </div>

          <div className="mt-16 text-center">
            <p className="text-slate-500 text-sm">
              Tree File is proud to be part of the open-source ecosystem. 
              <br className="hidden sm:block" />
              Check out our <a href="https://github.com/lokmanelouk/Tree-file" className="text-teal-500 font-bold hover:underline">GitHub repository</a> for more information.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}