import { useEffect, useMemo, useState } from "react";
import { filterUsers, sortUsers } from "../../../shared/utils/sorters";
import { persistUsers, loadUsers } from "../storage/UsersStorageAdapter";
import { validateUser, ValidationResult } from "../validation/UserValidator";
import { FormMode, User, UsersStateStatus, ValidationErrors } from "../types";

export type UsersViewModel = {
  status: UsersStateStatus;
  users: User[];
  filtered: User[];
  formMode: FormMode;
  editingId?: string;
  feedback?: { type: "success" | "info" | "error"; message: string };
  validationErrors: ValidationErrors;
  search: string;
  sort: { by: "document" | "name"; direction: "asc" | "desc" };
  selection?: User;
};

type SubmitPayload = Omit<User, never>;

type Controller = {
  vm: UsersViewModel;
  submit: (payload: SubmitPayload) => void;
  startEdit: (user: User) => void;
  cancelEdit: () => void;
  requestDelete: (user: User) => void;
  confirmDelete: () => void;
  dismissDelete: () => void;
  setSearch: (query: string) => void;
  setSort: (by: "document" | "name") => void;
  toggleSortDirection: () => void;
  retryPersist: () => void;
};

export function useUsersController(): Controller {
  const [users, setUsers] = useState<User[]>([]);
  const [status, setStatus] = useState<UsersStateStatus>("loading");
  const [formMode, setFormMode] = useState<FormMode>("create");
  const [editingId, setEditingId] = useState<string | undefined>();
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({});
  const [feedback, setFeedback] = useState<UsersViewModel["feedback"]>();
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<{ by: "document" | "name"; direction: "asc" | "desc" }>(
    { by: "name", direction: "asc" }
  );
  const [pendingDelete, setPendingDelete] = useState<User | undefined>();

  useEffect(() => {
    const result = loadUsers();
    setUsers(result.users);
    setStatus("idle");
    if (result.notice) {
      setFeedback({ type: "info", message: result.notice });
    }
  }, []);

  const filtered = useMemo(() => {
    const base = filterUsers(users, search);
    return sortUsers(base, sort.by, sort.direction);
  }, [users, search, sort]);

  function startEdit(user: User) {
    setFormMode("edit");
    setEditingId(user.document);
    setFeedback(undefined);
    setValidationErrors({});
    setStatus("editing");
  }

  function cancelEdit() {
    setFormMode("create");
    setEditingId(undefined);
    setValidationErrors({});
    setFeedback(undefined);
    setStatus("idle");
  }

  function submit(payload: SubmitPayload) {
    const validation: ValidationResult = validateUser(payload, users, {
      editingOriginalId: editingId
    });
    if (!validation.ok) {
      setValidationErrors(validation.errors);
      setStatus(formMode === "edit" ? "editing" : "creating");
      return;
    }
    setValidationErrors({});
    setStatus(formMode === "edit" ? "editing" : "creating");
    const nextUsers = applyMutation(users, payload, formMode, editingId);
    setStatus("saving");
    const result = persistUsers(nextUsers);
    if (!result.ok) {
      setFeedback({ type: "error", message: `${result.error}. Reintenta manualmente.` });
      setUsers(nextUsers);
      setStatus("error");
      return;
    }
    setUsers(nextUsers);
    setStatus("idle");
    setFormMode("create");
    setEditingId(undefined);
    setFeedback({
      type: "success",
      message: formMode === "edit" ? "Usuario actualizado" : "Usuario creado"
    });
  }

  function requestDelete(user: User) {
    setPendingDelete(user);
    setStatus("deleting");
  }

  function confirmDelete() {
    if (!pendingDelete) return;
    const remaining = users.filter((u) => u.document !== pendingDelete.document);
    const result = persistUsers(remaining);
    if (!result.ok) {
      setFeedback({ type: "error", message: `${result.error}. Reintenta manualmente.` });
      setUsers(remaining);
      setStatus("error");
      setPendingDelete(undefined);
      return;
    }
    setUsers(remaining);
    setStatus("idle");
    setPendingDelete(undefined);
    setFeedback({ type: "success", message: "Usuario eliminado" });
    if (formMode === "edit" && editingId === pendingDelete.document) {
      cancelEdit();
    }
  }

  function toggleSortDirection() {
    setSort((prev) => ({ ...prev, direction: prev.direction === "asc" ? "desc" : "asc" }));
  }

  function dismissDelete() {
    setPendingDelete(undefined);
    setStatus("idle");
  }

  function retryPersist() {
    setStatus("saving");
    const result = persistUsers(users);
    if (!result.ok) {
      setFeedback({ type: "error", message: result.error });
      setStatus("error");
      return;
    }
    setFeedback({ type: "success", message: "Persistencia reintento exitoso" });
    setStatus("idle");
  }

  const vm: UsersViewModel = {
    status,
    users,
    filtered,
    formMode,
    editingId,
    feedback,
    validationErrors,
    search,
    sort,
    selection: pendingDelete
  };

  return {
    vm,
    submit,
    startEdit,
    cancelEdit,
    requestDelete,
    confirmDelete,
    dismissDelete,
    setSearch,
    setSort: (by) => setSort((prev) => ({ ...prev, by })),
    toggleSortDirection,
    retryPersist
  };
}

function applyMutation(
  users: User[],
  payload: User,
  formMode: FormMode,
  editingId?: string
): User[] {
  if (formMode === "edit" && editingId) {
    return users.map((user) => (user.document === editingId ? { ...payload } : user));
  }
  return [...users, payload];
}
