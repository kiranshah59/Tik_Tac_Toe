// ============================================================
// Navbar Component — Responsive navigation
// ============================================================

import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Gamepad2, History, BarChart3, Trophy, Menu, X } from 'lucide-react';
import { ThemeToggle } from '../ui/Toggle';

const navLinks = [
  { path: '/', label: 'Home', icon: Home },
  { path: '/settings', label: 'Play', icon: Gamepad2 },
  { path: '/history', label: 'History', icon: History },
  { path: '/stats', label: 'Stats', icon: BarChart3 },
  { path: '/achievements', label: 'Achievements', icon: Trophy },
];

export const Navbar: React.FC = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-dark-bg/80 backdrop-blur-xl border-b border-white/5 transition-all" role="navigation" aria-label="Main navigation">
      <div className="w-[calc(100%-120px)] mx-auto">
        <div className="flex items-center justify-between h-[72px] relative">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-4 group focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-full"
            aria-label="Tic-Tac-Toe Home"
          >
            <div className="w-12 h-12 rounded-full bg-[#2A62FF] flex items-center justify-center font-bold text-white text-xl shadow-[0_0_15px_rgba(42,98,255,0.7)] transition-transform group-hover:scale-105">
              T³
            </div>
            <span className="font-[family-name:var(--font-heading)] font-bold text-2xl hidden sm:inline tracking-tight text-white/90 group-hover:text-white transition-colors">
              Tic-Tac-Toe
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center gap-8">
            {navLinks.map(({ path, label, icon: Icon }) => {
              const isActive = location.pathname === path || (path === '/settings' && location.pathname === '/play');
              return (
                <Link
                  key={path}
                  to={path}
                  className={`
                    relative flex items-center gap-3 px-6 py-3 rounded-full text-[17px] font-semibold tracking-wide
                    transition-all duration-300
                    focus:outline-none focus-visible:ring-2 focus-visible:ring-primary
                    ${isActive
                      ? 'text-white bg-[#0F142A] shadow-[inset_0_1px_0_rgba(255,255,255,0.05),0_0_15px_rgba(139,92,246,0.1)]'
                      : 'text-secondary/70 hover:text-white hover:bg-white/5 hover:-translate-y-0.5'
                    }
                  `}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <Icon size={20} className={isActive ? 'text-primary' : 'group-hover:text-primary-light transition-colors'} />
                  <span>{label}</span>
                  {isActive && (
                    <span className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-[2px] bg-gradient-to-r from-transparent via-[#4F46E5] to-transparent opacity-100 shadow-[0_0_10px_rgba(79,70,229,0.8)]" />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Right section */}
          <div className="flex items-center gap-4">
            <ThemeToggle />

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              className="md:hidden p-1.5 rounded-lg text-secondary/70 hover:text-white hover:bg-white/10 transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              aria-label="Toggle mobile menu"
              aria-expanded={isMobileOpen}
            >
              {isMobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out bg-dark-bg/95 backdrop-blur-2xl border-b border-white/5 ${isMobileOpen ? 'max-h-64 border-b' : 'max-h-0 border-none'}`}
      >
        <div className="px-4 py-3 space-y-1">
          {navLinks.map(({ path, label, icon: Icon }) => {
            const isActive = location.pathname === path || (path === '/settings' && location.pathname === '/play');
            return (
              <Link
                key={path}
                to={path}
                onClick={() => setIsMobileOpen(false)}
                className={`
                  flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold tracking-wide
                  transition-all duration-200
                  focus:outline-none focus-visible:ring-2 focus-visible:ring-primary
                  ${isActive
                    ? 'bg-primary/10 text-white'
                    : 'text-secondary/70 hover:bg-white/5 hover:text-white'
                  }
                `}
                aria-current={isActive ? 'page' : undefined}
              >
                <Icon size={16} className={isActive ? 'text-primary' : ''} />
                <span>{label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
};
