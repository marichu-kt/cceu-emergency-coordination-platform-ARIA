import { Flame, MapPin, Clock, Paperclip } from 'lucide-react';
import { Button } from '../design-system/Button';
import { TagPriority } from '../design-system/TagPriority';

interface CampoMisionProps {
  onAccept: () => void;
  onReject?: () => void;
  onReportNovedad?: () => void;
  onViewEvidences?: () => void;
}

export function CampoMision({ onAccept, onReject, onReportNovedad, onViewEvidences }: CampoMisionProps) {
  return (
    <div className="min-h-screen bg-[var(--background)] flex flex-col" style={{ maxWidth: '390px', margin: '0 auto' }}>
      {/* Header */}
      <header className="bg-[var(--primary)] text-white px-4 py-4">
        <div className="text-[18px] font-semibold leading-tight">CCEU Campo</div>
        <p className="caption mt-1 opacity-95">Unidad de campo</p>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-4">
        {/* ✅ H1 para cumplir WAVE */}
        <h1 className="mb-6">Misión asignada</h1>

        {/* Mission Card */}
        <div className="bg-white p-6 rounded-[12px] mb-6" style={{ boxShadow: 'var(--shadow-card)' }}>
          <div className="flex items-start gap-3 mb-6">
            <div className="p-3 rounded-[8px] bg-[#FEE2E2]" aria-hidden="true">
              <Flame className="w-6 h-6 text-[var(--p1)]" aria-hidden="true" />
            </div>
            <div className="flex-1">
              {/* ✅ H2 (debajo del H1) */}
              <h2 className="mb-1">Incendio</h2>
              {/* ✅ contraste mejorado */}
              <p className="caption text-[#475569]">#INC-2025-00123</p>
            </div>
          </div>

          <div className="space-y-4">
            {/* Location */}
            <div className="flex gap-3">
              <MapPin className="w-5 h-5 text-[#475569] flex-shrink-0 mt-0.5" aria-hidden="true" />
              <div>
                <p className="caption text-[#475569] mb-1">Ubicación</p>
                <p>Calle Alcalá 123, Madrid</p>
              </div>
            </div>

            {/* Time */}
            <div className="flex gap-3">
              <Clock className="w-5 h-5 text-[#475569] flex-shrink-0 mt-0.5" aria-hidden="true" />
              <div>
                <p className="caption text-[#475569] mb-1">Hora de despacho</p>
                <p>09:45</p>
              </div>
            </div>

            {/* Priority */}
            <div>
              <p className="caption text-[#475569] mb-2">Prioridad</p>
              <TagPriority priority="P1" />
            </div>

            {/* Description */}
            <div className="pt-4 border-t border-[var(--border)]">
              <p className="caption text-[#475569] mb-2">Detalles</p>
              <p>
                Incendio reportado en edificio de viviendas. Se observa humo saliendo de ventanas del tercer piso.
                Posibles personas atrapadas.
              </p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-3">
          <Button variant="primary" fullWidth onClick={onAccept}>
            Aceptar misión
          </Button>

          {onReportNovedad && (
            <Button variant="secondary" fullWidth onClick={onReportNovedad}>
              Reportar novedad
            </Button>
          )}

          {onReject && (
            <Button variant="tertiary" fullWidth onClick={onReject}>
              Rechazar
            </Button>
          )}
        </div>

        {/* View Evidences Link */}
        {onViewEvidences && (
          <button
            type="button"
            onClick={onViewEvidences}
            className="mt-4 w-full flex items-center justify-center gap-2 text-[var(--primary)] hover:underline transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2"
          >
            <Paperclip className="w-4 h-4" aria-hidden="true" />
            <span className="caption">Ver evidencias enviadas</span>
          </button>
        )}

        {/* Info */}
        <div className="mt-6 p-4 bg-[#FEF3C7] rounded-[8px]">
          <p className="caption text-[var(--text)]">
            ⚠️ Al aceptar, comenzará el seguimiento de tu ubicación para coordinación en tiempo real.
          </p>
        </div>
      </main>
    </div>
  );
}
