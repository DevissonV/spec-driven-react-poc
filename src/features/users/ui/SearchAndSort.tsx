import { Button } from "../../../shared/components/Button";
import { SortBy, SortDirection } from "../../../shared/utils/sorters";

/**
 * Props del componente SearchAndSort
 */
type Props = {
  /** Texto de búsqueda actual */
  search: string;
  /** Criterio de ordenamiento actual */
  sortBy: SortBy;
  /** Dirección del ordenamiento */
  sortDirection: SortDirection;
  /** Callback al cambiar el texto de búsqueda */
  onSearch: (value: string) => void;
  /** Callback al cambiar el criterio de ordenamiento */
  onSortChange: (value: SortBy) => void;
  /** Callback al alternar la dirección */
  onToggleDirection: () => void;
};

/**
 * Controles de búsqueda y ordenamiento
 * @param props - Propiedades del componente
 * @see docs/specs/features/users/ui.spec.md - RFC-UI-002, RFC-UI-003
 * @see docs/specs/features/users/feature-users.spec.md - RFC-USR-005, RFC-USR-006
 */
export function SearchAndSort({
  search,
  sortBy,
  sortDirection,
  onSearch,
  onSortChange,
  onToggleDirection
}: Props) {
  return (
    <div className="card" style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
      <div style={{ flex: 1, minWidth: 240 }}>
        <label style={{ color: "#cbd5f5", fontSize: 13, display: "block", marginBottom: 6 }}>
          Buscar (documento, nombre, apellido, correo)
        </label>
        <input
          type="search"
          value={search}
          placeholder="Ej: garcia"
          onChange={(e) => onSearch(e.target.value)}
          style={{
            width: "100%",
            padding: "12px 14px",
            borderRadius: 12,
            border: "1px solid rgba(148,163,184,0.25)",
            background: "rgba(255,255,255,0.02)",
            color: "#e2e8f0",
            outline: "none"
          }}
        />
      </div>
      <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
        <div className="pill-group" role="group" aria-label="Ordenar por">
          <button
            className={`pill-button ${sortBy === "name" ? "active" : ""}`}
            type="button"
            onClick={() => onSortChange("name")}
          >
            Nombre
          </button>
          <button
            className={`pill-button ${sortBy === "document" ? "active" : ""}`}
            type="button"
            onClick={() => onSortChange("document")}
          >
            Documento
          </button>
        </div>
        <Button variant="ghost" onClick={onToggleDirection}>
          {sortDirection === "asc" ? "Asc" : "Desc"}
        </Button>
      </div>
    </div>
  );
}
