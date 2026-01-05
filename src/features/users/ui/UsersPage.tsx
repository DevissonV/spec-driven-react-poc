import { useMemo } from "react";
import { Alert } from "../../../shared/components/Alert";
import { Button } from "../../../shared/components/Button";
import { Dialog } from "../../../shared/components/Dialog";
import { EmptyState } from "./EmptyState";
import { SearchAndSort } from "./SearchAndSort";
import { UserForm } from "./UserForm";
import { UserTable } from "./UserTable";
import { useUsersController } from "../state/useUsersController";
import { User } from "../types";

export function UsersPage() {
  const controller = useUsersController();
  const { vm } = controller;
  const hasUsers = vm.users.length > 0;

  const preset = useMemo<User | undefined>(() => {
    if (vm.formMode === "edit" && vm.editingId) {
      return vm.users.find((u) => u.document === vm.editingId);
    }
    return undefined;
  }, [vm.editingId, vm.formMode, vm.users]);

  const busy = vm.status === "saving" || vm.status === "deleting";

  return (
    <div className="app-shell">
      <header className="app-header">
        <div>
          <h1 className="app-title">Gestión de usuarios</h1>
          <p className="app-subtitle">CRUD en cliente con LocalStorage y validaciones estrictas.</p>
        </div>
        <div className="badge" aria-live="polite">
          Estado: {vm.status}
        </div>
      </header>

      {vm.feedback && (
        <Alert
          tone={vm.feedback.type === "error" ? "error" : vm.feedback.type === "success" ? "success" : "info"}
          message={vm.feedback.message}
        />
      )}

      <SearchAndSort
        search={vm.search}
        sortBy={vm.sort.by}
        sortDirection={vm.sort.direction}
        onSearch={controller.setSearch}
        onSortChange={controller.setSort}
        onToggleDirection={controller.toggleSortDirection}
      />

      <div className="grid">
        <UserForm
          mode={vm.formMode}
          validationErrors={vm.validationErrors}
          onSubmit={controller.submit}
          onCancelEdit={controller.cancelEdit}
          disabled={busy}
          preset={preset}
        />

        {!hasUsers ? (
          <EmptyState onCreate={() => controller.cancelEdit()} />
        ) : vm.filtered.length === 0 ? (
          <div className="card empty">Sin resultados para la búsqueda actual.</div>
        ) : (
          <UserTable
            users={vm.filtered}
            onEdit={(user) => controller.startEdit(user)}
            onDelete={(user) => controller.requestDelete(user)}
            disabled={busy}
          />
        )}
      </div>

      <Dialog
        open={Boolean(vm.selection)}
        title="Eliminar usuario"
        description={
          vm.selection ? `Vas a eliminar a ${vm.selection.firstName} ${vm.selection.lastName}. Esta acción no se puede deshacer.` :
          ""
        }
        confirmLabel="Eliminar"
        cancelLabel="Cancelar"
        tone="danger"
        onConfirm={controller.confirmDelete}
        onClose={controller.dismissDelete}
      />

      {vm.status === "error" && (
        <Button variant="secondary" onClick={controller.retryPersist} disabled={busy}>
          Reintentar persistencia
        </Button>
      )}
    </div>
  );
}
