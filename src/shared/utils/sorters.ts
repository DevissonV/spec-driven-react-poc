import { User } from "../../features/users/types";

export type SortBy = "document" | "name";
export type SortDirection = "asc" | "desc";

export function sortUsers(users: User[], sortBy: SortBy, direction: SortDirection): User[] {
  const sorted = [...users].sort((a, b) => {
    const aValue = sortBy === "document" ? a.document : `${a.firstName} ${a.lastName}`;
    const bValue = sortBy === "document" ? b.document : `${b.firstName} ${b.lastName}`;
    return aValue.localeCompare(bValue, "es", { sensitivity: "base" });
  });
  return direction === "desc" ? sorted.reverse() : sorted;
}

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
