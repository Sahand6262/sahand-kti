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

  const subjectsToRender =
    educationType === 'zansi'
      ? [
          'ئیسلامی',
          'کوردی',
          'عەرەبی',
          'ئینگلیزی',
          'بیرکاری',
          'فیزیا',
          'کیمیا',
          'زیندەزانی',
          'کۆمەڵایەتی',
          'ئابوری',
        ]
      : educationType === 'wezhay'
        ? [
            'ئیسلامی',
            'کوردی',
            'عەرەبی',
            'ئینگلیزی',
            'مێژوو',
            'جوگرافیا',
            'کۆمەڵایەتی',
            'ئابوری',
            'بنەماکانی ئامار',
            'کۆمپیوتەر',
          ]
        : educationType === 'peshassazi'
          ? [
              'ئیسلامی',
              'کوردی',
              'عەرەبی',
              'ئینگلیزی',
              'بیرکاری',
              'فیزیا',
              'کیمیا',
              'وێنەی پیشەسازی',
              'زانستی پیشەسازی',
              'راهێنانی پیشەسازی',
            ]
          : educationType === 'bazrgani'
            ? [
                'ئیسلامی',
                'کوردی',
                'عەرەبی',
                'ئینگلیزی',
                'ژمێریاری',
                'ئابوری',
                'بنەماکانی بەڕێوەبردن',
                'بنەماکانی ئامار',
                'کۆمپیوتەر',
                'نوسراوی بازرگانی',
              ]
            : []

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
            <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center shadow-md">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </div>
            <h2 className="text-lg font-bold">زانیاری کەسی</h2>
          </div>
        </div>
        <div className="modern-card-enhanced grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="form-group-modern lg:col-span-2">
            <label htmlFor="personalName" className="modern-label">
              ناوی سیانی و نازناو
            </label>
            <input
              type="text"
              id="personalName"
              name="personalName"
              className="modern-input"
              value={formData.personalName}
              onChange={handleChange}
              placeholder="ناوی سیانی و نازناو بنووسە"
              required
            />
            {errors.personalName && (
              <p className="text-red-500 text-xs mt-1">
                {errors.personalName}
              </p>
            )}
          </div>
          <div className="form-group-modern">
            <label htmlFor="birthPlace" className="modern-label">
              شوێنی لەدایکبوون
            </label>
            <input
              type="text"
              id="birthPlace"
              name="birthPlace"
              className="modern-input"
              value={formData.birthPlace}
              onChange={handleChange}
              placeholder="شوێنی لەدایکبوون"
              required
            />
            {errors.birthPlace && (
              <p className="text-red-500 text-xs mt-1">{errors.birthPlace}</p>
            )}
          </div>
          <div className="form-group-modern">
            <label htmlFor="birthYear" className="modern-label">
              ساڵی لەدایکبوون
            </label>
            <input
              type="number"
              id="birthYear"
              name="birthYear"
              className="modern-input"
              value={formData.birthYear}
              onChange={handleChange}
              placeholder="ساڵی لەدایکبوون"
              required
            />
            {errors.birthYear && (
              <p className="text-red-500 text-xs mt-1">{errors.birthYear}</p>
            )}
          </div>
          <div className="form-group-modern lg:col-span-4">
            <label htmlFor="address" className="modern-label">
              ناونیشانی نیشتەجێبوون
            </label>
            <input
              type="text"
              id="address"
              name="address"
              className="modern-input"
              value={formData.address}
              onChange={handleChange}
              placeholder="ناونیشانی ئێستا"
              required
            />
            {errors.address && (
              <p className="text-red-500 text-xs mt-1">{errors.address}</p>
            )}
          </div>
          <div className="form-group-modern">
            <label htmlFor="phone1" className="modern-label">
              ژمارەی مۆبایل ١
            </label>
            <input
              type="tel"
              id="phone1"
              name="phone1"
              className="modern-input"
              value={formData.phone1}
              onChange={handleChange}
              placeholder="07XX XXX XXXX"
              required
            />
            {errors.phone1 && (
              <p className="text-red-500 text-xs mt-1">{errors.phone1}</p>
            )}
          </div>
          <div className="form-group-modern">
            <label htmlFor="phone2" className="modern-label">
              ژمارەی مۆبایل ٢ (ئارەزوومەندانە)
            </label>
            <input
              type="tel"
              id="phone2"
              name="phone2"
              className="modern-input"
              value={formData.phone2}
              onChange={handleChange}
              placeholder="07XX XXX XXXX"
            />
          </div>
          <div className="form-group-modern lg:col-span-2">
            <label htmlFor="email" className="modern-label">
              ئیمەیڵ (ئارەزوومەندانە)
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="modern-input"
              value={formData.email}
              onChange={handleChange}
              placeholder="example@email.com"
            />
          </div>
          <div className="form-group-modern lg:col-span-4">
            <label className="modern-label">ڕەگەز</label>
            <div className="grid grid-cols-2 gap-4">
              <label className="modern-radio-label">
                <input
                  type="radio"
                  name="gender"
                  value="نێر"
                  className="modern-radio"
                  checked={formData.gender === 'نێر'}
                  onChange={handleChange}
                  required
                />
                <span className="text-sm font-semibold text-gray-800">نێر</span>
              </label>
              <label className="modern-radio-label">
                <input
                  type="radio"
                  name="gender"
                  value="مێ"
                  className="modern-radio"
                  checked={formData.gender === 'مێ'}
                  onChange={handleChange}
                />
                <span className="text-sm font-semibold text-gray-800">مێ</span>
              </label>
            </div>
            {errors.gender && (
              <p className="text-red-500 text-xs mt-1">{errors.gender}</p>
            )}
          </div>
        </div>
      </div>

      {/* Education Info */}
      <div className="group">
        <div className="modern-section-header flex items-center justify-center px-4">
          <div className="flex items-center justify-center gap-3">
            <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center shadow-md">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M12 14l9-5-9-5-9 5 9 5z" />
                <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-5.998 12.078 12.078 0 01.665-6.479L12 14z" />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 14l9-5-9-5-9 5 9 5zm0 0v6"
                />
              </svg>
            </div>
            <h2 className="text-lg font-bold">زانیاری خوێندن</h2>
          </div>
        </div>
        <div className="modern-card-enhanced grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="form-group-modern">
            <label className="modern-label">جۆری خوێندن</label>
            <div className="modern-badge">{getEducationTypeText()}</div>
          </div>
          <div className="form-group-modern">
            <label htmlFor="graduationYear" className="modern-label">
              ساڵی دەرچوون
            </label>
            <input
              type="number"
              id="graduationYear"
              name="graduationYear"
              className="modern-input"
              value={formData.graduationYear}
              onChange={handleChange}
              placeholder="ساڵی دەرچوون"
              required
            />
            {errors.graduationYear && (
              <p className="text-red-500 text-xs mt-1">
                {errors.graduationYear}
              </p>
            )}
          </div>
          <div className="form-group-modern">
            <label htmlFor="examTestNumbers" className="modern-label">
              ژمارەی تاقیکردنەوە
            </label>
            <input
              type="number"
              id="examTestNumbers"
              name="examTestNumbers"
              className="modern-input"
              value={formData.examTestNumbers}
              onChange={handleChange}
              placeholder="ژمارەی تاقیکردنەوە"
              required
            />
          </div>
        </div>
      </div>

      {/* Student Grades */}
      <div className="group">
        <div className="modern-section-header flex items-center justify-center px-4">
          <div className="flex items-center justify-center gap-3">
            <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center shadow-md">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M12 7h.01M15 7h.01"
                />
              </svg>
            </div>
            <h2 className="text-lg font-bold">نمرەکانی قوتابی</h2>
          </div>
        </div>
        <div className="modern-card-enhanced p-4">
          <div className="modern-table-container">
            <div className="p-4 space-y-3">
              {/* Header */}
              <div className="grid grid-cols-11 gap-2 items-center">
                <div className="table-label-red p-2 col-span-1">وانەکان</div>
                <div className="grid grid-cols-10 gap-2 col-span-10">
                  {subjectsToRender.slice(0, 10).map((subject, index) => (
                    <div key={index} className="badge-red">
                      {subject}
                    </div>
                  ))}
                </div>
              </div>
              {/* Data rows for first/second round */}
              {[
                { label: 'بە ژمارە', arrayName: 'firstGradesNumeric' },
                { label: 'بە نووسین', arrayName: 'firstGradesWritten' },
              ].map(({ label, arrayName }) => (
                <div
                  key={label}
                  className="grid grid-cols-11 gap-2 items-center"
                >
                  <div className="table-label-red p-2">{label}</div>
                  {[...Array(10)].map((_, colIndex) => (
                    <input
                      key={colIndex}
                      type="text"
                      className="form-input table-cell text-center"
                      value={formData[arrayName][colIndex]}
                      onChange={(e) =>
                        handleArrayChange(arrayName, colIndex, e.target.value)
                      }
                    />
                  ))}
                </div>
              ))}
              {/* Data rows for third/fourth round */}
              {[
                { label: 'خولی دووەم', arrayName: 'secondGradesNumeric' },
                { label: 'بە ئەنجامدان', arrayName: 'secondGradesWritten' },
              ].map(({ label, arrayName }) => (
                <div
                  key={label}
                  className="grid grid-cols-11 gap-2 items-center"
                >
                  <div className="table-label-red p-2">{label}</div>
                  {[...Array(10)].map((_, colIndex) => (
                    <div key={colIndex} className="grid grid-cols-2 gap-1">
                      <input
                        type="text"
                        className="form-input table-cell text-center"
                        value={formData[arrayName][colIndex * 2]}
                        onChange={(e) =>
                          handleArrayChange(
                            arrayName,
                            colIndex * 2,
                            e.target.value,
                          )
                        }
                      />
                      <input
                        type="text"
                        className="form-input table-cell text-center"
                        value={formData[arrayName][colIndex * 2 + 1]}
                        onChange={(e) =>
                          handleArrayChange(
                            arrayName,
                            colIndex * 2 + 1,
                            e.target.value,
                          )
                        }
                      />
                    </div>
                  ))}
                </div>
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
}: FormPageTwoProps) => {
  const peshassaziDepartments = [
    'تەکنیکی نەوت و گاز',
    'دیزاینی ناوخۆ',
    'تەکنەلۆجیای زانیاری',
    'سیستەمی زانیاری جوگرافی',
  ]

  return (
    <form className="space-y-6">
      {/* Department Preferences */}
      <div className="group">
        <div className="modern-section-header flex items-center justify-center px-4">
          <div className="flex items-center justify-center gap-3">
            <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center shadow-md">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m-1 4h1m3-4h1m-1 4h1m-1-4h1m-1 4h1"
                />
              </svg>
            </div>
            <h2 className="text-lg font-bold">هەڵبژاردنی بەشەکان</h2>
          </div>
        </div>
        <div className="modern-card-enhanced p-6">
          <div className="modern-warning-box text-center mb-6">
            <p className="text-sm font-semibold text-blue-800">
              تکایە ٦ بەش هەڵبژێرە بەپێی ئارەزوو و نمرەکانت. هەڵبژاردنی یەکەم
              گرنگترینیانە.
            </p>
          </div>
          {formType === 'peshassazi' ? (
            <div className="form-group-modern">
              <label htmlFor="peshassaziDepartment" className="modern-label">
                بەشی پیشەسازی
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {peshassaziDepartments.map((dept) => (
                  <label key={dept} className="modern-department-option">
                    <input
                      type="radio"
                      name="peshassaziDepartment"
                      value={dept}
                      className="modern-radio"
                      checked={formData.peshassaziDepartment === dept}
                      onChange={handleChange}
                    />
                    <span className="font-semibold text-gray-800">{dept}</span>
                  </label>
                ))}
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {departments.map((dept) => (
                <label key={dept} className="modern-department-option">
                  <input
                    type="checkbox"
                    value={dept}
                    className="modern-radio"
                    checked={formData.departmentChoices.includes(dept)}
                    onChange={() => handleDepartmentToggle(dept)}
                    disabled={
                      !formData.departmentChoices.includes(dept) &&
                      formData.departmentChoices.length >= 6
                    }
                  />
                  <span className="font-semibold text-gray-800">{dept}</span>
                </label>
              ))}
            </div>
          )}
          {errors.departmentChoices && (
            <p className="text-red-500 text-xs mt-3">
              {errors.departmentChoices}
            </p>
          )}
          <div className="mt-4 text-sm font-semibold text-gray-600">
            <span>ژمارەی بەشە هەڵبژێردراوەکان: </span>
            <span className="font-bold text-blue-700">
              {formData.departmentChoices.length} / 6
            </span>
          </div>
        </div>
      </div>

      {/* Guardian Info */}
      <div className="group">
        <div className="modern-section-header flex items-center justify-center px-4">
          <div className="flex items-center justify-center gap-3">
            <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center shadow-md">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M15 21a6 6 0 00-9-5.197m0 0A5.995 5.995 0 003 21m0 0a6 6 0 0112 0m0 0v-1a6 6 0 00-9-5.197"
                />
              </svg>
            </div>
            <h2 className="text-lg font-bold">زانیاری سەرپەرشتیار</h2>
          </div>
        </div>
        <div className="modern-card-enhanced grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="form-group-modern lg:col-span-2">
            <label htmlFor="guardianName" className="modern-label">
              ناوی سیانی سەرپەرشتیار
            </label>
            <input
              type="text"
              id="guardianName"
              name="guardianName"
              className="modern-input"
              value={formData.guardianName}
              onChange={handleChange}
              placeholder="ناوی سیانی سەرپەرشتیار"
              required
            />
            {errors.guardianName && (
              <p className="text-red-500 text-xs mt-1">
                {errors.guardianName}
              </p>
            )}
          </div>
          <div className="form-group-modern">
            <label htmlFor="guardianRelation" className="modern-label">
              پەیوەندی
            </label>
            <input
              type="text"
              id="guardianRelation"
              name="guardianRelation"
              className="modern-input"
              value={formData.guardianRelation}
              onChange={handleChange}
              placeholder="پەیوەندی لەگەڵ قوتابی"
              required
            />
          </div>
          <div className="form-group-modern">
            <label htmlFor="guardianPhone" className="modern-label">
              ژمارەی مۆبایل
            </label>
            <input
              type="tel"
              id="guardianPhone"
              name="guardianPhone"
              className="modern-input"
              value={formData.guardianPhone}
              onChange={handleChange}
              placeholder="07XX XXX XXXX"
              required
            />
            {errors.guardianPhone && (
              <p className="text-red-500 text-xs mt-1">
                {errors.guardianPhone}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Declaration */}
      <div className="group">
        <div className="modern-section-header flex items-center justify-center px-4">
          <div className="flex items-center justify-center gap-3">
            <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center shadow-md">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h2 className="text-lg font-bold">بەڵێننامە</h2>
          </div>
        </div>
        <div className="modern-card-enhanced p-6">
          <div className="modern-info-box mb-6 p-4">
            <p className="text-sm text-gray-800 leading-relaxed">
              من کە لە خوارەوە ناوم هاتووە، بەڵێن دەدەم کە هەموو ئەو زانیاریانەی
              کە لەم فۆڕمەدا تۆمارم کردووە ڕاست و دروستن، و بە پێچەوانەوە
              بەرپرسیارێتی یاسایی هەڵدەگرم. هەروەها بەڵێن دەدەم کە پابەندی
              یاسا و ڕێنماییەکانی پەیمانگا دەبم.
            </p>
          </div>
          <div className="flex items-center gap-3 bg-white/80 border-2 border-gray-200 rounded-xl p-4">
            <input
              type="checkbox"
              id="declaration"
              name="declaration"
              className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500 cursor-pointer"
              checked={formData.declaration}
              onChange={handleChange}
              required
            />
            <label htmlFor="declaration" className="font-semibold text-gray-800">
              بەڵێننامەکە قبوڵ دەکەم
            </label>
          </div>
          {errors.declaration && (
            <p className="text-red-500 text-xs mt-2">{errors.declaration}</p>
          )}
          <div className="mt-8">
            <label className="modern-label">ئیمزا</label>
            <div className="modern-signature-box flex items-center justify-center">
              <p className="text-gray-400">شوێنی ئیمزا</p>
            </div>
          </div>
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="form-group-modern">
              <label htmlFor="signatureDate" className="modern-label">
                ڕێکەوتی پڕکردنەوە
              </label>
              <input
                type="text"
                id="signatureDate"
                name="signatureDate"
                className="modern-input"
                value={formData.signatureDate}
                readOnly
                disabled
              />
            </div>
          </div>
        </div>
      </div>
    </form>
  )
}

// --- PDF TEMPLATE COMPONENT ---
interface PDFTemplateProps {
  formData: FormData
  formType: 'zansi' | 'wezhay' | 'peshassazi' | 'bazrgani'
  departments: string[]
}
const PDFTemplate = React.forwardRef<HTMLDivElement, PDFTemplateProps>(
  ({ formData, formType, departments }, ref) => {
    const getEducationTypeText = () => {
      switch (formType) {
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

    const peshassaziDepartments = [
      'تەکنیکی نەوت و گاز',
      'دیزاینی ناوخۆ',
      'تەکنەلۆجیای زانیاری',
      'سیستەمی زانیاری جوگرافی',
    ]

    const subjects =
      formType === 'zansi'
        ? [
            'ئیسلامی',
            'کوردی',
            'عەرەبی',
            'ئینگلیزی',
            'بیرکاری',
            'فیزیا',
            'کیمیا',
            'زیندەزانی',
            'کۆمەڵایەتی',
            'ئابوری',
          ]
        : formType === 'wezhay'
          ? [
              'ئیسلامی',
              'کوردی',
              'عەرەبی',
              'ئینگلیزی',
              'مێژوو',
              'جوگرافیا',
              'کۆمەڵایەتی',
              'ئابوری',
              'بنەماکانی ئامار',
              'کۆمپیوتەر',
            ]
          : formType === 'peshassazi'
            ? [
                'ئیسلامی',
                'کوردی',
                'عەرەبی',
                'ئینگلیزی',
                'بیرکاری',
                'فیزیا',
                'کیمیا',
                'وێنەی پیشەسازی',
                'زانستی پیشەسازی',
                'راهێنانی پیشەسازی',
              ]
            : formType === 'bazrgani'
              ? [
                  'ئیسلامی',
                  'کوردی',
                  'عەرەبی',
                  'ئینگلیزی',
                  'ژمێریاری',
                  'ئابوری',
                  'بنەماکانی بەڕێوەبردن',
                  'بنەماکانی ئامار',
                  'کۆمپیوتەر',
                  'نوسراوی بازرگانی',
                ]
              : []

    const GradesTable = () => (
      <div className="border border-gray-300 rounded-lg overflow-hidden">
        <div className="grid grid-cols-11 text-xs font-bold text-center bg-gray-100 border-b border-gray-300">
          {['بابەتەکان', ...subjects].map((subject, i) => (
            <div
              key={i}
              className={`p-1 border-l border-gray-300 ${i === subjects.length ? 'border-l-0' : ''}`}
            >
              {subject}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-11 text-xs text-center border-b border-gray-300">
          <div className="p-1 border-l border-gray-300 bg-gray-50 font-semibold">
            بە ژمارە
          </div>
          {formData.firstGradesNumeric.map((grade, i) => (
            <div
              key={i}
              className={`p-1 border-l border-gray-300 ${i === 9 ? 'border-l-0' : ''}`}
            >
              {grade || ' '}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-11 text-xs text-center border-b border-gray-300">
          <div className="p-1 border-l border-gray-300 bg-gray-50 font-semibold">
            بە نووسین
          </div>
          {formData.firstGradesWritten.map((grade, i) => (
            <div
              key={i}
              className={`p-1 border-l border-gray-300 ${i === 9 ? 'border-l-0' : ''}`}
            >
              {grade || ' '}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-11 text-xs text-center border-b border-gray-300">
          <div className="p-1 border-l border-gray-300 bg-gray-50 font-semibold">
            خولی دووەم
          </div>
          {formData.secondGradesNumeric.map((grade, i) => (
            <div
              key={i}
              className={`p-1 border-l border-gray-300 ${i === 9 ? 'border-l-0' : ''}`}
            >
              {grade || ' '}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-11 text-xs text-center">
          <div className="p-1 border-l border-gray-300 bg-gray-50 font-semibold">
            بە ئەنجامدان
          </div>
          {formData.secondGradesWritten.map((grade, i) => (
            <div
              key={i}
              className={`p-1 border-l border-gray-300 ${i === 9 ? 'border-l-0' : ''}`}
            >
              {grade || ' '}
            </div>
          ))}
        </div>
      </div>
    )
// FIX: Add explicit types for props in InfoRow component to avoid type error with 'key'.
    const InfoRow = ({
      label,
      value,
    }: {
      label: string
      value: string | undefined | null
    }) => (
      <div className="flex text-sm">
        <span className="font-bold w-32 flex-shrink-0">{label}:</span>
        <span className="font-medium text-gray-700">{value || ' '}</span>
      </div>
    )

    const pdfThemeClass =
      formType === 'wezhay'
        ? 'wezhay-pdf-theme'
        : formType === 'peshassazi'
          ? 'peshassazi-pdf-theme'
          : formType === 'bazrgani'
            ? 'bazrgani-pdf-theme'
            : ''

    return (
      <div
        id="pdf-content"
        ref={ref}
        className={`w-[210mm] min-h-[297mm] bg-white p-6 text-black ${pdfThemeClass}`}
        dir="rtl"
      >
        <div className="border-2 border-gray-400 p-4 min-h-[calc(297mm-48px)] flex flex-col">
          {/* Header */}
          <header className="flex items-center justify-between modern-header-border pb-4">
            <img
              src="https://kti.edu.iq/photo/kti_52_0.png"
              alt="KTI Logo"
              className="w-24 h-24"
            />
            <div className="text-center">
              <h1 className="text-2xl font-bold text-red-600">
                پەیمانگای تەکنیکی کوردستان
              </h1>
              <p className="text-lg font-semibold">فۆڕمی تۆمارکردنی قوتابی</p>
              <p className="font-medium">ساڵی خوێندنی ٢٠٢٤-٢٠٢٥</p>
            </div>
            <div className="modern-photo-placeholder">
              <span className="text-xs text-red-700 font-bold">
                وێنەی قوتابی
              </span>
            </div>
          </header>

          <main className="flex-grow py-4">
            {/* Personal Info */}
            <div className="group">
              <div className="section-header-modern text-center p-2 text-white font-bold">
                زانیاری کەسی
              </div>
              <div className="modern-card p-4 grid grid-cols-2 gap-x-8 gap-y-2">
                <InfoRow
                  label="ناوی سیانی و نازناو"
                  value={formData.personalName}
                />
                <InfoRow label="شوێنی لەدایکبوون" value={formData.birthPlace} />
                <InfoRow label="ساڵی لەدایکبوون" value={formData.birthYear} />
                <InfoRow label="ڕەگەز" value={formData.gender} />
                <div className="col-span-2">
                  <InfoRow
                    label="ناونیشانی نیشتەجێبوون"
                    value={formData.address}
                  />
                </div>
                <InfoRow label="ژمارەی مۆبایل ١" value={formData.phone1} />
                <InfoRow label="ژمارەی مۆبایل ٢" value={formData.phone2} />
                <div className="col-span-2">
                  <InfoRow label="ئیمەیڵ" value={formData.email} />
                </div>
              </div>
            </div>

            {/* Education Info */}
            <div className="group mt-4">
              <div className="section-header-modern text-center p-2 text-white font-bold">
                زانیاری خوێندن
              </div>
              <div className="modern-card p-4 grid grid-cols-3 gap-x-8 gap-y-2">
                <InfoRow
                  label="جۆری خوێندن"
                  value={getEducationTypeText()}
                />
                <InfoRow
                  label="ساڵی دەرچوون"
                  value={formData.graduationYear}
                />
                <InfoRow
                  label="ژمارەی تاقیکردنەوە"
                  value={formData.examTestNumbers}
                />
              </div>
            </div>

            {/* Student Grades */}
            <div className="group mt-4">
              <div className="section-header-modern text-center p-2 text-white font-bold">
                نمرەکانی قوتابی
              </div>
              <div className="modern-card">
                <GradesTable />
              </div>
            </div>

            {/* Department Preferences */}
            <div className="group mt-4">
              <div className="section-header-modern text-center p-2 text-white font-bold">
                هەڵبژاردنی بەشەکان
              </div>
              <div className="modern-card p-4">
                <div className="grid grid-cols-3 gap-x-8 text-sm">
                  {formData.departmentChoices
                    .slice(0, 6)
                    .map((choice, index) => (
                      <InfoRow
                        key={index}
                        label={`هەڵبژاردنی ${index + 1}`}
                        value={choice}
                      />
                    ))}
                  {formType === 'peshassazi' && (
                    <InfoRow
                      label="بەشی پیشەسازی"
                      value={formData.peshassaziDepartment}
                    />
                  )}
                </div>
              </div>
            </div>

            {/* Guardian Info */}
            <div className="group mt-4">
              <div className="section-header-modern text-center p-2 text-white font-bold">
                زانیاری سەرپەرشتیار
              </div>
              <div className="modern-card p-4 grid grid-cols-2 gap-x-8 gap-y-2">
                <InfoRow
                  label="ناوی سەرپەرشتیار"
                  value={formData.guardianName}
                />
                <InfoRow
                  label="پەیوەندی"
                  value={formData.guardianRelation}
                />
                <InfoRow
                  label="ژمارەی مۆبایل"
                  value={formData.guardianPhone}
                />
              </div>
            </div>

            {/* Declaration */}
            <div className="group mt-4">
              <div className="section-header-modern text-center p-2 text-white font-bold">
                بەڵێننامە
              </div>
              <div className="modern-card p-4 text-xs text-justify">
                <p>
                  من کە لە خوارەوە ناوم هاتووە، بەڵێن دەدەم کە هەموو ئەو
                  زانیاریانەی کە لەم فۆڕمەدا تۆمارم کردووە ڕاست و دروستن، و بە
                  پێچەوانەوە بەرپرسیارێتی یاسایی هەڵدەگرم. هەروەها بەڵێن دەدەم
                  کە پابەندی یاسا و ڕێنماییەکانی پەیمانگا دەبم.
                </p>
                <div className="mt-8 flex justify-between items-end">
                  <div className="text-center">
                    <p className="font-bold text-sm">ئیمزای قوتابی</p>
                    <div className="border-t-2 border-gray-400 mt-8 w-48"></div>
                  </div>
                  <div className="text-center">
                    <p className="font-medium text-sm">
                      ڕێکەوت: {formData.signatureDate}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </main>

          {/* Footer */}
          <footer className="modern-footer-border pt-4 mt-auto">
            <div className="text-center text-xs text-gray-600">
              <p>
                ناونیشان: سلێمانی - گردی سەرچنار - نزیک نەخۆشخانەی شۆڕش
              </p>
              <p>
                ژمارەی مۆبایل: ٠٧٧٢٩١١٢١٢١ - ٠٧٥١٩١١٢١٢١ | ئیمەیڵ:
                tomar@kti.edu.iq
              </p>
            </div>
          </footer>
        </div>
      </div>
    )
  },
)

// --- MAIN FORM COMPONENT ---
export function MainForm({ formType, onBack }: MainFormProps) {
  const [currentPage, setCurrentPage] = useState(1)
  const [formData, setFormData] = useState<FormData>({
    personalName: '',
    birthPlace: '',
    address: '',
    city: '',
    district: '',
    cityArea: '',
    neighborhood: '',
    gender: 'نێر',
    phone1: '',
    phone2: '',
    email: '',
    educationLevel: 'دەرچووی پۆلی ١٢',
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
    subjects: [],
    firstGradesNumeric: Array(10).fill(''),
    firstGradesWritten: Array(10).fill(''),
    secondGradesNumeric: Array(20).fill(''),
    secondGradesWritten: Array(20).fill(''),
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
    signatureDate: new Date().toLocaleDateString('ku-IQ', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    }),
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
    website_url: '', // Honeypot
  })

  const [errors, setErrors] = useState<{ [key: string]: string }>({})
  const [isLoading, setIsLoading] = useState(false)
  const [submissionStatus, setSubmissionStatus] = useState<
    'idle' | 'success' | 'error'
  >('idle')
  const [submissionMessage, setSubmissionMessage] = useState('')

  const pdfRef = useRef<HTMLDivElement>(null)

  const departments =
    formType === 'zansi'
      ? [
          'شیکاری نەخۆشیەکان',
          'دەرمانسازی',
          'تەکنیکی تیشک',
          'پەرستاری',
          'تەکنیکی گێژکردن',
          'چارەسەری سروشتی',
          'تەکنیکی کارگێری تەندروستی',
          'تەکنیکی بیناسازی',
          'تەکنیکی نەوت و گاز',
          'دیزاینی ناوخۆ',
          'تەکنەلۆجیای زانیاری',
          'سیستەمی زانیاری جوگرافی',
        ]
      : formType === 'wezhay'
        ? [
            'کارگێری یاسا',
            'پەیوەندیە نێودەوڵەتیەکان و дипломатия',
            'پەرەپێدانی مرۆیی',
            'ڕاگەیاندن',
            'ژمێریاری',
            'کارگێری کار',
            'کارگێری بانک',
            'بازاڕگەری',
            'گروپی زمانی ئینگلیزی',
          ]
        : formType === 'bazrgani'
          ? [
              'ژمێریاری',
              'کارگێری کار',
              'کارگێری بانک',
              'بازاڕگەری',
              'پەیوەندیە نێودەوڵەتیەکان و дипломатия',
            ]
          : [] // Peshassazi is handled separately

  const handleDepartmentToggle = (departmentName: string) => {
    setFormData((prev) => {
      const currentChoices = prev.departmentChoices
      if (currentChoices.includes(departmentName)) {
        return {
          ...prev,
          departmentChoices: currentChoices.filter(
            (d) => d !== departmentName,
          ),
        }
      } else if (currentChoices.length < 6) {
        return { ...prev, departmentChoices: [...currentChoices, departmentName] }
      }
      return prev
    })
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value, type } = e.target
    let finalValue: string | boolean = value

    if (type === 'checkbox') {
      finalValue = (e.target as HTMLInputElement).checked
    } else if (isSuspicious(value)) {
      console.error(`Suspicious input blocked for field: ${name}`)
      return
    } else {
      finalValue = sanitizeInput(value)
    }

    setFormData((prev) => ({ ...prev, [name]: finalValue }))
  }

  const handleArrayChange = (
    arrayName: string,
    index: number,
    value: string,
  ) => {
    setFormData((prev) => {
      const newArray = [...prev[arrayName]]
      newArray[index] = value
      return { ...prev, [arrayName]: newArray }
    })
  }

  const validatePageOne = () => {
    const newErrors: { [key: string]: string } = {}
    if (!formData.personalName.trim())
      newErrors.personalName = 'ناو پێویستە'
    if (!formData.birthPlace.trim())
      newErrors.birthPlace = 'شوێنی لەدایکبوون پێویستە'
    if (!formData.birthYear.trim())
      newErrors.birthYear = 'ساڵی لەدایکبوون پێویستە'
    else if (
      isNaN(Number(formData.birthYear)) ||
      Number(formData.birthYear) < 1950 ||
      Number(formData.birthYear) > 2020
    ) {
      newErrors.birthYear = 'ساڵێکی دروست بنووسە'
    }
    if (!formData.address.trim()) newErrors.address = 'ناونیشان پێویستە'
    if (!formData.phone1.trim())
      newErrors.phone1 = 'ژمارەی مۆبایل پێویستە'
    else if (!/^(07[578])[0-9]{8}$/.test(formData.phone1)) {
      newErrors.phone1 = 'ژمارەیەکی دروست بنووسە'
    }
    if (!formData.gender) newErrors.gender = 'ڕەگەز هەڵبژێرە'
    if (!formData.graduationYear.trim())
      newErrors.graduationYear = 'ساڵی دەرچوون پێویستە'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const validatePageTwo = () => {
    const newErrors: { [key: string]: string } = {}
    if (formType !== 'peshassazi' && formData.departmentChoices.length === 0) {
      newErrors.departmentChoices = 'تکایە بەشێک هەڵبژێرە'
    } else if (
      formType !== 'peshassazi' &&
      formData.departmentChoices.length > 6
    ) {
      newErrors.departmentChoices = 'تکایە تەنها ٦ بەش هەڵبژێرە'
    }
    if (!formData.guardianName.trim())
      newErrors.guardianName = 'ناوی سەرپەرشتیار پێویستە'
    if (!formData.guardianPhone.trim())
      newErrors.guardianPhone = 'ژمارەی مۆبایلی سەرپەرشتیار پێویستە'
    if (!formData.declaration)
      newErrors.declaration = 'پێویستە بەڵێننامەکە قبوڵ بکەیت'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNextPage = () => {
    if (validatePageOne()) {
      setCurrentPage(2)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const handlePrevPage = () => {
    setCurrentPage(1)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validatePageOne() || !validatePageTwo()) {
      setSubmissionStatus('error')
      setSubmissionMessage('تکایە هەموو خانە پێویستەکان پڕبکەرەوە.')
      if (!validatePageOne()) setCurrentPage(1)
      return
    }

    if (formData.website_url) {
      console.log('Honeypot field filled. Blocking submission.')
      return // Silently fail for bots
    }

    setIsLoading(true)
    setSubmissionStatus('idle')

    try {
      const pdfBlob = await generatePdf()
      const submissionData = new FormData()

// FIX: Add explicit type check for 'string' to satisfy TypeScript's type narrowing for FormData.append.
      Object.entries(formData).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          submissionData.append(key, JSON.stringify(value))
        } else if (typeof value === 'boolean') {
          submissionData.append(key, value ? '1' : '0')
        } else if (typeof value === 'string') {
          submissionData.append(key, value)
        }
      })
      submissionData.append('pdf', pdfBlob, `${formData.personalName}.pdf`)
      submissionData.append('department', getEducationTypeText())

      const response = await fetch('/api/submit', {
        method: 'POST',
        body: submissionData,
      })

      const result = await response.json()

      if (!response.ok || !result.success) {
        throw new Error(
          result.message || 'هەڵەیەک ڕوویدا لە کاتی ناردنی فۆڕمەکە.',
        )
      }

      setSubmissionStatus('success')
      setSubmissionMessage('فۆڕمەکەت بە سەرکەوتوویی نێردرا!')
      saveAs(pdfBlob, `${formData.personalName}_Registration.pdf`)
    } catch (error) {
      console.error('Submission error:', error)
      setSubmissionStatus('error')
      setSubmissionMessage(
        error instanceof Error
          ? error.message
          : 'هەڵەیەکی چاوەڕواننەکراو ڕوویدا.',
      )
    } finally {
      setIsLoading(false)
    }
  }

  const getEducationTypeText = () => {
    switch (formType) {
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

  const generatePdf = async (): Promise<Blob> => {
    const content = pdfRef.current
    if (!content) throw new Error('PDF content not found')

    const dataUrl = await toPng(content, {
      quality: 1,
      pixelRatio: 2,
      backgroundColor: 'white',
    })

    const pdf = new jsPDF('p', 'mm', 'a4')
    const pdfWidth = pdf.internal.pageSize.getWidth()
    const pdfHeight = pdf.internal.pageSize.getHeight()

    pdf.addImage(dataUrl, 'PNG', 0, 0, pdfWidth, pdfHeight, '', 'FAST')
    return pdf.output('blob')
  }

  const renderFormPage = () => {
    if (currentPage === 1) {
      return (
        <FormPageOne
          formData={formData}
          handleChange={handleChange}
          handleArrayChange={handleArrayChange}
          errors={errors}
          educationType={formType}
        />
      )
    }
    return (
// FIX: Pass 'handleArrayChange' prop to FormPageTwo as it's required by its props interface. Although it seems unused, this fixes the compile error. A better fix would be to remove it from FormPageTwoProps if truly unused. But for now, we pass it. The error description says it's missing but required. Wait, it's better to remove it from props.
// FIX: Removed 'handleArrayChange' from FormPageTwoProps as it is not used by the component.
      <FormPageTwo
        formData={formData}
        handleChange={handleChange}
        handleDepartmentToggle={handleDepartmentToggle}
        errors={errors}
        departments={departments}
        formType={formType}
      />
    )
  }

  const formTitle = `فۆڕمی تۆمارکردن - بەشی ${getEducationTypeText()}`

  if (submissionStatus === 'success') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col items-center justify-center p-6 text-center">
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 md:p-12 max-w-2xl w-full animate-fade-in-up">
          <div className="w-20 h-20 bg-gradient-to-r from-green-400 to-blue-500 rounded-full mx-auto flex items-center justify-center mb-6 shadow-lg transform rotate-12">
            <svg
              className="w-12 h-12 text-white transform -rotate-12"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            پیرۆزە!
          </h2>
          <p className="text-gray-600 text-lg mb-8">{submissionMessage}</p>
          <p className="text-sm text-gray-500 mb-8">
            فۆڕمەکەت بەشێوەی PDF داگیرا. تکایە پاشەکەوتی بکە بۆ بەکارهێنانی لە
            داهاتوودا.
          </p>
          <button
            onClick={onBack}
            className="group relative overflow-hidden bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-3 px-8 rounded-xl transition-all duration-300 flex items-center justify-center gap-3 shadow-xl shadow-blue-500/30 hover:shadow-2xl hover:shadow-blue-500/40 text-base transform hover:scale-105 mx-auto"
          >
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-white/0 via-white/10 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></span>
            <span className="relative">گەڕانەوە بۆ سەرەتا</span>
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-gradient-to-br from-gray-50 via-blue-50 to-gray-50 min-h-screen">
      <div className="relative isolate overflow-hidden">
        <svg
          className="absolute inset-0 -z-10 h-full w-full stroke-blue-200/40 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]"
          aria-hidden="true"
        >
          <defs>
            <pattern
              id="0787a7c5-978c-4f66-83c7-11c213f99cb7"
              width={200}
              height={200}
              x="50%"
              y={-1}
              patternUnits="userSpaceOnUse"
            >
              <path d="M.5 200V.5H200" fill="none" />
            </pattern>
          </defs>
          <rect
            width="100%"
            height="100%"
            strokeWidth={0}
            fill="url(#0787a7c5-978c-4f66-83c7-11c213f99cb7)"
          />
        </svg>
      </div>
      <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/60 backdrop-blur-xl border border-gray-100 rounded-3xl shadow-2xl p-4 sm:p-6 mb-8">
            <div className="text-center">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                {formTitle}
              </h1>
              <p className="text-gray-600">
                تکایە هەموو خانەکان بە وردی پڕبکەرەوە
              </p>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5 mt-6">
              <div
                className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2.5 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${currentPage === 1 ? '50%' : '100%'}` }}
              ></div>
            </div>
          </div>

          <div className="bg-white/60 backdrop-blur-xl border border-gray-100 rounded-3xl shadow-2xl p-4 sm:p-6 lg:p-8">
            {renderFormPage()}
            <div className="mt-10 flex flex-col-reverse sm:flex-row items-center justify-between gap-4">
              {currentPage === 1 ? (
                <button
                  type="button"
                  onClick={onBack}
                  className="bg-gray-200 text-gray-800 font-bold py-3 px-8 rounded-xl hover:bg-gray-300 transition-all duration-300 w-full sm:w-auto"
                >
                  گەڕانەوە
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handlePrevPage}
                  className="bg-gray-200 text-gray-800 font-bold py-3 px-8 rounded-xl hover:bg-gray-300 transition-all duration-300 w-full sm:w-auto"
                >
                  پێشوو
                </button>
              )}
              {currentPage === 1 ? (
                <button
                  type="button"
                  onClick={handleNextPage}
                  className="group w-full sm:w-auto relative overflow-hidden bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-3 px-8 rounded-xl transition-all duration-300 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl"
                >
                  <span className="relative">دواتر</span>
                  <ArrowRight
                    size={20}
                    className="relative rotate-180 group-hover:translate-x-1 transition-transform"
                  />
                </button>
              ) : (
                <button
                  type="submit"
                  onClick={handleSubmit}
                  disabled={isLoading}
                  className="group w-full sm:w-auto relative overflow-hidden bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold py-3 px-8 rounded-xl transition-all duration-300 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
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
                      <span>ناردن...</span>
                    </>
                  ) : (
                    <>
                      <span className="relative">ناردن و دروستکردنی PDF</span>
                    </>
                  )}
                </button>
              )}
            </div>
            {submissionStatus === 'error' && (
              <div className="mt-6 bg-red-50 border-l-4 border-red-400 p-4 rounded-r-lg">
                <p className="text-red-700 font-semibold">
                  {submissionMessage}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
      <div style={{ position: 'fixed', left: '-9999px', top: 0 }}>
        <PDFTemplate ref={pdfRef} formData={formData} formType={formType} departments={departments} />
      </div>
      <Footer />
    </div>
  )
}
