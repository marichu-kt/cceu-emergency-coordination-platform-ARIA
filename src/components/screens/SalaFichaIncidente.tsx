import React, { useState, useEffect } from 'react';
import { ArrowLeft, Flame, Droplet, Snowflake, MapPin, Clock, Trash2 } from 'lucide-react';
import { Button } from '../design-system/Button';
import { TagPriority } from '../design-system/TagPriority';
import { ModalDeleteConfirm } from '../design-system/ModalDeleteConfirm';
import { getIncidencia, deleteIncidencia, type Incidencia } from '../../utils/api';

interface SalaFichaIncidenteProps {
  incidenciaId: string;
  onClassify: () => void;
  onDispatch?: () => void;
  onDelete?: () => void;
  onBack: () => void;
}

export function SalaFichaIncidente({ incidenciaId, onClassify, onDispatch, onDelete, onBack }: SalaFichaIncidenteProps) {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [incidencia, setIncidencia] = useState<Incidencia | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadIncidencia();
  }, [incidenciaId]);

  const loadIncidencia = async () => {
    setLoading(true);
    try {
      const data = await getIncidencia(incidenciaId);
      setIncidencia(data);
    } catch (error) {
      console.error('Error loading incidencia:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteConfirm = async () => {
    setShowDeleteModal(false);
    try {
      await deleteIncidencia(incidenciaId);
      if (onDelete) {
        onDelete();
      }
    } catch (error) {
      console.error('Error deleting incidencia:', error);
      alert('Error al eliminar la incidencia');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[var(--background)] flex items-center justify-center">
        <p className="text-[var(--muted)]">Cargando...</p>
      </div>
    );
  }

  if (!incidencia) {
    return (
      <div className="min-h-screen bg-[var(--background)] flex items-center justify-center">
        <p className="text-[var(--muted)]">Incidencia no encontrada</p>
      </div>
    );
  }

  const getTipoIcon = () => {
    switch (incidencia.tipo) {
      case 'fire': return <Flame className="w-5 h-5 text-[var(--p1)]" />;
      case 'rain': return <Droplet className="w-5 h-5 text-[#3B82F6]" />;
      case 'snow': return <Snowflake className="w-5 h-5 text-[#06B6D4]" />;
    }
  };

  const getTipoLabel = () => {
    switch (incidencia.tipo) {
      case 'fire': return 'Incendio';
      case 'rain': return 'Inundación';
      case 'snow': return 'Nevada';
    }
  };

  const getTipoBgColor = () => {
    switch (incidencia.tipo) {
      case 'fire': return '#FEE2E2';
      case 'rain': return '#DBEAFE';
      case 'snow': return '#CFFAFE';
    }
  };

  const timeline = [
    { time: new Date(incidencia.createdAt).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' }), event: 'Incidencia creada', user: 'Sistema' },
  ];

  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* Header */}
      <header className="bg-white border-b border-[var(--border)] px-8 py-4">
        <div className="max-w-7xl mx-auto flex items-center gap-4">
          <button
            onClick={onBack}
            className="p-2 hover:bg-[#f1f5f9] rounded-[8px] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2"
            aria-label="Volver"
            type="button"
          >
            <ArrowLeft className="w-5 h-5 text-[var(--text)]" aria-hidden="true" />
          </button>

          {/* Antes era h2, lo cambiamos para no “saltar” niveles de heading */}
          <div className="text-[var(--primary)] font-semibold">
            CCEU
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto p-8">
        <div className="mb-6">
          <h1>Ficha de incidente</h1>
          <p className="caption text-[var(--muted)] mt-1">{incidencia.id}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Left Panel - Summary */}
          <div className="bg-white p-6 rounded-[12px]" style={{ boxShadow: 'var(--shadow-card)' }}>
            <h3 className="mb-6">Resumen</h3>

            <div className="space-y-6">
              {/* Type */}
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-[8px]" style={{ backgroundColor: getTipoBgColor() }}>
                  {getTipoIcon()}
                </div>
                <div>
                  <p className="caption text-[var(--muted)] mb-1">Tipo</p>
                  <p>{getTipoLabel()}</p>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-[8px] bg-[#EFF6FF]">
                  <MapPin className="w-5 h-5 text-[var(--primary)]" />
                </div>
                <div>
                  <p className="caption text-[var(--muted)] mb-1">Ubicación</p>
                  <p>{incidencia.direccion}</p>
                </div>
              </div>

              {/* Time */}
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-[8px] bg-[#F3F4F6]">
                  <Clock className="w-5 h-5 text-[var(--muted)]" />
                </div>
                <div>
                  <p className="caption text-[var(--muted)] mb-1">Hora de creación</p>
                  <p>{new Date(incidencia.createdAt).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}</p>
                </div>
              </div>

              {/* Priority */}
              <div>
                <p className="caption text-[var(--muted)] mb-3">Prioridad actual</p>
                <TagPriority priority={incidencia.prioridad} />
              </div>

              {/* Description */}
              <div>
                <p className="caption text-[var(--muted)] mb-2">Descripción</p>
                <p className="text-[var(--text)]">
                  {incidencia.descripcion || 'Sin descripción'}
                </p>
              </div>

              {/* Estado */}
              <div>
                <p className="caption text-[var(--muted)] mb-2">Estado</p>
                <p className="text-[var(--text)]">{incidencia.estado}</p>
              </div>
            </div>
          </div>

          {/* Right Panel - Timeline */}
          <div className="bg-white p-6 rounded-[12px]" style={{ boxShadow: 'var(--shadow-card)' }}>
            <h3 className="mb-6">Línea temporal</h3>

            <div className="space-y-4">
              {timeline.map((item, index) => (
                <div key={index} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-3 h-3 bg-[var(--primary)] rounded-full" />
                    {index < timeline.length - 1 && (
                      <div className="w-0.5 h-full bg-[var(--border)] flex-1 mt-2" />
                    )}
                  </div>
                  <div className="flex-1 pb-6">
                    <p className="caption text-[var(--muted)]">{item.time}</p>
                    <p className="mt-1">{item.event}</p>
                    <p className="caption text-[var(--muted)] mt-1">Por: {item.user}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between mt-8">
          <Button variant="tertiary" onClick={onBack}>
            Volver
          </Button>
          <div className="flex items-center gap-3">
            {onDelete && (
              <Button
                variant="danger"
                onClick={() => setShowDeleteModal(true)}
              >
                <div className="flex items-center gap-2">
                  <Trash2 className="w-5 h-5" />
                  <span>Eliminar</span>
                </div>
              </Button>
            )}
            <Button variant="secondary" onClick={onClassify}>
              Modificar
            </Button>
            {onDispatch && (
              <Button variant="primary" onClick={onDispatch}>
                Confirmar
              </Button>
            )}
          </div>
        </div>
      </main>

      {/* Delete Confirmation Modal */}
      <ModalDeleteConfirm
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDeleteConfirm}
        title="Eliminar incidencia"
        message="¿Seguro que quieres eliminar esta incidencia? Esta acción no se puede deshacer."
      />
    </div>
  );
}
