
import React, { useEffect, useState, useRef } from 'react'
import { jsPDF } from 'jspdf'
import { toPng } from 'html-to-image'
import saveAs from 'file-saver'
import { Footer } from './footer'
import { ArrowRight } from 'lucide-react'

// --- SECURITY UTILITIES ---
const isSuspicious = (value: string): boolean => {
  if (typeof value !== 'string' || !value) return false

  // Common XSS patterns
  const xssPatterns = [
    /<script/i,
    /onerror\s*=/i,
    /onload\s*=/i,
    /javascript:/i,
    /src\s*=\s*['"]?\s*javascript:/i,
    /<svg\/onload/i,
    /<\s*img\s*src\s*=\s*['"]?x['"]?\s*onerror/i,
    /<\s*iframe/i,
    /onmouseover\s*=/i,
  ]

  // Common SQL injection patterns
  const sqlPatterns = [
    /(\s|\+)+(select|union|insert|update|delete|drop|alter|--|;)\s/i,
    /('|"|\s)(or|and)(\s|\+)+(\w+)\s*=\s*(\w+)/i, // e.g. ' or 1=1
    /(\s|\+)+like(\s|\+)+/i,
    /(\s|\+)+limit(\s|\+)+/i,
  ]

  const allPatterns = [...xssPatterns, ...sqlPatterns]

  return allPatterns.some((pattern) => pattern.test(value))
}

const sanitizeInput = (value: string): string => {
  if (typeof value !== 'string') return value
  return value.replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

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

  const API_ENDPOINT = '/api/submit'
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
  const [isBlocked, setIsBlocked] = useState(false)
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

    if (isSuspicious(value)) {
      console.error('Malicious activity detected. Blocking user.', {
        field: name,
        value,
      })
      setIsBlocked(true)
      return
    }

    let sanitizedValue: string | boolean = value

    if (
      type === 'text' ||
      type === 'email' ||
      type === 'date' ||
      type === 'tel'
    ) {
      sanitizedValue = sanitizeInput(value)
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
    if (isSuspicious(value)) {
      console.error('Malicious activity detected. Blocking user.', {
        field: `${arrayName}[${index}]`,
        value,
      })
      setIsBlocked(true)
      return
    }

    setFormData((prevState) => {
      const newArray = [...(prevState[arrayName] as string[])]
      newArray[index] = sanitizeInput(value)
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
        let serverError = 'هەڵەیەک لە ناردنی فۆڕمەکە ڕوویدا.'
        try {
          const errorResult = await response.json()
          serverError =
            errorResult.message ||
            errorResult.error ||
            `${serverError} (Status: ${response.status})`
        } catch (e) {
          serverError = `${serverError} (Status: ${response.status})`
        }
        throw new Error(serverError)
      }

      const result = await response.json()

      if (!result.success) {
        throw new Error(
          result.message ||
            result.error ||
            'سێرڤەر هەڵەیەکی گەڕاندەوە. تکایە دڵنیابەرەوە لە زانیارییەکانت.',
        )
      }

      setSuccessMessage(
        'زانیارییەکان بە سەرکەوتوویی نێردرا! ئامادەکاری بۆ داگرتنی PDF.',
      )
      setShowSuccess(true)

      await generatePDF()
    } catch (error) {
      console.error('Submission or PDF generation failed:', error)
      if (error instanceof TypeError && error.message.includes('Failed to fetch')) {
        setErrorMessage(
          'پەیوەندی کردن بە سێرڤەرەوە سەرکەوتوو نەبوو. تکایە لە هێڵی ئینتەرنێت دڵنیابەرەوە.',
        )
      } else if (error instanceof Error) {
        setErrorMessage(error.message)
      } else {
        setErrorMessage(
          'هەڵەیەکی چاوەڕواننەکراو ڕوویدا. تکایە دووبارە هەوڵ بدەوە.',
        )
      }
      setShowError(true)
    } finally {
      setIsGenerating(false)
      setIsCoolingDown(true)
      setTimeout(() => setIsCoolingDown(false), 5000)
    }
  }

  if (isBlocked) {
    return (
      <div
        className="min-h-screen bg-gray-100 flex items-center justify-center text-center p-4"
        dir="rtl"
      >
        <div className="bg-white p-10 rounded-2xl shadow-2xl">
          <h2 className="text-2xl font-bold text-red-600 mb-4">
            ڕێگەپێدان ڕەتکرایەوە
          </h2>
          <p className="text-gray-700">
            چالاکی گوماناوی دۆزرایەوە. لەبەر هۆکاری ئاسایش، چوونەژوورەوەتان بلۆک
            کراوە.
          </p>
          <p className="text-gray-500 text-sm mt-4">
            (Malicious activity detected. For security, your access has been
            blocked.)
          </p>
        </div>
      </div>
    )
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
          className="fixed bottom-4 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] sm:w-auto max-w-lg bg-white border-r-4 border-red-500 text-gray-800 px-4 sm:px-8 py-3 sm:py-5 rounded-2xl shadow-2xl z-50 flex items-center animate-fade-in-up backdrop-blur-sm transition-none"
        >
          <div className="bg-red-100 rounded-full p-2 ml-2 sm:ml-4">
            <svg
              className="h-5 w-5 sm:h-6 sm:w-6 text-red-600"
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
          </div>
          <div>
            <p className="font-bold text-sm sm:text-base md:text-lg">
              {errorMessage}
            </p>
          </div>
        </div>
      )}

      <header
        className="bg-white/80 backdrop-blur-md shadow-md sticky top-0 z-20"
        dir="rtl"
      >
        <div className="mx-auto px-2 sm:px-4 py-3">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <img
                src={LOGO_DATA_URL}
                alt="Logo"
                className="h-12 drop-shadow-lg"
              />
              <div className="text-black font-bold text-right">
                <p className="tracking-wide text-sm sm:text-base">
                  پەیمانگای تەکنیکی کوردستان
                </p>
              </div>
            </div>
            <button
              onClick={onBack}
              className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold rounded-lg transition-all duration-300 transform hover:scale-105"
              aria-label="گەڕانەوە بۆ هەڵبژاردن"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm.707-10.293a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L9.414 11H13a1 1 0 100-2H9.414l1.293-1.293z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="hidden sm:inline">گەڕانەوە</span>
            </button>
          </div>
        </div>
      </header>

      <main className="relative z-10 flex flex-col items-center px-2.5 py-4 md:py-8">
        <div className="w-full mx-auto">
          {currentStep === 1 ? (
            <div className="animate-fade-in-up">
              <div className="p-6 sm:p-8 flex flex-col min-h-[500px] sm:min-h-[600px]">
                <div className="flex-grow">
                  <FormPageOne
                    formData={formData}
                    handleChange={handleChange}
                    handleArrayChange={handleArrayChange}
                    errors={errors}
                    educationType={formType}
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="animate-fade-in-up">
              <div className="p-6 sm:p-8 flex flex-col min-h-[500px] sm:min-h-[600px]">
                <div className="flex-grow">
                  <FormPageTwo
                    formData={formData}
                    handleChange={handleChange}
                    handleArrayChange={handleArrayChange}
                    handleDepartmentToggle={handleDepartmentToggle}
                    errors={errors}
                    departments={departments}
                    formType={formType}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 my-4 sm:my-6 md:my-8 px-4">
          {currentStep === 2 && (
            <button
              onClick={handlePreviousStep}
              type="button"
              className="w-full sm:w-auto bg-gray-500 hover:bg-gray-600 text-white px-6 sm:px-10 py-3 sm:py-4 rounded-xl font-bold text-sm sm:text-base md:text-lg flex items-center justify-center transform hover:scale-105 transition-all duration-300"
            >
              گەڕانەوە
            </button>
          )}
          <button
            onClick={handleSubmit}
            type="submit"
            disabled={isGenerating || isCoolingDown}
            className={`w-full sm:w-auto group relative overflow-hidden ${isGenerating || isCoolingDown ? 'bg-gray-400 cursor-not-allowed' : 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-xl shadow-blue-500/30 hover:shadow-2xl hover:shadow-blue-500/40'} text-white font-bold px-6 sm:px-10 py-3 sm:py-4 rounded-xl sm:rounded-2xl transition-all duration-300 flex items-center justify-center gap-3 text-sm sm:text-base md:text-lg transform hover:scale-105`}
          >
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-white/0 via-white/10 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></span>
            <div className="relative flex items-center gap-2 sm:gap-3">
              {isGenerating ? (
                <>
                  <svg
                    className="animate-spin h-5 w-5 sm:h-6 sm:w-6 text-white"
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
                  <span>ناردنی زانیاری...</span>
                </>
              ) : isCoolingDown ? (
                <span>تکایە چاوەڕێ بکە...</span>
              ) : currentStep === 1 ? (
                <>
                  <span className="relative">هەنگاوی دواتر</span>
                  <ArrowRight
                    size={20}
                    className="relative rotate-180 group-hover:translate-x-1 transition-transform duration-300"
                  />
                </>
              ) : (
                <>
                  <svg
                    className="h-5 w-5 sm:h-6 sm:w-6 group-hover:animate-bounce"
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
                  <span>ناردن و داگرتنی فۆڕم</span>
                </>
              )}
            </div>
          </button>
        </div>
      </main>

      <Footer />

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
        <div
          ref={pageOnePrintRef}
          className={`bg-white flex flex-col font-sans ${pdfThemeClass}`}
          style={{
            width: '210mm',
            height: 'auto',
            minHeight: '297mm',
            boxSizing: 'border-box',
            padding: '3mm',
          }}
        >
          <div className="flex flex-col flex-grow pt-4">
            <div className="shrink-0 mb-4">
              <div className="border-b-2 border-red-500 pb-3 mb-2">
                <div className="flex justify-between items-start">
                  <div className="border-2 border-red-500 rounded-lg p-2 w-20 h-24 flex items-center justify-center">
                    <p className="text-sm text-gray-600 text-center">
                      وێنەی فێرخواز
                    </p>
                  </div>
                  <div className="text-center flex-1 mx-3 pt-10">
                    <div className="text-black font-bold text-lg">
                      <p>KURDISTAN TECHNICAL INSTITUTE</p>
                    </div>
                  </div>
                  <div className="text-right text-base text-blue-700 flex-shrink-0">
                    <p className="font-semibold">هەرێمی کوردستان - عێراق</p>
                    <p>وەزارەتی خوێندنی باڵا و توێژینەوەی زانستی</p>
                    <p>پەیمانگەی تەکنیکی کوردستان - سلێمانی</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex-grow min-h-0">
              <div className="space-y-2">
                <div>
                  <div className="section-header-modern text-white flex items-center justify-center py-3 px-4 text-lg">
                    <span className="font-bold tracking-wider">
                      زانیاری کەسی
                    </span>
                  </div>
                  <div className="modern-card p-4 space-y-3">
                    <div className="grid grid-cols-3 gap-2">
                      <div className="form-group">
                        <label className="form-label text-base">
                          ناوی چواری فێرخواز
                        </label>
                        <input
                          type="text"
                          name="personalName"
                          value={formData.personalName}
                          readOnly
                          className="form-input h-9 text-base"
                          placeholder="ناوی چواری"
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label text-base">ڕەگەز</label>
                        <div className="flex gap-2">
                          <div
                            className={`flex items-center gap-1.5 p-1 rounded-md ${formData.gender === 'male' ? 'bg-red-100' : ''}`}
                          >
                            <div className="w-3 h-3 rounded-full border border-red-600 flex items-center justify-center">
                              {formData.gender === 'male' && (
                                <div className="w-1.5 h-1.5 rounded-full bg-red-600"></div>
                              )}
                            </div>
                            <span className="text-base">نێر</span>
                          </div>
                          <div
                            className={`flex items-center gap-1.5 p-1 rounded-md ${formData.gender === 'female' ? 'bg-red-100' : ''}`}
                          >
                            <div className="w-3 h-3 rounded-full border border-red-600 flex items-center justify-center">
                              {formData.gender === 'female' && (
                                <div className="w-1.5 h-1.5 rounded-full bg-red-600"></div>
                              )}
                            </div>
                            <span className="text-base">مێ</span>
                          </div>
                        </div>
                      </div>
                      <div className="form-group">
                        <label className="form-label text-base">
                          ساڵی لەدایکبوون
                        </label>
                        <input
                          type="date"
                          name="birthYear"
                          value={formData.birthYear}
                          readOnly
                          className="form-input h-9 text-base text-right"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-5 gap-2">
                      <div className="form-group">
                        <label className="form-label text-base">پارێزگا</label>
                        <input
                          type="text"
                          name="address"
                          value={formData.address}
                          readOnly
                          className="form-input h-9 text-base"
                          placeholder="پارێزگا"
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label text-base">
                          شار/ناوچە
                        </label>
                        <input
                          type="text"
                          name="cityArea"
                          value={formData.cityArea}
                          readOnly
                          className="form-input h-9 text-base"
                          placeholder="شار/ناوچە"
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label text-base">گەڕەک</label>
                        <input
                          type="text"
                          name="neighborhood"
                          value={formData.neighborhood}
                          readOnly
                          className="form-input h-9 text-base"
                          placeholder="گەڕەک"
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label text-base">کۆڵان</label>
                        <input
                          type="text"
                          name="city"
                          value={formData.city}
                          readOnly
                          className="form-input h-9 text-base"
                          placeholder="کۆڵان"
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label text-base">خانوو</label>
                        <input
                          type="text"
                          name="district"
                          value={formData.district}
                          readOnly
                          className="form-input h-9 text-base"
                          placeholder="خانوو"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      <div className="form-group">
                        <label className="form-label text-base">
                          ژ. مۆبایل (١)
                        </label>
                        <input
                          type="text"
                          name="phone1"
                          value={formData.phone1}
                          readOnly
                          className="form-input h-9 text-base"
                          placeholder="07XX XXX XXXX"
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label text-base">
                          ژ. مۆبایل (٢)
                        </label>
                        <input
                          type="text"
                          name="phone2"
                          value={formData.phone2}
                          readOnly
                          className="form-input h-9 text-base"
                          placeholder="07XX XXX XXXX"
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label text-base">ئیمەیڵ</label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          readOnly
                          className="form-input h-9 text-base"
                          placeholder="example@email.com"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-4 gap-2">
                      <div className="form-group">
                        <label className="form-label text-base">
                          ناوی بەخێوکەر
                        </label>
                        <input
                          type="text"
                          name="guardianName"
                          value={formData.guardianName || ''}
                          readOnly
                          className="form-input h-9 text-base"
                          placeholder="ناوی بەخێوکەر"
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label text-base">
                          پلەی خزمایەتی
                        </label>
                        <input
                          type="text"
                          name="guardianRelation"
                          value={formData.guardianRelation || ''}
                          readOnly
                          className="form-input h-9 text-base"
                          placeholder="پلەی خزمایەتی"
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label text-base"> پیشە </label>
                        <input
                          type="text"
                          name="guardianOccupation"
                          value={formData.guardianOccupation || ''}
                          readOnly
                          className="form-input h-9 text-base"
                          placeholder="پیشە"
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label text-base">
                          {' '}
                          ژ.مۆبایل{' '}
                        </label>
                        <input
                          type="text"
                          name="guardianPhone"
                          value={formData.guardianPhone || ''}
                          readOnly
                          className="form-input h-9 text-base"
                          placeholder="07XX XXX XXXX"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="section-header-modern text-white text-center py-3 text-lg">
                    <span className="font-bold tracking-wider">
                      ئاستی خوێندن
                    </span>
                  </div>
                  <div className="modern-card p-4 space-y-3">
                    <div className="grid grid-cols-3 gap-2">
                      <div className="form-group">
                        <label className="form-label text-base">
                          دەرچووی دوانزەی ئامادەیی
                        </label>
                        <div className="badge-red py-3 text-base">
                          {formType === 'zansi'
                            ? 'زانستی'
                            : formType === 'wezhay'
                              ? 'وێژەیی'
                              : formType === 'peshassazi'
                                ? 'پیشەسازی'
                                : 'بازرگانی'}
                        </div>
                      </div>
                      <div className="form-group">
                        <label className="form-label text-base">
                          ساڵی دەرچوون
                        </label>
                        <input
                          type="date"
                          name="graduationYear"
                          value={formData.graduationYear}
                          readOnly
                          className="form-input h-9 text-base text-right"
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label text-base">
                          جۆری سیستەم
                        </label>
                        <div className="flex gap-2">
                          <div
                            className={`flex items-center gap-1.5 p-1 rounded-md ${formData.educationSystem === 'regular' ? 'bg-red-100' : ''}`}
                          >
                            <div className="w-3 h-3 rounded-full border border-red-600 flex items-center justify-center">
                              {formData.educationSystem === 'regular' && (
                                <div className="w-1.5 h-1.5 rounded-full bg-red-600"></div>
                              )}
                            </div>
                            <span className="text-base">ئاسایی</span>
                          </div>
                          <div
                            className={`flex items-center gap-1.5 p-1 rounded-md ${formData.educationSystem === 'swedish' ? 'bg-red-100' : ''}`}
                          >
                            <div className="w-3 h-3 rounded-full border border-red-600 flex items-center justify-center">
                              {formData.educationSystem === 'swedish' && (
                                <div className="w-1.5 h-1.5 rounded-full bg-red-600"></div>
                              )}
                            </div>
                            <span className="text-base">سویدی</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="form-group">
                        <label className="form-label text-base">خولی</label>
                        <div className="flex gap-2">
                          <div
                            className={`flex items-center gap-1.5 p-1 rounded-md ${formData.examRound === 'first' ? 'bg-red-100' : ''}`}
                          >
                            <div className="w-3 h-3 rounded-full border border-red-600 flex items-center justify-center">
                              {formData.examRound === 'first' && (
                                <div className="w-1.5 h-1.5 rounded-full bg-red-600"></div>
                              )}
                            </div>
                            <span className="text-base">یەکەم</span>
                          </div>
                          <div
                            className={`flex items-center gap-1.5 p-1 rounded-md ${formData.examRound === 'second' ? 'bg-red-100' : ''}`}
                          >
                            <div className="w-3 h-3 rounded-full border border-red-600 flex items-center justify-center">
                              {formData.examRound === 'second' && (
                                <div className="w-1.5 h-1.5 rounded-full bg-red-600"></div>
                              )}
                            </div>
                            <span className="text-base">دووەم</span>
                          </div>
                        </div>
                      </div>
                      <div className="form-group">
                        <label className="form-label text-base">
                          ژمارەی تاقیکردنەوە
                        </label>
                        <input
                          type="text"
                          name="examTestNumbers"
                          value={formData.examTestNumbers}
                          readOnly
                          className="form-input h-9 text-base"
                          placeholder="٠١٢٣٤٥٦٧٨٩٠١٢"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="section-header-modern text-white text-center py-3 text-lg">
                    <span className="font-bold tracking-wider">
                      زانیاری سەبارەت بە نمرەی فێرخواز
                    </span>
                  </div>
                  <div className="modern-card p-4 space-y-3">
                    <div className="bg-red-50 border border-red-200 p-2 rounded-lg text-red-700 text-center text-sm">
                      <p>
                        بەڕێوەبەری بەڕێز: هەر کەم و کورتییەک لە پڕکردنەوەی ئەم
                        بەشەدا هەبێت، ئێمە لێی بەرپرس نین.
                      </p>
                    </div>
                    <div className="grid grid-cols-4 gap-2">
                      <div className="form-group">
                        <label className="form-label text-base">پارێزگا</label>
                        <input
                          type="text"
                          name="province"
                          value={formData.province}
                          readOnly
                          className="form-input h-9 text-base"
                          placeholder="پارێزگا"
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label text-base">پەروەردە</label>
                        <input
                          type="text"
                          name="education"
                          value={formData.education}
                          readOnly
                          className="form-input h-9 text-base"
                          placeholder="پەروەردە"
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label text-base">گەڕەک</label>
                        <input
                          type="text"
                          name="district2"
                          value={formData.district2}
                          readOnly
                          className="form-input h-9 text-base"
                          placeholder="گەڕەک"
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label text-base">
                          ساڵی خوێندن
                        </label>
                        <input
                          type="date"
                          name="studyYear"
                          value={formData.studyYear}
                          readOnly
                          className="form-input h-9 text-base text-right"
                        />
                      </div>
                    </div>
                    {formType === 'peshassazi' && (
                      <div className="pt-2">
                        <div className="flex items-center gap-2 border border-gray-300 rounded-lg p-1">
                          <label className="form-label text-base flex-shrink-0 mb-0 px-2">
                            ئامادەی پیشەسازی
                          </label>
                          <div className="w-px h-6 bg-gray-300"></div>
                          <label className="form-label text-base flex-shrink-0 mb-0 px-1">
                            بەشی
                          </label>
                          <input
                            type="text"
                            value={formData.peshassaziDepartment || ''}
                            readOnly
                            className="form-input h-8 text-base flex-grow"
                          />
                        </div>
                      </div>
                    )}
                    <div className="table-container p-0 space-y-px overflow-x-hidden">
                      <div className="grid grid-cols-10 gap-px">
                        {formData.subjects.map((subject, i) => (
                          <input
                            key={i}
                            type="text"
                            value={subject}
                            readOnly
                            className="border border-gray-300 text-center font-medium rounded bg-white h-7 text-[8px] p-0.5"
                          />
                        ))}
                      </div>
                      <div className="grid grid-cols-11 gap-px">
                        <div className="table-label-red flex items-center justify-center text-[8px] p-0.5 h-7">
                          بە ژمارە
                        </div>
                        {formData.firstGradesNumeric.map((grade, i) => (
                          <input
                            key={i}
                            type="text"
                            value={grade}
                            readOnly
                            className="border border-gray-300 text-center font-medium rounded bg-white h-7 text-[8px] p-0.5"
                          />
                        ))}
                      </div>
                      <div className="grid grid-cols-11 gap-px">
                        <div className="table-label-red flex items-center justify-center text-[8px] p-0.5 h-7">
                          بە نووسین
                        </div>
                        {formData.firstGradesWritten.map((grade, i) => (
                          <input
                            key={i}
                            type="text"
                            value={grade}
                            readOnly
                            className="border border-gray-300 text-center font-medium rounded bg-white h-7 text-[8px] p-0.5"
                          />
                        ))}
                      </div>
                      <div className="grid grid-cols-11 gap-px">
                        <div className="table-label-red flex items-center justify-center text-[8px] p-0.5 h-7">
                          خولی دووەم
                        </div>
                        {formData.secondGradesNumeric.map((grade, i) => (
                          <input
                            key={i}
                            type="text"
                            value={grade}
                            readOnly
                            className="border border-gray-300 text-center font-medium rounded bg-white h-7 text-[8px] p-0.5"
                          />
                        ))}
                      </div>
                      <div className="grid grid-cols-11 gap-px">
                        <div className="table-label-red flex items-center justify-center text-[8px] p-0.5 h-7">
                          بە نووسین
                        </div>
                        {formData.secondGradesWritten.map((grade, i) => (
                          <input
                            key={i}
                            type="text"
                            value={grade}
                            readOnly
                            className="border border-gray-300 text-center font-medium rounded bg-white h-7 text-[8px] p-0.5"
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="shrink-0 mt-4 pt-3 border-t-2 border-red-500">
              <div className="flex flex-col items-center gap-2 text-xs">
                <div className="grid grid-cols-4 gap-x-4 gap-y-2 w-full max-w-4xl">
                  <div className="flex items-center justify-center gap-1.5 border border-red-200 p-1.5 rounded-md">
                    <span className="font-medium text-black">07729112121</span>
                  </div>
                  <div className="flex items-center justify-center gap-1.5 border border-red-200 p-1.5 rounded-md">
                    <span className="font-medium text-black">07519112121</span>
                  </div>
                  <div className="flex items-center justify-center gap-1.5 border border-red-200 p-1.5 rounded-md">
                    <span className="font-medium text-black">
                      www.kti.edu.iq
                    </span>
                  </div>
                  <div className="flex items-center justify-center gap-1.5 border border-red-200 p-1.5 rounded-md">
                    <span className="font-medium text-black">
                      tomar@kti.edu.iq
                    </span>
                  </div>
                </div>
                <p className="text-center text-gray-600 tracking-wide">
                  Kurdistan Technical Institute - Sulaymaniyah Heights, Kurdistan
                  Region - Iraq
                </p>
              </div>
            </div>
          </div>
        </div>
        <div
          ref={pageTwoPrintRef}
          className={`bg-white flex flex-col font-sans ${pdfThemeClass}`}
          style={{
            width: '210mm',
            height: 'auto',
            minHeight: '297mm',
            boxSizing: 'border-box',
            padding: '3mm',
          }}
        >
          <div className="flex flex-col flex-grow space-y-2">
            <div className="grid grid-cols-2 gap-2">
              <div>
                <div className="section-header-modern text-white text-center py-2 text-base">
                  <span className="font-bold tracking-wider">
                    خانەی تایبەت بە بەڕێوەبەری خوێندنگە
                  </span>
                </div>
                <div className="modern-card p-3 space-y-2">
                  <div className="space-y-2">
                    <div className="form-group">
                      <label className="form-label text-sm">
                        ناوی خوێندنگە
                      </label>
                      <input
                        type="text"
                        name="instituteName"
                        value={formData.instituteName || ''}
                        readOnly
                        className="form-input h-8 text-sm"
                        placeholder="ناوی خوێندنگە"
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label text-sm">
                        ناوی بەڕێوەبەر
                      </label>
                      <input
                        type="text"
                        name="directorName"
                        value={formData.directorName || ''}
                        readOnly
                        className="form-input h-8 text-sm"
                        placeholder="ناوی بەڕێوەبەر"
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label text-sm">ژ. تەلەفۆن</label>
                      <input
                        type="text"
                        name="directorPhone"
                        value={formData.directorPhone || ''}
                        readOnly
                        className="form-input h-8 text-sm"
                        placeholder="07XX XXX XXXX"
                      />
                    </div>
                  </div>
                  <div className="form-group pt-4">
                    <label className="form-label text-sm text-center">
                      واژۆ و ڕێکەوت و مۆر
                    </label>
                    <div className="border border-dashed border-gray-400 h-20 rounded-md"></div>
                  </div>
                </div>
              </div>
              <div>
                <div className="section-header-modern text-white text-center py-2 text-base">
                  <span className="font-bold tracking-wider">
                    پەسەندکردن و پشتڕاستکردنەوەی نمرەکان
                  </span>
                </div>
                <div className="modern-card p-3 space-y-2">
                  <div className="space-y-2">
                    <div className="text-center">
                      <p className="form-label font-bold text-sm">
                        لە بەڕێوەبەرێتی پەروەردەی ڕۆژئاوا / ڕۆژهەڵات
                      </p>
                    </div>
                    <div className="form-group">
                      <label className="form-label text-sm">
                        ناوی بەڕێوەبەرێتی
                      </label>
                      <input
                        type="text"
                        name="educationDirectorName"
                        value={formData.educationDirectorName || ''}
                        readOnly
                        className="form-input h-8 text-sm"
                        placeholder="ناوی بەڕێوەبەرێتی"
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label text-sm">قەزا</label>
                      <input
                        type="text"
                        name="decision"
                        value={formData.decision || ''}
                        readOnly
                        className="form-input h-8 text-sm"
                        placeholder="قەزا..."
                      />
                    </div>
                  </div>
                  <div className="form-group pt-4">
                    <label className="form-label text-sm text-center">
                      واژۆ و مۆر
                    </label>
                    <div className="border border-dashed border-gray-400 h-20 rounded-md"></div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className="section-header-modern text-white text-center py-2 text-base">
                <span className="font-bold tracking-wider">
                  بەشەکانی پەیمانگە
                </span>
              </div>
              <div className="modern-card p-3">
                <div className="grid grid-cols-3 gap-1.5">
                  {departments.map((dept, i) => {
                    const selectionIndex =
                      formData.departmentChoices.indexOf(dept)
                    const isSelected = selectionIndex !== -1
                    return (
                      <div
                        key={i}
                        className={`flex items-center gap-1.5 border p-1.5 rounded-md text-sm ${isSelected ? 'bg-red-100 border-red-300' : 'border-gray-300'}`}
                      >
                        <div
                          className={`w-4 h-4 border rounded flex-shrink-0 flex items-center justify-center font-bold text-red-600 ${isSelected ? 'border-red-500 bg-white' : 'border-gray-400'}`}
                        >
                          {isSelected && <span>{selectionIndex + 1}</span>}
                        </div>
                        <span className="font-medium">{dept}</span>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
            <div>
              <div className="section-header-modern text-white text-center py-2 text-base">
                <span className="font-bold tracking-wider">
                  ئەو بەشەی دەتەوێت تێیدا بخوێنیت
                </span>
              </div>
              <div className="modern-card p-3 text-sm text-gray-700 text-justify">
                {formType === 'bazrgani'
                  ? 'دەرچووی پیشەیی(بازرگانی) دەتوانن بەشی(کارگێڕی کار،ژمێریاری،دیجیتاڵ میدیا و مارکێتینگ) پڕبکەنەوە،دواتر بەپێی داواکاری بەشەکەو ڕێژەی دەرچوونی فێرخواز و مەرجەکانی وەزارەتی خوێندنی باڵا،وەردەگیرێت.'
                  : formType === 'peshassazi'
                  ? 'دەرچووی پیشەیی(پیشەسازی):- بەشەکانی(تەکنەلۆجیای زانیاری،چاکردنەوەی کۆمپیوتەر) دەتوانن لە بەشی(تەکنەلۆژیای زانیاری،تەکنەلۆژیای ڕۆبۆتینگ و ئۆتۆمەیشن)بخوێنن. بەشەکانی(وێنەی ئەندازەی) دەتوانن لە بەشی (ئەندازیاری دیکۆر) بخوێنن. پێی خواستی خۆت و گونجاندنی بەشەکەت، هەڵبژاردنەکەت پڕبکەوە، بەڵام بە پێی داواکاری بەشەکە و کۆنمرەی فێرخواز و مەرجەکانی وەزارەتی خوێندنی باڵا و توێژینەوەی زانستی وەردەگیرێت.'
                  : 'بە پێی ڕێنمایی و مەرجەکانی وەرگرتن، ژمارە (١٩٣٥٠) لە ڕێکەوتی (١٤\/١٠\/٢٠٢٥) بۆ ساڵی خوێندنی(٢٠٢٥ - ٢٠٢٦) بڕگەی یەکەم خاڵی (٧)، دەتوانیت (٣) هەڵبژاردن پڕبکەیتەوە، بەڵام بە گشتی هەڵبژاردنی یەکەم پێوەری سەرەکی وەرگرتنە و دوو هەڵبژاردنەکەی دیکە لە ئەگەری هەبوونی کورسی بەتاڵ لەو بەشانە و بە پێی داواکاری بەشەکە و کۆنمرەی فێرخواز و مەرجەکانی وەزارەتی خوێندنی باڵا، وەردەگیرێت.'}
              </div>
            </div>
            <div>
              <div className="section-header-modern text-white text-center py-2 text-base">
                <span className="font-bold tracking-wider">
                  ناسنامەی باری شارستانی
                </span>
              </div>
              <div className="modern-card p-3">
                <div className="grid grid-cols-4 gap-2">
                  <div className="form-group">
                    <label className="form-label text-sm">ژمارەی ناسنامە</label>
                    <input
                      type="text"
                      value={formData.certificate1 || ''}
                      readOnly
                      className="form-input h-8 text-sm"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label text-sm">ژمارەی تۆمار</label>
                    <input
                      type="text"
                      value={formData.certificate2 || ''}
                      readOnly
                      className="form-input h-8 text-sm"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label text-sm">ژمارەی لاپەڕە</label>
                    <input
                      type="text"
                      value={formData.certificate3 || ''}
                      readOnly
                      className="form-input h-8 text-sm"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label text-sm">شوێنی دەرچوون</label>
                    <input
                      type="text"
                      value={formData.certificate4 || ''}
                      readOnly
                      className="form-input h-8 text-sm"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className="section-header-modern text-white text-center py-2 text-base">
                <span className="font-bold tracking-wider">ڕەگەزنامە</span>
              </div>
              <div className="modern-card p-3 space-y-2">
                <div className="flex gap-4">
                  <div
                    className={`flex items-center gap-1.5 p-1 rounded-md ${formData.nationality2 === 'iraqi' ? 'bg-red-100' : ''}`}
                  >
                    <div className="w-3 h-3 rounded-full border border-red-600 flex items-center justify-center">
                      {formData.nationality2 === 'iraqi' && (
                        <div className="w-1.5 h-1.5 rounded-full bg-red-600"></div>
                      )}
                    </div>
                    <span className="text-sm">عێراقی</span>
                  </div>
                  <div
                    className={`flex items-center gap-1.5 p-1 rounded-md ${formData.nationality2 === 'other' ? 'bg-red-100' : ''}`}
                  >
                    <div className="w-3 h-3 rounded-full border border-red-600 flex items-center justify-center">
                      {formData.nationality2 === 'other' && (
                        <div className="w-1.5 h-1.5 rounded-full bg-red-600"></div>
                      )}
                    </div>
                    <span className="text-sm">هی تر</span>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <div className="form-group">
                    <label className="form-label text-sm">
                      ژمارەی ڕەگەزنامە
                    </label>
                    <input
                      type="text"
                      value={formData.nationalityNumber || ''}
                      readOnly
                      className="form-input h-8 text-sm"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label text-sm">ژمارەی تۆمار</label>
                    <input
                      type="text"
                      value={formData.registrationNumber || ''}
                      readOnly
                      className="form-input h-8 text-sm"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label text-sm">
                      ساڵ و شوێنی دەرچوون
                    </label>
                    <input
                      type="text"
                      value={formData.issueYearPlace || ''}
                      readOnly
                      className="form-input h-8 text-sm"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className="section-header-modern text-white text-center py-2 text-base">
                <span className="font-bold tracking-wider">
                  کارتی نیشتیمانی
                </span>
              </div>
              <div className="modern-card p-3">
                <div className="grid grid-cols-4 gap-2">
                  <div className="form-group">
                    <label className="form-label text-sm">ژمارەی کارت</label>
                    <input
                      type="text"
                      value={formData.familyCardNumber || ''}
                      readOnly
                      className="form-input h-8 text-sm"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label text-sm">شوێنی دەرچوون</label>
                    <input
                      type="text"
                      value={formData.familyCardIssuePlace || ''}
                      readOnly
                      className="form-input h-8 text-sm"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label text-sm">
                      ڕێکەوتی دەرچوون
                    </label>
                    <input
                      type="date"
                      value={formData.familyCardIssueDate || ''}
                      readOnly
                      className="form-input h-8 text-sm text-right"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label text-sm">کۆدی خێزانی</label>
                    <input
                      type="text"
                      value={formData.familyCode || ''}
                      readOnly
                      className="form-input h-8 text-sm"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 mt-auto pt-2">
              <div className="modern-card p-3">
                <label className="form-label text-center block mb-2 text-sm">
                  ناوی سیانی فێرخواز
                </label>
                <div className="border-t border-gray-400 mt-12"></div>
              </div>
              <div className="modern-card p-3">
                <label className="form-label text-center block mb-2 text-sm">
                  ڕێکەوت / واژۆ
                </label>
                <div className="border-t border-gray-400 mt-12"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
