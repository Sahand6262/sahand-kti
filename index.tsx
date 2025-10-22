
import React, { useEffect, useState, useRef } from 'react'
import { createRoot } from 'react-dom/client'
import { jsPDF } from 'jspdf'
import html2canvas from 'html2canvas'

// Visible form component
const FormContent = ({
  formData,
  handleChange,
  handleArrayChange,
  isMobile = false,
}) => (
  <form className={`${isMobile ? 'text-sm space-y-4' : 'text-sm space-y-6'}`}>
    {/* Personal Info */}
    <div>
      <div className="section-header-modern text-white text-center py-3 mb-4 text-base">
        <span className="font-bold tracking-wider">زانیاری كەسی</span>
      </div>
      <div
        className={`modern-card ${isMobile ? 'p-4 space-y-3' : 'p-6 space-y-4'}`}
      >
        <div
          className={`grid ${isMobile ? 'grid-cols-1 gap-3' : 'grid-cols-3 gap-4'}`}
        >
          <div className="form-group">
            <label className="form-label">ناوی فێرخواز</label>
            <input
              type="text"
              name="personalName"
              value={formData.personalName}
              onChange={handleChange}
              className="form-input"
              placeholder="ناوی سیانی"
            />
          </div>
          <div className="form-group">
            <label className="form-label">ڕەگەز</label>
            <div className="flex gap-6 mt-2">
              <label className="radio-label">
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  checked={formData.gender === 'male'}
                  onChange={handleChange}
                  className="radio-input"
                />
                <span>نێر</span>
              </label>
              <label className="radio-label">
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  checked={formData.gender === 'female'}
                  onChange={handleChange}
                  className="radio-input"
                />
                <span>مێ</span>
              </label>
            </div>
          </div>
          <div className="form-group">
            <label className="form-label">ساڵی لەدایکبوون</label>
            <input
              type="text"
              name="birthYear"
              value={formData.birthYear}
              onChange={handleChange}
              className="form-input"
              placeholder="YYYY"
            />
          </div>
        </div>
        <div
          className={`grid ${isMobile ? 'grid-cols-1 gap-3' : 'grid-cols-3 gap-4'}`}
        >
          <div className="form-group">
            <label className="form-label">ناونیشان</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="form-input"
              placeholder="ناونیشانی نیشتەجێبوون"
            />
          </div>
          <div className="form-group">
            <label className="form-label">شار/ناوچە</label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="form-input"
              placeholder="شار"
            />
          </div>
          <div className="form-group">
            <label className="form-label">گەڕەک</label>
            <input
              type="text"
              name="district"
              value={formData.district}
              onChange={handleChange}
              className="form-input"
              placeholder="گەڕەک"
            />
          </div>
        </div>
        <div
          className={`grid ${isMobile ? 'grid-cols-1 gap-3' : 'grid-cols-3 gap-4'}`}
        >
          <div className="form-group">
            <label className="form-label">ژ. مۆبایل(١)</label>
            <input
              type="text"
              name="phone1"
              value={formData.phone1}
              onChange={handleChange}
              className="form-input"
              placeholder="07XX XXX XXXX"
              dir="ltr"
            />
          </div>
          <div className="form-group">
            <label className="form-label">ژ. مۆبایل(٢)</label>
            <input
              type="text"
              name="phone2"
              value={formData.phone2}
              onChange={handleChange}
              className="form-input"
              placeholder="07XX XXX XXXX"
              dir="ltr"
            />
          </div>
          <div className="form-group">
            <label className="form-label">ئیمەیل</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="form-input"
              dir="ltr"
              placeholder="example@email.com"
            />
          </div>
        </div>
      </div>
    </div>
    {/* Education Info */}
    <div>
      <div className="section-header-modern text-white text-center py-3 mb-4 text-base">
        <span className="font-bold tracking-wider">ئاستی خوێندن</span>
      </div>
      <div
        className={`modern-card ${isMobile ? 'p-4 space-y-3' : 'p-6 space-y-4'}`}
      >
        <div
          className={`grid ${isMobile ? 'grid-cols-1 gap-3' : 'grid-cols-3 gap-4'}`}
        >
          <div className="form-group">
            <label className="form-label">دەرچووی دەورانەی</label>
            <div className="badge-red py-2">زانستی</div>
          </div>
          <div className="form-group">
            <label className="form-label">ساڵی دەرچوون</label>
            <input
              type="text"
              name="graduationYear"
              value={formData.graduationYear}
              onChange={handleChange}
              className="form-input"
              placeholder="YYYY"
            />
          </div>
          <div className="form-group">
            <label className="form-label">jۆری سیستەم</label>
            <div className="flex gap-6 mt-2">
              <label className="radio-label">
                <input
                  type="radio"
                  name="educationSystem"
                  value="regular"
                  checked={formData.educationSystem === 'regular'}
                  onChange={handleChange}
                  className="radio-input"
                />
                <span>ئاسایی</span>
              </label>
              <label className="radio-label">
                <input
                  type="radio"
                  name="educationSystem"
                  value="swedish"
                  checked={formData.educationSystem === 'swedish'}
                  onChange={handleChange}
                  className="radio-input"
                />
                <span>سودی</span>
              </label>
            </div>
          </div>
        </div>
        <div className="info-box-blue p-4">
          <label className="form-label text-center block mb-3">
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
                className="exam-box w-10 h-10"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
    {/* Grades Info */}
    <div>
      <div className="section-header-modern text-white text-center py-3 mb-4 text-base">
        <span className="font-bold tracking-wider">زانیاری نمرەی فێرخواز</span>
      </div>
      <div
        className={`modern-card ${isMobile ? 'p-4 space-y-3' : 'p-6 space-y-4'}`}
      >
        <div className="info-box-warning p-4">
          <p className="text-gray-800 text-sm">
            بەڕێوەبەری بەڕێز: نمرەکانی خوارەوە دەبێت هاوتای بڕوانامە بێت کە
            دەهێنرێت بۆ پەیمانگە.
          </p>
        </div>
        <div
          className={`grid ${isMobile ? 'grid-cols-1 gap-3' : 'grid-cols-4 gap-4'}`}
        >
          <div className="form-group">
            <label className="form-label">پارێزگا</label>
            <input
              type="text"
              name="province"
              value={formData.province}
              onChange={handleChange}
              className="form-input"
              placeholder="پارێزگا"
            />
          </div>
          <div className="form-group">
            <label className="form-label">پەروەردە</label>
            <input
              type="text"
              name="education"
              value={formData.education}
              onChange={handleChange}
              className="form-input"
              placeholder="پەروەردە"
            />
          </div>
          <div className="form-group">
            <label className="form-label">گەڕەک</label>
            <input
              type="text"
              name="district2"
              value={formData.district2}
              onChange={handleChange}
              className="form-input"
              placeholder="گەڕەک"
            />
          </div>
          <div className="form-group">
            <label className="form-label">ساڵی خوێندن</label>
            <input
              type="text"
              name="studyYear"
              value={formData.studyYear}
              onChange={handleChange}
              className="form-input"
              placeholder="YYYY"
            />
          </div>
        </div>
      </div>
    </div>
    {/* Subjects Table */}
    <div>
      <div className="section-header-blue text-white text-center py-3 mb-4 text-base">
        <span className="font-bold tracking-wider">وانەکان و نمرەکان</span>
      </div>
      <div className="table-container">
        <div className="table-header p-3 text-sm">وانەکان</div>
        <div
          className={`grid ${isMobile ? 'grid-cols-3 gap-2' : 'grid-cols-9 gap-1'} p-2 bg-gray-50`}
        >
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
                className={`table-cell ${isReadOnly ? 'bg-gray-100 font-bold' : ''} h-10 text-sm p-2`}
                placeholder={placeholderText}
              />
            )
          })}
        </div>
        <div
          className={`grid ${isMobile ? 'grid-cols-3' : 'grid-cols-10'} gap-1 p-2 bg-red-50`}
        >
          <div className="table-label-red text-sm">بە ژمارە</div>
          {formData.firstGradesNumeric.map((grade, i) => (
            <input
              key={i}
              type="text"
              value={grade}
              onChange={(e) =>
                handleArrayChange('firstGradesNumeric', i, e.target.value)
              }
              className="table-cell-red h-10 text-sm p-2"
              placeholder="نمرە"
            />
          ))}
        </div>
        <div
          className={`grid ${isMobile ? 'grid-cols-3' : 'grid-cols-10'} gap-1 p-2 bg-red-50`}
        >
          <div className="table-label-red text-sm">بەنووسین</div>
          {formData.firstGradesWritten.map((grade, i) => (
            <input
              key={i}
              type="text"
              value={grade}
              onChange={(e) =>
                handleArrayChange('firstGradesWritten', i, e.target.value)
              }
              className="table-cell-red h-10 text-sm p-2"
              placeholder="نمرە"
            />
          ))}
        </div>
        <div
          className={`grid ${isMobile ? 'grid-cols-3' : 'grid-cols-10'} gap-1 p-2 bg-yellow-50`}
        >
          <div className="table-label-yellow text-sm">خولی دووەم</div>
          {formData.secondGradesNumeric.map((grade, i) => (
            <input
              key={i}
              type="text"
              value={grade}
              onChange={(e) =>
                handleArrayChange('secondGradesNumeric', i, e.target.value)
              }
              className="table-cell-yellow h-10 text-sm p-2"
              placeholder="نمرە"
            />
          ))}
        </div>
        <div
          className={`grid ${isMobile ? 'grid-cols-3' : 'grid-cols-10'} gap-1 p-2 bg-yellow-50`}
        >
          <div className="table-label-yellow text-sm">بەنووسین</div>
          {formData.secondGradesWritten.map((grade, i) => (
            <input
              key={i}
              type="text"
              value={grade}
              onChange={(e) =>
                handleArrayChange('secondGradesWritten', i, e.target.value)
              }
              className="table-cell-yellow h-10 text-sm p-2"
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
}) => (
  <form className={`${isMobile ? 'text-sm space-y-4' : 'text-sm space-y-6'}`}>
    {/* Top Two Sections */}
    <div
      className={`grid ${isMobile ? 'grid-cols-1 gap-4' : 'grid-cols-2 gap-4'}`}
    >
      {/* Right Section */}
      <div>
        <div className="section-header-modern text-white text-center py-3 mb-4 text-base">
          <span className="font-bold tracking-wider">
            خانەی تایبەت بە بەریوەبەری خوێندنگە
          </span>
        </div>
        <div
          className={`modern-card ${isMobile ? 'p-4 space-y-3' : 'p-6 space-y-4'}`}
        >
          <div className="form-group">
            <label className="form-label">ناوی خوێندنگە</label>
            <input
              type="text"
              name="instituteName"
              value={formData.instituteName || ''}
              onChange={handleChange}
              className="form-input"
              placeholder="ناوی خوێندنگە"
            />
          </div>
          <div className="form-group">
            <label className="form-label">ناوی بەریوەبەر</label>
            <input
              type="text"
              name="directorName"
              value={formData.directorName || ''}
              onChange={handleChange}
              className="form-input"
              placeholder="ناوی بەڕێوەبەر"
            />
          </div>
          <div className="form-group">
            <label className="form-label">ژ. تەلەفۆن</label>
            <input
              type="text"
              name="directorPhone"
              value={formData.directorPhone || ''}
              onChange={handleChange}
              className="form-input"
              dir="ltr"
              placeholder="07XX XXX XXXX"
            />
          </div>
          <div className="form-group">
            <label className="form-label text-center">
              واژو و ڕێکەوت و مۆر
            </label>
            <div className="border-2 border-gray-300 bg-gray-50 h-24"></div>
          </div>
        </div>
      </div>
      {/* Left Section */}
      <div>
        <div className="section-header-modern text-white text-center py-3 mb-4 text-base">
          <span className="font-bold tracking-wider">
            پەسەندکردن و پێشنیارسەندکردنەوەی نمرەکان
          </span>
        </div>
        <div
          className={`modern-card ${isMobile ? 'p-4 space-y-3' : 'p-6 space-y-4'}`}
        >
          <div className="form-group">
            <label className="form-label">لە بەریوەبەرێتی پەروەردەی</label>
            <input
              type="text"
              name="educationDirection"
              value={formData.educationDirection || ''}
              onChange={handleChange}
              className="form-input"
              placeholder="پەروەردەی..."
            />
          </div>
          <div className="form-group">
            <label className="form-label">ناوی بەریوەبەرێتی</label>
            <input
              type="text"
              name="educationDirectorName"
              value={formData.educationDirectorName || ''}
              onChange={handleChange}
              className="form-input"
              placeholder="ناوی بەڕێوەبەرێتی"
            />
          </div>
          <div className="form-group">
            <label className="form-label">قەرا</label>
            <input
              type="text"
              name="decision"
              value={formData.decision || ''}
              onChange={handleChange}
              className="form-input"
              placeholder="بڕیار..."
            />
          </div>
          <div className="form-group">
            <label className="form-label text-center">واژو و مۆر</label>
            <div className="border-2 border-gray-300 bg-gray-50 h-24"></div>
          </div>
        </div>
      </div>
    </div>
    {/* Department Selection */}
    <div>
      <div className="section-header-blue text-white text-center py-3 mb-4 text-base">
        <span className="font-bold tracking-wider">
          پەیمانگە بۆ ساڵی خوێندنی (٢٠٢٥-٢٠٢٦)
        </span>
      </div>
      <div className={`modern-card ${isMobile ? 'p-4' : 'p-6'}`}>
        <div
          className={`grid ${isMobile ? 'grid-cols-2 gap-3' : 'grid-cols-4 gap-4'}`}
        >
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
            <label key={i} className="radio-label">
              <input
                type="radio"
                name="departmentChoice"
                value={dept}
                checked={formData.departmentChoice === dept}
                onChange={handleChange}
                className="radio-input"
              />
              <span className="text-sm font-medium">{dept}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
    {/* Medical Declaration */}
    <div>
      <div className="section-header-modern text-white text-center py-3 mb-4 text-base">
        <span className="font-bold tracking-wider">
          ئەو بەشەی دەتەوێت تێیدا بخوێنیت
        </span>
      </div>
      <div className={`info-box-warning ${isMobile ? 'p-3' : 'p-4'}`}>
        <p className={`${isMobile ? 'text-sm' : 'text-sm'} text-gray-800`}>
          پێویستە زانیاری و سەرەدانێکی وردبێتەوە، زانای(١٩٥٠)
          لەڕێکەوتی(٢٠٢٥/١/١٨)، بەکەم خانی (٧)، بەکەم خانی (٢) هەماڵاران
          پرێکەمەوە، بەڵام بەکشتنی هەماڵاردن بەکەم بیوەری سەردەمی وەرگرتنە و دوو
          هەماڵاردنەمی دیکە لە تەمەری هەموونیش گوسس بەتاڵ لیو بەتانە و بەرێنی
          dۆاگاریس بەسەنەکە و کۆنەرەی فێرخواز و سەردەکانی وەزارەتی خوێندنی باڵا،
          وەردەگیرێت.
        </p>
      </div>
    </div>
    {/* Certificate Section */}
    <div>
      <div className="section-header-blue text-white text-center py-3 mb-4 text-base">
        <span className="font-bold tracking-wider">شوێننامە</span>
      </div>
      <div className="modern-card overflow-hidden">
        <div
          className={`grid ${isMobile ? 'grid-cols-1' : 'grid-cols-5'} gap-0 bg-gray-100`}
        >
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-2 text-center font-bold border border-gray-300 text-sm">
            ناساندنی بازی شارستانی
          </div>
          <div className="bg-gray-200 p-2 text-center font-bold border border-gray-300 text-sm">
            ژمارەی ناسنامە
          </div>
          <div className="bg-gray-200 p-2 text-center font-bold border border-gray-300 text-sm">
            ژمارەی تۆمار
          </div>
          <div className="bg-gray-200 p-2 text-center font-bold border border-gray-300 text-sm">
            ژمارەی لایەو
          </div>
          <div className="bg-gray-200 p-2 text-center font-bold border border-gray-300 text-sm">
            شوێنی دەرچوون
          </div>
        </div>
        <div
          className={`grid ${isMobile ? 'grid-cols-1' : 'grid-cols-5'} gap-0`}
        >
          {[...Array(5)].map((_, i) => (
            <input
              key={i}
              type="text"
              name={`certificate${i}`}
              value={formData[`certificate${i}`] || ''}
              onChange={handleChange}
              className="form-input rounded-none border-gray-300 h-10 text-sm p-2"
              placeholder="..."
            />
          ))}
        </div>
      </div>
    </div>
    {/* Nationality Section */}
    <div>
      <div className="section-header-gray text-white text-center py-3 mb-4 text-base">
        <span className="font-bold tracking-wider">ڕەگەزنامە</span>
      </div>
      <div
        className={`modern-card ${isMobile ? 'p-4 space-y-3' : 'p-6 space-y-4'}`}
      >
        <div className="flex gap-6">
          <label className="radio-label">
            <input
              type="radio"
              name="nationality2"
              value="iraqi"
              checked={formData.nationality2 === 'iraqi'}
              onChange={handleChange}
              className="radio-input"
            />
            <span className="text-sm">عێراقی</span>
          </label>
          <label className="radio-label">
            <input
              type="radio"
              name="nationality2"
              value="other"
              checked={formData.nationality2 === 'other'}
              onChange={handleChange}
              className="radio-input"
            />
            <span className="text-sm">هی تر</span>
          </label>
        </div>
        <div
          className={`grid ${isMobile ? 'grid-cols-1 gap-3' : 'grid-cols-3 gap-4'}`}
        >
          <div className="form-group">
            <label className="form-label">ژمارەی پەگەزنامە</label>
            <input
              type="text"
              name="nationalityNumber"
              value={formData.nationalityNumber || ''}
              onChange={handleChange}
              className="form-input"
              placeholder="ژمارەی ڕەگەزنامە"
            />
          </div>
          <div className="form-group">
            <label className="form-label">ژمارەی تۆمار</label>
            <input
              type="text"
              name="registrationNumber"
              value={formData.registrationNumber || ''}
              onChange={handleChange}
              className="form-input"
              placeholder="ژمارەی تۆمار"
            />
          </div>
          <div className="form-group">
            <label className="form-label">ساڵ و شوێنی دەرچوون</label>
            <input
              type="text"
              name="issueYearPlace"
              value={formData.issueYearPlace || ''}
              onChange={handleChange}
              className="form-input"
              placeholder="ساڵ و شوێن"
            />
          </div>
        </div>
      </div>
    </div>
    {/* Family Card Section */}
    <div>
      <div className="section-header-gray text-white text-center py-3 mb-4 text-base">
        <span className="font-bold tracking-wider">کارتی نیشتیمانی</span>
      </div>
      <div
        className={`modern-card ${isMobile ? 'p-4 space-y-3' : 'p-6 space-y-4'}`}
      >
        <div
          className={`grid ${isMobile ? 'grid-cols-1 gap-3' : 'grid-cols-2 gap-4'}`}
        >
          <div className="form-group">
            <label className="form-label">ژمارەی کارت</label>
            <input
              type="text"
              name="familyCardNumber"
              value={formData.familyCardNumber || ''}
              onChange={handleChange}
              className="form-input"
              placeholder="ژمارەی کارت"
            />
          </div>
          <div className="form-group">
            <label className="form-label">شوێنی دەرچوون</label>
            <input
              type="text"
              name="familyCardIssuePlace"
              value={formData.familyCardIssuePlace || ''}
              onChange={handleChange}
              className="form-input"
              placeholder="شوێنی دەرچوون"
            />
          </div>
          <div className="form-group">
            <label className="form-label">ڕێکەوتی دەرچوون</label>
            <input
              type="text"
              name="familyCardIssueDate"
              value={formData.familyCardIssueDate || ''}
              onChange={handleChange}
              className="form-input"
              placeholder="YYYY/MM/DD"
            />
          </div>
          <div className="form-group">
            <label className="form-label">کۆدی خێزانی</label>
            <input
              type="text"
              name="familyCode"
              value={formData.familyCode || ''}
              onChange={handleChange}
              className="form-input"
              placeholder="کۆدی خێزانی"
            />
          </div>
        </div>
      </div>
    </div>
    {/* Terms and Conditions */}
    <div>
      <div className="section-header-modern text-white text-center py-3 mb-4 text-base">
        <span className="font-bold tracking-wider">سەرچاوە و وەرگرتن</span>
      </div>
      <div className={`modern-card ${isMobile ? 'p-4' : 'p-6'}`}>
        <ol
          className={`list-decimal list-inside ${isMobile ? 'text-sm space-y-2' : 'text-sm space-y-2'} text-gray-700`}
        >
          <li>دەبێت فێرخواز دەرەبووی، ژوانرۆ، ئاماجیدی-بەشێکی (ژانستی) بێت.</li>
          <li>
            دەربووی ساڵانی پێشوو، ماتە پێشکەشکردنی فۆرمی وەرگرتنیان هەیە، بەشەرت
            گێرەیک ١ (٪١٠) وەردەگیراون دەکەن.
          </li>
          <li>
            پاش وەرگرتنی فۆرمی بەمانگە، دەبێت لە ماوەی پێک هەفتەدا، فۆرمەکە
            بگەڕێنیتەوە بۆ بەمانگە.
          </li>
          <li>
            ئەو پێم هەموو ئەو فێرخوازانەی کە لە بەمانگەکە بەرگەوتووەوە وەرگیرێن.
          </li>
          <li>
            لە کاتی، وەرگرتنی فێرخواز لەو بەشە ژانستیدا، بەشەندا دیاریکراوەوە،
            تەنیا لەسەندووی هەماڵاردن دووەم، لە ژێیەو و پەیکەر، سەرجەووە
            دیاریکراوە وەردەگیرێتە، تەخمەنی بەرێنی، ژێنیاسازییەکان وەرگیرین و
            پاکەری، لە ئێواری نمرەکان، ئەو بەرە نیشتیمانی بەمانگە
            دەستنیشانکراوە.
          </li>
          <li>
            پاش ڕاگەیاندنی ناوەکان، پەیوەستە فێرخواز لە ماوەی (٣) ژۆژا بەوەمەندی
            بە بەمانگەکە بکات، پێچەواوەنامە ماتە وەرگیرێتی بامەنێت.
          </li>
          <li>
            پاش ڕاگەیاندنی وەرگرتنی ناوی فێرخوازان، دەبێت بەولانامی ئاماجەنی
            بەسەندگیراو لەبەرەوەبەرێتیش گەشتن بەرەوەردە و پەناواسەنگێکانی ترو
            وەرگیرن، لە ماوەی (١٠) لە ڕێکەوتی ڕاگەیاندنی، بەولانامی ئاماجەنی
            بەسەندگیراو لەبەرەوەبەرێتیش گەشتن بەرەوەردە و پەناواسەنگێکانی ترو
            وەرگیرن.
          </li>
          <li>
            ئەگەر فێرخواز پاش راگەیاندنی کرێس خوێندن، بەرێنی، فەسەنە
            دیاریکراوەکان و دەرەبووی، نەتەrsانی کارگێری بەمانگە، نەشتوومەکەی
            نەرس لە بەمانگە تۆمار دەکرێت.
          </li>
          <li>
            وەرگرتنی کرێس خوێندن بە (١) فەسەنە، بەم شێوازە: ١- لە ماوەی خوێندنی
            سێمەسترێکی یەکەم (٢) فەسەت دەحات لە ماوەی خوێندنی سێمەسترێکی
            دووەم(٣) فەسەت دەحات.
          </li>
          <li>
            لەگەڕخواز لە دەموی، شارەزوو بێت، لە دەیەندگیری شوێنی، ماتەو ماتەواری
            دەکات، بەشەرت گێرەیش ماتەوە لە تەسەتی فێرخوازاراید.
          </li>
          <li>
            دەماوەی خوێندن لە بەمانگەکە، تەکنیکی گەردەتبەشی کۆردستان بەرابەیە.
          </li>
          <li>
            هەر مەنداوی سەرکەوتەکە فۆرمی، باڵاترین و بەولانامە وەگەرتنەدا هەیە،
            فێرخواز بەرپرسیو لە هەر فۆرماەکی ترت دەرگیرێت و لێبەرسینەووی بانسانی
            ئەنجام دەکرێت.
          </li>
          <li>
            لە ئەگەری بەڵگەکردنا، پەیوەستە بەرێنی ژێنیاسازییەکان وەزارەتی
            خوێندنی باڵا و تۆێژینەوەی ژانستی بێت.
          </li>
        </ol>
      </div>
    </div>
    {/* Bottom Signature Section */}
    <div
      className={`grid ${isMobile ? 'grid-cols-1 gap-4' : 'grid-cols-2 gap-4'}`}
    >
      <div className={`modern-card ${isMobile ? 'p-3' : 'p-4'}`}>
        <label className="block text-gray-700 mb-2 font-bold text-center text-base">
          ناوی سیاڵی فێرخواز
        </label>
        <div className="border-t-2 border-gray-400 mt-8"></div>
      </div>
      <div className={`modern-card ${isMobile ? 'p-3' : 'p-4'}`}>
        <label className="block text-gray-700 mb-2 font-bold text-center text-base">
          ڕێکەوت
          <br />
          واژو
        </label>
        <div className="border-t-2 border-gray-400 mt-8"></div>
      </div>
    </div>
  </form>
)
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
  const [captureTrigger, setCaptureTrigger] = useState(null)
  const visiblePageRef = useRef(null)
  useEffect(() => {
    if (showSuccess || showError) {
      const timer = setTimeout(() => {
        setShowSuccess(false)
        setShowError(false)
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [showSuccess, showError])
  useEffect(() => {
    if (captureTrigger && visiblePageRef.current) {
      setTimeout(() => {
        html2canvas(visiblePageRef.current, {
          scale: 3,
          useCORS: true,
          logging: false,
          backgroundColor: '#ffffff',
          imageTimeout: 0,
          removeContainer: false,
        }).then((canvas) => {
          captureTrigger.resolve(canvas)
        })
      }, 50)
    }
  }, [captureTrigger])
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
    const pageToCapture = visiblePageRef.current
    if (!pageToCapture) {
      console.error('PDF generation failed: ref not found')
      setShowError(true)
      setIsGenerating(false)
      return
    }
    try {
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
        compress: false,
      })
      // Capture page 2 first (current page)
      const canvas2 = await html2canvas(pageToCapture, {
        scale: 3,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff',
        imageTimeout: 0,
        removeContainer: false,
      })
      // Trigger state change to show page 1 and wait for capture
      // FIX: Explicitly typed the Promise to resolve with an HTMLCanvasElement to fix the error on canvas1.toDataURL.
      const canvas1 = await new Promise<HTMLCanvasElement>((resolve) => {
        setCaptureTrigger({ resolve })
        setCurrentStep(1)
      })
      const imgData1 = canvas1.toDataURL('image/jpeg', 0.98)
      const imgData2 = canvas2.toDataURL('image/jpeg', 0.98)
      pdf.addImage(imgData1, 'JPEG', 0, 0, 210, 297)
      pdf.addPage()
      pdf.addImage(imgData2, 'JPEG', 0, 0, 210, 297)
      pdf.save('Kurdistan_Technical_Institute_Form_Complete.pdf')
      setShowSuccess(true)
    } catch (error) {
      console.error('PDF generation failed:', error)
      setShowError(true)
    } finally {
      setCurrentStep(2)
      setIsGenerating(false)
      setCaptureTrigger(null)
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
  const PageOneContent = () => (
    <>
      <div className="border-b-2 border-red-500 pb-4 mb-6">
        <div className="flex justify-between items-start gap-4">
          <div className="border-2 border-red-500 p-3 w-20 h-24 flex items-center justify-center flex-shrink-0">
            <p className="text-xs text-gray-600 text-center">وێنەی فێرخواز</p>
          </div>
          <div className="text-center flex-1">
            <img
              src="https://tse3.mm.bing.net/th/id/OIP.QmR4OtGs_XHKX4sjiPJrxwHaHa?rs=1&pid=ImgDetMain"
              alt="Logo"
              className="h-16 mx-auto mb-2"
              crossOrigin="anonymous"
            />
            <div className="text-blue-700 font-bold text-sm">
              <p>KURDISTAN TECHNICAL INSTITUTE</p>
            </div>
          </div>
          <div className="text-right text-sm text-blue-700 w-32 flex-shrink-0">
            <p className="font-semibold">هەرێمی كوردستان - عێراق</p>
            <p>وەزارەتی خوێندنی باڵا</p>
            <p>پەیمانگەی تەكنیكی كوردستان</p>
          </div>
        </div>
      </div>
      <div className="bg-gradient-to-r from-red-600 to-red-700 text-white text-center py-3 mb-6">
        <h2 className="text-lg font-bold">
          فۆرمی وەرگرتن (دەورانەی ئاكادیمی: زانستی)
        </h2>
      </div>
      <FormContent
        formData={formData}
        handleChange={handleChange}
        handleArrayChange={handleArrayChange}
        isMobile={false}
      />
      <div className="mt-6 pt-4 border-t-2 border-red-500">
        <div className="flex justify-between items-center text-sm gap-2 flex-wrap">
          <span className="font-medium">0772 911 21 21</span>
          <span className="font-medium">0751 911 21 21</span>
          <span className="font-medium text-blue-600">www.kti.edu.iq</span>
          <span className="font-medium text-blue-600">tomar@kti.edu.iq</span>
        </div>
      </div>
    </>
  )
  const PageTwoContent = () => (
    <SecondFormContent
      formData={formData}
      handleChange={handleChange}
      handleArrayChange={handleArrayChange}
      isMobile={false}
    />
  )
  return (
    <div
      className="min-h-screen bg-gradient-to-br from-violet-50 via-fuchsia-50 to-pink-50 p-4 md:p-8 rtl"
      dir="rtl"
    >
      {isGenerating && (
        <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm z-[100] flex items-center justify-center animate-fade-in">
          <div className="bg-white rounded-2xl shadow-2xl p-8 text-center flex flex-col items-center gap-4">
            <svg
              className="animate-spin h-10 w-10 text-red-600"
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
            <p className="text-xl font-bold text-gray-800">
              دروستکردنی پی دی اف...
            </p>
            <p className="text-sm text-gray-600">
              تکایە چاوەڕێ بکە، ئەمە لەوانەیە چرکەیەک بخایەنێت
            </p>
          </div>
        </div>
      )}
      {/* Success/Error Notifications */}
      {showSuccess && (
        <div className="fixed top-4 right-4 max-w-md bg-white border-r-4 border-emerald-500 text-gray-800 px-8 py-5 rounded-2xl shadow-2xl z-50 flex items-center animate-slide-in">
          <div className="bg-emerald-100 rounded-full p-2 ml-4">
            <svg
              className="h-6 w-6 text-emerald-600"
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
          <span className="font-bold text-lg">
            پی دی اف بە سەرکەوتووی دروست کرا!
          </span>
        </div>
      )}
      {showError && (
        <div className="fixed top-4 right-4 max-w-md bg-white border-r-4 border-rose-500 text-gray-800 px-8 py-5 rounded-2xl shadow-2xl z-50 flex items-center animate-slide-in">
          <div className="bg-rose-100 rounded-full p-2 ml-4">
            <svg
              className="h-6 w-6 text-rose-600"
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
            <p className="font-bold text-lg">
              دروستکردنی پی دی اف سەرکەوتوو نەبوو
            </p>
            <p className="text-sm text-gray-600">تکایە دووبارە هەوڵ بدەوە</p>
          </div>
        </div>
      )}
      <div className="max-w-[210mm] mx-auto">
        {/* Visible Form */}
        <div ref={visiblePageRef}>
          <div
            className="bg-white shadow-2xl p-4 sm:p-8 md:p-12 lg:p-[15mm] mb-8"
            style={{ boxSizing: 'border-box' }}
          >
            {currentStep === 1 ? <PageOneContent /> : <PageTwoContent />}
          </div>
        </div>
        {/* Action Buttons */}
        <div className="flex justify-center gap-4 mb-8">
          {currentStep === 2 && (
            <button
              onClick={handlePreviousStep}
              className="bg-gray-500 hover:bg-gray-600 text-white px-10 py-4 rounded-xl font-bold text-lg transition-all"
            >
              گەڕانەوە
            </button>
          )}
          <button
            onClick={handleSubmit}
            disabled={isGenerating}
            className={`${isGenerating ? 'bg-gray-400 cursor-not-allowed' : 'bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800'} text-white px-12 py-5 rounded-2xl font-bold text-xl flex items-center justify-center gap-3 transition-all`}
          >
            {isGenerating
              ? 'دروستکردنی پی دی اف...'
              : currentStep === 1
                ? 'هەنگاوی دواتر'
                : 'دروستکردنی پی دی اف'}
          </button>
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