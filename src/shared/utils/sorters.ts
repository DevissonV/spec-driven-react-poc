import { User } from "../types";

/**
 * Criterio de ordenamiento
 */
export type SortBy = "document" | "name";

/**
 * Dirección del ordenamiento
 */
export type SortDirection = "asc" | "desc";

/**
 * Ordena una lista de usuarios
 * @param users - Lista de usuarios a ordenar
 * @param sortBy - Criterio de ordenamiento (document o name)
 * @param direction - Dirección del ordenamiento (asc o desc)
 * @returns Lista ordenada de usuarios
 * @see docs/specs/features/users/feature-users.spec.md - RFC-USR-006
 */
export function sortUsers(users: User[], sortBy: SortBy, direction: SortDirection): User[] {
  const sorted = [...users].sort((a, b) => {
    const aValue = sortBy === "document" ? a.document : `${a.firstName} ${a.lastName}`;
    const bValue = sortBy === "document" ? b.document : `${b.firstName} ${b.lastName}`;
    return aValue.localeCompare(bValue, "es", { sensitivity: "base" });
  });
  return direction === "desc" ? sorted.reverse() : sorted;
}

/**
 * Filtra usuarios por búsqueda de texto
 * @param users - Lista de usuarios a filtrar
 * @param query - Texto de búsqueda (busca en document, firstName, lastName, email)
 * @returns Lista filtrada de usuarios
 * @see docs/specs/features/users/feature-users.spec.md - RFC-USR-005
 */
export function filterUsers(users: User[], query: string): User[] {
  if (!query.trim()) return users;
  const lowered = query.trim().toLowerCase();
  return users.filter((user) => {
    return (
      user.document.toLowerCase().includes(lowered) ||
      user.firstName.toLowerCase().includes(lowered) ||
      user.lastName.toLowerCase().includes(lowered) ||
      user.email.toLowerCase().includes(lowered)
    );
  });
}
