import React from 'react';
import {
  Facebook,
  Twitter,
  Youtube,
  Instagram,
  Phone,
  Mail,
  MapPin
} from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#212121] text-white py-16">
      <div className="max-w-7xl mx-auto px-6">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row justify-between gap-12 mb-12">
          {/* Logo & Contact */}
          <div className="md:w-1/2 space-y-6">
            <a href="/" className="inline-block">
              <img
                src="/assets/img/logo_blanc.png"
                alt="Omega"
                className="h-12 w-auto"
              />
            </a>
            <div>
              <h4 className="text-lg font-semibold">Omega Research & Consulting</h4>
              <p className="text-gray-400">
                8177, Quantum Building, Blvd 30 juin, Gombe, Kinshasa
              </p>
              <p className="text-gray-400">
                Tel:{' '}
                <a href="tel:+243996998277" className="hover:text-blue-400 transition">
                  +243 99 699 8277
                </a>
              </p>
            </div>

            {/* Social Links */}
            <div className="flex space-x-4 pt-2">
              <a href="#" className="hover:text-blue-400 transition">
                <Twitter size={20} />
              </a>
              <a href="#" className="hover:text-blue-400 transition">
                <Facebook size={20} />
              </a>
              <a href="#" className="hover:text-blue-400 transition">
                <Youtube size={20} />
              </a>
              <a href="#" className="hover:text-blue-400 transition">
                <Instagram size={20} />
              </a>
            </div>
          </div>

          {/* Links */}
          <div className="md:w-1/2 grid grid-cols-2 gap-8">
            <div className="space-y-2">
              <h4 className="font-semibold text-white">Navigation</h4>
              <ul className="text-gray-400 space-y-1">
                <li><a href="/about-us" className="hover:text-white">About us</a></li>
                <li><a href="/services" className="hover:text-white">Services</a></li>
                <li><a href="/blogs" className="hover:text-white">Blogs</a></li>
                <li><a href="/contact-us" className="hover:text-white">Contact us</a></li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-white">Legal</h4>
              <ul className="text-gray-400 space-y-1">
                <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white">Terms & Conditions</a></li>
                <li><a href="#" className="hover:text-white">Licensing</a></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Contact */}
        <div className="grid md:grid-cols-2 gap-12 border-t border-gray-700 pt-12 mb-8">
          <div className="space-y-2">
            <h4 className="text-white font-semibold">Work with us</h4>
            <a href="mailto:contact@omega.cd" className="text-gray-400 hover:text-white">
              contact@omega.cd
            </a>
          </div>
          <div className="space-y-2">
            <h4 className="text-white font-semibold">Get in touch</h4>
            <a href="mailto:info@omega.cd" className="text-gray-400 hover:text-white">
              info@omega.cd
            </a>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-800 pt-6 text-sm text-gray-500 text-center">
          © {new Date().getFullYear()} Omega Research & Consulting. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
