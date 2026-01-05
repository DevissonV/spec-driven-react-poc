import { Button } from "../../../shared/components/Button";
import { User } from "../types";

type Props = {
  users: User[];
  onEdit: (user: User) => void;
  onDelete: (user: User) => void;
  disabled?: boolean;
};

export function UserTable({ users, onEdit, onDelete, disabled }: Props) {
  return (
    <div className="card" style={{ overflowX: "auto" }}>
      <h2 className="section-title">Usuarios</h2>
      <table className="table" aria-label="Tabla de usuarios">
        <thead>
          <tr>
            <th>Documento</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Correo</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.document}>
              <td>{user.document}</td>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.email}</td>
              <td>
                <div className="row-actions">
                  <Button variant="secondary" onClick={() => onEdit(user)} disabled={disabled}>
                    Editar
                  </Button>
                  <Button variant="danger" onClick={() => onDelete(user)} disabled={disabled}>
                    Eliminar
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
