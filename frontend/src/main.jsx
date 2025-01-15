import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { TaskProvider } from './contexts/TaskContext';
import "@radix-ui/themes/styles.css";
import './index.css'
import { Theme } from "@radix-ui/themes";
import App from './App.jsx'
import { AuthProvider } from './contexts/AuthContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Theme>
      <AuthProvider>
        <TaskProvider>
          <App />
        </TaskProvider>
      </AuthProvider>
    </Theme>
  </StrictMode>,
)
