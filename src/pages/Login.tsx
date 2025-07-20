import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router';
import api from '../api/api'
import { FormControl, Flex, Box, Heading, FormLabel, Input, Button, useToast } from '@chakra-ui/react';

 function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const toast = useToast()
  async function loginValidation() {
  try {
    const response = await api.post('/auth/login', {
      userEmail: email,
      userSenha: senha,
    });

    const token = response.data?.data.access_token;

    if (!token) {
      alert('Token não recebido!');
      return;
    }

    localStorage.setItem('token', token);
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    login(token); 
    navigate("/redirect");
  } catch (error) {
    console.error('Erro ao fazer login:', error);
  toast({
          title: "Não foi possível criar usuario.",
          description: `Título: ${error && typeof error === "object" &&  "message" in error ? (error as any).message : String(error)}`,
          status: "error",
          duration: 4000,
          isClosable: true,
          position: "top-right",
        });  }
}

 return(
      <Flex height="100vh" width="100%">

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

  
export default Login