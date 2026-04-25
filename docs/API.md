## API Fuchinder - Documentación

### Base URL
```
http://localhost:5000/api
```

---

## 📝 Autenticación

### POST /auth/register
Registra un nuevo usuario.

**Request:**
```json
{
  "nombre": "Juan Pérez",
  "email": "juan@example.com",
  "password": "password123",
  "edad": 28,
  "descripcion": "Mediocampista versátil"
}
```

**Response (201):**
```json
{
  "message": "Usuario registrado exitosamente",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": 1,
    "nombre": "Juan Pérez",
    "email": "juan@example.com"
  }
}
```

---

### POST /auth/login
Inicia sesión con email y contraseña.

**Request:**
```json
{
  "email": "juan@example.com",
  "password": "password123"
}
```

**Response (200):**
```json
{
  "message": "Inicio de sesión exitoso",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": 1,
    "nombre": "Juan Pérez",
    "email": "juan@example.com"
  }
}
```

---

### GET /auth/profile
Obtiene el perfil del usuario autenticado.

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "user": {
    "id": 1,
    "nombre": "Juan Pérez",
    "email": "juan@example.com",
    "edad": 28,
    "descripcion": "Mediocampista versátil"
  }
}
```

---

## ⚽ Partidos

### GET /partidos
Lista todos los partidos disponibles con filtros opcionales.

**Query Parameters:**
- `tamaño`: futbol5, futbol8, futbol11
- `fecha`: YYYY-MM-DD
- `ubicacion`: string

**Response (200):**
```json
{
  "partidos": [
    {
      "id": 1,
      "nombre": "Partido en Villa Sarita",
      "organizador_id": 1,
      "ubicacion": "Cancha Villa Sarita",
      "fecha": "2025-04-25",
      "hora": "19:00",
      "tipo_futbol": "futbol5",
      "jugadores_totales": 10,
      "nivel": "intermedio",
      "duracion": 60
    }
  ]
}
```

---

### POST /partidos
Crea un nuevo partido.

**Headers:**
```
Authorization: Bearer <token>
```

**Request:**
```json
{
  "nombre": "Partido en Villa Sarita",
  "descripcion": "Partido amistoso",
  "ubicacion": "Cancha Villa Sarita",
  "fecha": "2025-04-25",
  "hora": "19:00",
  "tipo_futbol": "futbol5",
  "jugadores_totales": 10,
  "nivel": "intermedio",
  "duracion": 60
}
```

**Response (201):**
```json
{
  "message": "Partido creado exitosamente",
  "partido": { ... }
}
```

---

### GET /partidos/:id
Obtiene detalles de un partido específico.

**Response (200):**
```json
{
  "partido": {
    "id": 1,
    "nombre": "Partido en Villa Sarita",
    "organizador": {
      "id": 1,
      "nombre": "Juan González"
    },
    "inscripciones": [
      {
        "usuario_id": 2,
        "posicion": "portero"
      }
    ]
  }
}
```

---

### POST /partidos/:id/inscribirse
Inscribe al usuario autenticado en un partido.

**Headers:**
```
Authorization: Bearer <token>
```

**Request:**
```json
{
  "posicion": "delantero"
}
```

**Response (201):**
```json
{
  "message": "Inscripción exitosa",
  "inscripcion": { ... }
}
```

---

## 👥 Equipos

### GET /equipos
Lista todos los equipos del usuario autenticado.

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "equipos": [
    {
      "id": 1,
      "nombre": "Los Tigres",
      "creador_id": 1,
      "miembros": ["Juan", "Carlos", "Miguel"],
      "victorias": 5,
      "derrotas": 2,
      "empates": 1
    }
  ]
}
```

---

### POST /equipos
Crea un nuevo equipo.

**Headers:**
```
Authorization: Bearer <token>
```

**Request:**
```json
{
  "nombre": "Los Tigres",
  "descripcion": "Equipo casual de fútbol"
}
```

**Response (201):**
```json
{
  "message": "Equipo creado exitosamente",
  "equipo": { ... }
}
```

---

## Status Codes

| Código | Significado |
|--------|------------|
| 200 | OK |
| 201 | Created |
| 400 | Bad Request |
| 401 | Unauthorized |
| 404 | Not Found |
| 500 | Server Error |

