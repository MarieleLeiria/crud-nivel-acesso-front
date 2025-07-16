import {
  Box,
  Flex,
  FormControl,
  FormLabel,
  Input,
  SimpleGrid,
  Text,
  Heading,
  Button,
   IconButton 
} from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate, useParams } from 'react-router';
import api from '../api/api'
import {TrashIcon, PencilIcon} from '@phosphor-icons/react'

import UserInterface from "../interfaces/UserInterface";


function UserScreen({isAdmin = false} : {isAdmin?: boolean } = {}) {
  
  
  const navigate = useNavigate()
    const [id, setId] = useState('')
   
    const [users, setUsers] = useState<UserInterface[]>([])
    const [user, setUser] = useState<UserInterface | null> (null)



    async function findAll() {
  try {
    const response = await api.get('/users');
    setUsers(prevUsers => [...prevUsers, ...response.data.data]);
    console.log(response.data.data);
  } catch (error) {
    console.error('Erro ao buscar usuários:', error);
  }
}
  

    async function findById() {
      if(!id) return;

         await api.get(`/users/${id}`).then((response) =>
        {
          setUser(response.data.data)
          
        })
        .catch((error) => {
          console.log(error)
        })
        setId("")
    }

    async function deleteUser(idToDelete : string) {
      try {
        
        await api.delete(`/users/${idToDelete}`).then((response) => {
          setUsers(users.filter((user) => user.id !== idToDelete))
          console.log("chegou", response)
  //setUsers()
        })
      } catch (error) {
        console.log(error)
      }
    }


    return(
         <Box minH="100vh" bg="#234E52" p={8} color="white">
     
      <Box
        bg="white"
        color="#234E52"
        maxW="60rem"
        mx="auto"
        marginTop="8rem"
        p={8}
        rounded="md"
        boxShadow="lg"
      >
        <Heading size="lg" mb={6}>
          Buscar Usuários
        </Heading>

      
        <Flex
          direction={["column", "row"]}
          gap={10}
          mb={8}
        >
          <form onSubmit={(e) => {
                    e.preventDefault()
                    findById()
                  }} >
          <FormControl>
            <FormLabel>Buscar por ID</FormLabel>
            <Input
              placeholder="Digite o ID do usuário"
              focusBorderColor="#38B2AC"
              bg="white"
              value= {id}
              mb={6}
                onChange={(e: React.ChangeEvent<HTMLInputElement >) => {
                  const newValue = e.currentTarget.value;
                setId(newValue)
                
              }}
             
            />
           <Button
                        type="submit"
                        width="full"
                        size="lg"
                        bg="#38B2AC"
                        color="white"
                        mb={6}
                        _hover={{ bg: "#81E6D9" }}
                        >
                        Buscar
                      </Button>
          <Button
                        type="submit"
                        onClick={(e) => {
                    e.preventDefault()
                    findAll()
                  }}
                        width="full"
                        size="lg"
                        bg="#38B2AC"
                        color="white"
                        _hover={{ bg: "#81E6D9" }}
                        >
                        Exibir todos
                      </Button>
                        </FormControl>
          </form>
                
        </Flex>

        <Flex>
       
          {user && (
            <Box
              key={user.id}
              bg="#E6FFFA"
              gap={6}
              p={4}
              mb={6}
              rounded="md"
              boxShadow="md"
              transition="0.2s"
              _hover={{ transform: "scale(1.02)", boxShadow: "lg" }}
            >
              <Text fontWeight="bold">{user.firstName}  {user.lastName}</Text>
              <Text>Email: {user.email}</Text>
              <Text>ID: {user.id}</Text>
            </Box>
          )}
        </Flex>

                
              <SimpleGrid columns={[1, 2, 3]} spacing={6}>
          {users.map((user) => (
            <Box
              key={user.id}
              bg="#E6FFFA"
              p={4}
              rounded="md"
              boxShadow="md"
              transition="0.2s"
              _hover={{ transform: "scale(1.02)", boxShadow: "lg" }}
            >
              <Text fontWeight="bold">{user.firstName} {user.lastName}</Text>
              <Text>Email: {user.email}</Text>
              <Text>ID: {user.id}</Text>
              {isAdmin && (
              <Flex position="absolute" top={2} right={2} gap={2}>
            <IconButton
            onClick={() => deleteUser(user.id)}
              aria-label="Excluir"
              icon={<TrashIcon size={20} />}
              variant="ghost"
              color="#234E52"
              _hover={{ bg: "#E6FFFA" }}
              />
            <IconButton
            onClick={() => navigate(`/user/${user.id}`)}
              aria-label="Editar"
              icon={<PencilIcon size={20} />}
              variant="ghost"
              color="red.600"
              _hover={{ bg: "#E6FFFA" }}
              />
          </Flex>
            )}

            </Box>
            
          ))}
        </SimpleGrid>
    
      </Box>
    </Box>
    )
}

export default UserScreen