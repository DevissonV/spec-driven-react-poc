# feature-users.spec.md

## Objetivo
- Definir el comportamiento del feature de usuarios: CRUD, búsqueda, ordenamiento y flujo de UI con dominio Users.

## Alcance / No alcance
- Alcance: creación, edición, eliminación con confirmación; búsqueda; ordenamiento básico; manejo de estado vacío.
- No alcance: paginación real; batch operations; sincronización multi-tab.

## Definiciones
- Identificador lógico: document (string único).
- Colisión: intento de crear/actualizar a document existente de otro usuario.

## Requisitos funcionales (RFC)
- RFC-USR-001: Crear usuario con validaciones y unicidad de document.
- RFC-USR-002: Editar usuario localizable por document; si document es editable, aplicar estrategia de migración.
- RFC-USR-003: Eliminar usuario con confirmación; remover de memoria y persistencia.
- RFC-USR-004: Listar usuarios desde LocalStorage (fuente de verdad) y reflejar en UI.
- RFC-USR-005: Buscar por document, firstName, lastName, email (contiene, case-insensitive).
- RFC-USR-006: Ordenar por document o nombre (firstName+lastName), asc/desc.
- RFC-USR-007: Estado vacío visible si no hay registros tras carga.

## Reglas / Invariantes
- Unicidad de document en creación y edición (si document cambia, validar contra todos).
- Migración al editar document: crear nuevo registro con document nuevo, copiar datos, eliminar antiguo en memoria antes de persistir en bloque.
- Operaciones son locales; no hay retries remotos.
- Borrado requiere confirmación explícita.

## Eventos y estados
- Eventos: USER_CREATE_REQUESTED, USER_CREATED, USER_EDIT_REQUESTED, USER_UPDATED, USER_DELETE_REQUESTED, USER_DELETED, USERS_LOADED, PERSIST_FAILED.
- Estados: idle, loading, creating, editing, saving, deleting, error.

## Criterios de aceptación
- Given un document existente, when se intenta crear otro igual, then se rechaza y se muestra error de unicidad.
- Given un usuario, when se edita su document a uno nuevo libre, then se persiste con el nuevo id sin duplicados.
- Given se elimina un usuario, when se confirma, then ya no aparece en lista ni en LocalStorage.

## Trazabilidad
- → [data-storage.spec.md](data-storage.spec.md)
- → [validation.spec.md](validation.spec.md)
- → [state.spec.md](state.spec.md)
- → [ui.spec.md](ui.spec.md)
- → [error-handling.spec.md](error-handling.spec.md)
