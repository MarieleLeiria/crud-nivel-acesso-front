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
   IconButton ,
   useToast
} from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from 'react-router';
import api from '../api/api'
import {TrashIcon, PencilIcon} from '@phosphor-icons/react'
import { jwtDecode } from "jwt-decode";
import UserInterface from "../interfaces/UserInterface";


function Search() {

   const storedToken = localStorage.getItem('access_token');
    const payload = storedToken ? jwtDecode<{ access?: string }>(storedToken) : null;
    const isAdmin: boolean = payload?.access === 'admin';
    
    const toast = useToast()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  
  const [users, setUsers] = useState<UserInterface[]>([])
  const [user, setUser] = useState<UserInterface | null> (null)
  
  async function findAll() {
    try {
      const response = await api.get('/users');
      setUsers(response.data.data);
      toast({
        title: "Requisição bem-sucedida!",
        description: `Título: ${response.statusText}`,
        status: "success",
        duration: 4000,
          isClosable: true,
          position: "top-right",
        });

  } catch (error) {
    console.error('Erro ao buscar usuários:', error);
      toast({
          title: "Não foi possível realizar a requisição.",
          description: `Título: ${error && typeof error === "object" &&  "message" in error ? (error as any).message : String(error)}`,
          status: "error",
          duration: 4000,
          isClosable: true,
          position: "top-right",
        });
  }
}

    async function findByEmail() {
      if(!email) return;

         await api.get(`/users/${email}`).then((response) =>
        {
          console.log("na function ",response.data)
          setUser(response.data.data)
            toast({
          title: "usuario encontrado!",
          description: `Título: ${response.statusText}`,
          status: "success",
          duration: 4000,
          isClosable: true,
          position: "top-right",
        });

          
        })
        .catch((error) => {
          console.log(error)
           toast({
          title: "Não foi possível buscar ususario.",
          description: `Título: ${error && typeof error === "object" &&  "message" in error ? (error as any).message : String(error)}`,
          status: "error",
          duration: 4000,
          isClosable: true,
          position: "top-right",
        });
        })
        
    }

   async function deleteUser(idToDelete: string) {
  try {
    const response = await api.delete(`/auth/${idToDelete}`);
    console.log("Usuário deletado:", response);

    setUsers((prev) => prev.filter((user) => user.id !== idToDelete));
    if (user?.id === idToDelete) {
      setUser(null);
    }
    toast({
      title: "Usuário deletado",
      status: "success",
      duration: 3000,
      isClosable: true,
      position: "top-right",
    });
  } catch (error: any) {
    console.log("Erro ao deletar:", error);
    toast({
      title: "Erro ao deletar usuário",
      description: `Título: ${error && typeof error === "object" &&  "message" in error ? (error as any).message : String(error)}`,
      status: "error",
      duration: 4000,
      isClosable: true,
      position: "top-right",
    });
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
                    findByEmail()
                  }} >
          <FormControl>
            <FormLabel>Buscar por email</FormLabel>
            <Input
              placeholder="Digite o email do usuário"
              focusBorderColor="#38B2AC"
              bg="white"
              value= {email}
              mb={6}
                onChange={(e: React.ChangeEvent<HTMLInputElement >) => {
                  const newValue = e.currentTarget.value;
                setEmail(newValue)
                
              }}
             
            />
           <Button
                        type="submit"
                        onClick={(e) => {
                          e.preventDefault()
                          findByEmail()
                        }}
                        width="full"
                        size="lg"
                        bg="#38B2AC"
                        color="white"
                        mb={6}
                        _hover={{ bg: "#81E6D9" }}
                        >
                        Buscar
                      </Button>
                        </FormControl>
          <Button
                        
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
            onClick={() => navigate(`/auth/${user.id}`)}
              aria-label="Editar"
              icon={<PencilIcon size={20} />}
              variant="ghost"
              color="red.600"
              _hover={{ bg: "#E6FFFA" }}
              />
          </Flex>
            )}
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
            onClick={() => navigate(`/auth/${user.id}`)}
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

export default Search