# Actividad-de-redes-ind
Escáner de Red - TP Redes 
Aplicación web cliente-servidor desarrollada para detección y diagnóstico de dispositivos activos dentro de un rango de direcciones IPv4 local mediante ICMP y resolución de nombres DNS.
14/6 (Backend, Infraestructura y Lógica de Red): Enfoque en la arquitectura base, servidor Express, ejecución de comandos del sistema (ping/nslookup) y validaciones esenciales de entrada en React.

17/9 (Frontend Avanzado, Procesamiento de Datos y Exportación): Enfoque en la experiencia de usuario (barra de progreso, contadores), filtrado/ordenamiento dinámico, exportación a CSV y configuración del control de versiones.

## Tecnologías Utilizadas
- **Backend:** Node.js, Express, CORS, módulo nativo `child_process` (`exec`).
- **Frontend:** React, JavaScript (ES6+), HTML5, CSS.

## Arquitectura del Proyecto
.
├── server.js          # Servidor Backend Express (Procesamiento de ping y nslookup)
├── src/
│   └── App.jsx        # Interfaz gráfica cliente en React (Validación, iteración e interfaz)
├── .gitignore         # Archivo de exclusión para Git
└── package.json       # Configuración de módulos y dependencias

## Historial de Desarrollo por Días

### 14/9 : Arquitectura Base, Backend e Integración de Red
- **Inicialización del Entorno:** Estructuración del proyecto dividido en carpetas `Backend` (Node.js/Express) y `Frontend` (React con Vite).
- **Desarrollo del Backend (`server.js`):**
  - Implementación del endpoint `/api/scan` con habilitación de middleware `cors`.
  - Integración del módulo nativo `child_process.exec` para ejecutar comandos del sistema operativo.
  - Lógica de diagnóstico ICMP mediante `ping -n 1 -w [timeout]` identificando la presencia del parámetro `TTL=`.
  - Lógica de resolución DNS inversa con `nslookup` parseando el valor de `Name:` / `Nombre:`.
- **Lógica de Red en Frontend (`App.jsx`):**
  - Maquetado base del formulario para la IP de Inicio, IP de Fin y Timeout.
  - Expresión regular (`regex`) para validación sintáctica de formato IPv4 en tiempo real.
  - Implementación de funciones bitwise (`ipToLong` y `longToIp`) para convertir direcciones IP a enteros de 32 bits e iterar secuencialmente el rango.

### 17/9 : UI/UX, Filtros, Exportación y Configuración del Repositorio
- **Mejoras en la Interfaz de Usuario:**
  - Implementación de la barra de progreso calculada sobre el total de direcciones a escanear.
  - Contador dinámico de dispositivos activos identificados.
  - Renderizado condicional en la tabla de resultados con estilos diferenciados según el estado del dispositivo.
- **Procesamiento e Interacción de Datos:**
  - Implementación de un filtro global en tiempo real que evalúa coincidentes en IP, Nombre o Estado.
  - Lógica de ordenamiento dinámico por IP (numérico de 32 bits), Nombre (alfabético) y Estado.
- **Exportación de Informes:**
  - Función `guardarResultados` para generar y descargar un reporte estructurado en formato `.csv` utilizando objetos `Blob` cliente.
- **Publicación y Control de Versiones:**
  - Configuración de exclusiones con `.gitignore` para omitir `node_modules`.
  - Inicialización, vinculación y sincronización con el repositorio remoto en GitHub.
  - Redacción de la documentación técnica en `README.md`.

## Requisitos del Sistema
- Node.js v16.0.0 o superior.
- Sistema Operativo Windows (debido a las banderas `-n` y `-w` del comando `ping` del sistema).

## Instalación y Ejecución

1. **Clonar el repositorio:**
   ```bash
   git clone [https://github.com/Raxter97/Actividad-de-redes-ind.git](https://github.com/Raxter97/Actividad-de-redes-ind.git)
   cd Actividad-de-redes-ind
Iniciar el Servidor Backend:
cd Backend
npm install express cors
node server.js

Iniciar la Aplicación Frontend:
En una segunda terminal:
cd Frontend
npm install
npm run dev
---------------------------------------------------------------------------

# Actividad-de-redes-ind
Escáner de Red - TP Redes 

Aplicación web cliente-servidor desarrollada para la detección y diagnóstico de dispositivos activos dentro de un rango de direcciones IPv4 local mediante ICMP y resolución de nombres DNS.

**14/9 (Backend, Infraestructura y Lógica de Red):** Enfoque en la arquitectura base, servidor Express, ejecución de comandos del sistema (`ping`/`nslookup`) y validaciones esenciales de entrada en React.

**17/9 (Frontend Avanzado, Procesamiento de Datos y Exportación):** Enfoque en la experiencia de usuario (barra de progreso, contadores, modo oscuro), filtrado/ordenamiento dinámico, exportación a CSV y configuración del control de versiones.

## Tecnologías Utilizadas
- **Backend:** Node.js, Express, CORS, módulo nativo `child_process` (`exec`).
- **Frontend:** React, JavaScript (ES6+), HTML5, CSS inline (Dark Theme).

## Arquitectura del Proyecto
.
├── server.js          # Servidor Backend Express (Procesamiento de ping y nslookup)
├── src/
│   └── App.jsx        # Interfaz gráfica cliente en React (Validación, iteración e interfaz)
├── .gitignore         # Archivo de exclusión para Git
└── package.json       # Configuración de módulos y dependencias

## Historial de Desarrollo por Días

### 14/9: Arquitectura Base, Backend e Integración de Red
- **Inicialización del Entorno:** Estructuración del proyecto dividido en carpetas `Backend` (Node.js/Express) y `Frontend` (React con Vite).
- **Desarrollo del Backend (`server.js`):**
  - Implementación del endpoint `/api/scan` con middleware `cors` habilitado.
  - Integración del módulo nativo `child_process.exec` para ejecutar comandos del sistema operativo.
  - Diagnóstico ICMP con `ping -n 1 -w [timeout]` identificando la presencia del parámetro `TTL=`.
  - Resolución DNS inversa mediante `nslookup` parseando el valor `Name:` / `Nombre:` (retornando "No resuelto" ante fallos).
- **Lógica de Red en Frontend (`App.jsx`):**
  - Maquetado del formulario de entrada: `IP Inicio (ej. 192.168.1.1)`, `IP Fin (ej. 192.168.1.10)` y `Timeout (ms)` (valor por defecto: 1000).
  - Expresión regular (`regex`) para validación sintáctica de formato IPv4 en tiempo real con resaltado de bordes en rojo ante entradas inválidas.
  - Implementación de funciones bitwise (`ipToLong` y `longToIp`) para convertir direcciones IP a enteros de 32 bits e iterar secuencialmente el rango.

### 17/9: UI/UX, Filtros, Exportación y Configuración del Repositorio
- **Diseño de Interfaz (Dark Theme):**
  - Estilizado general con fondo oscuro y paleta de alto contraste.
  - Tabla de resultados con 4 columnas: `Dirección IP`, `Nombre del Equipo`, `Estado` y `Tiempo de Respuesta`.
  - Diferenciación visual de estados: resaltado de filas en color rojo oscuro (`#4b0e17`) para dispositivos desconectados.
  - Barra de progreso superior en verde (`#4caf50`) con animación de llenado dinámico.
  - Panel de control con botones dedicados: `Comenzar`, `Limpiar` y `Guardar CSV`.
- **Procesamiento e Interacción de Datos:**
  - Contador dinámico de dispositivos activos: `Equipos activos que respondieron: X`.
  - Filtro global en tiempo real (`Filtrar por IP, Nombre o Estado...`).
  - Menú desplegable para ordenamiento dinámico (`Ordenar por IP`, `Ordenar por Nombre`, `Ordenar por Estado`).
- **Exportación de Informes:**
  - Función `guardarResultados` para generar y descargar un archivo `resultados_red.csv` estructurado con los datos escaneados mediante objetos `Blob`.
- **Publicación y Control de Versiones:**
  - Exclusión de `node_modules` mediante `.gitignore`.
  - Vinculación e integración de ramas locales con el repositorio remoto de GitHub.
  - Redacción y maquetado de la documentación técnica en `README.md`.

## Requisitos del Sistema
- Node.js v16.0.0 o superior.
- Sistema Operativo Windows (requerido por las banderas `-n` y `-w` del comando `ping`).

## Instalación y Ejecución

1. **Clonar el repositorio:**
   ```bash
   git clone [https://github.com/Raxter97/Actividad-de-redes-ind.git](https://github.com/Raxter97/Actividad-de-redes-ind.git)
   cd Actividad-de-redes-ind

