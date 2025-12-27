import { useRef, useState } from 'react';
import { AlertTriangle, Upload, FileText, X } from 'lucide-react';
import { Button } from '../design-system/Button';
import { Select } from '../design-system/Select';
import { Checkbox } from '../design-system/Checkbox';

interface CampoReportarNovedadProps {
  onSend: () => void;
  onCancel: () => void;
}

type AttachedFile = {
  id: string;
  file: File;
};

export function CampoReportarNovedad({ onSend, onCancel }: CampoReportarNovedadProps) {
  const [tipoNovedad, setTipoNovedad] = useState('corte-via');
  const [detalle, setDetalle] = useState('');
  const [incluirUbicacion, setIncluirUbicacion] = useState(false);

  // ✅ Adjuntos reales (UI)
  const [attached, setAttached] = useState<AttachedFile[]>([]);
  const fileRef = useRef<HTMLInputElement | null>(null);

  const selectId = 'tipo-novedad';
  const detalleId = 'detalle-novedad';

  const openFilePicker = () => fileRef.current?.click();

  const addFiles = (files: FileList | File[]) => {
    const list = Array.from(files);
    if (!list.length) return;

    setAttached((prev) => {
      const existing = new Set(prev.map((x) => `${x.file.name}|${x.file.size}|${x.file.lastModified}`));
      const toAdd: AttachedFile[] = [];

      for (const f of list) {
        const key = `${f.name}|${f.size}|${f.lastModified}`;
        if (existing.has(key)) continue;

        toAdd.push({
          id: `${crypto.randomUUID?.() ?? Math.random().toString(16).slice(2)}-${Date.now()}`,
          file: f,
        });
      }

      return [...prev, ...toAdd];
    });
  };

  const removeFile = (id: string) => {
    setAttached((prev) => prev.filter((x) => x.id !== id));
  };

  return (
    <div className="min-h-screen bg-[var(--background)] flex flex-col" style={{ maxWidth: '390px', margin: '0 auto' }}>
      {/* Header */}
      <header className="bg-[var(--primary)] text-white px-4 py-4">
        <div className="text-[18px] font-semibold leading-tight">CCEU Campo</div>
        <p className="caption mt-1 opacity-95">Reportar novedad</p>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-4">
        {/* ✅ H1 para accesibilidad */}
        <h1 className="sr-only">Reportar novedad</h1>

        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-[#FEF3C7] rounded-full" aria-hidden="true">
            <AlertTriangle className="w-5 h-5 text-[var(--warning)]" aria-hidden="true" />
          </div>
          <div>
            <h2>Nueva novedad</h2>
            {/* ✅ contraste mejorado */}
            <p className="caption text-[#475569]">#INC-2025-00123</p>
          </div>
        </div>

        {/* Form */}
        <div className="space-y-6">
          {/* Tipo de novedad */}
          <Select
            id={selectId}
            label="Tipo de novedad"
            value={tipoNovedad}
            onChange={(e) => setTipoNovedad(e.target.value)}
            options={[
              { value: 'corte-via', label: 'Corte de vía' },
              { value: 'riesgo-electrico', label: 'Riesgo eléctrico' },
              { value: 'requiere-refuerzo', label: 'Requiere refuerzo' },
              { value: 'otro', label: 'Otro' },
            ]}
          />

          {/* Detalle */}
          <div>
            <label htmlFor={detalleId} className="caption text-[var(--text)] block mb-2">
              Detalle
            </label>
            <textarea
              id={detalleId}
              className="w-full min-h-[120px] px-3 py-3 rounded-[8px] border-2 border-[var(--border)] bg-white transition-all outline-none resize-none focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)] focus:ring-opacity-20"
              placeholder="Describe la novedad con el mayor detalle posible..."
              value={detalle}
              onChange={(e) => setDetalle(e.target.value)}
            />
          </div>

          {/* Ubicación */}
          <Checkbox
            label="Añadir ubicación actual"
            checked={incluirUbicacion}
            onChange={() => setIncluirUbicacion(!incluirUbicacion)}
          />

          {/* ✅ Input real (oculto) */}
          <input
            ref={fileRef}
            type="file"
            multiple
            className="sr-only"
            onChange={(e) => {
              if (e.target.files) addFiles(e.target.files);
              // permite volver a seleccionar el mismo archivo
              e.currentTarget.value = '';
            }}
            aria-label="Adjuntar archivo"
          />

          {/* ✅ Botón que abre el selector */}
          <button
            type="button"
            onClick={openFilePicker}
            className="w-full min-h-[44px] px-4 py-3 rounded-[8px] border-2 border-dashed border-[var(--border)] hover:border-[var(--primary)] hover:bg-[#eff6ff] transition-all flex items-center justify-center gap-2 text-[var(--primary)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2"
            aria-label="Adjuntar archivo"
          >
            <Upload className="w-5 h-5" aria-hidden="true" />
            <span>Adjuntar archivo</span>
          </button>

          {/* ✅ Lista de adjuntos */}
          {attached.length > 0 && (
            <div className="space-y-2" aria-label="Archivos adjuntos">
              {attached.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between gap-3 border border-[var(--border)] rounded-[8px] px-3 py-2"
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <FileText className="w-4 h-4 text-[var(--muted)] flex-shrink-0" aria-hidden="true" />
                    <div className="min-w-0">
                      <p className="text-[14px] text-[var(--text)] truncate">{item.file.name}</p>
                      <p className="caption text-[var(--muted)]">
                        {Math.max(1, Math.round(item.file.size / 1024))} KB
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => removeFile(item.id)}
                    className="p-2 rounded-[8px] hover:bg-[#f1f5f9] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2"
                    aria-label={`Quitar archivo ${item.file.name}`}
                    style={{ minHeight: 44, minWidth: 44 }}
                  >
                    <X className="w-4 h-4 text-[var(--muted)]" aria-hidden="true" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="mt-8 space-y-3">
          <Button variant="primary" fullWidth onClick={onSend} disabled={!detalle.trim()}>
            Enviar novedad
          </Button>
          <Button variant="secondary" fullWidth onClick={onCancel}>
            Cancelar
          </Button>
        </div>

        {/* Info */}
        <div className="mt-6 p-4 bg-[#EFF6FF] rounded-[8px]">
          <p className="caption text-[#1E293B]">
            💡 Esta información será enviada inmediatamente al centro de coordinación.
          </p>
        </div>
      </main>
    </div>
  );
}
