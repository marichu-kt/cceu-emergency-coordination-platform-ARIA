import React, { useEffect, useRef, useState } from 'react';

interface MapNavigationProps {
  destination: {
    lat: number;
    lon: number;
    address: string;
  };
  height?: string;
}

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

export function MapNavigation({ destination, height = '400px' }: MapNavigationProps) {
  const mapRef = useRef<any>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const markerRef = useRef<any>(null);

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    loadLeaflet().then(() => setIsLoaded(true)).catch(console.error);
  }, []);

  useEffect(() => {
    if (!mapContainerRef.current || !isLoaded) return;

    const L = (window as any).L;

    // ✅ Importante: desactivamos zoomControl nativo (evita <a href="#"> y los avisos de WAVE)
    if (!mapRef.current) {
      mapRef.current = L.map(mapContainerRef.current, {
        zoomControl: false,
        attributionControl: true,
      }).setView([destination.lat, destination.lon], 15);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 19,
      }).addTo(mapRef.current);
    }

    if (markerRef.current) markerRef.current.remove();

    const icon = L.divIcon({
      className: 'custom-marker-destination',
      html: `
        <div style="width: 32px; height: 32px; position: relative;">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"
              fill="#EF4444" stroke="white" stroke-width="1"/>
          </svg>
        </div>
      `,
      iconSize: [32, 32],
      iconAnchor: [16, 32],
      popupAnchor: [0, -32],
    });

    markerRef.current = L.marker([destination.lat, destination.lon], { icon })
      .bindPopup(
        `
        <div style="min-width: 180px;">
          <strong style="color: #1D4ED8;">Destino</strong>
          <div style="margin-top: 8px; color: #0F172A; font-size: 14px;">${destination.address}</div>
        </div>
      `
      )
      .addTo(mapRef.current)
      .openPopup();

    mapRef.current.setView([destination.lat, destination.lon], 15);

    return () => {
      if (markerRef.current) markerRef.current.remove();
    };
  }, [destination, isLoaded]);

  if (!isLoaded) {
    return (
      <div
        style={{ height, width: '100%', borderRadius: '0', overflow: 'hidden' }}
        className="flex items-center justify-center bg-gradient-to-br from-[#3B82F6] to-[#1E40AF]"
        role="status"
        aria-live="polite"
        aria-label="Cargando mapa"
      >
        <p className="text-white">Cargando mapa...</p>
      </div>
    );
  }

  const zoomIn = () => mapRef.current?.zoomIn();
  const zoomOut = () => mapRef.current?.zoomOut();

  return (
    <div className="relative" style={{ height, width: '100%', borderRadius: '0', overflow: 'hidden' }}>
      <div
        ref={mapContainerRef}
        style={{ height: '100%', width: '100%' }}
        role="region"
        aria-label="Mapa de navegación"
      />

      {/* ✅ Controles propios (botones reales) */}
      <div className="absolute left-3 top-3 flex flex-col rounded-[10px] overflow-hidden bg-white border border-[var(--border)]"
           style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.14)' }}>
        <button
          type="button"
          onClick={zoomIn}
          className="w-11 h-11 flex items-center justify-center hover:bg-[#f1f5f9] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)]"
          aria-label="Acercar mapa"
        >
          <span aria-hidden="true" className="text-[18px] leading-none text-[var(--text)]">+</span>
        </button>
        <div className="h-px bg-[var(--border)]" />
        <button
          type="button"
          onClick={zoomOut}
          className="w-11 h-11 flex items-center justify-center hover:bg-[#f1f5f9] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)]"
          aria-label="Alejar mapa"
        >
          <span aria-hidden="true" className="text-[18px] leading-none text-[var(--text)]">−</span>
        </button>
      </div>
    </div>
  );
}
