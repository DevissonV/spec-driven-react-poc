# Prompt de ejecución manual de specs

Usa este guion como checklist para verificar la POC contra las especificaciones.

1) Contexto inicial
- Leer: docs/specs/_ONE_SPEC/ONE_SPEC.md (propósito, límites, estados/eventos).
- Leer reglas de estructura/imports: docs/specs/_KIT/project-structure.spec.md.
- Leer criterios de aceptación: docs/specs/_KIT/acceptance.spec.md.
- Leer plan de pruebas: docs/specs/_KIT/test-plan.spec.md.

2) Preparar entorno de prueba
- Iniciar la app en modo dev.
- Limpiar LocalStorage (sin la clave poc_users_v1).

3) Ejecutar escenarios de aceptación (uno por uno)
- Crear: estado vacío → completar formulario válido → guardar → aparece en lista + feedback de éxito.
- Editar: usuario existente → editar con datos válidos → lista refleja cambios + éxito.
- Unicidad: crear usuario con document duplicado → se rechaza con error de unicidad.
- Borrar: usuario existente → eliminar con confirmación → no está en lista ni en storage → feedback de éxito.
- Búsqueda: con varios usuarios → buscar por fragmento de apellido → lista filtrada.
- Orden: lista visible → ordenar por nombre asc/desc → orden cambia correctamente.
- Corrupción de almacenamiento: corromper JSON → recargar → app resetea a vacío y muestra aviso.

4) Validaciones por campo (de test-plan)
- document: requerido, 5-20 chars, alfanumérico; probar violaciones y mensaje correcto.
- firstName/lastName: requeridos, 2-50 chars.
- email: requerido, formato válido, 5-100 chars.
- Unicidad en creación y edición (excluyendo el propio al editar).

5) Estados y transiciones (state.spec.md)
- Al cargar: idle → loading → idle|error.
- saving/deleting: acciones bloqueadas mientras dura la operación.
- PERSIST_FAILED: forzar fallo de persistencia (p.ej., LocalStorage lleno) → estado error + opción de retry manual.

6) Persistencia (data-storage.spec.md)
- Confirmar escritura con schemaVersion en cada operación.
- Clave poc_users_v1 presente y coherente tras crear/editar/borrar.
- Migración/fallback: si schemaVersion incompatible → reset controlado con aviso.

7) Manejo de errores (error-handling.spec.md)
- Errores de validación: visibles junto al campo, en español.
- Corrupción/version incompatible: aviso de recuperación.
- PERSIST_FAILED: estado error + opción de reintentar.

8) Accesibilidad y no funcionales (non-functional.spec.md)
- Navegación por teclado en formulario y acciones principales.
- Mensajes legibles y con contraste.
- Carga inicial sin bloqueos perceptibles (lista <500 usuarios).

9) Cierre y trazabilidad
- Marcar cada escenario cumplido en acceptance/test-plan.
- Si algo falla, abrir ticket/PR y actualizar la spec correspondiente en el mismo cambio.
- Respetar CODEOWNERS para aprobaciones.
