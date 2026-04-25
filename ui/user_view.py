import tkinter as tk
from tkinter import ttk, messagebox
from models.user_model import get_user_matches
from models.match_model import count_players

class UserView(ttk.Frame):
    def __init__(self, parent, user):
        super().__init__(parent)
        
        self.user = user
        
        info_frame = ttk.LabelFrame(self, text="Información de Usuario")
        info_frame.pack(fill="x", padx=20, pady=10)
        
        ttk.Label(
            info_frame,
            text=f"Usuario: {user[1]}",
            font=("Arial", 12, "bold")
        ).pack(pady=5)
        
        ttk.Label(
            info_frame,
            text=f"Matrícula: {user[3]}",
            font=("Arial", 10)
        ).pack(pady=5)
        
        matches_frame = ttk.LabelFrame(self, text="Mis Partidos")
        matches_frame.pack(fill="both", expand=True, padx=20, pady=10)
        
        # Cambiado: usar tk.Listbox directamente (no hay conflicto)
        self.listbox = tk.Listbox(matches_frame, width=70, height=10)
        self.listbox.pack(padx=10, pady=10, fill="both", expand=True)
        
        ttk.Button(
            matches_frame,
            text="Actualizar",
            command=self.load_matches
        ).pack(pady=5)
        
        self.load_matches()
    
    def load_matches(self):
        self.listbox.delete(0, tk.END)
        
        matches = get_user_matches(self.user[0])
        
        if not matches:
            self.listbox.insert(tk.END, "No estás inscrito en ningún partido")
        else:
            for m in matches:
                players = count_players(m[0])
                text = f"{m[1]} | {players}/{m[2]*2} jugadores | {m[3]} | {m[4]}"
                self.listbox.insert(tk.END, text)