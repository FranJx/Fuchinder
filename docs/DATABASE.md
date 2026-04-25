## Base de Datos - PostgreSQL

### Tabla: usuarios

```sql
CREATE TABLE usuarios (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  edad INTEGER,
  descripcion TEXT,
  foto_url VARCHAR(255),
  ubicacion VARCHAR(100),
  rating DECIMAL(3,1) DEFAULT 0,
  partidos_jugados INTEGER DEFAULT 0,
  creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  actualizado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Tabla: partidos

```sql
CREATE TABLE partidos (
  id SERIAL PRIMARY KEY,
  organizador_id INTEGER NOT NULL,
  nombre VARCHAR(100) NOT NULL,
  descripcion TEXT,
  ubicacion VARCHAR(255) NOT NULL,
  fecha DATE NOT NULL,
  hora TIME NOT NULL,
  tipo_futbol VARCHAR(20) NOT NULL, -- 'futbol5', 'futbol8', 'futbol11'
  jugadores_totales INTEGER NOT NULL,
  nivel VARCHAR(50), -- 'iniciante', 'intermedio', 'avanzado'
  duracion INTEGER, -- en minutos
  imagen_url VARCHAR(255),
  estado VARCHAR(20) DEFAULT 'activo', -- 'activo', 'completado', 'cancelado'
  creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  actualizado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (organizador_id) REFERENCES usuarios(id)
);
```

### Tabla: inscripciones_partido

```sql
CREATE TABLE inscripciones_partido (
  id SERIAL PRIMARY KEY,
  partido_id INTEGER NOT NULL,
  usuario_id INTEGER NOT NULL,
  posicion VARCHAR(50), -- 'portero', 'defensa', 'mediocampista', 'delantero'
  estado VARCHAR(20) DEFAULT 'aceptado', -- 'aceptado', 'pendiente', 'rechazado'
  inscrito_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (partido_id) REFERENCES partidos(id),
  FOREIGN KEY (usuario_id) REFERENCES usuarios(id),
  UNIQUE(partido_id, usuario_id)
);
```

### Tabla: equipos

```sql
CREATE TABLE equipos (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  creador_id INTEGER NOT NULL,
  descripcion TEXT,
  logo_url VARCHAR(255),
  victorias INTEGER DEFAULT 0,
  derrotas INTEGER DEFAULT 0,
  empates INTEGER DEFAULT 0,
  creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  actualizado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (creador_id) REFERENCES usuarios(id)
);
```

### Tabla: miembros_equipo

```sql
CREATE TABLE miembros_equipo (
  id SERIAL PRIMARY KEY,
  equipo_id INTEGER NOT NULL,
  usuario_id INTEGER NOT NULL,
  rol VARCHAR(20) DEFAULT 'miembro', -- 'admin', 'miembro'
  unido_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (equipo_id) REFERENCES equipos(id),
  FOREIGN KEY (usuario_id) REFERENCES usuarios(id),
  UNIQUE(equipo_id, usuario_id)
);
```

### Tabla: posiciones_usuario

```sql
CREATE TABLE posiciones_usuario (
  id SERIAL PRIMARY KEY,
  usuario_id INTEGER NOT NULL,
  posicion VARCHAR(50) NOT NULL, -- 'portero', 'defensa', 'mediocampista', 'delantero'
  FOREIGN KEY (usuario_id) REFERENCES usuarios(id),
  UNIQUE(usuario_id, posicion)
);
```

### Tabla: preferencias_partido

```sql
CREATE TABLE preferencias_partido (
  id SERIAL PRIMARY KEY,
  usuario_id INTEGER NOT NULL,
  tipo_futbol VARCHAR(20) NOT NULL, -- 'futbol5', 'futbol8', 'futbol11'
  FOREIGN KEY (usuario_id) REFERENCES usuarios(id),
  UNIQUE(usuario_id, tipo_futbol)
);
```

## Índices para optimización

```sql
CREATE INDEX idx_partidos_organizador ON partidos(organizador_id);
CREATE INDEX idx_partidos_fecha ON partidos(fecha);
CREATE INDEX idx_inscripciones_partido ON inscripciones_partido(partido_id);
CREATE INDEX idx_inscripciones_usuario ON inscripciones_partido(usuario_id);
CREATE INDEX idx_equipos_creador ON equipos(creador_id);
CREATE INDEX idx_miembros_equipo ON miembros_equipo(equipo_id);
```
