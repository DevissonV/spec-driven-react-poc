# project-structure.spec.md

## Objetivo
- Definir la estructura modular por features y reglas de importación/nomenclatura.

## Alcance / No alcance
- Alcance: organización de carpetas, responsabilidades por capa, convenciones de nombres.
- No alcance: elección de herramientas de build o librería de estado específica.

## Estructura propuesta (conceptual)
- src/features/users: UI (pantalla, formulario), estado, servicios de dominio, adaptador de storage, validadores; expone API pública en index.ts.
- src/shared: componentes UI básicos reutilizables, hooks genéricos, utilidades (filtros, sorters), tipos compartidos.
- src/app: bootstrap/composición de la app y provisión de estado global si aplica.

## Reglas / Invariantes
- features no se importan entre sí (solo shared).
- shared no importa desde features.
- Import rules: cualquier uso de un feature debe ir vía src/features/<feature>/index.ts; prohibido importar rutas internas de otro feature.
- Nombres: archivos de UI con sufijo View/Page/Form; adaptadores con sufijo StorageAdapter; validadores con sufijo Validator; servicios con Service.
- Sin dependencias cíclicas; importaciones siguen dirección app → features → shared.

## Criterios de aceptación
- Given la estructura, when se revisan imports, then ninguna va de shared a features ni entre features.

## Trazabilidad
- → [../features/users/ui.spec.md](../features/users/ui.spec.md)
- → [../features/users/state.spec.md](../features/users/state.spec.md)
- → [../features/users/validation.spec.md](../features/users/validation.spec.md)
- → [../features/users/data-storage.spec.md](../features/users/data-storage.spec.md)
