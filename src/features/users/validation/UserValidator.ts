import { User, ValidationErrors } from "../types";

const DOC_REGEX = /^[A-Za-z0-9]{5,20}$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export type ValidationResult = {
  ok: boolean;
  errors: ValidationErrors;
};

export function validateUser(
  input: User,
  existing: User[],
  options?: { editingOriginalId?: string }
): ValidationResult {
  const errors: ValidationErrors = {};

  if (!input.document.trim()) {
    errors.document = "El documento es obligatorio";
  } else if (input.document.length < 5 || input.document.length > 20) {
    errors.document = "El documento debe tener entre 5 y 20 caracteres";
  } else if (!DOC_REGEX.test(input.document)) {
    errors.document = "El documento debe ser alfanumérico sin espacios";
  }

  if (!input.firstName.trim()) {
    errors.firstName = "El nombre es obligatorio";
  } else if (input.firstName.length < 2 || input.firstName.length > 50) {
    errors.firstName = "El nombre debe tener entre 2 y 50 caracteres";
  }

  if (!input.lastName.trim()) {
    errors.lastName = "El apellido es obligatorio";
  } else if (input.lastName.length < 2 || input.lastName.length > 50) {
    errors.lastName = "El apellido debe tener entre 2 y 50 caracteres";
  }

  if (!input.email.trim()) {
    errors.email = "El correo es obligatorio";
  } else if (input.email.length < 5 || input.email.length > 100) {
    errors.email = "El correo debe tener entre 5 y 100 caracteres";
  } else if (!EMAIL_REGEX.test(input.email)) {
    errors.email = "El formato de correo no es válido";
  }

  const duplicate = existing.find(
    (user) => user.document === input.document && user.document !== options?.editingOriginalId
  );
  if (duplicate) {
    errors.document = "Ya existe un usuario con este documento";
  }

  return { ok: Object.keys(errors).length === 0, errors };
}
