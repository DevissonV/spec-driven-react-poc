import { User } from "../types";

const STORAGE_KEY = "poc_users_v1";
const SCHEMA_VERSION = 1;

export type StoragePayload = {
  schemaVersion: number;
  users: User[];
};

type LoadResult = {
  users: User[];
  notice?: string;
  error?: string;
};

type PersistResult = { ok: true } | { ok: false; error: string };

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
