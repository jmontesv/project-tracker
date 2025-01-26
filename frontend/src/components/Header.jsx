import { useContext} from 'react';
import { Flex, Heading, Spinner, DropdownMenu, Button } from '@radix-ui/themes';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css'
import { AuthContext } from '../contexts/AuthContext';


export const Header = () => {
  const { isAuthenticated, user, error: errorUser, loading, logout } = useContext(AuthContext)
  const navigate = useNavigate()


  const handleLogOut = () => {
    logout()
    navigate('/login')
  }

  const handleEditProfile = (e) => {
    console.log(e)
  }
  console.log(user)
  return (
    <header>
      <Flex direction="row" align="center" style={{ justifyContent: "space-between" }}>
        <Link className="titulo" to="/">
          <Heading as="h1">Project-tracker</Heading>
        </Link>
        {loading && <Spinner />}
        {isAuthenticated ? (
          !errorUser && (
            <DropdownMenu.Root>
              <DropdownMenu.Trigger>
                <Button color='orange' variant="soft">
                  {user.email}
                  <DropdownMenu.TriggerIcon />
                </Button>
              </DropdownMenu.Trigger>
              <DropdownMenu.Content>
                <DropdownMenu.Item onSelect={handleEditProfile}>Editar perfil</DropdownMenu.Item>
                <DropdownMenu.Item onSelect={handleLogOut}>Cerrar sesión</DropdownMenu.Item>
              </DropdownMenu.Content>
            </DropdownMenu.Root>
          )
        ) : (
          <Flex gap="2">
            <Link className="link" to="/registro">
              Regístrate
            </Link>
            ó
            <Link className="link" to="/login">
              Inicia sesión
            </Link>
          </Flex>
        )}
      </Flex>
    </header>
  );
}