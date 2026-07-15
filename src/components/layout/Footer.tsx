// ============================================================
// Footer Component — Professional footer
// ============================================================

import React from 'react';
import { Mail, Sparkles, Code2, Component, Wind, Database } from 'lucide-react';

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

const TechBadge = ({ icon: Icon, name, color }: { icon: any, name: string, color: string }) => (
  <div className="flex flex-col items-center gap-2 group">
    <div className={`w-12 h-12 rounded-[14px] bg-[#0b1022] border border-white/[0.04] flex items-center justify-center transition-all duration-300 group-hover:-translate-y-1 group-hover:bg-[#111832] group-hover:border-[${color}]/30 group-hover:shadow-[0_0_15px_rgba(0,0,0,0.5)]`}>
      <Icon size={20} style={{ color }} className="drop-shadow-[0_0_8px_currentColor] opacity-80 group-hover:opacity-100 transition-opacity" />
    </div>
    <span className="text-[10px] font-semibold text-[#556080] group-hover:text-[#8a94b5] transition-colors">{name}</span>
  </div>
);

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-[#080B1A] border-t border-white/[0.04] py-12 md:py-16 z-10 relative">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-start">
          
          {/* Left: Brand & Description */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#6366F1] to-[#8B5CF6] flex items-center justify-center font-bold text-white shadow-[0_0_20px_rgba(99,102,241,0.4)]">
                T³
              </div>
              <span className="font-bold font-[family-name:var(--font-heading)] text-xl tracking-tight text-white">
                Tic-Tac-Toe
              </span>
            </div>
            <p className="text-[13px] text-[#7a85a3] max-w-[280px] leading-relaxed">
              The ultimate classic game reimagined with modern design and smart AI.
            </p>
            <div className="flex items-center gap-3 mt-2">
              <a href="#" className="w-9 h-9 rounded-full bg-[#0b1022] border border-white/[0.04] flex items-center justify-center text-[#556080] hover:text-white hover:bg-[#111832] hover:border-[#6366F1]/30 transition-all duration-300 hover:-translate-y-0.5" aria-label="GitHub"><GithubIcon size={15} /></a>
              <a href="#" className="w-9 h-9 rounded-full bg-[#0b1022] border border-white/[0.04] flex items-center justify-center text-[#556080] hover:text-white hover:bg-[#111832] hover:border-[#6366F1]/30 transition-all duration-300 hover:-translate-y-0.5" aria-label="LinkedIn"><LinkedinIcon size={15} /></a>
              <a href="#" className="w-9 h-9 rounded-full bg-[#0b1022] border border-white/[0.04] flex items-center justify-center text-[#556080] hover:text-white hover:bg-[#111832] hover:border-[#6366F1]/30 transition-all duration-300 hover:-translate-y-0.5" aria-label="Email"><Mail size={15} /></a>
            </div>
          </div>

          {/* Center: Built With */}
          <div className="flex flex-col items-center gap-5">
            <span className="text-[11px] font-bold text-[#556080] uppercase tracking-widest">Built With</span>
            <div className="flex items-center gap-3 sm:gap-4 flex-wrap justify-center">
              <TechBadge icon={Component} name="React" color="#61DAFB" />
              <TechBadge icon={Code2} name="TypeScript" color="#3178C6" />
              <TechBadge icon={Wind} name="Tailwind" color="#38BDF8" />
              <TechBadge icon={Database} name="Zustand" color="#FACC15" />
              <TechBadge icon={Sparkles} name="Vite" color="#646CFF" />
            </div>
          </div>

          {/* Right: About */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left gap-4 h-full">
            <span className="text-[11px] font-bold text-[#556080] uppercase tracking-widest">About</span>
            <p className="text-[13px] text-[#7a85a3] max-w-[280px] leading-relaxed">
              A modern Tic-Tac-Toe experience crafted with passion.
            </p>
            <p className="text-[11px] text-[#556080] mt-auto pt-6">
              © 2026 Project Name. All rights reserved.
            </p>
          </div>

        </div>
      </div>
    </footer>
  );
};
