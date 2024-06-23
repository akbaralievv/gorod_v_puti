import React, { useState } from 'react'
import CountrySelect from '../../inputs/countrySelect/CountrySelect'

function SearchCountry({ setSearchCountryValue, setState }) {
  const [formValue, setFormValue] = useState({
    from: '',
    to: '',
  })

  const isFormValid = formValue.from || formValue.to

  const handleFormValueChange = (name, value) => {
    setFormValue((prev) => ({ ...prev, [name]: value }))
  }

  const onSubmit = () => {
    setSearchCountryValue(formValue)
    setFormValue({ from: '', to: '' })
  }

  const clearSates = () => {
    setState &&
      setState({
        from: '',
        to: '',
      })
    setSearchCountryValue('')
  }

  return (
    <div className="searchCountry flex justify-center">
      <div className="flex-col w-full max-w-[1045px] 360:flex-row inline-flex justify-between gap-6 flex-wrap items-center p-4 mt-12 rounded shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)]">
        <div className="flex-col w-full max-w-[670px] 360:flex-row inline-flex justify-between gap-x-3 flex-1 items-center">
          <CountrySelect
            label="Откуда"
            onChange={(value) => handleFormValueChange('from', value)}
            isSearhCountry={true}
          />
          <svg
            className="rotate-90 360:rotate-0 w-8 h-8 text-gray-800 dark:text-white min-w-8"
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

          <CountrySelect
            label="Куда"
            onChange={(value) => handleFormValueChange('to', value)}
            isSearhCountry={true}
          />
        </div>
        <button
          type="submit"
          onClick={onSubmit}
          disabled={!isFormValid}
          className={`${!isFormValid ? 'cursor-not-allowed' : ''} 1024:max-w-40 flex-auto inline-flex items-center justify-center py-2.5 px-3 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800`}
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
        <button
          onClick={clearSates}
          type="button"
          className="py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
        >
          Показать все
        </button>
      </div>
    </div>
  )
}

export default SearchCountry
