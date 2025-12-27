import type { CSSProperties } from "react";

interface LogoProps {
  variant?: "full" | "icon";
  onClick?: () => void;
  className?: string;
  imgClassName?: string;
  imgStyle?: CSSProperties;
}

export function Logo({
  variant = "full",
  onClick,
  className = "",
  imgClassName = "",
  imgStyle,
}: LogoProps) {
  const handleClick = () => {
    if (onClick) onClick();
    else window.location.assign(import.meta.env.BASE_URL);
  };

  const base = import.meta.env.BASE_URL;
  const src =
    variant === "icon"
      ? `${base}assets/logo-sin-texto.png`
      : `${base}assets/logo-con-texto.png`;

  const defaultImgStyle: CSSProperties =
    variant === "icon"
      ? { height: 40, width: 40, objectFit: "contain" }
      : { height: 44, width: "auto", objectFit: "contain" };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={[
        "inline-flex items-center justify-center",
        "rounded-[8px]",
        "hover:opacity-90 transition-opacity",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2",
        className,
      ].join(" ")}
      aria-label="CCEU - Coordinación de emergencias"
    >
      <img
        src={src}
        alt="CCEU - Coordinación de emergencias"
        className={["object-contain", imgClassName].join(" ")}
        style={{ ...defaultImgStyle, ...(imgStyle ?? {}) }}
        draggable={false}
      />
    </button>
  );
}
