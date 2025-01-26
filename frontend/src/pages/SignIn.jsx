import { Flex, Heading, TextField, Button } from "@radix-ui/themes";
import { useState, useContext } from "react";
import { AuthContext } from '../contexts/AuthContext'
import { useNavigate } from "react-router-dom";

export const SignIn = () => {
  const [credentials, setcredentials] = useState({
    email: '',
    password: ''
  })
  const { login } = useContext(AuthContext)
  const navigate = useNavigate()
  
  const handleChange = (e) => {
    const { name, value } = e.target
    setcredentials({
      ...credentials,
      [name]: value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const userData = await login(credentials) 
    console.log('Usuario ha iniciado sesión', userData)
    navigate('/proyectos')
  }
  
  return (
    <>
      <Heading as="h2" mt='4'>Inicio sesión</Heading>
      <form onSubmit={handleSubmit} style={{display: 'flex', width: '100%', height:'100%', alignItems: 'center', justifyContent: 'center'}}>
        <Flex direction='column' gap='4' minWidth='600px' style={{borderRadius: '8px'}} p='8'>
          <label>Email</label>
          <TextField.Root size="3" name="email" onChange={handleChange} placeholder="Introduce el email..." />
          <label>Contraseña</label>
          <TextField.Root autoComplete="on" size="3" name="password" onChange={handleChange} type="password" placeholder="Introduce la contraseña..." />
          <Button type='submit' variant="classic">Iniciar sesión</Button>
        </Flex>
      </form>
    </>
  );
};