// FILE: src/components/screens/SalaNuevaIncidencia.tsx
import { useId, useRef, useState } from 'react';
import {
  ArrowLeft,
  Upload,
  Flame,
  Droplet,
  Snowflake,
  AlertTriangle,
  AlertCircle,
  CheckCircle,
  FileText,
  X,
} from 'lucide-react';
import { Button } from '../design-system/Button';
import { InputText } from '../design-system/InputText';
import { ChipButton } from '../design-system/ChipButton';
import { MapInteractive } from '../MapInteractive';
import { createIncidencia } from '../../utils/api';

interface SalaNuevaIncidenciaProps {
  onCreate: () => void;
  onBack: () => void;
}

type IncFile = { id: string; file: File };

export function SalaNuevaIncidencia({ onCreate, onBack }: SalaNuevaIncidenciaProps) {
  const descId = useId();
  const filesId = useId();

  const [formData, setFormData] = useState({
    tipo: 'fire' as 'fire' | 'rain' | 'snow',
    prioridad: 'P2' as 'P1' | 'P2' | 'P3',
    direccion: '',
    descripcion: '',
    lat: 40.4168,
    lon: -3.7038,
  });

  const [errors, setErrors] = useState<{ direccion?: string }>({});
  const [isCreating, setIsCreating] = useState(false);

  const [attached, setAttached] = useState<IncFile[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleCreate = async () => {
    if (!formData.direccion.trim()) {
      setErrors({ direccion: 'La dirección es obligatoria' });
      return;
    }

    setErrors({});
    setIsCreating(true);

    try {
      await createIncidencia({
        tipo: formData.tipo,
        prioridad: formData.prioridad,
        direccion: formData.direccion,
        descripcion: formData.descripcion,
        lat: formData.lat,
        lon: formData.lon,
      });

      onCreate();
    } catch (error) {
      console.error('Error creating incidencia:', error);
      alert('Error al crear la incidencia');
    } finally {
      setIsCreating(false);
    }
  };

  const handleDireccionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, direccion: e.target.value });
    if (errors.direccion) setErrors({});
  };

  const handleLocationChange = (direccion: string, lat: number, lon: number) => {
    setFormData({ ...formData, direccion, lat, lon });
    if (errors.direccion) setErrors({});
  };

  const addFiles = (files: FileList | File[]) => {
    const list = Array.from(files);
    if (!list.length) return;

    setAttached((prev) => {
      const existingKeys = new Set(prev.map((x) => `${x.file.name}|${x.file.size}|${x.file.lastModified}`));
      const toAdd: IncFile[] = [];

      for (const f of list) {
        const k = `${f.name}|${f.size}|${f.lastModified}`;
        if (existingKeys.has(k)) continue;
        toAdd.push({
          id: `${(crypto as any).randomUUID?.() ?? Math.random().toString(16).slice(2)}-${Date.now()}`,
          file: f,
        });
      }
      return [...prev, ...toAdd];
    });
  };

  const removeFile = (id: string) => setAttached((prev) => prev.filter((x) => x.id !== id));

  const openFilePicker = () => fileInputRef.current?.click();

  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
    if (e.dataTransfer?.files?.length) addFiles(e.dataTransfer.files);
  };

  const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(true);
  };

  const onDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
  };

  const onKeyDownDropzone = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      openFilePicker();
    }
  };

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <header className="bg-white border-b border-[var(--border)] px-8 py-4">
        <div className="max-w-4xl mx-auto flex items-center gap-4">
          <button
            onClick={onBack}
            className="p-2 hover:bg-[#f1f5f9] rounded-[8px] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2"
            aria-label="Volver"
          >
            <ArrowLeft className="w-5 h-5 text-[var(--text)]" aria-hidden="true" />
          </button>
          <h2 className="text-[var(--primary)]">CCEU</h2>
        </div>
      </header>

      <main className="max-w-4xl mx-auto p-8">
        <h1 className="mb-8">Nueva incidencia</h1>

        <div className="bg-white p-6 rounded-[12px]" style={{ boxShadow: 'var(--shadow-card)' }}>
          <div className="space-y-6">
            <div>
              <span className="caption text-[var(--text)] block mb-4">Tipo de incidencia</span>
              <div className="flex flex-wrap gap-3">
                <ChipButton
                  label="Incendio"
                  icon={Flame}
                  selected={formData.tipo === 'fire'}
                  onClick={() => setFormData({ ...formData, tipo: 'fire' })}
                  variant="fire"
                />
                <ChipButton
                  label="Inundación"
                  icon={Droplet}
                  selected={formData.tipo === 'rain'}
                  onClick={() => setFormData({ ...formData, tipo: 'rain' })}
                  variant="rain"
                />
                <ChipButton
                  label="Nevada"
                  icon={Snowflake}
                  selected={formData.tipo === 'snow'}
                  onClick={() => setFormData({ ...formData, tipo: 'snow' })}
                  variant="snow"
                />
              </div>
            </div>

            <div>
              <span className="caption text-[var(--text)] block mb-4">Prioridad</span>
              <div className="flex flex-wrap gap-3">
                <ChipButton
                  label="P1 - Crítica"
                  icon={AlertTriangle}
                  selected={formData.prioridad === 'P1'}
                  onClick={() => setFormData({ ...formData, prioridad: 'P1' })}
                  variant="p1"
                />
                <ChipButton
                  label="P2 - Alta"
                  icon={AlertCircle}
                  selected={formData.prioridad === 'P2'}
                  onClick={() => setFormData({ ...formData, prioridad: 'P2' })}
                  variant="p2"
                />
                <ChipButton
                  label="P3 - Normal"
                  icon={CheckCircle}
                  selected={formData.prioridad === 'P3'}
                  onClick={() => setFormData({ ...formData, prioridad: 'P3' })}
                  variant="p3"
                />
              </div>
            </div>

            <div>
              <InputText
                label="Dirección"
                placeholder="Ej: Calle Alcalá 123, Madrid"
                value={formData.direccion}
                onChange={handleDireccionChange}
                error={errors.direccion}
                helperText={!errors.direccion ? 'Introduce la dirección exacta del incidente' : undefined}
              />

              <div className="mt-4">
                <MapInteractive direccion={formData.direccion} onLocationChange={handleLocationChange} height="400px" />
              </div>
            </div>

            {/* ✅ Label real para el textarea (evita Missing form label) */}
            <div>
              <label className="caption text-[var(--text)] block mb-2" htmlFor={descId}>
                Descripción
              </label>
              <textarea
                id={descId}
                className="w-full min-h-[120px] px-4 py-3 rounded-[8px] border-2 border-[var(--border)] bg-white transition-all outline-none resize-none focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)] focus:ring-opacity-20"
                placeholder="Describe los detalles del incidente..."
                value={formData.descripcion}
                onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
              />
            </div>

            {/* ✅ Adjuntar archivos funcionando + label asociado */}
            <div>
              <label className="caption text-[var(--text)] block mb-2" htmlFor={filesId}>
                Adjuntar archivos
              </label>

              {/* Input real (oculto) */}
              <input
                id={filesId}
                ref={fileInputRef}
                type="file"
                multiple
                className="sr-only"
                onChange={(e) => {
                  if (e.target.files) addFiles(e.target.files);
                  e.currentTarget.value = '';
                }}
              />

              <div
                role="button"
                tabIndex={0}
                onClick={openFilePicker}
                onKeyDown={onKeyDownDropzone}
                onDrop={onDrop}
                onDragOver={onDragOver}
                onDragLeave={onDragLeave}
                aria-describedby={`${filesId}-hint`}
                className={[
                  'border-2 border-dashed rounded-[8px] p-8 text-center transition-colors',
                  'cursor-pointer select-none',
                  'focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2',
                  isDragOver ? 'border-[var(--primary)] bg-[#EFF6FF]' : 'border-[var(--border)] hover:border-[var(--primary)]',
                ].join(' ')}
                style={{ minHeight: 120 }}
              >
                <Upload className="w-8 h-8 mx-auto mb-2" style={{ color: '#374151' }} aria-hidden="true" />
                <p className="caption" style={{ color: '#111827' }}>
                  Arrastra archivos o haz clic para seleccionar
                </p>
                <p id={`${filesId}-hint`} className="caption mt-2" style={{ color: '#4B5563' }}>
                  Puedes seleccionar varios archivos.
                </p>
              </div>

              {attached.length > 0 && (
                <div className="mt-4 space-y-2" aria-label="Archivos adjuntos">
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
          </div>

          <div className="flex items-center justify-end gap-3 mt-8 pt-6 border-t border-[var(--border)]">
            <Button variant="secondary" onClick={onBack}>
              Cancelar
            </Button>
            <Button variant="primary" onClick={handleCreate} disabled={isCreating}>
              Crear incidencia
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
