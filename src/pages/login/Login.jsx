import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'

import hideEye from '../../assets/icons/authForm/hide eye.png'
import showEye from '../../assets/icons/authForm/view eye.png'

import {
  getUserRequest,
  loginRequest,
  resetPasswordRequest,
} from '../../utils/api'
import { clearLoginData } from '../../redux/slices/account/login'
import { clearResetPasswordData } from '../../redux/slices/account/resetPassword'

import logo from '../../../public/logo blue.png'

const Login = () => {
  const { userData, loading: getUserLoad } = useSelector(
    (state) => state.getUser,
  )
  const { loading: loginLoad } = useSelector((state) => state.login)
  const { resetPasswordData, loading: resetPasswordLoad } = useSelector(
    (state) => state.resetPassword,
  )

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const [eye, setEye] = useState(false)
  const [isForgoutPassword, setIsForgoutPassword] = useState(false)

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()

  const fromPath = location.state?.from || 'unknown'

  const onSubmit = (data) => {
    dispatch(loginRequest(data))
  }

  const handleForgoutPassword = (e) => {
    e.preventDefault()
    setIsForgoutPassword(true)
  }

  const onSubmitForgoutPassword = (data) => {
    dispatch(resetPasswordRequest(data))
  }

  useEffect(() => {
    if (fromPath !== '/register') {
      dispatch(getUserRequest())
    }
    return () => {
      dispatch(clearLoginData())
      dispatch(clearResetPasswordData())
    }
  }, [])

  useEffect(() => {
    if (!getUserLoad && userData) {
      navigate('/')
    }
  }, [getUserLoad, userData, navigate])

  useEffect(() => {
    if (!resetPasswordLoad && resetPasswordData) {
      setIsForgoutPassword(false)
    }
  }, [resetPasswordLoad, resetPasswordData])

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          className="mx-auto w-28 cursor-pointer"
          src={logo}
          alt="logo"
          onClick={() => setIsForgoutPassword(false)}
        />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          {!isForgoutPassword ? 'Войдите в свой аккаунт' : 'Сброс пароля'}
        </h2>
      </div>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        {!isForgoutPassword ? (
          <form
            className="space-y-6"
            action="#"
            method="POST"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Ваш адрес электронной почты
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  {...register('email', {
                    required: 'Требуется электронная почта',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                      message: 'Некорректный адрес электронной почты',
                    },
                  })}
                  className={`${errors.email ? 'bg-red-500 bg-opacity-25' : ''} block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
                />
                {errors.email && (
                  <p className="text-sm leading-6 text-red-500">
                    {errors.email.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Ваш пароль
                </label>
                <div className="text-sm">
                  <button
                    onClick={handleForgoutPassword}
                    className="font-semibold text-indigo-600 hover:text-indigo-500"
                  >
                    Забыли свой пароль?
                  </button>
                </div>
              </div>
              <div className="mt-2">
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={eye ? 'text' : 'password'}
                    autoComplete="current-password"
                    {...register('password', {
                      required: 'Требуется пароль',
                      minLength: {
                        value: 8,
                        message: 'Пароль должен быть не менее 8 символов',
                      },
                    })}
                    className={`${errors.password ? 'bg-red-500 bg-opacity-25' : ''} block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
                  />
                  <img
                    src={eye ? showEye : hideEye}
                    alt="eye"
                    onClick={() => setEye(!eye)}
                    className="mx-auto w-6 absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer"
                  />
                </div>
                {errors.password && (
                  <p className="text-sm leading-6 text-red-500">
                    {errors.password.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loginLoad || getUserLoad}
                className={`${getUserLoad || loginLoad ? 'bg-indigo-500' : ''} flex w-full items-center justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
              >
                {loginLoad || getUserLoad ? (
                  <>
                    <svg
                      aria-hidden="true"
                      role="status"
                      className="inline w-4 h-4 me-3 text-white animate-spin"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="#E5E7EB"
                      />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentColor"
                      />
                    </svg>
                    Загрузка...
                  </>
                ) : (
                  'Авторизоваться'
                )}
              </button>
            </div>
          </form>
        ) : (
          <form
            className="space-y-6"
            action="#"
            method="POST"
            onSubmit={handleSubmit(onSubmitForgoutPassword)}
          >
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Введите свой адрес электронной почты
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  {...register('email', {
                    required: 'Требуется электронная почта',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                      message: 'Некорректный адрес электронной почты',
                    },
                  })}
                  className={`${errors.email ? 'bg-red-500 bg-opacity-25' : ''} block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
                />
                {errors.email && (
                  <p className="text-sm leading-6 text-red-500">
                    {errors.email.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={resetPasswordLoad}
                className={`${resetPasswordLoad ? 'bg-indigo-500' : ''} flex w-full items-center justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
              >
                {resetPasswordLoad ? (
                  <>
                    <svg
                      aria-hidden="true"
                      role="status"
                      className="inline w-4 h-4 me-3 text-white animate-spin"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="#E5E7EB"
                      />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentColor"
                      />
                    </svg>
                    Загрузка...
                  </>
                ) : (
                  'Отправить'
                )}
              </button>
            </div>
          </form>
        )}
        <p className="mt-10 text-center text-sm text-gray-500">
          У вас еще нет аккаунта?{' '}
          <NavLink
            to={'/register'}
            state={{ from: location.pathname }}
            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
          >
            Зарегистрируйтесь.
          </NavLink>
        </p>
      </div>
    </div>
  )
}

export default Login
