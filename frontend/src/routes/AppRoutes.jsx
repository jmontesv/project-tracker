import { Routes, Route } from 'react-router-dom';
import { Home } from '../pages/Home';
import Projects from '../pages/Projects';
import { ProjectDetails } from '../pages/ProjectDetails';
import NotFound from '../pages/NotFound';
import { Register } from '../pages/Register';
import { SignIn } from '../pages/SignIn';
import { ProtectedRoute } from '../components/ProtectedRoute';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<SignIn />} />
      <Route path="/registro" element={<Register />} />
      <Route
            path="/proyectos"
            element={
              <ProtectedRoute>
                <Projects />
              </ProtectedRoute>
            }
          />
      <Route path="/proyectos/:id" element={<ProjectDetails />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;