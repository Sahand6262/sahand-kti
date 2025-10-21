import React, { useEffect, useState, useRef, createElement } from 'react';
import ReactDOM from 'react-dom/client';
import { jsPDF } from 'jspdf';
import { toPng } from 'html-to-image';

// Form content component moved outside to prevent re-creation on each render
const FormContent = ({
  formData,
  handleChange,
  handleArrayChange,
  isMobile = false,
}) => (
  <form className={`space-y-2 ${isMobile ? 'text-sm' : 'text-xs'}`}>
    {/* Personal Info */}
    <div className="group">
      <div className="bg-gradient-to-r from-red-500 via-red-600 to-rose-600 text-white text-center py-1 rounded-lg mb-2 shadow-lg transform transition-all duration-300 hover:shadow-xl hover:scale-[1.01]">
        <span
          className={`font-bold ${isMobile ? 'text-base' : 'text-xs'} tracking-wide`}
        >
          زانیاری كەسی
        </span>
      </div>
      <div
        className={`grid ${isMobile ? 'grid-cols-1 gap-4' : 'grid-cols-3 gap-2'} mb-2`}
      >
        <div className="relative group/input">
          <label className="block text-gray-700 mb-1 font-semibold text-xs transition-colors group-hover/input:text-red-600">
            ناوی فێرخواز
          </label>
          <input
            type="text"
            name="personalName"
            value={formData.personalName}
            onChange={handleChange}
            className={`w-full border-2 border-gray-200 p-1.5 rounded-lg focus:ring-2 focus:ring-red-400 focus:border-red-400 transition-all duration-300 hover:border-gray-300 bg-white shadow-sm hover:shadow-md ${isMobile ? 'text-base' : 'text-xs'}`}
            placeholder="ناوی تەواو"
          />
        </div>
        <div className="relative">
          <label className="block text-gray-700 mb-1 font-semibold text-xs">
            ڕەگەز
          </label>
          <div className="flex space-x-4 mt-1">
            <label className="flex items-center ml-4 cursor-pointer group/radio">
              <input
                type="radio"
                name="gender"
                value="male"
                checked={formData.gender === 'male'}
                onChange={handleChange}
                className="ml-2 w-3 h-3 text-red-600 focus:ring-2 focus:ring-red-400 cursor-pointer"
              />
              <span className="transition-colors group-hover/radio:text-red-600 font-medium text-xs">
                نێر
              </span>
            </label>
            <label className="flex items-center cursor-pointer group/radio">
              <input
                type="radio"
                name="gender"
                value="female"
                checked={formData.gender === 'female'}
                onChange={handleChange}
                className="ml-2 w-3 h-3 text-red-600 focus:ring-2 focus:ring-red-400 cursor-pointer"
              />
              <span className="transition-colors group-hover/radio:text-red-600 font-medium text-xs">
                مێ
              </span>
            </label>
          </div>
        </div>
        <div className="relative group/input">
          <label className="block text-gray-700 mb-1 font-semibold text-xs transition-colors group-hover/input:text-red-600">
            ساڵی لەدایکبوون
          </label>
          <input
            type="text"
            name="birthYear"
            value={formData.birthYear}
            onChange={handleChange}
            className={`w-full border-2 border-gray-200 p-1.5 rounded-lg focus:ring-2 focus:ring-red-400 focus:border-red-400 transition-all duration-300 hover:border-gray-300 bg-white shadow-sm hover:shadow-md ${isMobile ? 'text-base' : 'text-xs'}`}
            placeholder="YYYY"
          />
        </div>
      </div>
      <div
        className={`grid ${isMobile ? 'grid-cols-1 gap-4' : 'grid-cols-3 gap-2'} mb-2`}
      >
        <div className="relative group/input">
          <label className="block text-gray-700 mb-1 font-semibold text-xs transition-colors group-hover/input:text-red-600">
            ناونیشان
          </label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className={`w-full border-2 border-gray-200 p-1.5 rounded-lg focus:ring-2 focus:ring-red-400 focus:border-red-400 transition-all duration-300 hover:border-gray-300 bg-white shadow-sm hover:shadow-md ${isMobile ? 'text-base' : 'text-xs'}`}
            placeholder="ناونیشانی تەواو"
          />
        </div>
        <div className="relative group/input">
          <label className="block text-gray-700 mb-1 font-semibold text-xs transition-colors group-hover/input:text-red-600">
            شار/ناوچە
          </label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            className={`w-full border-2 border-gray-200 p-1.5 rounded-lg focus:ring-2 focus:ring-red-400 focus:border-red-400 transition-all duration-300 hover:border-gray-300 bg-white shadow-sm hover:shadow-md ${isMobile ? 'text-base' : 'text-xs'}`}
            placeholder="شار"
          />
        </div>
        <div className="relative group/input">
          <label className="block text-gray-700 mb-1 font-semibold text-xs transition-colors group-hover/input:text-red-600">
            گەڕەک
          </label>
          <input
            type="text"
            name="district"
            value={formData.district}
            onChange={handleChange}
            className={`w-full border-2 border-gray-200 p-1.5 rounded-lg focus:ring-2 focus:ring-red-400 focus:border-red-400 transition-all duration-300 hover:border-gray-300 bg-white shadow-sm hover:shadow-md ${isMobile ? 'text-base' : 'text-xs'}`}
            placeholder="گەڕەک"
          />
        </div>
      </div>
      <div
        className={`grid ${isMobile ? 'grid-cols-1 gap-4' : 'grid-cols-3 gap-2'}`}
      >
        <div className="relative group/input">
          <label className="block text-gray-700 mb-1 font-semibold text-xs transition-colors group-hover/input:text-red-600">
            ژ. مۆبایل(١)
          </label>
          <input
            type="text"
            name="phone1"
            value={formData.phone1}
            onChange={handleChange}
            className={`w-full border-2 border-gray-200 p-1.5 rounded-lg focus:ring-2 focus:ring-red-400 focus:border-red-400 transition-all duration-300 hover:border-gray-300 bg-white shadow-sm hover:shadow-md ${isMobile ? 'text-base' : 'text-xs'}`}
            placeholder="07XX XXX XXXX"
            dir="ltr"
          />
        </div>
        <div className="relative group/input">
          <label className="block text-gray-700 mb-1 font-semibold text-xs transition-colors group-hover/input:text-red-600">
            ژ. مۆبایل(٢)
          </label>
          <input
            type="text"
            name="phone2"
            value={formData.phone2}
            onChange={handleChange}
            className={`w-full border-2 border-gray-200 p-1.5 rounded-lg focus:ring-2 focus:ring-red-400 focus:border-red-400 transition-all duration-300 hover:border-gray-300 bg-white shadow-sm hover:shadow-md ${isMobile ? 'text-base' : 'text-xs'}`}
            placeholder="07XX XXX XXXX"
            dir="ltr"
          />
        </div>
        <div className="relative group/input">
          <label className="block text-gray-700 mb-1 font-semibold text-xs transition-colors group-hover/input:text-red-600">
            ئیمەیل
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full border-2 border-gray-200 p-1.5 rounded-lg focus:ring-2 focus:ring-red-400 focus:border-red-400 transition-all duration-300 hover:border-gray-300 bg-white shadow-sm hover:shadow-md ${isMobile ? 'text-base' : 'text-xs'}`}
            dir="ltr"
            placeholder="example@email.com"
          />
        </div>
      </div>
    </div>
    {/* Education Info */}
    <div className="group">
      <div className="bg-gradient-to-r from-red-500 via-red-600 to-rose-600 text-white text-center py-1 rounded-lg mb-2 shadow-lg transform transition-all duration-300 hover:shadow-xl hover:scale-[1.01]">
        <span
          className={`font-bold ${isMobile ? 'text-base' : 'text-xs'} tracking-wide`}
        >
          ئاستی خوێندن
        </span>
      </div>
      <div
        className={`grid ${isMobile ? 'grid-cols-1 gap-4' : 'grid-cols-3 gap-2'} mb-2`}
      >
        <div className="relative">
          <label className="block text-gray-700 mb-1 font-semibold text-xs">
            دەرچووی دەورانەی
          </label>
          <div className="bg-gradient-to-r from-red-500 to-rose-600 text-white text-center py-1.5 rounded-lg font-bold shadow-md hover:shadow-lg transition-all duration-300 hover:scale-[1.02] text-xs">
            زانستی
          </div>
        </div>
        <div className="relative group/input">
          <label className="block text-gray-700 mb-1 font-semibold text-xs transition-colors group-hover/input:text-red-600">
            ساڵی دەرچوون
          </label>
          <input
            type="text"
            name="graduationYear"
            value={formData.graduationYear}
            onChange={handleChange}
            className={`w-full border-2 border-gray-200 p-1.5 rounded-lg focus:ring-2 focus:ring-red-400 focus:border-red-400 transition-all duration-300 hover:border-gray-300 bg-white shadow-sm hover:shadow-md ${isMobile ? 'text-base' : 'text-xs'}`}
            placeholder="YYYY"
          />
        </div>
        <div className="relative">
          <label className="block text-gray-700 mb-1 font-semibold text-xs">
            جۆری سیستەم
          </label>
          <div className="flex space-x-4 mt-1">
            <label className="flex items-center ml-4 cursor-pointer group/radio">
              <input
                type="radio"
                name="educationSystem"
                value="regular"
                checked={formData.educationSystem === 'regular'}
                onChange={handleChange}
                className="ml-2 w-3 h-3 text-red-600 focus:ring-2 focus:ring-red-400 cursor-pointer"
              />
              <span className="transition-colors group-hover/radio:text-red-600 font-medium text-xs">
                ئاسایی
              </span>
            </label>
            <label className="flex items-center cursor-pointer group/radio">
              <input
                type="radio"
                name="educationSystem"
                value="swedish"
                checked={formData.educationSystem === 'swedish'}
                onChange={handleChange}
                className="ml-2 w-3 h-3 text-red-600 focus:ring-2 focus:ring-red-400 cursor-pointer"
              />
              <span className="transition-colors group-hover/radio:text-red-600 font-medium text-xs">
                سودی
              </span>
            </label>
          </div>
        </div>
      </div>
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-2 rounded-lg border-2 border-blue-200 shadow-sm hover:shadow-md transition-all duration-300">
        <label className="block text-gray-700 mb-1 font-bold text-xs">
          ژمارەی تاقیکردنەوە
        </label>
        <div
          className={`flex ${isMobile ? 'flex-wrap' : ''} justify-center gap-1`}
        >
          {[...Array(13)].map((_, i) => (
            <input
              key={i}
              type="text"
              maxLength={1}
              value={formData.examTestNumbers[i]}
              onChange={(e) =>
                handleArrayChange('examTestNumbers', i, e.target.value)
              }
              className={`${isMobile ? 'w-9 h-9 text-base' : 'w-6 h-7 text-xs'} border-2 border-blue-300 rounded-lg text-center font-bold text-blue-700 focus:ring-2 focus:ring-blue-400 focus:border-blue-500 transition-all duration-300 hover:border-blue-400 bg-white shadow-sm hover:shadow-md hover:scale-110`}
            />
          ))}
        </div>
      </div>
    </div>
    {/* Grades Info */}
    <div className="group">
      <div className="bg-gradient-to-r from-red-500 via-red-600 to-rose-600 text-white text-center py-1 rounded-lg mb-2 shadow-lg transform transition-all duration-300 hover:shadow-xl hover:scale-[1.01]">
        <span
          className={`font-bold ${isMobile ? 'text-base' : 'text-xs'} tracking-wide`}
        >
          زانیاری نمرەی فێرخواز
        </span>
      </div>
      <div className="bg-gradient-to-br from-amber-50 to-yellow-50 p-2 rounded-lg border-l-4 border-amber-400 mb-2 shadow-md hover:shadow-lg transition-all duration-300">
        <p
          className={`${isMobile ? 'text-sm' : 'text-xs'} text-gray-700 leading-relaxed font-medium`}
        >
          بەڕێوەبەری بەڕێز: نمرەکانی خوارەوە دەبێت هاوتای بڕوانامە بێت کە
          دەهێنرێت بۆ پەیمانگە.
        </p>
      </div>
      <div
        className={`grid ${isMobile ? 'grid-cols-1 gap-4' : 'grid-cols-4 gap-2'} mb-2`}
      >
        <div className="relative group/input">
          <label className="block text-gray-700 mb-1 font-semibold text-xs transition-colors group-hover/input:text-red-600">
            پارێزگا
          </label>
          <input
            type="text"
            name="province"
            value={formData.province}
            onChange={handleChange}
            className={`w-full border-2 border-gray-200 p-1.5 rounded-lg focus:ring-2 focus:ring-red-400 focus:border-red-400 transition-all duration-300 hover:border-gray-300 bg-white shadow-sm hover:shadow-md ${isMobile ? 'text-base' : 'text-xs'}`}
            placeholder="پارێزگا"
          />
        </div>
        <div className="relative group/input">
          <label className="block text-gray-700 mb-1 font-semibold text-xs transition-colors group-hover/input:text-red-600">
            پەروەردە
          </label>
          <input
            type="text"
            name="education"
            value={formData.education}
            onChange={handleChange}
            className={`w-full border-2 border-gray-200 p-1.5 rounded-lg focus:ring-2 focus:ring-red-400 focus:border-red-400 transition-all duration-300 hover:border-gray-300 bg-white shadow-sm hover:shadow-md ${isMobile ? 'text-base' : 'text-xs'}`}
            placeholder="پەروەردە"
          />
        </div>
        <div className="relative group/input">
          <label className="block text-gray-700 mb-1 font-semibold text-xs transition-colors group-hover/input:text-red-600">
            گەڕەک
          </label>
          <input
            type="text"
            name="district2"
            value={formData.district2}
            onChange={handleChange}
            className={`w-full border-2 border-gray-200 p-1.5 rounded-lg focus:ring-2 focus:ring-red-400 focus:border-red-400 transition-all duration-300 hover:border-gray-300 bg-white shadow-sm hover:shadow-md ${isMobile ? 'text-base' : 'text-xs'}`}
            placeholder="گەڕەک"
          />
        </div>
        <div className="relative group/input">
          <label className="block text-gray-700 mb-1 font-semibold text-xs transition-colors group-hover/input:text-red-600">
            ساڵی خوێندن
          </label>
          <input
            type="text"
            name="studyYear"
            value={formData.studyYear}
            onChange={handleChange}
            className={`w-full border-2 border-gray-200 p-1.5 rounded-lg focus:ring-2 focus:ring-red-400 focus:border-red-400 transition-all duration-300 hover:border-gray-300 bg-white shadow-sm hover:shadow-md ${isMobile ? 'text-base' : 'text-xs'}`}
            placeholder="YYYY"
          />
        </div>
      </div>
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-2 rounded-lg border-2 border-blue-200 shadow-sm hover:shadow-md transition-all duration-300">
        <label className="block text-gray-700 mb-1 font-bold text-xs">
          خول
        </label>
        <div className="flex space-x-6 justify-center">
          <label className="flex items-center ml-6 cursor-pointer group/radio">
            <input
              type="radio"
              name="semester"
              value="second"
              checked={formData.semester === 'second'}
              onChange={handleChange}
              className="ml-2 w-3 h-3 text-blue-600 focus:ring-2 focus:ring-blue-400 cursor-pointer"
            />
            <span className="transition-colors group-hover/radio:text-blue-600 font-bold text-xs">
              خولی دووەم
            </span>
          </label>
          <label className="flex items-center cursor-pointer group/radio">
            <input
              type="radio"
              name="semester"
              value="first"
              checked={formData.semester === 'first'}
              onChange={handleChange}
              className="ml-2 w-3 h-3 text-blue-600 focus:ring-2 focus:ring-blue-400 cursor-pointer"
            />
            <span className="transition-colors group-hover/radio:text-blue-600 font-bold text-xs">
              خولی یەکەم
            </span>
          </label>
        </div>
      </div>
    </div>
    {/* Subjects Table */}
    <div className="group">
      <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 text-white text-center py-1 rounded-lg mb-2 shadow-lg transform transition-all duration-300 hover:shadow-xl hover:scale-[1.01]">
        <span
          className={`font-bold ${isMobile ? 'text-base' : 'text-xs'} tracking-wide`}
        >
          وانەکان و نمرەکان
        </span>
      </div>
      <div className="border-2 border-gray-200 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
        <div className="bg-gradient-to-r from-blue-100 to-indigo-100 border-b-2 border-blue-300 p-1 text-center font-bold text-blue-800 text-xs">
          وانەکان
        </div>
        <div
          className={`grid ${isMobile ? 'grid-cols-3 gap-2' : 'grid-cols-9 gap-1'} p-1 bg-gradient-to-br from-gray-50 to-blue-50`}
        >
          {formData.subjects.map((subject, i) => (
            <input
              key={i}
              type="text"
              value={subject}
              onChange={(e) => handleArrayChange('subjects', i, e.target.value)}
              className={`border-2 border-gray-300 ${isMobile ? 'h-10 text-base' : 'h-7 text-xs'} p-1 text-center font-medium rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all duration-300 hover:border-blue-300 bg-white shadow-sm hover:shadow-md hover:scale-105`}
              placeholder={`وانە ${i + 1}`}
            />
          ))}
        </div>
        <div
          className={`grid ${isMobile ? 'grid-cols-3' : 'grid-cols-10'} gap-1 p-1 bg-white`}
        >
          <div
            className={`bg-gradient-to-r from-gray-300 to-gray-400 p-1 text-center font-bold text-gray-800 flex items-center justify-center rounded-lg shadow-md ${isMobile ? 'col-span-3' : ''} text-xs`}
          >
            ژمارە
          </div>
          {formData.examNumbers.map((number, i) => (
            <input
              key={i}
              type="text"
              value={number}
              onChange={(e) =>
                handleArrayChange('examNumbers', i, e.target.value)
              }
              className={`border-2 border-gray-300 ${isMobile ? 'h-10 text-base' : 'h-7 text-xs'} p-1 text-center font-bold rounded-lg focus:ring-2 focus:ring-gray-400 focus:border-gray-400 transition-all duration-300 hover:border-gray-400 bg-white shadow-sm hover:shadow-md hover:scale-105`}
            />
          ))}
        </div>
        <div
          className={`grid ${isMobile ? 'grid-cols-3' : 'grid-cols-10'} gap-1 p-1 bg-gradient-to-br from-red-50 to-rose-50`}
        >
          <div
            className={`bg-gradient-to-r from-red-500 to-rose-600 text-white p-1 text-center font-bold flex items-center justify-center rounded-lg shadow-md ${isMobile ? 'col-span-3' : ''} text-xs`}
          >
            بە ژمارە
          </div>
          {formData.firstGradesNumeric.map((grade, i) => (
            <input
              key={i}
              type="text"
              value={grade}
              onChange={(e) =>
                handleArrayChange('firstGradesNumeric', i, e.target.value)
              }
              className={`border-2 border-red-300 ${isMobile ? 'h-10 text-base' : 'h-7 text-xs'} p-1 text-center font-bold text-red-700 rounded-lg focus:ring-2 focus:ring-red-400 focus:border-red-400 transition-all duration-300 hover:border-red-400 bg-white shadow-sm hover:shadow-md hover:scale-105`}
            />
          ))}
        </div>
        <div
          className={`grid ${isMobile ? 'grid-cols-3' : 'grid-cols-10'} gap-1 p-1 bg-gradient-to-br from-red-50 to-rose-50`}
        >
          <div
            className={`bg-gradient-to-r from-red-500 to-rose-600 text-white p-1 text-center font-bold flex items-center justify-center rounded-lg shadow-md ${isMobile ? 'col-span-3' : ''} text-xs`}
          >
            بەنووسین
          </div>
          {formData.firstGradesWritten.map((grade, i) => (
            <input
              key={i}
              type="text"
              value={grade}
              onChange={(e) =>
                handleArrayChange('firstGradesWritten', i, e.target.value)
              }
              className={`border-2 border-red-300 ${isMobile ? 'h-10 text-base' : 'h-7 text-xs'} p-1 text-center font-bold text-red-700 rounded-lg focus:ring-2 focus:ring-red-400 focus:border-red-400 transition-all duration-300 hover:border-red-400 bg-white shadow-sm hover:shadow-md hover:scale-105`}
            />
          ))}
        </div>
        <div
          className={`grid ${isMobile ? 'grid-cols-3' : 'grid-cols-10'} gap-1 p-1 bg-gradient-to-br from-yellow-50 to-amber-50`}
        >
          <div
            className={`bg-gradient-to-r from-yellow-400 to-amber-500 text-white p-1 text-center font-bold flex items-center justify-center rounded-lg shadow-md ${isMobile ? 'col-span-3' : ''} text-xs`}
          >
            خولی دووەم
          </div>
          {formData.secondGradesNumeric.map((grade, i) => (
            <input
              key={i}
              type="text"
              value={grade}
              onChange={(e) =>
                handleArrayChange('secondGradesNumeric', i, e.target.value)
              }
              className={`border-2 border-yellow-300 ${isMobile ? 'h-10 text-base' : 'h-7 text-xs'} p-1 text-center font-bold text-yellow-700 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition-all duration-300 hover:border-yellow-400 bg-white shadow-sm hover:shadow-md hover:scale-105`}
            />
          ))}
        </div>
        <div
          className={`grid ${isMobile ? 'grid-cols-3' : 'grid-cols-10'} gap-1 p-1 bg-gradient-to-br from-yellow-50 to-amber-50`}
        >
          <div
            className={`bg-gradient-to-r from-yellow-400 to-amber-500 text-white p-1 text-center font-bold flex items-center justify-center rounded-lg shadow-md ${isMobile ? 'col-span-3' : ''} text-xs`}
          >
            بەنووسین
          </div>
          {formData.secondGradesWritten.map((grade, i) => (
            <input
              key={i}
              type="text"
              value={grade}
              onChange={(e) =>
                handleArrayChange('secondGradesWritten', i, e.target.value)
              }
              className={`border-2 border-yellow-300 ${isMobile ? 'h-10 text-base' : 'h-7 text-xs'} p-1 text-center font-bold text-yellow-700 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition-all duration-300 hover:border-yellow-400 bg-white shadow-sm hover:shadow-md hover:scale-105`}
            />
          ))}
        </div>
      </div>
    </div>
  </form>
);

function App() {
  const [formData, setFormData] = useState({
    personalName: '',
    birthPlace: '',
    address: '',
    city: '',
    district: '',
    gender: '',
    phone1: '',
    phone2: '',
    email: '',
    educationLevel: '',
    graduationYear: '',
    department: '',
    semester: 'first',
    birthYear: '',
    educationSystem: '',
    province: '',
    education: '',
    district2: '',
    studyYear: '',
    examTestNumbers: Array(13).fill(''),
    subjects: Array(9).fill(''),
    examNumbers: Array(9).fill(''),
    firstGradesNumeric: Array(9).fill(''),
    firstGradesWritten: Array(9).fill(''),
    secondGradesNumeric: Array(9).fill(''),
    secondGradesWritten: Array(9).fill(''),
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const printRef = useRef(null);
  const desktopPrintRef = useRef(null);

  useEffect(() => {
    if (showSuccess || showError) {
      const timer = setTimeout(() => {
        setShowSuccess(false);
        setShowError(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [showSuccess, showError]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleArrayChange = (arrayName, index, value) => {
    setFormData((prevState) => {
      const newArray = [...prevState[arrayName]];
      newArray[index] = value;
      return {
        ...prevState,
        [arrayName]: newArray,
      };
    });
  };

  // Enhanced PDF generation function with better error handling
  const generatePDF = async () => {
    setIsGenerating(true);
    setShowError(false);
    setShowSuccess(false);
    try {
      console.log('Starting PDF generation...');
      // Use the appropriate ref based on device
      const targetRef = window.innerWidth >= 1024 ? desktopPrintRef : printRef;
      if (!targetRef.current) {
        console.error('Print reference is not available');
        throw new Error('Print reference not found');
      }
      const element = targetRef.current;
      // Ensure element is visible and properly rendered with longer delay
      await new Promise((resolve) => setTimeout(resolve, 300));
      // Enhanced html-to-image configuration for MAXIMUM quality
      const dataUrl = await toPng(element, {
        quality: 1.0,
        pixelRatio: 4,
        cacheBust: true,
        backgroundColor: '#ffffff',
        skipFonts: false,
        style: {
          transform: 'none',
          opacity: 1,
        },
        filter: (node) => {
          // Skip hidden elements
          if (
            node.style?.display === 'none' ||
            node.style?.visibility === 'hidden'
          ) {
            return false;
          }
          return true;
        },
      }).catch((err) => {
        console.error('Error capturing form as image:', err);
        throw new Error('Failed to capture form as image: ' + err.message);
      });
      console.log('Image generated successfully, creating PDF...');
      // Create PDF with better compatibility
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
        compress: false, // Changed to false for better quality
      });
      // A4 dimensions in mm
      const pageWidth = 210;
      const pageHeight = 297;
      // Calculate the aspect ratio to fit content on single page
      const imgWidth = pageWidth;
      const imgHeight = pageHeight;
      // Add image with highest quality settings
      pdf.addImage(dataUrl, 'PNG', 0, 0, imgWidth, imgHeight, '', 'NONE'); // Changed from FAST to NONE for no compression
      // Enhanced file saving with better browser compatibility
      try {
        pdf.save('Kurdistan_Technical_Institute_Form.pdf');
        console.log('PDF saved successfully');
        setShowSuccess(true);
      } catch (saveError) {
        console.error('Error saving PDF:', saveError);
        // Fallback: Try to open in new window
        const pdfBlob = pdf.output('blob');
        const pdfUrl = URL.createObjectURL(pdfBlob);
        window.open(pdfUrl, '_blank');
        setShowSuccess(true);
      }
    } catch (error) {
      console.error('PDF generation failed:', error);
      setShowError(true);
      // Fallback method for desktop browsers
      if (window.innerWidth >= 1024) {
        console.log('Trying fallback method for desktop...');
        try {
          await fallbackPDFGeneration();
        } catch (fallbackError) {
          console.error('Fallback also failed:', fallbackError);
        }
      }
    } finally {
      setIsGenerating(false);
    }
  };

  // Fallback PDF generation method for desktop
  const fallbackPDFGeneration = async () => {
    try {
      const element = desktopPrintRef.current;
      if (!element) throw new Error('No element found');
      // Wait for render
      await new Promise((resolve) => setTimeout(resolve, 300));
      // High quality capture
      const dataUrl = await toPng(element, {
        quality: 1.0,
        pixelRatio: 4,
        backgroundColor: '#ffffff',
        skipFonts: false, // Enable font rendering
      });
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
        compress: false, // Disable compression for quality
      });
      pdf.addImage(dataUrl, 'PNG', 0, 0, 210, 297, '', 'NONE'); // No compression
      // Use different save approach
      const pdfOutput = pdf.output('blob');
      const url = URL.createObjectURL(pdfOutput);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'Kurdistan_Technical_Institute_Form.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      setShowSuccess(true);
    } catch (error) {
      throw error;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    generatePDF();
  };

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-violet-50 via-fuchsia-50 to-pink-50 p-2 sm:p-4 md:p-6 rtl relative overflow-hidden"
      dir="rtl"
    >
      {/* Animated Background Blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 right-20 w-96 h-96 bg-fuchsia-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-20 left-40 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* Success/Error Notifications */}
      {showSuccess && (
        <div className="fixed top-4 right-4 left-4 sm:left-auto sm:right-4 bg-white border-r-4 border-emerald-500 text-gray-800 px-4 sm:px-8 py-3 sm:py-5 rounded-2xl shadow-2xl z-50 flex items-center animate-slide-in backdrop-blur-sm">
          <div className="bg-emerald-100 rounded-full p-2 ml-2 sm:ml-4">
            <svg
              className="h-5 w-5 sm:h-6 sm:w-6 text-emerald-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <span className="font-bold text-base sm:text-lg">
            پی دی اف بە سەرکەوتووی دروست کرا!
          </span>
        </div>
      )}

      {showError && (
        <div className="fixed top-4 right-4 left-4 sm:left-auto sm:right-4 bg-white border-r-4 border-rose-500 text-gray-800 px-4 sm:px-8 py-3 sm:py-5 rounded-2xl shadow-2xl z-50 flex items-center animate-slide-in backdrop-blur-sm">
          <div className="bg-rose-100 rounded-full p-2 ml-2 sm:ml-4">
            <svg
              className="h-5 w-5 sm:h-6 sm:w-6 text-rose-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
          <div>
            <p className="font-bold text-base sm:text-lg">
              دروستکردنی پی دی اف سەرکەوتوو نەبوو
            </p>
            <p className="text-xs sm:text-sm text-gray-600">
              تکایە دووبارە هەوڵ بدەوە
            </p>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-4 sm:mb-6 md:mb-8 animate-fade-in-down">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black mb-2 sm:mb-3 bg-gradient-to-r from-purple-600 via-fuchsia-600 to-pink-600 bg-clip-text text-transparent drop-shadow-sm px-4">
            پەیمانگەی تەكنیكی كوردستان
          </h1>
          <p className="text-gray-700 text-sm sm:text-base md:text-lg font-medium px-4">
            فۆرمی وەرگرتن - تکایە زانیارییەکان بە دروستی پڕ بکەوە
          </p>
        </div>

        {/* Mobile/Tablet Responsive Form */}
        <div className="lg:hidden animate-fade-in-up">
          <div className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl p-4 sm:p-6 border border-gray-100 mx-2 sm:mx-4">
            {/* Mobile Header */}
            <div className="border-b-2 border-red-500 pb-3 mb-4">
              <div className="flex flex-col items-center gap-3">
                <div className="border-2 border-red-500 rounded-lg p-2 w-20 h-24 flex items-center justify-center">
                  <p className="text-xs text-gray-600 text-center">
                    وێنەی فێرخواز
                  </p>
                </div>
                <div className="text-center">
                  <img
                    src="https://tse3.mm.bing.net/th/id/OIP.QmR4OtGs_XHKX4sjiPJrxwHaHa?rs=1&pid=ImgDetMain&o=7&rm=3"
                    alt="Logo"
                    className="h-16 mx-auto mb-2"
                  />
                  <div className="text-blue-700 font-bold text-xs mb-2">
                    <p>KURDISTAN TECHNICAL INSTITUTE</p>
                  </div>
                  <div className="text-center text-xs text-blue-700">
                    <p className="font-semibold">هەرێمی كوردستان - عێراق</p>
                    <p>وەزارەتی خوێندنی باڵا</p>
                    <p>پەیمانگەی تەكنیكی كوردستان</p>
                  </div>
                </div>
              </div>
            </div>
            {/* Mobile Title */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white text-center py-2 rounded-lg mb-4 shadow-md">
              <h2 className="text-sm font-bold">
                فۆرمی وەرگرتن (دەورانەی ئاكادیمی: زانستی)
              </h2>
            </div>
            <FormContent
              formData={formData}
              handleChange={handleChange}
              handleArrayChange={handleArrayChange}
              isMobile={true}
            />
            {/* Mobile Footer */}
            <div className="mt-4 pt-3 border-t-2 border-red-500">
              <div className="flex flex-col gap-2 text-xs text-center">
                <div className="flex justify-center gap-4">
                  <div className="flex items-center">
                    <div className="h-2 w-2 bg-red-600 rounded-full ml-1"></div>
                    <span className="font-medium">0772 911 21 21</span>
                  </div>
                  <div className="flex items-center">
                    <div className="h-2 w-2 bg-red-600 rounded-full ml-1"></div>
                    <span className="font-medium">0751 911 21 21</span>
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="font-medium text-blue-600">
                    www.kti.edu.iq
                  </span>
                  <span className="font-medium text-blue-600">
                    tomar@kti.edu.iq
                  </span>
                </div>
                <p className="text-xs text-gray-600">
                  Kurdistan Technical Institute - Sulaymaniyah Heights,
                  Kurdistan Region - Iraq
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Desktop Form (for PDF generation and large screens) */}
        <div className="hidden lg:flex justify-center items-center animate-fade-in-up">
          <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100">
            <div
              ref={desktopPrintRef}
              className="bg-white mx-auto"
              style={{
                width: '210mm',
                height: '297mm',
                padding: '8mm',
                boxSizing: 'border-box',
                overflow: 'hidden',
                position: 'relative',
                zIndex: 1,
              }}
            >
              {/* Header */}
              <div className="border-b-2 border-red-500 pb-1.5 mb-2">
                <div className="flex justify-between items-start">
                  <div className="border-2 border-red-500 rounded-lg p-1.5 w-16 h-20 flex items-center justify-center">
                    <p className="text-xs text-gray-600 text-center">
                      وێنەی فێرخواز
                    </p>
                  </div>
                  <div className="text-center flex-1 mx-3">
                    <img
                      src="https://tse3.mm.bing.net/th/id/OIP.QmR4OtGs_XHKX4sjiPJrxwHaHa?rs=1&pid=ImgDetMain&o=7&rm=3"
                      alt="Logo"
                      className="h-12 mx-auto mb-0.5"
                    />
                    <div className="text-blue-700 font-bold text-xs">
                      <p>KURDISTAN TECHNICAL INSTITUTE</p>
                    </div>
                  </div>
                  <div className="text-right text-xs text-blue-700 w-28">
                    <p className="font-semibold">هەرێمی كوردستان - عێراق</p>
                    <p>وەزارەتی خوێندنی باڵا</p>
                    <p>پەیمانگەی تەكنیكی كوردستان</p>
                  </div>
                </div>
              </div>
              {/* Title */}
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white text-center py-1 rounded-lg mb-2 shadow-md">
                <h2 className="text-xs font-bold">
                  فۆرمی وەرگرتن (دەورانەی ئاكادیمی: زانستی)
                </h2>
              </div>
              <FormContent
                formData={formData}
                handleChange={handleChange}
                handleArrayChange={handleArrayChange}
                isMobile={false}
              />
              {/* Footer */}
              <div className="mt-2 pt-1.5 border-t-2 border-red-500">
                <div className="flex justify-between items-center text-xs">
                  <div className="flex items-center">
                    <div className="h-1.5 w-1.5 bg-red-600 rounded-full ml-1"></div>
                    <span className="font-medium">0772 911 21 21</span>
                  </div>
                  <div className="flex items-center">
                    <div className="h-1.5 w-1.5 bg-red-600 rounded-full ml-1"></div>
                    <span className="font-medium">0751 911 21 21</span>
                  </div>
                  <span className="font-medium text-blue-600">
                    www.kti.edu.iq
                  </span>
                  <span className="font-medium text-blue-600">
                    tomar@kti.edu.iq
                  </span>
                </div>
                <p className="text-center text-xs text-gray-600 mt-0.5">
                  Kurdistan Technical Institute - Sulaymaniyah Heights,
                  Kurdistan Region - Iraq
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Generate PDF Button */}
        <div className="flex justify-center my-4 sm:my-6 md:my-8 px-4">
          <button
            onClick={handleSubmit}
            type="button"
            disabled={isGenerating}
            className={`group relative ${isGenerating ? 'bg-gray-400 cursor-not-allowed' : 'bg-gradient-to-r from-purple-600 via-fuchsia-600 to-pink-600 hover:from-purple-700 hover:via-fuchsia-700 hover:to-pink-700 shadow-2xl hover:shadow-purple-500/50'} text-white px-6 sm:px-10 md:px-12 py-3 sm:py-4 md:py-5 rounded-xl sm:rounded-2xl transition-all duration-500 font-bold text-base sm:text-lg md:text-xl flex items-center transform hover:scale-105 active:scale-95 overflow-hidden w-full sm:w-auto justify-center`}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-pink-600 via-fuchsia-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative flex items-center gap-2 sm:gap-3">
              {isGenerating ? (
                <>
                  <svg
                    className="animate-spin h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  <span>دروستکردنی پی دی اف...</span>
                </>
              ) : (
                <>
                  <svg
                    className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 group-hover:animate-bounce"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                    />
                  </svg>
                  <span>دروستکردنی پی دی اف</span>
                </>
              )}
            </div>
          </button>
        </div>
      </div>

      {/* Hidden desktop version for PDF generation on mobile */}
      <div
        className="lg:hidden"
        style={{
          position: 'absolute',
          left: '-9999px',
          top: 0,
          zIndex: -1,
        }}
      >
        <div
          ref={printRef}
          className="bg-white mx-auto"
          style={{
            width: '210mm',
            height: '297mm',
            padding: '8mm',
            boxSizing: 'border-box',
            overflow: 'hidden',
          }}
        >
          {/* Header */}
          <div className="border-b-2 border-red-500 pb-1.5 mb-2">
            <div className="flex justify-between items-start">
              <div className="border-2 border-red-500 rounded-lg p-1.5 w-16 h-20 flex items-center justify-center">
                <p className="text-xs text-gray-600 text-center">
                  وێنەی فێرخواز
                </p>
              </div>
              <div className="text-center flex-1 mx-3">
                <img
                  src="https://tse3.mm.bing.net/th/id/OIP.QmR4OtGs_XHKX4sjiPJrxwHaHa?rs=1&pid=ImgDetMain&o=7&rm=3"
                  alt="Logo"
                  className="h-12 mx-auto mb-0.5"
                />
                <div className="text-blue-700 font-bold text-xs">
                  <p>KURDISTAN TECHNICAL INSTITUTE</p>
                </div>
              </div>
              <div className="text-right text-xs text-blue-700 w-28">
                <p className="font-semibold">هەرێمی كوردستان - عێراق</p>
                <p>وەزارەتی خوێندنی باڵا</p>
                <p>پەیمانگەی تەكنیكی كوردستان</p>
              </div>
            </div>
          </div>
          {/* Title */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white text-center py-1 rounded-lg mb-2 shadow-md">
            <h2 className="text-xs font-bold">
              فۆرمی وەرگرتن (دەورانەی ئاكادیمی: زانستی)
            </h2>
          </div>
          <FormContent
            formData={formData}
            handleChange={handleChange}
            handleArrayChange={handleArrayChange}
            isMobile={false}
          />
          {/* Footer */}
          <div className="mt-2 pt-1.5 border-t-2 border-red-500">
            <div className="flex justify-between items-center text-xs">
              <div className="flex items-center">
                <div className="h-1.5 w-1.5 bg-red-600 rounded-full ml-1"></div>
                <span className="font-medium">0772 911 21 21</span>
              </div>
              <div className="flex items-center">
                <div className="h-1.5 w-1.5 bg-red-600 rounded-full ml-1"></div>
                <span className="font-medium">0751 911 21 21</span>
              </div>
              <span className="font-medium text-blue-600">www.kti.edu.iq</span>
              <span className="font-medium text-blue-600">
                tomar@kti.edu.iq
              </span>
            </div>
            <p className="text-center text-xs text-gray-600 mt-0.5">
              Kurdistan Technical Institute - Sulaymaniyah Heights, Kurdistan
              Region - Iraq
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
