import React, { useEffect } from 'react';
import { X, AlertTriangle } from 'lucide-react';
import { Button } from './Button';

interface ModalDeleteConfirmProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  message?: string;
}

export function ModalDeleteConfirm({ 
  isOpen, 
  onClose, 
  onConfirm,
  title = "Eliminar incidencia",
  message = "¿Seguro que quieres eliminar esta incidencia? Esta acción no se puede deshacer."
}: ModalDeleteConfirmProps) {
  
  // Handle ESC key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-[12px] max-w-md w-full p-6"
        style={{ boxShadow: '0 8px 24px rgba(0,0,0,0.15)' }}
        onClick={(e) => e.stopPropagation()}
        role="alertdialog"
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-[8px] bg-[#FEE2E2]">
              <AlertTriangle className="w-6 h-6 text-[#DC2626]" />
            </div>
            <h2 id="modal-title" className="text-[#DC2626]">{title}</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-[#f1f5f9] rounded-[8px] transition-colors"
            aria-label="Cerrar modal"
          >
            <X className="w-5 h-5 text-[var(--muted)]" />
          </button>
        </div>

        {/* Content */}
        <p id="modal-description" className="text-[var(--text)] mb-8">
          {message}
        </p>

        {/* Actions */}
        <div className="flex items-center justify-end gap-3">
          <Button variant="secondary" onClick={onClose}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={onConfirm}>
            Eliminar
          </Button>
        </div>
      </div>
    </div>
  );
}