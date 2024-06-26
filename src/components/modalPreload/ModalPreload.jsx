import React from 'react'

import './ModalPreload.css'

function ModalPreload() {
  return (
    <div
      className="fixed top-0 left-0 z-50 w-screen h-screen flex items-center justify-center"
      style={{ background: 'rgba(0, 0, 0, 0.3)' }}
    >
      <div className="bg-white border py-4 px-8 rounded-lg flex items-center flex-col">
        <div className="loader-dots block relative w-20 h-5 mt-2">
          <div className="absolute top-0 mt-1 w-3 h-3 rounded-full bg-indigo-600"></div>
          <div className="absolute top-0 mt-1 w-3 h-3 rounded-full bg-indigo-600"></div>
          <div className="absolute top-0 mt-1 w-3 h-3 rounded-full bg-indigo-600"></div>
          <div className="absolute top-0 mt-1 w-3 h-3 rounded-full bg-indigo-600"></div>
        </div>
        <div className="text-gray-500 text-xs font-medium mt-2 text-center">
          Загрузка...
        </div>
      </div>
    </div>
  )
}

export default ModalPreload
