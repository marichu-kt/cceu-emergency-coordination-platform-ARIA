import React from 'react';

interface ChipFilterProps {
  label: string;
  active?: boolean;
  onClick?: () => void;
}

export function ChipFilter({ label, active = false, onClick }: ChipFilterProps) {
  return (
    <button
      onClick={onClick}
      className={`
        px-4 py-2 rounded-[8px] caption transition-all min-h-[36px]
        ${active 
          ? 'bg-[var(--primary)] text-white' 
          : 'bg-white text-[var(--text)] border border-[var(--border)] hover:bg-[#f1f5f9]'
        }
      `}
    >
      {label}
    </button>
  );
}
