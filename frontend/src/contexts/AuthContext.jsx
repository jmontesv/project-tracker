import { createContext, useState, useEffect } from 'react'
import { login as signIn } from '../services/authService'
import { getUser } from '../services/authService'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null)
  const [user, setUser] = useState({})
  const [error, setError] = useState(null)

  
  useEffect(() => {
    const token = localStorage.getItem('authToken')
    if (token) {
      setIsAuthenticated(true) // Mantener la sesión entre renderizados
      const fetchUser = async () => {
        try {
          const userData = await getUser()
          setUser(userData);
        } catch (err) {
          setError(err.message);
        } 
      }
      fetchUser()
    }
  }, [])
  
  
  console.log(isAuthenticated)

  const login = async (credentials) => {
    try {
      const response = await signIn(credentials.email, credentials.password);
      localStorage.setItem('authToken', response.token)
      setIsAuthenticated(true)
    } catch (err) {
      console.error(err)
    }
  } 
  const logout = () => {
    setIsAuthenticated(false)
  }
  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, user }}>
      {children}
    </AuthContext.Provider>
  )
}