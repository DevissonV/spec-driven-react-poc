# Copilot Instructions for POC Usuarios

## Project Overview
This is a **React + TypeScript + Vite** client-side CRUD application for user management with **LocalStorage** persistence (no backend). The project follows a **specification-driven architecture** where `docs/specs/` contains the single source of truth for all requirements, validation rules, and acceptance criteria.

## Architecture & Module Structure

### Feature-Based Organization
```
src/
  features/users/   # User management feature (CRUD, search, sort)
    index.ts        # Public API exports only
    ui/            # React components (UsersPage, UserForm, UserTable)
    state/         # Controller hook (useUsersController)
    storage/       # LocalStorage adapter (UsersStorageAdapter)
    validation/    # Business validators (UserValidator)
  shared/          # Reusable utilities, components, types
  app/             # Bootstrap and composition
```

### Critical Import Rules (from [project-structure.spec.md](../docs/specs/_KIT/project-structure.spec.md))
- **Features cannot import from each other** (only from `shared`)
- **Shared cannot import from features** (unidirectional flow)
- All external usage of a feature must go through `src/features/<feature>/index.ts`
- No direct imports to internal paths of another feature
- Import direction: `app → features → shared`

### Naming Conventions
- UI components: `*Page.tsx`, `*Form.tsx`, `*View.tsx`
- Storage adapters: `*StorageAdapter.ts`
- Validators: `*Validator.ts`
- Controllers: `use*Controller.ts` (React hooks)

## Specification System (Spec Kit)

### The "One Spec" Model
All requirements derive from `docs/specs/_ONE_SPEC/ONE_SPEC.md` which defines:
- Domain language (User, document, events like `USER_CREATED`, `PERSIST_FAILED`)
- Non-negotiable principles (uniqueness, LocalStorage as single source of truth)
- Scope boundaries (no backend, no multi-tab sync, no pagination)

### Feature Specs (Mandatory Reference)
When implementing user features, **always consult**:
- **[feature-users.spec.md](../docs/specs/features/users/feature-users.spec.md)** - CRUD requirements (RFC-USR-001 to RFC-USR-007)
- **[validation.spec.md](../docs/specs/features/users/validation.spec.md)** - Field constraints (document: 5-20 chars, email format)
- **[state.spec.md](../docs/specs/features/users/state.spec.md)** - State machine (idle → loading → saving → error)
- **[data-storage.spec.md](../docs/specs/features/users/data-storage.spec.md)** - Storage schema `{ schemaVersion: 1, users: User[] }`
- **[error-handling.spec.md](../docs/specs/features/users/error-handling.spec.md)** - Error recovery patterns

## Key Patterns & Decisions

### State Management
- **Central controller**: `useUsersController()` hook manages all CRUD operations, search/sort, validation
- **View model pattern**: Exposes `UsersViewModel` with computed `filtered` list
- **Status states**: `loading | idle | saving | deleting | error` (buttons disabled during operations)
- **Validation**: Always call `validateUser()` before persist; display errors per-field

### Data Persistence
- **Storage key**: `poc_users_v1` (versioned)
- **Schema**: `{ schemaVersion: 1, users: User[] }`
- **Corruption handling**: If schema version incompatible or JSON corrupted → reset to empty + show notice
- **No auto-retry**: Local operations only; failed persists go to error state with manual retry option

### Uniqueness & Editing
- **Document is unique identifier**: Check uniqueness on create/edit (exclude self when editing)
- **Edit document strategy**: When editing `document` field, create new entry with new ID, copy data, remove old entry, persist atomically

### Search & Sort
- **Search**: Case-insensitive partial match on `document | firstName | lastName | email`
- **Sort**: By `document` or `name` (computed as `firstName + lastName`), toggle asc/desc
- **Filter first, then sort**: Apply to `vm.filtered` list

## Development Workflow

### Setup & Commands
```bash
npm install          # Install dependencies
npm run dev          # Start Vite dev server (localhost:5173)
npm run build        # Production build
npm run lint         # TypeScript check (no emit)
```

### Manual Testing Checklist
1. Clear LocalStorage key `poc_users_v1`
2. Run `npm run dev` and open http://localhost:5173
3. Follow scenarios in [acceptance.spec.md](../docs/specs/_KIT/acceptance.spec.md):
   - Create user → see in list + success feedback
   - Edit user → changes reflected
   - Duplicate document → validation error
   - Delete → confirmation dialog → removed
   - Search → filter by lastname fragment
   - Sort → toggle by name/document asc/desc
   - Corrupt storage → reset + warning notice

### Debugging Storage Issues
- **Inspect**: Open DevTools → Application → Local Storage → `poc_users_v1`
- **Force reset**: Delete key manually or corrupt JSON to trigger recovery
- **Version mismatch**: Change `schemaVersion` to test migration/fallback

## Error Messages (Spanish)
All user-facing validation errors and feedback must be in **Spanish**:
- `"El documento debe tener entre 5 y 20 caracteres alfanuméricos"`
- `"Ya existe un usuario con ese documento"`
- `"El email no tiene un formato válido"`

## Non-Functional Requirements
- **Keyboard navigation**: Form fields tab-navigable, actions accessible
- **No perceived blocking**: List rendering <500 users should be instant
- **Accessible**: Labels associated, error messages readable, contrast compliant

## When Modifying Code
1. **Check specs first**: Read relevant `.spec.md` files in `docs/specs/features/users/`
2. **Update specs alongside code**: If behavior changes, update the corresponding spec
3. **Respect import boundaries**: Never import between features or from shared → features
4. **Add JSDoc to public APIs**: Functions/types exported in `index.ts` require documentation
5. **Test manually**: Run through acceptance scenarios before marking work complete

## Key Files to Reference
- **[ONE_SPEC.md](../docs/specs/_ONE_SPEC/ONE_SPEC.md)** - Domain model and principles
- **[useUsersController.ts](../src/features/users/state/useUsersController.ts)** - Central business logic
- **[UserValidator.ts](../src/features/users/validation/UserValidator.ts)** - Validation rules implementation
- **[UsersStorageAdapter.ts](../src/features/users/storage/UsersStorageAdapter.ts)** - Persistence layer
- **[types.ts](../src/shared/types.ts)** - Shared `User` type definition
