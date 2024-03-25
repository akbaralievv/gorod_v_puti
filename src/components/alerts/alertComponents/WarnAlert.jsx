import React from 'react'

function WarnAlert({ isVisible, message }) {
  return (
    <div
      className="flex bg-yellow-100 rounded-lg p-4 mb-4 text-sm text-yellow-700 absolute"
      style={{
        transition: 'transform 0.5s, opacity 0.5s',
        transform: `translateX(${isVisible ? '0' : '100%'})`,
        opacity: isVisible ? 1 : 0,
      }}
      role="alert"
    >
      <svg
        viewBox="0 0 24 24"
        className="text-yellow-600 w-5 h-5 sm:w-5 sm:h-5 mr-3"
      >
        <path
          fill="currentColor"
          d="M23.119,20,13.772,2.15h0a2,2,0,0,0-3.543,0L.881,20a2,2,0,0,0,1.772,2.928H21.347A2,2,0,0,0,23.119,20ZM11,8.423a1,1,0,0,1,2,0v6a1,1,0,1,1-2,0Zm1.05,11.51h-.028a1.528,1.528,0,0,1-1.522-1.47,1.476,1.476,0,0,1,1.448-1.53h.028A1.527,1.527,0,0,1,13.5,18.4,1.475,1.475,0,0,1,12.05,19.933Z"
        ></path>
      </svg>
      <div>
        <span className="font-medium">Предупреждение!</span> {message}
      </div>
    </div>
  )
}

export default WarnAlert
