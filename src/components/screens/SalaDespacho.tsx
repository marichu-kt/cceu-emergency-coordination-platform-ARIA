import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from '../design-system/Button';
import { TableRecursos } from '../design-system/TableRecursos';

interface SalaDespachoProps {
  onDispatch: (resourcesCount: number) => void;
  onBack: () => void;
}

export function SalaDespacho({ onDispatch, onBack }: SalaDespachoProps) {
  const [recursos, setRecursos] = useState([
    { agencia: 'Bomberos Madrid - Estación Central', capacidad: '4 efectivos, 1 autobomba', eta: '7 min', selected: false },
    { agencia: 'SAMUR - Unidad 23', capacidad: '2 paramédicos, 1 ambulancia', eta: '5 min', selected: false },
    { agencia: 'Policía Municipal - Patrulla 15', capacidad: '2 agentes, 1 vehículo', eta: '4 min', selected: false },
    { agencia: 'Bomberos Madrid - Estación Norte', capacidad: '6 efectivos, 2 autobombas', eta: '12 min', selected: false },
  ]);

  const handleSelectRecurso = (index: number) => {
    const updated = [...recursos];
    updated[index].selected = !updated[index].selected;
    setRecursos(updated);
  };

  const selectedCount = recursos.filter(r => r.selected).length;

  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* Header */}
      <header className="bg-white border-b border-[var(--border)] px-8 py-4">
        <div className="max-w-7xl mx-auto flex items-center gap-4">
          <button
            onClick={onBack}
            className="p-2 hover:bg-[#f1f5f9] rounded-[8px] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2"
            aria-label="Volver"
            type="button"
          >
            <ArrowLeft className="w-5 h-5 text-[var(--text)]" aria-hidden="true" />
          </button>

          {/* No usar heading aquí para no saltar niveles */}
          <div className="text-[var(--primary)] font-semibold">
            CCEU
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto p-8">
        <div className="mb-8">
          <h1>Despacho de recursos</h1>
          <p className="caption text-[var(--muted)] mt-1">#INC-2025-00123 - Incendio en Calle Alcalá 123, Madrid</p>
        </div>

        {/* Resources Table */}
        <TableRecursos recursos={recursos} onSelectRecurso={handleSelectRecurso} />

        {/* Selection Summary */}
        {selectedCount > 0 && (
          <div className="mt-6 p-4 bg-[#EFF6FF] border-2 border-[var(--primary)] rounded-[12px]">
            <p>
              <strong>{selectedCount}</strong> recurso{selectedCount !== 1 ? 's' : ''} seleccionado{selectedCount !== 1 ? 's' : ''}
            </p>
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center justify-between mt-8">
          <Button variant="tertiary" onClick={onBack}>
            Volver
          </Button>
          <Button 
            variant="primary" 
            onClick={() => onDispatch(selectedCount)}
            disabled={selectedCount === 0}
          >
            Despachar recursos ({selectedCount})
          </Button>
        </div>
      </main>
    </div>
  );
}