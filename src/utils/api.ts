import { projectId, publicAnonKey } from './supabase/info';

const API_BASE = `https://${projectId}.supabase.co/functions/v1/make-server-043601a8`;

export interface Incidencia {
  id: string;
  tipo: 'fire' | 'rain' | 'snow';
  prioridad: 'P1' | 'P2' | 'P3';
  direccion: string;
  descripcion: string;
  lat: number;
  lon: number;
  estado: 'Nueva' | 'En curso' | 'Asignada';
  createdAt: string;
  updatedAt?: string;
}

async function fetchAPI(endpoint: string, options: RequestInit = {}) {
  const response = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${publicAnonKey}`,
      ...options.headers,
    },
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: response.statusText }));
    throw new Error(error.error || 'API request failed');
  }

  return response.json();
}

export async function getIncidencias(): Promise<Incidencia[]> {
  const result = await fetchAPI('/incidencias');
  return result.data;
}

export async function getIncidencia(id: string): Promise<Incidencia> {
  const result = await fetchAPI(`/incidencias/${id}`);
  return result.data;
}

export async function createIncidencia(data: Omit<Incidencia, 'id' | 'estado' | 'createdAt'>): Promise<Incidencia> {
  const result = await fetchAPI('/incidencias', {
    method: 'POST',
    body: JSON.stringify(data),
  });
  return result.data;
}

export async function updateIncidencia(id: string, data: Partial<Incidencia>): Promise<Incidencia> {
  const result = await fetchAPI(`/incidencias/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
  return result.data;
}

export async function deleteIncidencia(id: string): Promise<void> {
  await fetchAPI(`/incidencias/${id}`, {
    method: 'DELETE',
  });
}

export async function initializeSampleData(): Promise<void> {
  await fetchAPI('/init-data', {
    method: 'POST',
  });
}
