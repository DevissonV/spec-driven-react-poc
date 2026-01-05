# test-plan.spec.md

## Objetivo
- Plan de pruebas sin código para validar requisitos funcionales y no funcionales.

## Alcance / No alcance
- Alcance: casos manuales; cobertura de validaciones, flujos CRUD, storage.
- No alcance: pruebas automatizadas en esta entrega; performance avanzada.

## Áreas de prueba
- Validaciones por campo (límites, formatos, unicidad).
- Flujos CRUD completos.
- Búsqueda y ordenamiento.
- Estado vacío.
- Persistencia: lectura/escritura, corrupción, versión incompatible.
- Estados de UI: saving/deleting deshabilitan acciones.
- Accesibilidad básica: tab order, labels visibles.

## Criterios de aceptación de pruebas
- Todos los escenarios de acceptance.spec.md pasan manualmente.
- No quedan errores visibles sin mensaje.
- Storage refleja consistentemente el estado tras operaciones.

## Trazabilidad
- → [acceptance.spec.md](acceptance.spec.md)
- → [../features/users/feature-users.spec.md](../features/users/feature-users.spec.md)
- → [../features/users/data-storage.spec.md](../features/users/data-storage.spec.md)
- → [../features/users/validation.spec.md](../features/users/validation.spec.md)
