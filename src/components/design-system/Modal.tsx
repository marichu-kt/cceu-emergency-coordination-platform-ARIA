// FILE: src/components/design-system/Modal.tsx
import React from 'react';
import { X } from 'lucide-react';
import { Button } from './Button';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  primaryAction?: { label: string; onClick: () => void };
  secondaryAction?: { label: string; onClick: () => void };
}

export function Modal({ isOpen, onClose, title, children, primaryAction, secondaryAction }: ModalProps) {
  if (!isOpen) return null;

  const titleId = 'modal-title';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 animate-fadeIn">
      <div
        className="bg-white rounded-[12px] max-w-lg w-full max-h-[90vh] overflow-y-auto"
        style={{ boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)' }}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
      >
        <div className="flex items-center justify-between p-6 border-b border-[var(--border)]">
          <h2 id={titleId}>{title}</h2>

          <button
            type="button"
            onClick={onClose}
            className="p-2 hover:bg-[#f1f5f9] rounded transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2"
            aria-label="Cerrar"
            style={{ minHeight: 44, minWidth: 44 }}
          >
            <X className="w-5 h-5 text-[var(--muted)]" aria-hidden="true" />
          </button>
        </div>

        <div className="p-6">{children}</div>

        {(primaryAction || secondaryAction) && (
          <div className="flex items-center justify-end gap-3 p-6 border-t border-[var(--border)]">
            {secondaryAction && (
              <Button variant="secondary" onClick={secondaryAction.onClick}>
                {secondaryAction.label}
              </Button>
            )}
            {primaryAction && (
              <Button variant="primary" onClick={primaryAction.onClick}>
                {primaryAction.label}
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
