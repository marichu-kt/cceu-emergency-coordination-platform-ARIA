// FILE: src/components/Logo.tsx
import type { CSSProperties } from 'react';

interface LogoProps {
  variant?: 'full' | 'icon';
  onClick?: () => void;
  className?: string;
  imgClassName?: string;

  /** Para controlar tamaño SOLO donde lo uses (ej. InicioAcceso) */
  imgStyle?: CSSProperties;
}

export function Logo({
  variant = 'full',
  onClick,
  className = '',
  imgClassName = '',
  imgStyle,
}: LogoProps) {
  const handleClick = () => {
    if (onClick) onClick();
    else window.location.assign('/');
  };

  const src = variant === 'icon' ? '/assets/logo-sin-texto.png' : '/assets/logo-con-texto.png';

  // TAMAÑO POR DEFECTO (pequeño) PARA EL RESTO DE PANTALLAS
  const defaultImgStyle: CSSProperties =
    variant === 'icon'
      ? { height: 40, width: 40, objectFit: 'contain' }
      : { height: 44, width: 'auto', objectFit: 'contain' };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={[
        'inline-flex items-center justify-center',
        'rounded-[8px]',
        'hover:opacity-90 transition-opacity',
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2',
        className,
      ].join(' ')}
      aria-label="CCEU - Coordinación de emergencias"
    >
      <img
        src={src}
        alt="CCEU - Coordinación de emergencias"
        className={['object-contain', imgClassName].join(' ')}
        style={{ ...defaultImgStyle, ...(imgStyle ?? {}) }}
        draggable={false}
      />
    </button>
  );
}
