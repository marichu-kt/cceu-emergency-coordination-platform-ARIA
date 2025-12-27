// FILE: src/components/design-system/TagPriority.tsx
import { useId } from "react";

type Priority = "P1" | "P2" | "P3";

interface TagPriorityProps {
  priority: Priority;
  selectable?: boolean;
  selected?: boolean;
  onClick?: () => void;
}

const PRIORITY = {
  P1: { label: "P1 - Crítica", fg: "#7F1D1D", bg: "#FEE2E2", ring: "#EF4444" },
  P2: { label: "P2 - Alta", fg: "#92400E", bg: "#FEF3C7", ring: "#F59E0B" },
  P3: { label: "P3 - Normal", fg: "#065F46", bg: "#D1FAE5", ring: "#10B981" },
} as const;

export function TagPriority({ priority, selectable = false, selected = false, onClick }: TagPriorityProps) {
  const id = useId();
  const cfg = PRIORITY[priority];

  const base =
    "inline-flex items-center justify-center px-3 py-1 rounded-[8px] min-h-[32px] text-[13px] font-medium";

  const ringStyle = selected ? { boxShadow: `0 0 0 3px ${cfg.ring}55` } : undefined;

  if (selectable) {
    return (
      <button
        id={id}
        type="button"
        onClick={onClick}
        aria-pressed={selected}
        className={[
          base,
          "border-2 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2",
          selected ? "border-transparent" : "border-[var(--border)] hover:border-[var(--primary)]",
        ].join(" ")}
        style={{ backgroundColor: cfg.bg, color: cfg.fg, ...ringStyle }}
      >
        {cfg.label}
      </button>
    );
  }

  return (
    <span id={id} className={base} style={{ backgroundColor: cfg.bg, color: cfg.fg }}>
      {cfg.label}
    </span>
  );
}
