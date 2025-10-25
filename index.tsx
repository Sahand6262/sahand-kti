import React, { useEffect, useState, useRef } from 'react'
import { createRoot } from 'react-dom/client'
import { jsPDF } from 'jspdf'
import { toPng } from 'html-to-image'
import saveAs from 'file-saver'
import { GoogleGenAI } from '@google/genai'

// ==================================================================
// START: CODE FOR /hello ADMIN PAGE
// ==================================================================

// --- TYPE DEFINITIONS ---
type Student = {
  id: number
  name: string
}
type AuthModalProps = {
  onAuthenticate: (id: string) => void
  isLoading: boolean
  error: string | null
}
type StudentListProps = {
  students: Student[]
  userHi: string
}

// --- SVG ICON COMPONENTS ---
const UserIcon = () => (
  <svg
    className="w-6 h-6"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
    />
  </svg>
)
const SearchIcon = () => (
  <svg
    className="w-5 h-5"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
    />
  </svg>
)
const ChevronLeftIcon = () => (
  <svg
    className="w-5 h-5"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      d="M15 19l-7-7 7-7"
    />
  </svg>
)
const ChevronRightIcon = () => (
  <svg
    className="w-5 h-5"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      d="M9 5l7 7-7 7"
    />
  </svg>
)
const SparklesIcon = () => (
  <svg
    className="w-5 h-5"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
    />
  </svg>
)
const UsersIcon = () => (
  <svg
    className="w-6 h-6"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
    />
  </svg>
)
const FilterIcon = () => (
  <svg
    className="w-6 h-6"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293.707L3.293 7.293A1 1 0 013 6.586V4z"
    />
  </svg>
)
const DocumentIcon = () => (
  <svg
    className="w-6 h-6"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
    />
  </svg>
)

// --- AUTHENTICATION MODAL ---
const AuthModal: React.FC<AuthModalProps> = ({
  onAuthenticate,
  isLoading,
  error,
}) => {
  const [userHi, setUserHi] = useState('')

  const attemptLogin = () => {
    if (userHi.trim() && !isLoading) {
      onAuthenticate(userHi)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    attemptLogin()
  }

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-white via-gray-50 to-white flex items-center justify-center p-4 z-50">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(0,0,0,0.03),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(0,0,0,0.03),transparent_50%)]" />
      <div className="w-full max-w-md relative animate-fade-in" dir="rtl">
        <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 p-10">
          <div className="text-center mb-10">
            <div className="relative inline-block mb-6">
              <div className="absolute inset-0 bg-black rounded-2xl blur-xl opacity-20 animate-pulse-slow" />
              <div className="relative w-16 h-16 bg-black rounded-2xl flex items-center justify-center text-white shadow-lg transform hover:scale-105 transition-transform">
                <UserIcon />
              </div>
            </div>
            <h2 className="text-3xl font-bold text-black mb-3 tracking-tight">
              تکایە ناسنامەکەت بنووسە
            </h2>
            <p className="text-gray-600 text-base">بۆ بینینی لیستی فێرخوازان</p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="relative group">
              <input
                id="user_hi"
                type="text"
                value={userHi}
                onChange={(e) => setUserHi(e.target.value)}
                className="w-full px-5 py-4 text-center bg-gray-50 border-2 border-gray-200 rounded-xl text-lg text-black placeholder-gray-400 focus:outline-none focus:border-black focus:bg-white transition-all duration-300 group-hover:border-gray-300"
                placeholder="ناسنامە"
                autoFocus
                required
              />
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-black to-gray-800 opacity-0 group-focus-within:opacity-5 transition-opacity pointer-events-none" />
            </div>
            {error && (
              <div className="bg-red-50 border-2 border-red-100 rounded-xl p-4 animate-shake text-center">
                <p className="text-red-600 text-sm font-medium mb-3">
                  {error}
                </p>
                <button
                  type="button"
                  onClick={attemptLogin}
                  disabled={isLoading || !userHi.trim()}
                  className="bg-red-100 text-red-700 px-4 py-2 rounded-lg font-semibold text-sm hover:bg-red-200 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? 'دووبارە...' : 'دووبارە هەوڵبدەوە'}
                </button>
              </div>
            )}
            <button
              type="submit"
              disabled={isLoading || !userHi.trim()}
              className="w-full bg-black text-white px-5 py-4 rounded-xl font-semibold text-lg hover:bg-gray-900 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 active:translate-y-0"
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  دڵنیابوونەوە...
                </span>
              ) : (
                'چوونەژوورەوە'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

// --- PAGINATION COMPONENT ---
const Pagination: React.FC<{
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}> = ({ currentPage, totalPages, onPageChange }) => {
  const getPageNumbers = () => {
    const pages = []
    const showPages = 5
    let startPage = Math.max(1, currentPage - Math.floor(showPages / 2))
    let endPage = Math.min(totalPages, startPage + showPages - 1)
    if (endPage - startPage < showPages - 1) {
      startPage = Math.max(1, endPage - showPages + 1)
    }
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i)
    }
    return pages
  }
  return (
    <div className="flex items-center justify-center gap-3 mt-16" dir="ltr">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="p-3 bg-white border-2 border-gray-200 text-gray-700 hover:border-black hover:text-black transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:border-gray-200 disabled:hover:text-gray-700 rounded-xl shadow-sm hover:shadow-md transform hover:-translate-y-0.5"
      >
        <ChevronLeftIcon />
      </button>
      {getPageNumbers().map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`min-w-[3rem] px-4 py-3 font-semibold transition-all duration-300 rounded-xl text-base shadow-sm hover:shadow-md transform hover:-translate-y-0.5 ${currentPage === page ? 'bg-black text-white scale-105' : 'bg-white border-2 border-gray-200 text-gray-700 hover:border-black hover:text-black'}`}
        >
          {page}
        </button>
      ))}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="p-3 bg-white border-2 border-gray-200 text-gray-700 hover:border-black hover:text-black transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:border-gray-200 disabled:hover:text-gray-700 rounded-xl shadow-sm hover:shadow-md transform hover:-translate-y-0.5"
      >
        <ChevronRightIcon />
      </button>
    </div>
  )
}

// --- FOOTER COMPONENT ---
const Footer = () => {
  return (
    <footer className="relative mt-20 border-t-2 border-gray-100 bg-white/80 backdrop-blur-xl">
      <div className="container mx-auto px-6 py-8">
        <div className="flex flex-col items-center justify-center gap-3">
          <div className="flex items-center gap-2 text-gray-600" dir="ltr">
            <span className="text-base">Developed by</span>
            <span className="text-base font-bold text-black">SAHAND</span>
          </div>
          <p className="text-sm text-gray-500">© 2025 All rights reserved</p>
        </div>
      </div>
    </footer>
  )
}

// --- STUDENT LIST VIEW ---
const StudentList: React.FC<StudentListProps> = ({ students, userHi }) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [insights, setInsights] = useState<string | null>(null)
  const [isGeneratingInsights, setIsGeneratingInsights] = useState(false)
  const [insightsError, setInsightsError] = useState<string | null>(null)

  const itemsPerPage = 10
  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()),
  )
  const totalPages = Math.ceil(filteredStudents.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentStudents = filteredStudents.slice(startIndex, endIndex)

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }
  
  useEffect(() => {
    setCurrentPage(1)
  }, [searchTerm])

  const handleGenerateInsights = async () => {
    setIsGeneratingInsights(true)
    setInsightsError(null)
    setInsights(null)

    try {
      // FIX: The API key must be obtained from process.env.API_KEY.
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY })
      const studentNames = students.map((s) => s.name).join(', ')
      const prompt = `You are a data analyst. Analyze the following list of student names from Kurdistan and provide 3-4 interesting and brief insights. For example, what is the most common name, what is the average name length, or any other interesting patterns. Keep your response concise. Format the response strictly as a Markdown bulleted list. Do not include a header or any introductory text.
      Here is the list of names: ${studentNames}`

      const response = await ai.models.generateContent({
        // FIX: Use 'gemini-2.5-flash' for basic text tasks.
        model: 'gemini-2.5-flash',
        contents: prompt,
      })

      const text = response.text

      const htmlInsights = text
        .trim()
        .split('\n')
        .map((line) => line.replace(/^\s*[\*\-]\s/, '').trim())
        .map(
          (item) =>
            `<li class="flex items-start mb-2"><span class="mr-3 text-black text-xl mt-1">&#8226;</span><span class="text-gray-700 flex-1">${item}</span></li>`,
        )
        .join('')
      setInsights(`<ul class="text-left">${htmlInsights}</ul>`)
    } catch (error) {
      console.error('Error generating insights:', error)
      setInsightsError('Could not generate insights. Please try again.')
    } finally {
      setIsGeneratingInsights(false)
    }
  }

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-white flex flex-col"
      dir="rtl"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(0,0,0,0.03),transparent_50%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(0,0,0,0.03),transparent_50%)] pointer-events-none" />
      <header className="sticky top-0 z-20 bg-white/80 backdrop-blur-xl border-b-2 border-gray-100 shadow-sm">
        <div className="container mx-auto px-6 py-5 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-black rounded-xl flex items-center justify-center text-white">
              <SparklesIcon />
            </div>
            <h1 className="text-2xl font-bold text-black tracking-tight">
              لیستی فێرخوازان
            </h1>
          </div>
        </div>
      </header>
      <main className="container mx-auto p-6 max-w-7xl relative flex-grow">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-black to-gray-800 rounded-2xl blur-xl opacity-0 group-hover:opacity-10 transition-opacity" />
            <div className="relative bg-gradient-to-br from-white to-gray-50 border-2 border-gray-100 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 hover:border-black overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-black/5 rounded-full -mr-16 -mt-16 group-hover:bg-black transition-colors duration-300" />
              <div className="relative flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-black rounded-xl flex items-center justify-center text-white shadow-lg">
                  <UsersIcon />
                </div>
              </div>
              <p className="text-gray-600 text-sm font-semibold mb-2 uppercase tracking-wide">
                کۆی گشتی
              </p>
              <p className="text-5xl font-bold text-black">{students.length}</p>
            </div>
          </div>
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-black to-gray-800 rounded-2xl blur-xl opacity-0 group-hover:opacity-10 transition-opacity" />
            <div className="relative bg-gradient-to-br from-white to-gray-50 border-2 border-gray-100 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 hover:border-black overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-black/5 rounded-full -mr-16 -mt-16 group-hover:bg-black transition-colors duration-300" />
              <div className="relative flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-black rounded-xl flex items-center justify-center text-white shadow-lg">
                  <FilterIcon />
                </div>
              </div>
              <p className="text-gray-600 text-sm font-semibold mb-2 uppercase tracking-wide">
                ئەنجامی گەڕان
              </p>
              <p className="text-5xl font-bold text-black">
                {filteredStudents.length}
              </p>
            </div>
          </div>
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-black to-gray-800 rounded-2xl blur-xl opacity-0 group-hover:opacity-10 transition-opacity" />
            <div className="relative bg-gradient-to-br from-white to-gray-50 border-2 border-gray-100 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 hover:border-black overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-black/5 rounded-full -mr-16 -mt-16 group-hover:bg-black transition-colors duration-300" />
              <div className="relative flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-black rounded-xl flex items-center justify-center text-white shadow-lg">
                  <DocumentIcon />
                </div>
              </div>
              <p className="text-gray-600 text-sm font-semibold mb-2 uppercase tracking-wide">
                پەڕە
              </p>
              <p className="text-5xl font-bold text-black">
                {currentPage} / {totalPages || 1}
              </p>
            </div>
          </div>
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-black to-gray-800 rounded-2xl blur-xl opacity-0 group-hover:opacity-10 transition-opacity" />
            <div className="relative bg-gradient-to-br from-white to-gray-50 border-2 border-gray-100 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 hover:border-black overflow-hidden flex flex-col justify-center min-h-[196px]">
              <div className="absolute top-0 right-0 w-32 h-32 bg-black/5 rounded-full -mr-16 -mt-16 group-hover:bg-black transition-colors duration-300" />
              <div className="relative">
                {isGeneratingInsights ? (
                  <div className="flex flex-col items-center justify-center text-center">
                    <div className="w-8 h-8 border-2 border-black border-t-transparent rounded-full animate-spin" />
                    <p className="mt-4 text-gray-700 font-semibold text-sm">
                      Generating...
                    </p>
                  </div>
                ) : insightsError ? (
                  <div className="text-center">
                    <p className="text-red-600 text-sm font-medium mb-4">
                      {insightsError}
                    </p>
                    <button
                      onClick={handleGenerateInsights}
                      className="bg-black text-white px-4 py-2 rounded-lg font-semibold text-sm hover:bg-gray-800 transition-colors"
                    >
                      Try Again
                    </button>
                  </div>
                ) : insights ? (
                  <div dir="ltr">
                    <h3 className="font-bold text-black mb-3 text-lg text-center">
                      AI Insights
                    </h3>
                    <div
                      className="text-sm"
                      dangerouslySetInnerHTML={{ __html: insights }}
                    />
                  </div>
                ) : (
                  <>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 bg-black rounded-xl flex items-center justify-center text-white shadow-lg">
                        <SparklesIcon />
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm font-semibold mb-2 uppercase tracking-wide">
                      AI Insights
                    </p>
                    <p className="text-base font-bold text-black mb-4">
                      Analyze Student List
                    </p>
                    <button
                      onClick={handleGenerateInsights}
                      disabled={isGeneratingInsights}
                      className="w-full bg-black text-white px-4 py-3 rounded-xl font-semibold text-base hover:bg-gray-800 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 active:translate-y-0"
                    >
                      Generate
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="mb-10">
          <div className="relative group">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-14 pr-6 py-5 bg-white border-2 border-gray-200 rounded-2xl text-lg text-black placeholder-gray-400 focus:outline-none focus:border-black transition-all duration-300 shadow-lg focus:shadow-xl group-hover:border-gray-300"
              placeholder="گەڕان..."
            />
            <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-gray-400 group-focus-within:text-black transition-colors">
              <SearchIcon />
            </div>
          </div>
        </div>
        {currentStudents.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
              {currentStudents.map((student, index) => (
                <div
                  key={student.id}
                  className="relative group animate-fade-in-up"
                  style={{
                    animationDelay: `${index * 50}ms`,
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-black to-gray-800 rounded-2xl blur-xl opacity-0 group-hover:opacity-20 transition-opacity" />
                  <div className="relative bg-gradient-to-br from-white to-gray-50 border-2 border-gray-100 rounded-2xl p-6 hover:border-black transition-all duration-300 shadow-lg hover:shadow-2xl transform hover:-translate-y-2 overflow-hidden">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-black/5 rounded-full -mr-12 -mt-12 group-hover:bg-black transition-colors duration-300" />
                    <div className="relative flex flex-col items-center text-center h-full">
                      <div className="relative mb-5">
                        <div className="absolute inset-0 bg-black rounded-2xl blur-md opacity-0 group-hover:opacity-20 transition-opacity" />
                        <div className="relative w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center group-hover:from-black group-hover:to-gray-900 group-hover:text-white transition-all duration-300 shadow-md">
                          <UserIcon />
                        </div>
                      </div>
                      <div className="flex-grow flex flex-col justify-center">
                        <h3 className="text-lg font-bold text-black break-all mb-3 group-hover:scale-105 transition-transform">
                          {student.name}
                        </h3>
                        <div className="flex items-center gap-2 text-gray-500 text-sm justify-center">
                          <span className="font-mono" dir="ltr">
                            {student.id}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            )}
          </>
        ) : (
          <div className="text-center py-24 animate-fade-in">
            <div className="relative inline-block mb-8">
              <div className="absolute inset-0 bg-black rounded-2xl blur-2xl opacity-10" />
              <div className="relative w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl mx-auto flex items-center justify-center text-gray-400 shadow-lg">
                <SearchIcon />
              </div>
            </div>
            <p className="text-2xl text-black font-bold mb-2">
              هیچ فێرخوازێک نەدۆزرایەوە
            </p>
            <p className="text-gray-600 text-base">
              تکایە گەڕانی دیکە هەوڵ بدە
            </p>
          </div>
        )}
      </main>
      <Footer />
    </div>
  )
}

// --- MAIN HELLO PAGE APP COMPONENT ---
function HelloPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [userHi, setUserHi] = useState<string>('')
  const [students, setStudents] = useState<Student[]>([])
  const [token, setToken] = useState<string | null>(null)

  const API_ENDPOINT = `https://xn--salonvejgrd-58a.dk/public_html/api/single_api.php`

  const handleAuthenticate = async (enteredId: string) => {
    setIsLoading(true)
    setError(null)
    try {
      // Step 1: Login to get JWT
      const loginResponse = await fetch(API_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user_hi: enteredId }),
      })
      
      if (!loginResponse.ok) {
        let errorMessage = 'ناسنامەکە هەڵەیە یان ڕێگەپێنەدراوە'
        try {
          const errorResult = await loginResponse.json()
          errorMessage = errorResult.message || errorResult.error || errorMessage
        } catch (e) {
          // Response was not JSON, use default error message
        }
        throw new Error(errorMessage)
      }
      
      const loginResult = await loginResponse.json()
      if (!loginResult.success || !loginResult.token) {
        const errorMessage = loginResult.message || loginResult.error || 'نەتوانرا تۆکن وەربگیرێت'
        throw new Error(errorMessage)
      }
      
      const receivedToken = loginResult.token
      setToken(receivedToken)

      // Step 2: Fetch students using JWT with a GET request
      const studentsResponse = await fetch(API_ENDPOINT, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${receivedToken}`,
          'Content-Type': 'application/json',
        },
      })

      if (!studentsResponse.ok) {
        let errorMessage = 'هەڵەیەک لە وەرگرتنی داتای فێرخوازان ڕوویدا'
        try {
          const errorResult = await studentsResponse.json()
          errorMessage = errorResult.message || errorResult.error || errorMessage
        } catch (e) {
          // Response was not JSON, use default error message
        }
        throw new Error(errorMessage)
      }
      
      const studentsResult = await studentsResponse.json()
      if (studentsResult.success) {
        setStudents(studentsResult.students || [])
        setUserHi(enteredId)
        setIsAuthenticated(true)
      } else {
        throw new Error(studentsResult.message || 'نەتوانرا داتای فێرخوازان وەربگیرێت')
      }
    } catch (err) {
      if (err instanceof TypeError && err.message === 'Failed to fetch') {
        setError('پەیوەندی کردن بە سێرڤەرەوە سەرکەوتوو نەبوو. تکایە لە هێڵی ئینتەرنێتەکەت دڵنیابەرەوە.')
      } else if (err instanceof Error) {
        if (err.message.includes('Missing or invalid Authorization header')) {
          setError(
            'ڕێگەپێدان سەرکەوتوو نەبوو. کێشەکە زۆربەی کات لە فایلی .htaccess دایە. تکایە دڵنیابە کە ئەم دێڕانەی تێدایە بۆ ناردنی زانیارییەکانی ڕێگەپێدان: RewriteEngine On و RewriteRule .* - [E=HTTP_AUTHORIZATION:%{HTTP:Authorization}]'
          )
        } else {
          setError(err.message)
        }
      } else {
        setError('هەڵەیەکی نەزانراو ڕوویدا. تکایە دووبارە هەوڵ بدەوە.')
      }
      console.error('Authentication error:', err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full min-h-screen">
      {!isAuthenticated ? (
        <AuthModal
          onAuthenticate={handleAuthenticate}
          isLoading={isLoading}
          error={error}
        />
      ) : (
        <StudentList students={students} userHi={userHi} />
      )}
    </div>
  )
}

// ==================================================================
// END: CODE FOR /hello ADMIN PAGE
// ==================================================================


// ==================================================================
// START: CODE FOR REGISTRATION FORM PAGE
// ==================================================================

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
  educationType: 'zansi' | 'wezhay'
}

// Form content component moved outside to prevent re-creation on each render
const FormContent: React.FC<FormContentProps> = ({
  formData,
  handleChange,
  handleArrayChange,
  // FIX: Removed default value '{}' for errors, which was causing incorrect type inference.
  errors,
  educationType,
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
              className={`modern-input ${errors.personalName ? 'border-blue-500' : ''}`}
              placeholder="ناوی چواری"
            />
            {errors.personalName && (
              <p className="text-blue-700 text-xs mt-1">{errors.personalName}</p>
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
              <p className="text-blue-700 text-xs mt-1">{errors.gender}</p>
            )}
          </div>
          <div className="form-group-modern">
            <label className="modern-label">ساڵی لەدایکبوون</label>
            <input
              type="date"
              name="birthYear"
              value={formData.birthYear}
              onChange={handleChange}
              className={`modern-input text-right ${errors.birthYear ? 'border-blue-500' : ''}`}
            />
            {errors.birthYear && (
              <p className="text-blue-700 text-xs mt-1">{errors.birthYear}</p>
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
              className={`modern-input ${errors.address ? 'border-blue-500' : ''}`}
              placeholder="پارێزگا"
            />
            {errors.address && (
              <p className="text-blue-700 text-xs mt-1">{errors.address}</p>
            )}
          </div>
          <div className="form-group-modern">
            <label className="modern-label">شار/ناوچە</label>
            <input
              type="text"
              name="cityArea"
              value={formData.cityArea}
              onChange={handleChange}
              className={`modern-input ${errors.cityArea ? 'border-blue-500' : ''}`}
              placeholder="شار/ناوچە"
            />
            {errors.cityArea && (
              <p className="text-blue-700 text-xs mt-1">{errors.cityArea}</p>
            )}
          </div>
          <div className="form-group-modern">
            <label className="modern-label">گەڕەک</label>
            <input
              type="text"
              name="neighborhood"
              value={formData.neighborhood}
              onChange={handleChange}
              className={`modern-input ${errors.neighborhood ? 'border-blue-500' : ''}`}
              placeholder="گەڕەک"
            />
            {errors.neighborhood && (
              <p className="text-blue-700 text-xs mt-1">
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
              className={`modern-input ${errors.city ? 'border-blue-500' : ''}`}
              placeholder="کۆڵان"
            />
            {errors.city && (
              <p className="text-blue-700 text-xs mt-1">{errors.city}</p>
            )}
          </div>
          <div className="form-group-modern">
            <label className="modern-label">خانوو</label>
            <input
              type="text"
              name="district"
              value={formData.district}
              onChange={handleChange}
              className={`modern-input ${errors.district ? 'border-blue-500' : ''}`}
              placeholder="خانوو"
            />
            {errors.district && (
              <p className="text-blue-700 text-xs mt-1">{errors.district}</p>
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
              className={`modern-input ${errors.phone1 ? 'border-blue-500' : ''}`}
              placeholder="07XX XXX XXXX"
            />
            {errors.phone1 && (
              <p className="text-blue-700 text-xs mt-1">{errors.phone1}</p>
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
              className={`modern-input ${errors.guardianName ? 'border-blue-500' : ''}`}
              placeholder="ناوی بەخێوکەر"
            />
            {errors.guardianName && (
              <p className="text-blue-700 text-xs mt-1">
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
              className={`modern-input ${errors.guardianRelation ? 'border-blue-500' : ''}`}
              placeholder="پلەی خزمایەتی"
            />
            {errors.guardianRelation && (
              <p className="text-blue-700 text-xs mt-1">
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
              className={`modern-input ${errors.guardianOccupation ? 'border-blue-500' : ''}`}
              placeholder="پیشە"
            />
            {errors.guardianOccupation && (
              <p className="text-blue-700 text-xs mt-1">
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
              className={`modern-input ${errors.guardianPhone ? 'border-blue-500' : ''}`}
              placeholder="07XX XXX XXXX"
            />
            {errors.guardianPhone && (
              <p className="text-blue-700 text-xs mt-1">
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
            <div className="modern-badge">
              {educationType === 'zansi' ? 'زانستی' : 'وێژەیی'}
            </div>
          </div>
          <div className="form-group-modern">
            <label className="modern-label">ساڵی دەرچوون</label>
            <input
              type="date"
              name="graduationYear"
              value={formData.graduationYear}
              onChange={handleChange}
              className={`modern-input text-right ${errors.graduationYear ? 'border-blue-500' : ''}`}
            />
            {errors.graduationYear && (
              <p className="text-blue-700 text-xs mt-1">
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
              <p className="text-blue-700 text-xs mt-1">
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
              <p className="text-blue-700 text-xs mt-1">{errors.examRound}</p>
            )}
          </div>
          <div className="form-group-modern">
            <label className="modern-label">ژمارەی تاقیکردنەوە</label>
            <input
              type="text"
              name="examTestNumbers"
              value={formData.examTestNumbers}
              onChange={handleChange}
              className={`modern-input ${errors.examTestNumbers ? 'border-blue-500' : ''}`}
              placeholder="٠١٢٣٤٥٦٧٨٩٠١٢"
              maxLength={13}
              inputMode="numeric"
              autoComplete="off"
            />
            {errors.examTestNumbers && (
              <p className="text-blue-700 text-xs mt-1">
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
        <div className="bg-white rounded-xl border-2 border-blue-200 p-6 shadow-md mb-6">
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
              className={`modern-input ${errors.province ? 'border-blue-500' : ''}`}
              placeholder="پارێزگا"
            />
            {errors.province && (
              <p className="text-blue-700 text-xs mt-1">{errors.province}</p>
            )}
          </div>
          <div className="form-group-modern">
            <label className="modern-label">پەروەردە</label>
            <input
              type="text"
              name="education"
              value={formData.education}
              onChange={handleChange}
              className={`modern-input ${errors.education ? 'border-blue-500' : ''}`}
              placeholder="پەروەردە"
            />
            {errors.education && (
              <p className="text-blue-700 text-xs mt-1">{errors.education}</p>
            )}
          </div>
          <div className="form-group-modern">
            <label className="modern-label">گەڕەک</label>
            <input
              type="text"
              name="district2"
              value={formData.district2}
              onChange={handleChange}
              className={`modern-input ${errors.district2 ? 'border-blue-500' : ''}`}
              placeholder="گەڕەک"
            />
            {errors.district2 && (
              <p className="text-blue-700 text-xs mt-1">{errors.district2}</p>
            )}
          </div>
          <div className="form-group-modern">
            <label className="modern-label">ساڵی خوێندن</label>
            <input
              type="date"
              name="studyYear"
              value={formData.studyYear}
              onChange={handleChange}
              className={`modern-input text-right ${errors.studyYear ? 'border-blue-500' : ''}`}
            />
            {errors.studyYear && (
              <p className="text-blue-700 text-xs mt-1">{errors.studyYear}</p>
            )}
          </div>
        </div>
        <div className="modern-table-container mt-6">
          <div className="grid grid-cols-3 md:grid-cols-10 gap-2 pt-4">
            {formData.subjects.map((subject, i) => {
              const isHeaderCell = i === 0 || i === 8 || i === 9
              const placeholderText = i > 0 && i < 8 ? `وانە ${i}` : ''

              if (isHeaderCell) {
                return (
                  <div
                    key={i}
                    className="modern-table-label bg-gradient-to-br from-[#0C8FCB] to-[#175988] flex h-full items-center justify-center text-white"
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
                />
              )
            })}
          </div>
          <div className="grid grid-cols-4 md:grid-cols-11 gap-2 pt-4">
            <div className="modern-table-label bg-gradient-to-br from-[#0C8FCB] to-[#175988] text-white">
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
              />
            ))}
          </div>
          <div className="grid grid-cols-4 md:grid-cols-11 gap-2 pt-4">
            <div className="modern-table-label bg-gradient-to-br from-[#0C8FCB] to-[#175988] text-white">
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
              />
            ))}
          </div>
          <div className="grid grid-cols-4 md:grid-cols-11 gap-2 pt-4">
            <div className="modern-table-label bg-gradient-to-br from-[#0C8FCB] to-[#175988] text-white">
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
              />
            ))}
          </div>
          <div className="grid grid-cols-4 md:grid-cols-11 gap-2 pt-4">
            <div className="modern-table-label bg-gradient-to-br from-[#0C8FCB] to-[#175988] text-white">
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
  departments: string[]
}

const SecondFormContent: React.FC<SecondFormContentProps> = ({
  formData,
  handleChange,
  handleArrayChange,
  handleDepartmentToggle,
  // FIX: Removed default value '{}' for errors, which was causing incorrect type inference.
  errors,
  departments,
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
                className={`modern-input ${errors.instituteName ? 'border-blue-500' : ''}`}
                placeholder="ناوی خوێندنگە"
              />
              {errors.instituteName && (
                <p className="text-blue-700 text-xs mt-1">
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
                className={`modern-input ${errors.directorName ? 'border-blue-500' : ''}`}
                placeholder="ناوی بەڕێوەبەر"
              />
              {errors.directorName && (
                <p className="text-blue-700 text-xs mt-1">
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
                className={`modern-input ${errors.directorPhone ? 'border-blue-500' : ''}`}
                placeholder="07XX XXX XXXX"
              />
              {errors.directorPhone && (
                <p className="text-blue-700 text-xs mt-1">
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
                className={`modern-input ${errors.educationDirectorName ? 'border-blue-500' : ''}`}
                placeholder="ناوی بەڕێوەبەرێتی"
              />
              {errors.educationDirectorName && (
                <p className="text-blue-700 text-xs mt-1">
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
                className={`modern-input ${errors.decision ? 'border-blue-500' : ''}`}
                placeholder="قەزا..."
              />
              {errors.decision && (
                <p className="text-blue-700 text-xs mt-1">{errors.decision}</p>
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
          <p className="text-blue-700 text-xs mt-2 text-center">
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
              className={`modern-input ${errors.certificate1 ? 'border-blue-500' : ''}`}
              placeholder="..."
            />
            {errors.certificate1 && (
              <p className="text-blue-700 text-xs mt-1">
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
              className={`modern-input ${errors.certificate2 ? 'border-blue-500' : ''}`}
              placeholder="..."
            />
            {errors.certificate2 && (
              <p className="text-blue-700 text-xs mt-1">
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
              className={`modern-input ${errors.certificate3 ? 'border-blue-500' : ''}`}
              placeholder="..."
            />
            {errors.certificate3 && (
              <p className="text-blue-700 text-xs mt-1">
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
              className={`modern-input ${errors.certificate4 ? 'border-blue-500' : ''}`}
              placeholder="..."
            />
            {errors.certificate4 && (
              <p className="text-blue-700 text-xs mt-1">
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
          <p className="text-blue-700 text-xs -mt-4 mb-4">
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
              className={`modern-input ${errors.nationalityNumber ? 'border-blue-500' : ''}`}
              placeholder="ژمارەی ڕەگەزنامە"
            />
            {errors.nationalityNumber && (
              <p className="text-blue-700 text-xs mt-1">
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
              className={`modern-input ${errors.registrationNumber ? 'border-blue-500' : ''}`}
              placeholder="ژمارەی تۆمار"
            />
            {errors.registrationNumber && (
              <p className="text-blue-700 text-xs mt-1">
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
              className={`modern-input ${errors.issueYearPlace ? 'border-blue-500' : ''}`}
              placeholder="ساڵ و شوێن..."
            />
            {errors.issueYearPlace && (
              <p className="text-blue-700 text-xs mt-1">
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
              className={`modern-input ${errors.familyCardNumber ? 'border-blue-500' : ''}`}
              placeholder="ژمارەی کارت"
            />
            {errors.familyCardNumber && (
              <p className="text-blue-700 text-xs mt-1">
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
              className={`modern-input ${errors.familyCardIssuePlace ? 'border-blue-500' : ''}`}
              placeholder="شوێنی دەرچوون"
            />
            {errors.familyCardIssuePlace && (
              <p className="text-blue-700 text-xs mt-1">
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
              className={`modern-input text-right ${errors.familyCardIssueDate ? 'border-blue-500' : ''}`}
            />
            {errors.familyCardIssueDate && (
              <p className="text-blue-700 text-xs mt-1">
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
              className={`modern-input ${errors.familyCode ? 'border-blue-500' : ''}`}
              placeholder="کۆدی خێزانی"
            />
            {errors.familyCode && (
              <p className="text-blue-700 text-xs mt-1">{errors.familyCode}</p>
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
  font-family: 'Noto Naskh Arabic';
  font-style: normal;
  font-weight: 400;
  src: url(https://fonts.gstatic.com/s/notonaskharabic/v24/RrQ5hz4o1M48N33smvsb-vxt3wRkY1Rgyw.woff2) format('woff2');
}
@font-face {
  font-family: 'Noto Naskh Arabic';
  font-style: normal;
  font-weight: 700;
  src: url(https://fonts.gstatic.com/s/notonaskharabic/v24/RrQ5hz4o1M48N33smvsb-vxt3wRkY1Rgyw.woff2) format('woff2');
}
`
// FIX: Embed the logo as a Base64 data URI to prevent CORS-related PDF generation failures.
const LOGO_DATA_URL =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAbFBMVEX////mAADmAABTqlNJolf64ODmAwP86ur86+v11tbmBQXoFRXoERHnJSXqPz/ywcH99PTmDAzufoD99/fuamv229vnHR3rU1PznZ3wubnka2vtbm7pLzDwb3D44+Pyl5fqSEnsWVrtZmbqRUXuZWXlS+3aAAACyElEQVR4nO2d63KiMBCGQwghgIKi4sEFr/b//3IVL2tSSkmx2ezMOfcBWZvBJF1mEhUDAAAAAAAAAAAAAAAAAAAAAAAAAPjftD/S8mhH2zFtNts/aXk0J4h2jH+k5eHc2fT/uC5nK/1F5c+yPjL2x39S2V+o+0tZp7wP0z4jO6uH+y/bH2p3o0/M9l/afkofvM4+xP8P+C/s/5S90W9S/jL2F7P+UvaXsl/afmlrQJj2x7P+wvaXsi8s/V/W0/q5gD8x4d9iO39c/w+yP9HyV/QZ4z/S8mj+s+qP6Gf2F+M/0vJo/r8/Yd8/2d/of/z3/o/oX8b+Qv/30r6E/j9l/0L/G/v/yP6E/t/b/1L/W9t/qf8d+y/0P6//M/v/Qv9j/X9p/2P9n9v/X/o/sP8f+j+w/+/s/wv939n/V/rf1v+f+t/W/5/6P7D/r/Q/sP+f9B9q+jYnKx1e1nO3b934Xm14P7Xh/dSG91Mb3k9teD+14f3Uhnf7c2F/9P2t9S+N//fX/pX2n7L/Qv+T9T/S8mj+8P6N9R/o/0/Jo/nJ+8/YX8J+Sfkc+z/Q/1vJo/nJ+6ft32h/Z/0nJo/nJ+4ftL9X/jL+R8mj+Yn7N+2/sP+b/v8/Jo/mJ+7/0vJo/pT/Y/r/0vJo/pT/w/p/afl/X38i/3/9J/0f9f+s/wP9f+u/SP8f+p+2/wP9n7L/Af2ftv8D/T9p/w/6P2T/I/o/bP8f+j9s/5/of9D+P9H/Yfu/RP+z9h+x/1n7T9j/rP0f2/+s/S/S/2/736L/H+5/W99PzS+fBwAAAAAAAAAAAAAAAAAAAAAAAADgP/kDx8/JdO41c7oAAAAASUVORK5CYII='

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

function MainForm({
  formType,
  onBack,
}: {
  formType: 'zansi' | 'wezhay'
  onBack: () => void
}) {
  const isZansi = formType === 'zansi'
  const departments = isZansi ? zansiDepartments : wezhayDepartments
  const pdfThemeClass = isZansi ? '' : 'wezhay-pdf-theme'

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
    } catch (error) {
      console.error('PDF generation failed:', error)
      throw new Error(
        'دروستکردنی پی دی ئێف سەرکەوتوو نەبوو. تکایە دووبارە هەوڵ بدەوە.',
      )
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault()

    if (currentStep === 1) {
      handleNextStep()
      return
    }

    // This is the final submission on step 2
    setIsGenerating(true)
    setShowError(false)
    setShowSuccess(false)

    try {
      // NOTE TO USER: Replace this URL with your actual PHP API endpoint.
      // Ensure your PHP server is running and accessible from this app.
      // Also, remember to set your database password in the PHP file.
      const API_ENDPOINT = 'https://xn--salonvejgrd-58a.dk/public_html/api/register-student.php'

      const response = await fetch(API_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-API-KEY': 'MY_PUBLIC_FORM_KEY_123',
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        // Try to get more specific error from server response
        const errorText = await response.text()
        throw new Error(
          `پەیوەندی سێرڤەر سەرکەوتوو نەبوو: ${response.status} ${errorText}`,
        )
      }

      const result = await response.json()

      if (!result.success) {
        throw new Error(
          result.error || result.message || 'سێرڤەر هەڵەیەکی گەڕاندەوە.',
        )
      }

      // API submission was successful, now generate the PDF
      setSuccessMessage(
        'زانیارییەکان بە سەرکەوتوویی نێردرا! ئامادەکاری بۆ داگرتنی PDF.',
      )
      setShowSuccess(true)

      await generatePDF()
    } catch (error) {
      console.error('Submission or PDF generation failed:', error)
      setErrorMessage(
        error instanceof Error
          ? error.message
          : 'هەڵەیەک ڕوویدا. تکایە دووبارە هەوڵ بدەوە.',
      )
      setShowError(true)
    } finally {
      setIsGenerating(false)
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
            {successMessage}
          </span>
        </div>
      )}
      {showError && (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 w-11/12 max-w-md bg-white border-r-4 border-blue-500 text-gray-800 px-4 sm:px-8 py-3 sm:py-5 rounded-2xl shadow-2xl z-50 flex items-center animate-fade-in-up backdrop-blur-sm">
          <div className="bg-blue-100 rounded-full p-2 ml-2 sm:ml-4">
            <svg
              className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600"
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
                          src={LOGO_DATA_URL}
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
                    educationType={formType}
                  />
                </div>
                {/* Footer (Desktop UI and PDF) */}
                <div className="hidden shrink-0 mt-6 pt-6 modern-footer-border">
                  <div className="flex flex-col items-center gap-4 text-sm">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-4 w-full max-w-4xl">
                      <div className="modern-contact-card">
                        <svg
                          className="w-6 h-6 text-blue-600 flex-shrink-0"
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
                          className="w-6 h-6 text-blue-600 flex-shrink-0"
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
                          className="w-6 h-6 text-blue-600 flex-shrink-0"
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
                          className="w-6 h-6 text-blue-600 flex-shrink-0"
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
                    departments={departments}
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
            className={`w-full sm:w-auto group relative ${isGenerating ? 'bg-gray-400 cursor-not-allowed' : 'bg-gradient-to-r from-[#0C8FCB] to-[#175988] hover:from-[#175988] hover:to-[#0C8FCB] shadow-2xl hover:shadow-blue-500/50'} text-white px-6 sm:px-10 md:px-12 py-3 sm:py-4 md:py-5 rounded-xl sm:rounded-2xl transition-all duration-500 font-bold text-sm sm:text-base md:text-lg lg:text-xl flex items-center justify-center transform hover:scale-105 active:scale-95 overflow-hidden`}
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
                  <span>ناردنی زانیاری...</span>
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
                  <span>ناردن و داگرتنی فۆڕم</span>
                </>
              )}
            </div>
          </button>
        </div>
      </main>

      {/* Mobile/Tablet Footer (UI Only) */}
      <footer className="bg-white/80 backdrop-blur-md mt-8 py-8 px-[5px] border-t-4 border-[#0C8FCB]">
        <div className="mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="modern-contact-card flex-row-reverse justify-center">
              <svg
                className="w-6 h-6 text-blue-600 flex-shrink-0"
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
                className="w-6 h-6 text-blue-600 flex-shrink-0"
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
                className="w-6 h-6 text-blue-600 flex-shrink-0"
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
                className="w-6 h-6 text-blue-600 flex-shrink-0"
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
            پەیمانگای تەکنیکی کوردستان - بەرزاییەکانی سلێمانی، هەرێمی کوردستان
            - عێراق
          </p>
          <div className="flex justify-center my-6">
            <div className="w-2/3 border-t border-gray-300"></div>
          </div>
          <div className="text-center text-sm text-gray-600">
            Developed by{' '}
            <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#0C8FCB] to-[#175988]">
              SAHAND
            </span>
          </div>
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
          className={`bg-white flex flex-col font-bold ${pdfThemeClass}`}
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
                      src={LOGO_DATA_URL}
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
                        <div className="badge-red py-3 text-base">
                          {isZansi ? 'زانستی' : 'وێژەیی'}
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
                      <div className="grid grid-cols-10 gap-0.5 pt-1 bg-gray-50">
                        {formData.subjects.map((subject, i) => {
                          const isReadOnly = i === 0 || i === 8 || i === 9
                          const placeholderText =
                            i > 0 && i < 8 ? `وانە ${i}` : ''
                          if (i === 8 || i === 9) {
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
                      <div className="grid grid-cols-11 gap-0.5 pt-1 bg-red-50">
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
                      <div className="grid grid-cols-11 gap-0.5 pt-1 bg-red-50">
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
                      <div className="grid grid-cols-11 gap-0.5 pt-1 bg-yellow-50">
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
                      <div className="grid grid-cols-11 gap-0.5 pt-1 bg-yellow-50">
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
          className={`bg-white flex flex-col font-bold ${pdfThemeClass}`}
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
                    {departments.map((dept, i) => {
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

function FormApp() {
  const [formType, setFormType] = useState<'zansi' | 'wezhay' | null>(null)

  const selectForm = (type: 'zansi' | 'wezhay') => {
    setFormType(type)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleBackToSelection = () => {
    setFormType(null)
  }

  if (!formType) {
    return (
      <div
        className="min-h-screen bg-white rtl flex flex-col items-center justify-center p-4 font-bold"
        dir="rtl"
      >
        <div className="text-center space-y-8 max-w-2xl mx-auto">
          <img
            src={LOGO_DATA_URL}
            alt="Logo"
            className="h-24 mx-auto mb-6 drop-shadow-lg"
          />
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 tracking-wide">
            فۆڕمی تۆمارکردنی پەیمانگای تەکنیکی کوردستان
          </h1>
          <p className="text-lg text-gray-600">
            تکایە جۆری خوێندنەکەت هەڵبژێرە بۆ بەردەوامبوون.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              onClick={() => selectForm('zansi')}
              className="w-full sm:w-64 bg-gradient-to-r from-[#0C8FCB] to-[#175988] hover:from-[#175988] hover:to-[#0C8FCB] text-white px-8 py-4 rounded-xl font-bold text-lg transform hover:scale-105 transition-all duration-300 shadow-lg"
            >
              زانستی
            </button>
            <button
              onClick={() => selectForm('wezhay')}
              className="w-full sm:w-64 bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-600 text-white px-8 py-4 rounded-xl font-bold text-lg transform hover:scale-105 transition-all duration-300 shadow-lg"
            >
              وێژەیی
            </button>
          </div>
        </div>
      </div>
    )
  }

  return <MainForm formType={formType} onBack={handleBackToSelection} />
}

// ==================================================================
// END: CODE FOR REGISTRATION FORM PAGE
// ==================================================================


// ==================================================================
// NEW ROUTER COMPONENT
// ==================================================================
export function App() {
  const [route, setRoute] = useState(window.location.pathname)

  useEffect(() => {
    const handlePopState = () => {
      setRoute(window.location.pathname)
    }
    window.addEventListener('popstate', handlePopState)
    return () => {
      window.removeEventListener('popstate', handlePopState)
    }
  }, [])

  if (route === '/hello') {
    return <HelloPage />
  }
  return <FormApp />
}

const container = document.getElementById('root')
if (container) {
  const root = createRoot(container)
  root.render(<App />)
}
