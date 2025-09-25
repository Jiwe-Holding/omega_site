import React, { useState, useRef } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle, AlertCircle } from 'lucide-react';
import { API_CONFIG, EMAIL_TEMPLATES } from '../config/api';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    companyType: '',
    phone: '',
    country: '',
    subject: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const form = useRef<HTMLFormElement>(null);


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // Split name into first and last name
      const nameParts = formData.name.trim().split(' ');
      const firstName = nameParts[0] || '';
      const lastName = nameParts.slice(1).join(' ') || '';

      // Prepare the email data according to the API structure
      const emailData = {
        sender_email: formData.email,
        sender_name: EMAIL_TEMPLATES.CONTACT.sender_name,
        organisation: formData.company || "Non spécifié",
        sujet: `${EMAIL_TEMPLATES.CONTACT.sujet_prefix} - ${formData.subject || 'Demande générale'}`,
        message: `
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Nouvelle demande de contact - Omega Research & Consulting</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            background-color: #f8f9fa;
            margin: 0;
            padding: 0;
        }
        .email-container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            border-radius: 12px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            overflow: hidden;
        }
        .header {
            background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%);
            color: white;
            padding: 30px 20px;
            text-align: center;
        }
        .header h1 {
            margin: 0;
            font-size: 24px;
            font-weight: 600;
        }
        .header p {
            margin: 8px 0 0 0;
            opacity: 0.9;
            font-size: 16px;
        }
        .content {
            padding: 30px 20px;
        }
        .info-section {
            background-color: #f8fafc;
            border-radius: 8px;
            padding: 20px;
            margin-bottom: 25px;
        }
        .info-section h3 {
            color: #1e40af;
            margin: 0 0 15px 0;
            font-size: 18px;
            font-weight: 600;
            border-bottom: 2px solid #e2e8f0;
            padding-bottom: 8px;
        }
        .info-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 15px;
        }
        .info-item {
            display: flex;
            flex-direction: column;
        }
        .info-label {
            font-weight: 600;
            color: #64748b;
            font-size: 14px;
            margin-bottom: 4px;
        }
        .info-value {
            color: #1e293b;
            font-size: 15px;
        }
        .message-section {
            background-color: #ffffff;
            border: 1px solid #e2e8f0;
            border-radius: 8px;
            padding: 20px;
        }
        .message-section h3 {
            color: #1e40af;
            margin: 0 0 15px 0;
            font-size: 18px;
            font-weight: 600;
        }
        .message-content {
            background-color: #f8fafc;
            padding: 15px;
            border-radius: 6px;
            border-left: 4px solid #3b82f6;
            font-size: 15px;
            line-height: 1.7;
        }
        .footer {
            background-color: #f8fafc;
            padding: 20px;
            text-align: center;
            border-top: 1px solid #e2e8f0;
        }
        .footer p {
            margin: 0;
            color: #64748b;
            font-size: 14px;
        }
        .logo {
            max-width: 120px;
            height: auto;
        }
        @media (max-width: 600px) {
            .info-grid {
                grid-template-columns: 1fr;
            }
            .content {
                padding: 20px 15px;
            }
            .header {
                padding: 20px 15px;
            }
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="header">
            <h1>Nouvelle demande de contact</h1>
            <p>Omega Research & Consulting</p>
        </div>
        
        <div class="content">
            <div class="info-section">
                <h3>📋 Informations du contact</h3>
                <div class="info-grid">
                    <div class="info-item">
                        <div class="info-label">Nom complet</div>
                        <div class="info-value">${formData.name}</div>
                    </div>
                    <div class="info-item">
                        <div class="info-label">Email</div>
                        <div class="info-value">${formData.email}</div>
                    </div>
                    <div class="info-item">
                        <div class="info-label">Compagnie</div>
                        <div class="info-value">${formData.company || 'Non spécifié'}</div>
                    </div>
                    <div class="info-item">
                        <div class="info-label">Type d'entreprise</div>
                        <div class="info-value">${formData.companyType || 'Non spécifié'}</div>
                    </div>
                    <div class="info-item">
                        <div class="info-label">Téléphone</div>
                        <div class="info-value">${formData.phone || 'Non spécifié'}</div>
                    </div>
                    <div class="info-item">
                        <div class="info-label">Pays</div>
                        <div class="info-value">${formData.country || 'Non spécifié'}</div>
                    </div>
                 
                </div>
            </div>
            
            <div class="message-section">
                <h3>💬 Message</h3>
                <div class="message-content">
                    ${formData.message}
                </div>
            </div>
        </div>
        
        <div class="footer">
            <p>Cette demande a été envoyée depuis le site web Omega Research & Consulting</p>
            <p>Date: ${new Date().toLocaleDateString('fr-FR', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            })}</p>
        </div>
    </div>
</body>
</html>
        `,
        noms: [firstName, lastName],
        extra_json: {
          company_type: formData.companyType || "Non spécifié",
          sector: formData.subject || "Non spécifié",
          country: formData.country || "Non spécifié"
        }
      };

      // Send email via API
      const response = await fetch(API_CONFIG.EMAIL_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': API_CONFIG.EMAIL_API_TOKEN
        },
        body: JSON.stringify(emailData)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log('Email sent successfully:', result);
      
      setIsSubmitted(true);
      setFormData({
        name: '',
        email: '',
        company: '',
        companyType: '',
        phone: '',
        country: '',
        subject: '',
        message: ''
      });
      
      setTimeout(() => setIsSubmitted(false), 5000);
    } catch (error) {
      console.error('Error sending message:', error);
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
          <div className="grid lg:grid-cols-2 gap-16">
            <div className="bg-gray-50 rounded-3xl p-8 lg:p-12">
              <h3 className="text-2xl font-bold text-gray-900 mb-8">Send Us a Message</h3>
              
              {/* Message de succès */}
              {isSubmitted && (
                <div className="text-center py-12">
                  <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                  <h4 className="text-xl font-semibold text-gray-900 mb-2">Message sent successfully!</h4>
                  <p className="text-gray-600">We will respond within 24 hours.</p>
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
                        Full Name *
                      </label>
                      <input 
                        type="text" 
                        id="name" 
                        name="name" 
                        required 
                        value={formData.name} 
                        onChange={handleChange} 
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                        placeholder="Your full name" 
                        disabled={isLoading}
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <input 
                        type="email" 
                        id="email" 
                        name="email" 
                        required 
                        value={formData.email} 
                        onChange={handleChange} 
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                        placeholder="your@email.com" 
                        disabled={isLoading}
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
                        Company
                      </label>
                      <input 
                        type="text" 
                        id="company" 
                        name="company" 
                        value={formData.company} 
                        onChange={handleChange} 
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                        placeholder="Your company name" 
                        disabled={isLoading}
                      />
                    </div>
                    <div>
                      <label htmlFor="companyType" className="block text-sm font-medium text-gray-700 mb-2">
                        Company Type
                      </label>
                      <select 
                        id="companyType" 
                        name="companyType" 
                        value={formData.companyType} 
                        onChange={handleChange} 
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        disabled={isLoading}
                      >
                        <option value="">Select company type</option>
                        <option value="startup">Startup</option>
                        <option value="sme">SME (Small & Medium Enterprise)</option>
                        <option value="large-corporation">Large Corporation</option>
                        <option value="ngo">NGO</option>
                        <option value="government">Government Agency</option>
                        <option value="academic">Academic Institution</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number
                      </label>
                      <input 
                        type="tel" 
                        id="phone" 
                        name="phone" 
                        value={formData.phone} 
                        onChange={handleChange} 
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                        placeholder="+243 99 123 4567" 
                        disabled={isLoading}
                      />
                    </div>
                    <div>
                      <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-2">
                        Country
                      </label>
                      <select 
                        id="country" 
                        name="country" 
                        value={formData.country} 
                        onChange={handleChange} 
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        disabled={isLoading}
                      >
                        <option value="">Select your country</option>
                        <option value="drc">Democratic Republic of Congo</option>
                        <option value="congo">Republic of Congo</option>
                        <option value="cameroon">Cameroon</option>
                        <option value="central-african-republic">Central African Republic</option>
                        <option value="chad">Chad</option>
                        <option value="gabon">Gabon</option>
                        <option value="equatorial-guinea">Equatorial Guinea</option>
                        <option value="sao-tome">São Tomé and Príncipe</option>
                        <option value="angola">Angola</option>
                        <option value="zambia">Zambia</option>
                        <option value="tanzania">Tanzania</option>
                        <option value="kenya">Kenya</option>
                        <option value="uganda">Uganda</option>
                        <option value="rwanda">Rwanda</option>
                        <option value="burundi">Burundi</option>
                        <option value="south-africa">South Africa</option>
                        <option value="nigeria">Nigeria</option>
                        <option value="ghana">Ghana</option>
                        <option value="senegal">Senegal</option>
                        <option value="ivory-coast">Ivory Coast</option>
                        <option value="mali">Mali</option>
                        <option value="burkina-faso">Burkina Faso</option>
                        <option value="niger">Niger</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                      Project Type
                    </label>
                    <select 
                      id="subject" 
                      name="subject" 
                      value={formData.subject} 
                      onChange={handleChange} 
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      disabled={isLoading}
                    >
                      <option value="">Select a service</option>
                      <option value="research-analytics">Research Analytics</option>
                      <option value="strategic-consulting">Strategic Consulting</option>
                      <option value="custom-solutions">Custom Solutions</option>
                      <option value="innovation-consulting">Innovation Consulting</option>
                      <option value="other">Other</option>
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
                      placeholder="Tell us about your project and how we can help you..." 
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
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5 mr-2" />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>

            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-8">Contact Us</h3>
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
                <h4 className="text-xl font-semibold text-gray-900 mb-4">Opening Hours</h4>
                <div className="space-y-2 text-gray-600">
                  <div className="flex justify-between"><span>Monday - Friday</span><span>9:00 AM - 6:00 PM</span></div>
                  <div className="flex justify-between"><span>Saturday</span><span>10:00 AM - 2:00 PM</span></div>
                  <div className="flex justify-between"><span>Sunday</span><span>Closed</span></div>
                </div>
                <div className="mt-6 pt-6 border-t border-blue-200">
                  <p className="text-sm text-gray-600">
                    <strong>Emergency Support:</strong> For urgent questions, call our 24/7 line at +243 99 699 8277
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
              <span className="text-sm font-semibold text-blue-600 uppercase mx-3">Branches</span>
              <div className="w-16 h-0.5 bg-blue-600"></div>
            </div>
            <h2 className="text-4xl font-bold text-gray-900">Offices Worldwide</h2>
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
              <h3 className="text-3xl font-bold text-gray-900 mb-4">Subscribe to our newsletter</h3>
              <div className="flex flex-col sm:flex-row gap-4">
                <input 
                  type="email" 
                  name="email" 
                  placeholder="Enter your email" 
                  className="input w-full sm:w-auto flex-grow px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" 
                  required 
                />
                <button 
                  type="submit" 
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                  Subscribe
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