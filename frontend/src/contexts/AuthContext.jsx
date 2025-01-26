import { createContext, useState, useEffect } from 'react'
import { login as signIn } from '../services/authService'
import { getUser } from '../services/authService'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null)
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState({})
  const [error, setError] = useState(null)

  
  useEffect(() => {
    const token = localStorage.getItem('authToken')
    if (token) {
      setIsAuthenticated(true) // Mantener la sesión entre renderizados
      const fetchUser = async () => {
        try {
          setLoading(true)
          const userData = await getUser()
          setUser(userData);
        } catch (err) { 
            setIsAuthenticated(false)
            setError(err.message)
        } finally {
          setLoading(false)
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
      setUser(response.user)
      // Devolver una indicación de éxito si es necesario
      return response;
    } catch (err) {
      console.error(err)
      throw err
    }
  } 
  
  const logout = () => {
    localStorage.removeItem('authToken')
    setIsAuthenticated(false)
    setUser({})
  }
  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, user, error, loading }}>
      {children}
    </AuthContext.Provider>
  )
}