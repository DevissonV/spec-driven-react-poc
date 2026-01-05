/**
 * Props del componente Alert
 */
type Props = {
  /** Tono visual de la alerta */
  tone: "info" | "error" | "success";
  /** Título opcional */
  title?: string;
  /** Mensaje de la alerta */
  message: string;
};

/**
 * Componente para mostrar mensajes de feedback al usuario
 * @param props - Propiedades de la alerta
 * @see docs/specs/features/users/error-handling.spec.md - RFC-ERR-001
 */
export function Alert({ tone, title, message }: Props) {
  const className = tone === "error" ? "error-bar" : tone === "success" ? "success-bar" : "notice-bar";
  return (
    <div className={className} role={tone === "error" ? "alert" : "status"}>
      {title && <strong style={{ display: "block", marginBottom: 4 }}>{title}</strong>}
      <span>{message}</span>
    </div>
  );
}
