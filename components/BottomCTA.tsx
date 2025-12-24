import React from 'react';
import { motion } from 'framer-motion';
import { Download, ArrowRight, Github } from 'lucide-react';

export const BottomCTA: React.FC = () => {
  return (
    <section className="py-32 px-6 relative">
      <div className="max-w-6xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative rounded-[4rem] bg-gradient-to-br from-teal-600 via-teal-500 to-emerald-500 p-12 md:p-24 text-center overflow-hidden shadow-[0_50px_100px_-20px_rgba(20,184,166,0.3)]"
        >
          {/* Pattern Background */}
          <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
          
          <div className="relative z-10">
            <h2 className="text-4xl md:text-7xl font-black text-slate-950 mb-8 leading-tight tracking-tight">
              Ready to master <br className="hidden md:block"/> your data structures?
            </h2>
            <p className="text-lg md:text-xl text-slate-950/70 mb-12 max-w-2xl mx-auto font-medium">
              Join thousands of developers who have upgraded their workflow. Tree File is free, open-source, and waiting for you.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <motion.a 
                href="/download"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto px-10 py-5 bg-slate-950 text-white rounded-[2rem] font-black text-xl flex items-center justify-center gap-3 shadow-2xl transition-all"
              >
                <Download size={24} />
                Get Tree File Now
                <ArrowRight size={20} />
              </motion.a>
              
              <motion.a 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="https://github.com/lokmanelouk/Tree-file"
                target="_blank"
                className="w-full sm:w-auto px-10 py-5 bg-white/20 backdrop-blur text-slate-950 border border-slate-950/10 rounded-[2rem] font-black text-xl flex items-center justify-center gap-3 transition-all"
              >
                <Github size={24} />
                Star on GitHub
              </motion.a>
            </div>
          </div>

          {/* Decorative Blooms */}
          <div className="absolute -top-24 -left-24 w-64 h-64 bg-white/20 blur-[100px] rounded-full" />
          <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-emerald-400/30 blur-[100px] rounded-full" />
        </motion.div>
      </div>
    </section>
  );
};