// FILE: src/components/screens/InicioAcceso.tsx
import { useState } from 'react';
import { Users, Radio, Phone } from 'lucide-react';
import { Button } from '../design-system/Button';
import { AuthModal } from './AuthModal';
import { Logo } from '../Logo';

interface InicioAccesoProps {
  onSelectSala: () => void;
  onSelectCampo: () => void;
  onAuthSuccess: (email: string, role: 'sala' | 'campo') => void;
}

export function InicioAcceso({ onSelectSala, onSelectCampo, onAuthSuccess }: InicioAccesoProps) {
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState<'sala' | 'campo'>('sala');

  const handleOpenAuth = (role: 'sala' | 'campo') => {
    setSelectedRole(role);
    setAuthModalOpen(true);
  };

  const handleAuthSuccess = (email: string, role: 'sala' | 'campo') => {
    setAuthModalOpen(false);
    onAuthSuccess(email, role);
  };

  return (
    <div className="min-h-screen bg-[var(--background)] flex items-center justify-center p-8">
      <div className="max-w-4xl w-full">
        {/* Landmark: Header */}
        <header className="text-center mb-12">
          {/* H1 (para WAVE) */}
          <h1 className="sr-only">CCEU - Coordinación de emergencias</h1>

          <div className="mb-4 flex flex-col items-center gap-4">
            {/* SOLO AQUÍ: LOGO GRANDE */}
            <Logo
              variant="full"
              className="mx-auto"
              imgStyle={{ height: 'clamp(96px, 12vw, 240px)', width: 'auto' }}
            />
            <p className="text-[var(--muted)]">Coordinación de emergencias</p>
          </div>
        </header>

        {/* Landmark: Main */}
        <main aria-label="Opciones de acceso">
          {/* Role Cards */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <section
              className="bg-white p-8 rounded-[12px] flex flex-col items-center gap-6"
              style={{ boxShadow: 'var(--shadow-card)' }}
              aria-label="Acceso como Jefe/a de sala"
            >
              <div className="w-20 h-20 bg-[#EFF6FF] rounded-full flex items-center justify-center" aria-hidden="true">
                <Users className="w-10 h-10 text-[var(--primary)]" aria-hidden="true" />
              </div>
              <div className="text-center">
                <h2 className="mb-2">Acceder como Jefe/a de sala</h2>
                <p className="caption text-[var(--muted)]">Dashboard y despacho de recursos</p>
              </div>
              <Button variant="primary" fullWidth onClick={() => handleOpenAuth('sala')}>
                Acceder
              </Button>
            </section>

            <section
              className="bg-white p-8 rounded-[12px] flex flex-col items-center gap-6"
              style={{ boxShadow: 'var(--shadow-card)' }}
              aria-label="Acceso como Jefe/a de campo"
            >
              <div className="w-20 h-20 bg-[#F0FDF4] rounded-full flex items-center justify-center" aria-hidden="true">
                <Radio className="w-10 h-10 text-[var(--success)]" aria-hidden="true" />
              </div>
              <div className="text-center">
                <h2 className="mb-2">Acceder como Jefe/a de campo</h2>
                <p className="caption text-[var(--muted)]">Misión, navegación y evidencias</p>
              </div>
              <Button variant="secondary" fullWidth onClick={() => handleOpenAuth('campo')}>
                Acceder
              </Button>
            </section>
          </div>

          <p className="caption text-[var(--muted)] text-center">
            Inicia sesión con tu cuenta CCEU para acceder
          </p>
        </main>
      </div>

      {/* Emergency Call Button */}
      <a
        href="tel:112"
        className="fixed bottom-6 right-6 bg-[var(--error)] text-white px-6 py-3 rounded-full flex items-center gap-2 hover:bg-[#dc2626] transition-colors z-40 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2"
        style={{ boxShadow: '0 4px 12px rgba(239, 68, 68, 0.4)', minHeight: '44px', minWidth: '44px' }}
        aria-label="Llamar 112"
      >
        <Phone className="w-5 h-5" aria-hidden="true" />
        <span>Llamar 112</span>
      </a>

      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        roleType={selectedRole}
        onSuccess={handleAuthSuccess}
      />
    </div>
  );
}
