# Fuchinder - Tinder para partidos de fútbol ⚽

## 📁 Estructura del Proyecto

```
Fuchinder/
├── frontend/               # React + Tailwind CSS
│   ├── src/
│   │   ├── components/     # Componentes reutilizables
│   │   ├── pages/          # Páginas principales
│   │   ├── styles/         # Estilos globales
│   │   ├── utils/          # Funciones auxiliares
│   │   ├── hooks/          # Custom hooks
│   │   ├── context/        # Context API (estado global)
│   │   └── App.jsx
│   ├── package.json
│   └── vite.config.js
│
├── backend/                # Node.js + Express
│   ├── src/
│   │   ├── routes/         # Rutas API
│   │   ├── controllers/     # Lógica de negocio
│   │   ├── models/         # Modelos de datos
│   │   ├── middleware/      # Middleware (auth, etc)
│   │   ├── config/         # Configuración
│   │   └── server.js
│   ├── package.json
│   └── .env.example
│
├── docs/                   # Documentación
│   ├── API.md             # Documentación de API
│   ├── DATABASE.md        # Schema de DB
│   └── SETUP.md           # Instrucciones de setup
│
└── README.md
```

## 🛠 Stack Tecnológico

- **Frontend:** React 18 + Vite + Tailwind CSS + Shadcn/UI
- **Backend:** Node.js + Express + Passport.js
- **Database:** PostgreSQL
- **Auth:** JWT (JSON Web Tokens)

## 🎯 Fases del Desarrollo

### Fase 1: Interfaz Gráfica (EN PROGRESO)
- [x] Estructura de carpetas
- [ ] Componentes Tinder-style
- [ ] Página Login/Register
- [ ] Página Perfil
- [ ] Página Partidos (card swipes)
- [ ] Página Equipos
- [ ] Navegación

### Fase 2: Backend
- [ ] API REST
- [ ] Autenticación JWT
- [ ] Base de datos PostgreSQL
- [ ] Validaciones

### Fase 3: Integración
- [ ] Conectar frontend con backend
- [ ] Testing

### Fase 4: Features Avanzadas
- [ ] Geolocalización/Mapas
- [ ] Notificaciones
- [ ] Chat entre usuarios
- [ ] Estadísticas

## 🚀 Quick Start

```bash
# Frontend
cd frontend
npm install
npm run dev

# Backend (en otra terminal)
cd backend
npm install
npm start
```
