import './App.css'
import { Flex } from '@radix-ui/themes';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import { Header } from './components/Header';


function App() {
 
  return (
    <>
      <BrowserRouter>
        <Header />
        <Flex direction='column' justify='center' align='center'>
          <AppRoutes />
        </Flex>
      </BrowserRouter>
    </>
  )
}

export default App
