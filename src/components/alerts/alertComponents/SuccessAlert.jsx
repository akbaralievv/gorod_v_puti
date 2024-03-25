import React, { useEffect, useState } from 'react'

function SuccessAlert({ isVisible, message }) {
  return (
    <div
      className="flex bg-green-100 rounded-lg p-4 text-sm text-green-700"
      style={{
        transition: 'transform 0.5s, opacity 0.5s',
        transform: `translateX(${isVisible ? '0' : '100%'})`,
        opacity: isVisible ? 1 : 0,
      }}
      role="alert"
    >
      <svg
        viewBox="0 0 24 24"
        className="text-green-600 w-5 h-5 sm:w-5 sm:h-5 mr-3"
      >
        <path
          fill="currentColor"
          d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z"
        ></path>
      </svg>
      <div>
        <span className="font-medium">Успешно!</span> {message}
      </div>
    </div>
  )
}

export default SuccessAlert
