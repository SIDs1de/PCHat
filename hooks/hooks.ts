import { AppDispatch, AppStore, RootState } from '@/store/store'
import { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector, useStore } from 'react-redux'

const ACCESS_TOKEN_KEY = 'accessToken'

export const useAccessToken = () => {
  const [accessToken, setAccessTokenState] = useState<string | null>(() => {
    return typeof window !== 'undefined' ? localStorage.getItem(ACCESS_TOKEN_KEY) : null
  })

  const setAccessToken = useCallback((token: string | null) => {
    if (token) {
      localStorage.setItem(ACCESS_TOKEN_KEY, token)
      setAccessTokenState(token)
    } else {
      localStorage.removeItem(ACCESS_TOKEN_KEY)
      setAccessTokenState(null)
    }
  }, [])

  const getAccessToken = useCallback(() => {
    return localStorage.getItem(ACCESS_TOKEN_KEY)
  }, [])

  useEffect(() => {
    const handleStorageChange = () => {
      const token = localStorage.getItem(ACCESS_TOKEN_KEY)
      setAccessTokenState(token)
    }

    window.addEventListener('storage', handleStorageChange)

    return () => {
      window.removeEventListener('storage', handleStorageChange)
    }
  }, [])

  return {
    accessToken,
    setAccessToken,
    getAccessToken,
  }
}

export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()
export const useAppStore = useStore.withTypes<AppStore>()
