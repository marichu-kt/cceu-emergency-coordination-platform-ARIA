import React from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'danger';
type ButtonState = 'default' | 'hover' | 'pressed' | 'disabled';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  children: React.ReactNode;
  fullWidth?: boolean;
}

export function Button({ 
  variant = 'primary', 
  children, 
  fullWidth = false,
  disabled = false,
  className = '',
  ...props 
}: ButtonProps) {
  const baseStyles = 'min-h-[44px] px-6 rounded-[8px] transition-all duration-150 font-medium';
  
  const variantStyles = {
    primary: disabled
      ? 'bg-[var(--muted)] text-white cursor-not-allowed'
      : 'bg-[var(--primary)] text-white hover:bg-[#1d4ed8] active:bg-[#1e40af] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:ring-offset-2',
    secondary: disabled
      ? 'bg-[var(--border)] text-[var(--muted)] cursor-not-allowed'
      : 'bg-white text-[var(--text)] border-2 border-[var(--border)] hover:bg-[#f1f5f9] active:bg-[#e2e8f0] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:ring-offset-2',
    tertiary: disabled
      ? 'text-[var(--muted)] cursor-not-allowed'
      : 'text-[var(--primary)] hover:bg-[#eff6ff] active:bg-[#dbeafe] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:ring-offset-2',
    danger: disabled
      ? 'bg-[var(--border)] text-[var(--muted)] cursor-not-allowed'
      : 'bg-[#DC2626] text-white border-2 border-[#DC2626] hover:bg-[#B91C1C] active:bg-[#991B1B] focus:outline-none focus:ring-2 focus:ring-[#DC2626] focus:ring-offset-2',
  };

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}