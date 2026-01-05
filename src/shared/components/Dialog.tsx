import { Button } from "./Button";

type Props = {
  open: boolean;
  title: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  tone?: "danger" | "neutral";
  onConfirm: () => void;
  onClose: () => void;
};

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
