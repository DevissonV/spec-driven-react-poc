/**
 * Tipo de usuario del sistema
 * @see docs/specs/_ONE_SPEC/ONE_SPEC.md - Definiciones
 */
export type User = {
  /** Identificador único alfanumérico (5-20 caracteres) */
  document: string;
  /** Nombre del usuario (2-50 caracteres) */
  firstName: string;
  /** Apellido del usuario (2-50 caracteres) */
  lastName: string;
  /** Correo electrónico válido (5-100 caracteres) */
  email: string;
};
