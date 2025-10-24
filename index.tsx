import React, { useEffect, useState, useRef } from 'react'
import { createRoot } from 'react-dom/client'
import { jsPDF } from 'jspdf'
import { toPng } from 'html-to-image'
import saveAs from 'file-saver'

// FIX: Define a type for the form data to provide strong typing for props and fix property access errors.
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
}

// FIX: Define props for FormContent component to fix TypeScript errors.
interface FormContentProps {
  formData: FormData
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleArrayChange: (arrayName: string, index: number, value: string) => void
  // FIX: Changed errors prop from optional to required to match its usage and prevent type errors.
  errors: { [key: string]: string }
}

// Form content component moved outside to prevent re-creation on each render
const FormContent: React.FC<FormContentProps> = ({
  formData,
  handleChange,
  handleArrayChange,
  // FIX: Removed default value '{}' for errors, which was causing incorrect type inference.
  errors,
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
            />
            {errors.personalName && (
              <p className="text-red-500 text-xs mt-1">{errors.personalName}</p>
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
              <p className="text-red-500 text-xs mt-1">{errors.gender}</p>
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
            />
            {errors.birthYear && (
              <p className="text-red-500 text-xs mt-1">{errors.birthYear}</p>
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
            />
            {errors.address && (
              <p className="text-red-500 text-xs mt-1">{errors.address}</p>
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
            />
            {errors.cityArea && (
              <p className="text-red-500 text-xs mt-1">{errors.cityArea}</p>
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
            />
            {errors.neighborhood && (
              <p className="text-red-500 text-xs mt-1">
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
            />
            {errors.city && (
              <p className="text-red-500 text-xs mt-1">{errors.city}</p>
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
            />
            {errors.district && (
              <p className="text-red-500 text-xs mt-1">{errors.district}</p>
            )}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          <div className="form-group-modern">
            <label className="modern-label">ژ. مۆبایل (١)</label>
            <input
              type="text"
              name="phone1"
              value={formData.phone1}
              onChange={handleChange}
              className={`modern-input ${errors.phone1 ? 'border-red-500' : ''}`}
              placeholder="07XX XXX XXXX"
            />
            {errors.phone1 && (
              <p className="text-red-500 text-xs mt-1">{errors.phone1}</p>
            )}
          </div>
          <div className="form-group-modern">
            <label className="modern-label">ژ. مۆبایل (٢) (ئارەزوومەندانە)</label>
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
            <label className="modern-label">ئیمەیڵ (ئارەزوومەندانە)</label>
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
            />
            {errors.guardianName && (
              <p className="text-red-500 text-xs mt-1">
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
            />
            {errors.guardianRelation && (
              <p className="text-red-500 text-xs mt-1">
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
            />
            {errors.guardianOccupation && (
              <p className="text-red-500 text-xs mt-1">
                {errors.guardianOccupation}
              </p>
            )}
          </div>
          <div className="form-group-modern">
            <label className="modern-label">ژ.مۆبایل</label>
            <input
              type="text"
              name="guardianPhone"
              value={formData.guardianPhone || ''}
              onChange={handleChange}
              className={`modern-input ${errors.guardianPhone ? 'border-red-500' : ''}`}
              placeholder="07XX XXX XXXX"
            />
            {errors.guardianPhone && (
              <p className="text-red-500 text-xs mt-1">
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
            <div className="modern-badge">زانستی</div>
          </div>
          <div className="form-group-modern">
            <label className="modern-label">ساڵی دەرچوون</label>
            <input
              type="date"
              name="graduationYear"
              value={formData.graduationYear}
              onChange={handleChange}
              className={`modern-input text-right ${errors.graduationYear ? 'border-red-500' : ''}`}
            />
            {errors.graduationYear && (
              <p className="text-red-500 text-xs mt-1">
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
              <p className="text-red-500 text-xs mt-1">
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
              <p className="text-red-500 text-xs mt-1">{errors.examRound}</p>
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
              <p className="text-red-500 text-xs mt-1">
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
        <div className="bg-white rounded-xl border-2 border-red-200 p-6 shadow-md mb-6">
          <div className="flex items-start gap-3">
            <svg
              className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5"
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
            />
            {errors.province && (
              <p className="text-red-500 text-xs mt-1">{errors.province}</p>
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
            />
            {errors.education && (
              <p className="text-red-500 text-xs mt-1">{errors.education}</p>
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
            />
            {errors.district2 && (
              <p className="text-red-500 text-xs mt-1">{errors.district2}</p>
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
            />
            {errors.studyYear && (
              <p className="text-red-500 text-xs mt-1">{errors.studyYear}</p>
            )}
          </div>
        </div>
        <div className="modern-table-container mt-6">
          <div className="grid grid-cols-3 md:grid-cols-11 gap-2 pt-4 bg-gradient-to-br from-gray-50 to-gray-100">
            {formData.subjects.map((subject, i) => {
              const isReadOnly = i === 0 || i === 9 || i === 10
              const placeholderText = i > 0 && i < 9 ? `وانە ${i}` : ''

              if (i === 9 || i === 10) {
                return (
                  <div
                    key={i}
                    className="modern-table-cell flex h-full items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 font-bold"
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
                  readOnly={isReadOnly}
                  className={`modern-table-cell ${isReadOnly ? 'bg-gradient-to-br from-gray-100 to-gray-200 font-bold' : ''}`}
                  placeholder={placeholderText}
                />
              )
            })}
          </div>
          <div className="grid grid-cols-4 md:grid-cols-12 gap-2 pt-4 bg-gradient-to-br from-red-50 to-rose-50">
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
          <div className="grid grid-cols-4 md:grid-cols-12 gap-2 pt-4 bg-gradient-to-br from-red-50 to-rose-50">
            <div className="modern-table-label bg-gradient-to-br from-red-500 to-rose-600">
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
                className="modern-table-cell-colored border-red-200"
                placeholder="نمرە"
              />
            ))}
          </div>
          <div className="grid grid-cols-4 md:grid-cols-12 gap-2 pt-4 bg-gradient-to-br from-yellow-50 to-amber-50">
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
          <div className="grid grid-cols-4 md:grid-cols-12 gap-2 pt-4 bg-gradient-to-br from-yellow-50 to-amber-50">
            <div className="modern-table-label bg-gradient-to-br from-yellow-500 to-amber-600">
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
                className="modern-table-cell-colored border-yellow-200"
                placeholder="نمرە"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  </form>
)

// FIX: Define props for SecondFormContent component to fix TypeScript errors.
interface SecondFormContentProps {
  formData: FormData
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleArrayChange: (arrayName: string, index: number, value: string) => void
  handleDepartmentToggle: (departmentName: string) => void
  // FIX: Changed errors prop from optional to required to match its usage and prevent type errors.
  errors: { [key: string]: string }
}

const SecondFormContent: React.FC<SecondFormContentProps> = ({
  formData,
  handleChange,
  handleArrayChange,
  handleDepartmentToggle,
  // FIX: Removed default value '{}' for errors, which was causing incorrect type inference.
  errors,
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
              />
              {errors.instituteName && (
                <p className="text-red-500 text-xs mt-1">
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
              />
              {errors.directorName && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.directorName}
                </p>
              )}
            </div>
            <div className="form-group-modern">
              <label className="modern-label">ژ. تەلەفۆن</label>
              <input
                type="text"
                name="directorPhone"
                value={formData.directorPhone || ''}
                onChange={handleChange}
                className={`modern-input ${errors.directorPhone ? 'border-red-500' : ''}`}
                placeholder="07XX XXX XXXX"
              />
              {errors.directorPhone && (
                <p className="text-red-500 text-xs mt-1">
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
              />
              {errors.educationDirectorName && (
                <p className="text-red-500 text-xs mt-1">
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
              />
              {errors.decision && (
                <p className="text-red-500 text-xs mt-1">{errors.decision}</p>
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
            بەشەکانی پەیمانگە بۆ ساڵی خوێندنی (٢٠٢٥-٢٠٢٦)
          </span>
        </div>
      </div>
      <div className="modern-card-enhanced">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {[
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
          ].map((dept, i) => {
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
          <p className="text-red-500 text-xs mt-2 text-center">
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
            className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5"
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
            بە پێی ڕێنمایی و مەرجەکانی وەرگرتن، ژمارە (١٩٣٥٠) لە ڕێکەوتی
            (١٤/١٠/٢٠٢٥) بۆ ساڵی خوێندنی(٢٠٢٥ - ٢٠٢٦) بڕگەی یەکەم خاڵی (٧)،
            دەتوانیت (٣) هەڵبژاردن پڕبکەیتەوە، بەڵام بە گشتی هەڵبژاردنی یەکەم
            پێوەری سەرەکی وەرگرتنە و دوو هەڵبژاردنەکەی دیکە لە ئەگەری هەبوونی
            کورسی بەتاڵ لەو بەشانە و بە پێی داواکاری بەشەکە و کۆنمرەی فێرخواز و
            مەرجەکانی وەزارەتی خوێندنی باڵا، وەردەگیرێت.
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
            />
            {errors.certificate1 && (
              <p className="text-red-500 text-xs mt-1">
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
            />
            {errors.certificate2 && (
              <p className="text-red-500 text-xs mt-1">
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
            />
            {errors.certificate3 && (
              <p className="text-red-500 text-xs mt-1">
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
            />
            {errors.certificate4 && (
              <p className="text-red-500 text-xs mt-1">
                {errors.certificate4}
              </p>
            )}
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
        {errors.nationality2 && (
          <p className="text-red-500 text-xs -mt-4 mb-4">
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
            />
            {errors.nationalityNumber && (
              <p className="text-red-500 text-xs mt-1">
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
            />
            {errors.registrationNumber && (
              <p className="text-red-500 text-xs mt-1">
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
            />
            {errors.issueYearPlace && (
              <p className="text-red-500 text-xs mt-1">
                {errors.issueYearPlace}
              </p>
            )}
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
              className={`modern-input ${errors.familyCardNumber ? 'border-red-500' : ''}`}
              placeholder="ژمارەی کارت"
            />
            {errors.familyCardNumber && (
              <p className="text-red-500 text-xs mt-1">
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
            />
            {errors.familyCardIssuePlace && (
              <p className="text-red-500 text-xs mt-1">
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
            />
            {errors.familyCardIssueDate && (
              <p className="text-red-500 text-xs mt-1">
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
            />
            {errors.familyCode && (
              <p className="text-red-500 text-xs mt-1">{errors.familyCode}</p>
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
      '',
      'کۆنمرەی پۆلی ١٢',
      'ڕێژەی دەرچوون',
    ],
    firstGradesNumeric: Array(11).fill(''),
    firstGradesWritten: Array(11).fill(''),
    secondGradesNumeric: Array(11).fill(''),
    secondGradesWritten: Array(11).fill(''),
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
    guardianOccupation: '',
    guardianPhone: '',
    declaration: false,
    signatureDate: '',
    // Additional fields for second form
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
    // FIX: Add missing certificate fields to the initial state
    certificate1: '',
    certificate2: '',
    certificate3: '',
    certificate4: '',
  })
  const [isGenerating, setIsGenerating] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [showError, setShowError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
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

    // Sanitize text-like inputs to prevent XSS by escaping HTML tags
    if (type === 'text' || type === 'email' || type === 'date') {
      sanitizedValue = value.replace(/</g, '&lt;').replace(/>/g, '&gt;')
    }
    if (name === 'examTestNumbers') {
      // This specific field has its own numeric-only sanitization
      sanitizedValue = value.replace(/\D/g, '').slice(0, 13)
    }

    setFormData((prevState) => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : sanitizedValue,
    }))
  }
  const handleArrayChange = (
    arrayName: keyof FormData,
    index: number,
    value: string,
  ) => {
    setFormData((prevState) => {
      const newArray = [...(prevState[arrayName] as string[])]
      // Sanitize array inputs as well
      newArray[index] = value.replace(/</g, '&lt;').replace(/>/g, '&gt;')
      return {
        ...prevState,
        [arrayName]: newArray,
      }
    })
  }
  const handleDepartmentToggle = (departmentName: string) => {
    setFormData((prev) => {
      const selections = [...prev.departmentChoices]
      const existingIndex = selections.indexOf(departmentName)
      if (existingIndex > -1) {
        selections.splice(existingIndex, 1)
      } else if (selections.length < 3) {
        selections.push(departmentName)
      }
      return { ...prev, departmentChoices: selections }
    })
  }

  const handleNextStep = () => {
    setCurrentStep(2)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handlePreviousStep = () => {
    setCurrentStep(1)
    window.scrollTo({ top: 0, behavior: 'smooth' })
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
        quality: 0.95, // Reduced quality for smaller file size and better performance
        pixelRatio: 2, // Reduced from 3 to improve performance and stability on mobile
        backgroundColor: '#ffffff',
        fontEmbedCss: FONT_EMBED_CSS,
        cacheBust: true,
        style: { transform: 'scale(1)', transformOrigin: 'top left' },
      }

      // Capture first page
      console.log('Capturing first page...')
      if (!pageOnePrintRef.current)
        throw new Error('First page reference for PDF not found')
      await new Promise<void>((resolve) => setTimeout(() => resolve(), 500)) // Shorter wait
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
      if (!pageTwoPrintRef.current)
        throw new Error('Second page reference for PDF not found')
      await new Promise<void>((resolve) => setTimeout(() => resolve(), 500)) // Shorter wait
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

      // Use file-saver to handle the download across all browsers
      console.log('Generating Blob for file-saver...')
      const pdfBlob = pdf.output('blob')
      saveAs(pdfBlob, 'Kurdistan_Technical_Institute_Form.pdf')
      console.log('PDF download triggered via file-saver.')

      setShowSuccess(true)
    } catch (error) {
      console.error('PDF generation failed:', error)
      setErrorMessage(
        'دروستکردنی پی دی ئێف سەرکەوتوو نەبوو. تکایە دووبارە هەوڵ بدەوە.',
      )
      setShowError(true)
    } finally {
      setIsGenerating(false)
    }
  }

  const handleSubmit = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault()
    // Validation removed
    if (currentStep === 1) {
      handleNextStep()
    } else {
      generatePDF()
    }
  }

  return (
    <div
      className="min-h-screen bg-white rtl relative overflow-hidden font-bold"
      dir="rtl"
    >
      {/* Animated Background Blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none hidden">
        <div className="absolute top-20 left-20 w-64 h-64 sm:w-96 sm:h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 right-20 w-64 h-64 sm:w-96 sm:h-96 bg-fuchsia-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-20 left-40 w-64 h-64 sm:w-96 sm:h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>
      {/* Success/Error Notifications */}
      {showSuccess && (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 w-11/12 max-w-md bg-white border-r-4 border-emerald-500 text-gray-800 px-4 sm:px-8 py-3 sm:py-5 rounded-2xl shadow-2xl z-50 flex items-center animate-fade-in-up backdrop-blur-sm">
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
            پی دی ئێف بە سەرکەوتوویی داگیرا!
          </span>
        </div>
      )}
      {showError && (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 w-11/12 max-w-md bg-white border-r-4 border-rose-500 text-gray-800 px-4 sm:px-8 py-3 sm:py-5 rounded-2xl shadow-2xl z-50 flex items-center animate-fade-in-up backdrop-blur-sm">
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
              {errorMessage}
            </p>
          </div>
        </div>
      )}

      {/* Mobile/Tablet Header (UI Only) */}
      <header
        className="bg-white/80 backdrop-blur-md shadow-md sticky top-0 z-20"
        dir="rtl"
      >
        <div className="mx-auto px-[5px] py-3">
          <div className="flex items-center gap-3">
            <img
              src="https://tse3.mm.bing.net/th/id/OIP.QmR4OtGs_XHKX4sjiPJrxwHaHa?rs=1&pid=ImgDetMain&o=7&rm=3"
              alt="Logo"
              className="h-12 drop-shadow-lg"
            />
            <div className="text-black font-bold text-right">
              <p className="tracking-wide text-sm sm:text-base">
                پەیمانگای تەکنیکی کوردستان
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="relative z-10 flex flex-col items-center px-[5px] py-4 md:py-8">
        {/* A4 Page Container - Responsive for viewing, fixed for PDF */}
        <div className="w-full mx-auto">
          {currentStep === 1 ? (
            <div className="animate-fade-in-up">
              <div className="p-6 sm:p-8 flex flex-col min-h-[500px] sm:min-h-[600px]">
                {/* Header (Desktop UI and PDF) */}
                <div className="hidden shrink-0 mb-6">
                  <div className="modern-header-border">
                    <div className="flex justify-center items-start gap-4">
                      <div className="text-center flex-1 mx-4">
                        <img
                          src="https://tse3.mm.bing.net/th/id/OIP.QmR4OtGs_XHKX4sjiPJrxwHaHa?rs=1&pid=ImgDetMain&o=7&rm=3"
                          alt="Logo"
                          className="h-16 mx-auto mb-3 drop-shadow-lg"
                        />
                        <div className="text-black font-bold text-base">
                          <p className="tracking-wide">
                            KURDISTAN TECHNICAL INSTITUTE
                          </p>
                        </div>
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
                    errors={errors}
                  />
                </div>
                {/* Footer (Desktop UI and PDF) */}
                <div className="hidden shrink-0 mt-6 pt-6 modern-footer-border">
                  <div className="flex flex-col items-center gap-4 text-sm">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-4 w-full max-w-4xl">
                      <div className="modern-contact-card">
                        <svg
                          className="w-6 h-6 text-red-600 flex-shrink-0"
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
                        <span
                          className="font-medium text-black text-center"
                          dir="ltr"
                        >
                          07729112121
                        </span>
                      </div>
                      <div className="modern-contact-card">
                        <svg
                          className="w-6 h-6 text-red-600 flex-shrink-0"
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
                        <span
                          className="font-medium text-black text-center"
                          dir="ltr"
                        >
                          07519112121
                        </span>
                      </div>
                      <div className="modern-contact-card">
                        <svg
                          className="w-6 h-6 text-red-600 flex-shrink-0"
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
                        <span
                          className="font-medium text-black text-center"
                          dir="ltr"
                        >
                          www.kti.edu.iq
                        </span>
                      </div>
                      <div className="modern-contact-card">
                        <svg
                          className="w-6 h-6 text-red-600 flex-shrink-0"
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
                        <span
                          className="font-medium text-black text-center"
                          dir="ltr"
                        >
                          tomar@kti.edu.iq
                        </span>
                      </div>
                    </div>
                    <p className="text-center text-sm text-gray-600 tracking-wide mt-2">
                      Kurdistan Technical Institute - Sulaymaniyah Heights,
                      Kurdistan Region - Iraq
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="animate-fade-in-up">
              <div className="p-6 sm:p-8 flex flex-col min-h-[500px] sm:min-h-[600px]">
                <div className="flex-grow">
                  <SecondFormContent
                    formData={formData}
                    handleChange={handleChange}
                    handleArrayChange={handleArrayChange}
                    handleDepartmentToggle={handleDepartmentToggle}
                    errors={errors}
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
              className="w-full sm:w-auto bg-gray-500 hover:bg-gray-600 text-white px-6 sm:px-10 py-3 sm:py-4 rounded-xl font-bold text-sm sm:text-base md:text-lg flex items-center justify-center transform hover:scale-105 transition-all duration-300"
            >
              گەڕانەوە
            </button>
          )}
          <button
            onClick={handleSubmit}
            type="submit"
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
                  <span>دروستکردنی پی دی ئێف...</span>
                </>
              ) : currentStep === 1 ? (
                <>
                  <span>هەنگاوی دواتر</span>
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
                  <span>دروستکردنی پی دی ئێف</span>
                </>
              )}
            </div>
          </button>
        </div>
      </main>

      {/* Mobile/Tablet Footer (UI Only) */}
      <footer className="bg-white/80 backdrop-blur-md mt-8 py-8 px-[5px] border-t-4 border-red-500">
        <div className="mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="modern-contact-card flex-row-reverse justify-center">
              <svg
                className="w-6 h-6 text-red-600 flex-shrink-0"
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
              <span className="font-medium text-black text-center" dir="ltr">
                07729112121
              </span>
            </div>
            <div className="modern-contact-card flex-row-reverse justify-center">
              <svg
                className="w-6 h-6 text-red-600 flex-shrink-0"
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
              <span className="font-medium text-black text-center" dir="ltr">
                07519112121
              </span>
            </div>
            <div className="modern-contact-card flex-row-reverse justify-center">
              <svg
                className="w-6 h-6 text-red-600 flex-shrink-0"
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
              <span className="font-medium text-black text-center" dir="ltr">
                www.kti.edu.iq
              </span>
            </div>
            <div className="modern-contact-card flex-row-reverse justify-center">
              <svg
                className="w-6 h-6 text-red-600 flex-shrink-0"
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
              <span className="font-medium text-black text-center" dir="ltr">
                tomar@kti.edu.iq
              </span>
            </div>
          </div>
          <p className="text-center text-sm text-gray-600 tracking-wide mt-6">
          پەیمانگای تەکنیکی کوردستان - بەرزاییەکانی سلێمانی، هەرێمی کوردستان - عێراق
          </p>
        </div>
      </footer>

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
            height: 'auto',
            minHeight: '297mm',
            boxSizing: 'border-box',
            padding: '3mm',
          }}
        >
          <div className="flex flex-col flex-grow">
            {/* Header */}
            <div className="shrink-0 mb-4">
              <div className="border-b-2 border-red-500 pb-3 mb-2">
                <div className="flex justify-between items-start">
                  <div className="border-2 border-red-500 rounded-lg p-2 w-20 h-24 flex items-center justify-center">
                    <p className="text-sm text-gray-600 text-center">
                      وێنەی فێرخواز
                    </p>
                  </div>
                  <div className="text-center flex-1 mx-3">
                    <img
                      src="https://tse3.mm.bing.net/th/id/OIP.QmR4OtGs_XHKX4sjiPJrxwHaHa?rs=1&pid=ImgDetMain&o=7&rm=3"
                      alt="Logo"
                      className="h-20 mx-auto mb-2"
                    />
                    <div className="text-black font-bold text-lg">
                      <p>KURDISTAN TECHNICAL INSTITUTE</p>
                    </div>
                  </div>
                  <div className="text-right text-base text-blue-700 w-36 flex-shrink-0">
                    <p className="font-semibold">هەرێمی کوردستان - عێراق</p>
                    <p>وەزارەتی خوێندنی باڵا</p>
                    <p>پەیمانگەی تەکنیکی کوردستان</p>
                  </div>
                </div>
              </div>
            </div>
            {/* Form Content */}
            <div className="flex-grow min-h-0">
              <div className="space-y-2">
                {/* Personal Info */}
                <div>
                  <div className="section-header-modern text-white text-center py-3 text-lg">
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
                {/* Education Info */}
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
                        <div className="badge-red py-3 text-base">زانستی</div>
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
                {/* Grades Info */}
                <div>
                  <div className="section-header-modern text-white text-center py-3 text-lg">
                    <span className="font-bold tracking-wider">
                      زانیاری سەبارەت بە نمرەی فێرخواز
                    </span>
                  </div>
                  <div className="modern-card p-4 space-y-3">
                    <div className="bg-white border border-red-200 rounded-lg p-3">
                      <p className="text-gray-800 text-base leading-normal">
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
                    <div
                      className="table-container mt-1"
                      style={{ overflowX: 'visible' }}
                    >
                      <div className="grid grid-cols-11 gap-0.5 pt-1 bg-gray-50">
                        {formData.subjects.map((subject, i) => {
                          const isReadOnly = i === 0 || i === 9 || i === 10
                          const placeholderText =
                            i > 0 && i < 9 ? `وانە ${i}` : ''
                          if (i === 9 || i === 10) {
                            return (
                              <div
                                key={i}
                                className="table-cell bg-gray-100 font-bold text-sm p-1.5 text-center flex items-center justify-center"
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
                              readOnly
                              className={`table-cell ${isReadOnly ? 'bg-gray-100 font-bold' : ''} text-sm p-1.5`}
                              placeholder={placeholderText}
                            />
                          )
                        })}
                      </div>
                      <div className="grid grid-cols-12 gap-0.5 pt-1 bg-red-50">
                        <div className="table-label-red text-base py-2">
                          بە ژمارە
                        </div>
                        {formData.firstGradesNumeric.map((grade, i) => (
                          <input
                            key={i}
                            type="text"
                            value={grade}
                            readOnly
                            className="table-cell-red h-9 text-sm p-1.5"
                            placeholder="نمرە"
                          />
                        ))}
                      </div>
                      <div className="grid grid-cols-12 gap-0.5 pt-1 bg-red-50">
                        <div className="table-label-red text-base py-2">
                          بە نووسین
                        </div>
                        {formData.firstGradesWritten.map((grade, i) => (
                          <input
                            key={i}
                            type="text"
                            value={grade}
                            readOnly
                            className="table-cell-red h-9 text-sm p-1.5"
                            placeholder="نمرە"
                          />
                        ))}
                      </div>
                      <div className="grid grid-cols-12 gap-0.5 pt-1 bg-yellow-50">
                        <div className="table-label-yellow text-base py-2">
                          خولی دووەم
                        </div>
                        {formData.secondGradesNumeric.map((grade, i) => (
                          <input
                            key={i}
                            type="text"
                            value={grade}
                            readOnly
                            className="table-cell-yellow h-9 text-sm p-1.5"
                            placeholder="نمرە"
                          />
                        ))}
                      </div>
                      <div className="grid grid-cols-12 gap-0.5 pt-1 bg-yellow-50">
                        <div className="table-label-yellow text-base py-2">
                          بە نووسین
                        </div>
                        {formData.secondGradesWritten.map((grade, i) => (
                          <input
                            key={i}
                            type="text"
                            value={grade}
                            readOnly
                            className="table-cell-yellow h-9 text-sm p-1.5"
                            placeholder="نمرە"
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Footer */}
            <div className="shrink-0 mt-auto pt-4 border-t-2 border-red-500">
              <div className="grid grid-cols-4 gap-3 text-base mb-3">
                <div className="flex items-center justify-center gap-2 bg-white p-3 rounded-lg border border-gray-200">
                  <span className="font-medium text-black" dir="ltr">
                    07729112121
                  </span>
                  <svg
                    className="w-4 h-4 text-red-600 flex-shrink-0"
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
                </div>
                <div className="flex items-center justify-center gap-2 bg-white p-3 rounded-lg border border-gray-200">
                  <span className="font-medium text-black" dir="ltr">
                    07519112121
                  </span>
                  <svg
                    className="w-4 h-4 text-red-600 flex-shrink-0"
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
                </div>
                <div className="flex items-center justify-center gap-2 bg-white p-3 rounded-lg border border-gray-200">
                  <span className="font-medium text-black" dir="ltr">
                    www.kti.edu.iq
                  </span>
                  <svg
                    className="w-4 h-4 text-red-600 flex-shrink-0"
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
                </div>
                <div className="flex items-center justify-center gap-2 bg-white p-3 rounded-lg border border-gray-200">
                  <span className="font-medium text-black" dir="ltr">
                    tomar@kti.edu.iq
                  </span>
                  <svg
                    className="w-4 h-4 text-red-600 flex-shrink-0"
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
                </div>
              </div>
              <p className="text-center text-base text-gray-600">
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
            height: 'auto',
            minHeight: '297mm',
            boxSizing: 'border-box',
            padding: '3mm',
          }}
        >
          <div className="flex flex-col flex-grow">
            <div className="flex-grow min-h-0 space-y-3">
              {/* Top Two Sections */}
              <div className="grid grid-cols-2 gap-2">
                {/* Right Section */}
                <div>
                  <div className="section-header-modern text-white text-center py-3 text-lg">
                    <span className="font-bold tracking-wider">
                      خانەی تایبەت بە بەڕێوەبەری خوێندنگە
                    </span>
                  </div>
                  <div className="modern-card p-4 space-y-3">
                    <div className="form-group">
                      <label className="form-label text-base">
                        ناوی خوێندنگە
                      </label>
                      <input
                        type="text"
                        name="instituteName"
                        value={formData.instituteName || ''}
                        readOnly
                        className="form-input h-9 text-base"
                        placeholder="ناوی خوێندنگە"
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label text-base">
                        ناوی بەڕێوەبەر
                      </label>
                      <input
                        type="text"
                        name="directorName"
                        value={formData.directorName || ''}
                        readOnly
                        className="form-input h-9 text-base"
                        placeholder="ناوی بەڕێوەبەر"
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label text-base">
                        ژ. تەلەفۆن
                      </label>
                      <input
                        type="text"
                        name="directorPhone"
                        value={formData.directorPhone || ''}
                        readOnly
                        className="form-input h-9 text-base"
                        placeholder="07XX XXX XXXX"
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label text-center text-base">
                        واژۆ و ڕێکەوت و مۆر
                      </label>
                      <div className="border-2 border-gray-300 rounded-lg bg-gray-50 h-24"></div>
                    </div>
                  </div>
                </div>
                {/* Left Section */}
                <div>
                  <div className="section-header-modern text-white text-center py-3 text-lg">
                    <span className="font-bold tracking-wider">
                      پەسەندکردن و پشتڕاستکردنەوەی نمرەکان
                    </span>
                  </div>
                  <div className="modern-card p-4 space-y-3">
                    <div className="text-center">
                      <p className="form-label text-base font-bold">
                        لە بەڕێوەبەرێتی پەروەردەی ڕۆژئاوا / ڕۆژهەڵات
                      </p>
                    </div>
                    <div className="form-group">
                      <label className="form-label text-base">
                        ناوی بەڕێوەبەرێتی
                      </label>
                      <input
                        type="text"
                        name="educationDirectorName"
                        value={formData.educationDirectorName || ''}
                        readOnly
                        className="form-input h-9 text-base"
                        placeholder="ناوی بەڕێوەبەرێتی"
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label text-base">قەزا</label>
                      <input
                        type="text"
                        name="decision"
                        value={formData.decision || ''}
                        readOnly
                        className="form-input h-9 text-base"
                        placeholder="قەزا..."
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label text-center text-base">
                        واژۆ و مۆر
                      </label>
                      <div className="border-2 border-gray-300 rounded-lg bg-gray-50 h-24"></div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Department Selection */}
              <div>
                <div className="section-header-blue text-white text-center py-3 text-lg">
                  <span className="font-bold tracking-wider">
                    بەشەکانی پەیمانگە بۆ ساڵی خوێندنی (٢٠٢٥-٢٠٢٦)
                  </span>
                </div>
                <div className="modern-card p-4">
                  <div className="grid grid-cols-3 gap-x-4 gap-y-2">
                    {[
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
                    ].map((dept, i) => {
                      const selectionIndex =
                        formData.departmentChoices.indexOf(dept)
                      const isSelected = selectionIndex !== -1
                      return (
                        <div
                          key={i}
                          className={`flex items-center gap-1.5 p-2 rounded-md ${isSelected ? 'bg-red-100' : ''}`}
                        >
                          <div
                            className={`w-5 h-5 rounded-md border border-red-600 flex items-center justify-center flex-shrink-0 ${isSelected ? 'bg-white' : ''}`}
                          >
                            {isSelected && (
                              <span className="font-bold text-red-700 text-xs">
                                {selectionIndex + 1}
                              </span>
                            )}
                          </div>
                          <span className="text-base font-medium">{dept}</span>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
              {/* Medical Declaration */}
              <div>
                <div className="section-header-modern text-white text-center py-3 text-lg">
                  <span className="font-bold tracking-wider">
                    ئەو بەشەی دەتەوێت تێیدا بخوێنیت
                  </span>
                </div>
                <div className="modern-card p-4">
                  <p className="text-base leading-normal text-gray-800">
                    بە پێی ڕێنمایی و مەرجەکانی وەرگرتن، ژمارە (١٩٣٥٠) لە ڕێکەوتی
                    (١٤/١٠/٢٠٢٥) بۆ ساڵی خوێندنی(٢٠٢٥ - ٢٠٢٦) بڕگەی یەکەم خاڵی
                    (٧)، دەتوانیت (٣) هەڵبژاردن پڕبکەیتەوە، بەڵام بە گشتی
                    هەڵبژاردنی یەکەم پێوەری سەرەکی وەرگرتنە و دوو هەڵبژاردنەکەی
                    دیکە لە ئەگەری هەبوونی کورسی بەتاڵ لەو بەشانە و بە پێی
                    داواکاری بەشەکە و کۆنمرەی فێرخواز و مەرجەکانی وەزارەتی
                    خوێندنی باڵا، وەردەگیرێت.
                  </p>
                </div>
              </div>
              {/* Certificate Section */}
              <div>
                <div className="section-header-blue text-white text-center py-3 text-lg">
                  <span className="font-bold tracking-wider">
                    ناسنامەی باری شارستانی
                  </span>
                </div>
                <div className="modern-card p-4 space-y-3">
                  <div className="grid grid-cols-4 gap-2">
                    <div className="form-group">
                      <label className="form-label text-base">
                        ژمارەی ناسنامە
                      </label>
                      <input
                        type="text"
                        name="certificate1"
                        value={formData.certificate1 || ''}
                        readOnly
                        className="form-input h-9 text-base"
                        placeholder="..."
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label text-base">
                        ژمارەی تۆمار
                      </label>
                      <input
                        type="text"
                        name="certificate2"
                        value={formData.certificate2 || ''}
                        readOnly
                        className="form-input h-9 text-base"
                        placeholder="..."
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label text-base">
                        ژمارەی لاپەڕە
                      </label>
                      <input
                        type="text"
                        name="certificate3"
                        value={formData.certificate3 || ''}
                        readOnly
                        className="form-input h-9 text-base"
                        placeholder="..."
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label text-base">
                        شوێنی دەرچوون
                      </label>
                      <input
                        type="text"
                        name="certificate4"
                        value={formData.certificate4 || ''}
                        readOnly
                        className="form-input h-9 text-base"
                        placeholder="..."
                      />
                    </div>
                  </div>
                </div>
              </div>
              {/* Nationality Section */}
              <div>
                <div className="section-header-gray text-white text-center py-3 text-lg">
                  <span className="font-bold tracking-wider">ڕەگەزنامە</span>
                </div>
                <div className="modern-card p-4 space-y-3">
                  <div className="flex gap-4">
                    <div
                      className={`flex items-center gap-1.5 p-1 rounded-md ${formData.nationality2 === 'iraqi' ? 'bg-red-100' : ''}`}
                    >
                      <div className="w-3 h-3 rounded-full border border-red-600 flex items-center justify-center">
                        {formData.nationality2 === 'iraqi' && (
                          <div className="w-1.5 h-1.5 rounded-full bg-red-600"></div>
                        )}
                      </div>
                      <span className="text-base">عێراقی</span>
                    </div>
                    <div
                      className={`flex items-center gap-1.5 p-1 rounded-md ${formData.nationality2 === 'other' ? 'bg-red-100' : ''}`}
                    >
                      <div className="w-3 h-3 rounded-full border border-red-600 flex items-center justify-center">
                        {formData.nationality2 === 'other' && (
                          <div className="w-1.5 h-1.5 rounded-full bg-red-600"></div>
                        )}
                      </div>
                      <span className="text-base">هی تر</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <div className="form-group">
                      <label className="form-label text-base">
                        ژمارەی ڕەگەزنامە
                      </label>
                      <input
                        type="text"
                        name="nationalityNumber"
                        value={formData.nationalityNumber || ''}
                        readOnly
                        className="form-input h-9 text-base"
                        placeholder="ژمارەی ڕەگەزنامە"
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label text-base">
                        ژمارەی تۆمار
                      </label>
                      <input
                        type="text"
                        name="registrationNumber"
                        value={formData.registrationNumber || ''}
                        readOnly
                        className="form-input h-9 text-base"
                        placeholder="ژمارەی تۆمار"
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label text-base">
                        ساڵ و شوێنی دەرچوون
                      </label>
                      <input
                        type="text"
                        name="issueYearPlace"
                        value={formData.issueYearPlace || ''}
                        readOnly
                        className="form-input h-9 text-base"
                        placeholder="ساڵ و شوێن..."
                      />
                    </div>
                  </div>
                </div>
              </div>
              {/* Family Card Section */}
              <div>
                <div className="section-header-gray text-white text-center py-3 text-lg">
                  <span className="font-bold tracking-wider">
                    کارتی نیشتیمانی
                  </span>
                </div>
                <div className="modern-card p-4 space-y-3">
                  <div className="grid grid-cols-4 gap-2">
                    <div className="form-group">
                      <label className="form-label text-base">
                        ژمارەی کارت
                      </label>
                      <input
                        type="text"
                        name="familyCardNumber"
                        value={formData.familyCardNumber || ''}
                        readOnly
                        className="form-input h-9 text-base"
                        placeholder="ژمارەی کارت"
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label text-base">
                        شوێنی دەرچوون
                      </label>
                      <input
                        type="text"
                        name="familyCardIssuePlace"
                        value={formData.familyCardIssuePlace || ''}
                        readOnly
                        className="form-input h-9 text-base"
                        placeholder="شوێنی دەرچوون"
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label text-base">
                        ڕێکەوتی دەرچوون
                      </label>
                      <input
                        type="date"
                        name="familyCardIssueDate"
                        value={formData.familyCardIssueDate || ''}
                        readOnly
                        className="form-input h-9 text-base text-right"
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label text-base">
                        کۆدی خێزانی
                      </label>
                      <input
                        type="text"
                        name="familyCode"
                        value={formData.familyCode || ''}
                        readOnly
                        className="form-input h-9 text-base"
                        placeholder="کۆدی خێزانی"
                      />
                    </div>
                  </div>
                </div>
              </div>
              {/* Bottom Signature Section */}
              <div className="grid grid-cols-2 gap-2 mt-auto pt-4">
                <div className="modern-card p-4">
                  <label className="block text-gray-700 font-bold text-center text-lg mb-2">
                    ناوی سیانی فێرخواز
                  </label>
                  <div className="border-t-2 border-gray-400 mt-8"></div>
                </div>
                <div className="modern-card p-4">
                  <label className="block text-gray-700 font-bold text-center text-lg mb-2">
                    ڕێکەوت / واژۆ
                  </label>
                  <div className="border-t-2 border-gray-400 mt-8"></div>
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
