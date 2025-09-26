# BirdScan

![MIT License](https://img.shields.io/badge/license-MIT-green)
![NestJS](https://img.shields.io/badge/backend-NestJS-red)
![React](https://img.shields.io/badge/frontend-React-blue)

![Logo](/birdscan-frontend/public/BirdScan_logo.svg)

El proyecto consiste en el desarrollo de una plataforma web que promueva el ecoturismo en las áreas protegidas de Nicaragua, con especial énfasis en la observación de aves residentes y migratorias.
La iniciativa busca centralizar información confiable sobre biodiversidad, reservas naturales habilitadas para actividades turísticas, temporadas de avistamiento y eventos de conservación, brindando a los visitantes nacionales e internacionales una herramienta interactiva para planificar sus experiencias en contacto con la naturaleza.
Además, el sistema fomentará la conexión entre operadores locales (guías turísticos certificados, comunidades organizadas, emprendedores) y los turistas interesados, impulsando la economía local y promoviendo prácticas sostenibles de turismo responsable.

---

## Tecnologías

- **Frontend:** React + Vite + TypeScript
- **Backend:** NestJS + Primsa + PostgreSQL
- **Autenticación:** JWT + Google OAuth
- **Caché:** Redis
- **Mapas:** Leaflet + GeoJSON
- **Infraestructura:** Docker + Docker Compose

---

## Estructura del Proyecto
```
birdscan-solucion-HN2025/
├── birdscan-backend/           # Backend NestJS
│   ├── src/                    # Código fuente (controladores, servicios, módulos)
│   ├── prisma/                 # Esquema de base de datos y migraciones
│   ├── docker-compose.yml      # Servicios: PostgreSQL, Redis
│   ├── .env                    # Variables de entorno del backend
│
├── birdscan-frontend/          # Frontend React + Vite
│   ├── src/                    # Componentes, páginas, hooks, estilos
│   ├── public/                 # Assets públicos (logo, imágenes, íconos)
│   ├── .env                    # Variables de entorno del frontend 
│
├── start-dev.bat               # Script para iniciar el entorno en Windows
├── start-dev.sh                # Script para iniciar el entorno en Linux/macOS
├── README.md                   # Documentación principal del proyecto
└── LICENSE                     # Licencia MIT
```

## Instalación

### Requisitos

- Node.js >= 18
- Docker % Docker Compose
- Redis y PostgreSQL (se levantan con Docker)

### Clonar el repositorio

```bash
git clone https://github.com/FloresStev/birdscan-solucion-HN2025.git
cd birdscan-solucion-HN2025
```

### Variables de entorno

Crea los archivos `.env` en `birdscan-backend/` y `birdscan-frontend/` con tus credenciales:

```bash
# birdscan-backend/.env
DATABASE_URL=postquresql://user:password@localhost:5432/birdscan
JWT_Secret=tu_clave_secreta
GOOGLE_CLIENT_ID=XXX
GOOGLE_CLIENT_SECRET=XXX
```

```bash
# birdscan-frontend/.env
VITE_API_URL=http://localhost:3000/api
```

## Desarrollo

```bash
# Levantar base de datos y Redis
cd birdscan-backend
docker compose up -d

# Backend
npm install
npm run start:dev

# Frontend
cd ../birdscan-frontend
npm install
npm run dev
```

### Scripts útiles
``` bash
# Desde la carpeta raiz
# Script para levantar todo en desarrollo desde windows.
./start-dev.bat

# Script para levantar todo en desarrollo desde Linux.
./start-dev.sh
```

## Funcionalidades

### Autenticación y Gestión de Usuarios

- Registro e inicio de sesión para turistas, guías y administradores.
- Perfiles personalizados con historial de observaciones y reservas.
- Roles diferenciados con permisos específicos
  - **Turista:** Acceso a catálogo, mapas, AviDex, reservas y módulo educativo.
  - **Guía:** Acceso a agenda de reservas y gestión de tours.
  - **Administrador:** Control total sobre usuarios, especies, reservas y contenidos
- Autenticación con JWT y confirmación por correo electrónico.
- Validación de guías mediante documetnos(cédula, certificados, experiencia, idiomas).

## Catálogo Digital de Aves

- Base de datos de especies residentes y migratorias.
- Filtros por zona geográfica, temporada y rareza.
- Visualización de fotografías, descripcioes y mapas de distribución.

## Reservas Naturales

- Listado de áreas protegidas habilitadas para ecoturismo.
- Detalles por reserva: ubicación GPS, actividades disponibles, costos, accesibilidad.
- Mapas interarctivos con rutas ecoturísticcas y especies presentes por temporada.
- Asignación de guías a reservas desde el panel de administración

## Eventos y Temporadas

- Calendario con información sobre migración de aves, festiivales y talleres.
- Filtros por fecha, tipo de vento y ubicación.
- Notificaciones automáticas a usuarios registrados.
- Gestión de eventos por parte de administradores.

## Sistema de Reservas en Linea

- Contratación de guías turísticos certificados.
- Agenda de disponibilidad por guía y tipo de tour.
- Confirmaciones automáticas vía correo y notificaciones push.
- Panel para guías con gestión de solicitudes y agenda personal.

## Modulo Educativo

- Recursos sobre conservación de aves y ecosistemas.
- Buenas prácticas de turismo responsable.
- Quizzes y actividades interactivas con registro de resultados.
- Gestión de contenidos multimedia por administradores.

## Mapas Interactivos

- Visualización de distribución geográfica de aves.
- Localización de reservas naturales y rutas ecoturísticas.
- Capas interactivas y responsivas para web y móvil.
- Actualización periódica de datos geoespaciales.

## Licencia

MIT © Neuronas en Fuga
