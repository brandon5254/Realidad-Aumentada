import React, { useState } from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setSuccess(true);
    setLoading(false);
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="pt-20 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <h1 className="text-3xl font-light mb-8 text-center">Contacto</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div>
            <form onSubmit={handleSubmit} className="space-y-6">
              {success && (
                <div className="p-4 bg-green-50 text-green-700 rounded-md mb-6">
                  Mensaje enviado correctamente. Nos pondremos en contacto contigo pronto.
                </div>
              )}
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nombre completo
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-black focus:border-black"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Correo electrónico
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-black focus:border-black"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Asunto
                </label>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData(prev => ({ ...prev, subject: e.target.value }))}
                  className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-black focus:border-black"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Mensaje
                </label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                  rows={6}
                  className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-black focus:border-black"
                  required
                />
              </div>
              
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-black text-white py-3 hover:bg-gray-800 transition-colors disabled:opacity-50"
              >
                {loading ? 'Enviando...' : 'Enviar mensaje'}
              </button>
            </form>
          </div>
          
          {/* Contact Info */}
          <div className="space-y-8">
            <div>
              <h2 className="text-xl font-light mb-4">Información de contacto</h2>
              <div className="space-y-4">
                <div className="flex items-start">
                  <MapPin className="text-gray-400 mt-1 flex-shrink-0" />
                  <div className="ml-4">
                    <p className="font-medium">Dirección</p>
                    <p className="text-gray-600">Av. Siempre Viva 123, Springfield</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Phone className="text-gray-400 mt-1 flex-shrink-0" />
                  <div className="ml-4">
                    <p className="font-medium">Teléfono</p>
                    <p className="text-gray-600">+57 3243833378</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Mail className="text-gray-400 mt-1 flex-shrink-0" />
                  <div className="ml-4">
                    <p className="font-medium">Email</p>
                    <p className="text-gray-600">info@omgel.com</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h2 className="text-xl font-light mb-4">Horario de atención</h2>
              <div className="space-y-2 text-gray-600">
                <p>Lunes a Viernes: 9:00 AM - 8:00 PM</p>
                <p>Sábados: 10:00 AM - 6:00 PM</p>
                <p>Domingos: Cerrado</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;