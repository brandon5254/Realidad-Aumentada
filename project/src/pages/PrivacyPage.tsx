import React from 'react';

const PrivacyPage: React.FC = () => {
  return (
    <div className="pt-20 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-3xl font-light mb-8 text-center">Política de privacidad</h1>
        
        <div className="prose max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-light mb-4">1. Información que recopilamos</h2>
            <p className="text-gray-600 mb-4">
              Recopilamos información que usted nos proporciona directamente cuando:
            </p>
            <ul className="list-disc list-inside text-gray-600 mb-4">
              <li>Crea una cuenta</li>
              <li>Realiza una compra</li>
              <li>Se suscribe a nuestro boletín</li>
              <li>Contacta con nuestro servicio al cliente</li>
              <li>Utiliza nuestra función de prueba AR</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-light mb-4">2. Uso de la información</h2>
            <p className="text-gray-600 mb-4">
              Utilizamos la información recopilada para:
            </p>
            <ul className="list-disc list-inside text-gray-600 mb-4">
              <li>Procesar sus pedidos y pagos</li>
              <li>Enviar comunicaciones sobre su compra</li>
              <li>Mejorar nuestros productos y servicios</li>
              <li>Personalizar su experiencia de compra</li>
              <li>Prevenir actividades fraudulentas</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-light mb-4">3. Protección de datos</h2>
            <p className="text-gray-600 mb-4">
              Implementamos medidas de seguridad diseñadas para proteger sus datos personales, incluyendo:
            </p>
            <ul className="list-disc list-inside text-gray-600 mb-4">
              <li>Encriptación SSL en todas las transmisiones de datos</li>
              <li>Acceso restringido a datos personales</li>
              <li>Monitoreo regular de sistemas de seguridad</li>
              <li>Protocolos de seguridad actualizados</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-light mb-4">4. Cookies y tecnologías similares</h2>
            <p className="text-gray-600 mb-4">
              Utilizamos cookies y tecnologías similares para:
            </p>
            <ul className="list-disc list-inside text-gray-600 mb-4">
              <li>Mantener su sesión activa</li>
              <li>Recordar sus preferencias</li>
              <li>Analizar el uso del sitio</li>
              <li>Personalizar el contenido</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-light mb-4">5. Compartir información</h2>
            <p className="text-gray-600 mb-4">
              No vendemos ni compartimos su información personal con terceros, excepto:
            </p>
            <ul className="list-disc list-inside text-gray-600 mb-4">
              <li>Con su consentimiento explícito</li>
              <li>Para procesar pagos y envíos</li>
              <li>Cuando sea requerido por ley</li>
              <li>Para proteger nuestros derechos</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-light mb-4">6. Sus derechos</h2>
            <p className="text-gray-600 mb-4">
              Usted tiene derecho a:
            </p>
            <ul className="list-disc list-inside text-gray-600 mb-4">
              <li>Acceder a sus datos personales</li>
              <li>Corregir datos inexactos</li>
              <li>Solicitar la eliminación de sus datos</li>
              <li>Oponerse al procesamiento de sus datos</li>
              <li>Retirar su consentimiento en cualquier momento</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-light mb-4">7. Cambios en la política</h2>
            <p className="text-gray-600 mb-4">
              Nos reservamos el derecho de modificar esta política de privacidad en cualquier momento. 
              Los cambios entrarán en vigor inmediatamente después de su publicación en el sitio web.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-light mb-4">8. Contacto</h2>
            <p className="text-gray-600 mb-4">
              Si tiene preguntas sobre nuestra política de privacidad, puede contactarnos:
            </p>
            <ul className="list-disc list-inside text-gray-600">
              <li>Email: privacidad@omgel.com</li>
              <li>Teléfono: +57 3243833378</li>
              <li>Dirección: Av. Siempre Viva 123, Springfield</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPage;