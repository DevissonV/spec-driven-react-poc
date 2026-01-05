# routing.spec.md

## Objetivo
- Declarar si hay routing en la POC.

## Alcance / No alcance
- Alcance: single-page sin rutas múltiples (no se requiere router).
- No alcance: rutas públicas/privadas, navegación multi-página.

## Definiciones
- Vista única: gestión de usuarios.

## Requisitos funcionales (RFC)
- RFC-RT-001: La aplicación opera en una sola vista; no se requieren rutas.

## Criterios de aceptación
- Given la app, when se carga, then todas las operaciones suceden en una sola página.

## Trazabilidad
- → [ui.spec.md](ui.spec.md)
- → [../../_KIT/project-structure.spec.md](../../_KIT/project-structure.spec.md)
