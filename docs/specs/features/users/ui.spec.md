# ui.spec.md

## Objetivo
- Definir la experiencia visual e interacción mínima para gestionar usuarios con un layout limpio.

## Alcance / No alcance
- Alcance: página de gestión, lista/tabla, formulario de creación/edición, confirmación de eliminación, feedback de éxito/error, estado vacío.
- No alcance: theming avanzado, internacionalización, paginación real, animaciones complejas.

## Definiciones
- Página de gestión: vista única con lista y formulario (modal o panel) mientras se mantenga modularidad.
- Feedback: toast o alerta en página, visible y legible.

## Requisitos funcionales (RFC)
- RFC-UI-001: Mostrar lista/tabla con columnas document, firstName, lastName, email, acciones editar/eliminar.
- RFC-UI-002: Campo de búsqueda (document/nombre/apellido/correo) con filtrado inmediato o al submit.
- RFC-UI-003: Ordenamiento por document y nombre (asc/desc).
- RFC-UI-004: Formulario de creación/edición con labels, placeholders claros y mensajes de error por campo.
- RFC-UI-005: Confirmación previa a eliminar (modal o diálogo).
- RFC-UI-006: Estado vacío con llamado a acción “Crear usuario”.
- RFC-UI-007: Feedback de éxito/error tras operaciones (crear, editar, eliminar, persistir).
- RFC-UI-008: Accesibilidad mínima: labels asociados, foco gestionable por teclado, anuncios de error en texto visible.

## Reglas / Invariantes
- Consistencia visual: mismo estilo para inputs y botones primarios/secundarios.
- Botones de acción deshabilitados mientras saving/deleting.
- Errores de validación se muestran cerca del campo y en español.

## Eventos y estados
- UI reacciona a: idle (lista visible), loading (indicador), creating/editing (form activo), saving/deleting (botones deshabilitados + indicador), error (alerta visible).

## Criterios de aceptación
- Given no hay usuarios, when se muestra la página, then se ve estado vacío y botón de crear.
- Given un usuario existente, when se hace click en editar, then el formulario se precarga y valida.
- Given se elimina, when se confirma, then desaparece de la lista y se muestra feedback de éxito.

## Trazabilidad
- → [feature-users.spec.md](feature-users.spec.md)
- → [validation.spec.md](validation.spec.md)
- → [state.spec.md](state.spec.md)
- → [error-handling.spec.md](error-handling.spec.md)
- → [../../_KIT/non-functional.spec.md](../../_KIT/non-functional.spec.md)
