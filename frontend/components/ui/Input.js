/*
 * components/ui/Input.js
 * ─────────────────────────────────────────────────────────────────────────────
 * Reusable controlled form input with label, error message, and icon support.
 *
 * USAGE:
 *   <Input
 *     label="Email Address"
 *     type="email"
 *     value={email}
 *     onChange={(e) => setEmail(e.target.value)}
 *     error={errors.email}
 *     placeholder="you@example.com"
 *     icon={<Mail className="w-4 h-4" />}
 *   />
 * ─────────────────────────────────────────────────────────────────────────────
 */

export default function Input({
  label,
  type = "text",
  value,
  onChange,
  placeholder = "",
  error = "",
  icon = null,
  id,
  name,
  required = false,
  disabled = false,
  className = "",
  hint = "",
  ...rest
}) {
  const inputId = id || name || label?.toLowerCase().replace(/\s+/g, "_");

  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      {/* Label */}
      {label && (
        <label
          htmlFor={inputId}
          className="text-sm font-medium text-slate-700"
        >
          {label}
          {required && <span className="text-red-500 ml-0.5">*</span>}
        </label>
      )}

      {/* Input wrapper (handles icon positioning) */}
      <div className="relative">
        {/* Leading icon */}
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
            {icon}
          </div>
        )}

        <input
          id={inputId}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          className={[
            "w-full rounded-lg border text-sm text-slate-900",
            "py-2.5 transition-colors duration-150",
            "focus:outline-none focus:ring-2 focus:ring-offset-0",
            "disabled:bg-slate-50 disabled:text-slate-400 disabled:cursor-not-allowed",
            "placeholder:text-slate-400",
            icon ? "pl-10 pr-4" : "px-4",
            error
              ? "border-red-400 focus:border-red-400 focus:ring-red-200 bg-red-50"
              : "border-slate-300 focus:border-emerald-500 focus:ring-emerald-100 bg-white",
          ]
            .filter(Boolean)
            .join(" ")}
          {...rest}
        />
      </div>

      {/* Error message */}
      {error && (
        <p className="text-xs text-red-600 flex items-center gap-1">
          <span>⚠</span> {error}
        </p>
      )}

      {/* Hint text */}
      {hint && !error && (
        <p className="text-xs text-slate-400">{hint}</p>
      )}
    </div>
  );
}
