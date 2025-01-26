import './App.css'
import { Flex } from '@radix-ui/themes';
import { BrowserRouter, Link } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import { Header } from './components/Header';


function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <main>
          <aside className='menu'>
            <Link to='/proyectos'>Proyectos</Link>
          </aside>
          <Flex width='100%' direction='column' minHeight='80vh'>
            <AppRoutes />
          </Flex>
        </main>
      </BrowserRouter>
    </>
  )
}

export default App
