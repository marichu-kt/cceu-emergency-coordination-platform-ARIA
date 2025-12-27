// FILE: src/components/screens/CampoEvidencias.tsx
import { useState } from 'react';
import { Camera, Video, Mic, FileText, X, Paperclip } from 'lucide-react';
import { Button } from '../design-system/Button';

interface CampoEvidenciasProps {
  onSend: () => void;
  onViewEvidences?: () => void;
}

export function CampoEvidencias({ onSend, onViewEvidences }: CampoEvidenciasProps) {
  const [attachments, setAttachments] = useState<{ type: string; name: string }[]>([]);

  const addAttachment = (type: string, name: string) => {
    setAttachments((prev) => [...prev, { type, name }]);
  };

  const removeAttachment = (index: number) => {
    setAttachments((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div
      className="min-h-screen bg-[var(--background)] flex flex-col"
      style={{ maxWidth: '390px', margin: '0 auto' }}
    >
      {/* Header */}
      <header className="bg-[var(--primary)] text-white px-4 py-4">
        <p className="text-white font-semibold">CCEU Campo</p>
        <p className="text-white mt-1" style={{ opacity: 0.95 }}>
          Recopilación de evidencias
        </p>
      </header>

      {/* H1 (para WAVE) */}
      <h1 className="sr-only">Recopilación de evidencias</h1>

      {/* Main Content */}
      <main className="flex-1 p-4" aria-label="Documentar incidente">
        <h2 className="mb-2">Documentar incidente</h2>

        {/* Contraste mejorado */}
        <p className="mb-6 text-[13px] text-[#334155]">
          #INC-2025-00123 - Calle Alcalá 123
        </p>

        {/* Capture Options */}
        <div className="grid grid-cols-2 gap-3 mb-6" aria-label="Opciones de captura">
          <button
            type="button"
            onClick={() => addAttachment('Foto', `foto-${Date.now()}.jpg`)}
            className="bg-white p-6 rounded-[12px] flex flex-col items-center gap-3 hover:bg-[#f1f5f9] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2"
            style={{ boxShadow: 'var(--shadow-card)' }}
            aria-label="Añadir foto"
          >
            <div className="w-12 h-12 bg-[#EFF6FF] rounded-full flex items-center justify-center" aria-hidden="true">
              <Camera className="w-6 h-6 text-[var(--primary)]" aria-hidden="true" />
            </div>
            <span className="caption text-[#0F172A]">Foto</span>
          </button>

          <button
            type="button"
            onClick={() => addAttachment('Video', `video-${Date.now()}.mp4`)}
            className="bg-white p-6 rounded-[12px] flex flex-col items-center gap-3 hover:bg-[#f1f5f9] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2"
            style={{ boxShadow: 'var(--shadow-card)' }}
            aria-label="Añadir vídeo"
          >
            <div className="w-12 h-12 bg-[#F0FDF4] rounded-full flex items-center justify-center" aria-hidden="true">
              <Video className="w-6 h-6 text-[var(--success)]" aria-hidden="true" />
            </div>
            <span className="caption text-[#0F172A]">Vídeo</span>
          </button>

          <button
            type="button"
            onClick={() => addAttachment('Audio', `audio-${Date.now()}.m4a`)}
            className="bg-white p-6 rounded-[12px] flex flex-col items-center gap-3 hover:bg-[#f1f5f9] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2"
            style={{ boxShadow: 'var(--shadow-card)' }}
            aria-label="Añadir audio"
          >
            <div className="w-12 h-12 bg-[#FEF3C7] rounded-full flex items-center justify-center" aria-hidden="true">
              <Mic className="w-6 h-6 text-[var(--warning)]" aria-hidden="true" />
            </div>
            <span className="caption text-[#0F172A]">Voz a texto</span>
          </button>

          <button
            type="button"
            onClick={() => addAttachment('Nota', `nota-${Date.now()}.txt`)}
            className="bg-white p-6 rounded-[12px] flex flex-col items-center gap-3 hover:bg-[#f1f5f9] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2"
            style={{ boxShadow: 'var(--shadow-card)' }}
            aria-label="Añadir nota"
          >
            <div className="w-12 h-12 bg-[#F3F4F6] rounded-full flex items-center justify-center" aria-hidden="true">
              {/* Contraste: antes var(--muted) */}
              <FileText className="w-6 h-6 text-[#475569]" aria-hidden="true" />
            </div>
            <span className="caption text-[#0F172A]">Nota</span>
          </button>
        </div>

        {/* Attachments List */}
        {attachments.length > 0 && (
          <section className="mb-6" aria-label="Archivos adjuntos">
            <h3 className="mb-3">Archivos adjuntos ({attachments.length})</h3>

            <div className="space-y-2">
              {attachments.map((attachment, index) => (
                <div
                  key={`${attachment.type}-${attachment.name}-${index}`}
                  className="bg-white p-3 rounded-[8px] flex items-center justify-between"
                  style={{ boxShadow: 'var(--shadow-card)' }}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    {attachment.type === 'Foto' && <Camera className="w-5 h-5 text-[var(--primary)]" aria-hidden="true" />}
                    {attachment.type === 'Video' && <Video className="w-5 h-5 text-[var(--success)]" aria-hidden="true" />}
                    {attachment.type === 'Audio' && <Mic className="w-5 h-5 text-[var(--warning)]" aria-hidden="true" />}
                    {attachment.type === 'Nota' && <FileText className="w-5 h-5 text-[#475569]" aria-hidden="true" />}

                    <div className="min-w-0">
                      <p className="caption text-[#0F172A]">{attachment.type}</p>
                      {/* Contraste mejorado: antes text-[var(--muted)] */}
                      <p className="text-[12px] text-[#475569] truncate">{attachment.name}</p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => removeAttachment(index)}
                    className="p-2 rounded-[8px] hover:bg-[#FEE2E2] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2"
                    aria-label={`Eliminar adjunto ${attachment.name}`}
                    style={{ minWidth: 44, minHeight: 44 }}
                  >
                    <X className="w-4 h-4 text-[var(--error)]" aria-hidden="true" />
                  </button>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Send Button */}
        <Button variant="primary" fullWidth onClick={onSend} disabled={attachments.length === 0}>
          Enviar evidencias ({attachments.length})
        </Button>

        {/* View Evidences Link */}
        {onViewEvidences && (
          <button
            type="button"
            onClick={onViewEvidences}
            className="mt-3 w-full flex items-center justify-center gap-2 text-[var(--primary)] hover:underline transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2 rounded-[8px] py-2"
            aria-label="Ver evidencias enviadas"
          >
            <Paperclip className="w-4 h-4" aria-hidden="true" />
            <span className="caption">Ver evidencias enviadas</span>
          </button>
        )}

        {/* Info */}
        {attachments.length === 0 && (
          <div className="mt-6 p-4 bg-[#EFF6FF] rounded-[8px]" role="note">
            <p className="text-[13px] text-[#1D4ED8]">
              📸 Documenta el incidente con fotos, vídeos o notas de voz antes de continuar.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
