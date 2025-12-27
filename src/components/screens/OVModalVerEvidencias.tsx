// FILE: src/components/screens/OVModalVerEvidencias.tsx
import { Camera, Video, Mic, FileText, Clock } from 'lucide-react';
import { Modal } from '../design-system/Modal';

interface OVModalVerEvidenciasProps {
  isOpen: boolean;
  onClose: () => void;
}

const mockEvidences = [
  { type: 'Foto', name: 'foto_01.jpg', time: '09:44', icon: Camera, color: 'var(--primary)' },
  { type: 'Foto', name: 'foto_02.jpg', time: '09:46', icon: Camera, color: 'var(--primary)' },
  { type: 'Video', name: 'video_01.mp4', time: '09:50', icon: Video, color: 'var(--success)' },
  { type: 'Audio', name: 'audio_01.m4a', time: '09:52', icon: Mic, color: 'var(--warning)' },
  // Evita var(--muted) (suele dar bajo contraste en iconos/textos)
  { type: 'Nota', name: 'observaciones.txt', time: '09:54', icon: FileText, color: '#475569' },
];

export function OVModalVerEvidencias({ isOpen, onClose }: OVModalVerEvidenciasProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Evidencias enviadas"
      secondaryAction={{ label: 'Cerrar', onClick: onClose }}
    >
      <div className="space-y-3" aria-label="Listado de evidencias">
        {/* Contraste mejorado */}
        <p className="text-[13px] text-[#475569] mb-4">
          Total: {mockEvidences.length} archivo(s) enviado(s)
        </p>

        <div role="list" className="space-y-3">
          {mockEvidences.map((evidence, index) => {
            const Icon = evidence.icon;

            return (
              <div
                key={index}
                role="listitem"
                className="flex items-center gap-4 p-3 rounded-[8px] bg-[var(--background)] hover:bg-[#f1f5f9] transition-colors"
              >
                <div
                  className="w-10 h-10 rounded-full bg-white flex items-center justify-center flex-shrink-0"
                  aria-hidden="true"
                >
                  <Icon className="w-5 h-5" style={{ color: evidence.color }} />
                </div>

                <div className="flex-1 min-w-0">
                  <p className="truncate text-[var(--text)]">{evidence.name}</p>

                  {/* Contraste mejorado */}
                  <p className="text-[12px] text-[#475569] flex items-center gap-1 mt-1">
                    <Clock className="w-3 h-3" aria-hidden="true" />
                    <span>{evidence.time}</span>
                  </p>
                </div>

                <button
                  type="button"
                  className="px-3 py-1 text-[var(--primary)] hover:bg-[#eff6ff] rounded transition-colors text-[13px] min-h-[44px]"
                  aria-label={`Ver evidencia ${evidence.name}`}
                >
                  Ver
                </button>
              </div>
            );
          })}
        </div>

        {mockEvidences.length === 0 && (
          <div className="text-center py-8" role="status" aria-live="polite">
            <FileText className="w-12 h-12 text-[#475569] mx-auto mb-3" aria-hidden="true" />
            <p className="text-[#475569]">No hay evidencias enviadas aún</p>
          </div>
        )}
      </div>
    </Modal>
  );
}
