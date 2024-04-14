import { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useLocation } from 'react-router-dom'

import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'

import { getFileRequest, logoutRequest } from '../../utils/api'
import { clearLogoutData } from '../../redux/slices/account/logout'
import useImageChecker from '../../hooks/useImageChecker'

import logo from '../../../public/logo white.png'

const navigation = [
  { name: 'Главная', to: '/', current: true },
  { name: 'Транспорты', to: '/transports', current: false },
  { name: 'Пассажиры', to: '/passengers', current: false },
  { name: 'Избранные', to: '/favorites', current: false },
  { name: 'Мои посты', to: '/myPublications', current: false },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

function Header() {
  const { userData } = useSelector((state) => state.getUser)
  const { loading: loadLogout } = useSelector((state) => state.logout)
  const { getFileData, loading: loadImage } = useSelector(
    (state) => state.getFile,
  )
  const { isValid, isLoading } = useImageChecker(getFileData)
  const { isFavorites, isToggleFavorites } = useSelector(
    (state) => state.isFavorites,
  )
  const [badgeNumber, setBadgeNumber] = useState(0)

  const dispatch = useDispatch()
  const location = useLocation()

  const isActive = (path) => location.pathname === path

  const handleClickSignOut = (e) => {
    e.preventDefault()
    dispatch(logoutRequest())
  }

  useEffect(() => {
    dispatch(getFileRequest(userData?.$id))
    return () => dispatch(clearLogoutData())
  }, [])

  useEffect(() => {
    const arrayNumber = JSON.parse(localStorage.getItem('favorites')) || []
    setBadgeNumber(arrayNumber?.length)
  }, [isFavorites, isToggleFavorites])

  return (
    <Disclosure as="nav" className="bg-gray-800">
      {({ open, close }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <NavLink to={'/'} className="flex flex-shrink-0 items-center">
                  <img className="h-8 w-auto" src={logo} alt="Your Company" />
                </NavLink>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <NavLink
                        key={item.name}
                        to={item.to}
                        className={({ isActive }) =>
                          classNames(
                            isActive
                              ? 'bg-gray-900 text-white'
                              : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                            `rounded-md px-3 py-2 text-sm font-medium ${item.name === 'Избранные' ? 'relative' : ''}`,
                          )
                        }
                        aria-current={isActive(item.to) ? 'page' : undefined}
                      >
                        {item.name}
                        {item.name === 'Избранные' && (
                          <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 rounded-full -top-2 -end-2">
                            {badgeNumber}
                          </div>
                        )}
                      </NavLink>
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <Menu as="div" className="relative ml-3">
                  <div>
                    <Menu.Button className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">Open user menu</span>
                      {isValid && !isLoading ? (
                        <img
                          className="h-8 w-8 rounded-full"
                          src={getFileData}
                          alt=""
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
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <Menu.Item>
                        {({ active }) => (
                          <NavLink
                            to="/profile"
                            className={classNames(
                              active ? 'bg-gray-100' : '',
                              'block px-4 py-2 text-sm text-gray-700 w-full flex justify-start items-center',
                            )}
                          >
                            Личный кабинет
                          </NavLink>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            onClick={handleClickSignOut}
                            disabled={loadLogout}
                            className={classNames(
                              active ? 'bg-gray-100' : '',
                              'block px-4 py-2 text-sm text-gray-700 w-full flex justify-start items-center',
                            )}
                          >
                            Выйти из аккаунта
                          </button>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigation.map((item) => (
                <div
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current
                      ? 'bg-gray-900 text-white'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                    'block rounded-md px-3 py-2 text-base font-medium cursor-pointer',
                  )}
                  aria-current={item.current ? 'page' : undefined}
                >
                  <NavLink
                    to={item.to}
                    onClick={() => {
                      if (open) {
                        close()
                      }
                    }}
                  >
                    {item.name}
                  </NavLink>
                </div>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}
export default Header
