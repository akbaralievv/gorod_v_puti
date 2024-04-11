import React, { Fragment, useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'

import { setIsFavorites } from '../../../redux/slices/files/isFavorites'

function Card({ data }) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [like, setLike] = useState(false)

  const dispatch = useDispatch()

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

  const openModal = () => setIsModalOpen(true)

  const closeModal = () => setIsModalOpen(false)

  return (
    <div className="w-full 500:w-auto md:max-w-full max-w-md flex flex-col flex-auto self-center justify-self-center rounded-lg bg-white text-surface shadow-lg dark:bg-surface-dark dark:text-white sm:shrink-0 sm:grow sm:basis-0">
      {data.image && (
        <>
          <div className="p-6 rounded-t-lg">
            <div
              className="rounded-sm flex justify-center items-center cursor-pointer"
              onClick={openModal}
            >
              <img
                className="rounded-t-lg w-10/12"
                src={data.image}
                alt="Hollywood Sign on The Hill"
              />
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
      <ul className="relative px-6 pb-6 flex flex-col gap-4">
        <li className="flex items-end gap-2">
          <h5 className="text-lg 360:text-xl font-medium">Откуда:</h5>
          <p className="text-lg 360:text-xl truncate">{data.from}</p>
        </li>
        <li className="flex items-end gap-2">
          <h5 className="text-lg 360:text-xl font-medium">Куда:</h5>
          <p className="text-lg 360:text-xl truncate">{data.to}</p>
        </li>
        <li className="flex items-end gap-2">
          <h5 className="text-lg 360:text-xl font-medium">Когда:</h5>
          <p className="text-lg 360:text-xl truncate">
            {data.formattedDateTime}
          </p>
        </li>
        <li className="flex items-end gap-2">
          <h5 className="text-lg 360:text-xl font-medium">
            Количество {data.who === 'Водитель' ? 'мест' : 'человек'}:
          </h5>
          <p className="text-lg 360:text-xl truncate">
            {data.numberOfPassengers}
          </p>
        </li>
        {data.auto && (
          <li className="flex items-end gap-2">
            <h5 className="text-lg 360:text-xl font-medium">Машина:</h5>
            <p className="text-lg 360:text-xl truncate">{data.auto}</p>
          </li>
        )}
        {data.comment && (
          <li className="flex items-end gap-2">
            <h5 className="text-lg 360:text-xl font-medium">Комментарий:</h5>
            <p className="text-lg 360:text-xl truncate">{data.comment}</p>
          </li>
        )}
        <li className="flex justify-end">
          <NavLink
            to={`/transports/${data.$id}`}
            state={data}
            className="inline-flex items-center font-medium text-blue-600 text-lg dark:text-blue-500 hover:underline"
          >
            Показать контакты
            <svg
              className="w-5 h-5 ms-2 mt-0.5 rtl:rotate-180"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 5h12m0 0L9 1m4 4L9 9"
              />
            </svg>
          </NavLink>
        </li>
        <button
          type="button"
          className="absolute z-10 left-[21px] bottom-[22px]"
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
      </ul>
    </div>
  )
}

export default Card
