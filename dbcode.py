 #importancion:
import tkinter as tk
from tkinter import messagebox , ttk , font
from Fuchinder import AppFutbol

pantalla =tk.Tk()
pantalla.title("Fuchinder")
pantalla.geometry("500x600")

ventana_re = tk.Tk()
ventana_re.title("registro")
ventana_re.geometry("500x600")

tk.Label(ventana_re, text="REGISTRO", font=("arial", 30,"bold","underline")).pack(padx=100, pady=50)

#USUARIO
button1 = tk.Label()
tk.Label(ventana_re, text="Usuario", justify= "center", font=("arial",10)).place(x=220, y= 170)
regi_usuario = tk.Entry(ventana_re, justify="center")
regi_usuario.place(x=100, y=200, height=30, width=300)

#MATRICULA
tk.Label(ventana_re, text="Matricula", justify= "center", font=("arial",10)).place(x=215, y= 270)
regi_matri = tk.Entry(ventana_re, justify="center")
regi_matri.place(x=100, y=300, height=30, width=300)

#CONTRASEÑA
tk.Label(ventana_re, text="Contraseña", justify= "center", font=("arial",10)).place(x=213, y= 370)
regi_contra = tk.Entry(ventana_re, justify="center")
regi_contra.place(x=100, y=400, height=30, width=300)

#cargo los datos de usuario 

Datos = None
def guardar():
   global datos1
   usuario1 = regi_usuario.get()
   matricula1 = regi_matri.get()
   contraseña1 = regi_contra.get()
   datos1 = (usuario1,matricula1,contraseña1)
   if not usuario1 or not matricula1 or not contraseña1:
      messagebox.showwarning("QUE MANDAN CHAT", "COMPLETA LOS CAMPOS GIL")
      regi_usuario.delete(0,tk.END)
      regi_contra.delete(0,tk.END)
      regi_matri.delete(0,tk.END)
     
   else:
      ventana_re.destroy()

boton_regi = tk.Button(ventana_re,text="Registrar", height=2, width=15,justify="center",command= guardar,bg="#4CAF50", fg= "white")
boton_regi.place(anchor="center",relx=0.5,rely=0.8,relwidth=0.6)

#Fuchinder

tk.Label(pantalla, font=("arial",30,"bold","underline"),text="FUCHINDER",justify="center").pack(pady=70)

   # creo apartado de login

tk.Label(pantalla, text="Usuario").place(x=220,y=170)
entra_usuario = tk.Entry(pantalla,justify="center")
entra_usuario.place(x=100, y=200 ,height=30, width= 300)

tk.Label(pantalla, text="Contraseña").place(x=220,y=370)
entra_contraseña = tk.Entry(pantalla,justify="center")
entra_contraseña.place(x=100, y=300 ,height=30, width= 300)

tk.Label(pantalla, text="Matricula").place(x=220,y=270)
entra_matricula = tk.Entry(pantalla,justify="center")
entra_matricula.place(x=100, y=400 ,height=30, width= 300)
      
def login():
   usuario = entra_usuario.get()
   Matricula = entra_matricula.get()
   contraseña = entra_contraseña.get()
   datos = (usuario,Matricula,contraseña)
   print    (datos)
   
   if datos1 is None:
        messagebox.showwarning("Error", "Primero registrate")
        return
  
   if (datos == datos1):
            messagebox.showinfo("titulo","acceso concedido")
            for widget in pantalla.winfo_children():
                  widget.destroy()
            AppFutbol(root=pantalla)
                  
   else:
               messagebox.showerror("titulo","acceso denagado")
               acces = False
               reiniciar()
               
def reiniciar():
      entra_usuario.delete(0,tk.END)
      entra_contraseña.delete(0,tk.END)
      entra_matricula.delete(0,tk.END)
         
buton_login = tk.Button(pantalla, text= "Login", padx=15,pady=10, command=login, bg="#4CAF50", fg= "white").place(anchor="center",relx=0.5,rely=0.8,relwidth=0.6)

tk.Pack()
#acceder a Fuchinder    

pantalla.mainloop()
    
    

    
    
