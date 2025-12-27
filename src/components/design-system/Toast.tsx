import React, { useEffect } from 'react';
import { CheckCircle, AlertTriangle, XCircle } from 'lucide-react';

type ToastType = 'success' | 'warning' | 'error';

interface ToastProps {
  type: ToastType;
  message: string;
  onClose?: () => void;
  duration?: number;
}

export function Toast({ type, message, onClose, duration = 1200 }: ToastProps) {
  useEffect(() => {
    if (duration && onClose) {
      const timer = setTimeout(onClose, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  const config = {
    success: {
      icon: CheckCircle,
      bg: 'var(--success)',
      text: 'white',
    },
    warning: {
      icon: AlertTriangle,
      bg: 'var(--warning)',
      text: 'white',
    },
    error: {
      icon: XCircle,
      bg: 'var(--error)',
      text: 'white',
    },
  };

  const { icon: Icon, bg, text } = config[type];

  return (
    <div
      className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 px-6 py-3 rounded-[8px] flex items-center gap-3 animate-slideDown"
      style={{ backgroundColor: bg, color: text, boxShadow: '0 4px 12px rgba(0,0,0,0.15)' }}
    >
      <Icon className="w-5 h-5" />
      <span className="font-medium">{message}</span>
    </div>
  );
}

// Add this to your globals.css for the animation
