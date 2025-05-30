import { createContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { api } from '../api/api'

const AuthContext = createContext({})

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await api.get(`/auth/refreshtoken`)
        if (response?.data?.token) {
          setIsLoggedIn(true)
        } else {
          setIsLoggedIn(false)
        }
      } catch (err) {
        setIsLoggedIn(false)
      } finally {
        setLoading(false)
      }
    }

    checkAuth()
  }, [])

  const login = () => {
    setIsLoggedIn(true)
  }

  const logout = async () => {
    try {
      await api.post(`/auth/logout`)
      setIsLoggedIn(false)
      navigate('/')
    } catch (err) {
      console.error('Login Failed:', err)
    }
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext
