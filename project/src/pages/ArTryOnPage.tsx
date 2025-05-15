import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/config';
import { bootstrapCameraKit } from '@snap/camera-kit';
import { Product } from '../types/product';
import { ArrowLeft, ShoppingBag, Camera } from 'lucide-react';


const ArTryOnPage: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const sessionRef = useRef<any>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const hasInitializedRef = useRef(false);
  
  const cleanup = useCallback(async () => {
    try {
      if (mediaStreamRef.current) {
        mediaStreamRef.current.getTracks().forEach(track => track.stop());
        mediaStreamRef.current = null;
      }
      
      if (sessionRef.current) {
        try {
          await sessionRef.current.pause();
        } catch (e) {
          console.warn('Error pausing session:', e);
        }
        sessionRef.current = null;
      }

      

      hasInitializedRef.current = false;
    } catch (error) {
      console.error('Cleanup error:', error);
    }
  }, []);

  useEffect(() => {
    const fetchProduct = async () => {
      if (productId && productId !== 'featured') {
        try {
          const docRef = doc(db, 'products', productId);
          const docSnap = await getDoc(docRef);
          
          if (docSnap.exists()) {
            setProduct({ id: docSnap.id, ...docSnap.data() } as Product);
          }
        } catch (error) {
          console.error('Error fetching product:', error);
        }
      }
      setLoading(false);
    };

    fetchProduct();
    return () => {
      cleanup().catch(error => console.error('Error during cleanup:', error));
    };
  }, [productId, cleanup]);

  useEffect(() => {
    if (!canvasRef.current || hasInitializedRef.current || loading) {
      return;
    }

    const initCameraKit = async () => {
      try {
        // Check if camera permissions are available
        const devices = await navigator.mediaDevices.enumerateDevices();
        const hasCamera = devices.some(device => device.kind === 'videoinput');
        
        if (!hasCamera) {
          throw new Error('No camera found on this device');
        }

        // Initialize CameraKit
        const cameraKit = await bootstrapCameraKit({
          apiToken: 'eyJhbGciOiJIUzI1NiIsImtpZCI6IkNhbnZhc1MyU0hNQUNQcm9kIiwidHlwIjoiSldUIn0.eyJhdWQiOiJjYW52YXMtY2FudmFzYXBpIiwiaXNzIjoiY2FudmFzLXMyc3Rva2VuIiwibmJmIjoxNzQ0MDgxNDg1LCJzdWIiOiI3NDExZjE0ZS0xZTE3LTRlOTAtYjczYy1jYTY0Mzc2Mjk1ZDB-U1RBR0lOR34xNmYyNjlkMi1kMThmLTRlYjMtOTQxMC03YTg4MWQzZGE0OWEifQ.th4RlltfevBsm64UmHaph4YOkJ0-X9LVDKhLetZexoY'
        });

        if (!canvasRef.current) {
          throw new Error('Canvas element not found');
        }

        hasInitializedRef.current = true;

        // Create session
        sessionRef.current = await cameraKit.createSession({ 
          liveRenderTarget: canvasRef.current,
          // Removed invalid property 'renderMode'
        });
        
        // Request camera access
        mediaStreamRef.current = await navigator.mediaDevices.getUserMedia({
          video: { 
            facingMode: 'user',
            width: { ideal: 1280 },
            height: { ideal: 720 }
          }
        });
        
        // Set source and start session
        await sessionRef.current.setSource(mediaStreamRef.current);
        await sessionRef.current.play();
        
        // Load and apply lens
        const lensId = product?.arLensId || '967302b9-f409-48d8-b310-0141b6c51425';
        const lensGroupId = product?.arLensGroupId || '5b40ca22-8160-4210-8bbd-c2ac69befd8d';
        
        
        const lens = await cameraKit.lensRepository.loadLens(lensId, lensGroupId);
        await sessionRef.current.applyLens(lens);

      } catch (error: any) {
        console.error('Camera initialization error:', error);
        let errorMessage = 'Error al inicializar la cámara.';
        
        if (error.name === 'NotAllowedError') {
          errorMessage = 'Acceso a la cámara denegado. Por favor, permite el acceso a la cámara.';
        } else if (error.name === 'NotFoundError') {
          errorMessage = 'No se encontró ninguna cámara en el dispositivo.';
        } else if (error.name === 'NotReadableError') {
          errorMessage = 'La cámara está siendo utilizada por otra aplicación.';
        } else if (error.message?.includes('transferControlToOffscreen')) {
          errorMessage = 'Error de inicialización del canvas. Por favor, recarga la página.';
        }
        
        setCameraError(errorMessage);
        await cleanup();
      }
    };

    initCameraKit();
  }, [product, loading, cleanup]);

  if (loading) {
    return (
      <div className="pt-20 flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      <div className="fixed top-0 left-0 w-full z-50 bg-black text-white p-4 flex justify-between items-center">
        <Link to={product ? `/productos/${product.id}` : '/productos'} className="flex items-center">
          <ArrowLeft size={20} className="mr-2" />
          Volver
        </Link>
        <div className="text-center flex-1">
          <h1 className="text-lg font-light">{product ? product.name : 'Experiencia AR'}</h1>
        </div>
        {product && (
          <Link to={`/productos/${product.id}`} className="flex items-center">
            <ShoppingBag size={20} className="mr-1" />
            Comprar
          </Link>
        )}
      </div>
      
      <div className="relative w-full h-screen">
        {cameraError ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-4">
            <Camera size={48} className="mb-4 opacity-50" />
            <p className="text-lg text-center mb-4">{cameraError}</p>
            <Link 
              to={product ? `/productos/${product.id}` : '/productos'}
              className="bg-white text-black px-6 py-2 rounded-md"
            >
              Volver a productos
            </Link>
          </div>
        ) : (
          <canvas 
            ref={canvasRef} 
            className="w-full h-full object-cover"
          />
        )}
      </div>
      
      <div className="fixed bottom-0 left-0 w-full bg-gradient-to-t from-black to-transparent p-4 text-white">
        <p className="text-center max-w-md mx-auto">
          Prueba cómo te queda la ropa antes de comprarla. Usa la cámara en tiempo real  para ver cómo se ve el producto en ti
        </p>
      </div>
    </div>
  );
};

export default ArTryOnPage;