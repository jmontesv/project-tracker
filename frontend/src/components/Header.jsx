import { Flex } from '@radix-ui/themes';
import { Link } from 'react-router-dom';
import './Header.css'


export const Header = () => {
  return (
    <header>
      <Flex direction='row' align='center' style={{justifyContent: 'space-between'}}>
        <Link className='titulo' to='/'>
          <h1>Project-tracker</h1>
        </Link>
        <Flex gap='2'>
          <Link className='link' to='/registro'>Regístrate</Link>
          ó
          <Link className='link' to='/login'>Inicia sesión</Link>
        </Flex>
      </Flex>
    </header>
  )
}