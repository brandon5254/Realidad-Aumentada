import React from 'react';

const TermsPage: React.FC = () => {
  return (
    <div className="pt-20 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-3xl font-light mb-8 text-center">Términos y condiciones</h1>
        
        <div className="prose max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-light mb-4">1. Introducción</h2>
            <p className="text-gray-600 mb-4">
              Al acceder y realizar un pedido con OMGEL, usted confirma que está de acuerdo 
              y sujeto a los términos de servicio contenidos en los Términos y condiciones que 
              se describen a continuación.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-light mb-4">2. Uso del sitio</h2>
            <p className="text-gray-600 mb-4">
              2.1. Para utilizar este sitio, debe tener al menos 18 años de edad.
            </p>
            <p className="text-gray-600 mb-4">
              2.2. No puede usar nuestros productos con fines ilegales o no autorizados.
            </p>
            <p className="text-gray-600 mb-4">
              2.3. La violación de cualquiera de estos Términos resultará en la terminación 
              inmediata de sus servicios.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-light mb-4">3. Cuenta</h2>
            <p className="text-gray-600 mb-4">
              3.1. Cuando crea una cuenta con nosotros, garantiza que la información que nos 
              proporciona es precisa, completa y actualizada en todo momento.
            </p>
            <p className="text-gray-600 mb-4">
              3.2. Es su responsabilidad mantener la confidencialidad de su cuenta y contraseña.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-light mb-4">4. Productos y servicios</h2>
            <p className="text-gray-600 mb-4">
              4.1. Nos reservamos el derecho de modificar o discontinuar cualquier producto 
              o servicio sin previo aviso.
            </p>
            <p className="text-gray-600 mb-4">
              4.2. Los precios de nuestros productos están sujetos a cambios sin previo aviso.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-light mb-4">5. Experiencia AR</h2>
            <p className="text-gray-600 mb-4">
              5.1. La funcionalidad AR se proporciona "tal cual" y "según disponibilidad".
            </p>
            <p className="text-gray-600 mb-4">
              5.2. No garantizamos que la experiencia AR sea exactamente igual al producto físico.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-light mb-4">6. Privacidad</h2>
            <p className="text-gray-600 mb-4">
              6.1. Su privacidad es importante para nosotros. Consulte nuestra Política de 
              Privacidad para obtener información sobre cómo recopilamos y usamos sus datos.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-light mb-4">7. Cambios en los términos</h2>
            <p className="text-gray-600 mb-4">
              7.1. Nos reservamos el derecho de modificar estos términos en cualquier momento.
            </p>
            <p className="text-gray-600 mb-4">
              7.2. Es su responsabilidad revisar estos términos periódicamente para estar 
              informado de las actualizaciones.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-light mb-4">8. Contacto</h2>
            <p className="text-gray-600 mb-4">
              Si tiene alguna pregunta sobre estos Términos, por favor contáctenos en:
            </p>
            <ul className="list-disc list-inside text-gray-600">
              <li>Email: legal@omgel.com</li>
              <li>Teléfono: +57 3243833378</li>
              <li>Dirección: Jardin Plaza Cali</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TermsPage;