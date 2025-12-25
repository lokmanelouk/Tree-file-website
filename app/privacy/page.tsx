'use client';

import React from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { ShieldCheck, EyeOff, ServerOff, Lock, FileCode, Radio } from 'lucide-react';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-white transition-colors duration-300">
      <Navbar />
      <main className="pt-32 pb-24 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-black uppercase tracking-[0.2em] mb-6">
              <ShieldCheck size={14} />
              Privacy First
            </div>
            <h1 className="text-5xl font-black mb-6 tracking-tight">Privacy Policy</h1>
            <p className="text-xl text-slate-500 dark:text-slate-400">
              Tree File is designed to respect your data ownership.
            </p>
          </div>

          <div className="space-y-12 text-slate-600 dark:text-slate-400 leading-relaxed">
            
            {/* Summary Box */}
            <div className="bg-slate-50 dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
              <h3 className="text-sm font-black uppercase tracking-widest text-slate-400 mb-6">At a Glance</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex gap-3">
                  <ServerOff className="text-emerald-500 shrink-0" />
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white">Local Execution</h4>
                    <p className="text-xs mt-1">App logic runs 100% on your device.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <EyeOff className="text-emerald-500 shrink-0" />
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white">No Tracking</h4>
                    <p className="text-xs mt-1">We do not track your usage or file contents.</p>
                  </div>
                </div>
              </div>
            </div>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">File Processing</h2>
              <p className="mb-4">
                When you open a file in Tree File (JSON, YAML, CSV, etc.), the parsing and rendering happen exclusively in your computer's memory.
              </p>
              <div className="flex items-center gap-3 p-4 bg-slate-100 dark:bg-white/5 rounded-xl border-l-4 border-emerald-500">
                <FileCode size={20} className="text-slate-500" />
                <span className="text-sm font-medium">Your files are never uploaded to our servers. We have no access to them.</span>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">AI Assistant Usage</h2>
              <p className="mb-4">
                Tree File includes an intelligent AI Assistant feature. This feature is <strong>optional</strong>.
              </p>
              <ul className="space-y-3 mt-4">
                <li className="flex gap-3">
                  <Radio size={20} className="text-emerald-500 shrink-0 mt-0.5" />
                  <span>
                    <strong>Data Transmission:</strong> Only the specific text snippets or file contents you explicitly send in the chat window are transmitted to the AI provider for processing.
                  </span>
                </li>
                <li className="flex gap-3">
                  <Lock size={20} className="text-emerald-500 shrink-0 mt-0.5" />
                  <span>
                    <strong>No Retention:</strong> We do not log, store, or train models on your conversation history.
                  </span>
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Updates & Network</h2>
              <p>
                The application may make read-only network requests to GitHub to check for new software updates. No personal information is sent during this check.
              </p>
            </section>

            <div className="text-center pt-12 border-t border-slate-100 dark:border-slate-900">
              <p className="text-sm font-mono text-slate-400 italic">
                Last updated: December 2025
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}