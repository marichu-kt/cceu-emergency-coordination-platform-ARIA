import React from 'react';
import { AlertCircle, AlertTriangle, Info } from 'lucide-react';

type Priority = 'P1' | 'P2' | 'P3';

interface TagPriorityProps {
  priority: Priority;
  onClick?: () => void;
  selectable?: boolean;
  selected?: boolean;
}

export function TagPriority({ priority, onClick, selectable = false, selected = false }: TagPriorityProps) {
  const config = {
    P1: {
      label: 'P1 - Crítica',
      icon: AlertCircle,
      color: 'var(--p1)',
      bgColor: '#FEE2E2',
    },
    P2: {
      label: 'P2 - Alta',
      icon: AlertTriangle,
      color: 'var(--p2)',
      bgColor: '#FEF3C7',
    },
    P3: {
      label: 'P3 - Normal',
      icon: Info,
      color: 'var(--p3)',
      bgColor: '#D1FAE5',
    },
  };

  const { label, icon: Icon, color, bgColor } = config[priority];

  return (
    <button
      onClick={onClick}
      disabled={!selectable}
      className={`
        inline-flex items-center gap-2 px-3 py-2 rounded-[8px] transition-all
        ${selectable ? 'cursor-pointer hover:opacity-80' : 'cursor-default'}
        ${selected ? 'ring-2 ring-offset-2' : ''}
      `}
      style={{
        backgroundColor: bgColor,
        color: color,
        ringColor: selected ? color : undefined,
      }}
    >
      <Icon className="w-4 h-4" />
      <span className="caption" style={{ fontWeight: 500 }}>
        {label}
      </span>
    </button>
  );
}
