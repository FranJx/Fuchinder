#esta linea basicamente toma la libreria de tkinter (son un montones de interfaces ya creadas anteriormente)
import tkinter as tk
from tkinter import messagebox, ttk
from tkinter import font

#class es el molde de un objeto, en este caso el molde d toda la app, y el init es el constructor que se ejecuta al crear la clase
class AppFutbol:

    #en el init se definen los elementos d la app: etiquetas, botones, cuadros de texto, etc
    def __init__(self, root):
        self.root = root
        self.root.title("Fuchinder - Organizador de Partidos de Fútbol")
        self.root.geometry("700x600")
        
        self.lista_partidos = []

        #label significa etiqueta, es el texto que se muestra en la app y le das la fuente, tamaño, estilo y pack son los pixeles de espacio entre la ventana y el texto (y: vert, x: horiz)
        tk.Label(root, text="ORGANIZA TU PARTIDO CON LOS PIBES", font=("Arial", 20, "bold", "underline")).pack(pady=10)

        #el el tk.labelframe toma el texto que le diste y hace un recuadro alrededor
        frame_form = tk.LabelFrame(root, text=" Crear Nuevo Partido ",font=("Arial", 12, "bold"), padx=10, pady=10)
        frame_form.pack(padx=20, pady=10, fill="x")

        tk.Label(frame_form, text="Fecha (DD/MM):").grid(row=0, column=0, sticky="w")
        #el entry es el cuadro de texto donde el usuario va a escribir la fecha
        self.entry_fecha = tk.Entry(frame_form)
        self.entry_fecha.grid(row=0, column=1, pady=5)

        tk.Label(frame_form, text="Hora (HH:MM):").grid(row=1, column=0, sticky="w")
        self.entry_hora = tk.Entry(frame_form)
        self.entry_hora.grid(row=1, column=1, pady=5)

        tk.Label(frame_form, text="Tipo de Partido:").grid(row=2, column=0, sticky="w")
        self.combo_tipo = ttk.Combobox(frame_form, values=["5v5", "7v7", "11v11"], state="readonly")
        self.combo_tipo.current(0)  #Selecciona el primer valor por defecto
        self.combo_tipo.grid(row=2, column=1, pady=5)

        tk.Label(frame_form, text="Cupos Totales:").grid(row=3, column=0, sticky="w")
        self.entry_cupos = tk.Entry(frame_form)
        self.entry_cupos.grid(row=3, column=1, pady=5)

        #el tk.button es un boton y el comand es lo que va a ejecutar al tocar el boton (osea te lleva a crear_partido)
        btn_crear = tk.Button(frame_form, text="Crear Partido", command=self.crear_partido, bg="#4CAF50", fg="white") #fg es el color del texto y bg el color del boton
        btn_crear.grid(row=4, columnspan=2, pady=10)

        # el root es la ventana principal (osea la etiqueta esta dentro de la ventana)
        tk.Label(root, text="Partidos Disponibles:", font=("Arial", 12, "bold")).pack(anchor="w", padx=25)
        
        #ttk.treeview es una tabla, con columnas id, tipo, cupos,etc, y el show="headings" hace que solo se muestren los encabezados de las columnas 
        self.tree = ttk.Treeview(root, columns=("ID", "Tipo", "Fecha", "Cupos"), show="headings", height=8)
        self.tree.heading("ID", text="ID")
        self.tree.heading("Tipo", text="Tipo")
        self.tree.heading("Fecha", text="Fecha")
        self.tree.heading("Cupos", text="Libres")
        #el width es el ancho de la columna
        self.tree.column("ID", width=30)
        #el fill es para que la tabla ocupe todo el espacio 
        self.tree.pack(padx=20, pady=5, fill="both")

        btn_unirse = tk.Button(root, text="Unirse al Partido Seleccionado", command=self.unirse_partido, bg="#2196F3", fg="white")
        btn_unirse.pack(pady=10)

  #aca creamos una funcion para crear un partido, que toma todos los valores 
    def crear_partido(self):
        fecha = self.entry_fecha.get()
        hora = self.entry_hora.get()
        tipo = self.combo_tipo.get()
        cupos = self.entry_cupos.get()

        #por si no ponen nada sale un msj que dice que complete los campos
        if not fecha or not hora or not cupos:
            messagebox.showwarning("Atención", "Por favor completa todos los campos.")
            return
        
    #el try except es por si el usuario ingresa un valor q no es numerico en algunos d los campos (en ese caso salta error)
        try:
            nuevo_partido = {
                "id": len(self.lista_partidos) + 1,
                "fecha": f"{fecha} - {hora}",
                "tipo": tipo,
                "cupos_totales": int(cupos),
                "anotados": 0
            }
            self.lista_partidos.append(nuevo_partido)
            self.actualizar_tabla()
            messagebox.showinfo("Éxito", "Partido creado correctamente.")
            self.entry_fecha.delete(0, tk.END)
            self.entry_hora.delete(0, tk.END)
            self.entry_cupos.delete(0, tk.END)
        except ValueError:
            messagebox.showerror("Error", "Debe ser un número.")

    def actualizar_tabla(self):
        #este for borra todos los items de la tabla para poner nuevos datos
        for item in self.tree.get_children():
            self.tree.delete(item)
        
        for p in self.lista_partidos:
            libres = p['cupos_totales'] - p['anotados']
            self.tree.insert("", "end", values=(p['id'], p['tipo'], p['fecha'], libres))

    def unirse_partido(self):
       
        selected_item = self.tree.selection()

        #si no selecciona nada y toca el boton sale un msj que dice que seleccione un partido de la tabla
        if not selected_item:
            messagebox.showwarning("Atención", "Selecciona un partido de la lista.")
            return
        item_data = self.tree.item(selected_item)
        partido_id = item_data['values'][0]
     #el for busca el partido con el id seleccionado y si hay cupos disponibles suma uno, sino sale un msj que dice que no quedan cupos
        for p in self.lista_partidos:
            if p['id'] == partido_id:
                if p['anotados'] < p['cupos_totales']:
                    p['anotados'] += 1
                    self.actualizar_tabla()
                    messagebox.showinfo("¡Listo!", "Te has unido al partido.")
                else:
                    messagebox.showerror("Lleno", "Ya no quedan cupos en este partido.")
      

#aca se ejecuta la app, se crea la ventana y se le pasa a class AppFutbol para que se ejecute todo lo que esta dentro del init
if __name__ == "__main__":
    ventana = tk.Tk()
    app = AppFutbol(ventana)
    ventana.mainloop()