import { Navigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

const ProtectedRoute = ({ children }) => {
  const auth = useAuth()
  console.log(auth)

  if (!auth.accessToken) {
    return <Navigate to='/signin' />
  }

  return children
}

export default ProtectedRoute
