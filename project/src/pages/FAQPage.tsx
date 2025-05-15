import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: '¿Cuánto tiempo tarda el envío?',
    answer: 'Los envíos nacionales tardan entre 3-5 días hábiles. Para envíos internacionales, el tiempo estimado es de 7-14 días hábiles.'
  },
  {
    question: '¿Cuál es la política de devoluciones?',
    answer: 'Aceptamos devoluciones dentro de los 30 días posteriores a la compra. El producto debe estar sin usar y con todas sus etiquetas originales.'
  },
  {
    question: '¿Cómo funciona la experiencia AR?',
    answer: 'Nuestra tecnología AR te permite probar virtualmente las prendas usando la cámara de tu dispositivo. Solo necesitas acceder a la sección AR y seguir las instrucciones en pantalla.'
  },
  {
    question: '¿Qué métodos de pago aceptan?',
    answer: 'Aceptamos pagos con tarjetas de crédito/débito (Visa, Mastercard, American Express), PayPal y transferencias bancarias.'
  },
  {
    question: '¿Tienen tiendas físicas?',
    answer: 'Actualmente operamos exclusivamente online, lo que nos permite ofrecer mejores precios y una experiencia de compra innovadora con AR.'
  },
  {
    question: '¿Cómo puedo rastrear mi pedido?',
    answer: 'Una vez que tu pedido sea enviado, recibirás un correo electrónico con el número de seguimiento. También puedes ver el estado de tu pedido en tu cuenta.'
  },
  {
    question: '¿Las tallas son estándar?',
    answer: 'Sí, usamos tallas estándar. Puedes consultar nuestra guía de tallas en cada producto para encontrar la medida perfecta para ti.'
  },
  {
    question: '¿Ofrecen envío gratuito?',
    answer: 'Sí, ofrecemos envío gratuito en pedidos superiores a $100. Para pedidos menores, el costo de envío se calcula según tu ubicación.'
  }
];

const FAQPage: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="pt-20 min-h-screen">
      <div className="max-w-3xl mx-auto px-4 py-16">
        <h1 className="text-3xl font-light mb-2 text-center">Preguntas frecuentes</h1>
        <p className="text-gray-600 text-center mb-12">
          Encuentra respuestas a las preguntas más comunes sobre nuestros productos y servicios
        </p>
        
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border border-gray-200">
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex justify-between items-center p-4 text-left hover:bg-gray-50 transition-colors"
              >
                <span className="font-medium">{faq.question}</span>
                {openIndex === index ? (
                  <ChevronUp className="flex-shrink-0 text-gray-400" />
                ) : (
                  <ChevronDown className="flex-shrink-0 text-gray-400" />
                )}
              </button>
              
              {openIndex === index && (
                <div className="p-4 pt-0">
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <p className="text-gray-600">
            ¿No encontraste lo que buscabas?{' '}
            <a href="/contacto" className="text-black hover:text-gray-700">
              Contáctanos
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default FAQPage;