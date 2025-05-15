import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { getStorage } from 'firebase-admin/storage';
import { ServiceAccount } from 'firebase-admin';
import serviceAccountData from '../credentials/tiendavirtual-b815e-7e376deaed25.json';
import fs from 'fs';
import path from 'path';
import mime from 'mime-types';
import { fileURLToPath } from 'url';

// 🛠️ Resolver __dirname en entornos ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ Inicializar Firebase Admin
initializeApp({
  credential: cert(serviceAccountData as ServiceAccount),
  storageBucket: 'gs://tiendavirtuala', // Reemplazado con el nombre correcto del bucket
});

const db = getFirestore();
const bucket = getStorage().bucket();

// 📂 Ruta local de las imágenes
const imagesFolderPath = path.join(__dirname, 'images');

// 🖼️ Obtener todas las imágenes de la carpeta
function getImagePaths(): string[] {
  return fs.readdirSync(imagesFolderPath)
    .filter(file => /\.(jpg|jpeg|png|webp)$/i.test(file))
    .map(file => path.join(imagesFolderPath, file));
}

const images = getImagePaths();
console.log("✅ Imágenes encontradas:", images);

// ☁️ Subir una imagen al bucket y retornar su URL pública
async function uploadImage(filePath: string): Promise<string> {
  const fileName = path.basename(filePath);
const fileMime = mime.lookup(filePath) || 'image/jpeg';

  const file = bucket.file(`products/${fileName}`);
  await bucket.upload(filePath, {
    destination: file,
    contentType: fileMime,
    metadata: {
      cacheControl: 'public, max-age=31536000',
    },
  });

  await file.makePublic();
  return `https://storage.googleapis.com/${bucket.name}/products/${fileName}`;
}

//  Lista de productos 
const products = [
  {
    name: "Camisa blanca",
    description: "Camisa formal 100% algodón",
    price: 29.99,
    images: ["camisa-blanca.jpg"],
    category: "Hombre",
    availableSizes: ["S", "M", "L"],
    featured: true
  },
  {
    name: "Pantalón negro",
    description: "Pantalón de vestir clásico",
    price: 49.99,
    images: ["pant.jpg"],
    category: "Hombre",
    availableSizes: ["M", "L"],
    featured: false
  },
  {
    name: "Hoddie Celeste",
    description: "Hoddie Celeste para el Frio",
    price: 49.99,
    images: ["hoddie.jpg"],
    category: "Mujer",
    availableSizes: ["M", "L"],
    featured: false
  },
  {
    name: "Chaqueta En Cuero",
    description: "Chaqueta de cuero para toda ocasion",
    price: 49.99,
    images: ["chaqueta.jpg"],
    category: "Mujer",
    availableSizes: ["M", "L"],
    featured: false
  },

];

async function uploadProducts() {
  const batch = db.batch();
  const productsRef = db.collection('products');

  for (const product of products) {
    const imageUrls: string[] = [];

    for (const imageName of product.images) {
      const fullPath = path.join(imagesFolderPath, imageName);
      if (fs.existsSync(fullPath)) {
        const url = await uploadImage(fullPath);
        imageUrls.push(url);
      } else {
        console.warn(`⚠️ Imagen no encontrada: ${fullPath}`);
      }
    }

    const productData = { ...product, images: imageUrls };
    const docRef = productsRef.doc();
    batch.set(docRef, productData);
  }

  await batch.commit();
  console.log("✅ Productos y sus imágenes subidos con éxito");
}

uploadProducts().catch(console.error);
