import React from 'react';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: { value: string; label: string }[];
  fullWidth?: boolean;
}

export function Select({
  label,
  options,
  fullWidth = true,
  className = '',
  ...props
}: SelectProps) {
  return (
    <div className={`flex flex-col gap-2 ${fullWidth ? 'w-full' : ''}`}>
      {label && (
        <label className="caption text-[var(--text)]">
          {label}
        </label>
      )}
      <select
        className={`min-h-[44px] px-4 py-2 rounded-[8px] border-2 border-[var(--border)] bg-white transition-all outline-none focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)] focus:ring-opacity-20 ${className}`}
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
