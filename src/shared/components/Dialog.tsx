import { Button } from "./Button";

/**
 * Props del componente Dialog
 */
type Props = {
  /** Si el diálogo está visible */
  open: boolean;
  /** Título del diálogo */
  title: string;
  /** Descripción opcional */
  description?: string;
  /** Texto del botón de confirmación */
  confirmLabel?: string;
  /** Texto del botón de cancelación */
  cancelLabel?: string;
  /** Tono visual del diálogo */
  tone?: "danger" | "neutral";
  /** Callback al confirmar */
  onConfirm: () => void;
  /** Callback al cerrar */
  onClose: () => void;
};

/**
 * Diálogo modal para confirmaciones
 * @param props - Propiedades del diálogo
 * @see docs/specs/features/users/feature-users.spec.md - RFC-USR-003
 */
export function Dialog({
  open,
  title,
  description,
  confirmLabel = "Confirmar",
  cancelLabel = "Cancelar",
  tone = "neutral",
  onConfirm,
  onClose
}: Props) {
  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(5, 8, 20, 0.55)",
        backdropFilter: "blur(6px)",
        display: "grid",
        placeItems: "center",
        zIndex: 20
      }}
    >
      <div
        className="card"
        style={{
          width: 380,
          maxWidth: "90vw",
          borderColor: tone === "danger" ? "rgba(239,68,68,0.35)" : undefined
        }}
      >
        <h3 style={{ margin: "0 0 6px" }}>{title}</h3>
        {description && (
          <p style={{ margin: "0 0 14px", color: "#cbd5f5", lineHeight: 1.6 }}>
            {description}
          </p>
        )}
        <div style={{ display: "flex", justifyContent: "flex-end", gap: 10 }}>
          <Button variant="ghost" onClick={onClose}>
            {cancelLabel}
          </Button>
          <Button variant={tone === "danger" ? "danger" : "primary"} onClick={onConfirm}>
            {confirmLabel}
          </Button>
        </div>
      </div>
    </div>
  );
}
