# error-handling.spec.md

## Objetivo
- Definir manejo de errores de validación, persistencia y estado.

## Alcance / No alcance
- Alcance: errores de validación, unicidad, corrupción de storage, fallos de parseo.
- No alcance: monitoreo externo, reporting remoto.

## Requisitos funcionales (RFC)
- RFC-ERR-001: Errores de validación se muestran por campo.
- RFC-ERR-002: Errores de unicidad se muestran en el formulario y bloquean persistencia.
- RFC-ERR-003: Corrupción o versión incompatible en LocalStorage dispara aviso y reset controlado.
- RFC-ERR-004: PERSIST_FAILED transiciona a estado error y ofrece retry manual.

## Reglas / Invariantes
- Mensajes en español, claros y cortos.
- No se ocultan errores hasta corrección o nueva acción del usuario.

## Criterios de aceptación
- Given payload corrupto, when se detecta, then se muestra aviso de recuperación.
- Given validación falla, when se muestra, then se asocia al campo y no se persiste.

## Trazabilidad
- → [validation.spec.md](validation.spec.md)
- → [data-storage.spec.md](data-storage.spec.md)
- → [state.spec.md](state.spec.md)
