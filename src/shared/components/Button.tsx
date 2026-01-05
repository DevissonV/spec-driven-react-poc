import React from "react";

export type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  block?: boolean;
};

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "background: linear-gradient(120deg, #8b5cf6, #6366f1); color: #0b1021; border: 1px solid #8b5cf6;",
  secondary:
    "background: rgba(148, 163, 184, 0.14); color: #e2e8f0; border: 1px solid rgba(148, 163, 184, 0.2);",
  ghost:
    "background: transparent; color: #cbd5f5; border: 1px solid rgba(148, 163, 184, 0.12);",
  danger:
    "background: rgba(239, 68, 68, 0.18); color: #fee2e2; border: 1px solid rgba(239, 68, 68, 0.45);"
};

export function Button({ variant = "primary", block, style, ...rest }: ButtonProps) {
  return (
    <button
      style={{
        padding: "10px 14px",
        borderRadius: 12,
        fontWeight: 600,
        letterSpacing: "0.01em",
        cursor: rest.disabled ? "not-allowed" : "pointer",
        opacity: rest.disabled ? 0.6 : 1,
        width: block ? "100%" : undefined,
        transition: "transform 120ms ease, box-shadow 120ms ease",
        boxShadow: rest.disabled ? "none" : "0 12px 30px rgba(124, 58, 237, 0.25)",
        ...style,
        ...parseStyle(variantStyles[variant])
      }}
      {...rest}
    />
  );
}

function parseStyle(styleString: string): React.CSSProperties {
  return styleString.split(";").reduce<React.CSSProperties>((acc, chunk) => {
    const [prop, value] = chunk.split(":");
    if (prop && value) {
      const key = prop.trim().replace(/-([a-z])/g, (_, c) => (c ? c.toUpperCase() : ""));
      acc[key as keyof React.CSSProperties] = value.trim();
    }
    return acc;
  }, {});
}
