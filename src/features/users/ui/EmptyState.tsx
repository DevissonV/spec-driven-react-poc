import { Button } from "../../../shared/components/Button";

type Props = {
  onCreate: () => void;
};

export function EmptyState({ onCreate }: Props) {
  return (
    <div className="card empty">
      <p style={{ margin: "0 0 10px" }}>No hay usuarios aún.</p>
      <Button onClick={onCreate}>Crear usuario</Button>
    </div>
  );
}
