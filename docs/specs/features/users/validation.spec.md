# validation.spec.md

## Objetivo
- Establecer reglas de validación de campos y mensajes de error consistentes.

## Alcance / No alcance
- Alcance: reglas de campos, unicidad, formato email, mensajes base.
- No alcance: i18n, validaciones async externas.

## Definiciones
- Alfanumérico: regex estricto para letras y dígitos sin espacios ni símbolos.

## Requisitos funcionales (RFC)
- RFC-VAL-001: document requerido; min 5, max 20; alfanumérico estricto.
- RFC-VAL-002: firstName requerido; min 2, max 50.
- RFC-VAL-003: lastName requerido; min 2, max 50.
- RFC-VAL-004: email requerido; formato válido; min 5, max 100.
- RFC-VAL-005: Unicidad de document en creación y edición (excluyendo el propio al editar).

## Reglas / Invariantes
- Validaciones sincrónicas en cliente antes de persistir.
- Mensajes de error claros y específicos por campo (ej.: “El documento debe ser alfanumérico y tener entre 5 y 20 caracteres”).

## Criterios de aceptación
- Given document con símbolos, when se valida, then se rechaza con mensaje de alfanumérico.
- Given email inválido, when se valida, then se rechaza con mensaje de formato.
- Given edición manteniendo mismo document, when se valida unicidad, then pasa.

## Trazabilidad
- → [ui.spec.md](ui.spec.md)
- → [feature-users.spec.md](feature-users.spec.md)
- → [error-handling.spec.md](error-handling.spec.md)
