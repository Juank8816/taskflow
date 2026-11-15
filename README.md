# TASKFLOW — Clean Architecture

Aplicación full-stack para gestión de tareas con React, Express y MySQL.

## Requisitos
- Node.js 20 o superior
- MySQL 8+
- npm

## 1. Base de datos
Ejecuta `database/schema.sql` en MySQL.

## 2. Backend
```bash
cd backend
cp .env.example .env
npm install
npm run dev
```
Configura las variables de `.env` antes de iniciar.

API: `http://localhost:3001/api`

## 3. Frontend
En otra terminal:
```bash
cd frontend
cp .env.example .env
npm install
npm run dev
```
Abre `http://localhost:5173`.

## Funcionalidades incluidas
- Registro e inicio de sesión con JWT.
- Contraseñas almacenadas con bcrypt.
- Crear, consultar, editar, cambiar estado y eliminar tareas.
- Búsqueda por título/descripción.
- Filtros por estado y prioridad.
- Persistencia en MySQL.
- Separación por dominio, aplicación, infraestructura y presentación.

## Capas
- **Domain:** entidades y contratos, sin dependencias de frameworks.
- **Application:** casos de uso y orquestación de reglas.
- **Infrastructure:** adaptadores concretos para MySQL, JWT, bcrypt y HTTP.
- **Presentation:** componentes React, controladores Express, rutas y middleware.

## Seguridad y notas
- Cambia `JWT_SECRET` por un secreto largo y aleatorio.
- No subas `.env` a GitHub.
- En producción usa HTTPS, CORS restringido al dominio del frontend y secretos del proveedor de despliegue.
- El token se guarda en `localStorage` en este ejemplo académico. Para producción, considera cookies HttpOnly, Secure y SameSite.
- Agrega pruebas automatizadas antes del despliegue final.
