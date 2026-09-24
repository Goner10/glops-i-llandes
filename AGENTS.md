# Glops i Llandes

Web de un bar de tapas de El Cabanyal. Astro + TypeScript; React solo para la isla interactiva de la carta. Sin backend propio. Las reservas usan un servicio externo.

## Antes de editar

- Lee los archivos directamente relacionados con la tarea y sus usos inmediatos. No recorras todo el proyecto salvo que sea necesario.
- Respeta los componentes, estilos y convenciones existentes.
- Consulta la documentación oficial de Astro cuando cambies configuración, rutas, hidratación o una API cuyo comportamiento no esté claro.

## Carta y contenido

- Los productos se definen en `src/data/menu.ts`.
- No inventes descripciones, ingredientes, precios ni alérgenos. Los datos pendientes deben permanecer sin completar hasta confirmarlos con el local.
- Las descripciones se muestran en el modal; las tarjetas muestran imagen, nombre, precio y alérgenos.
- Mantén la accesibilidad del modal y de los iconos de alérgenos.

## Diseño y assets

- Usa los tokens CSS existentes. El color de marca es `#E2A300`; evita reintroducir el naranja antiguo o el patrón de damero.
- No renombres ni elimines assets sin comprobar antes dónde se usan.
- Conserva los colores originales de los SVG de alérgenos.

## Verificación

- Haz solo las comprobaciones proporcionadas al alcance del cambio. Si el usuario indica que verificará el resultado, no ejecutes build ni pruebas adicionales.
- No hagas commits salvo petición expresa.

## Servidor de desarrollo

