import { useId } from "react";
import { Flame, Droplets, Snowflake } from "lucide-react";
import { TagPriority } from "./TagPriority";
import { Button } from "./Button";

type IncidentType = "fire" | "rain" | "snow";
type Priority = "P1" | "P2" | "P3";
type Status = "nueva" | "asignada" | "en-curso" | "cerrada";

interface CardIncidenteProps {
  type: IncidentType;
  address: string;
  priority: Priority;
  status: Status;
  id: string;
  onAction?: () => void;
}

export function CardIncidente({ type, address, priority, status, id, onAction }: CardIncidenteProps) {
  const titleId = useId();
  const metaId = useId();

  const typeConfig = {
    fire: { label: "Incendio", icon: Flame, color: "#EF4444" },
    rain: { label: "Inundación", icon: Droplets, color: "#0284C7" },
    snow: { label: "Nevada", icon: Snowflake, color: "#6366F1" },
  } as const;

  const statusConfig = {
    nueva: { label: "Nueva", fg: "#075985", bg: "#E0F2FE" },
    asignada: { label: "Asignada", fg: "#92400E", bg: "#FEF3C7" },
    "en-curso": { label: "En curso", fg: "#1D4ED8", bg: "#DBEAFE" },
    cerrada: { label: "Cerrada", fg: "#374151", bg: "#F3F4F6" },
  } as const;

  const { label, icon: Icon, color } = typeConfig[type];
  const statusInfo = statusConfig[status];

  return (
    <article
      className="bg-white p-4 rounded-[12px] flex flex-col gap-4"
      style={{ boxShadow: "var(--shadow-card)" }}
      aria-labelledby={titleId}
      aria-describedby={metaId}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3 flex-1">
          <div className="p-2 rounded-[8px]" style={{ backgroundColor: `${color}15` }} aria-hidden="true">
            <Icon className="w-5 h-5" style={{ color }} aria-hidden="true" focusable="false" />
          </div>

          <div className="flex flex-col gap-1 flex-1" id={metaId}>
            <h3 id={titleId} className="text-[var(--text)]">
              {label}
            </h3>
            <p className="caption text-[var(--muted)]">{address}</p>
            <p className="caption text-[var(--muted)]">{id}</p>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-2">
          <TagPriority priority={priority} />

          <span
            className="px-3 py-1 rounded-[8px] caption"
            style={{
              backgroundColor: statusInfo.bg,
              color: statusInfo.fg,
              opacity: 1,
            }}
          >
            {statusInfo.label}
          </span>
        </div>

        {onAction && (
          <Button variant="secondary" onClick={onAction} aria-label={`Ver detalles de la incidencia ${id}`}>
            Ver detalles
          </Button>
        )}
      </div>
    </article>
  );
}

