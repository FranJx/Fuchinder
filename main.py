import tkinter as tk
from tkinter import ttk

from database import init_db
from ui.login_view import LoginView


def main():
    root = tk.Tk()
    root.title("Sistema de Gestión de Partidos de Fútbol")
    root.geometry("800x600")
    
    # Configurar estilo
    style = ttk.Style()
    style.theme_use('clam')
    
    # Inicializar base de datos
    init_db()
    
    # Mostrar login
    LoginView(root)
    
    root.mainloop()


if __name__ == "__main__":
    main()