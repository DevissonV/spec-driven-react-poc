# state.spec.md

## Objetivo
- Definir el modelo de estado y transición de eventos para el feature de usuarios.

## Alcance / No alcance
- Alcance: estados, eventos, transiciones, efectos hacia UI y persistencia.
- No alcance: librería de estado específica.

## Definiciones
- Estados: idle, loading, creating, editing, saving, deleting, error.
- Eventos: USER_CREATE_REQUESTED, USER_CREATED, USER_EDIT_REQUESTED, USER_UPDATED, USER_DELETE_REQUESTED, USER_DELETED, USERS_LOADED, PERSIST_FAILED.

## Requisitos funcionales (RFC)
- RFC-ST-001: Al iniciar, transition idle→loading→idle|error según lectura.
- RFC-ST-002: Crear: idle|editing → creating → saving → idle|error.
- RFC-ST-003: Editar: idle → editing → saving → idle|error.
- RFC-ST-004: Borrar: idle → deleting → idle|error.
- RFC-ST-005: PERSIST_FAILED lleva a estado error con detalle de causa y posibilidad de retry manual.

## Reglas / Invariantes
- saving y deleting deshabilitan acciones concurrentes.
- error conserva último mensaje de fallo.
- USERS_LOADED siempre refresca lista en memoria.

## Criterios de aceptación
- Given estado saving, when se dispara otra creación, then se bloquea hasta salir de saving.
- Given PERSIST_FAILED, when ocurre, then estado=error y UI muestra aviso.

## Trazabilidad
- → [feature-users.spec.md](feature-users.spec.md)
- → [data-storage.spec.md](data-storage.spec.md)
- → [ui.spec.md](ui.spec.md)
- → [error-handling.spec.md](error-handling.spec.md)
