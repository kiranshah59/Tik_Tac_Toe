// ============================================================
// Footer Component — Professional footer
// ============================================================

import React from 'react';
import { Mail, Globe, Heart } from 'lucide-react';

const GithubIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);

const LinkedinIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export const Footer: React.FC = () => {
  return (
    <footer className="w-full border-t border-white/10 bg-dark-bg/50 backdrop-blur-md z-10 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          
          {/* Brand & Copyright */}
          <div className="flex flex-col items-center md:items-start gap-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-[#2A62FF] flex items-center justify-center font-bold text-white text-sm shadow-[0_0_15px_rgba(42,98,255,0.7)] transition-transform hover:scale-105">
                T³
              </div>
              <span className="font-bold font-[family-name:var(--font-heading)] text-lg">
                Tic-Tac-Toe
              </span>
            </div>
            <p className="text-sm text-[#8a94b5]">
              © 2026 Your Name. All rights reserved.
            </p>
          </div>

          {/* Tech Stack */}
          <div className="flex flex-col items-center justify-center gap-2">
            <div className="flex items-center gap-1.5 text-sm font-medium text-[#8a94b5]">
              <span>Built with <span className="text-[#3B82F6]">React</span> + <span className="text-[#6366F1]">TypeScript</span> + <span className="text-[#A855F7]">Tailwind CSS</span></span>
              <Heart size={14} className="text-[#A855F7] fill-[#A855F7]" />
            </div>
          </div>

          {/* Social Links */}
          <div className="flex items-center justify-center md:justify-end gap-3">
            <a 
              href="#" 
              className="w-10 h-10 rounded-full bg-[#131B3A] border border-white/5 flex items-center justify-center text-[#8a94b5] hover:text-white hover:bg-white/10 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_15px_rgba(139,92,246,0.3)] focus:outline-none focus:ring-2 focus:ring-primary"
              aria-label="GitHub"
            >
              <GithubIcon size={16} />
            </a>
            <a 
              href="#" 
              className="w-10 h-10 rounded-full bg-[#131B3A] border border-white/5 flex items-center justify-center text-[#8a94b5] hover:text-white hover:bg-white/10 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_15px_rgba(139,92,246,0.3)] focus:outline-none focus:ring-2 focus:ring-primary"
              aria-label="LinkedIn"
            >
              <LinkedinIcon size={16} />
            </a>
            <a 
              href="#" 
              className="w-10 h-10 rounded-full bg-[#131B3A] border border-white/5 flex items-center justify-center text-[#8a94b5] hover:text-white hover:bg-white/10 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_15px_rgba(139,92,246,0.3)] focus:outline-none focus:ring-2 focus:ring-primary"
              aria-label="Website"
            >
              <Globe size={16} />
            </a>
            <a 
              href="#" 
              className="w-10 h-10 rounded-full bg-[#131B3A] border border-white/5 flex items-center justify-center text-[#8a94b5] hover:text-white hover:bg-white/10 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_15px_rgba(139,92,246,0.3)] focus:outline-none focus:ring-2 focus:ring-primary"
              aria-label="Email"
            >
              <Mail size={16} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
