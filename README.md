# 🛍️ E-commerce INVITATE con MercadoPago

Proyecto de carrito de compras con integración de MercadoPago para procesamiento de pagos.

## 🛠 Tecnologías utilizadas
- **Frontend:** HTML5, CSS3, JavaScript (ES6+)
- **Backend:** Node.js, Express
- **SDK:** MercadoPago API v2
- **Librerías:**  
  - Toastify (notificaciones)  
  - SweetAlert2 (alertas personalizadas)  
  - Bootstrap Icons (íconos)

## ✨ Características principales
- 🛒 **Carrito interactivo** con gestión de productos  
- ➕➖ **Ajuste de cantidades** con validación (mínimo 1 unidad)  
- 🗑️ Eliminación individual de productos  
- 🧹 Opción para vaciar el carrito completo  
- 💳 **Integración con MercadoPago** (botón dinámico)  
- 📱 **Diseño responsive** (móviles y desktop)  
- 💾 Persistencia en `localStorage`

## 🚀 Cómo ejecutar el proyecto

### Requisitos
- Node.js (v14+)
- npm (v6+)
- Cuenta en MercadoPago

### Instalación
1. Clona el repositorio:
   ```bash
   git clone https://github.com/martinezlevin/invitate.git
   cd invitate
   ```

2. Instala las dependencias del servidor:
   ```bash
   cd server
   npm install
   ```

3. Configura tus credenciales de MercadoPago:  
   Crea un archivo `.env` en la carpeta `server` con el siguiente contenido:
   ```
   MP_ACCESS_TOKEN=TU_ACCESS_TOKEN_DE_MERCADOPAGO
   ```

4. Inicia el servidor:
   ```bash
   node index.js
   ```

5. Abre el cliente en tu navegador:
   ```
   http://localhost:3000
   ```

## 📂 Estructura del proyecto

```
invitate/
├── .gitignore               # Archivo para ignorar archivos en Git
├── README.md                # Documentación del proyecto
├── LICENSE.txt              # Licencia del proyecto
├── client/                  # Frontend (Interfaz de usuario)
│   ├── css/                 # Hojas de estilo CSS
│   │   ├── ajax-loader-gif  # Recursos para animaciones de carga
│   │   ├── main.css         # Estilos principales globales
│   │   ├── normalize.css    # Normalización de estilos entre navegadores
│   │   ├── product.css      # Estilos específicos para productos
│   │   ├── style.css        # Estilos generales adicionales
│   │   ├── swiper-bundle.min.css # Estilos para sliders Swiper.js
│   │   └── vendor.css       # Estilos de terceros / librerías
│   ├── images/              # Imágenes generales del sitio
│   ├── img/                 # Imágenes específicas para el carrito
│   ├── js/                  # Archivos JavaScript
│   │   ├── carrito.js       # Lógica y funcionalidades del carrito de compras
│   │   ├── jquery.min.js    # Librería jQuery minimizada
│   │   ├── main.js          # Script principal del frontend
│   │   ├── menu.js          # Control del menú y navegación
│   │   ├── modernizr.js     # Detección de características del navegador
│   │   ├── plugins.js       # Plugins y scripts adicionales
│   │   ├── productos.json   # Datos JSON de productos
│   │   ├── script.min.json  # JSON minimizado para scripts
│   │   └── SmoothScroll.js  # Script para scroll suave
│   ├── about.html           # Página “Acerca de”
│   ├── carrito.html         # Página del carrito de compras
│   ├── faq.html             # Página de Preguntas Frecuentes
│   ├── form.html            # Página con formularios
│   ├── index.html           # Página principal / home
│   ├── menu.html            # Página de menú o navegación
│   └── product.html         # Página de detalle de producto
└── server/                  # Backend (Servidor Express / API)
    ├── .env                 # Variables de entorno (no versionado)
    ├── index.js             # Archivo principal del servidor Node.js
    ├── package.json         # Archivo de configuración y dependencias de Node.js
    ├── package-lock.json    # Registro exacto de versiones instaladas
    └── node_modules/        # Dependencias instaladas (ignoradas por Git)

```

## 🔑 Credenciales de prueba

Para modo desarrollo, usa las credenciales de prueba de MercadoPago:

- **Public key:** `TEST-xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx`
- **Access token:** `TEST-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`

## 📝 Notas importantes
- El SDK de MercadoPago se carga dinámicamente.
- Los datos del carrito persisten en `localStorage`.
- El botón de pago se actualiza automáticamente según el carrito.
- **No uses credenciales reales en modo desarrollo.**

## 📄 Licencia

Copyright (c) 2025 Guillermo Martinez

Todos los derechos reservados.  

Este proyecto no está bajo una licencia open source.  
Queda estrictamente prohibida la copia, distribución, modificación, publicación, sublicencia o uso de este código sin autorización expresa y por escrito del titular de los derechos.

Cualquier uso no autorizado puede estar sujeto a acciones legales.

## ✉️ Contacto

- 📧 Email: gdmlevin@gmail.com  
- 💼 LinkedIn: [https://www.linkedin.com/in/martinezlevin/](https://www.linkedin.com/in/martinezlevin/)  
- 🐱 GitHub: [martinezlevin](https://github.com/martinezlevin)
