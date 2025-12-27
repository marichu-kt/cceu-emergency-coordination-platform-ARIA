import React from 'react';
import { Check } from 'lucide-react';

interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
}

export function Checkbox({ label, disabled = false, className = '', ...props }: CheckboxProps) {
  return (
    <label className={`flex items-center gap-3 cursor-pointer ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}>
      <div className="relative">
        <input
          type="checkbox"
          className="peer sr-only"
          disabled={disabled}
          {...props}
        />
        <div className="w-6 h-6 min-w-[24px] min-h-[24px] border-2 border-[var(--border)] rounded bg-white peer-checked:bg-[var(--primary)] peer-checked:border-[var(--primary)] peer-focus:ring-2 peer-focus:ring-[var(--primary)] peer-focus:ring-opacity-20 transition-all flex items-center justify-center">
          <Check className="w-4 h-4 text-white opacity-0 peer-checked:opacity-100" />
        </div>
      </div>
      {label && <span className="select-none">{label}</span>}
    </label>
  );
}
