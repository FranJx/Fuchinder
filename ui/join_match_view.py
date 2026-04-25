import tkinter as tk
from tkinter import ttk, messagebox

from models.match_model import get_matches, join_match, count_players, leave_match, get_connection


class JoinMatchView(ttk.Frame):
    def __init__(self, parent, user):
        super().__init__(parent)

        self.user = user
        
        control_frame = ttk.Frame(self)
        control_frame.pack(pady=10)
        
        ttk.Button(
            control_frame,
            text="🔄 Actualizar",
            command=self.load
        ).pack(side=tk.LEFT, padx=5)
        
        ttk.Button(
            control_frame,
            text="✅ Unirse",
            command=self.join
        ).pack(side=tk.LEFT, padx=5)
        
        ttk.Button(
            control_frame,
            text="❌ Salir del Partido",
            command=self.leave
        ).pack(side=tk.LEFT, padx=5)

        self.listbox = tk.Listbox(self, width=90, height=15, font=("Courier", 9))
        self.listbox.pack(pady=10)

        self.load()

    def load(self):
        self.listbox.delete(0, tk.END)

        matches = get_matches()

        for m in matches:
            players = count_players(m[0])
            total_players = m[2] * 2
            status = "✓" if self.is_user_joined(m[0]) else " "
            # Formato: [estado] Nombre | Jugadores | Formato | Ubicación | Fecha/Hora
            format_str = f"{m[2]}vs{m[2]}"
            text = f"[{status}] {m[1]:<20} | {players:>2}/{total_players:<2} | {format_str:>5} | {m[3]:<20} | {m[4]}"
            self.listbox.insert(tk.END, text)
    
    def is_user_joined(self, match_id):
        conn = get_connection()
        cursor = conn.cursor()
        cursor.execute(
            "SELECT * FROM match_players WHERE match_id=? AND user_id=?",
            (match_id, self.user[0])
        )
        result = cursor.fetchone()
        conn.close()
        return result is not None

    def join(self):
        selection = self.listbox.curselection()

        if not selection:
            messagebox.showwarning("Advertencia", "Seleccione un partido")
            return

        index = selection[0]
        matches = get_matches()
        match_id = matches[index][0]
        
        if join_match(match_id, self.user[0]):
            messagebox.showinfo("Éxito", "Te has unido al partido")
        else:
            messagebox.showerror("Error", "No se pudo unir (partido lleno o ya estás inscrito)")
        
        self.load()
    
    def leave(self):
        selection = self.listbox.curselection()

        if not selection:
            messagebox.showwarning("Advertencia", "Seleccione un partido")
            return

        index = selection[0]
        matches = get_matches()
        match_id = matches[index][0]
        
        if self.is_user_joined(match_id):
            leave_match(match_id, self.user[0])
            messagebox.showinfo("Éxito", "Has salido del partido")
        else:
            messagebox.showwarning("Advertencia", "No estás en ese partido")
        
        self.load()