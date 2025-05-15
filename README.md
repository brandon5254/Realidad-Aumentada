# OMGEL -Tienda de Ropa Virtual con AR

# 👗 OMGEL - Tienda de Ropa Virtual con AR

Una tienda de ropa moderna con experiencia de prueba virtual usando realidad aumentada (AR), construida con React, TypeScript y una arquitectura serverless.

---

## 🚀 Características

- Autenticación de usuarios
- Panel de administración
- Experiencia de prueba virtual con AR
- Carrito de compras
- Lista de deseos
- Pasarela de pagos
- Búsqueda de productos
- Filtrado por categorías
- Diseño responsive
- Gestión de pedidos
- Reportes en tiempo real
- Gestión de inventario
- Sistema de notificaciones
- Múltiples idiomas (ES)
- Optimización SEO
- Imágenes responsivas
- Carga progresiva

---

## 🛠️ Tecnologías

### Frontend

- React 18
- TypeScript
- Tailwind CSS
- Vite
- React Router DOM
- Lucide React
- React Context API
- Custom Hooks

### Backend y Servicios

- **Firebase**
  - Authentication
  - Firestore
  - Cloud Storage
  - Cloud Functions
  - Hosting
  - Security Rules
  - Analytics, Performance, Error Reporting

### Realidad Aumentada (AR)

- Snap Camera Kit
- Lentes AR personalizados
- Detección facial en tiempo real
- Renderizado 3D

### Pasarela de Pagos

- PayPal SDK
  - Checkout
  - Webhooks
  - Sandbox

---

## 📦 Estructura del Proyecto

/
├── src/
│ ├── components/
│ ├── context/
│ ├── pages/
│ ├── types/
│ └── utils/
├── firebase/
└── public/

---

## 🔧 Configuración

### 1. Clona el repositorio

```bash
git clone https://github.com/tu-usuario/elegance.git
cd elegance

npm install

# .env
VITE_FIREBASE_API_KEY=...
VITE_PAYPAL_CLIENT_ID=...
VITE_SNAP_API_TOKEN=...

🚀 Comandos
🔨 Comandos principales

npm install       # Instala todas las dependencias del proyecto
npm run dev       # Inicia el servidor de desarrollo
npm run build     # Compila la aplicación para producción
npm run preview   # Muestra una vista previa del build
npm run lint      # Ejecuta el linter

🔧 Scripts útiles
npx tsx uploadProducts.ts   # Script para subir productos a Firebase

☁️ Comandos de Firebase
firebase login              # Inicia sesión en Firebase CLI
firebase init               # Inicializa la configuración
firebase deploy             # Despliega funciones, hosting y reglas

🗂️ Cloud Storage (requiere gsutil)
gsutil ls gs://tiendavirtuala/products/*  # Lista archivos de productos
gsutil ls gs://tiendavirtuala             # Lista todo el bucket

📦 Paquetes adicionales
npm install firebase-admin                 # Admin SDK
npm install @snap/camera-kit@latest       # Snap Camera Kit

📝 Base de Datos
📚 Colecciones en Firestore
users
uid: string

email: string

displayName: string

role: { admin | client }

createdAt: timestamp

wishlist: string[]

shippingAddress: object

products
id: string

name: string

description: string

price: number

images: string[]

category: string

availableSizes: string[]

featured: boolean

arLensId?: string

orders
id: string

userId: string

status: string

total: number

items: OrderItem[]

shippingAddress: object

paymentId: string

createdAt: timestamp

reviews
id: string

productId: string

userId: string

rating: number

comment: string

createdAt: timestamp

🔐 Seguridad
Reglas de Firestore: lectura pública, escritura autenticada, validación de roles

Autenticación basada en roles

Protección de datos sensibles

Índices optimizados

🔐 Autenticación
Email/Password

Registro, login y recuperación

Google Sign-In

OAuth 2.0 y perfil sincronizado

Roles

Admin: gestión completa

Cliente: compras y perfil

Protección de rutas y sesiones

Tokens JWT

💳 Pagos
Integración con PayPal Sandbox

Webhooks para estados de pago:

Pendiente, Procesando, Completado, Cancelado

Historial y reembolsos

📱 Experiencia AR
Snap Camera Kit

Token de API, lentes personalizados, tracking facial

Funcionalidades:

Prueba virtual de ropa en tiempo real

Captura de imagen

Compatibilidad:

Desktop (Chrome, Firefox)

Mobile (iOS, Android)

🌐 Despliegue con Firebase
Hosting

SSL, CDN, cache

Cloud Firestore

Escalado automático, backups, replicación global

Cloud Functions

Node.js, triggers, monitoreo

Cloud Storage

URLs firmadas, optimización de imágenes

Analytics y Rendimiento

Embudos, eventos personalizados, web vitals, optimización automática

🔍 SEO y Rendimiento
Meta tags y OpenGraph

Sitemap.xml

Lazy loading

Imágenes responsivas

Code splitting

Compresión y cache

📬 Contacto
¿Preguntas o sugerencias? Abre un issue o contáctanos a [tu-email@ejemplo.com].


