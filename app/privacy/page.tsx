import React from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { ShieldCheck, EyeOff, ServerOff, Lock } from 'lucide-react';

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
              Your data is yours. Tree File is built to keep it that way.
            </p>
          </div>

          <div className="space-y-12 text-slate-600 dark:text-slate-400 leading-relaxed">
            <div className="bg-slate-50 dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 flex items-start gap-6 shadow-sm">
              <ServerOff className="text-emerald-500 shrink-0" size={32} />
              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Local Execution</h3>
                <p>
                  Tree File runs exclusively on your machine. We collect <strong>ZERO data</strong>. There are no tracking scripts, no telemetry, and no remote servers processing your files.
                </p>
              </div>
            </div>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">No Data Collection</h2>
              <p>
                We do not have access to your data. Whether you are viewing JSON, YAML, or XML files, the application parses the structure locally within its own sandboxed environment. We do not use any cookies or local storage for tracking purposes.
              </p>
            </section>

            <section className="bg-emerald-500/5 border border-emerald-500/10 p-8 rounded-3xl">
              <h2 className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 mb-4 flex items-center gap-2">
                <Lock size={24} />
                AI Analysis Features
              </h2>
              <p>
                When you use the optional Gemini AI analysis features:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li>Your API keys are stored locally and encrypted on your disk.</li>
                <li>Request data is sent directly to Google's API endpoints via the SDK.</li>
                <li>Tree File does not intercept or log your AI interactions.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Changes to This Policy</h2>
              <p>
                As an open-source project, any changes to the code that affect privacy will be clearly documented in our commit history and release notes. Transparency is our core value.
              </p>
            </section>

            <div className="text-center pt-12 border-t border-slate-100 dark:border-slate-900">
              <p className="text-sm font-mono text-slate-400 italic">
                Last updated: October 2024
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}