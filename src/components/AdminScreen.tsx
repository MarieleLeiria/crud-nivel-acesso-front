import {  Box, VStack, FormControl, FormLabel, Input, Button, Text,} from "@chakra-ui/react";
import UserScreen from "./UserScreen";
import { useState } from "react";
//import { useNavigate } from "react-router";
import UserInterface from "../interfaces/UserInterface";
import api from "../api/api";


function AdminScreen() {

const [firstName, setFirstname] = useState('')
const [lastName, setLastname] = useState('')
const [email, setEmail] = useState('')
const [senha, setSenha] = useState('')
const [access, setAccess] = useState('')

const [newUser, setNewUser] = useState<UserInterface>()

  

async function createNewUser(){
  try {
    const token = localStorage.getItem('token');
    const response = await api.post(
      'users',
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

    setNewUser(response.data.data);

  } catch (error) {
    console.log(error)
  }
  // setFirstname('')
  // setLastname('')
  // setEmail('')
  // setSenha('')
  // setAcess('')
}

  return(
      
    <Box minH="100vh" bg="#234E52" p={4} color="white" >

      <UserScreen isAdmin={true}/>
      
      <Box
        bg="white"
        marginTop="8rem" 
        color="#234E52"
        maxW="600px"
        mx="auto"
        p={8}
        rounded="md"
        boxShadow="lg"
        >
      <form  onSubmit={(e) => {
                       e.preventDefault()
                       createNewUser()
                   }}>
                    
      
          <FormControl isRequired>
            <FormLabel>Nome</FormLabel>
            <Input placeholder="Digite seu nome"
             focusBorderColor="#38B2AC"
            type="firstName"  
          value= {firstName}
                onChange={(e: React.ChangeEvent<HTMLInputElement >) => {
                const newValue = e.currentTarget.value;
                setFirstname(newValue)
                }}
             />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Sobrenome</FormLabel>
            <Input
              placeholder="Digite seu sobrenome"
              focusBorderColor="#38B2AC"
              type="lastName" 
              value= {lastName}
                onChange={(e: React.ChangeEvent<HTMLInputElement >) => {
                const newValue = e.currentTarget.value;
                setLastname(newValue)
                }}
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              placeholder="Digite seu email"
              focusBorderColor="#38B2AC"
              value= {email}
                onChange={(e: React.ChangeEvent<HTMLInputElement >) => {
                const newValue = e.currentTarget.value;
                setEmail(newValue)
                }}
              />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Senha</FormLabel>
            <Input
              type="senha"
              placeholder="Digite sua senha"
              focusBorderColor="#38B2AC"
              value= {senha}
                onChange={(e: React.ChangeEvent<HTMLInputElement >) => {
                const newValue = e.currentTarget.value;
                setSenha(newValue)
                }}
              />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Acesso</FormLabel>
            <Input
              type="acess"
              placeholder="Tipo de usuario"
              focusBorderColor="#38B2AC"
              value= {access}
                onChange={(e: React.ChangeEvent<HTMLInputElement >) => {
                const newValue = e.currentTarget.value;
                setAccess(newValue)
                }}
              />

          </FormControl>

          <Button type="submit" colorScheme="teal" width="full"
          mt={6}>
            Cadastrar
          </Button>
       
        </form>
      </Box>

     
      <VStack mt={10} spacing={4}>
        {newUser && (
<Box minH="100vh" bg="#234E52" p={8} color="white">
        <Box
        key={newUser.id}
          bg="white"
          color="#234E52"
          p={4}
          rounded="md"
          boxShadow="md"
          width="100%"
          maxW="600px"
          position="relative"
          >
          <Text fontWeight="bold">{newUser.firstName} {newUser.lastName}</Text>
          <Text>{newUser.email}</Text>
          
        </Box>
        </Box>
            )}
      </VStack>
    </Box>


    )
}


export default AdminScreen