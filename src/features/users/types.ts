export type User = {
  document: string;
  firstName: string;
  lastName: string;
  email: string;
};

export type FormMode = "create" | "edit";

export type UsersStateStatus = "idle" | "loading" | "creating" | "editing" | "saving" | "deleting" | "error";

export type ValidationErrors = Partial<Record<keyof User, string>>;
