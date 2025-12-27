import React, { useEffect, useRef, useState } from 'react';
import { Loader2 } from 'lucide-react';

interface MapInteractiveProps {
  direccion: string;
  onLocationChange: (direccion: string, lat: number, lon: number) => void;
  height?: string;
}

// Load Leaflet dynamically from CDN
const loadLeaflet = (): Promise<any> => {
  return new Promise((resolve, reject) => {
    // Check if already loaded
    if (typeof (window as any).L !== 'undefined') {
      resolve((window as any).L);
      return;
    }

    // Load CSS
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
    link.integrity = 'sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=';
    link.crossOrigin = '';
    document.head.appendChild(link);

    // Load JS
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
    script.integrity = 'sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=';
    script.crossOrigin = '';
    script.onload = () => {
      resolve((window as any).L);
    };
    script.onerror = reject;
    document.head.appendChild(script);
  });
};

export function MapInteractive({ direccion, onLocationChange, height = '400px' }: MapInteractiveProps) {
  const mapRef = useRef<any>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const markerRef = useRef<any>(null);
  const [isGeocoding, setIsGeocoding] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // Geocode address to coordinates
  const geocodeAddress = async (address: string) => {
    if (!address.trim()) return;

    setIsGeocoding(true);
    setError(null);

    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}&limit=1`
      );
      const data = await response.json();

      if (data.length > 0) {
        const { lat, lon } = data[0];
        const latNum = parseFloat(lat);
        const lonNum = parseFloat(lon);

        if (mapRef.current) {
          const L = (window as any).L;
          mapRef.current.setView([latNum, lonNum], 15);
          
          if (markerRef.current) {
            markerRef.current.setLatLng([latNum, lonNum]);
          } else {
            markerRef.current = L.marker([latNum, lonNum]).addTo(mapRef.current);
          }
        }

        onLocationChange(address, latNum, lonNum);
      } else {
        setError('No se ha podido localizar la dirección');
      }
    } catch (err) {
      console.error('Geocoding error:', err);
      setError('Error al buscar la dirección');
    } finally {
      setIsGeocoding(false);
    }
  };

  // Reverse geocode coordinates to address
  const reverseGeocode = async (lat: number, lon: number) => {
    setIsGeocoding(true);
    setError(null);

    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`
      );
      const data = await response.json();

      if (data.display_name) {
        onLocationChange(data.display_name, lat, lon);
      }
    } catch (err) {
      console.error('Reverse geocoding error:', err);
      setError('Error al obtener la dirección');
    } finally {
      setIsGeocoding(false);
    }
  };

  // Initialize map
  useEffect(() => {
    loadLeaflet().then(() => setIsLoaded(true)).catch(console.error);
  }, []);

  useEffect(() => {
    if (!mapContainerRef.current || !isLoaded || mapRef.current) return;

    const L = (window as any).L;
    mapRef.current = L.map(mapContainerRef.current).setView([40.4168, -3.7038], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
      maxZoom: 19,
    }).addTo(mapRef.current);

    // Add click handler
    mapRef.current.on('click', (e: any) => {
      const { lat, lng } = e.latlng;
      
      if (markerRef.current) {
        markerRef.current.setLatLng([lat, lng]);
      } else {
        markerRef.current = L.marker([lat, lng]).addTo(mapRef.current);
      }

      reverseGeocode(lat, lng);
    });

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [isLoaded]);

  // Geocode when address changes (debounced)
  useEffect(() => {
    if (!direccion || !isLoaded) return;

    const timeoutId = setTimeout(() => {
      geocodeAddress(direccion);
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [direccion, isLoaded]);

  if (!isLoaded) {
    return (
      <div 
        style={{ height, width: '100%', borderRadius: '12px', overflow: 'hidden' }}
        className="border-2 border-[var(--border)] flex items-center justify-center bg-[#f8f9fa]"
      >
        <p className="text-[var(--muted)]">Cargando mapa...</p>
      </div>
    );
  }

  return (
    <div className="relative">
      <div 
        ref={mapContainerRef} 
        style={{ height, width: '100%', borderRadius: '12px', overflow: 'hidden' }}
        className="border-2 border-[var(--border)]"
      />
      
      {isGeocoding && (
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-white px-4 py-2 rounded-[8px] shadow-lg flex items-center gap-2">
          <Loader2 className="w-4 h-4 animate-spin text-[var(--primary)]" />
          <span className="caption">Buscando en el mapa...</span>
        </div>
      )}

      {error && (
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-[#FEE2E2] text-[#DC2626] px-4 py-2 rounded-[8px] shadow-lg">
          <span className="caption">{error}</span>
        </div>
      )}

      <p className="caption text-[var(--muted)] mt-2">
        Haz clic en el mapa para seleccionar una ubicación o escribe una dirección arriba
      </p>
    </div>
  );
}