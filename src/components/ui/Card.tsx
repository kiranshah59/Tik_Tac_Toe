// ============================================================
// Card Component — Glassmorphism card
// ============================================================

import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'glass' | 'solid' | 'outline';
  hover?: boolean;
  animate?: boolean;
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  variant = 'glass',
  hover = false,
  animate = true,
  onClick,
}) => {
  const baseClasses = 'rounded-2xl p-6 transition-all duration-300 ease-out flex flex-col';

  const variantClasses = {
    glass: 'bg-white/5 border border-white/10 backdrop-blur-md shadow-sm',
    solid: 'bg-dark-card border border-dark-border',
    outline: 'border border-white/10 dark:border-white/10 bg-transparent',
  };

  const hoverClasses = hover
    ? 'hover:-translate-y-1 hover:shadow-xl hover:shadow-black/20 hover:border-white/20 hover:bg-white/10 cursor-pointer group'
    : '';

  const animateClasses = animate ? 'animate-fade-in' : '';

  return (
    <div
      className={`${baseClasses} ${variantClasses[variant]} ${hoverClasses} ${animateClasses} ${className}`}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onClick(); } } : undefined}
    >
      {children}
    </div>
  );
};
