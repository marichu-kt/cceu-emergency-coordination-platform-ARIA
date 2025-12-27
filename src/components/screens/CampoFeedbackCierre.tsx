// FILE: src/components/screens/CampoFeedbackCierre.tsx
import { CheckCircle, MapPin, Clock, FileText, Paperclip } from 'lucide-react';
import { Button } from '../design-system/Button';

interface CampoFeedbackCierreProps {
  onBackToMission: () => void;
  onViewEvidences?: () => void;
}

export function CampoFeedbackCierre({ onBackToMission, onViewEvidences }: CampoFeedbackCierreProps) {
  return (
    <div className="min-h-screen bg-[var(--background)] flex flex-col" style={{ maxWidth: '390px', margin: '0 auto' }}>
      {/* Header */}
      <header
        className="text-white px-4 py-4"
        style={{ backgroundColor: '#047857' }} // ✅ más oscuro -> contraste OK con blanco
      >
        <p className="text-white font-semibold">CCEU Campo</p>
        <p className="text-white mt-1">Tarea completada</p>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-4 flex flex-col items-center justify-center" aria-label="Cierre de tarea">
        <div className="w-full max-w-md">
          {/* Success Icon */}
          <div
            className="w-24 h-24 bg-[#D1FAE5] rounded-full flex items-center justify-center mx-auto mb-6"
            aria-hidden="true"
          >
            <CheckCircle className="w-12 h-12 text-[#047857]" aria-hidden="true" />
          </div>

          {/* Title */}
          <h1 className="text-center mb-3">Tarea cerrada</h1>
          <p className="text-center text-[#475569] mb-8">
            Gracias. El cierre se ha registrado correctamente.
          </p>

          {/* Summary Card */}
          <section className="bg-white p-6 rounded-[12px] mb-8" style={{ boxShadow: 'var(--shadow-card)' }}>
            <h2 className="mb-4">Resumen</h2>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <FileText className="w-5 h-5 text-[#475569] flex-shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <p className="text-[13px] text-[#475569] mb-1">Incidencia</p>
                  <p>#INC-2025-00123</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#475569] flex-shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <p className="text-[13px] text-[#475569] mb-1">Ubicación</p>
                  <p>Calle Alcalá 123, Madrid</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-[#475569] flex-shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <p className="text-[13px] text-[#475569] mb-1">Hora de cierre</p>
                  <p>10:42</p>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-[var(--border)]">
              <div className="flex items-center justify-between">
                <span className="text-[13px] text-[#475569]">Duración total</span>
                <span>57 minutos</span>
              </div>
            </div>
          </section>

          {/* Actions */}
          <div className="space-y-3">
            <Button variant="primary" fullWidth onClick={onBackToMission}>
              Volver a misión
            </Button>

            {onViewEvidences && (
              <button
                type="button"
                onClick={onViewEvidences}
                className="w-full flex items-center justify-center gap-2 text-[var(--primary)] hover:underline transition-all min-h-[44px] rounded-[8px]
                           focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2"
                aria-label="Ver evidencias enviadas"
              >
                <Paperclip className="w-4 h-4" aria-hidden="true" />
                <span>Ver evidencias enviadas</span>
              </button>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
