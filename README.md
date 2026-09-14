# Actividad-de-redes-ind
Escáner de Red - TP Redes 
Aplicación web cliente-servidor desarrollada para detección y diagnóstico de dispositivos activos dentro de un rango de direcciones IPv4 local mediante ICMP y resolución de nombres DNS.

Tecnologías Usadas
Backend: Node.js, Express, CORS, módulo nativo child_process (exec).

Frontend: React, JavaScript (ES6+), HTML5, CSS.

Arquitectura del Proyecto
.
├── server.js          # Servidor Backend Express (Procesamiento de ping y nslookup)
├── src/
│   └── App.jsx        # Interfaz gráfica cliente en React (Validación, iteración e interfaz)
├── .gitignore         # Archivo de exclusión para Git
└── package.json       # Configuración de módulos y dependencias

Funcionalidades Implementadas
Validación de Red en Tiempo Real: Verificación sintáctica de direcciones IPv4 mediante expresiones regulares (regex) directamente en los campos de entrada.

Conversión y Cálculo de Rangos: Transformación de direcciones IPv4 a formato entero de 32 bits (ipToLong / longToIp) para iterar secuencialmente entre IP inicial e IP final.

Detección de Conectividad (ICMP): Ejecución del comando de sistema ping -n 1 -w [timeout] identificando la presencia del parámetro TTL= para validar respuestas activas.

Resolución de Nombres (DNS): Ejecución subordinada del comando nslookup para obtener el nombre de dominio/equipo (hostname) asignado a las direcciones activas.

Métricas y Progreso: Barra de progreso con porcentaje de avance dinámico y conteo de equipos con respuesta exitosa.

Organización de Datos: Filtro de búsqueda global en vivo (por IP, nombre o estado) y ordenamiento dinámico por IP (numérico), nombre (alfabético) y estado (conectado/desconectado).

Exportación de Informes: Generación de archivos de reporte en formato CSV mediante objetos Blob cliente.

Requisitos del Sistema
Node.js v16.0.0 o superior

Sistema Operativo Windows (debido a los flags -n y -w del comando ping del sistema)

Instalación y Ejecución
Clonar el repositorio:

Bash
git clone https://github.com/Raxter97/Actividad-de-redes-ind.git
cd Actividad-de-redes-ind
Iniciar el Servidor Backend:

Bash
npm install express cors
node server.js
El servidor quedará a la escucha en http://localhost:3000.

Iniciar la Aplicación Frontend:
En una segunda consola, dentro del directorio del proyecto React:

Bash
npm install
npm run dev
Abrir en el navegador la dirección generada por Vite (ej. http://localhost:5173).