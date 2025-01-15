import { createContext, useState, useEffect } from 'react'
import { login as signIn } from '../services/authService'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null)
  const [user, setuser] = useState({})

  
  useEffect(() => {
    const token = localStorage.getItem('authToken')
    if (token) {
      setIsAuthenticated(true); // Mantener la sesión entre renderizados
    }
  }, []);
  
  
  console.log(isAuthenticated)

  const login = async (credentials) => {
    try {
      const response = await signIn(credentials.email, credentials.password);
      setuser(response?.user)
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