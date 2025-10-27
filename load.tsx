import React, { useState, useRef } from 'react'
import {
  GraduationCap,
  BookOpen,
  HardHat,
  Briefcase,
  ArrowRight,
  Shield,
  CheckCircle2,
  Star,
  ExternalLink,
} from 'lucide-react'
const LOGO_DATA_URL = 'https://kti.edu.iq/photo/kti_52_0.png'
const BACKGROUND_IMAGE = 'https://kti.edu.iq/photo/kti_53_01702585603.jpg'
const KTI_WEBSITE = 'https://kti.edu.iq'
interface SelectionPageProps {
  onSelect: (type: 'zansi' | 'wezhay' | 'peshassazi' | 'bazrgani') => void
}
export const SelectionPage: React.FC<SelectionPageProps> = ({ onSelect }) => {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)
  const departmentSectionRef = useRef<HTMLDivElement>(null)
  const categories = [
    {
      id: 'zansi' as const,
      title: 'زانستی',
      description: 'بەشە زانستییەکان',
      details: 'بۆ قوتابیانی لقی زانست',
      icon: GraduationCap,
      gradient: 'from-blue-500/20 via-blue-400/10 to-transparent',
      iconColor: 'text-blue-400',
      borderGlow: 'group-hover:shadow-blue-500/50',
    },
    {
      id: 'wezhay' as const,
      title: 'وێژەیی',
      description: 'بەشە وێژەییەکان',
      details: 'بۆ قوتابیانی لقی ئەدەبی',
      icon: BookOpen,
      gradient: 'from-purple-500/20 via-purple-400/10 to-transparent',
      iconColor: 'text-purple-400',
      borderGlow: 'group-hover:shadow-purple-500/50',
    },
    {
      id: 'peshassazi' as const,
      title: 'پیشەسازی',
      description: 'بەشە پیشەسازییەکان',
      details: 'بۆ قوتابیانی لقی پیشەیی',
      icon: HardHat,
      gradient: 'from-emerald-500/20 via-emerald-400/10 to-transparent',
      iconColor: 'text-emerald-400',
      borderGlow: 'group-hover:shadow-emerald-500/50',
    },
    {
      id: 'bazrgani' as const,
      title: 'بازرگانی',
      description: 'بەشە بازرگانییەکان',
      details: 'بۆ قوتابیانی لقی بازرگانی',
      icon: Briefcase,
      gradient: 'from-amber-500/20 via-amber-400/10 to-transparent',
      iconColor: 'text-amber-400',
      borderGlow: 'group-hover:shadow-amber-500/50',
    },
  ]
  const handleLearnMore = () => {
    window.open(KTI_WEBSITE, '_blank', 'noopener,noreferrer')
  }
  const scrollToDepartments = () => {
    departmentSectionRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
  }
  return (
    <div className="min-h-screen w-full bg-slate-950 relative" dir="rtl">
      {/* Background Image with 70% Dark Overlay */}
      <div className="fixed inset-0 z-0">
        <img
          src={BACKGROUND_IMAGE}
          alt="Kurdistan Technical Institute"
          className="w-full h-full object-cover"
        />
        {/* 70% dark overlay */}
        <div className="absolute inset-0 bg-slate-950/70"></div>
      </div>
      {/* Main Content */}
      <div className="container mx-auto max-w-7xl px-4 md:px-6 relative z-10 py-8 md:py-12 lg:py-16 min-h-screen flex items-center">
        <div className="grid lg:grid-cols-2 gap-6 md:gap-8 lg:gap-12 w-full">
          {/* Left Side - Hero Text & Department Cards */}
          <div className="space-y-4 md:space-y-6">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-blue-500/20 backdrop-blur-xl px-2.5 md:px-3 py-1 md:py-1.5 rounded-full border border-blue-400/30">
              <Star
                size={12}
                className="text-blue-400 md:hidden"
                fill="currentColor"
              />
              <Star
                size={14}
                className="text-blue-400 hidden md:block"
                fill="currentColor"
              />
              <span className="text-blue-100 text-xs font-medium tracking-wide">
                پەیمانگای تەکنیکی کوردستان
              </span>
            </div>
            {/* Main Heading */}
            <div className="space-y-1 md:space-y-2">
              <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black text-white leading-tight tracking-tight">
                فۆڕمی تۆمارکردن
              </h1>
              <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-blue-400 tracking-wide">
                ساڵی خوێندنی ٢٠٢٥-٢٠٢٦
              </h2>
            </div>
            {/* Description */}
            <p className="text-sm md:text-base text-gray-300 leading-relaxed max-w-xl font-light">
              دەرفەتی خوێندن لە یەکێک لە باشترین پەیمانگاکانی هەرێمی کوردستان.
              جۆری خوێندنەکەت هەڵبژێرە و هەنگاوی یەکەم بنێ بۆ داهاتوویەکی
              گەشاوە.
            </p>
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row flex-wrap gap-2 md:gap-3">
              <button
                onClick={scrollToDepartments}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 md:py-3 px-5 md:px-6 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-blue-500/30 text-sm"
              >
                دەست پێبکە
                <ArrowRight
                  size={16}
                  className="md:w-[18px] md:h-[18px] rotate-180"
                />
              </button>
              <button
                onClick={handleLearnMore}
                className="bg-white/10 hover:bg-white/20 backdrop-blur-xl text-white font-semibold py-2.5 md:py-3 px-5 md:px-6 rounded-lg border border-white/30 hover:border-white/50 transition-all duration-300 flex items-center justify-center gap-2 text-sm"
              >
                زیاتر بزانە
                <ExternalLink size={16} className="md:w-[18px] md:h-[18px]" />
              </button>
            </div>
            {/* Department Cards Section */}
            <div className="pt-2 md:pt-4" ref={departmentSectionRef}>
              <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-white mb-3 md:mb-4 tracking-wide">
                بەشەکان هەڵبژێرە
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 md:gap-3">
                {categories.map((category) => {
                  const Icon = category.icon
                  const isHovered = hoveredCard === category.id
                  return (
                    <button
                      key={category.id}
                      onClick={() => onSelect(category.id)}
                      onMouseEnter={() => setHoveredCard(category.id)}
                      onMouseLeave={() => setHoveredCard(null)}
                      className="group relative"
                    >
                      {/* Glassmorphism Card */}
                      <div
                        className={`relative bg-white/5 backdrop-blur-2xl rounded-lg md:rounded-xl p-3 md:p-4 border border-white/10 transition-all duration-300 hover:bg-white/10 hover:scale-105 ${category.borderGlow} hover:shadow-2xl h-full`}
                      >
                        {/* Gradient Overlay */}
                        <div
                          className={`absolute inset-0 bg-gradient-to-br ${category.gradient} rounded-lg md:rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                        ></div>
                        {/* Content */}
                        <div className="relative z-10 space-y-2 md:space-y-3 text-right">
                          {/* Icon */}
                          <div className="inline-flex">
                            <div className="bg-white/10 backdrop-blur-xl rounded-lg p-2 md:p-2.5 group-hover:scale-110 transition-transform duration-300">
                              <Icon
                                size={20}
                                className={`${category.iconColor} md:w-6 md:h-6`}
                                strokeWidth={2}
                              />
                            </div>
                          </div>
                          {/* Text */}
                          <div className="space-y-0.5 md:space-y-1">
                            <h4 className="text-base md:text-lg font-bold text-white tracking-wide">
                              {category.title}
                            </h4>
                            <p className="text-xs text-gray-300 font-light">
                              {category.details}
                            </p>
                          </div>
                          {/* Action Arrow */}
                          <div className="flex items-center justify-end pt-1 md:pt-2">
                            <ArrowRight
                              size={14}
                              className="text-gray-400 group-hover:text-white transform rotate-180 group-hover:translate-x-1 transition-all duration-300 md:w-4 md:h-4"
                            />
                          </div>
                        </div>
                        {/* Hover Indicator */}
                        {isHovered && (
                          <div className="absolute top-2 left-2">
                            <CheckCircle2
                              size={16}
                              className={`${category.iconColor} md:w-[18px] md:h-[18px]`}
                            />
                          </div>
                        )}
                        {/* Glass Reflection */}
                        <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent rounded-lg md:rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>
          </div>
          {/* Right Side - Stats Card */}
          <div className="space-y-3 md:space-y-4">
            {/* Stats Card with Glassmorphism */}
            <div className="bg-white/5 backdrop-blur-2xl rounded-xl md:rounded-2xl p-4 md:p-6 border border-white/10 shadow-2xl">
              {/* Header with Avatars */}
              <div className="flex items-center gap-2 md:gap-3 mb-4 md:mb-6 pb-3 md:pb-4 border-b border-white/10">
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 border-2 border-slate-800 flex items-center justify-center text-white font-bold text-xs md:text-sm">
                    م
                  </div>
                  <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 border-2 border-slate-800 flex items-center justify-center text-white font-bold text-xs md:text-sm">
                    س
                  </div>
                  <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 border-2 border-slate-800 flex items-center justify-center text-white font-bold text-xs md:text-sm">
                    ئ
                  </div>
                </div>
                <div>
                  <h3 className="text-white font-bold text-sm md:text-base tracking-wide">
                    قوتابیانی سەرکەوتوو
                  </h3>
                  <p className="text-gray-400 text-xs font-light">
                    بەشداری بکە لە تۆڕی ئێمە
                  </p>
                </div>
              </div>
              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-2 md:gap-3 mb-3 md:mb-4">
                {/* Stat 1 */}
                <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-lg md:rounded-xl p-3 md:p-4 border border-white/10">
                  <div className="text-2xl md:text-3xl font-black text-white mb-0.5 md:mb-1 tracking-tight">
                    ١٠+
                  </div>
                  <div className="text-gray-400 text-xs font-light tracking-wide">
                    ساڵی ئەزموون
                  </div>
                </div>
                {/* Stat 2 */}
                <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-lg md:rounded-xl p-3 md:p-4 border border-white/10">
                  <div className="text-2xl md:text-3xl font-black text-white mb-0.5 md:mb-1 tracking-tight">
                    ٢٤/٧
                  </div>
                  <div className="text-gray-400 text-xs font-light tracking-wide">
                    پشتگیری قوتابیان
                  </div>
                </div>
                {/* Stat 3 */}
                <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-lg md:rounded-xl p-3 md:p-4 border border-white/10">
                  <div className="text-2xl md:text-3xl font-black text-white mb-0.5 md:mb-1 tracking-tight">
                    ٩٥٪
                  </div>
                  <div className="text-gray-400 text-xs font-light tracking-wide">
                    ڕێژەی سەرکەوتن
                  </div>
                </div>
                {/* Stat 4 */}
                <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-lg md:rounded-xl p-3 md:p-4 border border-white/10">
                  <div className="text-2xl md:text-3xl font-black text-white mb-0.5 md:mb-1 tracking-tight">
                    ١٢+
                  </div>
                  <div className="text-gray-400 text-xs font-light tracking-wide">
                    بەشی جیاواز
                  </div>
                </div>
              </div>
              {/* Certification Badge */}
              <div className="bg-gradient-to-r from-blue-500/20 to-blue-600/20 backdrop-blur-xl rounded-lg md:rounded-xl p-2.5 md:p-3 border border-blue-400/30 flex items-center gap-2 md:gap-3">
                <div className="bg-blue-500/30 backdrop-blur-xl rounded-lg p-1.5 md:p-2">
                  <Shield size={18} className="text-blue-300 md:w-5 md:h-5" />
                </div>
                <div>
                  <div className="text-white font-bold text-xs md:text-sm tracking-wide">
                    پارێزراو و متمانەپێکراو
                  </div>
                  <div className="text-blue-200 text-xs font-light">
                    بڕوانامەی ISO 9001
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
