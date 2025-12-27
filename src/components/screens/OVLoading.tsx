import React from 'react';
import { Loader2 } from 'lucide-react';

export function OVLoading() {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-[12px] flex flex-col items-center gap-4" style={{ boxShadow: '0 20px 25px -5px rgba(0,0,0,0.2)' }}>
        <Loader2 className="w-12 h-12 text-[var(--primary)] animate-spin" />
        <p className="text-[var(--text)]">Cargando…</p>
      </div>
    </div>
  );
}
