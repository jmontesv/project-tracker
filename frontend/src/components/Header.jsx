import { useContext, useEffect, useState } from 'react';
import { Flex, Heading, Text } from '@radix-ui/themes';
import { Link } from 'react-router-dom';
import './Header.css'
import { AuthContext } from '../contexts/AuthContext';
import { getUser } from '../services/authService';


export const Header = () => {
  const { isAuthenticated } = useContext(AuthContext)
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await getUser()
        setUser(user)
      }catch(error) {
        setError(error)
      } finally {
        setLoading(false)
      }
    } 
    fetchUser();
  }, []);

  return (
    <header>
      <Flex direction='row' align='center' style={{justifyContent: 'space-between'}}>
        <Link className='titulo' to='/'>
          <Heading>Project-tracker</Heading>
        </Link>
        {
          isAuthenticated 
            ? !loading && !error && <Text>{user.username}</Text>
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