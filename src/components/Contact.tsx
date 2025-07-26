import React, { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import { Mail, Phone, MapPin, Send, CheckCircle, AlertCircle } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    subject: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const form = useRef<HTMLFormElement>(null);

  // Configuration EmailJS - À remplacer par tes vraies clés
  const EMAILJS_SERVICE_ID = import.meta.env.REACT_APP_EMAILJS_SERVICE_ID;
  const EMAILJS_TEMPLATE_ID = import.meta.env.REACT_APP_EMAILJS_TEMPLATE_ID;
  const EMAILJS_PUBLIC_KEY = import.meta.env.REACT_APP_EMAILJS_PUBLIC_KEY;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // Simulation d'EmailJS (remplace par le vrai code)
      if (form.current) {
        await emailjs.sendForm(
          EMAILJS_SERVICE_ID, 
          EMAILJS_TEMPLATE_ID, 
          form.current, 
          EMAILJS_PUBLIC_KEY
        );
      } else {
        throw new Error('Form reference is null.');
      }
      
      // Simulation pour la démo
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setIsSubmitted(true);
      setFormData({
        name: '',
        email: '',
        company: '',
        subject: '',
        message: ''
      });
      
      setTimeout(() => setIsSubmitted(false), 5000);
    } catch (error) {
      console.error('Erreur lors de l\'envoi:', error);
      setError('Une erreur est survenue lors de l\'envoi. Veuillez réessayer.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email Us',
      content: 'contact@omega.cd',
      link: 'mailto:contact@omega.cd'
    },
    {
      icon: Phone,
      title: 'Call Us',
      content: '+243 99 699 8277',
      link: 'tel:+243996998277'
    },
    {
      icon: MapPin,
      title: 'Visit Us',
      content: '8177, Quantum Building, Blvd 30 juin, Gombe, Kinshasa',
      link: '#'
    }
  ];

  return (
    <>
      <section id="contact" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-4">
              Get In Touch
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Let's Start Your Research Journey
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Ready to transform your data into insights? Contact us today to discuss how we can help 
              you achieve your research and strategic objectives.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16">
            <div className="bg-gray-50 rounded-3xl p-8 lg:p-12">
              <h3 className="text-2xl font-bold text-gray-900 mb-8">Send Us a Message</h3>
              
              {/* Message de succès */}
              {isSubmitted && (
                <div className="text-center py-12">
                  <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                  <h4 className="text-xl font-semibold text-gray-900 mb-2">Message envoyé avec succès !</h4>
                  <p className="text-gray-600">Nous vous répondrons dans les 24 heures.</p>
                </div>
              )}

              {/* Message d'erreur */}
              {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center">
                  <AlertCircle className="w-5 h-5 text-red-500 mr-2" />
                  <p className="text-red-700">{error}</p>
                </div>
              )}

              {/* Formulaire */}
              {!isSubmitted && (
                <form ref={form} onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                        Nom complet *
                      </label>
                      <input 
                        type="text" 
                        id="name" 
                        name="name" 
                        required 
                        value={formData.name} 
                        onChange={handleChange} 
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                        placeholder="Votre nom complet" 
                        disabled={isLoading}
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        Adresse email *
                      </label>
                      <input 
                        type="email" 
                        id="email" 
                        name="email" 
                        required 
                        value={formData.email} 
                        onChange={handleChange} 
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                        placeholder="votre@email.com" 
                        disabled={isLoading}
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
                      Entreprise
                    </label>
                    <input 
                      type="text" 
                      id="company" 
                      name="company" 
                      value={formData.company} 
                      onChange={handleChange} 
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                      placeholder="Nom de votre entreprise" 
                      disabled={isLoading}
                    />
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                      Type de projet
                    </label>
                    <select 
                      id="subject" 
                      name="subject" 
                      value={formData.subject} 
                      onChange={handleChange} 
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      disabled={isLoading}
                    >
                      <option value="">Sélectionnez un service</option>
                      <option value="research-analytics">Analyse de recherche</option>
                      <option value="strategic-consulting">Conseil stratégique</option>
                      <option value="custom-solutions">Solutions personnalisées</option>
                      <option value="innovation-consulting">Conseil en innovation</option>
                      <option value="other">Autre</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                      Message *
                    </label>
                    <textarea 
                      id="message" 
                      name="message" 
                      required 
                      rows={5} 
                      value={formData.message} 
                      onChange={handleChange} 
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none" 
                      placeholder="Parlez-nous de votre projet et comment nous pouvons vous aider..." 
                      disabled={isLoading}
                    />
                  </div>

                  <button 
                    type="submit" 
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-semibold py-4 px-8 rounded-lg hover:shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    {isLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Envoi en cours...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5 mr-2" />
                        Envoyer le message
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>

            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-8">Contactez-nous</h3>
              <div className="space-y-8 mb-12">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
                      <info.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-1">{info.title}</h4>
                      <a href={info.link} className="text-gray-600 hover:text-blue-600 transition-colors">{info.content}</a>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl p-8">
                <h4 className="text-xl font-semibold text-gray-900 mb-4">Heures d'ouverture</h4>
                <div className="space-y-2 text-gray-600">
                  <div className="flex justify-between"><span>Lundi - Vendredi</span><span>9h00 - 18h00</span></div>
                  <div className="flex justify-between"><span>Samedi</span><span>10h00 - 14h00</span></div>
                  <div className="flex justify-between"><span>Dimanche</span><span>Fermé</span></div>
                </div>
                <div className="mt-6 pt-6 border-t border-blue-200">
                  <p className="text-sm text-gray-600">
                    <strong>Support d'urgence :</strong> Pour les questions urgentes, appelez notre ligne 24h/24 au +243 99 699 8277
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center mb-2 justify-center">
              <div className="w-16 h-0.5 bg-blue-600"></div>
              <span className="text-sm font-semibold text-blue-600 uppercase mx-3">Succursales</span>
              <div className="w-16 h-0.5 bg-blue-600"></div>
            </div>
            <h2 className="text-4xl font-bold text-gray-900">Bureaux dans le monde</h2>
          </div>
          <div className="mapouter">
            <div className="gmap_canvas">
              <iframe 
                width="100%" 
                height="550" 
                id="gmap_canvas" 
                src="https://maps.google.com/maps?q=quantum%20bldg&t=&z=17&ie=UTF8&iwloc=&output=embed" 
                frameBorder="0" 
                scrolling="no" 
                marginHeight={0} 
                marginWidth={0}
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      <section className="cta py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="cta-wrap grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h3 className="text-3xl font-bold text-gray-900 mb-4">Abonnez-vous à notre newsletter</h3>
              <div className="flex flex-col sm:flex-row gap-4">
                <input 
                  type="email" 
                  name="email" 
                  placeholder="Entrez votre email" 
                  className="input w-full sm:w-auto flex-grow px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" 
                  required 
                />
                <button 
                  type="submit" 
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                  S'abonner
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;