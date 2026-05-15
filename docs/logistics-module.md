# Logistics Module Guide

This document complements the new logistics dashboard and subpages with the main user journeys we mocked via UI interactions.

## Carrier Center

- Use the **Registrar transportadora** button to open a modal with the basic attributes required to onboard a carrier (tipo, cobertura, flota, SLA esperado, capacidades). The data is stored locally in state for now, so you can iterate without backend connectivity.
- **Importar tarifas** simula la carga de un archivo de precios. Mientras está en progreso, el botón muestra `loading` y, al terminar, se despliega un mensaje de feedback.
- Indicadores highlight counts de transportadoras internas vs externas para facilitar segmentación.

## Route Optimizer

- **Optimizar rutas hoy** abre un formulario para seleccionar región, fecha, stops máximos y si se consolidan devoluciones. Tras enviar, se muestra un mensaje con el resultado de la simulación.
- **Exportar manifiesto** genera un mensaje confirmando la exportación mock del manifiesto.
- Los KPIs, itinerario y carga consolidada se nutren de datos centralizados (`modules/logistics/data/mock.ts`) para que puedas sustituirlos fácilmente por respuestas reales (REST, GraphQL, RTK Query, etc.).

## Próximos pasos sugeridos

1. Conectar los handlers anteriores a endpoints reales o mutations RTK Query (apóyate en los nuevos servicios de `modules/logistics/services` para mantener una capa de abstracción limpia).
2. Sustituir los mensajes mock por toasts persistentes o alert logs en backend, aprovechando las respuestas de los servicios (`CarrierService`, `RouteService`) una vez estén integrados.
3. Añadir pruebas de componentes (React Testing Library o Storybook) para garantizar que el flujo modal, los formularios y la mensajería sigan funcionando tras integrar APIs.
4. Extender la documentación con ejemplos de uso de los servicios cuando se conecten a las vistas, de modo que nuevos desarrolladores sepan a qué métodos recurrir para listar datos u orquestar acciones.
