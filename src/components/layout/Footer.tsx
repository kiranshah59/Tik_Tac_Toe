// ============================================================
// Footer Component — Premium SaaS Footer
// ============================================================

import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Sparkles, Code2, Component, Wind, Database, ArrowUpRight, Briefcase } from 'lucide-react';

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

const FooterLink = ({ to, children }: { to: string; children: React.ReactNode }) => (
  <Link
    to={to}
    className="text-[12px] text-[#556080] hover:text-white transition-colors duration-200"
  >
    {children}
  </Link>
);

const ExternalLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="text-[12px] text-[#556080] hover:text-[#22D3EE] transition-colors duration-200 flex items-center gap-1 group"
  >
    {children}
    <ArrowUpRight size={10} className="opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
  </a>
);

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-[#060918] border-t border-white/[0.05] mt-auto z-10 relative">
      {/* Decorative top glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-px bg-gradient-to-r from-transparent via-[#6366F1]/40 to-transparent" />

      <div className="max-w-[1280px] mx-auto px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-6">

          {/* Brand — span 4 */}
          <div className="md:col-span-4 flex flex-col gap-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#6366F1] to-[#8B5CF6] flex items-center justify-center text-[11px] font-bold text-white shadow-[0_0_16px_rgba(99,102,241,0.35)]">
                T³
              </div>
              <span className="font-semibold font-[family-name:var(--font-heading)] text-[15px] tracking-tight text-white">
                Tic-Tac-Toe
              </span>
            </div>
            <p className="text-[11px] text-[#556080] leading-relaxed max-w-[260px]">
              The ultimate classic game reimagined with modern design, smart AI, and premium aesthetics.
            </p>
            <div className="flex items-center gap-2 mt-1">
              <a href="#" className="w-7 h-7 rounded-full bg-white/[0.03] border border-white/[0.06] flex items-center justify-center text-[#556080] hover:text-white hover:border-[#6366F1]/40 hover:bg-[#6366F1]/10 transition-all duration-300" aria-label="GitHub">
                <GithubIcon size={13} />
              </a>
              <a href="#" className="w-7 h-7 rounded-full bg-white/[0.03] border border-white/[0.06] flex items-center justify-center text-[#556080] hover:text-white hover:border-[#22D3EE]/40 hover:bg-[#22D3EE]/10 transition-all duration-300" aria-label="LinkedIn">
                <LinkedinIcon size={13} />
              </a>
              <a href="#" className="w-7 h-7 rounded-full bg-white/[0.03] border border-white/[0.06] flex items-center justify-center text-[#556080] hover:text-white hover:border-[#8B5CF6]/40 hover:bg-[#8B5CF6]/10 transition-all duration-300" aria-label="Portfolio">
                <Briefcase size={13} />
              </a>
              <a href="#" className="w-7 h-7 rounded-full bg-white/[0.03] border border-white/[0.06] flex items-center justify-center text-[#556080] hover:text-white hover:border-[#F59E0B]/40 hover:bg-[#F59E0B]/10 transition-all duration-300" aria-label="Email">
                <Mail size={13} />
              </a>
            </div>
          </div>

          {/* Product Links — span 2 */}
          <div className="md:col-span-2 flex flex-col gap-3">
            <h3 className="text-[10px] font-bold text-[#7a85a3] uppercase tracking-[0.15em]">Product</h3>
            <div className="flex flex-col gap-2">
              <FooterLink to="/">Home</FooterLink>
              <FooterLink to="/settings">Play Now</FooterLink>
              <FooterLink to="/history">History</FooterLink>
              <FooterLink to="/stats">Statistics</FooterLink>
              <FooterLink to="/achievements">Achievements</FooterLink>
            </div>
          </div>

          {/* Resources — span 2 */}
          <div className="md:col-span-2 flex flex-col gap-3">
            <h3 className="text-[10px] font-bold text-[#7a85a3] uppercase tracking-[0.15em]">Resources</h3>
            <div className="flex flex-col gap-2">
              <ExternalLink href="#">Source Code</ExternalLink>
              <ExternalLink href="#">Documentation</ExternalLink>
              <ExternalLink href="#">Report Issue</ExternalLink>
            </div>
          </div>

          {/* Tech Stack — span 4 */}
          <div className="md:col-span-4 flex flex-col gap-3">
            <h3 className="text-[10px] font-bold text-[#7a85a3] uppercase tracking-[0.15em]">Powered By</h3>
            <div className="flex flex-wrap gap-1.5">
              {[
                { icon: Component, name: 'React', color: '#61DAFB' },
                { icon: Code2, name: 'TypeScript', color: '#3178C6' },
                { icon: Wind, name: 'Tailwind', color: '#38BDF8' },
                { icon: Database, name: 'Zustand', color: '#FACC15' },
                { icon: Sparkles, name: 'Vite', color: '#646CFF' },
              ].map((tech) => (
                <div
                  key={tech.name}
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/[0.02] border border-white/[0.05] hover:border-white/[0.12] hover:bg-white/[0.04] transition-all duration-200 cursor-default"
                >
                  <tech.icon size={11} style={{ color: tech.color }} />
                  <span className="text-[10px] font-medium text-[#556080]">{tech.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 pt-5 border-t border-white/[0.04] flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[11px] text-[#3d4663]">
            © {new Date().getFullYear()} Tic-Tac-Toe. All rights reserved.
          </p>
          <div className="flex items-center gap-5 text-[11px] text-[#3d4663]">
            <a href="#" className="hover:text-[#7a85a3] transition-colors">Privacy</a>
            <a href="#" className="hover:text-[#7a85a3] transition-colors">Terms</a>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] shadow-[0_0_6px_#10B981]" />
              <span className="text-[#556080]">Operational</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
