import { useId } from "react";

type InputState = "default" | "error" | "success";

interface InputTextProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
  errorMessage?: string;
  error?: string;
  state?: InputState;
  fullWidth?: boolean;
}

export function InputText({
  label,
  helperText,
  errorMessage,
  error,
  state = "default",
  fullWidth = true,
  className = "",
  id,
  ...props
}: InputTextProps) {
  const autoId = useId();
  const inputId = id ?? `input-${autoId}`;

  const displayError = error || errorMessage;
  const computedState: InputState = displayError ? "error" : state;

  const hintId = `${inputId}-hint`;
  const errId = `${inputId}-err`;

  const describedBy = [
    helperText && !displayError ? hintId : null,
    displayError ? errId : null,
  ]
    .filter(Boolean)
    .join(" ")
    .trim();

  const stateStyles: Record<InputState, string> = {
    default:
      "border-[var(--border)] focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)] focus:ring-opacity-20",
    error:
      "border-[var(--error)] focus:border-[var(--error)] focus:ring-2 focus:ring-[var(--error)] focus:ring-opacity-20",
    success:
      "border-[var(--success)] focus:border-[var(--success)] focus:ring-2 focus:ring-[var(--success)] focus:ring-opacity-20",
  };

  return (
    <div className={`flex flex-col gap-2 ${fullWidth ? "w-full" : ""}`}>
      {label && (
        <label htmlFor={inputId} className="caption text-[var(--text)]">
          {label}
        </label>
      )}

      <input
        id={inputId}
        className={[
          "min-h-[44px] px-4 py-2 rounded-[8px] border-2 bg-white transition-all outline-none",
          "placeholder:text-[#4B5563] placeholder:opacity-100",
          stateStyles[computedState],
          className,
        ].join(" ")}
        aria-invalid={!!displayError}
        aria-describedby={describedBy || undefined}
        {...props}
      />

      {helperText && !displayError && (
        <span id={hintId} className="caption text-[var(--muted)]">
          {helperText}
        </span>
      )}

      {displayError && (
        <span id={errId} className="caption text-[var(--error)]">
          {displayError}
        </span>
      )}
    </div>
  );
}
