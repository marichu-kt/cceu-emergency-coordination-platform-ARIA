import React, { useState, useEffect } from 'react';
import { X, CheckCircle } from 'lucide-react';
import { Button } from '../design-system/Button';
import { InputText } from '../design-system/InputText';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  roleType: 'sala' | 'campo';
  onSuccess: (email: string, role: 'sala' | 'campo') => void;
}

export function AuthModal({ isOpen, onClose, roleType, onSuccess }: AuthModalProps) {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ email?: string; password?: string; general?: string }>({});
  const [successMessage, setSuccessMessage] = useState<string>('');
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (isOpen) {
      // Reset form when modal opens
      setEmail('');
      setPassword('');
      setErrors({});
      setMode('login');
      setSuccessMessage('');
      setShowSuccess(false);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      setErrors(prev => ({ ...prev, email: 'El email es obligatorio' }));
      return false;
    }
    if (!emailRegex.test(email)) {
      setErrors(prev => ({ ...prev, email: 'Formato de email inválido' }));
      return false;
    }
    
    const domain = email.split('@')[1];
    if (domain !== 'cceu.sala.es' && domain !== 'cceu.campo.es') {
      setErrors(prev => ({ ...prev, email: 'Solo se permiten cuentas @cceu.sala.es o @cceu.campo.es' }));
      return false;
    }
    
    // Check if email domain matches the selected role type
    const emailRole = domain === 'cceu.sala.es' ? 'sala' : 'campo';
    if (emailRole !== roleType) {
      const expectedDomain = roleType === 'sala' ? '@cceu.sala.es' : '@cceu.campo.es';
      setErrors(prev => ({ 
        ...prev, 
        email: `Para acceder como ${roleType === 'sala' ? 'Jefe/a de sala' : 'Jefe/a de campo'}, usa una cuenta ${expectedDomain}` 
      }));
      return false;
    }
    
    return true;
  };

  const validatePassword = (password: string): boolean => {
    if (!password) {
      setErrors(prev => ({ ...prev, password: 'La contraseña es obligatoria' }));
      return false;
    }
    if (password.length < 8) {
      setErrors(prev => ({ ...prev, password: 'La contraseña debe tener al menos 8 caracteres' }));
      return false;
    }
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);

    if (isEmailValid && isPasswordValid) {
      const domain = email.split('@')[1];
      const role = domain === 'cceu.sala.es' ? 'sala' : 'campo';
      
      // Set success message based on mode
      const message = mode === 'register' 
        ? 'Cuenta creada correctamente' 
        : 'Inicio de sesión correcto';
      
      setSuccessMessage(message);
      setShowSuccess(true);
      
      // Delay navigation: 1.5s for register, 1.2s for login
      const delay = mode === 'register' ? 1500 : 1200;
      
      setTimeout(() => {
        onSuccess(email, role);
      }, delay);
    }
  };

  const handleEmailChange = (value: string) => {
    setEmail(value);
    if (errors.email) {
      setErrors(prev => ({ ...prev, email: undefined }));
    }
  };

  const handlePasswordChange = (value: string) => {
    setPassword(value);
    if (errors.password) {
      setErrors(prev => ({ ...prev, password: undefined }));
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-[12px] max-w-md w-full p-8 relative"
        style={{ boxShadow: '0 8px 24px rgba(0,0,0,0.15)' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-[#f1f5f9] rounded-[8px] transition-colors"
          aria-label="Cerrar"
        >
          <X className="w-5 h-5 text-[var(--muted)]" />
        </button>

        {/* Header */}
        <div className="mb-6">
          <h2 className="mb-2">
            {mode === 'login' ? 'Iniciar sesión' : 'Crear cuenta'}
          </h2>
          <p className="caption text-[var(--muted)]">
            {roleType === 'sala' ? 'Jefe/a de sala' : 'Jefe/a de campo'}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Field */}
          <div>
            <label htmlFor="auth-email" className="block mb-2">
              Email
            </label>
            <InputText
              id="auth-email"
              type="email"
              value={email}
              onChange={(e) => handleEmailChange(e.target.value)}
              placeholder={`ejemplo@cceu.${roleType}.es`}
              state={errors.email ? 'error' : 'default'}
              autoComplete="email"
            />
            {errors.email && (
              <p className="caption text-[var(--error)] mt-2">{errors.email}</p>
            )}
          </div>

          {/* Password Field */}
          <div>
            <label htmlFor="auth-password" className="block mb-2">
              Contraseña
            </label>
            <InputText
              id="auth-password"
              type="password"
              value={password}
              onChange={(e) => handlePasswordChange(e.target.value)}
              placeholder="Mínimo 8 caracteres"
              state={errors.password ? 'error' : 'default'}
              autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
            />
            {errors.password && (
              <p className="caption text-[var(--error)] mt-2">{errors.password}</p>
            )}
          </div>

          {/* General Error */}
          {errors.general && (
            <div className="p-3 bg-[#FEF2F2] border border-[var(--error)] rounded-[8px]">
              <p className="caption text-[var(--error)]">{errors.general}</p>
            </div>
          )}

          {/* Success Message */}
          {showSuccess && (
            <div 
              className="p-4 bg-[#F0FDF4] border-2 border-[#16A34A] rounded-[8px] flex items-start gap-3"
              role="status"
              aria-live="polite"
            >
              <CheckCircle className="w-5 h-5 text-[#16A34A] flex-shrink-0 mt-0.5" />
              <p className="text-[#16A34A]">
                {successMessage}
              </p>
            </div>
          )}

          {/* Submit Button */}
          <Button type="submit" variant="primary" fullWidth>
            {mode === 'login' ? 'Iniciar sesión' : 'Registrarse'}
          </Button>

          {/* Toggle Mode */}
          <div className="text-center">
            <button
              type="button"
              onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
              className="caption text-[var(--primary)] hover:underline"
            >
              {mode === 'login' ? 'Crear cuenta' : 'Ya tengo cuenta'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}