import { Button } from "../../../shared/components/Button";
import { SortBy, SortDirection } from "../../../shared/utils/sorters";

type Props = {
  search: string;
  sortBy: SortBy;
  sortDirection: SortDirection;
  onSearch: (value: string) => void;
  onSortChange: (value: SortBy) => void;
  onToggleDirection: () => void;
};

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
