import { Flex, Box, Heading, FormControl, FormLabel, Input, Button, Image } from  '@chakra-ui/react';
import { useState } from 'react';
import api from '../api/api';
import { useNavigate } from 'react-router';
import Heroimage from '../assets/hero-image.png'


function LoginScreen() {
  
  const [email, setEmail] = useState<string>('')
  const [senha, setSenha] = useState<string>('')

  const navigate = useNavigate()
  
  async function loginValidation(){
   try {
     const response = await api.post('users/login', {
       email,
       senha,
      });
      const data = response.data.data
      const typeUser = data.acess
    

      if(typeUser == 'user'){
        console.log("user type")
            navigate('/user')
      }
      if(typeUser == 'admin'){
                console.log("admin type")

        navigate('/admin')
      }
     
  } catch (error: any) {
    console.error("Erro ao fazer login:", error.response?.data || error.message);
    
  }
}

return(
       <Flex height="100vh" width="100%">
      <Box flex="1" bg="#E6FFFA">
        <Image src={Heroimage} width='1300px' height='1200px' alt='Mestre'/>
        </Box>

      <Flex
        flex="1"
        bg="white"
        align="center"
        justify="center"
        padding={8}
      >
        <Box width="100%" maxWidth="500px">
          <Heading
            as="h2"
            size="lg"
            textAlign="left"
            mb={8}
            color="#234E52"
          >
            Login
          </Heading>

          <form
           onSubmit={(e) => {
                    e.preventDefault()
                    loginValidation()
                }}
          >
            <FormControl id="email" mb={6} isRequired>
              <FormLabel color="#234E52">Email</FormLabel>
              <Input
                type="email"
                size="lg"
                focusBorderColor="#38B2AC"
                placeholder="Digite seu email"
                value= {email}
                onChange={(e: React.ChangeEvent<HTMLInputElement >) => {
                const newValue = e.currentTarget.value;
                setEmail(newValue)
                }}
              />
            </FormControl>

            <FormControl id="password" mb={8} isRequired>
              <FormLabel color="#234E52">Senha</FormLabel>
              <Input
                type="password"
                size="lg"
                focusBorderColor="#38B2AC"
                placeholder="Digite sua senha"
                value= {senha}
                onChange={(e: React.ChangeEvent<HTMLInputElement >) => {
                const newValue = e.currentTarget.value;
                setSenha(newValue)
                }}
              />
            </FormControl>

            <Button
              type="submit"
              width="full"
              size="lg"
              bg="#38B2AC"
              color="white"
              _hover={{ bg: "#81E6D9" }}
            >
              Entrar
            </Button>
          </form>
        </Box>
      </Flex>
    </Flex>
  );
}

export default LoginScreen