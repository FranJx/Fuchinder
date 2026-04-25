import sqlite3
from database import get_connection

def create_user(username, password, matricula):
    conn = get_connection()
    cursor = conn.cursor()

    try:
        cursor.execute(
            "INSERT INTO users (username, password, matricula) VALUES (?,?,?)",
            (username, password, matricula)
        )
        conn.commit()
        success = True
    except sqlite3.IntegrityError:
        success = False
    finally:
        conn.close()
    
    return success

def login(username, password):
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute(
        "SELECT * FROM users WHERE username=? AND password=?",
        (username, password)
    )

    user = cursor.fetchone()
    conn.close()
    return user

def login_by_matricula(matricula, password):
    conn = get_connection()
    cursor = conn.cursor()
    
    cursor.execute(
        "SELECT * FROM users WHERE matricula=? AND password=?",
        (matricula, password)
    )
    
    user = cursor.fetchone()
    conn.close()
    return user

def user_exists_by_username(username):
    conn = get_connection()
    cursor = conn.cursor()
    
    cursor.execute("SELECT * FROM users WHERE username=?", (username,))
    user = cursor.fetchone()
    conn.close()
    
    return user is not None

def user_exists_by_matricula(matricula):
    conn = get_connection()
    cursor = conn.cursor()
    
    cursor.execute("SELECT * FROM users WHERE matricula=?", (matricula,))
    user = cursor.fetchone()
    conn.close()
    
    return user is not None

def get_user_matches(user_id):
    conn = get_connection()
    cursor = conn.cursor()
    
    cursor.execute("""
        SELECT m.*, COUNT(mp.id) as current_players
        FROM matches m
        JOIN match_players mp ON m.id = mp.match_id
        WHERE mp.user_id = ?
        GROUP BY m.id
    """, (user_id,))
    
    matches = cursor.fetchall()
    conn.close()
    return matches