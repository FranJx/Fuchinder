import sqlite3

DB_NAME = "futbol.db"

def get_connection():
    return sqlite3.connect(DB_NAME)


def init_db():
    conn = get_connection()
    cursor = conn.cursor()

    # Verificar si la tabla users existe y su estructura
    cursor.execute("SELECT name FROM sqlite_master WHERE type='table' AND name='users'")
    table_exists = cursor.fetchone()
    
    if table_exists:
        # Verificar las columnas actuales
        cursor.execute("PRAGMA table_info(users)")
        columns = cursor.fetchall()
        column_names = [col[1] for col in columns]
        
        # Si la tabla no tiene la columna matricula o tiene restricciones incorrectas
        if 'matricula' not in column_names:
            # Crear tabla temporal y migrar datos
            cursor.execute("""
            CREATE TABLE users_new (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                username TEXT NOT NULL,
                password TEXT NOT NULL,
                matricula TEXT UNIQUE NOT NULL
            )
            """)
            
            # Migrar datos existentes (asignar matricula temporal si no existe)
            cursor.execute("INSERT INTO users_new (id, username, password, matricula) SELECT id, username, password, id FROM users")
            cursor.execute("DROP TABLE users")
            cursor.execute("ALTER TABLE users_new RENAME TO users")
    else:
        # Crear tabla nueva
        cursor.execute("""
        CREATE TABLE users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT NOT NULL,
            password TEXT NOT NULL,
            matricula TEXT UNIQUE NOT NULL
        )
        """)

    # Crear las otras tablas si no existen
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS matches (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT,
        players_per_team INTEGER,
        location TEXT,
        datetime TEXT,
        creator_id INTEGER
    )
    """)

    cursor.execute("""
    CREATE TABLE IF NOT EXISTS match_players (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        match_id INTEGER,
        user_id INTEGER
    )
    """)

    conn.commit()
    conn.close()