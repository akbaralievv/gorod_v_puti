import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import InfoAlert from './alertComponents/InfoAlert'
import SuccessAlert from './alertComponents/SuccessAlert'
import ErrorAlert from './alertComponents/ErrorAlert'
import WarnAlert from './alertComponents/WarnAlert'

function Alerts() {
  const {
    error: registerError,
    registerData,
    loading: registerLoading,
  } = useSelector((state) => state.register)

  const {
    error: loginError,
    loginData,
    loading: loginLoading,
  } = useSelector((state) => state.login)

  const {
    error: logoutError,
    logoutData,
    loading: logoutLoading,
  } = useSelector((state) => state.logout)

  const {
    error: resetPasswordError,
    resetPasswordData,
    loading: resetPasswordLoading,
  } = useSelector((state) => state.resetPassword)

  const {
    error: updatePasswordError,
    updatePasswordData,
    loading: updatePasswordLoading,
  } = useSelector((state) => state.updatePassword)

  const [showAlert, setShowAlert] = useState({
    error: false,
    success: false,
    warn: false,
    info: false,
  })

  const [message, setMessage] = useState('')

  useEffect(() => {
    if (!registerLoading && registerError === 409) {
      setShowAlert((prev) => ({
        ...prev,
        warn: true,
        success: false,
        error: false,
        info: false,
      }))
      setMessage('Аккаунт с таким адресом электронной почты уже существует.')
      setTimeout(
        () =>
          setShowAlert((prev) => ({
            ...prev,
            warn: false,
          })),
        5000,
      )
    } else if (!registerLoading && registerData) {
      setShowAlert((prev) => ({
        ...prev,
        warn: false,
        success: true,
        error: false,
        info: false,
      }))
      setMessage('Вы зарегистрировались. А теперь авторизуйтесь.')
      setTimeout(
        () =>
          setShowAlert((prev) => ({
            ...prev,
            success: false,
          })),
        5000,
      )
    }
  }, [registerLoading])

  useEffect(() => {
    if (!loginLoading && loginError === 401) {
      setShowAlert((prev) => ({
        ...prev,
        warn: false,
        success: false,
        error: true,
        info: false,
      }))
      setMessage('Неправильный адрес электронной почты или пароль.')
      setTimeout(
        () =>
          setShowAlert((prev) => ({
            ...prev,
            error: false,
          })),
        5000,
      )
    } else if (!loginLoading && loginData) {
      setShowAlert((prev) => ({
        ...prev,
        warn: false,
        success: true,
        error: false,
        info: false,
      }))
      setMessage('Вы авторизовались.')
      setTimeout(
        () =>
          setShowAlert((prev) => ({
            ...prev,
            success: false,
          })),
        5000,
      )
    }
  }, [loginLoading])

  useEffect(() => {
    if (!logoutLoading && logoutError) {
      setShowAlert((prev) => ({
        ...prev,
        warn: false,
        success: false,
        error: true,
        info: false,
      }))
      setMessage('Произошла непредвиденная ошибка.')
      setTimeout(
        () =>
          setShowAlert((prev) => ({
            ...prev,
            error: false,
          })),
        5000,
      )
    } else if (!logoutLoading && logoutData) {
      setShowAlert((prev) => ({
        ...prev,
        warn: false,
        success: true,
        error: false,
        info: false,
      }))
      setMessage('Вы вышли из аккаунта.')
      setTimeout(
        () =>
          setShowAlert((prev) => ({
            ...prev,
            success: false,
          })),
        5000,
      )
    }
  }, [logoutLoading])

  useEffect(() => {
    if (!updatePasswordLoading && updatePasswordData) {
      setShowAlert((prev) => ({
        ...prev,
        warn: false,
        success: true,
        error: false,
        info: false,
      }))
      setMessage('Ваш пароль изменен. Теперь авторизуйтесь.')
      setTimeout(
        () =>
          setShowAlert((prev) => ({
            ...prev,
            success: false,
          })),
        5000,
      )
    } else if (!updatePasswordLoading && updatePasswordError) {
      setShowAlert((prev) => ({
        ...prev,
        warn: false,
        success: false,
        error: true,
        info: false,
      }))
      setMessage('Произошла непредвиденная ошибка.')
      setTimeout(
        () =>
          setShowAlert((prev) => ({
            ...prev,
            success: false,
          })),
        5000,
      )
    }
  }, [updatePasswordLoading])

  useEffect(() => {
    if (!resetPasswordLoading && resetPasswordData) {
      setShowAlert((prev) => ({
        ...prev,
        warn: false,
        success: true,
        error: false,
        info: false,
      }))
      setMessage(
        'Ссылка отправлена вам на почту. Перейдите по ней для изменения пароля.',
      )
      setTimeout(
        () =>
          setShowAlert((prev) => ({
            ...prev,
            success: false,
          })),
        5000,
      )
    } else if (!resetPasswordLoading && resetPasswordError) {
      setShowAlert((prev) => ({
        ...prev,
        warn: false,
        success: false,
        error: true,
        info: false,
      }))
      setMessage('Произошла непредвиденная ошибка.')
      setTimeout(
        () =>
          setShowAlert((prev) => ({
            ...prev,
            success: false,
          })),
        5000,
      )
    }
  }, [resetPasswordLoading])

  return (
    <div className="flex flex-col justify-start items-start fixed right-2 top-8 z-10">
      <SuccessAlert isVisible={showAlert.success} message={message} />
      <ErrorAlert isVisible={showAlert.error} message={message} />
      <InfoAlert isVisible={showAlert.info} message={message} />
      <WarnAlert isVisible={showAlert.warn} message={message} />
    </div>
  )
}

export default Alerts
