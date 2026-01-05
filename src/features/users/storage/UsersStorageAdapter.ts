import { User } from "../types";

const STORAGE_KEY = "poc_users_v1";
const SCHEMA_VERSION = 1;

/**
 * Estructura del payload en LocalStorage
 * @see docs/specs/features/users/data-storage.spec.md - RFC-DS-003
 */
export type StoragePayload = {
  /** Versión del esquema de datos */
  schemaVersion: number;
  /** Lista de usuarios */
  users: User[];
};

/**
 * Resultado de la carga desde storage
 */
type LoadResult = {
  /** Usuarios cargados */
  users: User[];
  /** Aviso informativo si hubo recuperación */
  notice?: string;
  /** Error si la carga falló */
  error?: string;
};

/**
 * Resultado de la persistencia
 */
type PersistResult = { ok: true } | { ok: false; error: string };

/**
 * Carga usuarios desde LocalStorage con manejo de corrupción
 * @returns Resultado con usuarios y avisos si los hay
 * @see docs/specs/features/users/data-storage.spec.md - RFC-DS-001
 */
export function loadUsers(): LoadResult {
  const fallback: StoragePayload = { schemaVersion: SCHEMA_VERSION, users: [] };
  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    return { users: [], notice: "Estado inicial vacío" };
  }

  try {
    const parsed = JSON.parse(raw) as Partial<StoragePayload>;
    if (parsed.schemaVersion !== SCHEMA_VERSION || !Array.isArray(parsed.users)) {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(fallback));
      return { users: [], notice: "Datos reseteados por versión incompatible" };
    }
    const sanitizedUsers = parsed.users.filter(isUserShape);
    return { users: sanitizedUsers, notice: undefined };
  } catch (error) {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(fallback));
    return { users: [], notice: "Datos recuperados tras corrupción" };
  }
}

/**
 * Persiste la lista de usuarios en LocalStorage
 * @param users - Lista de usuarios a persistir
 * @returns Resultado de la operación
 * @see docs/specs/features/users/data-storage.spec.md - RFC-DS-002
 */
export function persistUsers(users: User[]): PersistResult {
  const payload: StoragePayload = {
    schemaVersion: SCHEMA_VERSION,
    users
  };
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    return { ok: true };
  } catch (error) {
    return { ok: false, error: "No se pudo guardar en almacenamiento" };
  }
}

/**
 * Resetea el storage a estado inicial vacío
 * @see docs/specs/features/users/data-storage.spec.md - RFC-DS-001
 */
export function resetStorage(): void {
  const payload: StoragePayload = { schemaVersion: SCHEMA_VERSION, users: [] };
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
}

function isUserShape(value: unknown): value is User {
  const candidate = value as User;
  return (
    !!candidate &&
    typeof candidate.document === "string" &&
    typeof candidate.firstName === "string" &&
    typeof candidate.lastName === "string" &&
    typeof candidate.email === "string"
  );
}
