import React, { useEffect, useState, useRef } from 'react'
import { jsPDF } from 'jspdf'
import { toPng } from 'html-to-image'
import saveAs from 'file-saver'
import { Footer } from './footer'
import { ArrowRight } from 'lucide-react'

// --- TYPE DEFINITIONS ---
type FormData = {
  personalName: string
  birthPlace: string
  address: string
  city: string
  district: string
  cityArea: string
  neighborhood: string
  gender: string
  phone1: string
  phone2: string
  email: string
  educationLevel: string
  graduationYear: string
  department: string
  birthYear: string
  educationSystem: string
  examRound: string
  province: string
  education: string
  district2: string
  studyYear: string
  examTestNumbers: string
  subjects: string[]
  firstGradesNumeric: string[]
  firstGradesWritten: string[]
  secondGradesNumeric: string[]
  secondGradesWritten: string[]
  fatherName: string
  motherName: string
  nationality: string
  idNumber: string
  idIssueDate: string
  deptPref1: string
  deptPref2: string
  deptPref3: string
  deptPref4: string
  deptPref5: string
  deptPref6: string
  schoolName: string
  schoolLocation: string
  certificateNumber: string
  totalGrade: string
  successRate: string
  guardianName: string
  guardianRelation: string
  guardianOccupation: string
  guardianPhone: string
  declaration: boolean
  signatureDate: string
  instituteName: string
  directorName: string
  directorPhone: string
  educationDirectorName: string
  decision: string
  nationality2: string
  nationalityNumber: string
  registrationNumber: string
  issueYearPlace: string
  familyCardNumber: string
  familyCardIssuePlace: string
  familyCardIssueDate: string
  familyCode: string
  departmentChoices: string[]
  certificate1: string
  certificate2: string
  certificate3: string
  certificate4: string
  peshassaziDepartment: string
  website_url: string // Honeypot field
}

interface FormPageOneProps {
  formData: FormData
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleArrayChange: (arrayName: string, index: number, value: string) => void
  errors: { [key: string]: string }
  educationType: 'zansi' | 'wezhay' | 'peshassazi' | 'bazrgani'
}

interface FormPageTwoProps {
  formData: FormData
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleArrayChange: (arrayName: string, index: number, value: string) => void
  handleDepartmentToggle: (departmentName: string) => void
  errors: { [key: string]: string }
  departments: string[]
  formType: 'zansi' | 'wezhay' | 'peshassazi' | 'bazrgani'
}

interface MainFormProps {
  formType: 'zansi' | 'wezhay' | 'peshassazi' | 'bazrgani'
  onBack: () => void
}

// --- FORM PAGE ONE COMPONENT ---
const FormPageOne = ({
  formData,
  handleChange,
  handleArrayChange,
  errors,
  educationType,
}: FormPageOneProps) => {
  const getEducationTypeText = () => {
    switch (educationType) {
      case 'zansi':
        return 'زانستی'
      case 'wezhay':
        return 'وێژەیی'
      case 'peshassazi':
        return 'پیشەسازی'
      case 'bazrgani':
        return 'بازرگانی'
      default:
        return ''
    }
  }

  return (
    <form className="space-y-6">
      <div className="honeypot" aria-hidden="true">
        <label htmlFor="website_url">Website</label>
        <input
          id="website_url"
          name="website_url"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={formData.website_url}
          onChange={handleChange}
        />
      </div>
      {/* Personal Info */}
      <div className="group">
        <div className="modern-section-header flex items-center justify-center px-4">
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
            <span className="font-bold tracking-wider text-lg">
              زانیاری کەسی
            </span>
          </div>
        </div>
        <div className="modern-card-enhanced">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="form-group-modern">
              <label className="modern-label">ناوی چواری فێرخواز</label>
              <input
                type="text"
                name="personalName"
                value={formData.personalName}
                onChange={handleChange}
                className={`modern-input ${errors.personalName ? 'border-red-500' : ''}`}
                placeholder="ناوی چواری"
                maxLength={100}
                autoComplete="name"
              />
              {errors.personalName && (
                <p className="text-red-600 text-xs mt-1">
                  {errors.personalName}
                </p>
              )}
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
              {errors.gender && (
                <p className="text-red-600 text-xs mt-1">{errors.gender}</p>
              )}
            </div>
            <div className="form-group-modern">
              <label className="modern-label">ساڵی لەدایکبوون</label>
              <input
                type="date"
                name="birthYear"
                value={formData.birthYear}
                onChange={handleChange}
                className={`modern-input text-right ${errors.birthYear ? 'border-red-500' : ''}`}
                autoComplete="bday"
              />
              {errors.birthYear && (
                <p className="text-red-600 text-xs mt-1">{errors.birthYear}</p>
              )}
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mt-6">
            <div className="form-group-modern">
              <label className="modern-label">پارێزگا</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className={`modern-input ${errors.address ? 'border-red-500' : ''}`}
                placeholder="پارێزگا"
                maxLength={100}
                autoComplete="off"
              />
              {errors.address && (
                <p className="text-red-600 text-xs mt-1">{errors.address}</p>
              )}
            </div>
            <div className="form-group-modern">
              <label className="modern-label">شار/ناوچە</label>
              <input
                type="text"
                name="cityArea"
                value={formData.cityArea}
                onChange={handleChange}
                className={`modern-input ${errors.cityArea ? 'border-red-500' : ''}`}
                placeholder="شار/ناوچە"
                maxLength={100}
                autoComplete="off"
              />
              {errors.cityArea && (
                <p className="text-red-600 text-xs mt-1">{errors.cityArea}</p>
              )}
            </div>
            <div className="form-group-modern">
              <label className="modern-label">گەڕەک</label>
              <input
                type="text"
                name="neighborhood"
                value={formData.neighborhood}
                onChange={handleChange}
                className={`modern-input ${errors.neighborhood ? 'border-red-500' : ''}`}
                placeholder="گەڕەک"
                maxLength={100}
                autoComplete="off"
              />
              {errors.neighborhood && (
                <p className="text-red-600 text-xs mt-1">
                  {errors.neighborhood}
                </p>
              )}
            </div>
            <div className="form-group-modern">
              <label className="modern-label">کۆڵان</label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className={`modern-input ${errors.city ? 'border-red-500' : ''}`}
                placeholder="کۆڵان"
                maxLength={50}
                autoComplete="off"
              />
              {errors.city && (
                <p className="text-red-600 text-xs mt-1">{errors.city}</p>
              )}
            </div>
            <div className="form-group-modern">
              <label className="modern-label">خانوو</label>
              <input
                type="text"
                name="district"
                value={formData.district}
                onChange={handleChange}
                className={`modern-input ${errors.district ? 'border-red-500' : ''}`}
                placeholder="خانوو"
                maxLength={50}
                autoComplete="off"
              />
              {errors.district && (
                <p className="text-red-600 text-xs mt-1">{errors.district}</p>
              )}
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            <div className="form-group-modern">
              <label className="modern-label">ژ. مۆبایل (١)</label>
              <input
                type="tel"
                name="phone1"
                value={formData.phone1}
                onChange={handleChange}
                className={`modern-input ${errors.phone1 ? 'border-red-500' : ''}`}
                placeholder="07XX XXX XXXX"
                maxLength={11}
                autoComplete="tel"
              />
              {errors.phone1 && (
                <p className="text-red-600 text-xs mt-1">{errors.phone1}</p>
              )}
            </div>
            <div className="form-group-modern">
              <label className="modern-label">ژ. مۆبایل (٢)</label>
              <input
                type="tel"
                name="phone2"
                value={formData.phone2}
                onChange={handleChange}
                className={`modern-input ${errors.phone2 ? 'border-red-500' : ''}`}
                placeholder="07XX XXX XXXX"
                maxLength={11}
                autoComplete="off"
              />
              {errors.phone2 && (
                <p className="text-red-600 text-xs mt-1">{errors.phone2}</p>
              )}
            </div>
            <div className="form-group-modern">
              <label className="modern-label">ئیمەیڵ</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`modern-input ${errors.email ? 'border-red-500' : ''}`}
                placeholder="example@email.com"
                maxLength={100}
                autoComplete="email"
              />
              {errors.email && (
                <p className="text-red-600 text-xs mt-1">{errors.email}</p>
              )}
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
            <div className="form-group-modern">
              <label className="modern-label">ناوی بەخێوکەر</label>
              <input
                type="text"
                name="guardianName"
                value={formData.guardianName || ''}
                onChange={handleChange}
                className={`modern-input ${errors.guardianName ? 'border-red-500' : ''}`}
                placeholder="ناوی بەخێوکەر"
                maxLength={100}
                autoComplete="off"
              />
              {errors.guardianName && (
                <p className="text-red-600 text-xs mt-1">
                  {errors.guardianName}
                </p>
              )}
            </div>
            <div className="form-group-modern">
              <label className="modern-label">پلەی خزمایەتی</label>
              <input
                type="text"
                name="guardianRelation"
                value={formData.guardianRelation || ''}
                onChange={handleChange}
                className={`modern-input ${errors.guardianRelation ? 'border-red-500' : ''}`}
                placeholder="پلەی خزمایەتی"
                maxLength={50}
                autoComplete="off"
              />
              {errors.guardianRelation && (
                <p className="text-red-600 text-xs mt-1">
                  {errors.guardianRelation}
                </p>
              )}
            </div>
            <div className="form-group-modern">
              <label className="modern-label">پیشە</label>
              <input
                type="text"
                name="guardianOccupation"
                value={formData.guardianOccupation || ''}
                onChange={handleChange}
                className={`modern-input ${errors.guardianOccupation ? 'border-red-500' : ''}`}
                placeholder="پیشە"
                maxLength={50}
                autoComplete="off"
              />
              {errors.guardianOccupation && (
                <p className="text-red-600 text-xs mt-1">
                  {errors.guardianOccupation}
                </p>
              )}
            </div>
            <div className="form-group-modern">
              <label className="modern-label">ژ.مۆبایل</label>
              <input
                type="tel"
                name="guardianPhone"
                value={formData.guardianPhone || ''}
                onChange={handleChange}
                className={`modern-input ${errors.guardianPhone ? 'border-red-500' : ''}`}
                placeholder="07XX XXX XXXX"
                maxLength={11}
                autoComplete="off"
              />
              {errors.guardianPhone && (
                <p className="text-red-600 text-xs mt-1">
                  {errors.guardianPhone}
                </p>
              )}
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
            <span className="font-bold tracking-wider text-lg">
              ئاستی خوێندن
            </span>
          </div>
        </div>
        <div className="modern-card-enhanced">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="form-group-modern">
              <label className="modern-label">دەرچووی دوانزەی ئامادەیی</label>
              <div className="modern-badge">{getEducationTypeText()}</div>
            </div>
            <div className="form-group-modern">
              <label className="modern-label">ساڵی دەرچوون</label>
              <input
                type="date"
                name="graduationYear"
                value={formData.graduationYear}
                onChange={handleChange}
                className={`modern-input text-right ${errors.graduationYear ? 'border-red-500' : ''}`}
                autoComplete="off"
              />
              {errors.graduationYear && (
                <p className="text-red-600 text-xs mt-1">
                  {errors.graduationYear}
                </p>
              )}
            </div>
            <div className="form-group-modern">
              <label className="modern-label">جۆری سیستەم</label>
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
                  <span>سویدی</span>
                </label>
              </div>
              {errors.educationSystem && (
                <p className="text-red-600 text-xs mt-1">
                  {errors.educationSystem}
                </p>
              )}
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div className="form-group-modern">
              <label className="modern-label">خولی</label>
              <div className="flex gap-4 mt-2">
                <label className="modern-radio-label">
                  <input
                    type="radio"
                    name="examRound"
                    value="first"
                    checked={formData.examRound === 'first'}
                    onChange={handleChange}
                    className="modern-radio"
                  />
                  <span>یەکەم</span>
                </label>
                <label className="modern-radio-label">
                  <input
                    type="radio"
                    name="examRound"
                    value="second"
                    checked={formData.examRound === 'second'}
                    onChange={handleChange}
                    className="modern-radio"
                  />
                  <span>دووەم</span>
                </label>
              </div>
              {errors.examRound && (
                <p className="text-red-600 text-xs mt-1">
                  {errors.examRound}
                </p>
              )}
            </div>
            <div className="form-group-modern">
              <label className="modern-label">ژمارەی تاقیکردنەوە</label>
              <input
                type="text"
                name="examTestNumbers"
                value={formData.examTestNumbers}
                onChange={handleChange}
                className={`modern-input ${errors.examTestNumbers ? 'border-red-500' : ''}`}
                placeholder="٠١٢٣٤٥٦٧٨٩٠١٢"
                maxLength={13}
                inputMode="numeric"
                autoComplete="off"
              />
              {errors.examTestNumbers && (
                <p className="text-red-600 text-xs mt-1">
                  {errors.examTestNumbers}
                </p>
              )}
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
              زانیاری سەبارەت بە نمرەی فێرخواز
            </span>
          </div>
        </div>
        <div className="modern-card-enhanced">
          <div className="bg-white rounded-xl border-2 border-yellow-300 p-6 shadow-md mb-6">
            <div className="flex items-start gap-3">
              <svg
                className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-0.5"
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
                بەڕێوەبەری بەڕێز: هەر کەم و کورتییەک لە پڕکردنەوەی ئەم بەشەدا
                هەبێت، ئێمە لێی بەرپرس نین.
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
                className={`modern-input ${errors.province ? 'border-red-500' : ''}`}
                placeholder="پارێزگا"
                maxLength={100}
                autoComplete="off"
              />
              {errors.province && (
                <p className="text-red-600 text-xs mt-1">{errors.province}</p>
              )}
            </div>
            <div className="form-group-modern">
              <label className="modern-label">پەروەردە</label>
              <input
                type="text"
                name="education"
                value={formData.education}
                onChange={handleChange}
                className={`modern-input ${errors.education ? 'border-red-500' : ''}`}
                placeholder="پەروەردە"
                maxLength={100}
                autoComplete="off"
              />
              {errors.education && (
                <p className="text-red-600 text-xs mt-1">
                  {errors.education}
                </p>
              )}
            </div>
            <div className="form-group-modern">
              <label className="modern-label">گەڕەک</label>
              <input
                type="text"
                name="district2"
                value={formData.district2}
                onChange={handleChange}
                className={`modern-input ${errors.district2 ? 'border-red-500' : ''}`}
                placeholder="گەڕەک"
                maxLength={100}
                autoComplete="off"
              />
              {errors.district2 && (
                <p className="text-red-600 text-xs mt-1">{errors.district2}</p>
              )}
            </div>
            <div className="form-group-modern">
              <label className="modern-label">ساڵی خوێندن</label>
              <input
                type="date"
                name="studyYear"
                value={formData.studyYear}
                onChange={handleChange}
                className={`modern-input text-right ${errors.studyYear ? 'border-red-500' : ''}`}
                autoComplete="off"
              />
              {errors.studyYear && (
                <p className="text-red-600 text-xs mt-1">{errors.studyYear}</p>
              )}
            </div>
          </div>
          {educationType === 'peshassazi' && (
            <div className="mt-6">
              <div className="flex items-center gap-4 rounded-xl border-2 border-gray-200 p-4 bg-gray-50/50">
                <label className="modern-label mb-0 flex-shrink-0 text-base">
                  ئامادەی پیشەسازی
                </label>
                <div className="flex-grow flex items-center gap-2">
                  <label className="modern-label mb-0">بەشی</label>
                  <input
                    type="text"
                    name="peshassaziDepartment"
                    value={formData.peshassaziDepartment || ''}
                    onChange={handleChange}
                    className={`modern-input ${errors.peshassaziDepartment ? 'border-red-500' : ''}`}
                    placeholder="بەشی پیشەسازی"
                    maxLength={100}
                    autoComplete="off"
                  />
                </div>
              </div>
              {errors.peshassaziDepartment && (
                <p className="text-red-600 text-xs mt-1">
                  {errors.peshassaziDepartment}
                </p>
              )}
            </div>
          )}
          <div className="modern-table-container mt-6">
            <div className="grid grid-cols-3 md:grid-cols-10 gap-2 pt-4">
              {formData.subjects.map((subject, i) => {
                const isHeaderCell = i === 0 || i === 8 || i === 9
                const placeholderText = i > 0 && i < 8 ? `وانە ${i}` : ''

                if (isHeaderCell) {
                  return (
                    <div
                      key={i}
                      className="modern-table-label bg-gradient-to-br from-blue-600 to-blue-700 flex h-full items-center justify-center text-white"
                    >
                      {subject}
                    </div>
                  )
                }

                return (
                  <input
                    key={i}
                    type="text"
                    value={subject}
                    onChange={(e) =>
                      handleArrayChange('subjects', i, e.target.value)
                    }
                    readOnly={false}
                    className="modern-table-cell"
                    placeholder={placeholderText}
                    maxLength={50}
                    autoComplete="off"
                  />
                )
              })}
            </div>
            <div className="grid grid-cols-4 md:grid-cols-11 gap-2 pt-4">
              <div className="modern-table-label bg-gradient-to-br from-blue-600 to-blue-700 text-white">
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
                  className="modern-table-cell"
                  placeholder="نمرە"
                  maxLength={10}
                  autoComplete="off"
                />
              ))}
            </div>
            <div className="grid grid-cols-4 md:grid-cols-11 gap-2 pt-4">
              <div className="modern-table-label bg-gradient-to-br from-blue-600 to-blue-700 text-white">
                بە نووسین
              </div>
              {formData.firstGradesWritten.map((grade, i) => (
                <input
                  key={i}
                  type="text"
                  value={grade}
                  onChange={(e) =>
                    handleArrayChange('firstGradesWritten', i, e.target.value)
                  }
                  className="modern-table-cell"
                  placeholder="نمرە"
                  maxLength={50}
                  autoComplete="off"
                />
              ))}
            </div>
            <div className="grid grid-cols-4 md:grid-cols-11 gap-2 pt-4">
              <div className="modern-table-label bg-gradient-to-br from-blue-600 to-blue-700 text-white">
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
                  className="modern-table-cell"
                  placeholder="نمرە"
                  maxLength={10}
                  autoComplete="off"
                />
              ))}
            </div>
            <div className="grid grid-cols-4 md:grid-cols-11 gap-2 pt-4">
              <div className="modern-table-label bg-gradient-to-br from-blue-600 to-blue-700 text-white">
                بە نووسین
              </div>
              {formData.secondGradesWritten.map((grade, i) => (
                <input
                  key={i}
                  type="text"
                  value={grade}
                  onChange={(e) =>
                    handleArrayChange('secondGradesWritten', i, e.target.value)
                  }
                  className="modern-table-cell"
                  placeholder="نمرە"
                  maxLength={50}
                  autoComplete="off"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </form>
  )
}

// --- FORM PAGE TWO COMPONENT ---
const FormPageTwo = ({
  formData,
  handleChange,
  handleDepartmentToggle,
  errors,
  departments,
  formType,
}: FormPageTwoProps) => (
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
              خانەی تایبەت بە بەڕێوەبەری خوێندنگە
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
                className={`modern-input ${errors.instituteName ? 'border-red-500' : ''}`}
                placeholder="ناوی خوێندنگە"
                maxLength={100}
                autoComplete="off"
              />
              {errors.instituteName && (
                <p className="text-red-600 text-xs mt-1">
                  {errors.instituteName}
                </p>
              )}
            </div>
            <div className="form-group-modern">
              <label className="modern-label">ناوی بەڕێوەبەر</label>
              <input
                type="text"
                name="directorName"
                value={formData.directorName || ''}
                onChange={handleChange}
                className={`modern-input ${errors.directorName ? 'border-red-500' : ''}`}
                placeholder="ناوی بەڕێوەبەر"
                maxLength={100}
                autoComplete="off"
              />
              {errors.directorName && (
                <p className="text-red-600 text-xs mt-1">
                  {errors.directorName}
                </p>
              )}
            </div>
            <div className="form-group-modern">
              <label className="modern-label">ژ. تەلەفۆن</label>
              <input
                type="tel"
                name="directorPhone"
                value={formData.directorPhone || ''}
                onChange={handleChange}
                className={`modern-input ${errors.directorPhone ? 'border-red-500' : ''}`}
                placeholder="07XX XXX XXXX"
                maxLength={11}
                autoComplete="off"
              />
              {errors.directorPhone && (
                <p className="text-red-600 text-xs mt-1">
                  {errors.directorPhone}
                </p>
              )}
            </div>
            <div className="form-group-modern">
              <label className="modern-label text-center">
                واژۆ و ڕێکەوت و مۆر
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
              پەسەندکردن و پشتڕاستکردنەوەی نمرەکان
            </span>
          </div>
        </div>
        <div className="modern-card-enhanced">
          <div className="space-y-5">
            <div className="text-center">
              <p className="modern-label font-bold">
                لە بەڕێوەبەرێتی پەروەردەی ڕۆژئاوا / ڕۆژهەڵات
              </p>
            </div>
            <div className="form-group-modern">
              <label className="modern-label">ناوی بەڕێوەبەرێتی</label>
              <input
                type="text"
                name="educationDirectorName"
                value={formData.educationDirectorName || ''}
                onChange={handleChange}
                className={`modern-input ${errors.educationDirectorName ? 'border-red-500' : ''}`}
                placeholder="ناوی بەڕێوەبەرێتی"
                maxLength={100}
                autoComplete="off"
              />
              {errors.educationDirectorName && (
                <p className="text-red-600 text-xs mt-1">
                  {errors.educationDirectorName}
                </p>
              )}
            </div>
            <div className="form-group-modern">
              <label className="modern-label">قەزا</label>
              <input
                type="text"
                name="decision"
                value={formData.decision || ''}
                onChange={handleChange}
                className={`modern-input ${errors.decision ? 'border-red-500' : ''}`}
                placeholder="قەزا..."
                maxLength={100}
                autoComplete="off"
              />
              {errors.decision && (
                <p className="text-red-600 text-xs mt-1">{errors.decision}</p>
              )}
            </div>
            <div className="form-group-modern">
              <label className="modern-label text-center">واژۆ و مۆر</label>
              <div className="modern-signature-box"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    {/* Department Selection */}
    <div id="department-selection-section" className="group">
      <div className="modern-section-header bg-gradient-to-r from-blue-600 to-blue-700">
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
            بەشەکانی پەیمانگە
          </span>
        </div>
      </div>
      <div
        className={`modern-card-enhanced ${errors.departmentChoices ? 'border-red-500' : ''}`}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {departments.map((dept, i) => {
            const selectionIndex = formData.departmentChoices.indexOf(dept)
            const isSelected = selectionIndex !== -1
            return (
              <div
                key={i}
                onClick={() => handleDepartmentToggle(dept)}
                className={`flex items-center gap-3 cursor-pointer px-4 py-4 bg-white/80 backdrop-blur-sm border-2 rounded-xl transition-all duration-300 hover:border-blue-300 hover:shadow-lg hover:scale-[1.02] ${isSelected ? 'bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-400 shadow-lg scale-[1.02]' : 'border-gray-200'}`}
                role="checkbox"
                aria-checked={isSelected}
                tabIndex={0}
              >
                <div
                  className={`w-6 h-6 border-2 rounded-md flex-shrink-0 flex items-center justify-center font-bold text-blue-600 text-sm transition-all duration-300 ${isSelected ? 'border-blue-500 bg-blue-100' : 'border-gray-300 bg-white'}`}
                >
                  {isSelected && <span>{selectionIndex + 1}</span>}
                </div>
                <span className="font-medium select-none">{dept}</span>
              </div>
            )
          })}
        </div>
        {errors.departmentChoices && (
          <p className="text-red-600 text-xs mt-2 text-center">
            {errors.departmentChoices}
          </p>
        )}
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
      <div className="modern-card-enhanced bg-white">
        <div className="flex items-start gap-3">
          <svg
            className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5"
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
            {formType === 'bazrgani'
              ? 'دەرچووی پیشەیی(بازرگانی) دەتوانن بەشی(کارگێڕی کار،ژمێریاری،دیجیتاڵ میدیا و مارکێتینگ) پڕبکەنەوە،دواتر بەپێی داواکاری بەشەکەو ڕێژەی دەرچوونی فێرخواز و مەرجەکانی وەزارەتی خوێندنی باڵا،وەردەگیرێت.'
              : formType === 'peshassazi'
              ? 'دەرچووی پیشەیی(پیشەسازی):- بەشەکانی(تەکنەلۆجیای زانیاری،چاکردنەوەی کۆمپیوتەر) دەتوانن لە بەشی(تەکنەلۆژیای زانیاری،تەکنەلۆژیای ڕۆبۆتینگ و ئۆتۆمەیشن)بخوێنن. بەشەکانی(وێنەی ئەندازەی) دەتوانن لە بەشی (ئەندازیاری دیکۆر) بخوێنن. پێی خواستی خۆت و گونجاندنی بەشەکەت، هەڵبژاردنەکەت پڕبکەوە، بەڵام بە پێی داواکاری بەشەکە و کۆنمرەی فێرخواز و مەرجەکانی وەزارەتی خوێندنی باڵا و توێژینەوەی زانستی وەردەگیرێت.'
              : 'بە پێی ڕێنمایی و مەرجەکانی وەرگرتن، ژمارە (١٩٣٥٠) لە ڕێکەوتی (١٤\/١٠\/٢٠٢٥) بۆ ساڵی خوێندنی(٢٠٢٥ - ٢٠٢٦) بڕگەی یەکەم خاڵی (٧)، دەتوانیت (٣) هەڵبژاردن پڕبکەیتەوە، بەڵام بە گشتی هەڵبژاردنی یەکەم پێوەری سەرەکی وەرگرتنە و دوو هەڵبژاردنەکەی دیکە لە ئەگەری هەبوونی کورسی بەتاڵ لەو بەشانە و بە پێی داواکاری بەشەکە و کۆنمرەی فێرخواز و مەرجەکانی وەزارەتی خوێندنی باڵا، وەردەگیرێت.'}
          </p>
        </div>
      </div>
    </div>
    {/* Certificate Section */}
    <div className="group">
      <div className="modern-section-header bg-gradient-to-r from-blue-600 to-blue-700">
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
            ناسنامەی باری شارستانی
          </span>
        </div>
      </div>
      <div className="modern-card-enhanced">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="form-group-modern">
            <label className="modern-label">ژمارەی ناسنامە</label>
            <input
              type="text"
              name="certificate1"
              value={formData.certificate1 || ''}
              onChange={handleChange}
              className={`modern-input ${errors.certificate1 ? 'border-red-500' : ''}`}
              placeholder="..."
              maxLength={50}
              autoComplete="off"
            />
            {errors.certificate1 && (
              <p className="text-red-600 text-xs mt-1">
                {errors.certificate1}
              </p>
            )}
          </div>
          <div className="form-group-modern">
            <label className="modern-label">ژمارەی تۆمار</label>
            <input
              type="text"
              name="certificate2"
              value={formData.certificate2 || ''}
              onChange={handleChange}
              className={`modern-input ${errors.certificate2 ? 'border-red-500' : ''}`}
              placeholder="..."
              maxLength={50}
              autoComplete="off"
            />
            {errors.certificate2 && (
              <p className="text-red-600 text-xs mt-1">
                {errors.certificate2}
              </p>
            )}
          </div>
          <div className="form-group-modern">
            <label className="modern-label">ژمارەی لاپەڕە</label>
            <input
              type="text"
              name="certificate3"
              value={formData.certificate3 || ''}
              onChange={handleChange}
              className={`modern-input ${errors.certificate3 ? 'border-red-500' : ''}`}
              placeholder="..."
              maxLength={50}
              autoComplete="off"
            />
            {errors.certificate3 && (
              <p className="text-red-600 text-xs mt-1">
                {errors.certificate3}
              </p>
            )}
          </div>
          <div className="form-group-modern">
            <label className="modern-label">شوێنی دەرچوون</label>
            <input
              type="text"
              name="certificate4"
              value={formData.certificate4 || ''}
              onChange={handleChange}
              className={`modern-input ${errors.certificate4 ? 'border-red-500' : ''}`}
              placeholder="..."
              maxLength={100}
              autoComplete="off"
            />
            {errors.certificate4 && (
              <p className="text-red-600 text-xs mt-1">
                {errors.certificate4}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
    {/* Nationality Section */}
    <div className="group">
      <div className="modern-section-header bg-gradient-to-r from-blue-600 to-blue-700">
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
                d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002 2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2"
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
        {errors.nationality2 && (
          <p className="text-red-600 text-xs -mt-4 mb-4">
            {errors.nationality2}
          </p>
        )}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="form-group-modern">
            <label className="modern-label">ژمارەی ڕەگەزنامە</label>
            <input
              type="text"
              name="nationalityNumber"
              value={formData.nationalityNumber || ''}
              onChange={handleChange}
              className={`modern-input ${errors.nationalityNumber ? 'border-red-500' : ''}`}
              placeholder="ژمارەی ڕەگەزنامە"
              maxLength={50}
              autoComplete="off"
            />
            {errors.nationalityNumber && (
              <p className="text-red-600 text-xs mt-1">
                {errors.nationalityNumber}
              </p>
            )}
          </div>
          <div className="form-group-modern">
            <label className="modern-label">ژمارەی تۆمار</label>
            <input
              type="text"
              name="registrationNumber"
              value={formData.registrationNumber || ''}
              onChange={handleChange}
              className={`modern-input ${errors.registrationNumber ? 'border-red-500' : ''}`}
              placeholder="ژمارەی تۆمار"
              maxLength={50}
              autoComplete="off"
            />
            {errors.registrationNumber && (
              <p className="text-red-600 text-xs mt-1">
                {errors.registrationNumber}
              </p>
            )}
          </div>
          <div className="form-group-modern">
            <label className="modern-label">ساڵ و شوێنی دەرچوون</label>
            <input
              type="text"
              name="issueYearPlace"
              value={formData.issueYearPlace || ''}
              onChange={handleChange}
              className={`modern-input ${errors.issueYearPlace ? 'border-red-500' : ''}`}
              placeholder="ساڵ و شوێن..."
              maxLength={100}
              autoComplete="off"
            />
            {errors.issueYearPlace && (
              <p className="text-red-600 text-xs mt-1">
                {errors.issueYearPlace}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
    {/* Family Card Section */}
    <div className="group">
      <div className="modern-section-header bg-gradient-to-r from-blue-600 to-blue-700">
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
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656-.126-1.283-.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
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
              className={`modern-input ${errors.familyCardNumber ? 'border-red-500' : ''}`}
              placeholder="ژمارەی کارت"
              maxLength={50}
              autoComplete="off"
            />
            {errors.familyCardNumber && (
              <p className="text-red-600 text-xs mt-1">
                {errors.familyCardNumber}
              </p>
            )}
          </div>
          <div className="form-group-modern">
            <label className="modern-label">شوێنی دەرچوون</label>
            <input
              type="text"
              name="familyCardIssuePlace"
              value={formData.familyCardIssuePlace || ''}
              onChange={handleChange}
              className={`modern-input ${errors.familyCardIssuePlace ? 'border-red-500' : ''}`}
              placeholder="شوێنی دەرچوون"
              maxLength={100}
              autoComplete="off"
            />
            {errors.familyCardIssuePlace && (
              <p className="text-red-600 text-xs mt-1">
                {errors.familyCardIssuePlace}
              </p>
            )}
          </div>
          <div className="form-group-modern">
            <label className="modern-label">ڕێکەوتی دەرچوون</label>
            <input
              type="date"
              name="familyCardIssueDate"
              value={formData.familyCardIssueDate || ''}
              onChange={handleChange}
              className={`modern-input text-right ${errors.familyCardIssueDate ? 'border-red-500' : ''}`}
              autoComplete="off"
            />
            {errors.familyCardIssueDate && (
              <p className="text-red-600 text-xs mt-1">
                {errors.familyCardIssueDate}
              </p>
            )}
          </div>
          <div className="form-group-modern">
            <label className="modern-label">کۆدی خێزانی</label>
            <input
              type="text"
              name="familyCode"
              value={formData.familyCode || ''}
              onChange={handleChange}
              className={`modern-input ${errors.familyCode ? 'border-red-500' : ''}`}
              placeholder="کۆدی خێزانی"
              maxLength={50}
              autoComplete="off"
            />
            {errors.familyCode && (
              <p className="text-red-600 text-xs mt-1">{errors.familyCode}</p>
            )}
          </div>
        </div>
      </div>
    </div>
    {/* Bottom Signature Section */}
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      <div className="modern-card-enhanced">
        <label className="modern-label text-center block mb-4">
          ناوی سیانی فێرخواز
        </label>
        <div className="modern-signature-line"></div>
      </div>
      <div className="modern-card-enhanced">
        <label className="modern-label text-center block mb-4">
          ڕێکەوت / واژۆ
        </label>
        <div className="modern-signature-line"></div>
      </div>
    </div>
  </form>
)

// --- CONSTANTS AND CONFIGURATION ---
const LOGO_DATA_URL = 'https://kti.edu.iq/photo/kti_52_0.png'

const zansiDepartments = [
  'دەرمانسازی',
  'پەرستاری',
  'شیکردنەوەی نەخۆشییەکان',
  'جوانکاری پزیشکی (پەرستاری)',
  'سڕکردن',
  'یاریدەدەری پزیشکی ددان',
  'کارگێڕی کار',
  'ژمێریاری',
  'دیجیتاڵ میدیا و مارکێتینگ',
  'تەکنەلۆژیای ڕۆبۆتینگ و ئۆتۆمەیشن',
  'تەکنەلۆژیای زانیاری',
  'ئەندازیاری دیکۆر',
]
const wezhayDepartments = ['کارگێڕی کار', 'دیجیتاڵ میدیا و مارکێتینگ']

const peshassaziDepartments = [
  'تەکنەلۆجیای زانیاری',
  'تەکنەلۆژیای ڕۆبۆتینگ و ئۆتۆمەیشن',
  'ئەندازیاری دیکۆر',
]

const bazrganiDepartments = [
  'کارگێڕی کار',
  'ژمێریاری',
  'دیجیتاڵ میدیا و مارکێتینگ',
]

// --- MAIN REGISTRATION FORM COMPONENT ---
export function MainForm({ formType, onBack }: MainFormProps) {
  let departments: string[]
  let pdfThemeClass: string

  switch (formType) {
    case 'wezhay':
      departments = wezhayDepartments
      pdfThemeClass = 'wezhay-pdf-theme'
      break
    case 'peshassazi':
      departments = peshassaziDepartments
      pdfThemeClass = 'peshassazi-pdf-theme'
      break
    case 'bazrgani':
      departments = bazrganiDepartments
      pdfThemeClass = 'bazrgani-pdf-theme'
      break
    case 'zansi':
    default:
      departments = zansiDepartments
      pdfThemeClass = '' // Default red theme
      break
  }

  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<FormData>({
    personalName: '',
    birthPlace: '',
    address: '',
    city: '',
    district: '',
    cityArea: '',
    neighborhood: '',
    gender: '',
    phone1: '',
    phone2: '',
    email: '',
    educationLevel: '',
    graduationYear: '',
    department: '',
    birthYear: '',
    educationSystem: '',
    examRound: '',
    province: '',
    education: '',
    district2: '',
    studyYear: '',
    examTestNumbers: '',
    subjects: [
      'وانەکان',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      'کۆنمرەی پۆلی ١٢',
      'ڕێژەی دەرچوون',
    ],
    firstGradesNumeric: Array(10).fill(''),
    firstGradesWritten: Array(10).fill(''),
    secondGradesNumeric: Array(10).fill(''),
    secondGradesWritten: Array(10).fill(''),
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
    guardianOccupation: '',
    guardianPhone: '',
    declaration: false,
    signatureDate: '',
    instituteName: '',
    directorName: '',
    directorPhone: '',
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
    departmentChoices: [],
    certificate1: '',
    certificate2: '',
    certificate3: '',
    certificate4: '',
    peshassaziDepartment: '',
    website_url: '', // Honeypot field
  })
  const [isGenerating, setIsGenerating] = useState(false)
  const [isCoolingDown, setIsCoolingDown] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [showError, setShowError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [errors, setErrors] = useState<{ [key: string]: string }>({})
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    let sanitizedValue: string | boolean = value

    if (type === 'text' || type === 'email' || type === 'date' || type === 'tel') {
      sanitizedValue = value.replace(/</g, '&lt;').replace(/>/g, '&gt;')
    }
    if (
      name === 'examTestNumbers' ||
      name.includes('phone') ||
      name.includes('Phone')
    ) {
      sanitizedValue = value.replace(/\D/g, '')
    }
    if (name === 'examTestNumbers') {
      sanitizedValue = (sanitizedValue as string).slice(0, 13)
    }

    setFormData((prevState) => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : sanitizedValue,
    }))

    if (errors[name]) {
      setErrors((prevErrors) => {
        const newErrors = { ...prevErrors }
        delete newErrors[name]
        return newErrors
      })
    }
  }
  const handleArrayChange = (
    arrayName: keyof FormData,
    index: number,
    value: string,
  ) => {
    setFormData((prevState) => {
      const newArray = [...(prevState[arrayName] as string[])]
      newArray[index] = value.replace(/</g, '&lt;').replace(/>/g, '&gt;')
      return {
        ...prevState,
        [arrayName]: newArray,
      }
    })
  }
  const handleDepartmentToggle = (departmentName: string) => {
    setFormData((prev) => {
      const maxChoices = formType === 'wezhay' ? 2 : 3
      const selections = [...prev.departmentChoices]
      const existingIndex = selections.indexOf(departmentName)
      if (existingIndex > -1) {
        selections.splice(existingIndex, 1)
      } else if (selections.length < maxChoices) {
        selections.push(departmentName)
      }
      return { ...prev, departmentChoices: selections }
    })
    if (errors.departmentChoices) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors.departmentChoices
        return newErrors
      })
    }
  }

  const handleNextStep = () => {
    setCurrentStep(2)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handlePreviousStep = () => {
    setCurrentStep(1)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const phoneRegex = /^(075|077|078)\d{8}$/

  const validateStep1 = () => {
    const newErrors: { [key: string]: string } = {}
    if (!formData.personalName.trim() || formData.personalName.length < 3) {
      newErrors.personalName = 'تکایە ناوێکی دروست بنووسە'
    }
    if (!formData.phone1.trim()) {
      newErrors.phone1 = 'تکایە ژمارەی مۆبایل بنووسە'
    } else if (!phoneRegex.test(formData.phone1)) {
      newErrors.phone1 = 'ژمارەی مۆبایلی (١) هەڵەیە'
    }
    return newErrors
  }

  const validateStep2 = () => {
    const newErrors: { [key: string]: string } = {}
    // All fields on step 2 are optional
    return newErrors
  }

  const handleValidationErrors = (errors: { [key: string]: string }) => {
    setShowError(true)
    setErrorMessage('تکایە هەموو خانە داواکراوەکان بە دروستی پڕبکەرەوە.')
    const firstErrorField = Object.keys(errors)[0]
    if (!firstErrorField) return

    const element = document.querySelector<HTMLElement>(
      `[name="${firstErrorField}"]`,
    )
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' })
      element.focus()
    } else if (firstErrorField === 'departmentChoices') {
      const departmentSection = document.getElementById(
        'department-selection-section',
      )
      departmentSection?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }

  const generatePDF = async () => {
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
        pixelRatio: 2,
        backgroundColor: '#ffffff',
        cacheBust: true,
        style: { transform: 'scale(1)', transformOrigin: 'top left' },
      }

      if (!pageOnePrintRef.current || !pageTwoPrintRef.current) {
        throw new Error('PDF template reference not found')
      }
      
      await new Promise<void>((resolve) => setTimeout(() => resolve(), 500)) 
      const firstPageDataUrl = await toPng(pageOnePrintRef.current, toPngOptions)
      pdf.addImage(firstPageDataUrl, 'PNG', 0, 0, pageWidth, pageHeight, undefined, 'FAST')

      await new Promise<void>((resolve) => setTimeout(() => resolve(), 500)) 
      const secondPageDataUrl = await toPng(pageTwoPrintRef.current, toPngOptions)
      pdf.addPage()
      pdf.addImage(secondPageDataUrl, 'PNG', 0, 0, pageWidth, pageHeight, undefined, 'FAST')

      const pdfBlob = pdf.output('blob')
      saveAs(pdfBlob, 'Kurdistan_Technical_Institute_Form.pdf')
    } catch (error) {
      console.error('PDF generation failed:', error)
      throw new Error('دروستکردنی پی دی ئێف سەرکەوتوو نەبوو. تکایە دووبارە هەوڵ بدەوە.')
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault()

    if (formData.website_url) {
      console.warn('Honeypot field filled. Submission blocked.')
      setShowSuccess(true)
      setSuccessMessage('فۆڕمەکەت بە سەرکەوتوویی نێردرا!')
      return
    }

    if (currentStep === 1) {
      const validationErrors = validateStep1()
      setErrors(validationErrors)
      if (Object.keys(validationErrors).length > 0) {
        handleValidationErrors(validationErrors)
      } else {
        handleNextStep()
      }
      return
    }

    setIsGenerating(true)
    const validationErrors = { ...validateStep1(), ...validateStep2() }
    setErrors(validationErrors)

    if (Object.keys(validationErrors).length > 0) {
      handleValidationErrors(validationErrors)
      setIsGenerating(false)
      return
    }

    setShowError(false)
    setShowSuccess(false)

    try {
      const API_ENDPOINT = '/api/secure_student_insert.php'

      const response = await fetch(API_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-API-KEY': 'MY_PUBLIC_FORM_KEY_123',
        },
        body: JSON.stringify({
          personalName: formData.personalName,
          phone: formData.phone1,
        }),
      })

      if (!response.ok) {
        throw new Error('هەڵەیەک لە ناردنی فۆڕمەکە ڕوویدا. تکایە دواتر هەوڵبدەوە.')
      }

      const result = await response.json()

      if (!result.success) {
        throw new Error(result.error || result.message || 'سێرڤەر هەڵەیەکی گەڕاندەوە. تکایە دڵنیابەرەوە لە زانیارییەکانت.')
      }

      setSuccessMessage('زانیارییەکان بە سەرکەوتوویی نێردرا! ئامادەکاری بۆ داگرتنی PDF.')
      setShowSuccess(true)

      await generatePDF()
    } catch (error) {
      console.error('Submission or PDF generation failed:', error)
      setErrorMessage('هەڵەیەکی چاوەڕواننەکراو ڕوویدا. تکایە دووبارە هەوڵ بدەوە.')
      setShowError(true)
    } finally {
      setIsGenerating(false)
      setIsCoolingDown(true)
      setTimeout(() => setIsCoolingDown(false), 5000)
    }
  }

  return (
    <div
      className="min-h-screen bg-white rtl relative overflow-hidden font-sans"
      dir="rtl"
    >
      {showSuccess && (
        <div
          role="alert"
          className="fixed bottom-4 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] sm:w-auto max-w-lg bg-white border-r-4 border-emerald-500 text-gray-800 px-4 sm:px-8 py-3 sm:py-5 rounded-2xl shadow-2xl z-50 flex items-center animate-fade-in-up backdrop-blur-sm transition-none"
        >
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
            {successMessage}
          </span>
        </div>
      )}
      {showError && (
        <div
          role="alert"
          className="fixed bottom-4 left-1/2 -translate-x-1/2 w-[calc(100