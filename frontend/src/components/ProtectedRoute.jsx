import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

export const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useContext(AuthContext)

  console.log('isAuthenticated en ProtectedRoute:', isAuthenticated);

  
  if (isAuthenticated === null) {
    return <p>Cargando autenticación...</p>;
  }

  // Si no está autenticado, redirigimos al login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  // Si está autenticado, mostramos los elementos hijos
  return children;
}