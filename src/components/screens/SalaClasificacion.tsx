import { useId, useMemo, useState } from "react";
import { ArrowLeft, Flame, Droplet, Snowflake } from "lucide-react";
import { Button } from "../design-system/Button";
import { TagPriority } from "../design-system/TagPriority";
import { ChipButton } from "../design-system/ChipButton";

interface SalaClasificacionProps {
  onConfirm: () => void;
  onBack: () => void;
}

type Priority = "P1" | "P2" | "P3";
type IncidentType = "fire" | "rain" | "snow";

const TYPE_META: Record<
  IncidentType,
  { label: string; Icon: typeof Flame | typeof Droplet | typeof Snowflake; variant: IncidentType }
> = {
  fire: { label: "Incendio", Icon: Flame, variant: "fire" },
  rain: { label: "Inundación", Icon: Droplet, variant: "rain" },
  snow: { label: "Nevada", Icon: Snowflake, variant: "snow" },
};

export function SalaClasificacion({ onConfirm, onBack }: SalaClasificacionProps) {
  const motivoId = useId();

  const [selectedPriority, setSelectedPriority] = useState<Priority>("P1");
  const [selectedType, setSelectedType] = useState<IncidentType>("fire");
  const [motivo, setMotivo] = useState("");

  // En un caso real vendrían del incidente seleccionado
  const originalPriority: Priority = "P1";
  const originalType: IncidentType = "fire";

  const hasChanges = selectedPriority !== originalPriority || selectedType !== originalType;

  const priorityHelp = useMemo(() => {
    if (selectedPriority === "P1") {
      return "Crítica: peligro inmediato para vidas humanas. Requiere respuesta inmediata.";
    }
    if (selectedPriority === "P2") {
      return "Alta: amenaza significativa a personas o propiedad. Respuesta prioritaria.";
    }
    return "Normal: situación bajo control. Respuesta en tiempo estándar.";
  }, [selectedPriority]);

  const selectedTypeMeta = TYPE_META[selectedType];
  const originalTypeMeta = TYPE_META[originalType];

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <header className="bg-white border-b border-[var(--border)] px-8 py-4">
        <div className="max-w-4xl mx-auto flex items-center gap-4">
          <button
            type="button"
            onClick={onBack}
            className="p-2 hover:bg-[#f1f5f9] rounded-[8px] transition-colors
                       focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2"
            aria-label="Volver"
          >
            <ArrowLeft className="w-5 h-5 text-[var(--text)]" aria-hidden="true" focusable="false" />
          </button>

          <div className="text-[var(--primary)] font-semibold">CCEU</div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto p-8">
        <div className="mb-8">
          <h1>Clasificar incidencia</h1>
          <p className="caption text-[var(--muted)] mt-1">#INC-2025-00123 - Calle Alcalá 123, Madrid</p>
        </div>

        <div className="bg-white p-6 rounded-[12px]" style={{ boxShadow: "var(--shadow-card)" }}>
          <div className="space-y-8">
            {/* Prioridad */}
            <div>
              <p className="caption text-[var(--text)] block mb-4">Selecciona la prioridad</p>

              <div className="flex flex-wrap gap-3" role="group" aria-label="Prioridad">
                <TagPriority
                  priority="P1"
                  selectable
                  selected={selectedPriority === "P1"}
                  onClick={() => setSelectedPriority("P1")}
                />
                <TagPriority
                  priority="P2"
                  selectable
                  selected={selectedPriority === "P2"}
                  onClick={() => setSelectedPriority("P2")}
                />
                <TagPriority
                  priority="P3"
                  selectable
                  selected={selectedPriority === "P3"}
                  onClick={() => setSelectedPriority("P3")}
                />
              </div>

              <div className="mt-4 p-4 bg-[#F8FAFC] rounded-[8px]">
                <p className="caption text-[var(--text)]">{priorityHelp}</p>
              </div>
            </div>

            {/* Tipo */}
            <div>
              <p className="caption text-[var(--text)] block mb-4">Selecciona el tipo de incidencia</p>

              <div className="flex flex-wrap gap-3" role="group" aria-label="Tipo de incidencia">
                <ChipButton
                  icon={Flame}
                  label="Incendio"
                  selected={selectedType === "fire"}
                  onClick={() => setSelectedType("fire")}
                  variant="fire"
                />
                <ChipButton
                  icon={Droplet}
                  label="Inundación"
                  selected={selectedType === "rain"}
                  onClick={() => setSelectedType("rain")}
                  variant="rain"
                />
                <ChipButton
                  icon={Snowflake}
                  label="Nevada"
                  selected={selectedType === "snow"}
                  onClick={() => setSelectedType("snow")}
                  variant="snow"
                />
              </div>
            </div>

            {/* Motivo */}
            <div>
              <label className="caption text-[var(--text)] block mb-2" htmlFor={motivoId}>
                Motivo de la clasificación
              </label>
              <textarea
                id={motivoId}
                className="w-full min-h-[120px] px-4 py-3 rounded-[8px] border-2 border-[var(--border)] bg-white transition-all outline-none resize-none
                           placeholder:text-[#4B5563] placeholder:opacity-100
                           focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)] focus:ring-opacity-20"
                placeholder="Explica por qué asignas esta prioridad..."
                value={motivo}
                onChange={(e) => setMotivo(e.target.value)}
              />
            </div>

            {/* Resumen */}
            <div className="p-4 border-2 border-[var(--border)] rounded-[8px]">
              <h2 className="mb-3">Resumen de cambios</h2>

              <div className="space-y-3">
                {selectedType !== originalType && (
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className="caption text-[var(--muted)]">Tipo:</span>

                    <span className="inline-flex items-center gap-2 px-3 py-1 rounded-[8px] border border-[var(--border)]">
                      <originalTypeMeta.Icon className="w-4 h-4 text-[var(--muted)]" aria-hidden="true" />
                      <span className="caption text-[var(--text)]">{originalTypeMeta.label}</span>
                    </span>

                    <span className="text-[var(--muted)]" aria-hidden="true">
                      →
                    </span>

                    <span className="inline-flex items-center gap-2 px-3 py-1 rounded-[8px] border border-[var(--border)]">
                      <selectedTypeMeta.Icon className="w-4 h-4 text-[var(--muted)]" aria-hidden="true" />
                      <span className="caption text-[var(--text)]">{selectedTypeMeta.label}</span>
                    </span>
                  </div>
                )}

                {selectedPriority !== originalPriority && (
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className="caption text-[var(--muted)]">Prioridad:</span>
                    <TagPriority priority={originalPriority} />
                    <span className="text-[var(--muted)]" aria-hidden="true">
                      →
                    </span>
                    <TagPriority priority={selectedPriority} />
                  </div>
                )}

                {!hasChanges && <p className="caption text-[var(--muted)]">No se han realizado cambios</p>}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 mt-8 pt-6 border-t border-[var(--border)]">
            <Button variant="secondary" onClick={onBack}>
              Cancelar
            </Button>
            <Button variant="primary" onClick={onConfirm} disabled={!hasChanges}>
              Confirmar prioridad
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
