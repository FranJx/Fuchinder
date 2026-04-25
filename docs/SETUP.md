## Setup - Fuchinder

### Requisitos
- Node.js 18+
- PostgreSQL 12+
- npm o yarn

---

## 🔧 Setup Inicial

### 1. Backend Setup

```bash
cd backend

# Copiar variables de entorno
cp .env.example .env

# Instalar dependencias
npm install

# Crear base de datos y tablas
# Ejecuta los comandos SQL de docs/DATABASE.md en tu PostgreSQL

# Iniciar servidor
npm run dev
# El servidor correrá en http://localhost:5000
```

### 2. Frontend Setup

```bash
cd frontend

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev
# La app correrá en http://localhost:3000
```

---

## 📦 Variables de Entorno

### Backend (.env)

```env
PORT=5000
NODE_ENV=development

# Database
DB_USER=postgres
DB_HOST=localhost
DB_NAME=fuchinder
DB_PASSWORD=password
DB_PORT=5432

# JWT
JWT_SECRET=tu_secret_key_muy_segura_aqui_123456789

# Frontend URL
FRONTEND_URL=http://localhost:3000
```

---

## 🗄️ Setup de PostgreSQL

### 1. Crear la base de datos

```bash
psql -U postgres

CREATE DATABASE fuchinder;
\c fuchinder
```

### 2. Ejecutar scripts SQL

Copia y ejecuta todos los comandos SQL de `docs/DATABASE.md`

---

## 🚀 Estructura de Carpetas

```
Fuchinder/
├── frontend/
│   ├── src/
│   │   ├── components/    # Componentes React
│   │   ├── pages/         # Páginas principales
│   │   ├── styles/        # Estilos CSS
│   │   ├── utils/         # Funciones auxiliares
│   │   ├── hooks/         # Custom hooks
│   │   ├── context/       # Context API
│   │   └── App.jsx
│   ├── package.json
│   └── index.html
│
├── backend/
│   ├── src/
│   │   ├── routes/        # Rutas API
│   │   ├── controllers/   # Lógica de negocio
│   │   ├── middleware/    # Middleware
│   │   ├── config/        # Configuración
│   │   ├── models/        # Modelos (futuro)
│   │   └── server.js
│   ├── package.json
│   └── .env
│
└── docs/
    ├── API.md             # Documentación API
    ├── DATABASE.md        # Schema de DB
    └── SETUP.md           # Este archivo
```

---

## 🧪 Testing (Próximamente)

```bash
# Backend
cd backend
npm test

# Frontend
cd frontend
npm test
```

---

## 📱 Deployment (Próximamente)

### Frontend: Vercel
```bash
npm install -g vercel
vercel
```

### Backend: Heroku
```bash
heroku login
heroku create fuchinder-backend
git push heroku main
```

---

## 🐛 Troubleshooting

### Puerto 5000 ya está en uso
```bash
# Cambiar en .env
PORT=5001
```

### Error de conexión a PostgreSQL
```bash
# Verificar que PostgreSQL está corriendo
# Windows
services.msc # Buscar PostgreSQL

# Linux
sudo systemctl status postgresql

# macOS
brew services list
```

### Limpiar node_modules
```bash
rm -rf node_modules
npm install
```

---

## 📞 Soporte

Para reportar errores o sugerencias, abre un issue en GitHub.

