import { Button } from "../../../shared/components/Button";

/**
 * Props del componente EmptyState
 */
type Props = {
  /** Callback al hacer click en crear */
  onCreate: () => void;
};

/**
 * Estado vacío cuando no hay usuarios
 * @param props - Propiedades del componente
 * @see docs/specs/features/users/ui.spec.md - RFC-UI-006
 */
export function EmptyState({ onCreate }: Props) {
  return (
    <div className="card empty">
      <p style={{ margin: "0 0 10px" }}>No hay usuarios aún.</p>
      <Button onClick={onCreate}>Crear usuario</Button>
    </div>
  );
}
