import { useContext } from 'react';
import { Flex, Heading, Text } from '@radix-ui/themes';
import { Link } from 'react-router-dom';
import './Header.css'
import { AuthContext } from '../contexts/AuthContext';


export const Header = () => {
  const { isAuthenticated } = useContext(AuthContext)
  
  return (
    <header>
      <Flex direction='row' align='center' style={{justifyContent: 'space-between'}}>
        <Link className='titulo' to='/'>
          <Heading>Project-tracker</Heading>
        </Link>
        {
          isAuthenticated 
            ? <Text>Usuario conectado.</Text>
            :   <Flex gap='2'>
                  <Link className='link' to='/registro'>Regístrate</Link>
                  ó
                  <Link className='link' to='/login'>Inicia sesión</Link>
                </Flex>
        }
      </Flex>
    </header>
  )
}