import { createContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { api } from '../api/api'

const AuthContext = createContext({})

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState(null)

  useEffect(() => {
    checkAuth()
  }, [])

  const logout = async () => {
    try {
      await api.post(`/auth/logout`)
      setIsLoggedIn(false)
      localStorage.removeItem('activeSubjectTab')
      navigate('/')
    } catch (err) {
      console.error('Login Failed:', err)
    }
  }

  const checkAuth = async () => {
    try {
      const response = await api.get(`/auth/refreshtoken`)
      if (response?.data?.token) {
        setIsLoggedIn(true)
        setUser(response.data.user)
      } else {
        setIsLoggedIn(false)
      }
    } catch (err) {
      setIsLoggedIn(false)
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn, logout, loading, user, checkAuth }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext
