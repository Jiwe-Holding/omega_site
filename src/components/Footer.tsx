import React from "react";
import {
  Mail,
  Phone,
  MapPin,
  Twitter,
  Facebook,
  Youtube,
  Instagram,
} from "lucide-react";

const Footer = () => {
  const socialLinks = [
    {
      icon: Twitter,
      href: "#",
      label: "Twitter",
      imgSrc:
        "https://assets-global.website-files.com/65125d2b3666b95695670ae6/6545d8a20d9786d6fc23c818_ic-twitter.svg",
    },
    {
      icon: Facebook,
      href: "#",
      label: "Facebook",
      imgSrc:
        "https://assets-global.website-files.com/65125d2b3666b95695670ae6/6545d8a20d9786d6fc23c816_ic-facebook.svg",
    },
    {
      icon: Youtube,
      href: "#",
      label: "YouTube",
      imgSrc:
        "https://assets-global.website-files.com/65125d2b3666b95695670ae6/6545d8a20d9786d6fc23c817_ic-youtube.svg",
    },
    {
      icon: Instagram,
      href: "#",
      label: "Instagram",
      imgSrc:
        "https://assets-global.website-files.com/65125d2b3666b95695670ae6/6545d8a20d9786d6fc23c819_ic-insta.svg",
    },
  ];

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex flex-col md:flex-row md:justify-between gap-12">
          {/* Left side: Logo + address + social */}
          <div className="md:w-1/2 space-y-8">
            <a href="/" className="inline-block">
              <img
                src="/assets/img/logo.png"
                alt="Omega Research & Consulting Logo"
                style={{ width: 170, height: 50 }}
                loading="eager"
              />
            </a>

            <div>
              <div className="font-semibold mb-1">Omega Research & Consulting</div>
              <p className="mb-2 leading-relaxed">
                8177, Quantum Building, Blvd 30 juin, Gombe, Kinshasa
              </p>
              <div>
                Tel:{" "}
                <a href="tel:+243996998277" className="text-blue-500 hover:underline">
                  +243 99 699 8277
                </a>
              </div>
            </div>

            <div className="flex space-x-6">
              {socialLinks.map(({ href, label, imgSrc }, i) => (
                <a
                  key={i}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-8 h-8"
                >
                  <img src={imgSrc} alt={label} loading="lazy" />
                </a>
              ))}
            </div>
          </div>

          {/* Right side: Links + contacts */}
          <div className="md:w-1/2 flex flex-col md:flex-row justify-between gap-12">
            {/* Navigation Links */}
            <div className="flex flex-col space-y-4">
              <a
                href="about-us.html"
                className="hover:text-white transition-colors font-medium"
              >
                About us
              </a>
              <a
                href="services.html"
                className="hover:text-white transition-colors font-medium"
              >
                Services
              </a>
              <a
                href="blogs.html"
                className="hover:text-white transition-colors font-medium"
              >
                Blogs
              </a>
              <a
                href="contact-us.html"
                className="hover:text-white transition-colors font-medium"
              >
                Contact us
              </a>
            </div>

            <div className="flex flex-col space-y-4">
              <a href="#" className="hover:text-white transition-colors font-medium">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-white transition-colors font-medium">
                Terms &amp; Conditions
              </a>
              <a href="#" className="hover:text-white transition-colors font-medium">
                Licensing
              </a>
            </div>

            {/* Contact Emails */}
            <div className="space-y-6">
              <div>
                <div className="font-semibold mb-1">Work with us</div>
                <a
                  href="mailto:contact@omega.cd"
                  className="text-blue-500 hover:underline"
                >
                  contact@omega.cd
                </a>
              </div>
              <div>
                <div className="font-semibold mb-1">Get in touch</div>
                <a
                  href="mailto:info@omega.cd"
                  className="text-blue-500 hover:underline"
                >
                  info@omega.cd
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 border-t border-gray-800 pt-8 text-center text-gray-500 text-sm">
          © {new Date().getFullYear()} Omega Research & Consulting. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
