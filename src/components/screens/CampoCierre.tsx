// FILE: src/components/screens/CampoCierre.tsx
import { useState } from 'react';
import { CheckCircle } from 'lucide-react';
import { Button } from '../design-system/Button';
import { Checkbox } from '../design-system/Checkbox';

interface CampoCierreProps {
  onClose: () => void;
}

export function CampoCierre({ onClose }: CampoCierreProps) {
  const [checklist, setChecklist] = useState([
    { id: 1, label: 'Zona asegurada', checked: false },
    { id: 2, label: 'Víctimas atendidas', checked: false },
    { id: 3, label: 'Acceso restablecido', checked: false },
    { id: 4, label: 'Evidencias adjuntas', checked: false },
  ]);

  const [notes, setNotes] = useState('');

  const handleChecklistChange = (id: number) => {
    setChecklist((prev) => prev.map((item) => (item.id === id ? { ...item, checked: !item.checked } : item)));
  };

  const allChecked = checklist.every((item) => item.checked);

  const notesId = 'campo-cierre-notas';

  return (
    <div className="min-h-screen bg-[var(--background)] flex flex-col" style={{ maxWidth: '390px', margin: '0 auto' }}>
      {/* Header */}
      <header className="bg-[var(--primary)] text-white px-4 py-4">
        <p className="text-white font-semibold">CCEU Campo</p>
        <p className="text-white mt-1" style={{ opacity: 0.95 }}>
          Cierre de tarea
        </p>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-4">
        {/* H1 real para WAVE */}
        <h1 className="mb-2 text-[20px] font-semibold text-[var(--text)]">Verificación final</h1>
        {/* Contraste mejorado */}
        <p className="text-[13px] text-[#475569] mb-6">#INC-2025-00123</p>

        {/* Checklist */}
        <section className="bg-white p-4 rounded-[12px] mb-6" style={{ boxShadow: 'var(--shadow-card)' }}>
          <h2 className="mb-2">Lista de verificación</h2>
          {/* Contraste mejorado */}
          <p className="text-[13px] text-[#475569] mb-4">Marca lo que aplique (opcional)</p>

          <div className="space-y-4">
            {checklist.map((item) => (
              <Checkbox
                key={item.id}
                label={item.label}
                checked={item.checked}
                onChange={() => handleChecklistChange(item.id)}
              />
            ))}
          </div>
        </section>

        {/* Notes */}
        <section className="bg-white p-4 rounded-[12px] mb-6" style={{ boxShadow: 'var(--shadow-card)' }}>
          <label htmlFor={notesId} className="caption text-[var(--text)] block mb-2">
            Notas adicionales (opcional)
          </label>
          <textarea
            id={notesId}
            name={notesId}
            className="w-full min-h-[100px] px-3 py-2 rounded-[8px] border-2 border-[var(--border)] bg-white transition-all outline-none resize-none focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)] focus:ring-opacity-20"
            placeholder="Observaciones finales..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </section>

        {/* Status */}
        {allChecked && (
          <div className="p-4 bg-[#D1FAE5] rounded-[8px] mb-4" role="status" aria-live="polite">
            <p className="text-[var(--success)] flex items-center gap-2">
              <CheckCircle className="w-5 h-5" aria-hidden="true" />
              Todas las verificaciones completadas
            </p>
          </div>
        )}

        {/* Actions */}
        <Button variant="primary" fullWidth onClick={onClose}>
          Cerrar tarea
        </Button>
      </main>
    </div>
  );
}
