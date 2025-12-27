import { useState } from 'react';
import { MapPin, Clock, Phone, MessageSquare } from 'lucide-react';
import { Button } from '../design-system/Button';
import { MapNavigation } from '../MapNavigation';

interface CampoNavegacionProps {
  onArrived: () => void;
}

export function CampoNavegacion({ onArrived }: CampoNavegacionProps) {
  const [status, setStatus] = useState<'en-ruta' | 'en-escena'>('en-ruta');

  const destination = {
    lat: 40.4200,
    lon: -3.6920,
    address: 'Calle Alcalá 123, Madrid',
  };

  return (
    <div className="min-h-screen bg-[var(--background)] flex flex-col" style={{ maxWidth: '390px', margin: '0 auto' }}>
      {/* H1 oculto para estructura */}
      <h1 className="sr-only">Navegación al incidente</h1>

      {/* Header */}
      <header className="bg-[var(--primary)] text-white px-4 py-4">
        <p className="text-white font-semibold">CCEU Campo</p>
        <p className="text-white mt-1">
          {status === 'en-ruta' ? 'En ruta al incidente' : 'En escena'}
        </p>
      </header>

      {/* Map */}
      <div className="relative h-[400px]">
        <MapNavigation destination={destination} height="400px" />

        {/* Quick Actions */}
        <div
          className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm rounded-full px-3 py-2 flex items-center gap-2"
          style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.12)' }}
          aria-label="Acciones rápidas"
        >
          <a
            href="tel:112"
            className="w-9 h-9 rounded-full hover:bg-[#eff6ff] transition-colors flex items-center justify-center group relative focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2"
            aria-label="Llamar"
          >
            <Phone className="w-4 h-4 text-[var(--primary)]" aria-hidden="true" />
          </a>

          <div className="w-px h-5 bg-[var(--border)]" aria-hidden="true"></div>

          <button
            type="button"
            className="w-9 h-9 rounded-full hover:bg-[#eff6ff] transition-colors flex items-center justify-center group relative focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2"
            aria-label="Chat"
            onClick={() => alert('Chat (pendiente)')}
          >
            <MessageSquare className="w-4 h-4 text-[var(--primary)]" aria-hidden="true" />
          </button>
        </div>

        {/* ETA Card */}
        <div className="absolute bottom-4 left-4 right-4 bg-white p-4 rounded-[12px]" style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.15)' }}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[13px] text-[#475569]">Tiempo estimado</p>
              <p className="text-[24px] font-semibold text-[var(--primary)]">7 min</p>
            </div>
            <div className="text-right">
              <p className="text-[13px] text-[#475569]">Distancia</p>
              <p className="text-[#0f172a]">2.3 km</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <main className="flex-1 p-4" aria-label="Detalles de la navegación">
        <section className="bg-white p-4 rounded-[12px] mb-6" style={{ boxShadow: 'var(--shadow-card)' }}>
          <h2 className="sr-only">Datos del destino</h2>

          <div className="flex items-center gap-3 mb-3">
            <MapPin className="w-5 h-5 text-[#475569]" aria-hidden="true" />
            <div>
              <p className="text-[13px] text-[#475569]">Destino</p>
              <p className="text-[#0f172a]">Calle Alcalá 123, Madrid</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Clock className="w-5 h-5 text-[#475569]" aria-hidden="true" />
            <div>
              <p className="text-[13px] text-[#475569]">Hora de salida</p>
              <p className="text-[#0f172a]">09:47</p>
            </div>
          </div>
        </section>

        {status === 'en-ruta' ? (
          <Button variant="primary" fullWidth onClick={() => setStatus('en-escena')}>
            Marcar como &quot;En escena&quot;
          </Button>
        ) : (
          <div className="space-y-3">
            <div className="p-4 bg-[#D1FAE5] rounded-[8px] mb-4">
              <p className="text-[#065f46] flex items-center gap-2">
                <span className="w-2 h-2 bg-[#065f46] rounded-full animate-pulse" aria-hidden="true"></span>
                Has llegado al lugar del incidente
              </p>
            </div>
            <Button variant="primary" fullWidth onClick={onArrived}>
              Continuar a evidencias
            </Button>
          </div>
        )}
      </main>
    </div>
  );
}
