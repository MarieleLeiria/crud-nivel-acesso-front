 import { useState } from "react";
 import {Box, FormControl, FormLabel, Input, Button} from "@chakra-ui/react";
import api from "../api/api";
// import UserInterface from "@/interfaces/UserInterface";
import { useParams } from "react-router";

function UpdateUserScreen() {

const [firstName, setFirstname] = useState('')
const [lastName, setLastname] = useState('')
const [email, setEmail] = useState('')
const [senha, setSenha] = useState('')
const [acess, setAcess] = useState('')

const {id} = useParams()


async function updateUser() {
  const token = localStorage.getItem('token');
        try {
        await api.patch(`users/${id}`, {
            firstName,
            lastName,
            email,
            senha,
            acess
           
          },
        { headers: {
          Authorization: `Bearer ${token}`
        }}
        )
        } catch (error) {
          console.log(error)
        }
      }


      return(
         <Box minH="100vh" bg="#234E52" p={8} color="white">

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
                               updateUser()
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
                      value= {acess}
                        onChange={(e: React.ChangeEvent<HTMLInputElement >) => {
                        const newValue = e.currentTarget.value;
                        setAcess(newValue)
                        }}
                      />
        
                  </FormControl>
        
                  <Button type="submit" colorScheme="teal" width="full"
                  mt={6}>
                    Atualizar
                  </Button>
               
                </form>
              </Box>
              </Box>
      )
}

export default UpdateUserScreen