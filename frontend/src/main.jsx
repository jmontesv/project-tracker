import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { TaskProvider } from './contexts/TaskContext';
import "@radix-ui/themes/styles.css";
import './index.css'
import { Theme } from "@radix-ui/themes";
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Theme>
      <TaskProvider>
        <App />
      </TaskProvider>
    </Theme>
  </StrictMode>,
)
