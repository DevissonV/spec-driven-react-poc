import React from "react";

type Props = {
  label: string;
  name: string;
  value: string;
  placeholder?: string;
  type?: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  error?: string;
  disabled?: boolean;
};

export function InputField({
  label,
  name,
  value,
  placeholder,
  type = "text",
  onChange,
  onBlur,
  error,
  disabled
}: Props) {
  const inputId = `input-${name}`;
  return (
    <label htmlFor={inputId} style={{ display: "block", marginBottom: 12 }}>
      <div style={{ color: "#cbd5f5", fontSize: 13, marginBottom: 6 }}>{label}</div>
      <input
        id={inputId}
        name={name}
        type={type}
        value={value}
        placeholder={placeholder}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${inputId}-error` : undefined}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        disabled={disabled}
        style={{
          width: "100%",
          padding: "12px 14px",
          borderRadius: 12,
          border: `1px solid ${error ? "rgba(239,68,68,0.6)" : "rgba(148,163,184,0.25)"}`,
          background: "rgba(255,255,255,0.02)",
          color: "#e2e8f0",
          outline: "none",
          boxShadow: error ? "0 0 0 2px rgba(239,68,68,0.12)" : "0 12px 30px rgba(0,0,0,0.28)",
          transition: "border-color 120ms ease, box-shadow 120ms ease",
          letterSpacing: "0.01em"
        }}
      />
      {error && (
        <div
          id={`${inputId}-error`}
          style={{ color: "#fecdd3", fontSize: 12, marginTop: 6 }}
        >
          {error}
        </div>
      )}
    </label>
  );
}
