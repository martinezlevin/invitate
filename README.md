# 🛍️ E-commerce con MercadoPago

Proyecto de carrito de compras con integración de MercadoPago para procesamiento de pagos.

## 🛠 Tecnologías utilizadas
- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Backend**: Node.js, Express
- **SDK**: MercadoPago API v2
- **Librerías**: 
  - Toastify (notificaciones)
  - SweetAlert2 (alertas personalizadas) 
  - Bootstrap Icons (íconos)

## ✨ Características principales
- 🛒 **Carrito interactivo** con gestión de productos
- ➕➖ **Ajuste de cantidades** con validación (mínimo 1 unidad)
- 🗑️ Eliminación individual de productos
- 🧹 Opción para vaciar carrito completo
- 💳 **Integración con MercadoPago** (botón dinámico)
- 📱 **Diseño responsive** (móviles y desktop)
- 💾 Persistencia en localStorage

## 🚀 Cómo ejecutar el proyecto

### Requisitos
- Node.js (v14+)
- npm (v6+)
- Cuenta MercadoPago

### Instalación
1. Clona el repositorio:
```bash
git clone https://github.com/martinezlevin/e-shop.git
cd e-shop

2. Instala las dependencias del servidor:
cd e-commerce-desde-cero/server
npm install

3. Configura tus credenciales de MercadoPago:
Crea un archivo .env en la carpeta server con:
MP_ACCESS_TOKEN=TU_ACCESS_TOKEN_DE_MERCADOPAGO

4. Inicia el servidor:
node index.js

5. Abre el cliente en tu navegador:
http://localhost:3000

📂 Estructura del proyecto
e-commerce-desde-cero/
├── client/               # Frontend
│   ├── css/
│   │   └── main.css      # Estilos principales
│   ├── img/              # Imágenes del sitio
│   ├── js/
│   │   ├── carrito.js    # Lógica del carrito
│   │   ├── menu.js       # Lógica del menú
│   │   └── productos.js  # Datos de productos
│   ├── carrito.html      # Página del carrito
│   └── index.html        # Página principal
└── server/              # Backend
    ├── index.js          # Servidor Node.js
    └── package.json      # Dependencias

🔑 Credenciales de prueba
Para modo desarrollo, usa credenciales de prueba de MercadoPago.

Public key: TEST-xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx

Access token: TEST-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

📝 Notas importantes
SDK MercadoPago se carga dinámicamente

Datos persisten en localStorage

Botón se actualiza automáticamente

No uses credenciales reales en desarrollo

📄 Licencia

MIT License

✉️ Contacto

📧 Email: gdmlevin@gmail.com

💼 LinkedIn: Tu perfil

🐱 GitHub: martinezlevin