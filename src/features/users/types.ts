export type { User } from "../../shared/types";

/**
 * Modo del formulario de usuario
 */
export type FormMode = "create" | "edit";

/**
 * Estados posibles del sistema de usuarios
 * @see docs/specs/features/users/state.spec.md
 */
export type UsersStateStatus = "idle" | "loading" | "creating" | "editing" | "saving" | "deleting" | "error";

/**
 * Errores de validación por campo de usuario
 * @see docs/specs/features/users/validation.spec.md
 */
export type ValidationErrors = Partial<Record<keyof User, string>>;
