import React, { useEffect, useState, useRef } from 'react'
import { createRoot } from 'react-dom/client'
import { jsPDF } from 'jspdf'
import { toPng } from 'html-to-image'
// Form content component moved outside to prevent re-creation on each render
const FormContent = ({
  formData,
  handleChange,
  handleArrayChange,
  isMobile = false,
  isPdf = false,
}) => (
  <form className="space-y-6">
    {/* Personal Info */}
    <div className="group">
      <div className="modern-section-header">
        <div className="flex items-center justify-center gap-3">
          <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
            <svg
              className="w-5 h-5 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </div>
          <span className="font-bold tracking-wider text-lg">زانیاری كەسی</span>
        </div>
      </div>
      <div className="modern-card-enhanced">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="form-group-modern">
            <label className="modern-label">ناوی فێرخواز</label>
            <input
              type="text"
              name="personalName"
              value={formData.personalName}
              onChange={handleChange}
              className="modern-input"
              placeholder="ناوی سیانی"
            />
          </div>
          <div className="form-group-modern">
            <label className="modern-label">ڕەگەز</label>
            <div className="flex gap-4 mt-2">
              <label className="modern-radio-label">
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  checked={formData.gender === 'male'}
                  onChange={handleChange}
                  className="modern-radio"
                />
                <span>نێر</span>
              </label>
              <label className="modern-radio-label">
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  checked={formData.gender === 'female'}
                  onChange={handleChange}
                  className="modern-radio"
                />
                <span>مێ</span>
              </label>
            </div>
          </div>
          <div className="form-group-modern">
            <label className="modern-label">ساڵی لەدایکبوون</label>
            <input
              type="date"
              name="birthYear"
              value={formData.birthYear}
              onChange={handleChange}
              className="modern-input"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          <div className="form-group-modern">
            <label className="modern-label">ناونیشان</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="modern-input"
              placeholder="ناونیشانی نیشتەجێبوون"
            />
          </div>
          <div className="form-group-modern">
            <label className="modern-label">شار/ناوچە</label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="modern-input"
              placeholder="شار"
            />
          </div>
          <div className="form-group-modern">
            <label className="modern-label">گەڕەک</label>
            <input
              type="text"
              name="district"
              value={formData.district}
              onChange={handleChange}
              className="modern-input"
              placeholder="گەڕەک"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          <div className="form-group-modern">
            <label className="modern-label">ژ. مۆبایل(١)</label>
            <input
              type="text"
              name="phone1"
              value={formData.phone1}
              onChange={handleChange}
              className="modern-input"
              placeholder="07XX XXX XXXX"
            />
          </div>
          <div className="form-group-modern">
            <label className="modern-label">ژ. مۆبایل(٢)</label>
            <input
              type="text"
              name="phone2"
              value={formData.phone2}
              onChange={handleChange}
              className="modern-input"
              placeholder="07XX XXX XXXX"
            />
          </div>
          <div className="form-group-modern">
            <label className="modern-label">ئیمەیل</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="modern-input"
              placeholder="example@email.com"
            />
          </div>
        </div>
      </div>
    </div>
    {/* Education Info */}
    <div className="group">
      <div className="modern-section-header">
        <div className="flex items-center justify-center gap-3">
          <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
            <svg
              className="w-5 h-5 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              />
            </svg>
          </div>
          <span className="font-bold tracking-wider text-lg">ئاستی خوێندن</span>
        </div>
      </div>
      <div className="modern-card-enhanced">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="form-group-modern">
            <label className="modern-label">دەرچووی دەورانەی</label>
            <div className="modern-badge">زانستی</div>
          </div>
          <div className="form-group-modern">
            <label className="modern-label">ساڵی دەرچوون</label>
            <input
              type="date"
              name="graduationYear"
              value={formData.graduationYear}
              onChange={handleChange}
              className="modern-input"
            />
          </div>
          <div className="form-group-modern">
            <label className="modern-label">jۆری سیستەم</label>
            <div className="flex gap-4 mt-2">
              <label className="modern-radio-label">
                <input
                  type="radio"
                  name="educationSystem"
                  value="regular"
                  checked={formData.educationSystem === 'regular'}
                  onChange={handleChange}
                  className="modern-radio"
                />
                <span>ئاسایی</span>
              </label>
              <label className="modern-radio-label">
                <input
                  type="radio"
                  name="educationSystem"
                  value="swedish"
                  checked={formData.educationSystem === 'swedish'}
                  onChange={handleChange}
                  className="modern-radio"
                />
                <span>سودی</span>
              </label>
            </div>
          </div>
        </div>
        <div className="modern-info-box mt-6">
          <label className="modern-label text-center block mb-4">
            ژمارەی تاقیکردنەوە
          </label>
          <div className="flex flex-wrap justify-center gap-2">
            {[...Array(13)].map((_, i) => (
              <input
                key={i}
                type="text"
                maxLength={1}
                value={formData.examTestNumbers[i]}
                onChange={(e) =>
                  handleArrayChange('examTestNumbers', i, e.target.value)
                }
                className="modern-exam-box"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
    {/* Grades Info */}
    <div className="group">
      <div className="modern-section-header">
        <div className="flex items-center justify-center gap-3">
          <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
            <svg
              className="w-5 h-5 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>
          <span className="font-bold tracking-wider text-lg">
            زانیاری نمرەی فێرخواز
          </span>
        </div>
      </div>
      <div className="modern-card-enhanced">
        <div className="modern-warning-box mb-6">
          <div className="flex items-start gap-3">
            <svg
              className="w-6 h-6 text-amber-600 flex-shrink-0 mt-0.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            <p className="text-gray-700 text-sm leading-relaxed">
              بەڕێوەبەری بەڕێز: نمرەکانی خوارەوە دەبێت هاوتای بڕوانامە بێت کە
              دەهێنرێت بۆ پەیمانگە.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          <div className="form-group-modern">
            <label className="modern-label">پارێزگا</label>
            <input
              type="text"
              name="province"
              value={formData.province}
              onChange={handleChange}
              className="modern-input"
              placeholder="پارێزگا"
            />
          </div>
          <div className="form-group-modern">
            <label className="modern-label">پەروەردە</label>
            <input
              type="text"
              name="education"
              value={formData.education}
              onChange={handleChange}
              className="modern-input"
              placeholder="پەروەردە"
            />
          </div>
          <div className="form-group-modern">
            <label className="modern-label">گەڕەک</label>
            <input
              type="text"
              name="district2"
              value={formData.district2}
              onChange={handleChange}
              className="modern-input"
              placeholder="گەڕەک"
            />
          </div>
          <div className="form-group-modern">
            <label className="modern-label">ساڵی خوێندن</label>
            <input
              type="date"
              name="studyYear"
              value={formData.studyYear}
              onChange={handleChange}
              className="modern-input"
            />
          </div>
        </div>
      </div>
    </div>
    {/* Subjects Table */}
    <div className="group">
      <div className="modern-table-header">
        <span className="font-bold text-lg">وانەکان</span>
      </div>
      <div className="modern-table-container">
        <div className="grid grid-cols-3 md:grid-cols-9 gap-2 p-4 bg-gradient-to-br from-gray-50 to-gray-100">
          {formData.subjects.map((subject, i) => {
            const isReadOnly = i === 0 || i === 7 || i === 8
            const placeholderText = i > 0 && i < 7 ? `وانە ${i}` : ''
            return (
              <input
                key={i}
                type="text"
                value={subject}
                onChange={(e) =>
                  handleArrayChange('subjects', i, e.target.value)
                }
                readOnly={isReadOnly}
                className={`modern-table-cell ${isReadOnly ? 'bg-gradient-to-br from-gray-100 to-gray-200 font-bold' : ''}`}
                placeholder={placeholderText}
              />
            )
          })}
        </div>
        <div className="grid grid-cols-4 md:grid-cols-10 gap-2 p-4 bg-gradient-to-br from-red-50 to-rose-50">
          <div className="modern-table-label bg-gradient-to-br from-red-500 to-rose-600">
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
              className="modern-table-cell-colored border-red-200"
              placeholder="نمرە"
            />
          ))}
        </div>
        <div className="grid grid-cols-4 md:grid-cols-10 gap-2 p-4 bg-gradient-to-br from-red-50 to-rose-50">
          <div className="modern-table-label bg-gradient-to-br from-red-500 to-rose-600">
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
              className="modern-table-cell-colored border-red-200"
              placeholder="نمرە"
            />
          ))}
        </div>
        <div className="grid grid-cols-4 md:grid-cols-10 gap-2 p-4 bg-gradient-to-br from-yellow-50 to-amber-50">
          <div className="modern-table-label bg-gradient-to-br from-yellow-500 to-amber-600">
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
              className="modern-table-cell-colored border-yellow-200"
              placeholder="نمرە"
            />
          ))}
        </div>
        <div className="grid grid-cols-4 md:grid-cols-10 gap-2 p-4 bg-gradient-to-br from-yellow-50 to-amber-50">
          <div className="modern-table-label bg-gradient-to-br from-yellow-500 to-amber-600">
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
              className="modern-table-cell-colored border-yellow-200"
              placeholder="نمرە"
            />
          ))}
        </div>
      </div>
    </div>
  </form>
)
const SecondFormContent = ({
  formData,
  handleChange,
  handleArrayChange,
  isMobile = false,
  isPdf = false,
}) => (
  <form className="space-y-6">
    {/* Top Two Sections */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Right Section */}
      <div className="group">
        <div className="modern-section-header">
          <div className="flex items-center justify-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <svg
                className="w-5 h-5 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                />
              </svg>
            </div>
            <span className="font-bold tracking-wider text-sm md:text-base">
              خانەی تایبەت بە بەریوەبەری خوێندنگە
            </span>
          </div>
        </div>
        <div className="modern-card-enhanced">
          <div className="space-y-5">
            <div className="form-group-modern">
              <label className="modern-label">ناوی خوێندنگە</label>
              <input
                type="text"
                name="instituteName"
                value={formData.instituteName || ''}
                onChange={handleChange}
                className="modern-input"
                placeholder="ناوی خوێندنگە"
              />
            </div>
            <div className="form-group-modern">
              <label className="modern-label">ناوی بەریوەبەر</label>
              <input
                type="text"
                name="directorName"
                value={formData.directorName || ''}
                onChange={handleChange}
                className="modern-input"
                placeholder="ناوی بەڕێوەبەر"
              />
            </div>
            <div className="form-group-modern">
              <label className="modern-label">ژ. تەلەفۆن</label>
              <input
                type="text"
                name="directorPhone"
                value={formData.directorPhone || ''}
                onChange={handleChange}
                className="modern-input"
                placeholder="07XX XXX XXXX"
              />
            </div>
            <div className="form-group-modern">
              <label className="modern-label text-center">
                واژو و ڕێکەوت و مۆر
              </label>
              <div className="modern-signature-box"></div>
            </div>
          </div>
        </div>
      </div>
      {/* Left Section */}
      <div className="group">
        <div className="modern-section-header">
          <div className="flex items-center justify-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <svg
                className="w-5 h-5 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <span className="font-bold tracking-wider text-sm md:text-base">
              پەسەندکردن و پێشنیارسەندکردنەوەی نمرەکان
            </span>
          </div>
        </div>
        <div className="modern-card-enhanced">
          <div className="space-y-5">
            <div className="form-group-modern">
              <label className="modern-label">لە بەریوەبەرێتی پەروەردەی</label>
              <input
                type="text"
                name="educationDirection"
                value={formData.educationDirection || ''}
                onChange={handleChange}
                className="modern-input"
                placeholder="پەروەردەی..."
              />
            </div>
            <div className="form-group-modern">
              <label className="modern-label">ناوی بەریوەبەرێتی</label>
              <input
                type="text"
                name="educationDirectorName"
                value={formData.educationDirectorName || ''}
                onChange={handleChange}
                className="modern-input"
                placeholder="ناوی بەڕێوەبەرێتی"
              />
            </div>
            <div className="form-group-modern">
              <label className="modern-label">قەرا</label>
              <input
                type="text"
                name="decision"
                value={formData.decision || ''}
                onChange={handleChange}
                className="modern-input"
                placeholder="بڕیار..."
              />
            </div>
            <div className="form-group-modern">
              <label className="modern-label text-center">واژو و مۆر</label>
              <div className="modern-signature-box"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    {/* Department Selection */}
    <div className="group">
      <div className="modern-section-header bg-gradient-to-r from-blue-600 to-indigo-700">
        <div className="flex items-center justify-center gap-3">
          <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
            <svg
              className="w-5 h-5 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
          </div>
          <span className="font-bold tracking-wider text-lg">
            پەیمانگە بۆ ساڵی خوێندنی (٢٠٢٥-٢٠٢٦)
          </span>
        </div>
      </div>
      <div className="modern-card-enhanced">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {[
            'دەرماسازی',
            'بەرسارانی',
            'شیکردنەوەی نەخۆشییەکان',
            'دوانەگەری پزیشکی(پەرستاری)',
            'سێژن',
            'کارگێری گاز',
            'زمانەرانی',
            'دیجیتاڵ میدیا و مارکێتینگ',
            'تەکنەلۆجیای زانیاری',
            'تەکنەلۆجیای ڕۆوێنێتینگ و ئۆتۆمەیشن',
            'تەکنەلۆجیای ڕووینێتینگ و ئۆتۆمەیشن',
            'تەندرارانی دیکۆر',
          ].map((dept, i) => (
            <label key={i} className="modern-department-option">
              <input
                type="radio"
                name="departmentChoice"
                value={dept}
                checked={formData.departmentChoice === dept}
                onChange={handleChange}
                className="modern-radio"
              />
              <span className="font-medium">{dept}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
    {/* Medical Declaration */}
    <div className="group">
      <div className="modern-section-header">
        <div className="flex items-center justify-center gap-3">
          <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
            <svg
              className="w-5 h-5 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <span className="font-bold tracking-wider text-lg">
            ئەو بەشەی دەتەوێت تێیدا بخوێنیت
          </span>
        </div>
      </div>
      <div className="modern-warning-box">
        <div className="flex items-start gap-3">
          <svg
            className="w-6 h-6 text-amber-600 flex-shrink-0 mt-0.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
          <p className="text-gray-700 text-sm leading-relaxed">
            پێویستە زانیاری و سەرەدانێکی وردبێتەوە، زانای(١٩٥٠)
            لەڕێکەوتی(٢٠٢٥/١/١٨)، بەکەم خانی (٧)، بەکەم خانی (٢) هەماڵاران
            پرێکەمەوە، بەڵام بەکشتنی هەماڵاردن بەکەم بیوەری سەردەمی وەرگرتنە و
            دوو هەماڵاردنەمی دیکە لە تەمەری هەموونیش گوسس بەتاڵ لیو بەتانە و
            بەرێنی dۆاگاریس بەسەنەکە و کۆنەرەی فێرخواز و سەردەکانی وەزارەتی
            خوێندنی باڵا، وەردەگیرێت.
          </p>
        </div>
      </div>
    </div>
    {/* Certificate Section */}
    <div className="group">
      <div className="modern-section-header bg-gradient-to-r from-blue-600 to-indigo-700">
        <div className="flex items-center justify-center gap-3">
          <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
            <svg
              className="w-5 h-5 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>
          <span className="font-bold tracking-wider text-lg">شوێننامە</span>
        </div>
      </div>
      <div className="modern-card-enhanced">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          <div className="form-group-modern">
            <label className="modern-label">ناساندنی بازی شارستانی</label>
            <input
              type="text"
              name="certificate0"
              value={formData.certificate0 || ''}
              onChange={handleChange}
              className="modern-input"
              placeholder="..."
            />
          </div>
          <div className="form-group-modern">
            <label className="modern-label">ژمارەی ناسنامە</label>
            <input
              type="text"
              name="certificate1"
              value={formData.certificate1 || ''}
              onChange={handleChange}
              className="modern-input"
              placeholder="..."
            />
          </div>
          <div className="form-group-modern">
            <label className="modern-label">ژمارەی تۆمار</label>
            <input
              type="text"
              name="certificate2"
              value={formData.certificate2 || ''}
              onChange={handleChange}
              className="modern-input"
              placeholder="..."
            />
          </div>
          <div className="form-group-modern">
            <label className="modern-label">ژمارەی لایەو</label>
            <input
              type="text"
              name="certificate3"
              value={formData.certificate3 || ''}
              onChange={handleChange}
              className="modern-input"
              placeholder="..."
            />
          </div>
          <div className="form-group-modern">
            <label className="modern-label">شوێنی دەرچوون</label>
            <input
              type="text"
              name="certificate4"
              value={formData.certificate4 || ''}
              onChange={handleChange}
              className="modern-input"
              placeholder="..."
            />
          </div>
        </div>
      </div>
    </div>
    {/* Nationality Section */}
    <div className="group">
      <div className="modern-section-header bg-gradient-to-r from-gray-600 to-gray-700">
        <div className="flex items-center justify-center gap-3">
          <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
            <svg
              className="w-5 h-5 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2"
              />
            </svg>
          </div>
          <span className="font-bold tracking-wider text-lg">ڕەگەزنامە</span>
        </div>
      </div>
      <div className="modern-card-enhanced">
        <div className="flex gap-6 mb-6">
          <label className="modern-radio-label">
            <input
              type="radio"
              name="nationality2"
              value="iraqi"
              checked={formData.nationality2 === 'iraqi'}
              onChange={handleChange}
              className="modern-radio"
            />
            <span>عێراقی</span>
          </label>
          <label className="modern-radio-label">
            <input
              type="radio"
              name="nationality2"
              value="other"
              checked={formData.nationality2 === 'other'}
              onChange={handleChange}
              className="modern-radio"
            />
            <span>هی تر</span>
          </label>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="form-group-modern">
            <label className="modern-label">ژمارەی پەگەزنامە</label>
            <input
              type="text"
              name="nationalityNumber"
              value={formData.nationalityNumber || ''}
              onChange={handleChange}
              className="modern-input"
              placeholder="ژمارەی ڕەگەزنامە"
            />
          </div>
          <div className="form-group-modern">
            <label className="modern-label">ژمارەی تۆمار</label>
            <input
              type="text"
              name="registrationNumber"
              value={formData.registrationNumber || ''}
              onChange={handleChange}
              className="modern-input"
              placeholder="ژمارەی تۆمار"
            />
          </div>
          <div className="form-group-modern">
            <label className="modern-label">ساڵ و شوێنی دەرچوون</label>
            <input
              type="date"
              name="issueYearPlace"
              value={formData.issueYearPlace || ''}
              onChange={handleChange}
              className="modern-input"
            />
          </div>
        </div>
      </div>
    </div>
    {/* Family Card Section */}
    <div className="group">
      <div className="modern-section-header bg-gradient-to-r from-gray-600 to-gray-700">
        <div className="flex items-center justify-center gap-3">
          <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
            <svg
              className="w-5 h-5 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
          </div>
          <span className="font-bold tracking-wider text-lg">
            کارتی نیشتیمانی
          </span>
        </div>
      </div>
      <div className="modern-card-enhanced">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="form-group-modern">
            <label className="modern-label">ژمارەی کارت</label>
            <input
              type="text"
              name="familyCardNumber"
              value={formData.familyCardNumber || ''}
              onChange={handleChange}
              className="modern-input"
              placeholder="ژمارەی کارت"
            />
          </div>
          <div className="form-group-modern">
            <label className="modern-label">شوێنی دەرچوون</label>
            <input
              type="text"
              name="familyCardIssuePlace"
              value={formData.familyCardIssuePlace || ''}
              onChange={handleChange}
              className="modern-input"
              placeholder="شوێنی دەرچوون"
            />
          </div>
          <div className="form-group-modern">
            <label className="modern-label">ڕێکەوتی دەرچوون</label>
            <input
              type="date"
              name="familyCardIssueDate"
              value={formData.familyCardIssueDate || ''}
              onChange={handleChange}
              className="modern-input"
            />
          </div>
          <div className="form-group-modern">
            <label className="modern-label">کۆدی خێزانی</label>
            <input
              type="text"
              name="familyCode"
              value={formData.familyCode || ''}
              onChange={handleChange}
              className="modern-input"
              placeholder="کۆدی خێزانی"
            />
          </div>
        </div>
      </div>
    </div>
    {/* Bottom Signature Section */}
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      <div className="modern-card-enhanced">
        <label className="modern-label text-center block mb-4">
          ناوی سیاڵی فێرخواز
        </label>
        <div className="modern-signature-line"></div>
      </div>
      <div className="modern-card-enhanced">
        <label className="modern-label text-center block mb-4">
          ڕێکەوت
          <br />
          واژو
        </label>
        <div className="modern-signature-line"></div>
      </div>
    </div>
  </form>
)
// This string contains the @font-face rules needed by the PDF generator.
// By embedding this directly, we ensure the PDF looks exactly like the screen.
const FONT_EMBED_CSS = `
@font-face {
  font-family: 'Noto Kufi Arabic';
  font-style: normal;
  font-weight: 400;
  src: url(https://fonts.gstatic.com/s/notokufiarabic/v22/CSRp3_VLxv2V2xG2_P4h4xH7t5AUg2g8.woff2) format('woff2');
}
@font-face {
  font-family: 'Noto Kufi Arabic';
  font-style: normal;
  font-weight: 700;
  src: url(https://fonts.gstatic.com/s/notokufiarabic/v22/CSRp3_VLxv2V2xG2_P4h4xH7t5AUg2g8.woff2) format('woff2');
}
`
export function App() {
  const [currentStep, setCurrentStep] = useState(1)
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
    birthYear: '',
    educationSystem: '',
    province: '',
    education: '',
    district2: '',
    studyYear: '',
    examTestNumbers: Array(13).fill(''),
    subjects: [
      'وانەکان',
      '',
      '',
      '',
      '',
      '',
      '',
      'کۆنمرەی پۆلی ١٢',
      'ڕیژەی دەرچوون',
    ],
    firstGradesNumeric: Array(9).fill(''),
    firstGradesWritten: Array(9).fill(''),
    secondGradesNumeric: Array(9).fill(''),
    secondGradesWritten: Array(9).fill(''),
    // Second form fields
    fatherName: '',
    motherName: '',
    nationality: '',
    idNumber: '',
    idIssueDate: '',
    deptPref1: '',
    deptPref2: '',
    deptPref3: '',
    deptPref4: '',
    deptPref5: '',
    deptPref6: '',
    schoolName: '',
    schoolLocation: '',
    certificateNumber: '',
    totalGrade: '',
    successRate: '',
    guardianName: '',
    guardianRelation: '',
    guardianPhone: '',
    guardianAddress: '',
    declaration: false,
    signatureDate: '',
    // Additional fields for second form
    instituteName: '',
    directorName: '',
    directorPhone: '',
    educationDirection: '',
    educationDirectorName: '',
    decision: '',
    nationality2: '',
    nationalityNumber: '',
    registrationNumber: '',
    issueYearPlace: '',
    familyCardNumber: '',
    familyCardIssuePlace: '',
    familyCardIssueDate: '',
    familyCode: '',
    departmentChoice: '',
  })
  const [isGenerating, setIsGenerating] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [showError, setShowError] = useState(false)
  const pageOnePrintRef = useRef(null)
  const pageTwoPrintRef = useRef(null)
  useEffect(() => {
    if (showSuccess || showError) {
      const timer = setTimeout(() => {
        setShowSuccess(false)
        setShowError(false)
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [showSuccess, showError])
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData((prevState) => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }
  const handleArrayChange = (arrayName, index, value) => {
    setFormData((prevState) => {
      const newArray = [...prevState[arrayName]]
      newArray[index] = value
      return {
        ...prevState,
        [arrayName]: newArray,
      }
    })
  }
  const handleNextStep = () => {
    setCurrentStep(2)
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }
  const handlePreviousStep = () => {
    setCurrentStep(1)
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }
  const generatePDF = async () => {
    setIsGenerating(true)
    setShowError(false)
    setShowSuccess(false)
    try {
      console.log('Starting PDF generation...')
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
        compress: true,
      })
      const pageWidth = 210
      const pageHeight = 297
      const toPngOptions = {
        quality: 0.95,
        pixelRatio: 3,
        backgroundColor: '#ffffff',
        fontEmbedCss: FONT_EMBED_CSS,
        cacheBust: true,
        style: {
          transform: 'scale(1)',
          transformOrigin: 'top left',
        },
      }
      // Capture first page
      console.log('Capturing first page...')
      if (!pageOnePrintRef.current) {
        throw new Error('First page reference for PDF not found')
      }
      await new Promise((resolve) => setTimeout(resolve, 800))
      const firstPageDataUrl = await toPng(
        pageOnePrintRef.current,
        toPngOptions,
      )
      pdf.addImage(
        firstPageDataUrl,
        'PNG',
        0,
        0,
        pageWidth,
        pageHeight,
        undefined,
        'FAST',
      )
      // Capture second page
      console.log('Capturing second page...')
      if (!pageTwoPrintRef.current) {
        throw new Error('Second page reference for PDF not found')
      }
      await new Promise((resolve) => setTimeout(resolve, 800))
      const secondPageDataUrl = await toPng(
        pageTwoPrintRef.current,
        toPngOptions,
      )
      pdf.addPage()
      pdf.addImage(
        secondPageDataUrl,
        'PNG',
        0,
        0,
        pageWidth,
        pageHeight,
        undefined,
        'FAST',
      )
      // Save PDF
      pdf.save('Kurdistan_Technical_Institute_Form_Complete.pdf')
      console.log('PDF generated successfully')
      setShowSuccess(true)
    } catch (error) {
      console.error('PDF generation failed:', error)
      setShowError(true)
    } finally {
      setIsGenerating(false)
    }
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    if (currentStep === 1) {
      handleNextStep()
    } else {
      generatePDF()
    }
  }
  return (
    <div
      className="min-h-screen bg-gradient-to-br from-violet-50 via-fuchsia-50 to-pink-50 p-2 sm:p-4 md:p-6 lg:p-8 rtl relative overflow-hidden font-bold"
      dir="rtl"
    >
      {/* Animated Background Blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-64 h-64 sm:w-96 sm:h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 right-20 w-64 h-64 sm:w-96 sm:h-96 bg-fuchsia-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-20 left-40 w-64 h-64 sm:w-96 sm:h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>
      {/* Success/Error Notifications */}
      {showSuccess && (
        <div className="fixed top-4 right-4 left-4 sm:left-auto sm:right-4 sm:max-w-md bg-white border-r-4 border-emerald-500 text-gray-800 px-4 sm:px-8 py-3 sm:py-5 rounded-2xl shadow-2xl z-50 flex items-center animate-slide-in backdrop-blur-sm">
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
          <span className="font-bold text-sm sm:text-base md:text-lg">
            پی دی اف بە سەرکەوتووی دروست کرا!
          </span>
        </div>
      )}
      {showError && (
        <div className="fixed top-4 right-4 left-4 sm:left-auto sm:right-4 sm:max-w-md bg-white border-r-4 border-rose-500 text-gray-800 px-4 sm:px-8 py-3 sm:py-5 rounded-2xl shadow-2xl z-50 flex items-center animate-slide-in backdrop-blur-sm">
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
            <p className="font-bold text-sm sm:text-base md:text-lg">
              دروستکردنی پی دی اف سەرکەوتوو نەبوو
            </p>
            <p className="text-xs sm:text-sm text-gray-600">
              تکایە دووبارە هەوڵ بدەوە
            </p>
          </div>
        </div>
      )}
      <div className="max-w-7xl mx-auto relative z-10 flex flex-col items-center">
        {/* A4 Page Container - Responsive for viewing, fixed for PDF */}
        <div className="w-full max-w-full sm:max-w-[95%] md:max-w-[90%] lg:max-w-[210mm] mx-auto mb-6">
          {currentStep === 1 ? (
            <div className="animate-fade-in-up modern-page-container">
              <div className="p-6 sm:p-8 flex flex-col min-h-[500px] sm:min-h-[600px] lg:min-h-[297mm]">
                {/* Header */}
                <div className="shrink-0 mb-6">
                  <div className="modern-header-border">
                    <div className="flex justify-between items-start gap-4">
                      <div className="modern-photo-placeholder">
                        <svg
                          className="w-8 h-8 text-gray-400"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                          />
                        </svg>
                        <p className="text-xs text-gray-500 text-center mt-2">
                          وێنەی فێرخواز
                        </p>
                      </div>
                      <div className="text-center flex-1 mx-4">
                        <img
                          src="https://tse3.mm.bing.net/th/id/OIP.QmR4OtGs_XHKX4sjiPJrxwHaHa?rs=1&pid=ImgDetMain&o=7&rm=3"
                          alt="Logo"
                          className="h-16 mx-auto mb-3 drop-shadow-lg"
                        />
                        <div className="text-blue-700 font-bold text-base">
                          <p className="tracking-wide">
                            KURDISTAN TECHNICAL INSTITUTE
                          </p>
                        </div>
                      </div>
                      <div className="text-right text-sm text-blue-700 w-32 flex-shrink-0">
                        <p className="font-semibold mb-1">
                          هەرێمی كوردستان - عێراق
                        </p>
                        <p className="mb-0.5">وەزارەتی خوێندنی باڵا</p>
                        <p>پەیمانگەی تەكنیكی كوردستان</p>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Form Content */}
                <div className="flex-grow">
                  <FormContent
                    formData={formData}
                    handleChange={handleChange}
                    handleArrayChange={handleArrayChange}
                    isMobile={false}
                    isPdf={false}
                  />
                </div>
                {/* Footer */}
                <div className="shrink-0 mt-6 pt-6 modern-footer-border">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm mb-4">
                    <div className="modern-contact-card">
                      <svg
                        className="w-5 h-5 text-red-600 flex-shrink-0"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        />
                      </svg>
                      <span className="font-medium">0772 911 21 21</span>
                    </div>
                    <div className="modern-contact-card">
                      <svg
                        className="w-5 h-5 text-red-600 flex-shrink-0"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        />
                      </svg>
                      <span className="font-medium">0751 911 21 21</span>
                    </div>
                    <div className="modern-contact-card bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
                      <svg
                        className="w-5 h-5 text-blue-600 flex-shrink-0"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                        />
                      </svg>
                      <span className="font-medium text-blue-600">
                        www.kti.edu.iq
                      </span>
                    </div>
                    <div className="modern-contact-card bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
                      <svg
                        className="w-5 h-5 text-blue-600 flex-shrink-0"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                      <span className="font-medium text-blue-600">
                        tomar@kti.edu.iq
                      </span>
                    </div>
                  </div>
                  <p className="text-center text-sm text-gray-600 tracking-wide">
                    Kurdistan Technical Institute - Sulaymaniyah Heights,
                    Kurdistan Region - Iraq
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="animate-fade-in-up modern-page-container">
              <div className="p-6 sm:p-8 flex flex-col min-h-[500px] sm:min-h-[600px] lg:min-h-[297mm]">
                <div className="flex-grow">
                  <SecondFormContent
                    formData={formData}
                    handleChange={handleChange}
                    handleArrayChange={handleArrayChange}
                    isMobile={false}
                    isPdf={false}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 my-4 sm:my-6 md:my-8 px-4">
          {currentStep === 2 && (
            <button
              onClick={handlePreviousStep}
              type="button"
              className="w-full sm:w-auto bg-gray-500 hover:bg-gray-600 text-white px-6 sm:px-10 py-3 sm:py-4 rounded-xl font-bold text-sm sm:text-base md:text-lg flex items-center justify-center gap-2 transform hover:scale-105 transition-all duration-300"
            >
              <svg
                className="w-4 h-4 sm:w-5 sm:h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              گەڕانەوە
            </button>
          )}
          <button
            onClick={handleSubmit}
            type="button"
            disabled={isGenerating}
            className={`w-full sm:w-auto group relative ${isGenerating ? 'bg-gray-400 cursor-not-allowed' : 'bg-gradient-to-r from-red-600 via-red-600 to-red-700 hover:from-red-700 hover:via-red-700 hover:to-red-800 shadow-2xl hover:shadow-red-500/50'} text-white px-6 sm:px-10 md:px-12 py-3 sm:py-4 md:py-5 rounded-xl sm:rounded-2xl transition-all duration-500 font-bold text-sm sm:text-base md:text-lg lg:text-xl flex items-center justify-center transform hover:scale-105 active:scale-95 overflow-hidden`}
          >
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
              ) : currentStep === 1 ? (
                <>
                  <span>هەنگاوی دواتر</span>
                  <svg
                    className="w-4 h-4 sm:w-5 sm:h-5 md:h-6 md:w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 5l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
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
      {/* Hidden container for PDF generation - ALWAYS DESKTOP STYLE */}
      <div
        style={{
          position: 'absolute',
          left: '-9999px',
          top: 0,
          zIndex: -1,
          opacity: 0,
          pointerEvents: 'none',
        }}
      >
        {/* Page 1 for PDF - DESKTOP ONLY */}
        <div
          ref={pageOnePrintRef}
          className="bg-white flex flex-col font-bold"
          style={{
            width: '210mm',
            height: '297mm',
            boxSizing: 'border-box',
            overflow: 'hidden',
            padding: '10mm',
          }}
        >
          <div className="flex flex-col h-full">
            {/* Header */}
            <div className="shrink-0 mb-2">
              <div className="border-b-2 border-red-500 pb-1.5 mb-1.5">
                <div className="flex justify-between items-start">
                  <div className="border-2 border-red-500 rounded-lg p-1.5 w-16 h-20 flex items-center justify-center">
                    <p className="text-[9px] text-gray-600 text-center">
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
                  <div className="text-right text-xs text-blue-700 w-28 flex-shrink-0">
                    <p className="font-semibold">هەرێمی كوردستان - عێراق</p>
                    <p>وەزارەتی خوێندنی باڵا</p>
                    <p>پەیمانگەی تەكنیكی كوردستان</p>
                  </div>
                </div>
              </div>
            </div>
            {/* Form Content */}
            <div className="flex-grow min-h-0 overflow-hidden">
              <div className="space-y-1.5">
                {/* Personal Info */}
                <div>
                  <div className="section-header-modern text-white text-center py-1 text-[11px]">
                    <span className="font-bold tracking-wider">
                      زانیاری كەسی
                    </span>
                  </div>
                  <div className="modern-card p-2 space-y-1.5">
                    <div className="grid grid-cols-3 gap-1.5">
                      <div className="form-group">
                        <label className="form-label text-[9px]">
                          ناوی فێرخواز
                        </label>
                        <input
                          type="text"
                          name="personalName"
                          value={formData.personalName}
                          readOnly
                          className="form-input h-7 text-[10px]"
                          placeholder="ناوی سیانی"
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label text-[9px]">ڕەگەز</label>
                        <div className="flex gap-3 mt-1">
                          <label className="radio-label">
                            <input
                              type="radio"
                              name="gender"
                              value="male"
                              checked={formData.gender === 'male'}
                              readOnly
                              className="radio-input"
                            />
                            <span className="text-[10px]">نێر</span>
                          </label>
                          <label className="radio-label">
                            <input
                              type="radio"
                              name="gender"
                              value="female"
                              checked={formData.gender === 'female'}
                              readOnly
                              className="radio-input"
                            />
                            <span className="text-[10px]">مێ</span>
                          </label>
                        </div>
                      </div>
                      <div className="form-group">
                        <label className="form-label text-[9px]">
                          ساڵی لەدایکبوون
                        </label>
                        <input
                          type="date"
                          name="birthYear"
                          value={formData.birthYear}
                          readOnly
                          className="form-input h-7 text-[10px]"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-1.5">
                      <div className="form-group">
                        <label className="form-label text-[9px]">
                          ناونیشان
                        </label>
                        <input
                          type="text"
                          name="address"
                          value={formData.address}
                          readOnly
                          className="form-input h-7 text-[10px]"
                          placeholder="ناونیشانی نیشتەجێبوون"
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label text-[9px]">
                          شار/ناوچە
                        </label>
                        <input
                          type="text"
                          name="city"
                          value={formData.city}
                          readOnly
                          className="form-input h-7 text-[10px]"
                          placeholder="شار"
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label text-[9px]">گەڕەک</label>
                        <input
                          type="text"
                          name="district"
                          value={formData.district}
                          readOnly
                          className="form-input h-7 text-[10px]"
                          placeholder="گەڕەک"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-1.5">
                      <div className="form-group">
                        <label className="form-label text-[9px]">
                          ژ. مۆبایل(١)
                        </label>
                        <input
                          type="text"
                          name="phone1"
                          value={formData.phone1}
                          readOnly
                          className="form-input h-7 text-[10px]"
                          placeholder="07XX XXX XXXX"
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label text-[9px]">
                          ژ. مۆبایل(٢)
                        </label>
                        <input
                          type="text"
                          name="phone2"
                          value={formData.phone2}
                          readOnly
                          className="form-input h-7 text-[10px]"
                          placeholder="07XX XXX XXXX"
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label text-[9px]">ئیمەیل</label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          readOnly
                          className="form-input h-7 text-[10px]"
                          placeholder="example@email.com"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                {/* Education Info */}
                <div>
                  <div className="section-header-modern text-white text-center py-1 text-[11px]">
                    <span className="font-bold tracking-wider">
                      ئاستی خوێندن
                    </span>
                  </div>
                  <div className="modern-card p-2 space-y-1.5">
                    <div className="grid grid-cols-3 gap-1.5">
                      <div className="form-group">
                        <label className="form-label text-[9px]">
                          دەرچووی دەورانەی
                        </label>
                        <div className="badge-red py-1 text-[10px]">زانستی</div>
                      </div>
                      <div className="form-group">
                        <label className="form-label text-[9px]">
                          ساڵی دەرچوون
                        </label>
                        <input
                          type="date"
                          name="graduationYear"
                          value={formData.graduationYear}
                          readOnly
                          className="form-input h-7 text-[10px]"
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label text-[9px]">
                          jۆری سیستەم
                        </label>
                        <div className="flex gap-3 mt-1">
                          <label className="radio-label">
                            <input
                              type="radio"
                              name="educationSystem"
                              value="regular"
                              checked={formData.educationSystem === 'regular'}
                              readOnly
                              className="radio-input"
                            />
                            <span className="text-[10px]">ئاسایی</span>
                          </label>
                          <label className="radio-label">
                            <input
                              type="radio"
                              name="educationSystem"
                              value="swedish"
                              checked={formData.educationSystem === 'swedish'}
                              readOnly
                              className="radio-input"
                            />
                            <span className="text-[10px]">سودی</span>
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="info-box-blue rounded-lg p-1.5">
                      <label className="form-label text-center block mb-1 text-[9px]">
                        ژمارەی تاقیکردنەوە
                      </label>
                      <div className="flex flex-wrap justify-center gap-0.5">
                        {[...Array(13)].map((_, i) => (
                          <input
                            key={i}
                            type="text"
                            maxLength={1}
                            value={formData.examTestNumbers[i]}
                            readOnly
                            className="exam-box w-6 h-6 text-[9px]"
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                {/* Grades Info */}
                <div>
                  <div className="section-header-modern text-white text-center py-1 text-[11px]">
                    <span className="font-bold tracking-wider">
                      زانیاری نمرەی فێرخواز
                    </span>
                  </div>
                  <div className="modern-card p-2 space-y-1.5">
                    <div className="info-box-warning rounded-lg p-1.5">
                      <p className="text-gray-800 text-[9px] leading-tight">
                        بەڕێوەبەری بەڕێز: نمرەکانی خوارەوە دەبێت هاوتای بڕوانامە
                        بێت کە دەهێنرێت بۆ پەیمانگە.
                      </p>
                    </div>
                    <div className="grid grid-cols-4 gap-1.5">
                      <div className="form-group">
                        <label className="form-label text-[9px]">پارێزگا</label>
                        <input
                          type="text"
                          name="province"
                          value={formData.province}
                          readOnly
                          className="form-input h-7 text-[10px]"
                          placeholder="پارێزگا"
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label text-[9px]">
                          پەروەردە
                        </label>
                        <input
                          type="text"
                          name="education"
                          value={formData.education}
                          readOnly
                          className="form-input h-7 text-[10px]"
                          placeholder="پەروەردە"
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label text-[9px]">گەڕەک</label>
                        <input
                          type="text"
                          name="district2"
                          value={formData.district2}
                          readOnly
                          className="form-input h-7 text-[10px]"
                          placeholder="گەڕەک"
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label text-[9px]">
                          ساڵی خوێندن
                        </label>
                        <input
                          type="date"
                          name="studyYear"
                          value={formData.studyYear}
                          readOnly
                          className="form-input h-7 text-[10px]"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                {/* Subjects Table */}
                <div>
                  <div className="table-header p-1.5 text-[11px]">وانەکان</div>
                  <div className="table-container">
                    <div className="grid grid-cols-9 gap-0.5 p-1.5 bg-gray-50">
                      {formData.subjects.map((subject, i) => {
                        const isReadOnly = i === 0 || i === 7 || i === 8
                        const placeholderText =
                          i > 0 && i < 7 ? `وانە ${i}` : ''
                        return (
                          <input
                            key={i}
                            type="text"
                            value={subject}
                            readOnly
                            className={`table-cell ${isReadOnly ? 'bg-gray-100 font-bold' : ''} h-7 text-[9px] p-0.5`}
                            placeholder={placeholderText}
                          />
                        )
                      })}
                    </div>
                    <div className="grid grid-cols-10 gap-0.5 p-1.5 bg-red-50">
                      <div className="table-label-red text-[9px] py-1">
                        بە ژمارە
                      </div>
                      {formData.firstGradesNumeric.map((grade, i) => (
                        <input
                          key={i}
                          type="text"
                          value={grade}
                          readOnly
                          className="table-cell-red h-7 text-[9px] p-0.5"
                          placeholder="نمرە"
                        />
                      ))}
                    </div>
                    <div className="grid grid-cols-10 gap-0.5 p-1.5 bg-red-50">
                      <div className="table-label-red text-[9px] py-1">
                        بەنووسین
                      </div>
                      {formData.firstGradesWritten.map((grade, i) => (
                        <input
                          key={i}
                          type="text"
                          value={grade}
                          readOnly
                          className="table-cell-red h-7 text-[9px] p-0.5"
                          placeholder="نمرە"
                        />
                      ))}
                    </div>
                    <div className="grid grid-cols-10 gap-0.5 p-1.5 bg-yellow-50">
                      <div className="table-label-yellow text-[9px] py-1">
                        خولی دووەم
                      </div>
                      {formData.secondGradesNumeric.map((grade, i) => (
                        <input
                          key={i}
                          type="text"
                          value={grade}
                          readOnly
                          className="table-cell-yellow h-7 text-[9px] p-0.5"
                          placeholder="نمرە"
                        />
                      ))}
                    </div>
                    <div className="grid grid-cols-10 gap-0.5 p-1.5 bg-yellow-50">
                      <div className="table-label-yellow text-[9px] py-1">
                        بەنووسین
                      </div>
                      {formData.secondGradesWritten.map((grade, i) => (
                        <input
                          key={i}
                          type="text"
                          value={grade}
                          readOnly
                          className="table-cell-yellow h-7 text-[9px] p-0.5"
                          placeholder="نمرە"
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Footer */}
            <div className="shrink-0 mt-2 pt-1.5 border-t-2 border-red-500">
              <div className="grid grid-cols-4 gap-1.5 text-[10px] mb-1.5">
                <div className="flex items-center gap-1.5 bg-gradient-to-r from-red-50 to-red-100 p-1.5 rounded-lg">
                  <svg
                    className="w-3 h-3 text-red-600 flex-shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  <span className="font-medium">0772 911 21 21</span>
                </div>
                <div className="flex items-center gap-1.5 bg-gradient-to-r from-red-50 to-red-100 p-1.5 rounded-lg">
                  <svg
                    className="w-3 h-3 text-red-600 flex-shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  <span className="font-medium">0751 911 21 21</span>
                </div>
                <div className="flex items-center gap-1.5 bg-gradient-to-r from-blue-50 to-blue-100 p-1.5 rounded-lg">
                  <svg
                    className="w-3 h-3 text-blue-600 flex-shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                    />
                  </svg>
                  <span className="font-medium text-blue-600">
                    www.kti.edu.iq
                  </span>
                </div>
                <div className="flex items-center gap-1.5 bg-gradient-to-r from-blue-50 to-blue-100 p-1.5 rounded-lg">
                  <svg
                    className="w-3 h-3 text-blue-600 flex-shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  <span className="font-medium text-blue-600">
                    tomar@kti.edu.iq
                  </span>
                </div>
              </div>
              <p className="text-center text-[9px] text-gray-600">
                Kurdistan Technical Institute - Sulaymaniyah Heights, Kurdistan
                Region - Iraq
              </p>
            </div>
          </div>
        </div>
        {/* Page 2 for PDF - DESKTOP ONLY */}
        <div
          ref={pageTwoPrintRef}
          className="bg-white flex flex-col font-bold"
          style={{
            width: '210mm',
            height: '297mm',
            boxSizing: 'border-box',
            overflow: 'hidden',
            padding: '10mm',
          }}
        >
          <div className="flex flex-col h-full">
            <div className="flex-grow min-h-0 overflow-hidden space-y-1.5">
              {/* Top Two Sections */}
              <div className="grid grid-cols-2 gap-1.5">
                {/* Right Section */}
                <div>
                  <div className="section-header-modern text-white text-center py-1 text-[11px]">
                    <span className="font-bold tracking-wider">
                      خانەی تایبەت بە بەریوەبەری خوێندنگە
                    </span>
                  </div>
                  <div className="modern-card p-2 space-y-1.5">
                    <div className="form-group">
                      <label className="form-label text-[9px]">
                        ناوی خوێندنگە
                      </label>
                      <input
                        type="text"
                        name="instituteName"
                        value={formData.instituteName || ''}
                        readOnly
                        className="form-input h-7 text-[10px]"
                        placeholder="ناوی خوێندنگە"
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label text-[9px]">
                        ناوی بەریوەبەر
                      </label>
                      <input
                        type="text"
                        name="directorName"
                        value={formData.directorName || ''}
                        readOnly
                        className="form-input h-7 text-[10px]"
                        placeholder="ناوی بەڕێوەبەر"
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label text-[9px]">
                        ژ. تەلەفۆن
                      </label>
                      <input
                        type="text"
                        name="directorPhone"
                        value={formData.directorPhone || ''}
                        readOnly
                        className="form-input h-7 text-[10px]"
                        placeholder="07XX XXX XXXX"
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label text-center text-[9px]">
                        واژو و ڕێکەوت و مۆر
                      </label>
                      <div className="border-2 border-gray-300 rounded-lg bg-gray-50 h-14"></div>
                    </div>
                  </div>
                </div>
                {/* Left Section */}
                <div>
                  <div className="section-header-modern text-white text-center py-1 text-[11px]">
                    <span className="font-bold tracking-wider">
                      پەسەندکردن و پێشنیارسەندکردنەوەی نمرەکان
                    </span>
                  </div>
                  <div className="modern-card p-2 space-y-1.5">
                    <div className="form-group">
                      <label className="form-label text-[9px]">
                        لە بەریوەبەرێتی پەروەردەی
                      </label>
                      <input
                        type="text"
                        name="educationDirection"
                        value={formData.educationDirection || ''}
                        readOnly
                        className="form-input h-7 text-[10px]"
                        placeholder="پەروەردەی..."
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label text-[9px]">
                        ناوی بەریوەبەرێتی
                      </label>
                      <input
                        type="text"
                        name="educationDirectorName"
                        value={formData.educationDirectorName || ''}
                        readOnly
                        className="form-input h-7 text-[10px]"
                        placeholder="ناوی بەڕێوەبەرێتی"
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label text-[9px]">قەرا</label>
                      <input
                        type="text"
                        name="decision"
                        value={formData.decision || ''}
                        readOnly
                        className="form-input h-7 text-[10px]"
                        placeholder="بڕیار..."
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label text-center text-[9px]">
                        واژو و مۆر
                      </label>
                      <div className="border-2 border-gray-300 rounded-lg bg-gray-50 h-14"></div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Department Selection */}
              <div>
                <div className="section-header-blue text-white text-center py-1 text-[11px]">
                  <span className="font-bold tracking-wider">
                    پەیمانگە بۆ ساڵی خوێندنی (٢٠٢٥-٢٠٢٦)
                  </span>
                </div>
                <div className="modern-card p-2">
                  <div className="grid grid-cols-3 gap-1.5">
                    {[
                      'دەرماسازی',
                      'بەرسارانی',
                      'شیکردنەوەی نەخۆشییەکان',
                      'دوانەگەری پزیشکی(پەرستاری)',
                      'سێژن',
                      'کارگێری گاز',
                      'زمانەرانی',
                      'دیجیتاڵ میدیا و مارکێتینگ',
                      'تەکنەلۆجیای زانیاری',
                      'تەکنەلۆجیای ڕۆوێنێتینگ و ئۆتۆمەیشن',
                      'تەکنەلۆجیای ڕووینێتینگ و ئۆتۆمەیشن',
                      'تەندرارانی دیکۆر',
                    ].map((dept, i) => (
                      <label key={i} className="radio-label py-0.5">
                        <input
                          type="radio"
                          name="departmentChoice"
                          value={dept}
                          checked={formData.departmentChoice === dept}
                          readOnly
                          className="radio-input"
                        />
                        <span className="text-[10px] font-medium">{dept}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
              {/* Medical Declaration */}
              <div>
                <div className="section-header-modern text-white text-center py-1 text-[11px]">
                  <span className="font-bold tracking-wider">
                    ئەو بەشەی دەتەوێت تێیدا بخوێنیت
                  </span>
                </div>
                <div className="info-box-warning p-1.5">
                  <p className="text-[9px] leading-tight text-gray-800">
                    پێویستە زانیاری و سەرەدانێکی وردبێتەوە، زانای(١٩٥٠)
                    لەڕێکەوتی(٢٠٢٥/١/١٨)، بەکەم خانی (٧)، بەکەم خانی (٢)
                    هەماڵاران پرێکەمەوە، بەڵام بەکشتنی هەماڵاردن بەکەم بیوەری
                    سەردەمی وەرگرتنە و دوو هەماڵاردنەمی دیکە لە تەمەری هەموونیش
                    گوسس بەتاڵ لیو بەتانە و بەرێنی dۆاگاریس بەسەنەکە و کۆنەرەی
                    فێرخواز و سەردەکانی وەزارەتی خوێندنی باڵا، وەردەگیرێت.
                  </p>
                </div>
              </div>
              {/* Certificate Section */}
              <div>
                <div className="section-header-blue text-white text-center py-1 text-[11px]">
                  <span className="font-bold tracking-wider">شوێننامە</span>
                </div>
                <div className="modern-card p-2 space-y-1.5">
                  <div className="grid grid-cols-5 gap-1.5">
                    <div className="form-group">
                      <label className="form-label text-[9px]">
                        ناساندنی بازی شارستانی
                      </label>
                      <input
                        type="text"
                        name="certificate0"
                        value={formData.certificate0 || ''}
                        readOnly
                        className="form-input h-7 text-[10px]"
                        placeholder="..."
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label text-[9px]">
                        ژمارەی ناسنامە
                      </label>
                      <input
                        type="text"
                        name="certificate1"
                        value={formData.certificate1 || ''}
                        readOnly
                        className="form-input h-7 text-[10px]"
                        placeholder="..."
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label text-[9px]">
                        ژمارەی تۆمار
                      </label>
                      <input
                        type="text"
                        name="certificate2"
                        value={formData.certificate2 || ''}
                        readOnly
                        className="form-input h-7 text-[10px]"
                        placeholder="..."
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label text-[9px]">
                        ژمارەی لایەو
                      </label>
                      <input
                        type="text"
                        name="certificate3"
                        value={formData.certificate3 || ''}
                        readOnly
                        className="form-input h-7 text-[10px]"
                        placeholder="..."
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label text-[9px]">
                        شوێنی دەرچوون
                      </label>
                      <input
                        type="text"
                        name="certificate4"
                        value={formData.certificate4 || ''}
                        readOnly
                        className="form-input h-7 text-[10px]"
                        placeholder="..."
                      />
                    </div>
                  </div>
                </div>
              </div>
              {/* Nationality Section */}
              <div>
                <div className="section-header-gray text-white text-center py-1 text-[11px]">
                  <span className="font-bold tracking-wider">ڕەگەزنامە</span>
                </div>
                <div className="modern-card p-2 space-y-1.5">
                  <div className="flex gap-3">
                    <label className="radio-label">
                      <input
                        type="radio"
                        name="nationality2"
                        value="iraqi"
                        checked={formData.nationality2 === 'iraqi'}
                        readOnly
                        className="radio-input"
                      />
                      <span className="text-[10px]">عێراقی</span>
                    </label>
                    <label className="radio-label">
                      <input
                        type="radio"
                        name="nationality2"
                        value="other"
                        checked={formData.nationality2 === 'other'}
                        readOnly
                        className="radio-input"
                      />
                      <span className="text-[10px]">هی تر</span>
                    </label>
                  </div>
                  <div className="grid grid-cols-3 gap-1.5">
                    <div className="form-group">
                      <label className="form-label text-[9px]">
                        ژمارەی پەگەزنامە
                      </label>
                      <input
                        type="text"
                        name="nationalityNumber"
                        value={formData.nationalityNumber || ''}
                        readOnly
                        className="form-input h-7 text-[10px]"
                        placeholder="ژمارەی ڕەگەزنامە"
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label text-[9px]">
                        ژمارەی تۆمار
                      </label>
                      <input
                        type="text"
                        name="registrationNumber"
                        value={formData.registrationNumber || ''}
                        readOnly
                        className="form-input h-7 text-[10px]"
                        placeholder="ژمارەی تۆمار"
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label text-[9px]">
                        ساڵ و شوێنی دەرچوون
                      </label>
                      <input
                        type="date"
                        name="issueYearPlace"
                        value={formData.issueYearPlace || ''}
                        readOnly
                        className="form-input h-7 text-[10px]"
                      />
                    </div>
                  </div>
                </div>
              </div>
              {/* Family Card Section */}
              <div>
                <div className="section-header-gray text-white text-center py-1 text-[11px]">
                  <span className="font-bold tracking-wider">
                    کارتی نیشتیمانی
                  </span>
                </div>
                <div className="modern-card p-2 space-y-1.5">
                  <div className="grid grid-cols-4 gap-1.5">
                    <div className="form-group">
                      <label className="form-label text-[9px]">
                        ژمارەی کارت
                      </label>
                      <input
                        type="text"
                        name="familyCardNumber"
                        value={formData.familyCardNumber || ''}
                        readOnly
                        className="form-input h-7 text-[10px]"
                        placeholder="ژمارەی کارت"
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label text-[9px]">
                        شوێنی دەرچوون
                      </label>
                      <input
                        type="text"
                        name="familyCardIssuePlace"
                        value={formData.familyCardIssuePlace || ''}
                        readOnly
                        className="form-input h-7 text-[10px]"
                        placeholder="شوێنی دەرچوون"
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label text-[9px]">
                        ڕێکەوتی دەرچوون
                      </label>
                      <input
                        type="date"
                        name="familyCardIssueDate"
                        value={formData.familyCardIssueDate || ''}
                        readOnly
                        className="form-input h-7 text-[10px]"
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label text-[9px]">
                        کۆدی خێزانی
                      </label>
                      <input
                        type="text"
                        name="familyCode"
                        value={formData.familyCode || ''}
                        readOnly
                        className="form-input h-7 text-[10px]"
                        placeholder="کۆدی خێزانی"
                      />
                    </div>
                  </div>
                </div>
              </div>
              {/* Bottom Signature Section */}
              <div className="grid grid-cols-2 gap-1.5">
                <div className="modern-card p-2">
                  <label className="block text-gray-700 font-bold text-center text-[10px] mb-1">
                    ناوی سیاڵی فێرخواز
                  </label>
                  <div className="border-t-2 border-gray-400 mt-3"></div>
                </div>
                <div className="modern-card p-2">
                  <label className="block text-gray-700 font-bold text-center text-[10px] mb-1">
                    ڕێکەوت
                    <br />
                    واژو
                  </label>
                  <div className="border-t-2 border-gray-400 mt-3"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
const container = document.getElementById('root')
if (container) {
  const root = createRoot(container)
  root.render(<App />)
}
