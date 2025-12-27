import React, { useState } from 'react';
import { Button } from './design-system/Button';
import { InputText } from './design-system/InputText';
import { Select } from './design-system/Select';
import { Checkbox } from './design-system/Checkbox';
import { TagPriority } from './design-system/TagPriority';
import { ChipFilter } from './design-system/ChipFilter';
import { CardIncidente } from './design-system/CardIncidente';
import { TableRecursos } from './design-system/TableRecursos';
import { Toast } from './design-system/Toast';
import { Modal } from './design-system/Modal';
import { Skeleton } from './design-system/Skeleton';

export function Library() {
  const [showModal, setShowModal] = useState(false);
  const [showToast, setShowToast] = useState(false);

  return (
    <div className="min-h-screen bg-[var(--background)] p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="mb-2">Biblioteca de diseño - CCEU</h1>
          <p className="text-[var(--muted)]">Sistema de componentes y tokens para coordinación de emergencias</p>
        </div>

        {/* Color Tokens */}
        <section className="mb-16">
          <h2 className="mb-6">Tokens de color</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {[
              { name: 'Primary', var: '--primary', value: '#2563EB' },
              { name: 'Success', var: '--success', value: '#16A34A' },
              { name: 'Warning', var: '--warning', value: '#F59E0B' },
              { name: 'Error', var: '--error', value: '#DC2626' },
              { name: 'Info', var: '--info', value: '#0284C7' },
              { name: 'P1 (Crítica)', var: '--p1', value: '#EF4444' },
              { name: 'P2 (Alta)', var: '--p2', value: '#F59E0B' },
              { name: 'P3 (Normal)', var: '--p3', value: '#10B981' },
              { name: 'Text', var: '--text', value: '#111827' },
              { name: 'Muted', var: '--muted', value: '#6B7280' },
            ].map((color) => (
              <div key={color.var} className="bg-white p-4 rounded-[12px]" style={{ boxShadow: 'var(--shadow-card)' }}>
                <div className="w-full h-16 rounded-[8px] mb-3" style={{ backgroundColor: `var(${color.var})` }} />
                <p className="caption mb-1">{color.name}</p>
                <p className="caption text-[var(--muted)]">{color.value}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Typography */}
        <section className="mb-16">
          <h2 className="mb-6">Tipografía</h2>
          <div className="bg-white p-6 rounded-[12px]" style={{ boxShadow: 'var(--shadow-card)' }}>
            <div className="space-y-6">
              <div>
                <h1>Heading 1 - 28px/36px SemiBold</h1>
                <p className="caption text-[var(--muted)]">Inter, 28px, line-height 36px, font-weight 600</p>
              </div>
              <div>
                <h2>Heading 2 - 22px/28px SemiBold</h2>
                <p className="caption text-[var(--muted)]">Inter, 22px, line-height 28px, font-weight 600</p>
              </div>
              <div>
                <h3>Heading 3 - 18px/24px Medium</h3>
                <p className="caption text-[var(--muted)]">Inter, 18px, line-height 24px, font-weight 500</p>
              </div>
              <div>
                <p>Body - 16px/24px Regular</p>
                <p className="caption text-[var(--muted)]">Inter, 16px, line-height 24px, font-weight 400</p>
              </div>
              <div>
                <p className="caption">Caption - 14px/20px Regular</p>
                <p className="caption text-[var(--muted)]">Inter, 14px, line-height 20px, font-weight 400</p>
              </div>
            </div>
          </div>
        </section>

        {/* cmp/Button */}
        <section className="mb-16">
          <h2 className="mb-6">cmp/Button</h2>
          <div className="bg-white p-6 rounded-[12px]" style={{ boxShadow: 'var(--shadow-card)' }}>
            <div className="space-y-8">
              <div>
                <h3 className="mb-4">Primary</h3>
                <div className="flex flex-wrap gap-3">
                  <Button variant="primary">Default</Button>
                  <Button variant="primary" className="hover:bg-[#1d4ed8]">Hover</Button>
                  <Button variant="primary" className="active:bg-[#1e40af]">Pressed</Button>
                  <Button variant="primary" disabled>Disabled</Button>
                </div>
              </div>
              <div>
                <h3 className="mb-4">Secondary</h3>
                <div className="flex flex-wrap gap-3">
                  <Button variant="secondary">Default</Button>
                  <Button variant="secondary" disabled>Disabled</Button>
                </div>
              </div>
              <div>
                <h3 className="mb-4">Tertiary</h3>
                <div className="flex flex-wrap gap-3">
                  <Button variant="tertiary">Default</Button>
                  <Button variant="tertiary" disabled>Disabled</Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* cmp/InputText */}
        <section className="mb-16">
          <h2 className="mb-6">cmp/InputText</h2>
          <div className="bg-white p-6 rounded-[12px]" style={{ boxShadow: 'var(--shadow-card)' }}>
            <div className="space-y-6 max-w-md">
              <InputText label="Campo por defecto" placeholder="Introduce texto..." helperText="Texto de ayuda" />
              <InputText label="Campo con error" placeholder="Introduce texto..." state="error" errorMessage="Este campo es obligatorio" />
              <InputText label="Campo con éxito" placeholder="Introduce texto..." state="success" />
            </div>
          </div>
        </section>

        {/* cmp/Select */}
        <section className="mb-16">
          <h2 className="mb-6">cmp/Select</h2>
          <div className="bg-white p-6 rounded-[12px]" style={{ boxShadow: 'var(--shadow-card)' }}>
            <div className="max-w-md">
              <Select
                label="Tipo de incidencia"
                options={[
                  { value: 'fire', label: 'Incendio' },
                  { value: 'rain', label: 'Inundación' },
                  { value: 'snow', label: 'Nevada' },
                ]}
              />
            </div>
          </div>
        </section>

        {/* cmp/Checkbox */}
        <section className="mb-16">
          <h2 className="mb-6">cmp/Checkbox</h2>
          <div className="bg-white p-6 rounded-[12px]" style={{ boxShadow: 'var(--shadow-card)' }}>
            <div className="space-y-4">
              <Checkbox label="Opción por defecto" />
              <Checkbox label="Opción marcada" defaultChecked />
              <Checkbox label="Opción deshabilitada" disabled />
            </div>
          </div>
        </section>

        {/* cmp/TagPriority */}
        <section className="mb-16">
          <h2 className="mb-6">cmp/TagPriority</h2>
          <div className="bg-white p-6 rounded-[12px]" style={{ boxShadow: 'var(--shadow-card)' }}>
            <div className="flex flex-wrap gap-3">
              <TagPriority priority="P1" />
              <TagPriority priority="P2" />
              <TagPriority priority="P3" />
            </div>
          </div>
        </section>

        {/* cmp/ChipFilter */}
        <section className="mb-16">
          <h2 className="mb-6">cmp/ChipFilter</h2>
          <div className="bg-white p-6 rounded-[12px]" style={{ boxShadow: 'var(--shadow-card)' }}>
            <div className="flex flex-wrap gap-3">
              <ChipFilter label="Todas" active={false} />
              <ChipFilter label="Activo" active={true} />
              <ChipFilter label="Nuevas" active={false} />
            </div>
          </div>
        </section>

        {/* cmp/CardIncidente */}
        <section className="mb-16">
          <h2 className="mb-6">cmp/CardIncidente</h2>
          <div className="max-w-2xl">
            <CardIncidente
              type="fire"
              address="Calle Alcalá 123, Madrid"
              priority="P1"
              status="nueva"
              id="#INC-2025-00123"
              onAction={() => alert('Ver detalles')}
            />
          </div>
        </section>

        {/* cmp/TableRecursos */}
        <section className="mb-16">
          <h2 className="mb-6">cmp/TableRecursos</h2>
          <TableRecursos
            recursos={[
              { agencia: 'Bomberos Madrid - Estación Central', capacidad: '4 efectivos, 1 autobomba', eta: '7 min' },
              { agencia: 'SAMUR - Unidad 23', capacidad: '2 paramédicos, 1 ambulancia', eta: '5 min' },
              { agencia: 'Policía Municipal - Patrulla 15', capacidad: '2 agentes, 1 vehículo', eta: '4 min' },
            ]}
          />
        </section>

        {/* cmp/Toast */}
        <section className="mb-16">
          <h2 className="mb-6">cmp/Toast</h2>
          <div className="bg-white p-6 rounded-[12px]" style={{ boxShadow: 'var(--shadow-card)' }}>
            <div className="flex flex-wrap gap-3">
              <Button variant="primary" onClick={() => setShowToast(true)}>
                Mostrar Toast
              </Button>
              <p className="caption text-[var(--muted)] w-full mt-2">
                El toast aparece en la parte superior central y se cierra automáticamente después de 1.2 segundos.
              </p>
            </div>
          </div>
        </section>

        {/* cmp/Modal */}
        <section className="mb-16">
          <h2 className="mb-6">cmp/Modal</h2>
          <div className="bg-white p-6 rounded-[12px]" style={{ boxShadow: 'var(--shadow-card)' }}>
            <Button variant="primary" onClick={() => setShowModal(true)}>
              Abrir Modal
            </Button>
          </div>
        </section>

        {/* cmp/Skeleton */}
        <section className="mb-16">
          <h2 className="mb-6">cmp/Skeleton</h2>
          <div className="bg-white p-6 rounded-[12px]" style={{ boxShadow: 'var(--shadow-card)' }}>
            <div className="space-y-6">
              <div>
                <h3 className="mb-4">Line</h3>
                <Skeleton type="line" count={3} />
              </div>
              <div>
                <h3 className="mb-4">Card</h3>
                <Skeleton type="card" count={2} />
              </div>
            </div>
          </div>
        </section>

        {/* Spacing */}
        <section className="mb-16">
          <h2 className="mb-6">Espaciado</h2>
          <div className="bg-white p-6 rounded-[12px]" style={{ boxShadow: 'var(--shadow-card)' }}>
            <div className="space-y-4">
              {[
                { name: 'XS', value: '4px', var: '--space-xs' },
                { name: 'SM', value: '8px', var: '--space-sm' },
                { name: 'MD', value: '16px', var: '--space-md' },
                { name: 'LG', value: '24px', var: '--space-lg' },
                { name: 'XL', value: '32px', var: '--space-xl' },
              ].map((space) => (
                <div key={space.var} className="flex items-center gap-4">
                  <div className="w-32">
                    <p className="caption">{space.name} - {space.value}</p>
                  </div>
                  <div className="h-8 bg-[var(--primary)]" style={{ width: `var(${space.var})` }} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Border Radius */}
        <section className="mb-16">
          <h2 className="mb-6">Border Radius</h2>
          <div className="bg-white p-6 rounded-[12px]" style={{ boxShadow: 'var(--shadow-card)' }}>
            <div className="flex gap-6">
              <div className="text-center">
                <div className="w-24 h-24 bg-[var(--primary)] mb-3" style={{ borderRadius: 'var(--radius-button)' }} />
                <p className="caption">Button (8px)</p>
              </div>
              <div className="text-center">
                <div className="w-24 h-24 bg-[var(--primary)] mb-3" style={{ borderRadius: 'var(--radius-card)' }} />
                <p className="caption">Card (12px)</p>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Modal Example */}
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="Título del modal"
        primaryAction={{
          label: 'Confirmar',
          onClick: () => setShowModal(false),
        }}
        secondaryAction={{
          label: 'Cancelar',
          onClick: () => setShowModal(false),
        }}
      >
        <p>Este es el contenido del modal. Puedes incluir cualquier contenido aquí, como formularios, información adicional, o confirmaciones.</p>
      </Modal>

      {/* Toast Example */}
      {showToast && (
        <Toast
          type="success"
          message="Guardado ✓"
          onClose={() => setShowToast(false)}
        />
      )}
    </div>
  );
}
