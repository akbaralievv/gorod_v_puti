import React, { useState, useEffect } from 'react'

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false)

  const toggleVisibility = () => {
    if (window.pageYOffset > 100) {
      setIsVisible(true)
    } else {
      setIsVisible(false)
    }
  }

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility)

    return () => {
      window.removeEventListener('scroll', toggleVisibility)
    }
  }, [])

  return (
    isVisible && (
      <button
        onClick={scrollToTop}
        className="fixed z-10 flex items-center justify-center bottom-4 right-4 bg-blue-500 hover:bg-blue-700 text-white font-bold w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 rounded-full"
        aria-label="Вернуться наверх"
      >
        <svg
          className="w-2 sm:w-3 md:w-4 lg:w-5 text-gray-800 text-white"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 14 8"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1"
            d="M13 7 7.674 1.3a.91.91 0 0 0-1.348 0L1 7"
          ></path>
        </svg>
      </button>
    )
  )
}

export default ScrollToTopButton
