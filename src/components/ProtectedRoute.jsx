import { Navigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

const ProtectedRoute = ({ children }) => {
  const auth = useAuth()

  if (!auth.user) {
    return <Navigate to='/signin' />
  }

  return children
}

export default ProtectedRoute
