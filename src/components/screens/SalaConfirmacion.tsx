import React from 'react';
import { CheckCircle } from 'lucide-react';
import { Button } from '../design-system/Button';

interface SalaConfirmacionProps {
  resourcesCount?: number;
  onBackToDashboard: () => void;
}

export function SalaConfirmacion({ resourcesCount = 3, onBackToDashboard }: SalaConfirmacionProps) {
  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* Header */}
      <header className="bg-white border-b border-[var(--border)] px-8 py-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-[var(--primary)]">CCEU</h2>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto p-8 flex items-center justify-center min-h-[calc(100vh-80px)]">
        <div className="bg-white p-12 rounded-[12px] text-center max-w-lg w-full" style={{ boxShadow: 'var(--shadow-card)' }}>
          <div className="w-20 h-20 bg-[#D1FAE5] rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-[var(--success)]" />
          </div>

          <h1 className="mb-4">Operación completada</h1>
          
          <div className="mb-8">
            <p className="text-[var(--text)] mb-4">
              Los recursos han sido despachados correctamente
            </p>
            <div className="p-4 bg-[#F8FAFC] rounded-[8px]">
              <p className="caption text-[var(--muted)]">Incidencia</p>
              <p className="mt-1">#INC-2025-00123</p>
              <p className="caption text-[var(--muted)] mt-3">Ubicación</p>
              <p className="mt-1">Calle Alcalá 123, Madrid</p>
              <p className="caption text-[var(--muted)] mt-3">Recursos despachados</p>
              <p className="mt-1">{resourcesCount} unidades en camino</p>
            </div>
          </div>

          <Button variant="primary" onClick={onBackToDashboard} fullWidth>
            Volver al dashboard
          </Button>
        </div>
      </main>
    </div>
  );
}