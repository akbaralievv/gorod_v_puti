import React from 'react'
import { useSelector } from 'react-redux'
import useImageChecker from '../../hooks/useImageChecker'

function Profile() {
  const { userData, loading: getUserLoad } = useSelector(
    (state) => state.getUser,
  )
  const { getFileData, loading: loadImage } = useSelector(
    (state) => state.getFile,
  )
  const { isValid, isLoading } = useImageChecker(getFileData)

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
  return (
    <div className="flex-1 py-16 mx-auto max-w-7xl px-6 lg:px-8">
      <div className="px-4 sm:px-0">
        <h3 className="text-base font-semibold leading-7 text-gray-900">
          Ваши личные данные
        </h3>
      </div>
      <div className="mt-6 border-t border-gray-100">
        <dl className="divide-y divide-gray-100">
          <div className="gap-6 px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Фото
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {isValid && !isLoading ? (
                <img
                  class="rounded-full "
                  src={getFileData}
                  alt="image description"
                />
              ) : (
                <svg
                  className="text-gray-300 h-8 w-8 rounded-full"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              )}
            </dd>
          </div>

          {userData.name && (
            <div className="gap-6 px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Имя
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {userData.name}
              </dd>
            </div>
          )}
          {userData.email && (
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Почта
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {userData.email}
                {userData.emailVerification && (
                  <span className="ml-4 bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300">
                    Верифицирован
                  </span>
                )}
              </dd>
            </div>
          )}
          {formattedDate(userData.registration) && (
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Дата регистрации
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {formattedDate(userData.registration)}
              </dd>
            </div>
          )}
          {userData.labels?.length > 0 && (
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Роль
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {userData.labels?.join(', ')}
              </dd>
            </div>
          )}
          {userData.passwordUpdate && (
            <div className="gap-12 px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Дата последнего обновления пароля
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {formattedDate(userData.passwordUpdate)}
              </dd>
            </div>
          )}
        </dl>
      </div>
    </div>
  )
}

export default Profile
