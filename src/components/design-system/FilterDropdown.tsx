import React, { useEffect, useId, useMemo, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";

interface FilterOption {
  value: string;
  label: string;
}

interface FilterDropdownProps {
  label: string;
  options: FilterOption[];
  value: string;
  onChange: (value: string) => void;
  defaultLabel?: string;
}

type MenuItem = { value: string; label: string; isDefault?: boolean };

export function FilterDropdown({
  label,
  options,
  value,
  onChange,
  defaultLabel = "Todos",
}: FilterDropdownProps) {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const menuId = useId();
  const buttonId = useId();

  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const items: MenuItem[] = useMemo(() => {
    return [{ value: "all", label: defaultLabel, isDefault: true }, ...options];
  }, [defaultLabel, options]);

  const selectedOption = options.find((opt) => opt.value === value);
  const displayText =
    value && value !== "all" && selectedOption
      ? `${label}: ${selectedOption.label}`
      : `${label}: ${defaultLabel}`;

  const closeMenu = () => {
    setIsOpen(false);
    // Devolver foco al botón
    queueMicrotask(() => buttonRef.current?.focus());
  };

  const openMenu = (focusIndex?: number) => {
    setIsOpen(true);
    const idx =
      typeof focusIndex === "number"
        ? focusIndex
        : Math.max(
            0,
            items.findIndex((it) => it.value === (value || "all"))
          );

    setActiveIndex(idx >= 0 ? idx : 0);

    // Enfocar item activo tras render
    window.setTimeout(() => {
      const el = dropdownRef.current?.querySelector<HTMLElement>(
        `[data-menu-index="${idx >= 0 ? idx : 0}"]`
      );
      el?.focus();
    }, 0);
  };

  // Cerrar al click fuera
  useEffect(() => {
    if (!isOpen) return;

    const onPointerDown = (event: PointerEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        closeMenu();
      }
    };

    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [isOpen]);

  const handleSelect = (optionValue: string) => {
    onChange(optionValue);
    closeMenu();
  };

  const moveFocus = (next: number) => {
    const clamped = (next + items.length) % items.length;
    setActiveIndex(clamped);
    window.setTimeout(() => {
      dropdownRef.current
        ?.querySelector<HTMLElement>(`[data-menu-index="${clamped}"]`)
        ?.focus();
    }, 0);
  };

  const onTriggerKeyDown: React.KeyboardEventHandler<HTMLButtonElement> = (e) => {
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      if (!isOpen) {
        const idx = items.findIndex((it) => it.value === (value || "all"));
        openMenu(idx >= 0 ? idx : 0);
      } else {
        moveFocus(e.key === "ArrowDown" ? activeIndex + 1 : activeIndex - 1);
      }
    }

    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      if (isOpen) closeMenu();
      else openMenu();
    }

    if (e.key === "Escape") {
      e.preventDefault();
      closeMenu();
    }
  };

  const onMenuKeyDown: React.KeyboardEventHandler<HTMLDivElement> = (e) => {
    if (e.key === "Escape") {
      e.preventDefault();
      closeMenu();
      return;
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();
      moveFocus(activeIndex + 1);
      return;
    }

    if (e.key === "ArrowUp") {
      e.preventDefault();
      moveFocus(activeIndex - 1);
      return;
    }

    if (e.key === "Home") {
      e.preventDefault();
      moveFocus(0);
      return;
    }

    if (e.key === "End") {
      e.preventDefault();
      moveFocus(items.length - 1);
      return;
    }

    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      const it = items[activeIndex];
      if (it) handleSelect(it.value);
    }

    // Tab debe salir del menú (no lo atrapamos como modal)
    if (e.key === "Tab") {
      setIsOpen(false);
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        ref={buttonRef}
        id={buttonId}
        type="button"
        onClick={() => (isOpen ? closeMenu() : openMenu())}
        onKeyDown={onTriggerKeyDown}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border-2 border-[var(--border)] hover:border-[var(--primary)] transition-colors min-h-[44px]"
        aria-expanded={isOpen}
        aria-haspopup="menu"
        aria-controls={menuId}
        aria-label={`Filtro: ${label}. ${displayText}`}
      >
        <span className={value && value !== "all" ? "" : "text-[var(--muted)]"}>
          {displayText}
        </span>
        <ChevronDown
          className={`w-4 h-4 text-[var(--muted)] transition-transform ${isOpen ? "rotate-180" : ""}`}
          aria-hidden="true"
        />
      </button>

      {isOpen && (
        <div
          id={menuId}
          role="menu"
          aria-labelledby={buttonId}
          tabIndex={-1}
          onKeyDown={onMenuKeyDown}
          className="absolute top-full mt-2 left-0 bg-white rounded-[12px] border border-[var(--border)] z-50 min-w-[200px] py-2"
          style={{ boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}
        >
          {items.map((option, idx) => {
            const checked = (value || "all") === option.value;
            const isActive = idx === activeIndex;

            return (
              <button
                key={option.value}
                type="button"
                role="menuitemradio"
                aria-checked={checked}
                data-menu-index={idx}
                tabIndex={isActive ? 0 : -1}
                onMouseEnter={() => setActiveIndex(idx)} // opcional: mejora UX, no rompe teclado
                onClick={() => handleSelect(option.value)}
                className={`w-full text-left px-4 py-2 hover:bg-[#f1f5f9] transition-colors ${
                  checked ? "bg-[#EFF6FF] text-[var(--primary)]" : ""
                }`}
              >
                {option.label}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
