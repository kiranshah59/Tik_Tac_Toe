// ============================================================
// Button Component — Reusable button with variants
// ============================================================

import React from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger' | 'accent' | 'outline';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  isLoading?: boolean;
  fullWidth?: boolean;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-gradient-to-r from-primary to-accent hover:from-primary-light hover:to-accent-light text-white shadow-lg shadow-primary/30 hover:shadow-primary/50 border border-white/10 hover:-translate-y-0.5',
  secondary:
    'bg-secondary hover:bg-secondary-light text-white shadow-lg shadow-secondary/25 hover:shadow-secondary/40 hover:-translate-y-0.5',
  ghost:
    'bg-transparent hover:bg-white/5 text-secondary/90 hover:text-white',
  outline:
    'bg-transparent hover:bg-white/5 border border-white/20 hover:border-white/40 text-white shadow-sm hover:shadow-md hover:-translate-y-0.5 backdrop-blur-sm',
  danger:
    'bg-error hover:bg-red-400 text-white shadow-lg shadow-error/25 hover:-translate-y-0.5',
  accent:
    'bg-accent hover:bg-accent-light text-dark-bg shadow-lg shadow-accent/25 hover:shadow-accent/40 hover:-translate-y-0.5',
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'px-3 py-1.5 text-sm rounded-lg',
  md: 'px-5 py-2.5 text-sm font-semibold rounded-xl',
  lg: 'px-8 py-3.5 text-base font-bold rounded-2xl',
};

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  icon,
  iconPosition = 'left',
  isLoading = false,
  fullWidth = false,
  className = '',
  children,
  disabled,
  ...props
}) => {
  return (
    <button
      className={`
        inline-flex items-center justify-center gap-2
        font-semibold font-[family-name:var(--font-body)]
        transition-all duration-200 ease-out
        active:scale-[0.97] disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100
        cursor-pointer
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && (
        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-25" />
          <path d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" fill="currentColor" className="opacity-75" />
        </svg>
      )}
      {icon && iconPosition === 'left' && !isLoading && <span className="flex-shrink-0">{icon}</span>}
      {children}
      {icon && iconPosition === 'right' && <span className="flex-shrink-0">{icon}</span>}
    </button>
  );
};
