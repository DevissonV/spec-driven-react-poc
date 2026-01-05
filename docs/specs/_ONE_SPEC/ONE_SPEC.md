# One Spec (Root Spec)

## Objetivo
- Definir propósito, límites y principios rectores para un POC de CRUD de Usuarios en React con persistencia en LocalStorage, sin backend.
- Alinear lenguaje de dominio y expectativas para todas las especificaciones derivadas (Spec Kit).

## Alcance / No alcance
- Alcance: gestión de usuarios (document, firstName, lastName, email); CRUD completo; persistencia en LocalStorage; UX mínima y accesible; arquitectura modular por feature.
- No alcance: backend, autenticación, autorización, pagos, integraciones externas, paginación real, sincronización multi-tab, internacionalización avanzada, theming complejo.

## Definiciones (lenguaje de dominio)
- Usuario: entidad con campos document (id único), firstName, lastName, email.
- Fuente de verdad: LocalStorage (clave versionada).
- Estados de UI: idle, loading, creating, editing, saving, deleting, error.
- Eventos de dominio: USER_CREATE_REQUESTED, USER_CREATED, USER_EDIT_REQUESTED, USER_UPDATED, USER_DELETE_REQUESTED, USER_DELETED, USERS_LOADED, PERSIST_FAILED.
- Vacío: estado sin registros en memoria ni persistencia válida.

## Principios / Reglas no negociables
- Sin backend; todo corre en cliente.
- Unicidad de document garantizada en creación y actualización.
- LocalStorage es la única fuente de verdad; versión de schema declarada y chequeada en cada load.
- UX mínima pero clara: mensajes de error legibles, confirmaciones antes de borrar, estados vacíos visibles.
- Accesibilidad básica: labels asociados, foco navegable por teclado, textos de error comprensibles.
- Arquitectura modular por feature; evitar dependencias cíclicas; shared solo expone utilidades puras.
- Validaciones estrictas (longitudes, formato email, alfanumérico para document).

## Límites
- Solo un feature principal: users.
- Sin sincronización multi-tab (cambios en una pestaña no se reflejan en otras).
- Sin colas ni concurrencia; operaciones locales y sin retry automático.
- Sin manejo de roles ni seguridad más allá del cliente.

## Eventos y estados (visión raíz)
- Estados de vista/control: idle → loading (al leer) → (creating|editing) → saving/deleting → idle|error.
- Eventos de dominio listados en definiciones; PERSIST_FAILED lleva a estado error con fallback a vacío.

## Criterios de aceptación (root)
- Dado que no hay backend, cuando se cargue la app, entonces debe leer LocalStorage con clave versionada y, si falla, inicializar vacío y mostrar aviso.
- Cuando se cree/edite/borre un usuario válido, entonces el estado y la persistencia deben reflejarlo y la UI debe confirmarlo sin recargar la página.
- Cuando no existan usuarios, entonces la vista de lista muestra estado vacío y permite crear.

## Trazabilidad
- UI → [../features/users/ui.spec.md](../features/users/ui.spec.md)
- Validaciones → [../features/users/validation.spec.md](../features/users/validation.spec.md)
- Persistencia → [../features/users/data-storage.spec.md](../features/users/data-storage.spec.md)
- Estado/eventos → [../features/users/state.spec.md](../features/users/state.spec.md)
- Errores → [../features/users/error-handling.spec.md](../features/users/error-handling.spec.md)
- Aceptación y pruebas → [../_KIT/acceptance.spec.md](../_KIT/acceptance.spec.md), [../_KIT/test-plan.spec.md](../_KIT/test-plan.spec.md)
- Colaboración/versionado → [../_KIT/versioning-collaboration.spec.md](../_KIT/versioning-collaboration.spec.md)
