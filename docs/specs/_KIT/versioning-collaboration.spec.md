# versioning-collaboration.spec.md

## Objetivo
- Establecer reglas de versionado de specs, ownership y flujo de cambios para evitar drift.

## Alcance / No alcance
- Alcance: gobierno de specs, PR workflow, gates anti-drift, versionado de datos.
- No alcance: políticas de release de producto final.

## Estrategia de versionado de specs
- Specs viven en el repo y se versionan con Git.
- Cambios de comportamiento requieren actualizar la spec en el mismo PR que el código.
- Tipos de cambio:
  - Menor: redacción/claridad sin cambiar comportamiento.
  - Funcional: modifica requisitos o criterios de aceptación.
  - Breaking: rompe contratos entre capas o cambia dominio (requiere mayor revisión).

## Ownership y gobernanza
- One Spec requiere revisión de Architecture/Lead.
- Cada spec de feature (feature-users, data-storage, validation, state) requiere aprobación de su owner designado.
- Cambios constitucionales (One Spec) piden doble aprobación (arquitectura + producto).

## Proceso de cambio (PR workflow)
- Checklist mínimo en PR: [ ] Spec actualizada; [ ] Acceptance actualizado; [ ] Notas de migración si aplica.
- Orden sugerido: primero review de specs, luego review de código.

## Gates anti “spec drift”
- Si cambia feature users, debe tocar feature-users.spec.md y, si afecta validaciones o storage, también validation.spec.md y data-storage.spec.md.
- Señales de drift: comportamiento no documentado, tests que no se reflejan en specs, campos nuevos sin reglas.
- Resolución: abrir PR de spec antes o junto al cambio de código, revalidar aceptación.

## Versionado de datos en LocalStorage
- schemaVersion inicial: 1.
- Migración simple v1→v2 (placeholder): si se detecta v1 y la app espera v2, se aplica transform declarada; si no es posible, reset controlado a vacío con aviso.
- Política de fallback: ante incompatibilidad o migración fallida, reset a { schemaVersion: versión soportada, users: [] } y mostrar aviso al usuario.

## Criterios de aceptación
- Given un cambio de comportamiento, when se abre PR, then la spec relacionada se actualiza en el mismo PR.
- Given detección de schemaVersion incompatible, when se carga la app, then se aplica migración o reset con aviso.

## Trazabilidad
- → [../features/users/data-storage.spec.md](../features/users/data-storage.spec.md)
- → [acceptance.spec.md](acceptance.spec.md)
- → [test-plan.spec.md](test-plan.spec.md)
