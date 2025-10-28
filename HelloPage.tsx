import React, { useEffect, useState, useMemo, useCallback, memo } from 'react'
import { Footer } from './footer'
import {
  UserIcon,
  SearchIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  SparklesIcon,
  UsersIcon,
  FilterIcon,
  DocumentIcon,
  PhoneIcon,
} from './Icons'

// --- TYPE DEFINITIONS ---
type Student = {
  id: number
  name: string
  phone: string
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

// --- AUTHENTICATION MODAL ---
const AuthModal = memo(
  ({ onAuthenticate, isLoading, error }: AuthModalProps) => {
    const [userHi, setUserHi] = useState('')

    const attemptLogin = useCallback(() => {
      if (userHi.trim() && !isLoading) {
        onAuthenticate(userHi)
      }
    }, [userHi, isLoading, onAuthenticate])

    const handleSubmit = useCallback(
      (e: React.FormEvent) => {
        e.preventDefault()
        attemptLogin()
      },
      [attemptLogin],
    )

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
              <p className="text-gray-600 text-base">بەخێربێت</p>
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
                  <span
                    className="flex items-center justify-center gap-2"
                    role="status"
                    aria-live="polite"
                  >
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
  },
)

// --- PAGINATION COMPONENT ---
const Pagination = memo(
  ({
    currentPage,
    totalPages,
    onPageChange,
  }: {
    currentPage: number
    totalPages: number
    onPageChange: (page: number) => void
  }) => {
    const pageNumbers = useMemo(() => {
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
    }, [currentPage, totalPages])

    return (
      <div className="flex items-center justify-center gap-3 mt-16" dir="ltr">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="p-3 bg-white border-2 border-gray-200 text-gray-700 hover:border-black hover:text-black transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:border-gray-200 disabled:hover:text-gray-700 rounded-xl shadow-sm hover:shadow-md transform hover:-translate-y-0.5"
          aria-label="Previous Page"
        >
          <ChevronLeftIcon />
        </button>
        {pageNumbers.map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`min-w-[3rem] px-4 py-3 font-semibold transition-all duration-300 rounded-xl text-base shadow-sm hover:shadow-md transform hover:-translate-y-0.5 ${currentPage === page ? 'bg-black text-white scale-105' : 'bg-white border-2 border-gray-200 text-gray-700 hover:border-black hover:text-black'}`}
            aria-current={currentPage === page ? 'page' : undefined}
          >
            {page}
          </button>
        ))}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="p-3 bg-white border-2 border-gray-200 text-gray-700 hover:border-black hover:text-black transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:border-gray-200 disabled:hover:text-gray-700 rounded-xl shadow-sm hover:shadow-md transform hover:-translate-y-0.5"
          aria-label="Next Page"
        >
          <ChevronRightIcon />
        </button>
      </div>
    )
  },
)

// --- STUDENT LIST VIEW ---
const StudentList = ({ students, userHi }: StudentListProps) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  const filteredStudents = useMemo(() => {
    const lowercasedSearchTerm = searchTerm.toLowerCase()
    if (!lowercasedSearchTerm) return students
    return students.filter(
      (student) =>
        student.name.toLowerCase().includes(lowercasedSearchTerm) ||
        (student.phone && student.phone.includes(searchTerm)),
    )
  }, [students, searchTerm])

  const totalPages = Math.ceil(filteredStudents.length / itemsPerPage)

  const currentStudents = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage
    return filteredStudents.slice(startIndex, startIndex + itemsPerPage)
  }, [filteredStudents, currentPage, itemsPerPage])

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page)
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }, [])

  useEffect(() => {
    setCurrentPage(1)
  }, [searchTerm])

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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
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
        </div>
        <div className="mb-10">
          <div className="relative group">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-14 pr-6 py-5 bg-white border-2 border-gray-200 rounded-2xl text-lg text-black placeholder-gray-400 focus:outline-none focus:border-black transition-all duration-300 shadow-lg focus:shadow-xl group-hover:border-gray-300"
              placeholder="گەڕان..."
              aria-label="Search students"
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
                          <PhoneIcon />
                          <span className="font-mono" dir="ltr">
                            {student.phone || 'N/A'}
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
export function HelloPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [userHi, setUserHi] = useState<string>('')
  const [students, setStudents] = useState<Student[]>([])
  const [token, setToken] = useState<string | null>(null)

  const API_ENDPOINT = 'https://apply.kti.edu.iq/single_api.php'

  const handleAuthenticate = useCallback(async (enteredId: string) => {
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
          errorMessage =
            errorResult.message || errorResult.error || errorMessage
        } catch (e) {
          // Response was not JSON, use default error message
        }
        throw new Error(errorMessage)
      }

      const loginResult = await loginResponse.json()
      if (!loginResult.success || !loginResult.token) {
        const errorMessage =
          loginResult.message || loginResult.error || 'نەتوانرا تۆکن وەربگیرێت'
        throw new Error(errorMessage)
      }

      const receivedToken = loginResult.token
      setToken(receivedToken)

      // Step 2: Fetch students using JWT with a GET request
      const studentsResponse = await fetch(API_ENDPOINT, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${receivedToken}`,
          'Content-Type': 'application/json',
        },
      })

      if (!studentsResponse.ok) {
        throw new Error('هەڵەیەک لە وەرگرتنی داتای فێرخوازان ڕوویدا')
      }

      const studentsResult = await studentsResponse.json()
      if (studentsResult.success) {
        setStudents(studentsResult.students || [])
        setUserHi(enteredId)
        setIsAuthenticated(true)
      } else {
        throw new Error(
          studentsResult.message || 'نەتوانرا داتای فێرخوازان وەربگیرێت',
        )
      }
    } catch (err) {
      if (err instanceof TypeError && err.message === 'Failed to fetch') {
        setError(
          'پەیوەندی کردن بە سێرڤەرەوە سەرکەوتوو نەبوو. تکایە لە هێڵی ئینتەرنێت دڵنیابەرەوە.',
        )
      } else if (err instanceof Error) {
        setError(err.message)
      } else {
        setError('هەڵەیەکی چاوەڕواننەکراو ڕوویدا')
      }
    } finally {
      setIsLoading(false)
    }
  }, [])

  if (!isAuthenticated) {
    return (
      <AuthModal
        onAuthenticate={handleAuthenticate}
        isLoading={isLoading}
        error={error}
      />
    )
  }

  return <StudentList students={students} userHi={userHi} />
}
