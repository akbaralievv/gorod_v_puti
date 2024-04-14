import React, { Fragment, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'

import YandexMap from '../../components/yandexMap/YandexMap'
import { setIsFavorites } from '../../redux/slices/files/isFavorites'

import './Detail.scss'

function Detail() {
  const [like, setLike] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const location = useLocation()
  const dispatch = useDispatch()
  const data = location.state

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || []
    const isLiked = favorites?.find((favorite) => favorite.$id === data.$id)
    setLike(isLiked)
  }, [data])

  useEffect(() => {
    if (like) {
      dispatch(setIsFavorites(true))
    } else {
      dispatch(setIsFavorites(false))
    }
  }, [like])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const localUpdate = (type) => {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || []

    let updatedFavorites = [...favorites]

    if (type) {
      const existingIndex = favorites?.findIndex(
        (favorite) => favorite.$id === data.$id,
      )
      if (existingIndex === -1) {
        updatedFavorites = [...favorites, data]
      }
    } else {
      const filteredFavorites = favorites?.filter(
        (favorite) => favorite.$id !== data.$id,
      )
      updatedFavorites = [...filteredFavorites]
    }
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites))
  }
  const handleLike = (e) => {
    e.stopPropagation()
    localUpdate(!like)
    setLike(!like)
  }

  const parserSubPhones = () => {
    if (data.subPhones) {
      return JSON.parse(data.subPhones)
    }
    return ''
  }

  function getPlaceWord(count) {
    let remainder10 = count % 10
    let remainder100 = count % 100

    if (remainder10 === 1 && remainder100 !== 11) {
      return `место`
    } else if (
      remainder10 >= 2 &&
      remainder10 <= 4 &&
      (remainder100 < 10 || remainder100 >= 20)
    ) {
      return `места`
    } else {
      return `мест`
    }
  }

  const formattedDate = (date) => {
    const dateFormat = new Date(date)

    return dateFormat
      .toLocaleDateString('ru-RU', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      })
      .split('.')
      .join('.')
  }

  const openModal = () => setIsModalOpen(true)

  const closeModal = () => setIsModalOpen(false)

  return (
    <div className="flex-1 w-full py-16 mx-auto max-w-7xl px-6 lg:px-8">
      <div className="flex flex-wrap 945:flex-nowrap gap-6 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] p-6">
        {data.image && (
          <>
            <div className="lg:col-span-3 w-full 945:w-5/12 h-64 top-0 text-center 430:min-w-[330px]">
              <div
                onClick={openModal}
                className="cursor-pointer flex justify-center items-center px-4 py-10 rounded-xl h-full shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] relative"
              >
                <img
                  src={data.image}
                  alt="Product"
                  className="rounded w-[31%]"
                />
                <button
                  type="button"
                  className="absolute top-[10px] right-[10px]"
                  onClick={handleLike}
                >
                  {!like ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6 hover:fill-[#333]"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        fillRule="evenodd"
                        d="M6.32 2.577a49.255 49.255 0 0 1 11.36 0c1.497.174 2.57 1.46 2.57 2.93V21a.75.75 0 0 1-1.085.67L12 18.089l-7.165 3.583A.75.75 0 0 1 3.75 21V5.507c0-1.47 1.073-2.756 2.57-2.93Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>
            <Transition.Root show={isModalOpen} as={Fragment}>
              <Dialog as="div" className="relative z-10" onClose={closeModal}>
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </Transition.Child>

                <div className="fixed inset-0 z-10 overflow-y-auto">
                  <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    <Transition.Child
                      as={Fragment}
                      enter="ease-out duration-300"
                      enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                      enterTo="opacity-100 translate-y-0 sm:scale-100"
                      leave="ease-in duration-200"
                      leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                      leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    >
                      <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                        <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                          <div className="sm:flex sm:items-start">
                            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                              <div className="">
                                <img
                                  src={data.image}
                                  alt={data.altText}
                                  className="w-full"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                          <button
                            type="button"
                            className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                            onClick={closeModal}
                          >
                            Close
                            <XMarkIcon
                              className="ml-2 h-5 w-5"
                              aria-hidden="true"
                            />
                          </button>
                        </div>
                      </Dialog.Panel>
                    </Transition.Child>
                  </div>
                </div>
              </Dialog>
            </Transition.Root>
          </>
        )}
        <div className="lg:col-span-2 w-full overflow-x-auto pb-[10px]">
          <ul className="flex flex-col max-h-96 flex-wrap gap-5">
            <li className="text-[#333] text-sm 537:text-base 590:text-lg font-bold flex items-center gap-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="min-w-6 max-w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                />
              </svg>
              <p className="break-words whitespace-normal max-w-[150px]">
                {data.who}
              </p>
            </li>
            {data.username && (
              <li className="text-[#333] text-sm 537:text-base 590:text-lg font-bold flex items-center gap-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="min-w-6 max-w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                </svg>

                <p className="break-words whitespace-normal max-w-[300px]">
                  {data.username}
                </p>
              </li>
            )}
            <li className="text-[#333] text-sm 537:text-base 590:text-lg font-bold flex items-center gap-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="min-w-6 max-w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                />
              </svg>

              <div className="flex items-center gap-2 flex-wrap">
                <p className="break-words whitespace-normal max-w-[300px]">
                  {data.from}
                </p>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="min-w-6 max-w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
                  />
                </svg>
                <p className="break-words whitespace-normal max-w-[300px]">
                  {data.to}
                </p>
              </div>
            </li>
            <li className="text-[#333] text-sm 537:text-base 590:text-lg font-bold flex items-center gap-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="min-w-6 max-w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z"
                />
              </svg>

              <p className="break-words whitespace-normal max-w-[250px]">
                {data.formattedDateTime}
              </p>
            </li>
            <li className="text-[#333] text-sm 537:text-base 590:text-lg font-bold flex items-center gap-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="min-w-6 max-w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z"
                />
              </svg>

              <p className="break-words whitespace-normal max-w-[100px] flex">
                {data.numberOfPassengers}{' '}
                {getPlaceWord(data.numberOfPassengers)}
              </p>
            </li>
            {data.auto && (
              <li className="text-[#333] text-sm 537:text-base 590:text-lg font-bold flex items-center gap-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="min-w-6 max-w-6"
                >
                  <path stroke="none" d="M0 0h24v24H0z" />
                  <circle cx="7" cy="17" r="2" />{' '}
                  <circle cx="17" cy="17" r="2" />{' '}
                  <path d="M5 17h-2v-6l2-5h9l4 5h1a2 2 0 0 1 2 2v4h-2m-4 0h-6m-6 -6h15m-6 0v-5" />
                </svg>

                <p className="break-words whitespace-normal max-w-[200px]">
                  {data.auto}
                </p>
              </li>
            )}
            <li className="text-[#333] text-sm 537:text-base 590:text-lg font-bold flex items-start gap-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="min-w-6 max-w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
                />
              </svg>

              <div>
                <p className="break-words whitespace-normal max-w-[200px]">
                  {data.mainPhone}
                </p>
                {parserSubPhones() &&
                  parserSubPhones()?.map((item, id) => (
                    <p
                      key={id}
                      className="break-words whitespace-normal max-w-[200px]"
                    >
                      {item}
                    </p>
                  ))}
              </div>
            </li>
            {data.comment && (
              <li className="text-[#333] text-sm 537:text-base 590:text-lg font-bold flex items-start gap-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="min-w-6 max-w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
                  />
                </svg>

                <p className="break-words whitespace-normal max-w-[400px]">
                  {data.comment}
                </p>
              </li>
            )}
            {data.$updatedAt && (
              <li className="text-[#333] text-sm 537:text-base 590:text-lg font-bold flex items-start gap-3">
                Дата публикации:
                <p className="break-words whitespace-normal max-w-[400px]">
                  {formattedDate(data.$updatedAt)}
                </p>
              </li>
            )}
          </ul>
        </div>
      </div>
      <div className="mt-16 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] p-6">
        <h3 className="text-xl font-bold text-[#333] mb-3">Карта</h3>
        <div className="rounded-xl shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)]">
          <YandexMap data={data} />
        </div>
      </div>
    </div>
  )
}

export default Detail
