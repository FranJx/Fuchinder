import tkinter as tk
from tkinter import ttk, messagebox

from ui.create_match_view import CreateMatchView
from ui.join_match_view import JoinMatchView
from ui.user_view import UserView


class MainView(ttk.Notebook):
    def __init__(self, parent, user):
        super().__init__(parent)

        self.parent = parent
        self.user = user

        # Crear frame para el botón de logout
        top_frame = ttk.Frame(parent)
        top_frame.pack(fill="x", padx=10, pady=5)
        
        ttk.Button(
            top_frame,
            text="🚪 Cerrar Sesión",
            command=self.logout
        ).pack(side="right")
        
        ttk.Label(
            top_frame,
            text=f"Bienvenido, {user[1]}",
            font=("Arial", 10, "bold")
        ).pack(side="left")

        self.create_tab = CreateMatchView(self, user)
        self.join_tab = JoinMatchView(self, user)
        self.user_tab = UserView(self, user)

        self.add(self.create_tab, text="📝 Crear Partido")
        self.add(self.join_tab, text="👥 Ver / Unirse")
        self.add(self.user_tab, text="👤 Mi Perfil")

        self.pack(expand=True, fill="both")
    
    def logout(self):
        if messagebox.askyesno("Cerrar Sesión", "¿Estás seguro de que quieres cerrar sesión?"):
            # Limpiar la ventana actual
            for widget in self.parent.winfo_children():
                widget.destroy()
            # Importar aquí para evitar circular import
            from ui.login_view import LoginView
            LoginView(self.parent)