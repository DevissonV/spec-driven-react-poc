# POC Usuarios (React + LocalStorage)

CRUD en cliente para usuarios (`document`, `firstName`, `lastName`, `email`) alineado al Spec Kit en `docs/specs`.

## Requisitos
- Node.js >= 18

## Scripts
- `npm install` instala dependencias.
- `npm run dev` arranca Vite en puerto 5173.
- `npm run build` genera el build de producción.
- `npm run preview` sirve el build.
- `npm run lint` corre TypeScript sin emitir.

## Cómo probar manualmente
1) Limpiar LocalStorage de la clave `poc_users_v1`.
2) Ejecutar `npm run dev` y abrir http://localhost:5173.
3) Seguir el checklist de [docs/specs/_KIT/acceptance.spec.md](docs/specs/_KIT/acceptance.spec.md) y [docs/specs/_KIT/test-plan.spec.md](docs/specs/_KIT/test-plan.spec.md):
	- Crear, editar, borrar (con confirmación) y ver feedback de éxito/error.
	- Unicidad de `document` en creación/edición.
	- Búsqueda por fragmento y orden asc/desc por nombre o documento.
	- Corrupción/version incompatible de storage resetea a vacío con aviso.
	- Botones deshabilitados mientras saving/deleting; mensajes de error por campo en español.

## Arquitectura
- `src/app`: bootstrap y composición.
- `src/features/users`: UI (tabla, formulario, búsqueda/orden), estado/controlador, validación síncrona y adaptador de LocalStorage.
- `src/shared`: componentes base (botón, input, diálogo), estilos y utilidades de filtro/orden.

## Clave y esquema de almacenamiento
- Clave: `poc_users_v1`.
- Payload: `{ schemaVersion: 1, users: User[] }`.
- Ante corrupción o versión incompatible se resetea a `{ schemaVersion: 1, users: [] }` y se muestra aviso.

## Cobertura de especificaciones
- Aceptación (CRUD, unicidad, búsqueda, orden, corrupción) cubierto en UI/estado.
- Validación: longitudes, formato de email, alfanumérico estricto, unicidad.
- No funcionales: navegación por teclado en formulario/acciones, mensajes legibles, sin bloqueos perceptibles en lista pequeña.
