import { Flex, Box, Heading, FormControl, FormLabel, Input, Button } from  '@chakra-ui/react';
//import { useState } from 'react';


//const [email, setEmail] = useState()

function LoginScreen() {
return(
       <Flex height="100vh" width="100%">
      <Box flex="1" bg="#E6FFFA" />

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

          <form>
            <FormControl id="email" mb={6} isRequired>
              <FormLabel color="#234E52">Email</FormLabel>
              <Input
                type="email"
                size="lg"
                focusBorderColor="#38B2AC"
                placeholder="Digite seu email"
                
              />
            </FormControl>

            <FormControl id="password" mb={8} isRequired>
              <FormLabel color="#234E52">Senha</FormLabel>
              <Input
                type="password"
                size="lg"
                focusBorderColor="#38B2AC"
                placeholder="Digite sua senha"
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