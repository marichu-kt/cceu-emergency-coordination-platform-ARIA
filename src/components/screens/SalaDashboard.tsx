// FILE: src/components/screens/SalaDashboard.tsx
import { useState, useEffect, useId } from 'react';
import { Search, Plus } from 'lucide-react';
import { Button } from '../design-system/Button';
import { FilterDropdown } from '../design-system/FilterDropdown';
import { CardIncidente } from '../design-system/CardIncidente';
import { MapLeaflet } from '../MapLeaflet';
import { Logo } from '../Logo';
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LabelList,
} from 'recharts';
import { getIncidencias, initializeSampleData, type Incidencia } from '../../utils/api';

interface SalaDashboardProps {
  onNewIncident: () => void;
  onViewIncident: (id: string) => void;
}

const TEXT = '#111827';
const MUTED = '#6B7280';

export function SalaDashboard({ onNewIncident, onViewIncident }: SalaDashboardProps) {
  const searchId = useId();

  const [filterTipo, setFilterTipo] = useState<string>('all');
  const [filterPrioridad, setFilterPrioridad] = useState<string>('all');
  const [filterEstado, setFilterEstado] = useState<string>('all');
  const [sortOrder, setSortOrder] = useState<string>('recientes');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [incidencias, setIncidencias] = useState<Incidencia[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadIncidencias();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadIncidencias = async () => {
    setLoading(true);
    try {
      let data = await getIncidencias();
      if (data.length === 0) {
        await initializeSampleData();
        data = await getIncidencias();
      }
      setIncidencias(data);
    } catch (error) {
      console.error('Error loading incidencias:', error);
    } finally {
      setLoading(false);
    }
  };

  const getFilteredAndSortedIncidents = () => {
    let filtered = incidencias;

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().replace('#', '').trim();
      filtered = filtered.filter((inc) => {
        const idWithoutHash = inc.id.toLowerCase().replace('#', '').replace('inc-', '');
        const address = inc.direccion.toLowerCase();
        return idWithoutHash.includes(query) || address.includes(query);
      });
    }

    if (filterTipo !== 'all') filtered = filtered.filter((inc) => inc.tipo === filterTipo);
    if (filterPrioridad !== 'all') filtered = filtered.filter((inc) => inc.prioridad === filterPrioridad);

    if (filterEstado !== 'all') {
      const estadoMap: Record<string, 'Nueva' | 'En curso' | 'Asignada'> = {
        nueva: 'Nueva',
        'en-curso': 'En curso',
        asignada: 'Asignada',
      };
      filtered = filtered.filter((inc) => inc.estado === estadoMap[filterEstado]);
    }

    const sorted = [...filtered].sort((a, b) => {
      const timeA = new Date(a.createdAt).getTime();
      const timeB = new Date(b.createdAt).getTime();
      return sortOrder === 'recientes' ? timeB - timeA : timeA - timeB;
    });

    return sorted;
  };

  const filteredIncidents = getFilteredAndSortedIncidents();

  const getPriorityData = () => {
    const counts: Record<'P1' | 'P2' | 'P3', number> = { P1: 0, P2: 0, P3: 0 };
    filteredIncidents.forEach((inc) => {
      counts[inc.prioridad]++;
    });
    return [
      { name: 'Crítica (P1)', value: counts.P1, color: '#EF4444' },
      { name: 'Alta (P2)', value: counts.P2, color: '#F59E0B' },
      { name: 'Normal (P3)', value: counts.P3, color: '#10B981' },
    ];
  };

  const getStatusData = () => {
    const counts: Record<'Nueva' | 'En curso' | 'Asignada', number> = { Nueva: 0, 'En curso': 0, Asignada: 0 };
    filteredIncidents.forEach((inc) => {
      if (counts[inc.estado] !== undefined) counts[inc.estado]++;
    });
    return [
      { name: 'Nueva', value: counts.Nueva, fill: '#94A3B8' },
      { name: 'En curso', value: counts['En curso'], fill: '#3B82F6' },
      { name: 'Asignada', value: counts.Asignada, fill: '#F59E0B' },
    ];
  };

  const priorityData = getPriorityData();
  const statusData = getStatusData();

  const renderPieValueLabel = (entry: any) => (entry?.value > 0 ? `${entry.value}` : '');

  const mapIncidencias = filteredIncidents.map((inc) => ({
    id: inc.id,
    lat: inc.lat,
    lon: inc.lon,
    tipo: inc.tipo,
    prioridad: inc.prioridad,
    estado: inc.estado,
    direccion: inc.direccion,
  }));

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <header className="bg-white border-b border-[var(--border)] px-8 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-6">
          <div className="flex items-center gap-8">
            <Logo variant="full" imgStyle={{ height: 88, width: 'auto' }} />
            <form
              role="search"
              aria-label="Buscar incidencias"
              className="relative flex-1 max-w-md"
              onSubmit={(e) => e.preventDefault()}
            >
              <label htmlFor={searchId} className="sr-only">
                Buscar incidencias por ID o dirección
              </label>
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5"
                style={{ color: MUTED }}
                aria-hidden="true"
              />
              <input
                id={searchId}
                name="q"
                type="text"
                inputMode="search"
                autoComplete="off"
                placeholder="Buscar incidencias..."
                className="w-full pl-10 pr-4 py-2 rounded-[8px] border border-[var(--border)] focus:outline-none focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)] focus:ring-opacity-20 placeholder:text-[#6B7280]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </form>
          </div>

          <div className="flex items-center gap-3" aria-label="Filtros de incidencias">
            <FilterDropdown
              label="Tipo"
              options={[
                { value: 'fire', label: 'Incendio' },
                { value: 'rain', label: 'Inundación' },
                { value: 'snow', label: 'Nevada' },
              ]}
              value={filterTipo}
              onChange={setFilterTipo}
              defaultLabel="Todos"
            />
            <FilterDropdown
              label="Prioridad"
              options={[
                { value: 'P1', label: 'Crítica' },
                { value: 'P2', label: 'Alta' },
                { value: 'P3', label: 'Normal' },
              ]}
              value={filterPrioridad}
              onChange={setFilterPrioridad}
              defaultLabel="Todas"
            />
            <FilterDropdown
              label="Estado"
              options={[
                { value: 'nueva', label: 'Nueva' },
                { value: 'en-curso', label: 'En curso' },
                { value: 'asignada', label: 'Asignada' },
              ]}
              value={filterEstado}
              onChange={setFilterEstado}
              defaultLabel="Todos"
            />
            <FilterDropdown
              label="Ordenar"
              options={[
                { value: 'recientes', label: 'Más recientes' },
                { value: 'antiguas', label: 'Más antiguas' },
              ]}
              value={sortOrder}
              onChange={setSortOrder}
              defaultLabel="Más recientes"
            />
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-8" aria-label="Dashboard de incidencias">
        <h1 className="mb-8">Dashboard de incidencias</h1>

        <section className="grid md:grid-cols-2 gap-6 mb-8" aria-label="Gráficas de incidencias">
          <div className="bg-white p-6 rounded-[12px]" style={{ boxShadow: 'var(--shadow-card)' }}>
            <h2 className="mb-4 text-[18px] leading-[24px] font-medium">Incidencias por prioridad</h2>
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie
                  data={priorityData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={(d) => renderPieValueLabel(d)}
                  outerRadius={90}
                  dataKey="value"
                >
                  {priorityData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ color: TEXT }}
                  labelStyle={{ color: TEXT }}
                  itemStyle={{ color: TEXT }}
                />
                <Legend
                  wrapperStyle={{ color: TEXT }}
                  formatter={(value) => <span style={{ color: TEXT }}>{String(value)}</span>}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white p-6 rounded-[12px]" style={{ boxShadow: 'var(--shadow-card)' }}>
            <h2 className="mb-4 text-[18px] leading-[24px] font-medium">Incidencias por estado</h2>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={statusData}>
                <XAxis dataKey="name" tick={{ fill: TEXT, fontSize: 12 }} axisLine={{ stroke: '#E5E7EB' }} />
                <YAxis tick={{ fill: TEXT, fontSize: 12 }} axisLine={{ stroke: '#E5E7EB' }} />
                <Tooltip
                  contentStyle={{ color: TEXT }}
                  labelStyle={{ color: TEXT }}
                  itemStyle={{ color: TEXT }}
                />
                <Legend
                  wrapperStyle={{ color: TEXT }}
                  formatter={(value) => <span style={{ color: TEXT }}>{String(value)}</span>}
                />
                <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                  <LabelList dataKey="value" position="top" fill={TEXT} />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>

        <section className="bg-white p-6 rounded-[12px] mb-8" style={{ boxShadow: 'var(--shadow-card)' }} aria-label="Mapa de incidencias">
          <h2 className="mb-4 text-[18px] leading-[24px] font-medium">Mapa de incidencias</h2>
          {loading ? (
            <div className="flex items-center justify-center h-[400px]">
              <p style={{ color: MUTED }}>Cargando mapa...</p>
            </div>
          ) : (
            <MapLeaflet incidencias={mapIncidencias} height="400px" onIncidenciaClick={(id) => onViewIncident(id)} />
          )}
        </section>

        <section aria-label="Panel de incidencias">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2>Panel de incidencias</h2>
              <p className="caption mt-1" style={{ color: MUTED }}>
                Mostrando {filteredIncidents.length} de {incidencias.length} incidencias
              </p>
            </div>
            <Button variant="primary" onClick={onNewIncident}>
              <div className="flex items-center gap-2">
                <Plus className="w-5 h-5" aria-hidden="true" />
                <span>Nueva incidencia</span>
              </div>
            </Button>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <p style={{ color: MUTED }}>Cargando incidencias...</p>
            </div>
          ) : filteredIncidents.length === 0 ? (
            <div className="text-center py-12">
              <p style={{ color: MUTED }}>No hay incidencias que coincidan con los filtros</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredIncidents.map((inc) => (
                <CardIncidente
                  key={inc.id}
                  id={inc.id}
                  type={inc.tipo}
                  address={inc.direccion}
                  priority={inc.prioridad}
                  status={inc.estado.toLowerCase().replace(' ', '-') as 'nueva' | 'en-curso' | 'asignada'}
                  onAction={() => onViewIncident(inc.id)}
                />
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
