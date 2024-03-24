import { useState, useEffect } from 'react'

const useImageChecker = (url) => {
  const [isValid, setIsValid] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const img = new Image()
    img.onload = () => {
      setIsValid(true)
      setIsLoading(false)
    }
    img.onerror = () => {
      setIsValid(false)
      setIsLoading(false)
    }
    img.src = url
  }, [url])

  return { isValid, isLoading }
}

export default useImageChecker
