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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2.5 group focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-lg"
            aria-label="Tic-Tac-Toe Home"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center font-bold text-white text-sm shadow-md shadow-primary/20 transition-transform group-hover:scale-105">
              T³
            </div>
            <span className="font-[family-name:var(--font-heading)] font-bold text-[17px] hidden sm:inline tracking-tight text-white/90 group-hover:text-white transition-colors">
              Tic-Tac-Toe
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-2">
            {navLinks.map(({ path, label, icon: Icon }) => {
              const isActive = location.pathname === path || (path === '/settings' && location.pathname === '/play');
              return (
                <Link
                  key={path}
                  to={path}
                  className={`
                    relative flex items-center gap-2 px-3 py-1.5 rounded-lg text-[13px] font-semibold tracking-wide
                    transition-all duration-300
                    focus:outline-none focus-visible:ring-2 focus-visible:ring-primary
                    ${isActive
                      ? 'text-white bg-white/10'
                      : 'text-secondary/70 hover:text-white hover:bg-white/5'
                    }
                  `}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <Icon size={14} className={isActive ? 'text-primary' : ''} />
                  <span>{label}</span>
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
