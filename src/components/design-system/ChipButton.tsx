import type { LucideIcon } from "lucide-react";

interface ChipButtonProps {
  label: string;
  icon: LucideIcon;
  selected: boolean;
  onClick: () => void;
  variant: "fire" | "rain" | "snow" | "p1" | "p2" | "p3";
}

export function ChipButton({ label, icon: Icon, selected, onClick, variant }: ChipButtonProps) {
  const variants = {
    fire: {
      bg: selected ? "bg-[#FEE2E2]" : "bg-white",
      border: selected ? "border-[#EF4444]" : "border-[var(--border)]",
      text: selected ? "text-[#991B1B]" : "text-[var(--text)]", // más contraste
      icon: selected ? "text-[#B91C1C]" : "text-[var(--muted)]",
    },
    rain: {
      bg: selected ? "bg-[#DBEAFE]" : "bg-white",
      border: selected ? "border-[#3B82F6]" : "border-[var(--border)]",
      text: selected ? "text-[#1E3A8A]" : "text-[var(--text)]", // más contraste
      icon: selected ? "text-[#1D4ED8]" : "text-[var(--muted)]",
    },
    snow: {
      bg: selected ? "bg-[#CFFAFE]" : "bg-white",
      border: selected ? "border-[#06B6D4]" : "border-[var(--border)]",
      text: selected ? "text-[#0C4A6E]" : "text-[var(--text)]", // más contraste
      icon: selected ? "text-[#0E7490]" : "text-[var(--muted)]",
    },
    p1: {
      bg: selected ? "bg-[#FEE2E2]" : "bg-white",
      border: selected ? "border-[#EF4444]" : "border-[var(--border)]",
      text: selected ? "text-[#991B1B]" : "text-[var(--text)]", // más contraste
      icon: selected ? "text-[#B91C1C]" : "text-[var(--muted)]",
    },
    p2: {
      bg: selected ? "bg-[#FEF3C7]" : "bg-white",
      border: selected ? "border-[#F59E0B]" : "border-[var(--border)]",
      text: selected ? "text-[#92400E]" : "text-[var(--text)]", // ✅ pasa contraste
      icon: selected ? "text-[#B45309]" : "text-[var(--muted)]",
    },
    p3: {
      bg: selected ? "bg-[#D1FAE5]" : "bg-white",
      border: selected ? "border-[#10B981]" : "border-[var(--border)]",
      text: selected ? "text-[#065F46]" : "text-[var(--text)]", // ✅ pasa contraste
      icon: selected ? "text-[#047857]" : "text-[var(--muted)]",
    },
  } as const;

  const style = variants[variant];

  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "inline-flex items-center gap-2 px-4 py-2.5 rounded-[8px] border-2",
        "transition-all min-h-[44px] hover:shadow-sm",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2",
        style.bg,
        style.border,
        style.text,
      ].join(" ")}
      aria-pressed={selected}
    >
      <Icon className={`w-5 h-5 ${style.icon}`} aria-hidden="true" focusable="false" />
      <span className="font-medium">{label}</span>
    </button>
  );
}
