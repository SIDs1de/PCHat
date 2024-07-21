// hooks/useAuth.js
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { setCredentials } from '../store/authSlice'
import { getTokens } from '../utils/tokenUtils'

export const useAuth = () => {
  const dispatch = useDispatch()
  const auth = useSelector(state => state.auth)

  useEffect(() => {
    const tokens = getTokens()
    if (tokens.accessToken && tokens.refreshToken) {
      dispatch(
        setCredentials({
          user: {
            /* добавить здесь логику получения данных пользователя */
          },
          accessToken: tokens.accessToken,
          refreshToken: tokens.refreshToken,
        })
      )
    }
  }, [dispatch])

  return auth
}
