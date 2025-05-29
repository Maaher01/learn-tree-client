import { useContext } from 'react'
import AuthContext from '../context/AuthContext'
import DefaultLayout from '../layout/DefaultLayout'
import { Navigate } from 'react-router-dom'

const ProtectedRoute = () => {
  const { isLoggedIn } = useContext(AuthContext)

  return isLoggedIn ? <DefaultLayout /> : <Navigate to={'/login'} replace />
}

export default ProtectedRoute
