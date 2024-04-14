import React, { Fragment, useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { Spin } from 'antd'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'

import PublicationForm from '../../forms/publicationForm/PublicationForm'
import {
  setIsFavorites,
  setIsToggleFavorites,
} from '../../../redux/slices/files/isFavorites'
import { deleteFileRequest } from '../../../utils/api'
import { useDeleteDriverCollectionMutation } from '../../../services/databases/driverCollection'
import { useDeletePassengersCollectionMutation } from '../../../services/databases/passengerCollection'

function Card({ data, edit, passengersRefetch, driverRefetch }) {
  const [
    deleteDriverDatabases,
    {
      data: driverDeleteData,
      isLoading: driverDeleteLoading,
      error: driverDeleteError,
    },
  ] = useDeleteDriverCollectionMutation()
  const [
    deletePassengersDatabases,
    {
      data: passengersDeleteData,
      isLoading: passengersDeleteLoading,
      error: passengersDeleteError,
    },
  ] = useDeletePassengersCollectionMutation()
  const { deleteFileData, loading: deleteFileLoading } = useSelector(
    (state) => state.deleteFile,
  )
  const { isToggleFavorites } = useSelector((state) => state.isFavorites)

  const [isImageModalOpen, setIsImageModalOpen] = useState(false)
  const [isFormModalOpen, setIsFormModalOpen] = useState(false)
  const [like, setLike] = useState(false)
  const [isLoadingImage, setIsLoadingImage] = useState(true)

  const dispatch = useDispatch()

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || []
    const isLiked = favorites?.find((favorite) => favorite.$id === data.$id)
    setLike(isLiked)
  }, [data])

  useEffect(() => {
    dispatch(setIsToggleFavorites(!isToggleFavorites))
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

  const openFormModal = () => setIsFormModalOpen(true)
  const closeFormModal = () => setIsFormModalOpen(false)

  const openImageModal = () => setIsImageModalOpen(true)
  const closeImageModal = () => setIsImageModalOpen(false)

  const handleDelete = () => {
    const match = data.image.match(/\/files\/([^\/]+)\/view/)
    if (
      match[1] !== '661620b87a5a88ef6b42' &&
      match[1] !== '661620afb015b8f51258'
    ) {
      dispatch(
        deleteFileRequest({
          id: match[1],
        }),
      )
    }
    if (data.who === 'Пассажир') {
      deletePassengersDatabases({ id_unique: data.$id })
        .unwrap()
        .then((payload) => passengersRefetch())
    } else {
      deleteDriverDatabases({ id_unique: data.$id })
        .unwrap()
        .then((payload) => driverRefetch())
    }
  }

  return (
    <div className="max-w-sm w-full flex flex-col flex-auto self-center justify-self-center rounded-lg bg-white text-surface shadow-lg dark:bg-surface-dark dark:text-white sm:shrink-0 sm:grow sm:basis-0">
      {data.image && (
        <>
          <div className="p-6 rounded-t-lg">
            <div
              className="rounded-sm flex justify-center items-center cursor-pointer"
              onClick={openImageModal}
            >
              {isLoadingImage && (
                <div className="flex items-center justify-center w-full h-48 bg-gray-300 rounded sm:w-96 dark:bg-gray-700">
                  <svg
                    className="w-10 h-10 text-gray-200 dark:text-gray-600"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 18"
                  >
                    <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                  </svg>
                </div>
              )}
              <img
                className="rounded w-5/12"
                src={data.image}
                alt="Hollywood Sign on The Hill"
                onLoad={() => setIsLoadingImage(false)}
              />
            </div>
          </div>
          <Transition.Root show={isImageModalOpen} as={Fragment}>
            <Dialog
              as="div"
              className="relative z-10"
              onClose={closeImageModal}
            >
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
                    <Dialog.Panel className="relative transform rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
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
                          onClick={closeImageModal}
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
      <ul className="px-6 pb-6 flex flex-col gap-4">
        <li className="flex items-end gap-2">
          <h5 className="text-md 360:text-lg 1120:text-xl font-medium">
            Откуда:
          </h5>
          <p className="text-md 360:text-lg 1120:text-xl truncate">
            {data.from}
          </p>
        </li>
        <li className="flex items-end gap-2">
          <h5 className="text-md 360:text-lg 1120:text-xl font-medium">
            Куда:
          </h5>
          <p className="text-md 360:text-lg 1120:text-xl truncate">{data.to}</p>
        </li>
        <li className="flex items-end gap-2">
          <h5 className="text-md 360:text-lg 1120:text-xl font-medium">
            Когда:
          </h5>
          <p className="text-md 360:text-lg 1120:text-xl truncate">
            {data.formattedDateTime}
          </p>
        </li>
        <li className="flex items-end gap-2">
          <h5 className="text-md 360:text-lg 1120:text-xl font-medium">
            Количество {data.who === 'Водитель' ? 'мест' : 'человек'}:
          </h5>
          <p className="text-md 360:text-lg 1120:text-xl truncate">
            {data.numberOfPassengers}
          </p>
        </li>
        {data.auto && (
          <li className="flex items-end gap-2">
            <h5 className="text-md 360:text-lg 1120:text-xl font-medium">
              Машина:
            </h5>
            <p className="text-md 360:text-lg 1120:text-xl truncate">
              {data.auto}
            </p>
          </li>
        )}
        {data.comment && (
          <li className="flex items-end gap-2">
            <h5 className="text-md 360:text-lg 1120:text-xl font-medium">
              Комментарий:
            </h5>
            <p className="text-md 360:text-lg 1120:text-xl truncate">
              {data.comment}
            </p>
          </li>
        )}
        {data.$updatedAt && (
          <li className="flex items-end gap-2">
            <h5 className="text-md 360:text-lg 1120:text-xl font-medium">
              Дата публикации:
            </h5>
            <p className="text-md 360:text-lg 1120:text-xl truncate">
              {formattedDate(data.$updatedAt)}
            </p>
          </li>
        )}
        <li className="flex justify-between">
          <div className="flex items-center gap-2">
            <button
              type="button"
              className="text-neutral-600 hover:text-current"
              onClick={handleLike}
            >
              {!like ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
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
          <NavLink
            to={`/transports/${data.$id}`}
            state={data}
            className="inline-flex items-center font-medium text-blue-600 text-sm 360:text-md 1120:text-lg dark:text-blue-500 hover:underline"
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
        {edit && (
          <li className="flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={openFormModal}
              className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-sm px-3.5 py-1.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
            >
              Изменить
            </button>
            <button
              type="button"
              onClick={handleDelete}
              className="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-3.5 py-1.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
              disabled={
                passengersDeleteLoading ||
                driverDeleteLoading ||
                deleteFileLoading
              }
            >
              {passengersDeleteLoading ||
              driverDeleteLoading ||
              deleteFileLoading ? (
                <Spin />
              ) : (
                'Удалить'
              )}
            </button>
            <Transition.Root show={isFormModalOpen} as={Fragment}>
              <Dialog
                as="div"
                className="relative z-20"
                onClose={closeFormModal}
              >
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="fixed inset-0 bg-black bg-opacity-25" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                  <div className="flex min-h-full items-center justify-center p-4 text-center">
                    <Transition.Child
                      as={Fragment}
                      enter="ease-out duration-300"
                      enterFrom="opacity-0 scale-95"
                      enterTo="opacity-100 scale-100"
                      leave="ease-in duration-200"
                      leaveFrom="opacity-100 scale-100"
                      leaveTo="opacity-0 scale-95"
                    >
                      <Dialog.Panel className="card publication w-11/12 flex flex-col justify-center items-center transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                        <PublicationForm
                          isToggle={data.who === 'Пассажир' ? true : false}
                          initialData={data}
                          closeFormModal={closeFormModal}
                          passengersRefetch={passengersRefetch}
                          driverRefetch={driverRefetch}
                        />
                        <button onClick={closeFormModal} className="mt-4">
                          Закрыть
                        </button>
                      </Dialog.Panel>
                    </Transition.Child>
                  </div>
                </div>
              </Dialog>
            </Transition.Root>
          </li>
        )}
      </ul>
    </div>
  )
}

export default Card
