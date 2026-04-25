import tkinter as tk
from tkinter import ttk, messagebox
import sqlite3

from models.user_model import login, login_by_matricula, create_user, user_exists_by_username, user_exists_by_matricula


class LoginView(ttk.Frame):
    def __init__(self, parent):
        super().__init__(parent)

        self.parent = parent

        notebook = ttk.Notebook(self)

        self.login_tab = LoginTab(notebook, self.parent)
        self.register_tab = RegisterTab(notebook)

        notebook.add(self.login_tab, text="Login")
        notebook.add(self.register_tab, text="Crear Usuario")

        notebook.pack(expand=True, fill="both")
        self.pack(expand=True, fill="both")


class LoginTab(ttk.Frame):
    def __init__(self, parent, root):
        super().__init__(parent)

        self.root = root
        
        main_frame = ttk.Frame(self)
        main_frame.pack(padx=20, pady=20)
        
        # Opción de login
        ttk.Label(main_frame, text="Iniciar Sesión con:", font=("Arial", 10, "bold")).grid(row=0, column=0, columnspan=2, pady=10)
        
        self.login_method = tk.StringVar(value="username")
        ttk.Radiobutton(main_frame, text="Usuario", variable=self.login_method, value="username").grid(row=1, column=0, pady=5)
        ttk.Radiobutton(main_frame, text="Matrícula", variable=self.login_method, value="matricula").grid(row=1, column=1, pady=5)

        ttk.Label(main_frame, text="Usuario/Matrícula:").grid(row=2, column=0, sticky="w", pady=5)
        self.user = ttk.Entry(main_frame, width=30)
        self.user.grid(row=2, column=1, pady=5, padx=10)

        ttk.Label(main_frame, text="Contraseña:").grid(row=3, column=0, sticky="w", pady=5)
        self.passw = ttk.Entry(main_frame, show="*", width=30)
        self.passw.grid(row=3, column=1, pady=5, padx=10)

        ttk.Button(main_frame, text="Ingresar", command=self.do_login).grid(row=4, column=0, columnspan=2, pady=20)

    def do_login(self):
        login_input = self.user.get().strip()
        password = self.passw.get().strip()
        method = self.login_method.get()

        if not login_input or not password:
            messagebox.showerror("Error", "Complete todos los campos")
            return

        if method == "username":
            user = login(login_input, password)
        else:
            user = login_by_matricula(login_input, password)

        if not user:
            messagebox.showerror("Error", "Credenciales incorrectas")
            return

        # Destruir todo y crear MainView
        for widget in self.root.winfo_children():
            widget.destroy()
        
        # Importar aquí para evitar circular import
        from ui.main_view import MainView
        MainView(self.root, user)


class RegisterTab(ttk.Frame):
    def __init__(self, parent):
        super().__init__(parent)
        
        main_frame = ttk.Frame(self)
        main_frame.pack(padx=20, pady=20)

        ttk.Label(main_frame, text="Usuario:").grid(row=0, column=0, sticky="w", pady=5)
        self.user = ttk.Entry(main_frame, width=30)
        self.user.grid(row=0, column=1, pady=5, padx=10)

        ttk.Label(main_frame, text="Contraseña:").grid(row=1, column=0, sticky="w", pady=5)
        self.passw = ttk.Entry(main_frame, show="*", width=30)
        self.passw.grid(row=1, column=1, pady=5, padx=10)

        ttk.Label(main_frame, text="Confirmar Contraseña:").grid(row=2, column=0, sticky="w", pady=5)
        self.confirm_passw = ttk.Entry(main_frame, show="*", width=30)
        self.confirm_passw.grid(row=2, column=1, pady=5, padx=10)

        ttk.Label(main_frame, text="Matrícula (única):").grid(row=3, column=0, sticky="w", pady=5)
        self.matricula = ttk.Entry(main_frame, width=30)
        self.matricula.grid(row=3, column=1, pady=5, padx=10)
        
        ttk.Label(main_frame, text="* La matrícula es personal e irrepetible", foreground="gray").grid(row=4, column=0, columnspan=2)

        ttk.Button(main_frame, text="Crear cuenta", command=self.register).grid(row=5, column=0, columnspan=2, pady=20)

    def register(self):
        username = self.user.get().strip()
        password = self.passw.get().strip()
        confirm = self.confirm_passw.get().strip()
        matricula = self.matricula.get().strip()

        if not username or not password or not confirm or not matricula:
            messagebox.showerror("Error", "Todos los campos son obligatorios")
            return

        if password != confirm:
            messagebox.showerror("Error", "Las contraseñas no coinciden")
            return

        if user_exists_by_username(username):
            messagebox.showerror("Error", "El nombre de usuario ya existe")
            return

        if user_exists_by_matricula(matricula):
            messagebox.showerror("Error", "La matrícula ya está registrada")
            return

        if create_user(username, password, matricula):
            messagebox.showinfo("Éxito", "Usuario creado correctamente")
            self.user.delete(0, tk.END)
            self.passw.delete(0, tk.END)
            self.confirm_passw.delete(0, tk.END)
            self.matricula.delete(0, tk.END)
        else:
            messagebox.showerror("Error", "No se pudo crear el usuario")