import { useState } from "react"
import api from "../api/api"
import {  Box, VStack, FormControl, FormLabel, Input, Button, Text, useToast,Select} from "@chakra-ui/react";
import UserInterface from "../interfaces/UserInterface";
//import {TrashIcon, PencilIcon} from '@phosphor-icons/react'
//import { useNavigate } from "react-router";


function RegisterScreen(){

  const toast = useToast()
  //const navigate = useNavigate()
  
  const [newUser, setNewUser] = useState<UserInterface>()
    const [firstName, setFirstname] = useState('')
    const [lastName, setLastname] = useState('')
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const [access, setAccess] = useState('')

async function createNewUser(){

  try {
    const token = localStorage.getItem('token');
    const response = await api.post(
      'auth',
      {
        firstName,
        lastName,
        email,
        senha,
        access
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
     toast({
          title: "Requisição bem-sucedida!",
          description: `Título: ${response.statusText}`,
          status: "success",
          duration: 4000,
          isClosable: true,
          position: "top-right",
        });

    setNewUser(response.data.data);
    
setFirstname("")
setLastname('')
setEmail('')
setSenha('')
setAccess('')

  } catch (error: unknown) {
    console.log("erro ao criar novo usuario: ", error)
     toast({
          title: "Não foi possível criar usuario.",
          description: `Título: ${error && typeof error === "object" &&  "message" in error ? (error as any).message : String(error)}`,
          status: "error",
          duration: 4000,
          isClosable: true,
          position: "top-right",
        });
  }
}



 return (
    <Box
      minH="100vh"
      bg="#234E52"
      color="white"
      display="flex"
      justifyContent="center"
      alignItems="center"
      overflow="hidden"
    >
      <Box
        bg="white"
        color="#234E52"
        width="100%"
        maxW="600px"
        p={8}
        rounded="md"
        boxShadow="lg"
      >
        <form onSubmit={(e) => {
          e.preventDefault()
          createNewUser()
        }}>
          <VStack spacing={4}>
            <FormControl isRequired>
              <FormLabel>Nome</FormLabel>
              <Input
                placeholder="Digite seu nome"
                focusBorderColor="#38B2AC"
                value={firstName}
                onChange={(e) => setFirstname(e.currentTarget.value)}
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Sobrenome</FormLabel>
              <Input
                placeholder="Digite seu sobrenome"
                focusBorderColor="#38B2AC"
                value={lastName}
                onChange={(e) => setLastname(e.currentTarget.value)}
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                placeholder="Digite seu email"
                focusBorderColor="#38B2AC"
                value={email}
                onChange={(e) => setEmail(e.currentTarget.value)}
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Senha</FormLabel>
              <Input
                type="password"
                placeholder="Digite sua senha"
                focusBorderColor="#38B2AC"
                value={senha}
                onChange={(e) => setSenha(e.currentTarget.value)}
              />
            </FormControl>

            <FormControl isRequired>
             <FormLabel>Acesso</FormLabel>
  <Select
    placeholder='Acesso'
    value={access}
    onChange={(e) => setAccess(e.target.value.toLowerCase())}
    focusBorderColor="#38B2AC"
  >
    <option value='user'>User</option>
    <option value='admin'>Admin</option>
  </Select>

            </FormControl>

            <Button type="submit" colorScheme="teal" width="full" mt={4}>
              Cadastrar
            </Button>
          </VStack>
        </form>

        {newUser && (
          <Box mt={6} p={4} bg="#E6FFFA" borderRadius="md">
            <Text fontWeight="bold">{newUser.firstName} {newUser.lastName}</Text>
            <Text>{newUser.email}</Text>
             
          </Box>
        )}
      </Box>
    </Box>
 )
}

export default RegisterScreen
