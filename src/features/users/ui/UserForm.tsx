import { useEffect, useState } from "react";
import { Button } from "../../../shared/components/Button";
import { InputField } from "../../../shared/components/InputField";
import { FormMode, User, ValidationErrors } from "../types";

/**
 * Props del componente UserForm
 */
type Props = {
  /** Modo del formulario (crear o editar) */
  mode: FormMode;
  /** Errores de validación */
  validationErrors: ValidationErrors;
  /** Callback al enviar el formulario */
  onSubmit: (user: User) => void;
  /** Callback al cancelar la edición */
  onCancelEdit: () => void;
  /** Si el formulario está deshabilitado */
  disabled?: boolean;
  /** Usuario precargado para edición */
  preset?: User;
};

const EMPTY: User = { document: "", firstName: "", lastName: "", email: "" };

/**
 * Formulario para crear o editar usuarios
 * @param props - Propiedades del formulario
 * @see docs/specs/features/users/ui.spec.md - RFC-UI-004
 * @see docs/specs/features/users/validation.spec.md
 */
export function UserForm({
  mode,
  validationErrors,
  onSubmit,
  onCancelEdit,
  disabled,
  preset
}: Props) {
  const [form, setForm] = useState<User>(EMPTY);

  useEffect(() => {
    if (mode === "edit" && preset) {
      setForm(preset);
    } else {
      setForm(EMPTY);
    }
  }, [mode, preset]);

  return (
    <div className="card">
      <h2 className="section-title">
        {mode === "edit" ? "Editar usuario" : "Crear usuario"}
      </h2>
      <p className="helper-text">
        Todos los campos son obligatorios. El documento debe ser único en el sistema.
      </p>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          onSubmit(form);
        }}
      >
        <InputField
          label="Documento"
          name="document"
          value={form.document}
          placeholder="CC12345"
          onChange={(value) => setForm((prev) => ({ ...prev, document: value }))}
          error={validationErrors.document}
          disabled={disabled}
        />
        <InputField
          label="Nombre"
          name="firstName"
          value={form.firstName}
          placeholder="Ana"
          onChange={(value) => setForm((prev) => ({ ...prev, firstName: value }))}
          error={validationErrors.firstName}
          disabled={disabled}
        />
        <InputField
          label="Apellido"
          name="lastName"
          value={form.lastName}
          placeholder="García"
          onChange={(value) => setForm((prev) => ({ ...prev, lastName: value }))}
          error={validationErrors.lastName}
          disabled={disabled}
        />
        <InputField
          label="Correo"
          name="email"
          type="email"
          value={form.email}
          placeholder="ana@example.com"
          onChange={(value) => setForm((prev) => ({ ...prev, email: value }))}
          error={validationErrors.email}
          disabled={disabled}
        />
        <div style={{ display: "flex", gap: 10, marginTop: 6 }}>
          <Button type="submit" disabled={disabled}>
            {mode === "edit" ? "Guardar cambios" : "Crear usuario"}
          </Button>
          {mode === "edit" && (
            <Button type="button" variant="ghost" onClick={onCancelEdit} disabled={disabled}>
              Cancelar
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}
