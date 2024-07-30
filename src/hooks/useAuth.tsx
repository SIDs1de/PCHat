import { useEffect, useState } from 'react'
import { getTokens } from '../utils/tokenUtils'

const defaultAuthState = {
  user: null,
  accessToken: null,
  refreshToken: null,
}

export const useAuth = () => {
  const [auth, setAuth] = useState(defaultAuthState)

  useEffect(() => {
    const tokens = getTokens()

    if (tokens.accessToken && tokens.refreshToken) {
      // TODO: прописать юзера
      setAuth(tokens)
    }
  }, [])

  return auth
}
