# data-storage.spec.md

## Objetivo
- Definir contrato de persistencia en LocalStorage, versionado y manejo de corrupción.

## Alcance / No alcance
- Alcance: clave, formato de payload, schemaVersion, lectura/escritura, fallback en corrupción.
- No alcance: sincronización multi-tab, cifrado, compresión.

## Definiciones
- Clave de almacenamiento: poc_users_v1 (string).
- Payload: objeto con schemaVersion (number), users (array de usuarios).
- Corrupción: JSON inválido, schemaVersion incompatible, estructura faltante.

## Requisitos funcionales (RFC)
- RFC-DS-001: Leer al inicio; si falla parseo o versión incompatible → reset a payload vacío y emitir aviso.
- RFC-DS-002: Escribir tras operaciones exitosas garantizando consistencia del array en memoria con LocalStorage.
- RFC-DS-003: Versionado de datos: schemaVersion requerido; migración simple v1→v2 (placeholder de estrategia).
- RFC-DS-004: Fuente de verdad: LocalStorage; memoria se considera cache coherente inmediata tras escritura.

## Reglas / Invariantes
- Escritura siempre incluye schemaVersion actual.
- Si schemaVersion ≠ soportado, limpiar y regenerar con versión soportada.
- No dividir writes: una sola operación por cambio (setItem con JSON serializado).
- Al editar document, persistir array ya migrado antes de notificar éxito.

## Estrategia de corrupción
- Si JSON parse falla o campos obligatorios ausentes → reset a { schemaVersion: 1, users: [] } y mostrar aviso de recuperación.

## Criterios de aceptación
- Given payload corrupto, when se carga la app, then se limpia y se muestra aviso de recuperación.
- Given schemaVersion distinto, when se detecta, then se resetea a vacío con versión soportada y se avisa.

## Trazabilidad
- → [feature-users.spec.md](feature-users.spec.md)
- → [state.spec.md](state.spec.md)
- → [error-handling.spec.md](error-handling.spec.md)
- → [../../_KIT/versioning-collaboration.spec.md](../../_KIT/versioning-collaboration.spec.md)
