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
    if (!registerLoading) {
      if (registerError === 409) {
        setAlert(
          'warn',
          'Аккаунт с таким адресом электронной почты уже существует.',
        )
      } else if (registerError === 429) {
        setAlert(
          'error',
          'Превышен предел скорости для регистрации. Пожалуйста, повторите попытку через некоторое время.',
        )
      } else if (registerData) {
        setAlert('success', 'Вы зарегистрировались. А теперь авторизуйтесь.')
      }
    }
  }, [registerLoading, registerError, registerData])

  useEffect(() => {
    if (!loginLoading) {
      if (loginError === 401) {
        setAlert('error', 'Неправильный адрес электронной почты или пароль.')
      } else if (loginError === 429) {
        setAlert(
          'error',
          'Превышен предел скорости для авторизации. Пожалуйста, повторите попытку через некоторое время.',
        )
      } else if (loginData) {
        setAlert('success', 'Вы авторизовались.')
      }
    }
  }, [loginLoading, loginError, loginData])

  useEffect(() => {
    if (!logoutLoading) {
      if (logoutError === 429) {
        setAlert(
          'error',
          'Превышен предел скорости. Пожалуйста, повторите попытку через некоторое время.',
        )
      } else if (logoutError) {
        setAlert('error', 'Произошла непредвиденная ошибка.')
      } else if (logoutData) {
        setAlert('success', 'Вы вышли из аккаунта.')
      }
    }
  }, [logoutLoading, logoutError, logoutData])

  useEffect(() => {
    if (!updatePasswordLoading) {
      if (updatePasswordError === 429) {
        setAlert(
          'error',
          'Превышен предел скорости. Пожалуйста, повторите попытку через некоторое время.',
        )
      } else if (updatePasswordError) {
        setAlert('error', 'Произошла непредвиденная ошибка.')
      } else if (updatePasswordData) {
        setAlert('success', 'Ваш пароль изменен. Теперь авторизуйтесь.')
      }
    }
  }, [updatePasswordLoading, updatePasswordError, updatePasswordData])

  useEffect(() => {
    if (!resetPasswordLoading) {
      if (resetPasswordError === 429) {
        setAlert(
          'error',
          'Превышен предел скорости. Пожалуйста, повторите попытку через некоторое время.',
        )
      } else if (resetPasswordError) {
        setAlert('error', 'Произошла непредвиденная ошибка.')
      } else if (resetPasswordData) {
        setAlert(
          'success',
          'Ссылка отправлена вам на почту. Перейдите по ней для изменения пароля.',
        )
      }
    }
  }, [resetPasswordLoading, resetPasswordError, resetPasswordData])

  function setAlert(type, message) {
    setShowAlert((prev) => ({
      ...prev,
      warn: type === 'warn',
      success: type === 'success',
      error: type === 'error',
      info: type === 'info',
    }))
    setMessage(message)
    setTimeout(() => setShowAlert((prev) => ({ ...prev, [type]: false })), 5000)
  }

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
