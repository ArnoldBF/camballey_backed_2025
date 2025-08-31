# Cobrate

Backend robusto y escalable para la gestión de viajes, usuarios, roles, saldos y transportes. Desarrollado en Node.js con TypeScript, Express y TypeORM, integra autenticación local, JWT y Google OAuth, validaciones con Joi, manejo centralizado de errores y notificaciones en tiempo real con Socket.io.

Este proyecto está pensado para facilitar la integración con cualquier frontend moderno y soportar despliegues en Railway, Heroku, Vercel, entre otros.

## Tecnologías principales

-   Node.js + TypeScript
-   Express
-   TypeORM (PostgreSQL)
-   Passport (local, JWT, Google OAuth)
-   Socket.io
-   Joi (validación)
-   Boom (manejo de errores)
-   Railway (deploy)

## Estructura del proyecto

```
src/
  main.ts
  config/
    env.ts           # Variables de entorno
    orm.ts           # Configuración TypeORM
    server.ts        # Inicialización Express/Socket.io
  controllers/       # Lógica de endpoints
  db/
    configDb.ts      # Configuración entidades/migraciones
    migrations/      # Migraciones DB
  entities/          # Modelos TypeORM
  helpers/
    auth/            # Estrategias Passport
  middlewares/       # Validación y errores
  routes/            # Rutas Express
  schemas/           # Validación Joi
  services/          # Lógica de negocio
```

## Funcionalidades principales

-   **Usuarios y Personas:** Registro, autenticación, relación con roles y saldo.
-   **Roles:** Gestión y asignación de roles (pasajero, chofer, etc).
-   **Saldo:** Carga y descuento de saldo, notificaciones en tiempo real.
-   **Transporte y TipoTransporte:** Registro y gestión de transportes y tipos.
-   **Viajes:** Registro de viajes, descuento/abono de saldo, notificaciones.
-   **Autenticación:** Local, JWT y Google OAuth2.0.
-   **Socket.io:** Notificaciones en tiempo real para saldo abonado/descontado.
-   **Validación:** Esquemas Joi para todas las entidades.
-   **Errores:** Manejo robusto con Boom.
-   **Despliegue:** Listo para Railway y otros servicios cloud.

## Instalación y ejecución

1. Clona el repositorio:
    ```bash
    git clone https://github.com/ArnoldBF/camballey_backend_2025.git
    cd camballey_backend_2025
    ```
2. Instala dependencias:
    ```bash
    npm install
    ```
3. Configura las variables de entorno en `.env` (ver ejemplo en el proyecto).
4. Ejecuta migraciones:
    ```bash
    npm run migrations:run
    ```
5. Inicia el servidor en modo desarrollo:
    ```bash
    npm run dev
    ```
6. Para producción:
    ```bash
    npm run start
    ```

## Endpoints principales

-   `/api/usuarios` - Gestión de usuarios
-   `/api/auth` - Autenticación (login, Google OAuth)
-   `/api/rol` - Gestión de roles
-   `/api/saldo` - Gestión de saldo
-   `/api/tipo-transporte` - Tipos de transporte
-   `/api/transporte` - Transportes
-   `/api/viaje` - Viajes

## Integración con el frontend

-   El frontend debe conectarse a Socket.io y unirse a la sala `usuario_{usuarioId}` para recibir notificaciones de saldo.
-   El backend emite eventos `saldoAbonado` y `saldoDescontado` a las salas correspondientes.
-   Ejemplo de integración Socket.io en el frontend:
    ```js
    const socket = io("https://TU_BACKEND_URL", { path: "/socket.io/" });
    socket.emit("join", { sala: `usuario_${usuarioId}` });
    socket.on("saldoAbonado", (data) => {
        // lógica para mostrar notificación
    });
    socket.on("saldoDescontado", (data) => {
        // lógica para mostrar notificación
    });
    ```
-   La autenticación con Google requiere configurar los IDs y secretos en Railway y Google Console.

## Seguridad

-   JWT para autenticación y autorización.
-   Validación de datos con Joi en todos los endpoints.
-   Manejo de errores centralizado con Boom.
-   Variables sensibles gestionadas por `.env`.
-   Recomendaciones para producción: usar HTTPS, restringir CORS, rotar secretos periódicamente.

## Testing

-   Estructura lista para agregar pruebas unitarias y de integración.
-   Recomendado: Jest o Mocha para tests en TypeScript.
-   Se recomienda mockear la base de datos y los servicios externos para pruebas confiables.

## Despliegue

-   Listo para Railway, Heroku, Vercel o cualquier servicio compatible con Node.js.
-   Incluye scripts para migraciones y build.
-   Configura las variables de entorno en el panel del servicio cloud.

## Autor y equipo

-   ArnoldBF

### TEAM: The Debuggers

-   Arnold Bazan
-   Anghelo Montalvo
-   Rodrigo Montaño
-   Paulo Pachury

---

¿Tienes dudas, sugerencias o quieres contribuir? Abre un issue, realiza un pull request o contacta al equipo.
