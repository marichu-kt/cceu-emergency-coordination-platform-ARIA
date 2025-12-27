import React from 'react';

interface Recurso {
  agencia: string;
  capacidad: string;
  eta: string;
  selected?: boolean;
}

interface TableRecursosProps {
  recursos: Recurso[];
  onSelectRecurso?: (index: number) => void;
}

export function TableRecursos({ recursos, onSelectRecurso }: TableRecursosProps) {
  return (
    <div className="w-full overflow-x-auto bg-white rounded-[12px]" style={{ boxShadow: 'var(--shadow-card)' }}>
      <table className="w-full">
        <thead>
          <tr className="border-b-2 border-[var(--border)]">
            <th className="text-left p-4 caption" style={{ fontWeight: 600 }}>Agencia</th>
            <th className="text-left p-4 caption" style={{ fontWeight: 600 }}>Capacidad</th>
            <th className="text-left p-4 caption" style={{ fontWeight: 600 }}>Tiempo</th>
            {onSelectRecurso && <th className="text-left p-4 caption" style={{ fontWeight: 600 }}>Acción</th>}
          </tr>
        </thead>
        <tbody>
          {recursos.map((recurso, index) => (
            <tr 
              key={index} 
              className={`border-b border-[var(--border)] last:border-0 ${index % 2 === 1 ? 'bg-[#F8FAFC]' : ''} ${recurso.selected ? 'bg-[#EFF6FF]' : ''}`}
            >
              <td className="p-4">{recurso.agencia}</td>
              <td className="p-4">{recurso.capacidad}</td>
              <td className="p-4">{recurso.eta}</td>
              {onSelectRecurso && (
                <td className="p-4">
                  <button
                    onClick={() => onSelectRecurso(index)}
                    className="text-[var(--primary)] caption hover:underline"
                  >
                    {recurso.selected ? 'Seleccionado' : 'Seleccionar'}
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}