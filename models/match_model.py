# models/match_model.py
from database import get_connection

def create_match(title, players, location, datetime, creator_id):
    """Crea un nuevo partido en la base de datos"""
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute(
        """
        INSERT INTO matches
        (title, players_per_team, location, datetime, creator_id)
        VALUES (?,?,?,?,?)
        """,
        (title, players, location, datetime, creator_id)
    )

    conn.commit()
    conn.close()

def get_matches():
    """Obtiene todos los partidos ordenados por fecha"""
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("SELECT * FROM matches ORDER BY datetime")
    matches = cursor.fetchall()

    conn.close()
    return matches

def join_match(match_id, user_id):
    """Inscribe un usuario en un partido"""
    conn = get_connection()
    cursor = conn.cursor()
    
    # Verificar si ya está unido
    cursor.execute(
        "SELECT * FROM match_players WHERE match_id=? AND user_id=?",
        (match_id, user_id)
    )
    if cursor.fetchone():
        conn.close()
        return False
    
    # Verificar cupo
    match = get_match(match_id)
    current_players = count_players(match_id)
    max_players = match[2] * 2
    
    if current_players >= max_players:
        conn.close()
        return False

    cursor.execute(
        "INSERT INTO match_players (match_id, user_id) VALUES (?,?)",
        (match_id, user_id)
    )

    conn.commit()
    conn.close()
    return True

def leave_match(match_id, user_id):
    """Da de baja un usuario de un partido"""
    conn = get_connection()
    cursor = conn.cursor()
    
    cursor.execute(
        "DELETE FROM match_players WHERE match_id=? AND user_id=?",
        (match_id, user_id)
    )
    
    conn.commit()
    conn.close()

def count_players(match_id):
    """Cuenta cuántos jugadores tiene un partido"""
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute(
        "SELECT COUNT(*) FROM match_players WHERE match_id=?",
        (match_id,)
    )

    count = cursor.fetchone()[0]
    conn.close()
    return count

def get_match(match_id):
    """Obtiene los datos de un partido específico"""
    conn = get_connection()
    cursor = conn.cursor()
    
    cursor.execute("SELECT * FROM matches WHERE id=?", (match_id,))
    match = cursor.fetchone()
    conn.close()
    
    return match

def delete_match(match_id, user_id):
    """Elimina un partido (solo el creador)"""
    conn = get_connection()
    cursor = conn.cursor()
    
    # Verificar que el usuario sea el creador
    cursor.execute("SELECT creator_id FROM matches WHERE id=?", (match_id,))
    match = cursor.fetchone()
    
    if match and match[0] == user_id:
        # Eliminar jugadores primero
        cursor.execute("DELETE FROM match_players WHERE match_id=?", (match_id,))
        # Eliminar partido
        cursor.execute("DELETE FROM matches WHERE id=?", (match_id,))
        conn.commit()
        conn.close()
        return True
    
    conn.close()
    return False