import tkinter as tk
from tkinter import ttk, messagebox
from tkcalendar import DateEntry
from datetime import datetime
import tkintermapview

# IMPORTANTE: Importar la función correctamente
from models.match_model import create_match


class LocationPicker:
    """Selector de ubicación con mapa interactivo"""
    
    def __init__(self, parent, callback):
        self.callback = callback
        
        # Ventana emergente para el mapa
        self.window = tk.Toplevel(parent)
        self.window.title("Seleccionar ubicación en el mapa")
        self.window.geometry("900x700")
        
        # Frame principal
        main_frame = ttk.Frame(self.window)
        main_frame.pack(fill="both", expand=True, padx=10, pady=10)
        
        # Frame superior para búsqueda
        search_frame = ttk.LabelFrame(main_frame, text="🔍 Buscar ubicación")
        search_frame.pack(fill="x", pady=(0, 10))
        
        search_inner = ttk.Frame(search_frame)
        search_inner.pack(padx=10, pady=10, fill="x")
        
        ttk.Label(search_inner, text="Dirección:").pack(side=tk.LEFT, padx=(0, 5))
        self.search_entry = ttk.Entry(search_inner, width=60)
        self.search_entry.pack(side=tk.LEFT, padx=(0, 10))
        ttk.Button(search_inner, text="🔍 Buscar", command=self.search_address).pack(side=tk.LEFT)
        
        # Frame para el mapa
        map_frame = ttk.Frame(main_frame)
        map_frame.pack(fill="both", expand=True)
        
        # Crear el widget del mapa
        self.map_widget = tkintermapview.TkinterMapView(
            map_frame, 
            width=850, 
            height=500, 
            corner_radius=10
        )
        self.map_widget.pack(fill="both", expand=True)
        
        # Configuración inicial - FIJADO EN POSADAS, MISIONES
        # Coordenadas de Av. Jauretche y Av. López y Planes, Posadas
        # Latitud: -27.3671, Longitud: -55.8960 (aproximado)
        # Podés ajustar estas coordenadas exactas si las tenés
        posadas_lat = -27.3671
        posadas_lon = -55.8960
        
        self.map_widget.set_position(posadas_lat, posadas_lon)
        self.map_widget.set_zoom(15)  # Zoom más cercano para ver las calles
        
        # Variable para guardar el marcador
        self.current_marker = None
        self.current_address = None
        self.current_coordinates = None
        
        # Conectar evento de clic en el mapa
        self.map_widget.add_left_click_map_command(self.on_map_click)
        
        # Frame inferior con la dirección seleccionada
        info_frame = ttk.LabelFrame(main_frame, text="📍 Ubicación seleccionada")
        info_frame.pack(fill="x", pady=(10, 0))
        
        self.address_label = ttk.Label(info_frame, text="Hacé clic en el mapa para seleccionar una ubicación", 
                                       wraplength=800, font=("Arial", 10))
        self.address_label.pack(padx=10, pady=10)
        
        # Botones de acción
        button_frame = ttk.Frame(main_frame)
        button_frame.pack(pady=10)
        
        ttk.Button(button_frame, text="✅ Confirmar ubicación", command=self.confirm, width=20).pack(side=tk.LEFT, padx=5)
        ttk.Button(button_frame, text="❌ Cancelar", command=self.window.destroy, width=15).pack(side=tk.LEFT, padx=5)
    
    def on_map_click(self, coordinates):
        """Cuando el usuario hace clic en el mapa"""
        lat, lon = coordinates
        self.current_coordinates = (lat, lon)
        
        # Limpiar marcador anterior si existe
        if self.current_marker:
            self.current_marker.delete()
        
        # Crear nuevo marcador en la posición clickeada
        self.current_marker = self.map_widget.set_marker(
            lat, 
            lon, 
            text="📍 Ubicación seleccionada"
        )
        
        # Centrar el mapa en el punto clickeado
        self.map_widget.set_position(lat, lon)
        
        # Obtener la dirección formateada desde las coordenadas
        self.get_formatted_address(lat, lon)
    
    def get_formatted_address(self, lat, lon):
        """Convierte coordenadas a dirección formateada: Calle y Número, Localidad, Provincia, Código Postal"""
        try:
            import urllib.request
            import json
            
            url = f"https://nominatim.openstreetmap.org/reverse?format=json&lat={lat}&lon={lon}&addressdetails=1"
            headers = {'User-Agent': 'MiAppFutbol/1.0'}
            req = urllib.request.Request(url, headers=headers)
            
            with urllib.request.urlopen(req) as response:
                data = json.loads(response.read())
                
                if 'address' in data:
                    address = data['address']
                    
                    # Construir dirección formateada
                    formatted_parts = []
                    
                    # Calle y número
                    street = ""
                    if 'road' in address:
                        street = address['road']
                    elif 'pedestrian' in address:
                        street = address['pedestrian']
                    
                    house_number = address.get('house_number', '')
                    
                    if street and house_number:
                        formatted_parts.append(f"{street} {house_number}")
                    elif street:
                        formatted_parts.append(street)
                    
                    # Localidad/Barrio
                    if 'suburb' in address:
                        formatted_parts.append(address['suburb'])
                    elif 'neighbourhood' in address:
                        formatted_parts.append(address['neighbourhood'])
                    elif 'city_district' in address:
                        formatted_parts.append(address['city_district'])
                    
                    # Ciudad/Provincia
                    city = ""
                    if 'city' in address:
                        city = address['city']
                    elif 'town' in address:
                        city = address['town']
                    elif 'village' in address:
                        city = address['village']
                    
                    if city:
                        formatted_parts.append(city)
                    
                    # Provincia/Estado
                    if 'state' in address:
                        formatted_parts.append(address['state'])
                    
                    # Código Postal
                    if 'postcode' in address:
                        formatted_parts.append(address['postcode'])
                    
                    # País
                    if 'country' in address and len(formatted_parts) < 4:
                        formatted_parts.append(address['country'])
                    
                    if formatted_parts:
                        self.current_address = ", ".join(formatted_parts)
                        self.address_label.config(text=f"📍 {self.current_address}")
                    else:
                        self.current_address = f"{lat:.6f}, {lon:.6f}"
                        self.address_label.config(text=f"📌 Coordenadas: {self.current_address}")
                else:
                    self.current_address = f"{lat:.6f}, {lon:.6f}"
                    self.address_label.config(text=f"📌 Coordenadas: {self.current_address}")
                    
        except Exception as e:
            print(f"Error obteniendo dirección: {e}")
            self.current_address = f"{lat:.6f}, {lon:.6f}"
            self.address_label.config(text=f"📌 Coordenadas: {self.current_address}")
    
    def search_address(self):
        """Busca una dirección y posiciona el mapa"""
        address = self.search_entry.get().strip()
        if not address:
            messagebox.showwarning("Advertencia", "Ingresá una dirección para buscar")
            return
        
        try:
            # Posicionar el mapa según la dirección buscada
            self.map_widget.set_address(address)
            messagebox.showinfo("Info", f"🔍 Mostrando: {address}\n🎯 Hacé clic en el mapa para seleccionar la ubicación exacta")
        except Exception as e:
            messagebox.showerror("Error", f"No se pudo encontrar la dirección: {e}")
    
    def confirm(self):
        """Confirma la selección y cierra"""
        if self.current_address:
            # Llamar al callback con la dirección formateada
            self.callback(self.current_address)
            self.window.destroy()
        else:
            messagebox.showwarning("Advertencia", "⚠️ Primero hacé clic en el mapa para seleccionar una ubicación")


class CreateMatchView(ttk.Frame):
    def __init__(self, parent, user):
        super().__init__(parent)

        self.user = user
        
        # Frame principal con scroll
        canvas = tk.Canvas(self)
        scrollbar = ttk.Scrollbar(self, orient="vertical", command=canvas.yview)
        scrollable_frame = ttk.Frame(canvas)
        
        scrollable_frame.bind(
            "<Configure>",
            lambda e: canvas.configure(scrollregion=canvas.bbox("all"))
        )
        
        canvas.create_window((0, 0), window=scrollable_frame, anchor="nw")
        canvas.configure(yscrollcommand=scrollbar.set)
        
        main_frame = scrollable_frame
        main_frame.pack(fill="both", expand=True)
        
        # Contenido del formulario
        form_frame = ttk.Frame(main_frame)
        form_frame.pack(padx=20, pady=20)

        # Nombre del partido
        ttk.Label(form_frame, text="Nombre del partido:", font=("Arial", 10)).grid(row=0, column=0, sticky="w", pady=5)
        self.title = ttk.Entry(form_frame, width=50, font=("Arial", 10))
        self.title.grid(row=0, column=1, pady=5, padx=10)

        # Formato de juego (Combobox)
        ttk.Label(form_frame, text="Formato de juego:", font=("Arial", 10)).grid(row=1, column=0, sticky="w", pady=5)
        self.players = ttk.Combobox(form_frame, values=["5vs5", "7vs7", "10vs10", "12vs12"], width=47, state="readonly")
        self.players.set("5vs5")
        self.players.grid(row=1, column=1, pady=5, padx=10)

        # Ubicación con selector de mapa
        ttk.Label(form_frame, text="Ubicación:", font=("Arial", 10)).grid(row=2, column=0, sticky="w", pady=5)
        location_frame = ttk.Frame(form_frame)
        location_frame.grid(row=2, column=1, pady=5, padx=10, sticky="w")
        
        self.location = ttk.Entry(location_frame, width=40, font=("Arial", 10))
        self.location.pack(side=tk.LEFT)
        
        ttk.Button(
            location_frame, 
            text="🗺️ Seleccionar en mapa", 
            command=self.open_location_picker
        ).pack(side=tk.LEFT, padx=5)

        # Fecha con DatePicker
        ttk.Label(form_frame, text="Fecha:", font=("Arial", 10)).grid(row=3, column=0, sticky="w", pady=5)
        self.date = DateEntry(form_frame, width=47, date_pattern='yyyy-mm-dd', font=("Arial", 10))
        self.date.grid(row=3, column=1, pady=5, padx=10)

        # Hora
        ttk.Label(form_frame, text="Hora:", font=("Arial", 10)).grid(row=4, column=0, sticky="w", pady=5)
        hour_frame = ttk.Frame(form_frame)
        hour_frame.grid(row=4, column=1, pady=5, padx=10, sticky="w")
        
        self.hour = ttk.Spinbox(hour_frame, from_=0, to=23, width=5, format="%02.0f", font=("Arial", 10))
        self.hour.set(datetime.now().hour)
        self.hour.pack(side=tk.LEFT)
        
        ttk.Label(hour_frame, text=":", font=("Arial", 14)).pack(side=tk.LEFT)
        
        self.minute = ttk.Spinbox(hour_frame, from_=0, to=59, width=5, format="%02.0f", font=("Arial", 10))
        self.minute.set(datetime.now().minute)
        self.minute.pack(side=tk.LEFT)

        # Botón crear
        ttk.Button(
            form_frame,
            text="✨ Crear Partido",
            command=self.create,
            width=30
        ).grid(row=5, column=0, columnspan=2, pady=20)

        canvas.pack(side="left", fill="both", expand=True)
        scrollbar.pack(side="right", fill="y")

    def open_location_picker(self):
        """Abre el selector de ubicación con mapa"""
        LocationPicker(self, self.set_location)

    def set_location(self, address):
        """Establece la dirección seleccionada en el campo de texto"""
        self.location.delete(0, tk.END)
        self.location.insert(0, address)

    def create(self):
        """Crea el partido con los datos ingresados"""
        # Validaciones
        if not self.title.get().strip():
            messagebox.showerror("Error", "❌ Ingrese un nombre para el partido")
            return
        
        # Obtener número de jugadores desde el formato "5vs5", "7vs7", etc.
        format_str = self.players.get()
        players = int(format_str.split('vs')[0])
        
        if not self.location.get().strip():
            messagebox.showerror("Error", "❌ Ingrese una ubicación (podés usar el mapa 🗺️)")
            return
        
        # Combinar fecha y hora
        datetime_str = f"{self.date.get()} {int(self.hour.get()):02d}:{int(self.minute.get()):02d}"
        
        # Crear el partido
        try:
            create_match(
                self.title.get().strip(),
                players,
                self.location.get().strip(),
                datetime_str,
                self.user[0]  # ID del usuario creador
            )
            messagebox.showinfo("Éxito", "✅ Partido creado correctamente")
            
            # Limpiar campos
            self.title.delete(0, tk.END)
            self.location.delete(0, tk.END)
            
        except Exception as e:
            messagebox.showerror("Error", f"❌ No se pudo crear el partido: {str(e)}")