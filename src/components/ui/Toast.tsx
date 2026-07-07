// ============================================================
// Toast Component — Notification system
// ============================================================

import React from 'react';
import { useToastStore } from '../../stores/toastStore';
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react';
import type { ToastType } from '../../types';

const iconMap: Record<ToastType, React.ReactNode> = {
  success: <CheckCircle size={20} className="text-success" />,
  error: <AlertCircle size={20} className="text-error" />,
  info: <Info size={20} className="text-accent" />,
  warning: <AlertTriangle size={20} className="text-warning" />,
};

const bgMap: Record<ToastType, string> = {
  success: 'border-l-4 border-l-success',
  error: 'border-l-4 border-l-error',
  info: 'border-l-4 border-l-accent',
  warning: 'border-l-4 border-l-warning',
};

export const ToastContainer: React.FC = () => {
  const toasts = useToastStore((s) => s.toasts);
  const removeToast = useToastStore((s) => s.removeToast);

  if (toasts.length === 0) return null;

  return (
    <div
      className="fixed top-4 right-4 z-[100] flex flex-col gap-3 max-w-sm w-full pointer-events-none"
      aria-live="polite"
      aria-label="Notifications"
    >
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`
            glass rounded-xl p-4 flex items-start gap-3
            animate-slide-down shadow-xl pointer-events-auto
            ${bgMap[toast.type]}
          `}
          role="alert"
        >
          <span className="flex-shrink-0 mt-0.5">{iconMap[toast.type]}</span>
          <p className="flex-1 text-sm font-medium">{toast.message}</p>
          <button
            onClick={() => removeToast(toast.id)}
            className="flex-shrink-0 p-1 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Dismiss notification"
          >
            <X size={16} />
          </button>
        </div>
      ))}
    </div>
  );
};
