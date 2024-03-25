import React, { useEffect, useState } from 'react'

function InfoAlert({ isVisible, message }) {
  return (
    <div
      className="flex bg-blue-100 rounded-lg p-4 text-sm text-blue-700 absolute"
      style={{
        transition: 'transform 0.5s, opacity 0.5s',
        transform: `translateX(${isVisible ? '0' : '100%'})`,
        opacity: isVisible ? 1 : 0,
      }}
      role="alert"
    >
      <svg
        viewBox="0 0 24 24"
        className="text-blue-600 w-5 h-5 sm:w-5 sm:h-5 mr-3"
      >
        <path
          fill="currentColor"
          d="M12,0A12,12,0,1,0,24,12,12.013,12.013,0,0,0,12,0Zm.25,5a1.5,1.5,0,1,1-1.5,1.5A1.5,1.5,0,0,1,12.25,5ZM14.5,18.5h-4a1,1,0,0,1,0-2h.75a.25.25,0,0,0,.25-.25v-4.5a.25.25,0,0,0-.25-.25H10.5a1,1,0,0,1,0-2h1a2,2,0,0,1,2,2v4.75a.25.25,0,0,0,.25.25h.75a1,1,0,1,1,0,2Z"
        ></path>
      </svg>
      <div>
        <span className="font-medium">Информация!</span> {message}
      </div>
    </div>
  )
}

export default InfoAlert
