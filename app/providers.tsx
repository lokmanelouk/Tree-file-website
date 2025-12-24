'use client';

import * as React from 'react';
import { ThemeProvider } from 'next-themes';

// Fix: Make children optional to prevent "Property 'children' is missing in type '{}'" errors
export function Providers({ children }: { children?: React.ReactNode }) {
  return (
    <ThemeProvider 
      attribute="class" 
      defaultTheme="system" 
      enableSystem 
      disableTransitionOnChange
    >
      {children}
    </ThemeProvider>
  );
}
