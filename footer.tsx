import React from 'react'
import {
  MapPin,
  PhoneCall,
  Mail,
  Twitter,
  Facebook,
  Linkedin,
  Instagram,
} from 'lucide-react'
export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }
  return (
    <footer
      className="bg-gray-900 text-white relative overflow-hidden"
      dir="rtl"
    >
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-10">
        <svg width="100%" height="100%">
          <pattern
            id="footer-pattern"
            x="0"
            y="0"
            width="40"
            height="40"
            patternUnits="userSpaceOnUse"
          >
            <rect x="0" y="0" width="4" height="4" fill="currentColor" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#footer-pattern)" />
        </svg>
      </div>
      {/* Main footer content */}
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="pt-16 pb-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
            {/* Logo and description */}
            <div>
              <div className="font-bold text-2xl flex items-center text-white relative group mb-6">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 to-blue-300/10 rounded-lg blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative flex items-center">
                  <span className="relative">
                    <span className="text-blue-400 relative z-10">
                      پەیمانگای تەکنیکی
                    </span>
                    <span className="relative z-10"> کوردستان</span>
                    <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-blue-500 to-blue-300 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-right"></span>
                  </span>
                </div>
              </div>
              <p className="text-gray-400 mb-8 leading-relaxed">
                پەیمانگای تەکنیکی کوردستان یەکێکە لە باشترین دامەزراوە
                پەروەردەییەکانی هەرێمی کوردستان بۆ پەروەردەی تەکنیکی و پیشەیی
              </p>
              <div className="flex space-x-4 space-x-reverse">
                {[
                  {
                    icon: <Twitter size={20} />,
                    label: 'Twitter',
                  },
                  {
                    icon: <Facebook size={20} />,
                    label: 'Facebook',
                  },
                  {
                    icon: <Linkedin size={20} />,
                    label: 'LinkedIn',
                  },
                  {
                    icon: <Instagram size={20} />,
                    label: 'Instagram',
                  },
                ].map((social, i) => (
                  <a
                    key={i}
                    href="#"
                    className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-blue-600 hover:text-white transition-all duration-300 transform hover:scale-110"
                    aria-label={social.label}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
            {/* Quick links */}
            <div>
              <h3 className="text-lg font-bold mb-6 relative inline-block">
                بەستەرە خێراکان
                <span className="absolute -bottom-2 right-0 w-12 h-1 bg-blue-500 rounded-full"></span>
              </h3>
              <ul className="space-y-4 text-gray-400">
                {[
                  {
                    label: 'دەربارەی پەیمانگا',
                    href: '#',
                  },
                  {
                    label: 'بەشەکان',
                    href: '#',
                  },
                  {
                    label: 'تۆمارکردن',
                    href: '#',
                  },
                  {
                    label: 'پەیوەندی',
                    href: '#',
                  },
                ].map((link, i) => (
                  <li key={i}>
                    <a
                      href={link.href}
                      className="hover:text-blue-400 transition-colors duration-300 flex items-center group"
                    >
                      <span className="w-0 h-0.5 bg-blue-500 ml-0 group-hover:w-3 group-hover:ml-2 transition-all duration-300"></span>
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            {/* Contact info */}
            <div>
              <h3 className="text-lg font-bold mb-6 relative inline-block">
                زانیاری پەیوەندی
                <span className="absolute -bottom-2 right-0 w-12 h-1 bg-blue-500 rounded-full"></span>
              </h3>
              <ul className="space-y-4 text-gray-400">
                <li className="flex items-start group">
                  <div className="mt-1 ml-3 w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center text-blue-400 group-hover:bg-blue-500 group-hover:text-white transition-all duration-300">
                    <MapPin size={16} />
                  </div>
                  <span className="group-hover:text-white transition-colors duration-300">
                    سلێمانی، هەرێمی کوردستانی عێراق
                  </span>
                </li>
                <li className="flex items-center group">
                  <div className="ml-3 w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center text-blue-400 group-hover:bg-blue-500 group-hover:text-white transition-all duration-300">
                    <PhoneCall size={16} />
                  </div>
                  <span className="group-hover:text-white transition-colors duration-300">
                    +964 750 123 4567
                  </span>
                </li>
                <li className="flex items-center group">
                  <div className="ml-3 w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center text-blue-400 group-hover:bg-blue-500 group-hover:text-white transition-all duration-300">
                    <Mail size={16} />
                  </div>
                  <span className="group-hover:text-white transition-colors duration-300">
                    info@kti.edu.iq
                  </span>
                </li>
              </ul>
            </div>
            {/* Created by section */}
            <div>
              <h3 className="text-lg font-bold mb-6 relative inline-block">
                دروستکراوە لەلایەن
                <span className="absolute -bottom-2 right-0 w-12 h-1 bg-blue-500 rounded-full"></span>
              </h3>
              <div className="bg-gray-800 rounded-lg p-6">
                <div className="text-center">
                  <div className="inline-block relative group mb-4">
                    <div className="absolute -inset-2 bg-gradient-to-r from-blue-400/20 to-indigo-400/20 blur-lg rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <span className="relative font-black text-transparent bg-clip-text bg-gradient-to-r from-[#0C8FCB] via-[#0EA5E9] to-[#175988] text-3xl">
                      ساهەند
                    </span>
                  </div>
                  <p className="text-gray-400 text-sm">
                    پەرەپێدەری سیستەمی تۆمارکردن
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap gap-4 mt-6">
                <a
                  href="#"
                  className="text-gray-400 hover:text-blue-400 transition-colors duration-300 text-sm"
                >
                  سیاسەتی تایبەتمەندی
                </a>
                <span className="text-gray-600">•</span>
                <a
                  href="#"
                  className="text-gray-400 hover:text-blue-400 transition-colors duration-300 text-sm"
                >
                  مەرجەکانی خزمەتگوزاری
                </a>
              </div>
            </div>
          </div>
        </div>
        {/* Copyright */}
        <div className="py-6 border-t border-gray-800 text-center">
          <p className="text-gray-500 text-sm">
            © ٢٠٢٥ پەیمانگای تەکنیکی کوردستان. هەموو مافەکان پارێزراون.
          </p>
        </div>
      </div>
    </footer>
  )
}
