import React, { useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { SelectionPage } from './load'
import { HelloPage } from './HelloPage'
import { MainForm } from './MainForm'

// --- MAIN APP ROUTER ---
function App() {
  const [currentPage, setCurrentPage] = useState<
    'selection' | 'form' | 'admin'
  >('selection')
  const [formType, setFormType] = useState<
    'zansi' | 'wezhay' | 'peshassazi' | 'bazrgani'
  >('zansi')

  useEffect(() => {
    // Register service worker for production readiness
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker
          .register('/sw.js')
          .then((registration) => {
            console.log('SW registered: ', registration)
          })
          .catch((registrationError) => {
            console.log('SW registration failed: ', registrationError)
          })
      })
    }

    // Basic routing based on URL path
    const path = window.location.pathname
    if (path.startsWith('/hello')) {
      setCurrentPage('admin')
    } else {
      setCurrentPage('selection')
    }
  }, [])

  const handleSelect = (
    type: 'zansi' | 'wezhay' | 'peshassazi' | 'bazrgani',
  ) => {
    setFormType(type)
    setCurrentPage('form')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleBack = () => {
    setCurrentPage('selection')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (currentPage === 'admin') {
    return <HelloPage />
  }

  return (
    <>
      {currentPage === 'selection' && <SelectionPage onSelect={handleSelect} />}
      {currentPage === 'form' && (
        <MainForm formType={formType} onBack={handleBack} />
      )}
    </>
  )
}

const container = document.getElementById('root')
if (container) {
  const root = createRoot(container)
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  )
} else {
  console.error('Failed to find the root element.')
}
