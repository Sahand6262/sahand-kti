
import React, { useEffect, useState, useRef, createElement, useMemo } from 'react';
import ReactDOM from 'react-dom/client';
import { jsPDF } from 'jspdf';
import { toPng } from 'html-to-image';

const subjects = ['ئیسلامی', 'کوردی', 'عەرەبی', 'ئینگلیزی', 'بیرکاری', 'فیزیا', 'کیمیا', 'زیندەزانی', 'کۆمپیوتەر', 'وەرزش', 'هونەر'];

// Form content component moved outside to prevent re-creation on each render
const FormContent = ({
  formData,
  handleChange,
  handleArrayChange,
  isMobile = false,
  calculateTotal,
  calculateAverage,
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
             <span className="transition-colors group-hover/radio:text-blue-600 font-medium text-xs">
              دووەم
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
            <span className="transition-colors group-hover/radio:text-blue-600 font-medium text-xs">
              یەکەم
            </span>
          </label>
        </div>
      </div>
      <div className={`grid ${isMobile ? 'grid-cols-2 gap-3' : 'grid-cols-4 gap-2'} mt-2`}>
          {subjects.map((subject, index) => (
              <div key={subject} className="relative group/input">
                  <label className="block text-gray-700 mb-1 font-semibold text-xs transition-colors group-hover/input:text-red-600">
                      {subject}
                  </label>
                  <input
                      type="number"
                      value={formData.grades[index]}
                      onChange={(e) => handleArrayChange('grades', index, e.target.value)}
                      className={`w-full border-2 border-gray-200 p-1.5 rounded-lg focus:ring-2 focus:ring-red-400 focus:border-red-400 transition-all duration-300 hover:border-gray-300 bg-white shadow-sm hover:shadow-md ${isMobile ? 'text-base' : 'text-xs'}`}
                      placeholder="نمرە"
                      min="0"
                      max="100"
                  />
              </div>
          ))}
      </div>
      <div className={`grid ${isMobile ? 'grid-cols-1 gap-4' : 'grid-cols-2 gap-2'} mt-3`}>
          <div className="bg-gradient-to-r from-teal-100 to-cyan-100 p-2 rounded-lg text-center shadow">
              <p className="font-bold text-teal-800 text-xs">کۆی گشتی</p>
              <p className={`font-mono font-extrabold text-teal-600 ${isMobile ? 'text-2xl' : 'text-xl'} tracking-wider`}>{calculateTotal(formData.grades)}</p>
          </div>
          <div className="bg-gradient-to-r from-purple-100 to-pink-100 p-2 rounded-lg text-center shadow">
              <p className="font-bold text-purple-800 text-xs">تێکڕا</p>
              <p className={`font-mono font-extrabold text-purple-600 ${isMobile ? 'text-2xl' : 'text-xl'} tracking-wider`}>{calculateAverage(formData.grades)}</p>
          </div>
      </div>
    </div>
  </form>
);


const App = () => {
  const [formData, setFormData] = useState({
    personalName: '',
    gender: 'male',
    birthYear: '',
    address: '',
    city: '',
    district: '',
    phone1: '',
    phone2: '',
    email: '',
    graduationYear: '',
    educationSystem: 'regular',
    examTestNumbers: Array(13).fill(''),
    province: '',
    education: '',
    district2: '',
    studyYear: '',
    semester: 'second',
    grades: Array(subjects.length).fill(''),
  });
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isLoading, setIsLoading] = useState(false);
  const formRef = useRef(null);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleArrayChange = (name, index, value) => {
    setFormData((prev) => {
      const newArray = [...prev[name]];
      newArray[index] = value;
      return { ...prev, [name]: newArray };
    });
  };

  const calculateTotal = (grades) => {
    return grades.reduce((acc, grade) => acc + (Number(grade) || 0), 0);
  };
  
  const calculateAverage = (grades) => {
    const numericGrades = grades.map(Number).filter(g => !isNaN(g) && g > 0);
    if (numericGrades.length === 0) return '0.00';
    const total = numericGrades.reduce((acc, grade) => acc + grade, 0);
    return (total / numericGrades.length).toFixed(2);
  };

  const generatePdf = async () => {
    setIsLoading(true);
    try {
      const formElement = formRef.current;
      if (!formElement) {
        throw new Error('Form element not found');
      }

      const dataUrl = await toPng(formElement, {
        quality: 1.0,
        pixelRatio: 3,
        backgroundColor: 'white',
      });

      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'px',
        format: 'a4',
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgProps = pdf.getImageProperties(dataUrl);
      const imgHeight = (imgProps.height * pdfWidth) / imgProps.width;
      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(dataUrl, 'PNG', 0, position, pdfWidth, imgHeight);
      heightLeft -= pdfHeight;

      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(dataUrl, 'PNG', 0, position, pdfWidth, imgHeight);
        heightLeft -= pdfHeight;
      }
      
      const blob = pdf.output('blob');
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      const fileName = `KTI_Registration_${formData.personalName.trim().replace(/\\s+/g, '_') || 'Student'}.pdf`;
      link.download = fileName;
      
      document.body.appendChild(link);
      link.click();
      
      setTimeout(() => {
        URL.revokeObjectURL(link.href);
        document.body.removeChild(link);
      }, 100);

    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Could not generate PDF. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-rose-50 via-purple-50 to-indigo-100 min-h-screen p-2 sm:p-4 md:p-6 lg:p-8 font-sans rtl">
      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex flex-col items-center justify-center z-50 backdrop-blur-sm">
           <svg className="animate-spin h-12 w-12 text-white mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
             <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
             <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
           </svg>
           <p className="text-white text-lg font-semibold animate-pulse">...ئامادەکردنی فۆرم</p>
           <p className="text-white text-sm mt-1">تکایە چاوەڕوان بە</p>
        </div>
      )}
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-4 md:mb-6 animate-fade-in-down">
            <h1 className="text-2xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-rose-700 mb-1">
              فۆرمی تۆمارکردنی پەیمانگای کوردستانی تەکنیکی
            </h1>
            <p className="text-sm md:text-base text-gray-600">
              تکایە هەموو خانەکان بە وردی پڕبکەرەوە
            </p>
        </header>
        <main className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-2xl p-4 md:p-6 border border-white/50 animate-fade-in-up">
            <div ref={formRef}>
                <FormContent 
                  formData={formData} 
                  handleChange={handleChange} 
                  handleArrayChange={handleArrayChange}
                  isMobile={isMobile}
                  calculateTotal={calculateTotal}
                  calculateAverage={calculateAverage}
                />
            </div>
            <div className="mt-6 text-center">
              <button
                onClick={generatePdf}
                disabled={isLoading}
                className="bg-gradient-to-r from-red-500 to-rose-600 text-white font-bold py-3 px-8 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100 focus:outline-none focus:ring-4 focus:ring-red-300"
              >
                {isLoading ? '...چاوەڕوانی' : 'داگرتنی فۆڕم وەک PDF'}
              </button>
          </div>
        </main>
      </div>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
