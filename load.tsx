import React from 'react'
import { Sparkles, GraduationCap, BookOpen } from 'lucide-react'
import { Footer } from './footer'
const LOGO_DATA_URL = 'https://kti.edu.iq/photo/kti_52_0.png'
interface SelectionPageProps {
  onSelect: (type: 'zansi' | 'wezhay') => void
}
export const SelectionPage: React.FC<SelectionPageProps> = ({ onSelect }) => {
  return (
    <div
      className="bg-gradient-to-br from-white to-blue-50/30 overflow-hidden relative flex flex-col"
      dir="rtl"
    >
      {/* This wrapper ensures the main content and header take up the full screen, pushing the footer down */}
      <div className="min-h-screen flex flex-col">
        {/* Background Effects - Similar to Hero Section */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          {/* Glow orbs */}
          <div className="absolute w-[800px] h-[800px] rounded-full bg-gradient-to-br from-blue-500/10 via-blue-400/5 to-transparent blur-[150px] top-0 -right-64 animate-pulse-slow"></div>
          <div className="absolute w-[700px] h-[700px] rounded-full bg-gradient-to-br from-blue-400/10 via-blue-300/5 to-transparent blur-[130px] bottom-20 -left-32 animate-pulse-slower"></div>
          {/* Accent glows */}
          <div className="absolute w-[400px] h-[400px] rounded-full bg-gradient-to-tr from-blue-500/15 to-blue-300/5 blur-[100px] top-1/3 right-1/4 animate-float-slow"></div>
          <div className="absolute w-[350px] h-[350px] rounded-full bg-gradient-to-tr from-blue-400/10 to-blue-300/5 blur-[80px] bottom-1/3 left-1/3 animate-float-slower"></div>
          {/* Floating geometric shapes */}
          <div className="absolute top-1/4 right-1/6 w-16 h-16 border-2 border-blue-500/20 rounded-lg rotate-12 animate-float-slow"></div>
          <div className="absolute top-1/3 left-1/5 w-20 h-20 border-2 border-blue-400/20 rounded-full animate-float-slower"></div>
          <div className="absolute bottom-1/4 right-1/3 w-14 h-14 border-2 border-blue-300/20 rotate-45 animate-float"></div>
          <div className="absolute top-2/3 left-1/4 w-18 h-18 border-2 border-blue-400/20 rounded-lg rotate-12 animate-float-slowest"></div>
          {/* Hexagons */}
          <svg
            className="absolute top-1/2 right-1/5 w-24 h-24 text-blue-500/10 animate-float-slow"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M12,1L21.5,6.5V17.5L12,23L2.5,17.5V6.5L12,1z"></path>
          </svg>
          <svg
            className="absolute bottom-1/3 left-1/6 w-20 h-20 text-blue-400/10 animate-float-slower"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M12,1L21.5,6.5V17.5L12,23L2.5,17.5V6.5L12,1z"></path>
          </svg>
          {/* Floating particles */}
          {Array.from({
            length: 30,
          }).map((_, i) => {
            const size = 2 + Math.random() * 6
            const top = Math.random() * 100
            const left = Math.random() * 100
            const animationDuration = 15 + Math.random() * 30
            const opacity = 0.1 + Math.random() * 0.3
            return (
              <div
                key={i}
                className="absolute rounded-full bg-blue-500"
                style={{
                  width: `${size}px`,
                  height: `${size}px`,
                  top: `${top}%`,
                  left: `${left}%`,
                  opacity: opacity,
                  animation: `float ${animationDuration}s ease-in-out infinite`,
                }}
              />
            )
          })}
        </div>

        <header className="relative z-20 w-full p-4 sm:p-6 md:p-8">
          <div className="flex justify-start">
            <img
              src={LOGO_DATA_URL}
              alt="Logo"
              className="h-16 md:h-20 relative z-10 drop-shadow-2xl transform hover:scale-105 transition-transform duration-500"
            />
          </div>
        </header>

        {/* Main Content Wrapper */}
        <main className="flex-grow flex items-center justify-center p-4">
          <div className="relative z-10 text-center space-y-6 md:space-y-8 max-w-4xl mx-auto animate-fade-in">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-100 to-blue-50 text-blue-600 px-6 py-3 rounded-full text-sm sm:text-base font-bold shadow-lg animate-pulse">
              <Sparkles size={18} className="text-blue-500" />
              <span className="font-bold">پەیمانگای تەکنیکی کوردستان</span>
            </div>
            {/* Title */}
            <div className="space-y-3">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                <span className="block mb-1.5">فۆڕمی تۆمارکردن</span>
                
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 max-w-xl mx-auto leading-relaxed">
                تکایە جۆری خوێندنەکەت هەڵبژێرە بۆ بەردەوامبوون
              </p>
            </div>
            {/* Selection Cards */}
            <div className="grid grid-cols-2 gap-4 pt-6 max-w-lg mx-auto">
              {/* Zansi Card */}
              <button
                onClick={() => onSelect('zansi')}
                className="group relative bg-white rounded-2xl p-5 shadow-2xl border-2 border-transparent hover:border-blue-500 transition-all duration-500 transform hover:-translate-y-1.5 hover:scale-105 overflow-hidden"
              >
                {/* Background gradient on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                {/* Icon container */}
                <div className="relative mb-3">
                  <div className="absolute -inset-1.5 bg-gradient-to-br from-blue-500/20 to-blue-300/10 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative w-14 h-14 mx-auto bg-gradient-to-br from-[#0C8FCB] to-[#175988] rounded-2xl flex items-center justify-center text-white shadow-lg group-hover:shadow-2xl group-hover:shadow-blue-500/20 transition-all duration-500">
                    <GraduationCap size={28} />
                  </div>
                </div>
                {/* Content */}
                <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors duration-300">
                  زانستی
                </h3>
                <p className="text-xs text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
                  بەشە زانستییەکان
                </p>
                {/* Bottom accent */}
                <div className="absolute bottom-0 right-0 w-0 h-1.5 bg-gradient-to-r from-[#0C8FCB] to-[#175988] group-hover:w-full transition-all duration-500 rounded-b-2xl"></div>
              </button>
              {/* Wezhay Card */}
              <button
                onClick={() => onSelect('wezhay')}
                className="group relative bg-white rounded-2xl p-5 shadow-2xl border-2 border-transparent hover:border-gray-500 transition-all duration-500 transform hover:-translate-y-1.5 hover:scale-105 overflow-hidden"
              >
                {/* Background gradient on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-gray-50/50 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                {/* Icon container */}
                <div className="relative mb-3">
                  <div className="absolute -inset-1.5 bg-gradient-to-br from-gray-500/20 to-gray-300/10 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative w-14 h-14 mx-auto bg-gradient-to-br from-gray-600 to-gray-700 rounded-2xl flex items-center justify-center text-white shadow-lg group-hover:shadow-2xl group-hover:shadow-gray-500/20 transition-all duration-500">
                    <BookOpen size={28} />
                  </div>
                </div>
                {/* Content */}
                <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-gray-700 transition-colors duration-300">
                  وێژەیی
                </h3>
                <p className="text-xs text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
                  بەشە وێژەییەکان
                </p>
                {/* Bottom accent */}
                <div className="absolute bottom-0 right-0 w-0 h-1.5 bg-gradient-to-r from-gray-600 to-gray-700 group-hover:w-full transition-all duration-500 rounded-b-2xl"></div>
              </button>
            </div>
          </div>
        </main>
      </div>

      <Footer />
    </div>
  )
}