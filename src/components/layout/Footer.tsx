// ============================================================
// Footer Component — Professional footer
// ============================================================

import React from 'react';
import { Globe, Mail, Code2 } from 'lucide-react';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-white/10 bg-dark-bg/50 backdrop-blur-md z-10 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          
          {/* Brand & Copyright */}
          <div className="flex flex-col items-center md:items-start gap-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center font-bold text-white text-sm shadow-lg shadow-primary/20">
                T³
              </div>
              <span className="font-bold font-[family-name:var(--font-heading)] text-lg">
                Tic-Tac-Toe
              </span>
            </div>
            <p className="text-sm text-secondary/60">
              © {currentYear} Project Name. All rights reserved.
            </p>
          </div>

          {/* Tech Stack */}
          <div className="flex flex-col items-center justify-center gap-2">
            <div className="flex items-center gap-2 text-sm text-secondary/80 font-medium">
              <Code2 size={16} />
              <span>Built with React + TypeScript</span>
            </div>
            <p className="text-xs text-secondary/60">
              Tailwind CSS, Zustand, Vite
            </p>
          </div>

          {/* Social Links */}
          <div className="flex items-center justify-center md:justify-end gap-4">
            <a 
              href="#" 
              className="p-2 rounded-full bg-white/5 border border-white/10 text-secondary/80 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all duration-300 hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-primary"
              aria-label="Website"
            >
              <Globe size={18} />
            </a>
            <a 
              href="#" 
              className="p-2 rounded-full bg-white/5 border border-white/10 text-secondary/80 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all duration-300 hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-primary"
              aria-label="Contact"
            >
              <Mail size={18} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
