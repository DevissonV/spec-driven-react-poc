# acceptance.spec.md

## Objetivo
- Definir criterios de aceptación end-to-end de la POC.

## Escenarios (Dado/Cuando/Entonces)
- Crear: Dado estado vacío, cuando completo el formulario válido y guardo, entonces aparece en la lista y se muestra éxito.
- Editar: Dado un usuario existente, cuando lo edito con datos válidos, entonces la lista refleja los cambios y éxito.
- Unicidad: Dado un usuario con document X, cuando intento crear otro con document X, entonces se rechaza y se muestra error de unicidad.
- Borrar: Dado un usuario, cuando hago clic en eliminar y confirmo, entonces desaparece y se muestra éxito.
- Búsqueda: Dado varios usuarios, cuando busco por parte del apellido, entonces la lista se filtra acorde.
- Orden: Dado la lista visible, cuando ordeno por nombre asc/desc, entonces el orden cambia correctamente.
- Corrupción de almacenamiento: Dado un almacenamiento corrupto, cuando cargo la app, entonces se resetea a vacío y se muestra aviso.

## Trazabilidad
- → [../features/users/ui.spec.md](../features/users/ui.spec.md)
- → [../features/users/feature-users.spec.md](../features/users/feature-users.spec.md)
- → [../features/users/data-storage.spec.md](../features/users/data-storage.spec.md)
- → [../features/users/validation.spec.md](../features/users/validation.spec.md)
- → [../features/users/error-handling.spec.md](../features/users/error-handling.spec.md)
