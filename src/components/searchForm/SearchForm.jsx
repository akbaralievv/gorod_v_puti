import React, { useEffect, useState } from 'react'

import CountrySelect from '../inputs/countrySelect/CountrySelect'
import DatePickerSelect from '../inputs/datePickerSelect/DatePickerSelect'
import NumberInput from '../inputs/numberInput/NumberInput'

function SearchForm() {
  return (
    <div className="inline-flex justify-between gap-6 flex-wrap items-center p-4 mt-8 rounded bg-gray-800  text-white">
      <div className="inline-flex justify-between gap-x-3 flex-1">
        <CountrySelect from={true} />
        <svg
          className="w-8 h-8 text-gray-800 dark:text-white"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1"
            d="M19 12H5m14 0-4 4m4-4-4-4"
          />
        </svg>

        <CountrySelect to={true} />
      </div>
      <DatePickerSelect />
      <NumberInput />

      <button
        type="submit"
        className="flex-auto inline-flex items-center justify-center py-2.5 px-3 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        <svg
          className="w-4 h-4 me-2"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 20 20"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
          />
        </svg>
        Найти
      </button>
    </div>
  )
}

export default SearchForm
