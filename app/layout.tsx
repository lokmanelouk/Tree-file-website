import type { Metadata } from 'next';
import React from 'react';
import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-jetbrains',
});

export const metadata: Metadata = {
  title: 'Tree File | The Modern Data Viewer for Developers',
  description: 'Visualize, Edit, and Analyze JSON, YAML, XML, and CSV files with the power of AI.',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children?: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased bg-white dark:bg-slate-950 text-slate-900 dark:text-white transition-colors duration-300 relative`}
      >
        {/* Visual Eye Candy: Background Grid Pattern */}
        <div className="fixed inset-0 pointer-events-none -z-[1]">
          {/* Dot Pattern with CSS Radial Gradient */}
          <div 
            className="absolute inset-0 opacity-[0.25] dark:opacity-[0.15]" 
            style={{ 
              backgroundImage: 'radial-gradient(#64748b 0.5px, transparent 0.5px)', 
              backgroundSize: '24px 24px',
              maskImage: 'linear-gradient(to bottom, black 50%, transparent 100%)',
              WebkitMaskImage: 'linear-gradient(to bottom, black 50%, transparent 100%)'
            }} 
          />
          
          {/* Subtle Ambient Glows */}
          <div className="absolute top-0 -left-[10%] w-[40%] h-[40%] bg-teal-500/10 blur-[120px] rounded-full" />
          <div className="absolute bottom-[20%] -right-[10%] w-[40%] h-[40%] bg-emerald-500/10 blur-[120px] rounded-full" />
        </div>

        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}