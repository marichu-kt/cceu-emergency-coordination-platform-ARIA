import React, { useEffect, useRef, useState } from 'react';

interface MapLeafletProps {
  incidencias: Array<{
    id: string;
    lat: number;
    lon: number;
    tipo: string;
    prioridad: 'P1' | 'P2' | 'P3';
    estado: string;
    direccion: string;
  }>;
  height?: string;
  onIncidenciaClick?: (id: string) => void;
}

// Load Leaflet dynamically from CDN
const loadLeaflet = (): Promise<any> => {
  return new Promise((resolve, reject) => {
    if (typeof (window as any).L !== 'undefined') {
      resolve((window as any).L);
      return;
    }

    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
    link.integrity = 'sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=';
    link.crossOrigin = '';
    document.head.appendChild(link);

    const script = document.createElement('script');
    script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
    script.integrity = 'sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=';
    script.crossOrigin = '';
    script.onload = () => resolve((window as any).L);
    script.onerror = reject;
    document.head.appendChild(script);
  });
};

export function MapLeaflet({ incidencias, height = '400px', onIncidenciaClick }: MapLeafletProps) {
  const mapRef = useRef<any>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const markersRef = useRef<any[]>([]);

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    loadLeaflet().then(() => setIsLoaded(true)).catch(console.error);
  }, []);

  useEffect(() => {
    if (!mapContainerRef.current || !isLoaded) return;

    const L = (window as any).L;

    // Initialize map only once
    if (!mapRef.current) {
      // ✅ zoomControl false: elimina los controles nativos con <a href="#"> (WAVE "broken same-page link")
      mapRef.current = L.map(mapContainerRef.current, {
        zoomControl: false,
        attributionControl: true,
      }).setView([40.4168, -3.7038], 12);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 19,
      }).addTo(mapRef.current);
    }

    // Clear existing markers
    markersRef.current.forEach((m) => m.remove());
    markersRef.current = [];

    // Add markers for each incidencia
    incidencias.forEach((inc) => {
      if (!mapRef.current) return;

      const color = inc.prioridad === 'P1' ? '#EF4444' : inc.prioridad === 'P2' ? '#F59E0B' : '#10B981';

      const icon = L.divIcon({
        className: 'custom-marker',
        html: `
          <div style="
            width: 24px;
            height: 24px;
            background-color: ${color};
            border: 3px solid white;
            border-radius: 50%;
            box-shadow: 0 2px 8px rgba(0,0,0,0.3);
          " aria-hidden="true"></div>
        `,
        iconSize: [24, 24],
        iconAnchor: [12, 12],
      });

      const tipoLabel = inc.tipo === 'fire' ? 'Incendio' : inc.tipo === 'rain' ? 'Inundación' : 'Nevada';
      const prioridadLabel =
        inc.prioridad === 'P1' ? 'P1 - Crítica' : inc.prioridad === 'P2' ? 'P2 - Alta' : 'P3 - Normal';

      // ✅ Popup con mejor contraste (antes el gris #64748B suele dar warnings)
      const popupHtml = `
        <div style="min-width: 220px; color: #0F172A;">
          <strong style="color: #1D4ED8;">${inc.id}</strong>
          <div style="margin-top: 8px; font-size: 14px; line-height: 1.3;">
            <div style="margin-bottom: 6px;"><strong>Tipo:</strong> ${tipoLabel}</div>
            <div style="margin-bottom: 6px;"><strong>Prioridad:</strong> ${prioridadLabel}</div>
            <div style="margin-bottom: 6px;"><strong>Estado:</strong> ${inc.estado}</div>
            <div style="margin-top: 10px; color: #0F172A; font-size: 13px;">${inc.direccion}</div>
          </div>
        </div>
      `;

      const marker = L.marker([inc.lat, inc.lon], { icon }).bindPopup(popupHtml).addTo(mapRef.current);

      // Click callback
      if (onIncidenciaClick) {
        marker.on('click', () => onIncidenciaClick(inc.id));
      }

      markersRef.current.push(marker);
    });

    // Fit bounds to show all markers
    if (incidencias.length > 0) {
      const bounds = L.latLngBounds(incidencias.map((inc) => [inc.lat, inc.lon]));
      mapRef.current.fitBounds(bounds, { padding: [50, 50], maxZoom: 13 });
    }

    return () => {
      markersRef.current.forEach((m) => m.remove());
    };
  }, [incidencias, onIncidenciaClick, isLoaded]);

  if (!isLoaded) {
    return (
      <div
        style={{ height, width: '100%', borderRadius: '12px', overflow: 'hidden' }}
        className="border-2 border-[var(--border)] flex items-center justify-center bg-[#f8f9fa]"
        role="status"
        aria-live="polite"
        aria-label="Cargando mapa"
      >
        <p className="text-[#475569]">Cargando mapa...</p>
      </div>
    );
  }

  const zoomIn = () => mapRef.current?.zoomIn();
  const zoomOut = () => mapRef.current?.zoomOut();

  return (
    <div
      className="relative border-2 border-[var(--border)]"
      style={{ height, width: '100%', borderRadius: '12px', overflow: 'hidden' }}
    >
      <div
        ref={mapContainerRef}
        style={{ height: '100%', width: '100%' }}
        role="region"
        aria-label="Mapa de incidencias"
      />

      {/* ✅ Controles propios (accesibles) */}
      <div
        className="absolute left-3 top-3 flex flex-col rounded-[10px] overflow-hidden bg-white border border-[var(--border)]"
        style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.14)' }}
        aria-label="Controles del mapa"
      >
        <button
          type="button"
          onClick={zoomIn}
          className="w-11 h-11 flex items-center justify-center hover:bg-[#f1f5f9] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)]"
          aria-label="Acercar mapa"
        >
          <span aria-hidden="true" className="text-[18px] leading-none text-[var(--text)]">
            +
          </span>
        </button>
        <div className="h-px bg-[var(--border)]" />
        <button
          type="button"
          onClick={zoomOut}
          className="w-11 h-11 flex items-center justify-center hover:bg-[#f1f5f9] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)]"
          aria-label="Alejar mapa"
        >
          <span aria-hidden="true" className="text-[18px] leading-none text-[var(--text)]">
            −
          </span>
        </button>
      </div>
    </div>
  );
}
