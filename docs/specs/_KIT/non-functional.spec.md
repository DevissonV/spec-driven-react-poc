# non-functional.spec.md

## Objetivo
- Establecer criterios no funcionales mínimos.

## Alcance / No alcance
- Alcance: performance básica, accesibilidad mínima, consistencia visual, mantenibilidad modular.
- No alcance: métricas de rendimiento avanzadas, SEO, PWA.

## Requisitos
- NF-001: Lectura inicial de LocalStorage <100ms en condiciones normales.
- NF-002: Navegación por teclado soportada en formularios y acciones principales.
- NF-003: Modularidad: sin dependencias cíclicas entre features y shared.
- NF-004: Mensajes de error legibles con contraste suficiente.

## Criterios de aceptación
- Given lista pequeña (<500 usuarios), when se carga, then la UI responde sin bloqueos perceptibles.

## Trazabilidad
- → [../features/users/ui.spec.md](../features/users/ui.spec.md)
- → [project-structure.spec.md](project-structure.spec.md)
